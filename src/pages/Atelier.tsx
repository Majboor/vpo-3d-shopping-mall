import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Bounds,
  Center,
  ContactShadows,
  useGLTF,
  Html,
} from "@react-three/drei";
import * as THREE from "three";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  RotateCw,
  Pause,
  Play,
  Sun,
  X,
  Loader2,
} from "lucide-react";
import {
  atelierCollection,
  atelierEnvironments,
  type AtelierEnvironment,
  type AtelierPiece,
} from "@/data/atelierCollection";
import { useAtelierBook } from "@/hooks/useAtelierBook";
import { toast } from "sonner";

/* ------------------------------------------------------------------ */
/*  3D stage                                                           */
/* ------------------------------------------------------------------ */

function PieceModel({
  piece,
  autoRotate,
  targetYaw,
}: {
  piece: AtelierPiece;
  autoRotate: boolean;
  targetYaw: number;
}) {
  const { scene } = useGLTF(piece.modelUrl);
  const group = useRef<THREE.Group>(null);

  // Clone so the same asset can be re-used without mutating the cache, and
  // enable shadow casting on every mesh.
  const cloned = useMemo(() => {
    const s = scene.clone(true);
    s.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return s;
  }, [scene]);

  useFrame((_, delta) => {
    if (!group.current) return;
    if (autoRotate) {
      group.current.rotation.y += delta * 0.35;
    } else {
      // Smoothly settle toward the chosen preset angle.
      const cur = group.current.rotation.y;
      group.current.rotation.y = cur + (targetYaw - cur) * Math.min(1, delta * 4);
    }
  });

  return (
    <group ref={group}>
      <Center>
        <primitive object={cloned} scale={piece.presence} />
      </Center>
    </group>
  );
}

function StageLighting({ env }: { env: AtelierEnvironment }) {
  return (
    <>
      <ambientLight intensity={env.ambient} color={env.fill} />
      <spotLight
        position={[4, 7, 6]}
        angle={0.5}
        penumbra={0.9}
        intensity={2.6}
        color={env.key}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />
      <spotLight position={[-6, 4, 3]} angle={0.6} penumbra={1} intensity={1.1} color={env.fill} />
      <pointLight position={[0, 6, -5]} intensity={1.4} color={env.key} />
      <directionalLight position={[0, 2, 8]} intensity={0.6} color={env.fill} />
    </>
  );
}

/** Keeps tone-mapping exposure in sync with the slider. */
function ExposureRig({ exposure }: { exposure: number }) {
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = exposure;
  }, [gl, exposure]);
  return null;
}

function StageLoader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 text-white/70">
        <Loader2 className="w-6 h-6 animate-spin" strokeWidth={1.5} />
        <span className="text-[10px] tracking-[0.3em] uppercase">Rendering piece</span>
      </div>
    </Html>
  );
}

function AtelierStage({
  piece,
  env,
  exposure,
  autoRotate,
  targetYaw,
  fitKey,
}: {
  piece: AtelierPiece;
  env: AtelierEnvironment;
  exposure: number;
  autoRotate: boolean;
  targetYaw: number;
  fitKey: number;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0.5, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ExposureRig exposure={exposure} />
      <StageLighting env={env} />
      <Suspense fallback={<StageLoader />}>
        {/* Bounds auto-frames each model regardless of its native scale.
            Re-keyed on piece + fitKey so switching pieces and "Reset view"
            both re-fit the camera cleanly. */}
        <Bounds key={`${piece.id}-${fitKey}`} fit clip observe margin={1.15}>
          <PieceModel piece={piece} autoRotate={autoRotate} targetYaw={targetYaw} />
        </Bounds>
      </Suspense>
      <ContactShadows
        position={[0, -1.6, 0]}
        opacity={env.id === "gallery" ? 0.35 : 0.55}
        scale={14}
        blur={2.6}
        far={4.5}
        color={env.ground}
      />
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom
        minDistance={2.5}
        maxDistance={11}
        minPolarAngle={Math.PI / 8}
        maxPolarAngle={Math.PI / 1.9}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.6}
      />
    </Canvas>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const YAW_PRESETS: { label: string; value: number }[] = [
  { label: "Front", value: 0 },
  { label: "3/4", value: -Math.PI / 4 },
  { label: "Profile", value: -Math.PI / 2 },
  { label: "Back", value: -Math.PI },
];

const Atelier = () => {
  const [pieceIndex, setPieceIndex] = useState(0);
  const [envId, setEnvId] = useState(atelierEnvironments[0].id);
  const [exposure, setExposure] = useState(0.95);
  const [autoRotate, setAutoRotate] = useState(true);
  const [targetYaw, setTargetYaw] = useState(0);
  const [fitKey, setFitKey] = useState(0);
  const [bookOpen, setBookOpen] = useState(false);

  const book = useAtelierBook();

  const piece = atelierCollection[pieceIndex];
  const env = atelierEnvironments.find((e) => e.id === envId) ?? atelierEnvironments[0];
  const isLight = env.id === "gallery";

  const goTo = (i: number) => {
    const n = atelierCollection.length;
    setPieceIndex(((i % n) + n) % n);
    setTargetYaw(0);
    setAutoRotate(true);
    setFitKey((k) => k + 1);
  };

  // Keyboard navigation between pieces.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === "ArrowRight") goTo(pieceIndex + 1);
      else if (e.key === "ArrowLeft") goTo(pieceIndex - 1);
      else if (e.key === " ") {
        e.preventDefault();
        setAutoRotate((v) => !v);
      } else if (e.key === "Escape") setBookOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pieceIndex]);

  const savePiece = (p: AtelierPiece) => {
    const willAdd = !book.has(p.id);
    book.toggle(p.id);
    toast(willAdd ? "Saved to your Atelier Book" : "Removed from your Atelier Book", {
      description: `${p.name} — ${p.designer}`,
    });
  };

  const savedPieces = atelierCollection.filter((p) => book.ids.includes(p.id));
  const textMain = isLight ? "text-[hsl(30_10%_14%)]" : "text-white";
  const textMuted = isLight ? "text-[hsl(30_6%_38%)]" : "text-white/45";
  const hairline = isLight ? "border-black/10" : "border-white/10";

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden transition-colors duration-700 ${textMain}`}
      style={{ background: env.background }}
    >
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Top bar */}
      <header className={`relative z-30 flex items-center justify-between px-6 md:px-12 h-20 border-b ${hairline}`}>
        <Link to="/" className={`font-serif text-2xl italic tracking-tight hover:opacity-70 transition-opacity ${textMain}`}>
          VPO.
        </Link>
        <div className="hidden sm:flex items-center gap-3">
          <span className={`text-[10px] tracking-[0.35em] uppercase ${textMuted}`}>The Atelier</span>
          <span className={`w-1.5 h-1.5 rounded-full ${isLight ? "bg-[hsl(145_50%_38%)]" : "bg-emerald-400"} animate-pulse`} />
          <span className={`text-[9px] tracking-[0.3em] uppercase ${textMuted}`}>Interactive</span>
        </div>
        <button
          onClick={() => setBookOpen(true)}
          className={`relative inline-flex items-center gap-2 px-4 py-2 border ${hairline} text-[10px] tracking-[0.2em] uppercase hover:opacity-70 transition-opacity`}
        >
          <Bookmark className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span className="hidden sm:inline">Atelier Book</span>
          {book.count > 0 && (
            <span className={`ml-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[9px] font-medium ${isLight ? "bg-black text-white" : "bg-white text-black"}`}>
              {book.count}
            </span>
          )}
        </button>
      </header>

      {/* Stage + detail */}
      <main className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_380px] min-h-[calc(100vh-5rem)]">
        {/* 3D stage */}
        <section className="relative min-h-[52vh] lg:min-h-0">
          <AtelierStage
            piece={piece}
            env={env}
            exposure={exposure}
            autoRotate={autoRotate}
            targetYaw={targetYaw}
            fitKey={fitKey}
          />

          {/* Piece index / paging */}
          <div className="absolute top-6 left-6 z-20 flex items-center gap-4">
            <span className={`font-serif text-5xl md:text-6xl leading-none ${isLight ? "text-black/10" : "text-white/15"}`}>
              {piece.index}
            </span>
          </div>

          {/* Prev / next */}
          <button
            aria-label="Previous piece"
            onClick={() => goTo(pieceIndex - 1)}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border ${hairline} backdrop-blur-sm flex items-center justify-center hover:scale-105 active:scale-95 transition-transform`}
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          </button>
          <button
            aria-label="Next piece"
            onClick={() => goTo(pieceIndex + 1)}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border ${hairline} backdrop-blur-sm flex items-center justify-center hover:scale-105 active:scale-95 transition-transform`}
          >
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </button>

          {/* Control dock */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 w-[min(92%,640px)]">
            <div className={`flex flex-wrap items-center justify-center gap-x-5 gap-y-3 px-5 py-3 rounded-xl border ${hairline} backdrop-blur-md ${isLight ? "bg-white/50" : "bg-black/30"}`}>
              {/* Auto-rotate */}
              <button
                onClick={() => setAutoRotate((v) => !v)}
                className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase hover:opacity-70 transition-opacity"
              >
                {autoRotate ? <Pause className="w-3.5 h-3.5" strokeWidth={1.5} /> : <Play className="w-3.5 h-3.5" strokeWidth={1.5} />}
                {autoRotate ? "Pause" : "Rotate"}
              </button>

              <span className={`h-4 w-px ${isLight ? "bg-black/15" : "bg-white/15"}`} />

              {/* Angle presets */}
              <div className="flex items-center gap-2">
                {YAW_PRESETS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => {
                      setAutoRotate(false);
                      setTargetYaw(p.value);
                    }}
                    className={`text-[10px] tracking-[0.15em] uppercase px-2 py-1 rounded transition-colors ${
                      !autoRotate && Math.abs(targetYaw - p.value) < 0.001
                        ? isLight
                          ? "bg-black text-white"
                          : "bg-white text-black"
                        : "hover:opacity-70"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <span className={`h-4 w-px ${isLight ? "bg-black/15" : "bg-white/15"}`} />

              {/* Exposure */}
              <label className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase">
                <Sun className="w-3.5 h-3.5" strokeWidth={1.5} />
                <input
                  type="range"
                  min={0.5}
                  max={1.6}
                  step={0.01}
                  value={exposure}
                  onChange={(e) => setExposure(parseFloat(e.target.value))}
                  className="atelier-range w-24 md:w-28"
                  aria-label="Exposure"
                />
              </label>

              <span className={`h-4 w-px ${isLight ? "bg-black/15" : "bg-white/15"}`} />

              {/* Reset */}
              <button
                onClick={() => {
                  setTargetYaw(0);
                  setAutoRotate(true);
                  setExposure(0.95);
                  setFitKey((k) => k + 1);
                }}
                className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase hover:opacity-70 transition-opacity"
              >
                <RotateCw className="w-3.5 h-3.5" strokeWidth={1.5} />
                Reset
              </button>
            </div>
          </div>
        </section>

        {/* Detail panel */}
        <aside className={`relative z-10 border-t lg:border-t-0 lg:border-l ${hairline} px-8 py-10 flex flex-col ${isLight ? "bg-white/30" : "bg-black/25"} backdrop-blur-sm`}>
          <div className="flex-1">
            <span className={`text-[10px] tracking-[0.35em] uppercase ${textMuted}`}>
              {piece.house} · {piece.year}
            </span>
            <h1 className="mt-4 font-serif text-4xl md:text-5xl leading-[1.05]">{piece.name}</h1>
            <p className={`mt-2 font-serif italic text-xl ${textMuted}`}>{piece.designer}</p>

            <p className={`mt-8 text-sm leading-relaxed ${isLight ? "text-[hsl(30_8%_28%)]" : "text-white/70"}`}>
              {piece.note}
            </p>

            <dl className={`mt-8 border-t ${hairline} divide-y ${isLight ? "divide-black/10" : "divide-white/10"}`}>
              {[
                ["Material", piece.material],
                ["Edition", piece.edition],
                ["Season", piece.year],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between py-3">
                  <dt className={`text-[10px] tracking-[0.25em] uppercase ${textMuted}`}>{k}</dt>
                  <dd className="text-sm">{v}</dd>
                </div>
              ))}
            </dl>

            {/* Environment swatches */}
            <div className="mt-8">
              <span className={`text-[10px] tracking-[0.25em] uppercase ${textMuted}`}>Environment</span>
              <div className="mt-3 flex gap-3">
                {atelierEnvironments.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => setEnvId(e.id)}
                    className={`group flex flex-col items-center gap-2`}
                    aria-label={`Environment: ${e.label}`}
                  >
                    <span
                      className={`w-9 h-9 rounded-full border-2 transition-all ${
                        envId === e.id ? (isLight ? "border-black scale-110" : "border-white scale-110") : "border-transparent opacity-70 group-hover:opacity-100"
                      }`}
                      style={{ background: e.background }}
                    />
                    <span className={`text-[9px] tracking-[0.15em] uppercase ${envId === e.id ? textMain : textMuted}`}>
                      {e.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Save action */}
          <button
            onClick={() => savePiece(piece)}
            className={`mt-8 w-full inline-flex items-center justify-center gap-3 py-4 text-[11px] tracking-[0.25em] uppercase transition-colors ${
              book.has(piece.id)
                ? isLight
                  ? "bg-black text-white"
                  : "bg-white text-black"
                : isLight
                ? "border border-black/30 hover:border-black"
                : "border border-white/30 hover:border-white"
            }`}
          >
            {book.has(piece.id) ? (
              <>
                <BookmarkCheck className="w-4 h-4" strokeWidth={1.5} /> Saved to Atelier Book
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4" strokeWidth={1.5} /> Save to Atelier Book
              </>
            )}
          </button>

          {/* Collection strip */}
          <div className={`mt-6 flex items-center gap-2`}>
            {atelierCollection.map((p, i) => (
              <button
                key={p.id}
                onClick={() => goTo(i)}
                className={`flex-1 h-1 rounded-full transition-colors ${
                  i === pieceIndex ? (isLight ? "bg-black" : "bg-white") : isLight ? "bg-black/15" : "bg-white/20"
                }`}
                aria-label={`Go to ${p.name}`}
              />
            ))}
          </div>
          <p className={`mt-3 text-center text-[9px] tracking-[0.25em] uppercase ${textMuted}`}>
            {pieceIndex + 1} / {atelierCollection.length} · Use ← → keys
          </p>
        </aside>
      </main>

      {/* Atelier Book drawer */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          bookOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setBookOpen(false)} />
        <div
          className={`absolute top-0 right-0 h-full w-full sm:w-[420px] bg-[hsl(30_8%_8%)] text-white border-l border-white/10 flex flex-col transition-transform duration-400 ${
            bookOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-7 h-20 border-b border-white/10">
            <div>
              <h2 className="font-serif text-2xl italic">Atelier Book</h2>
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
                {book.count} {book.count === 1 ? "piece" : "pieces"} saved
              </span>
            </div>
            <button aria-label="Close" onClick={() => setBookOpen(false)} className="p-2 -mr-2 text-white/70 hover:text-white transition-colors">
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-7 py-6">
            {savedPieces.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-20">
                <Bookmark className="w-8 h-8 text-white/25" strokeWidth={1} />
                <p className="text-sm text-white/50 max-w-[240px] leading-relaxed">
                  Your Atelier Book is empty. Save the pieces you want to revisit — they’ll be here next time you enter.
                </p>
              </div>
            ) : (
              <ul className="space-y-5">
                {savedPieces.map((p) => {
                  const idx = atelierCollection.findIndex((x) => x.id === p.id);
                  return (
                    <li key={p.id} className="group flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                      <button
                        onClick={() => {
                          goTo(idx);
                          setBookOpen(false);
                        }}
                        className="text-left flex-1"
                      >
                        <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">{p.house}</span>
                        <p className="font-serif text-xl mt-1 group-hover:opacity-70 transition-opacity">{p.name}</p>
                        <p className="font-serif italic text-white/50 text-sm">{p.designer}</p>
                      </button>
                      <button
                        aria-label={`Remove ${p.name}`}
                        onClick={() => book.remove(p.id)}
                        className="p-2 text-white/40 hover:text-white transition-colors"
                      >
                        <X size={16} strokeWidth={1.5} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {savedPieces.length > 0 && (
            <div className="px-7 py-5 border-t border-white/10 flex items-center justify-between">
              <button onClick={() => book.clear()} className="text-[10px] tracking-[0.25em] uppercase text-white/40 hover:text-white transition-colors">
                Clear all
              </button>
              <Link
                to="/business#bp-join"
                className="px-5 py-3 bg-white text-black text-[10px] tracking-[0.25em] uppercase hover:bg-white/90 transition-colors"
              >
                Enquire
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Warm the model cache so switching pieces feels instant.
atelierCollection.forEach((p) => useGLTF.preload(p.modelUrl));

export default Atelier;
