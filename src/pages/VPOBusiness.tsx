import { Fragment, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Image as DreiImage, Lightformer } from "@react-three/drei";
import * as THREE from "three";

const frames = [
  {
    id: 1,
    kicker: "01 / REAL CLIENT SIGNALS",
    title: "Stores with texture.",
    copy: "Kelvin Haus, Zuhd, and Optica already sell through strong visual worlds: sustainable streetwear, heritage-led modest fashion, and precise eyewear. VPO turns that existing content into rooms customers can enter.",
    image: "https://kelvinhaus.com/cdn/shop/files/519A0217.jpg?v=1763374584&width=2450",
    align: "right",
    imgX: -2.2,
    imgY: 0.1,
    imgZ: -4,
    scale: [3, 4.5],
  },
  {
    id: 2,
    kicker: "02 / MODEST FASHION DISTRICT",
    title: "Heritage needs space.",
    copy: "Zuhd's collections move between keffiyehs, thobes, prayer mats, accessories, and Palestine-led giving. A spatial storefront lets those stories sit beside the products instead of getting buried below the fold.",
    image: "https://cdn.shopify.com/s/files/1/0726/9616/8768/files/56UYxsqQ.jpg?v=1717933757",
    align: "left",
    imgX: 2.2,
    imgY: -0.3,
    imgZ: -12,
    scale: [3, 4.5],
  },
  {
    id: 3,
    kicker: "03 / EYEWEAR TRY-ON",
    title: "Fit before checkout.",
    copy: "Optica sells by shape, lens, brand, and use case. In VPO, aviator, rimless, round, rectangular, and designer frames become an interactive fitting wall built for comparison.",
    image: "https://shopoptica.com/wp-content/uploads/2025/07/optica-banner-2025.webp",
    align: "right",
    imgX: -2,
    imgY: 0.5,
    imgZ: -20,
    scale: [3.5, 2.5],
  },
  {
    id: 4,
    kicker: "04 / LAUNCH ROOMS",
    title: "Drops become events.",
    copy: "New arrivals, seasonal capsules, and limited collections get a dedicated digital room with product hotspots, short-form campaign footage, guided browsing, and live social shopping.",
    image: "https://kelvinhaus.com/cdn/shop/files/hero_banner_1daa7322-00a4-41ab-acdd-01094114c8bf.png?v=1773479571&width=1440",
    align: "left",
    imgX: 2.5,
    imgY: -0.2,
    imgZ: -28,
    scale: [3, 4.5],
  },
  {
    id: 5,
    kicker: "05 / ENTER VPO",
    title: "Build the store customers remember.",
    copy: "Use the assets your brands already have. VPO waits for real pages to load, captures clean references, and converts client identity into a 3D shopping experience.",
    image: "https://cdn.shopify.com/s/files/1/0726/9616/8768/files/DSC07425-Edit.jpg?v=1728308074",
    align: "center",
    finale: true,
    imgX: 0,
    imgY: 0,
    imgZ: -34,
    scale: [7.2, 4.6],
  },
];

const clients = [
  {
    name: "Kelvin Haus",
    type: "Sustainable UAE streetwear",
    image: "https://kelvinhaus.com/cdn/shop/files/519A0634.jpg?v=1763372948&width=2260",
    link: "/case-studies#kelvin-haus",
    copy: "Public copy centers on eco-conscious fashion, UAE-made apparel, recycled materials, NFC/NFT technology, and giving through each order. Ideal VPO treatment: a materials-led flagship with sustainability story points beside each collection.",
  },
  {
    name: "Zuhd",
    type: "Heritage modest fashion",
    image: "https://cdn.shopify.com/s/files/1/0726/9616/8768/files/DSC07408.jpg?v=1728478980",
    link: "/case-studies#zuhd",
    copy: "Zuhd's public storefront emphasizes hand tailoring, Australian design, worldwide shipping, Palestine-linked giving, keffiyehs, thobes, accessories, prayer mats, and community impact. VPO can turn the catalog into heritage rooms and drop-led collection spaces.",
  },
  {
    name: "Optica",
    type: "Eyewear and eye care",
    image: "https://shopoptica.com/wp-content/uploads/2026/04/k041-2.webp",
    link: "/case-studies#optica",
    copy: "Optica leads with eye care since 1986, designer eyewear, product search by frame shape, sunglasses, prescription frames, contact lenses, and accessories. VPO can prioritize virtual mirror try-on, comparison walls, and shape-guided discovery.",
  },
];

const tiers = [
  {
    tone: "gold",
    name: "Gold Partner",
    headline: "The Boutique.",
    tagline: "A premium 3D store from curated templates — live in weeks, not months.",
    amount: "$1,999",
    period: "Billed annually · $23,988/yr",
    note: "One-time setup: $4,500 · No lock-in after year one",
    features: [
      "3 curated boutique environment templates",
      "Up to 500 SKUs with 3D product display",
      "Standard lighting, materials & ambience",
      "Guest + member shopping modes",
      "Analytics dashboard — traffic, dwell, conversion",
      "Community lobby (shared district)",
      "Mobile + desktop compatible",
      "Standard support — 48hr SLA",
    ],
  },
  {
    tone: "plat",
    name: "Platinum Partner",
    headline: "The Flagship.",
    tagline: "A fully bespoke spatial world, hand-crafted for your brand's singular identity.",
    amount: "$5,999",
    period: "Billed annually · $71,988/yr",
    note: "One-time setup: $12,000 · Includes 6-week white-glove build",
    features: [
      "Fully bespoke custom 3D architecture",
      "Unlimited SKUs — full inventory sync",
      "Virtual Try-On — clothing, eyewear, accessories",
      "Private multiplayer lobbies — invite-only",
      "AI Personal Styling Assistant (in-world)",
      "Live runway & launch event hosting",
      "VIP private viewing rooms",
      "Custom avatar system branded to your house",
      "API access + custom domain + branded URL",
      "Dedicated account manager + weekly consult",
      "Priority support — 2hr SLA",
    ],
  },
];

const metrics = [
  ["-47%", "Return Rate Reduction", "↩"],
  ["+320%", "Customer Dwell Time Increase", "⏱"],
  ["+185%", "Conversion Rate Uplift", "✦"],
  ["+240%", "Brand Recall Score", "◈"],
  ["+85%", "Average Order Value Increase", "◎"],
  ["+510%", "Social Sharing Rate Uplift", "↗"],
];

const future = [
  ["Available now", "◈", "Spatial Audio Commerce", "Each zone of your store plays a branded soundscape — materials, mood, and collection season expressed through generative audio. The world sounds like your brand."],
  ["Available now", "✦", "Neural Preference Mapping", "AI that learns each customer's style DNA from session behaviour — no forms, no surveys. The store quietly reorders itself around what they love before they know they love it."],
  ["Pilot 2026", "◎", "Haptic Fabric Simulation", "On compatible devices, customers feel the weight, weave, and drape of fabrics as they inspect garments — silk, wool, denim — through precision actuator patterns."],
  ["Pilot 2026", "⬡", "Biometric Ambience", "Using device camera signals, VPO subtly reads customer engagement state and adapts the environment — lighting warmth, pace of animation, even music tempo — in real time."],
  ["2026", "◉", "Holographic Pop-Up Events", "Your digital world bleeds into the physical. AR overlays transform any surface — a window, a wall, a phone screen — into a portal to your VPO flagship during launch events."],
  ["2026", "⊹", "AI Sizing Oracle", "A zero-return fit guarantee powered by body-scan AI. Customers enter their measurements once. The Oracle predicts fit across every brand, every cut, with 98% accuracy."],
];

const featureGroups = [
  ["Store Environment", [["3D Environment", true, true], ["Curated Templates", true, true], ["Custom Bespoke Architecture", false, true], ["Branded Custom Domain", false, true], ["Day/Night Ambience Cycle", false, true]]],
  ["Customer Experience", [["3D Product Display", true, true], ["Virtual Try-On (AR/AI)", false, true], ["AI Personal Stylist", false, true], ["Custom Avatar System", false, true], ["Multiplayer / Social Lobby", true, true], ["Private Invite-Only Rooms", false, true], ["Live Runway / Event Hosting", false, true]]],
  ["Commerce & Inventory", [["Product SKU Limit", "Up to 500", "Unlimited"], ["Real-Time Inventory Sync", false, true], ["API Access & Webhooks", false, true], ["Shopify / Magento Integration", true, true]]],
  ["Analytics & Insights", [["Traffic & Dwell Analytics", true, true], ["Heatmap & Interaction Data", false, true], ["Weekly Performance Consulting", false, true], ["Monthly Report", true, true]]],
] as const;

const BUFFER_PAGES = 0.8;
const TOTAL_PAGES = frames.length + BUFFER_PAGES;
const FINALE_OFFSET = frames.length / TOTAL_PAGES;
const FORM_EMAIL = "info@techrealm.online";
const getFormReturnUrl = () => (typeof window !== "undefined" ? `${window.location.origin}/business?submitted=true` : "/business?submitted=true");
const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const smoothstep = (value: number, edge0: number, edge1: number) => {
  const t = clamp01((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

type BusinessFrame = (typeof frames)[number];
type CinemaTick = {
  offset: number;
  rawOffset: number;
  idx: number;
  local: number;
  alpha: number;
  reveal: number;
  reveal2: number;
  ctaReveal: number;
};

const getCinemaTick = (rawOffset: number): CinemaTick => {
  const offset = Math.min(clamp01(rawOffset) / FINALE_OFFSET, 1);
  const t = offset * frames.length;
  const idx = Math.max(0, Math.min(frames.length - 1, Math.floor(t)));
  const local = t - idx;
  const isFinale = Boolean(frames[idx]?.finale);
  const fadeIn = smoothstep(local, 0.06, 0.26);
  const fadeOut = isFinale ? 1 - smoothstep(local, 0.9, 0.998) : 1 - smoothstep(local, 0.74, 0.94);

  return {
    offset,
    rawOffset,
    idx,
    local,
    alpha: clamp01(fadeIn * fadeOut),
    reveal: clamp01((local - (isFinale ? 0.08 : 0.1)) / (isFinale ? 0.42 : 0.48)),
    reveal2: clamp01((local - (isFinale ? 0.16 : 0.2)) / (isFinale ? 0.48 : 0.52)),
    ctaReveal: clamp01((local - (isFinale ? 0.36 : 0.42)) / (isFinale ? 0.38 : 0.34)),
  };
};

const splashShapes = [
  { borderRadius: "62% 38% 44% 56% / 34% 58% 42% 66%", transform: "rotate(-6deg) skewX(3deg)", top: "-30%", bottom: "-34%", left: "-24%", right: "-20%" },
  { borderRadius: "38% 62% 56% 44% / 66% 34% 62% 38%", transform: "rotate(5deg) skewX(-4deg)", top: "-26%", bottom: "-32%", left: "-18%", right: "-28%" },
  { borderRadius: "55% 45% 38% 62% / 42% 60% 40% 58%", transform: "rotate(-4deg) skewY(2deg)", top: "-32%", bottom: "-28%", left: "-22%", right: "-18%" },
  { borderRadius: "44% 56% 62% 38% / 58% 40% 56% 44%", transform: "rotate(6deg) skewX(3deg)", top: "-28%", bottom: "-36%", left: "-20%", right: "-24%" },
  { borderRadius: "50% 50% 44% 56% / 38% 50% 52% 42%", transform: "rotate(-2deg) skewX(1deg)", top: "-24%", bottom: "-28%", left: "-16%", right: "-18%" },
];

const SceneRig = ({ progress }: { progress: number }) => {
  const { camera, pointer } = useThree();
  const endZ = frames[frames.length - 1].imgZ + 5.4;

  useFrame((_, delta) => {
    const contentOffset = Math.min(progress / FINALE_OFFSET, 1);
    const targetZ = THREE.MathUtils.lerp(4, endZ, contentOffset);
    const damp = contentOffset > 0.72 ? 3.1 : 4;
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, damp, delta);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.38, 2, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, pointer.y * 0.38, 2, delta);
  });

  return null;
};

const PlaceholderImage = ({ scale, onOpen }: { scale: [number, number]; onOpen?: () => void }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const material = meshRef.current?.material;
    if (!material || Array.isArray(material)) return;
    material.opacity = 0.82 + Math.sin(clock.elapsedTime * 0.55) * 0.03;
  });

  return (
    <mesh
      ref={meshRef}
      scale={[scale[0], scale[1], 1]}
      onClick={(event) => {
        event.stopPropagation();
        document.body.style.cursor = "";
        onOpen?.();
      }}
      onPointerOver={() => {
        document.body.style.cursor = "zoom-in";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "";
      }}
    >
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial
        transparent
        opacity={0.85}
        color={new THREE.Color("#1e1c19")}
        roughness={0.96}
        metalness={0.04}
        emissive={new THREE.Color("#0a0907")}
        emissiveIntensity={0.28}
      />
    </mesh>
  );
};

const FloatingImage = ({ frame, onOpen }: { frame: BusinessFrame; onOpen: (frame: BusinessFrame) => void }) => {
  const groupRef = useRef<THREE.Group>(null);
  const scale = frame.scale as [number, number];
  const [urlOk, setUrlOk] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (!cancelled) setUrlOk(true);
    };
    img.onerror = () => {
      if (!cancelled) setUrlOk(false);
    };
    img.src = frame.image;
    return () => {
      cancelled = true;
      img.onload = null;
      img.onerror = null;
    };
  }, [frame.image]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    const fin = Boolean(frame.finale);
    groupRef.current.position.y = frame.imgY + Math.sin(t * 0.5 + frame.id) * (fin ? 0.04 : 0.14);
    groupRef.current.rotation.y = Math.sin(t * 0.28) * (fin ? 0.005 : 0.018);
  });

  return (
    <group ref={groupRef} position={[frame.imgX, frame.imgY, frame.imgZ]}>
      {urlOk !== true && <PlaceholderImage scale={scale} onOpen={() => onOpen(frame)} />}
      {urlOk === true && (
        <DreiImage
          url={frame.image}
          position={[0, 0, 0]}
          scale={scale}
          toneMapped
          transparent
          opacity={frame.finale ? 1 : 0.88}
          onClick={(event) => {
            event.stopPropagation();
            document.body.style.cursor = "";
            onOpen(frame);
          }}
          onPointerOver={() => {
            document.body.style.cursor = "zoom-in";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "";
          }}
        />
      )}
    </group>
  );
};

const CinemaCanvas = ({ progress, onOpen }: { progress: number; onOpen: (frame: BusinessFrame) => void }) => (
  <Canvas
    gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
    onCreated={({ gl }) => gl.setClearColor(0x080705, 0)}
    camera={{ position: [0, 0, 4], fov: 45 }}
    dpr={[1, 2]}
  >
    <fog attach="fog" args={["#080705", 5, 24]} />
    <ambientLight intensity={0.38} />
    <directionalLight position={[5, 5, 5]} intensity={0.95} color="#ffffff" />
    <Environment resolution={128}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <Lightformer intensity={0.45} form="rect" position={[0, 5, -5]} scale={[10, 10, 1]} color="#ffffff" />
      </group>
    </Environment>
    <SceneRig progress={progress} />
    <group>
      {frames.map((frame) => (
        <FloatingImage key={frame.id} frame={frame} onOpen={onOpen} />
      ))}
    </group>
  </Canvas>
);

const ComposedBody = ({ text, progress }: { text: string; progress: number }) => {
  const words = text.split(" ");
  const count = Math.max(1, words.length);
  return (
    <p className="composed-body">
      {words.map((word, index) => {
        const opacity = clamp01((progress - index / count) * 5.5);
        return (
          <span
            key={`${word}-${index}`}
            style={{
              opacity,
              transform: `translateY(${(1 - opacity) * 6}px)`,
              marginRight: index === words.length - 1 ? 0 : ".3em",
            }}
          >
            {word}
          </span>
        );
      })}
    </p>
  );
};

const TextPanel = ({ frame, tick, onEnter }: { frame: BusinessFrame; tick: CinemaTick; onEnter: () => void }) => {
  const isCenter = frame.align === "center";
  const splash = splashShapes[(frame.id - 1) % splashShapes.length];
  const y = (1 - tick.alpha) * 16;

  return (
    <div className="cloud-haze" style={{ transform: `translateY(${y}px)`, maxWidth: frame.finale ? "44rem" : "36rem" }}>
      <div className="splash-bg" style={{ opacity: tick.alpha, ...splash }} />
      <div className={`cloud-content${isCenter ? " cloud-content--center" : ""}`}>
        <span className="cinema-kicker" style={{ opacity: clamp01((tick.reveal - 0.04) * 7) }}>{frame.kicker}</span>
        <h2 className={`headline-reveal${frame.finale ? " headline-reveal--finale" : ""}`} style={{ clipPath: `inset(0 ${(1 - tick.reveal) * 100}% 0 0)` }}>
          {frame.title}
        </h2>
        <ComposedBody text={frame.copy} progress={tick.reveal2} />
        {isCenter && (
          <div className="cinema-cta-wrap" style={{ opacity: tick.ctaReveal }}>
            <button type="button" className="cinema-cta" onClick={onEnter}>Contact Us</button>
          </div>
        )}
      </div>
    </div>
  );
};

const EditorialOverlay = ({ tick, onEnter }: { tick: CinemaTick; onEnter: () => void }) => {
  const frame = frames[tick.idx];
  if (!frame) return null;

  if (frame.align === "center") {
    return (
      <div className="vpo-center-wrap" style={{ opacity: tick.alpha }}>
        <TextPanel frame={frame} tick={tick} onEnter={onEnter} />
      </div>
    );
  }

  return (
    <div className={`vpo-column vpo-column--${frame.align}`} style={{ opacity: tick.alpha }}>
      <div className={`vpo-blur-plate${tick.alpha > 0.06 ? " is-on" : ""}`} style={{ backgroundImage: `url(${frame.image})` }} />
      <div className={`vpo-panel-wrap vpo-panel-wrap--${frame.align}`}>
        <TextPanel frame={frame} tick={tick} onEnter={onEnter} />
      </div>
    </div>
  );
};

const VPOBusiness = () => {
  const cinemaRef = useRef<HTMLElement>(null);
  const [cinemaProgress, setCinemaProgress] = useState(0);
  const [lightboxFrame, setLightboxFrame] = useState<BusinessFrame | null>(null);
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".bp-reveal"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("revealed");
      });
    }, { threshold: 0.14 });
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = cinemaRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      setCinemaProgress(progress);
    };
    const onScroll = () => {
      window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!lightboxFrame) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxFrame(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxFrame]);

  useEffect(() => {
    const scrollToHashForm = () => {
      if (window.location.hash === "#bp-join") scrollTo("bp-join");
    };
    scrollToHashForm();
    const timeouts = [120, 450, 900].map((delay) => window.setTimeout(scrollToHashForm, delay));
    window.addEventListener("hashchange", scrollToHashForm);
    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
      window.removeEventListener("hashchange", scrollToHashForm);
    };
  }, []);

  const tick = getCinemaTick(cinemaProgress);
  const stripOpacity = Math.max(0, 1 - cinemaProgress * 7);
  const hintOpacity = Math.max(0, 1 - tick.offset * 12);
  const scrollToForm = () => scrollTo("bp-join");

  return (
    <main className="vpo-business-react">
      <style>{businessCss}</style>
      <div className="noise" />
      <div className="vignette" />

      <section ref={cinemaRef} className="react-cinema">
        <div className="cinema-stage">
          <a className="brand-corner" href="/">
            <span className="brand-vpo">VPO</span>
            <span className="brand-sub">Studios</span>
          </a>
          <div className="dsm-title-strip" style={{ opacity: stripOpacity }}>
            <div className="dsm-strip-track" style={{ animationDuration: `${Math.max(18, 32 - cinemaProgress * 12)}s` }}>
              {Array.from({ length: 12 }).map((_, index) => (
                <span key={index}><span>VPO FOR BUSINESSES</span><i>·</i></span>
              ))}
            </div>
          </div>
          <div className="cinema-canvas">
            <CinemaCanvas progress={cinemaProgress} onOpen={setLightboxFrame} />
          </div>
          <EditorialOverlay tick={tick} onEnter={scrollToForm} />
          <div className="frame-progress">
            <span>{String(tick.idx + 1).padStart(2, "0")} / 05</span>
            <div>
              {frames.map((frame, index) => (
                <b key={frame.title} className={index === tick.idx ? "active" : ""} />
              ))}
            </div>
          </div>
          <div className="scroll-hint" style={{ opacity: hintOpacity }}><b /> <span>Scroll to explore</span></div>
        </div>
      </section>

      {lightboxFrame && (
        <div className="asset-lightbox" role="dialog" aria-modal="true" aria-label={`${lightboxFrame.title} image preview`} onClick={() => setLightboxFrame(null)}>
          <button type="button" className="asset-lightbox-close" aria-label="Close image preview" onClick={() => setLightboxFrame(null)}>×</button>
          <figure className="asset-lightbox-frame" onClick={(event) => event.stopPropagation()}>
            <img src={lightboxFrame.image} alt={lightboxFrame.title} />
            <figcaption>
              <span>{lightboxFrame.kicker}</span>
              <strong>{lightboxFrame.title}</strong>
            </figcaption>
          </figure>
        </div>
      )}

      <div id="business-page">
        <nav id="bp-nav">
          <a className="bp-nav-brand" href="/" title="Back to VPO">VPO.</a>
          <div className="bp-nav-links">
            <button className="bp-nav-link" onClick={() => scrollTo("bp-process")}>Process</button>
            <button className="bp-nav-link" onClick={() => scrollTo("bp-clients")}>Clients</button>
            <button className="bp-nav-link" onClick={() => scrollTo("bp-tiers")}>Tiers</button>
            <button className="bp-nav-link" onClick={() => scrollTo("bp-outcomes")}>Outcomes</button>
            <button className="bp-nav-link" onClick={() => scrollTo("bp-future")}>Coming Soon</button>
          </div>
          <button className="bp-nav-cta" onClick={() => scrollTo("bp-join")}>Contact Us</button>
        </nav>

        <section id="bp-intro">
          <div className="bp-intro-inner">
            <a className="bp-back-btn" href="/">← Return to Experience</a>
            <p className="bp-kicker">The VPO Partner Program</p>
            <h1 className="bp-intro-headline">Turn client content<br /><em>into worlds.</em></h1>
            <p className="bp-intro-sub">VPO gives fashion, fragrance, eyewear, and lifestyle brands a spatial storefront built from their actual product language: clean campaign visuals, high-quality screenshots, 3D product displays, virtual try-on, and live social shopping.</p>
            <div className="bp-paths">
              <button className="bp-path gold" onClick={scrollToForm}>✦ Contact for Gold</button>
              <button className="bp-path plat" onClick={scrollToForm}>✦ Contact for Platinum</button>
            </div>
          </div>
        </section>

        <BusinessProcess />
        <hr className="bp-divider" />
        <ClientReferences />
        <hr className="bp-divider" />
        <Tiers scrollTo={scrollTo} />
        <FeatureMatrix />
        <Outcomes />
        <Future />
        <Join />
      </div>
    </main>
  );
};

const BusinessProcess = () => (
  <section id="bp-process" className="bp-section bp-dotgrid">
    <div className="bp-container">
      <div className="bp-reveal">
        <span className="bp-kicker">01 — The Process</span>
        <h2 className="bp-h2">Three steps to<br />your spatial flagship.</h2>
      </div>
      <div className="bp-steps">
        {[
          ["Capture & Clean", "We collect public storefront copy, campaign visuals, and product assets after the page has fully loaded, avoiding loaders, skeleton screens, and half-rendered layouts."],
          ["Map Brand DNA", "We translate the brand's real categories, colors, product lines, and customer promise into a spatial plan: rooms, shelves, hotspots, try-on zones, and launch moments."],
          ["Publish the World", "The finished experience goes live as a branded 3D store with commerce links, analytics, multiplayer sessions, and campaign-ready landing copy."],
        ].map(([title, desc], index) => (
          <div key={title} className={`bp-step bp-reveal ${index === 0 ? "step-active" : ""}`}>
            <div className="bp-step-num">0{index + 1}</div>
            <h3 className="bp-step-title">{title}</h3>
            <p className="bp-step-desc">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ClientReferences = () => (
  <section id="bp-clients" className="bp-section">
    <div className="bp-container">
      <div className="bp-reveal">
        <span className="bp-kicker">02 — Client References</span>
        <h2 className="bp-h2">Real brands.<br />Usable source material.</h2>
        <p className="bp-lead">Public storefronts already carry the ingredients VPO needs: product photography, value props, categories, campaign drops, and service promises.</p>
      </div>
      <div className="bp-client-grid">
        {clients.map((client) => (
          <article key={client.name} className="bp-client-card bp-reveal">
            <div className="bp-client-media"><img src={client.image} alt={`${client.name} campaign reference`} /></div>
            <div className="bp-client-body">
              <h3 className="bp-client-name">{client.name}</h3>
              <p className="bp-client-type">{client.type}</p>
              <p className="bp-client-copy">{client.copy}</p>
              <a className="bp-client-link" href={client.link}>Open case study →</a>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const Tiers = ({ scrollTo }: { scrollTo: (id: string) => void }) => (
  <section id="bp-tiers" className="bp-section">
    <div className="bp-container">
      <div className="bp-reveal">
        <span className="bp-kicker">03 — Partnership Tiers</span>
        <h2 className="bp-h2">Choose your world.</h2>
        <p className="bp-lead">Two tiers. One purpose: elevating your brand above the static. Select the level of immersion your brand deserves.</p>
      </div>
      <div className="bp-tier-grid">
        {tiers.map((tier) => (
          <article key={tier.name} className={`bp-tier-card ${tier.tone} bp-reveal`}>
            {tier.tone === "plat" && <div className="bp-featured-badge">Featured</div>}
            <div className="bp-tier-icon"><div className={`tier-gem ${tier.tone === "gold" ? "gold-gem" : "plat-gem"}`} /></div>
            <p className={`bp-tier-name ${tier.tone}`}>{tier.name}</p>
            <h3 className="bp-tier-headline">{tier.headline}</h3>
            <p className="bp-tier-tagline">{tier.tagline}</p>
            <div className="bp-tier-price">
              <div className="bp-price-amount">{tier.amount}<span>/mo</span></div>
              <span className="bp-price-period">{tier.period}</span>
              <span className="bp-price-note">{tier.note}</span>
            </div>
            <ul className="bp-tier-features">
              {tier.features.map((feature) => <li key={feature}><span className="bp-feat-dot" />{feature}</li>)}
            </ul>
            <button className="bp-tier-cta" onClick={() => scrollTo("bp-join")}>Contact us about {tier.tone === "gold" ? "Gold" : "Platinum"} →</button>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const FeatureMatrix = () => (
  <section id="bp-features" className="bp-section">
    <div className="bp-container">
      <div className="bp-reveal">
        <span className="bp-kicker">04 — Feature Comparison</span>
        <h2 className="bp-h2">What's included.</h2>
      </div>
      <table className="bp-feat-table bp-reveal">
        <thead><tr className="bp-table-head"><th></th><th className="th-gold">Gold</th><th className="th-plat">Platinum</th></tr></thead>
        <tbody>
          {featureGroups.map(([group, rows]) => (
            <Fragment key={group}>
              <tr key={group}><td colSpan={3} className="bp-feat-cat">{group}</td></tr>
              {rows.map(([name, gold, plat]) => (
                <tr key={name} className="bp-feat-row">
                  <td className="bp-feat-name">{name}</td>
                  <td className={typeof gold === "boolean" ? `bp-feat-check ${gold ? "has-gold" : "no-feat"}` : "bp-feat-name bp-feat-small"}>{typeof gold === "string" ? gold : ""}</td>
                  <td className={typeof plat === "boolean" ? `bp-feat-check ${plat ? "has-plat" : "no-feat"}` : "bp-feat-name bp-feat-small"}>{typeof plat === "string" ? plat : ""}</td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

const Outcomes = () => (
  <section id="bp-outcomes" className="bp-section">
    <div className="bp-container">
      <div className="bp-outcomes-intro bp-reveal">
        <span className="bp-kicker">05 — Business Impact</span>
        <h2 className="bp-h2">What changes<br />when commerce<br /><em>becomes spatial.</em></h2>
        <p className="bp-lead">The pitch is simple: fewer dead product pages, more guided discovery, stronger brand recall, and visual references customers can understand before they buy.</p>
      </div>
      <div className="bp-metrics-grid bp-reveal">
        {metrics.map(([value, label, icon]) => (
          <div key={label} className="bp-metric counted">
            <div className="bp-metric-bar" /><div className="bp-metric-icon">{icon}</div>
            <div className="bp-metric-value">{value}</div><div className="bp-metric-label">{label}</div>
          </div>
        ))}
      </div>
      <div className="bp-journey journey-active bp-reveal">
        <div className="bp-journey-line"><div className="bp-journey-line-fill" /></div>
        <div className="bp-journey-nodes">
          {["Discovery", "Exploration", "Try-On", "Social", "Conversion", "Return"].map((label, index) => (
            <div className="bp-journey-node" key={label}>
              <div className="bp-journey-dot" /><div className="bp-journey-label">{label}</div>
              <div className="bp-journey-val">{["Enters World", "+8.4 min avg", "AR Fitting", "Shares lobby", "+2.3x rate", "Recurring visit"][index]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Future = () => (
  <section id="bp-future" className="bp-section">
    <div className="bp-container">
      <div className="bp-reveal">
        <span className="bp-kicker">06 — The Frontier</span>
        <h2 className="bp-h2">What's coming<br />next.</h2>
        <p className="bp-lead">VPO's roadmap is built at the edge of what commerce and technology can do. Platinum partners receive early access to every feature below.</p>
      </div>
      <div className="bp-future-grid">
        {future.map(([time, icon, name, desc]) => (
          <article key={name} className="bp-future-card bp-reveal">
            <div className="bp-scan-line" /><span className="bp-future-timeline">{time}</span>
            <span className="bp-future-icon">{icon}</span><h4 className="bp-future-name">{name}</h4><p className="bp-future-desc">{desc}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const Join = () => (
  <section id="bp-join" className="bp-section">
    <div className="bp-container">
      <div className="bp-join-inner bp-reveal">
        <span className="bp-kicker">07 — Contact</span>
        <h2 className="bp-h2">Join the<br /><em>Vanguard.</em></h2>
        <p className="bp-lead">Access is limited to curated partner brands. Secure your place.</p>
        <form className="bp-join-form" action={`https://formsubmit.co/${FORM_EMAIL}`} method="POST">
          <div className="bp-input-row">
            <input className="bp-input" name="brand_name" placeholder="Brand Name" required />
            <input className="bp-input" name="business_email" type="email" placeholder="Business Email" required />
          </div>
          <div className="bp-input-row">
            <input className="bp-input" name="website_url" type="url" placeholder="Website URL" />
            <select className="bp-select" name="tier_interest" defaultValue="" required>
              <option value="" disabled>Select Tier Interest</option>
              <option>Gold Partner — $1,999/mo</option>
              <option>Platinum Partner — $5,999/mo</option>
              <option>Not sure yet — advise me</option>
            </select>
          </div>
          <textarea className="bp-input bp-textarea" name="message" placeholder="What should VPO help you build?" required />
          <input type="hidden" name="_subject" value="New VPO business lead" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value={getFormReturnUrl()} />
          <button className="bp-submit" type="submit">Contact VPO</button>
        </form>
        <p className="bp-join-note">Applications reviewed within 72 hours. Limited availability per quarter.</p>
      </div>
    </div>
  </section>
);

const businessCss = `
.vpo-business-react{--bg:#080705;--fg:hsl(40,6%,92%);--muted:rgba(235,233,228,.48);--border:rgba(255,255,255,.07);--accent-blue:rgba(120,165,220,.52);--serif:'Cormorant Garamond',Georgia,serif;--sans:'Instrument Sans',system-ui,sans-serif;--mono:'IBM Plex Mono',ui-monospace,monospace;--ease:cubic-bezier(.16,1,.3,1);background:var(--bg);color:var(--fg);min-height:100vh;font-family:var(--sans);-webkit-font-smoothing:antialiased}
.vpo-business-react *{box-sizing:border-box}.noise,.vignette{position:fixed;inset:0;pointer-events:none}.noise{z-index:80;opacity:.032;mix-blend-mode:overlay;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}.vignette{z-index:1;background:radial-gradient(1200px 800px at 50% 35%,transparent 40%,rgba(0,0,0,.6) 100%),radial-gradient(900px 700px at 15% 75%,rgba(8,7,5,0) 30%,rgba(8,7,5,.7) 100%)}
.react-cinema{height:580vh;position:relative;background:#050403}.cinema-stage{position:sticky;top:0;height:100vh;overflow:hidden;background:#050403}.brand-corner{position:absolute;top:52px;left:32px;z-index:40;text-decoration:none;mix-blend-mode:difference;animation:brand-corner-pulse 2.4s ease-in-out infinite}.brand-vpo{display:block;font-family:var(--serif);font-style:italic;font-size:26px;letter-spacing:-.02em;color:white;line-height:1}.brand-sub{display:block;margin-top:4px;font-family:var(--mono);font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(235,233,228,.45)}@keyframes brand-corner-pulse{0%,100%{transform:scale(1);opacity:.9}50%{transform:scale(1.13);opacity:1}}.dsm-title-strip{position:absolute;top:50%;left:0;right:0;transform:translateY(-50%);height:clamp(80px,12vh,120px);display:flex;align-items:center;overflow:hidden;z-index:5;pointer-events:none;user-select:none;background:transparent;transition:opacity .12s linear}.dsm-title-strip:before,.dsm-title-strip:after{content:'';position:absolute;top:0;bottom:0;width:10vw;z-index:2;pointer-events:none}.dsm-title-strip:before{left:0;background:linear-gradient(90deg,var(--bg) 0%,transparent 100%)}.dsm-title-strip:after{right:0;background:linear-gradient(270deg,var(--bg) 0%,transparent 100%)}.dsm-strip-track{display:flex;align-items:center;width:max-content;will-change:transform;white-space:nowrap;animation:dsm-strip-scroll 32s linear infinite;font-family:var(--serif);font-style:italic;font-weight:300;font-size:clamp(2rem,4.2vw,3.8rem);letter-spacing:-.02em;color:rgba(235,233,228,.92);line-height:1;text-shadow:0 0 0 rgba(235,233,228,.9),0 0 18px rgba(235,233,228,.28),0 0 50px rgba(235,233,228,.12),0 0 90px rgba(120,165,220,.08)}.dsm-strip-track i{display:inline-block;margin:0 3rem;color:rgba(120,165,220,.5);font-style:normal;font-size:.45em;vertical-align:middle;text-shadow:0 0 12px rgba(120,165,220,.45)}@keyframes dsm-strip-scroll{from{transform:translateX(-50%)}to{transform:translateX(0)}}.cinema-canvas{position:absolute;inset:0;z-index:10}.cinema-canvas canvas{background:transparent!important}.cloud-haze{position:relative;width:100%;will-change:transform}.splash-bg{position:absolute;background:rgba(8,7,5,.52);backdrop-filter:blur(10px) saturate(110%);-webkit-backdrop-filter:blur(10px) saturate(110%);pointer-events:none;z-index:0;will-change:opacity,transform}.cloud-content{position:relative;z-index:3;padding:2.8rem 2.4rem}.cloud-content--center{text-align:center}.vpo-column{position:absolute;top:0;bottom:0;width:clamp(300px,42vw,700px);pointer-events:none;z-index:30}.vpo-column--right{right:0}.vpo-column--left{left:0}.vpo-blur-plate{position:absolute;inset:-8%;background-size:cover;background-position:center;filter:blur(38px) saturate(105%);transform:scale(1.06);opacity:0;transition:opacity 1s var(--ease)}.vpo-blur-plate.is-on{opacity:.1}.vpo-panel-wrap{position:relative;z-index:4;height:100%;display:flex;align-items:center;padding:5.5rem 1.25rem 4rem;box-sizing:border-box}.vpo-panel-wrap--right{justify-content:flex-end;padding-right:clamp(1.25rem,3.5vw,2.5rem)}.vpo-panel-wrap--left{justify-content:flex-start;padding-left:clamp(1.25rem,3.5vw,2.5rem)}.vpo-center-wrap{position:absolute;inset:0;z-index:30;display:flex;align-items:center;justify-content:center;padding:2rem;box-sizing:border-box;pointer-events:none}.headline-reveal{font-family:var(--serif);font-style:italic;font-weight:300;color:var(--fg);margin:0 0 1.5rem;line-height:1.06;letter-spacing:-.02em;font-size:clamp(2.25rem,4.4vw,3.4rem);transition:clip-path 60ms linear}.headline-reveal--finale{font-size:clamp(2.4rem,5.2vw,4.2rem)}.cinema-kicker{display:block;font-family:var(--mono);font-size:9px;letter-spacing:.28em;text-transform:uppercase;margin-bottom:1.4rem;color:rgba(120,165,220,.85)}.composed-body{margin:0;font-size:14px;font-weight:300;line-height:1.72;color:rgba(235,233,228,.78)}.composed-body span{display:inline-block;transition:opacity 60ms linear,transform 60ms linear}.cinema-cta-wrap{margin-top:2.5rem;display:flex;justify-content:center;pointer-events:auto}.cinema-cta{display:inline-flex;align-items:center;justify-content:center;gap:12px;padding:14px 32px;background:var(--fg);color:var(--bg);border:0;cursor:pointer;font-family:var(--mono);font-size:10px;letter-spacing:.22em;text-transform:uppercase;position:relative;overflow:hidden;transition:opacity .3s var(--ease)}.cinema-cta:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,.18) 50%,transparent 100%);transform:translateX(-100%);transition:transform .6s var(--ease)}.cinema-cta:hover{opacity:.9}.cinema-cta:hover:after{transform:translateX(100%)}.frame-progress{position:absolute;bottom:32px;left:32px;z-index:40;pointer-events:none;display:flex;flex-direction:column;gap:8px}.frame-progress span{font-family:var(--mono);font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:rgba(235,233,228,.3)}.frame-progress div{display:flex;gap:6px;align-items:center}.frame-progress b{width:5px;height:5px;border-radius:999px;background:rgba(235,233,228,.18);transition:background .4s var(--ease),transform .4s var(--ease)}.frame-progress b.active{background:rgba(235,233,228,.8);transform:scale(1.3)}.scroll-hint{position:absolute;right:32px;bottom:32px;z-index:40;pointer-events:none;display:flex;flex-direction:column;align-items:flex-end;gap:6px;mix-blend-mode:difference}.scroll-hint b{display:block;width:6px;height:6px;border-radius:999px;background:rgba(235,233,228,.8);animation:scroll-dot-pulse 2.2s ease-in-out infinite}.scroll-hint span{font-family:var(--serif);font-style:italic;font-size:13px;color:rgba(235,233,228,.55)}@keyframes scroll-dot-pulse{0%,100%{opacity:.8;transform:scale(1)}50%{opacity:.35;transform:scale(.7)}}
.asset-lightbox{position:fixed;inset:0;z-index:120;display:flex;align-items:center;justify-content:center;padding:28px;background:rgba(5,4,3,.86);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px)}.asset-lightbox-frame{width:min(1120px,92vw);height:min(780px,82vh);margin:0;display:grid;grid-template-rows:minmax(0,1fr) auto;background:#050403;border:1px solid rgba(255,255,255,.12);box-shadow:0 28px 90px rgba(0,0,0,.55)}.asset-lightbox-frame img{width:100%;height:100%;object-fit:contain;background:#030302}.asset-lightbox-frame figcaption{display:flex;align-items:center;justify-content:space-between;gap:24px;padding:16px 18px;border-top:1px solid rgba(255,255,255,.08)}.asset-lightbox-frame span{font-family:var(--mono);font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(235,233,228,.42)}.asset-lightbox-frame strong{font-family:var(--serif);font-style:italic;font-weight:300;font-size:1.7rem;color:var(--fg);text-align:right}.asset-lightbox-close{position:fixed;top:20px;right:20px;z-index:121;width:42px;height:42px;border:1px solid rgba(255,255,255,.16);background:rgba(8,7,5,.82);color:var(--fg);font-size:28px;line-height:1;cursor:pointer}.asset-lightbox-close:hover{background:rgba(235,233,228,.92);color:#050403}#business-page{position:relative;z-index:4;background:var(--bg);scrollbar-width:none}#business-page::-webkit-scrollbar{display:none}.bp-section{padding:120px 0;position:relative}.bp-container{width:min(1400px,100%);margin:0 auto;padding:0 40px}.bp-kicker{font-family:var(--mono);font-size:10px;letter-spacing:.28em;text-transform:uppercase;color:rgba(235,233,228,.35);display:block;margin-bottom:20px}.bp-h2{font-family:var(--serif);font-style:italic;font-weight:300;font-size:clamp(2.8rem,5vw,5rem);letter-spacing:-.025em;line-height:1.05;color:var(--fg);margin:0 0 24px}.bp-lead{font-size:16px;font-weight:300;line-height:1.75;color:rgba(235,233,228,.55);max-width:56ch}.bp-divider{border:none;border-top:1px solid rgba(255,255,255,.07);margin:0}.bp-dotgrid:before,#bp-intro:before{content:'';position:absolute;inset:0;pointer-events:none;background-image:radial-gradient(rgba(235,233,228,.04) 1px,transparent 1px);background-size:36px 36px}
#bp-nav{position:sticky;top:0;z-index:10;height:56px;display:flex;align-items:center;justify-content:space-between;padding:0 40px;background:rgba(8,7,5,.88);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,.06)}@keyframes bp-brand-pulse{0%,100%{transform:scale(1);opacity:.85}50%{transform:scale(1.12);opacity:1}}.bp-nav-brand{font-family:var(--serif);font-style:italic;font-size:22px;letter-spacing:-.02em;color:var(--fg);text-decoration:none;animation:bp-brand-pulse 2.4s ease-in-out infinite;text-shadow:0 0 18px rgba(235,233,228,.3)}.bp-nav-links{display:flex;gap:28px}.bp-nav-link{font-family:var(--mono);font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:rgba(235,233,228,.4);background:none;border:0;padding:0;cursor:pointer}.bp-nav-link:hover{color:var(--fg)}.bp-nav-cta{font-family:var(--mono);font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:#040302;background:var(--fg);border:0;padding:8px 18px;cursor:pointer}
#bp-intro{min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;background:radial-gradient(ellipse 80% 60% at 50% 40%,rgba(120,165,220,.06) 0%,transparent 70%);position:relative;overflow:hidden}.bp-intro-inner{position:relative;z-index:1;padding:160px 40px 100px}.bp-intro-headline{font-family:var(--serif);font-style:italic;font-weight:300;font-size:clamp(3.5rem,8vw,8rem);letter-spacing:-.04em;line-height:1.02;color:var(--fg);margin:0 0 32px}.bp-intro-sub{font-size:15px;font-weight:300;line-height:1.8;color:rgba(235,233,228,.5);max-width:52ch;margin:0 auto 48px}.bp-back-btn{display:inline-flex;align-items:center;font-family:var(--mono);font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:rgba(235,233,228,.35);text-decoration:none;margin-bottom:80px}.bp-paths{display:flex;gap:20px;justify-content:center;flex-wrap:wrap;margin-top:16px}.bp-path{padding:14px 28px;border:1px solid rgba(255,255,255,.1);font-family:var(--mono);font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:rgba(235,233,228,.55);background:rgba(255,255,255,.02);cursor:pointer}.bp-path.gold{border-color:rgba(195,155,75,.4);color:rgba(215,175,100,.8)}.bp-path.plat{border-color:rgba(180,190,210,.4);color:rgba(200,210,225,.8)}
#bp-process,#bp-features{background:#060504}.bp-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:0;margin-top:64px;position:relative}.bp-steps:before{content:'';position:absolute;top:52px;left:16.5%;right:16.5%;height:1px;background:linear-gradient(90deg,rgba(120,165,220,.5),rgba(255,255,255,.08))}.bp-step{padding:0 32px 48px;text-align:center}.bp-step-num{width:48px;height:48px;border-radius:50%;border:1px solid rgba(120,165,220,.35);display:flex;align-items:center;justify-content:center;margin:0 auto 24px;font-family:var(--mono);font-size:11px;letter-spacing:.15em;color:rgba(120,165,220,.8);position:relative;z-index:1;background:#060504}.bp-step.step-active .bp-step-num{border-color:rgba(120,165,220,.8);box-shadow:0 0 24px rgba(120,165,220,.2)}.bp-step-title,.bp-tier-headline,.bp-future-name{font-family:var(--serif);font-style:italic;font-weight:300;color:var(--fg)}.bp-step-title{font-size:1.7rem;margin:0 0 12px}.bp-step-desc{font-size:13px;font-weight:300;line-height:1.7;color:rgba(235,233,228,.45)}
.bp-client-grid,.bp-future-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:54px}.bp-client-card{min-height:520px;border:1px solid rgba(255,255,255,.08);background:#0b0a08;overflow:hidden}.bp-client-media{height:310px;background:#111;overflow:hidden}.bp-client-media img{width:100%;height:100%;object-fit:cover;filter:saturate(.88) contrast(1.04)}.bp-client-body{padding:26px}.bp-client-name{font-family:var(--serif);font-size:clamp(1.7rem,3vw,2.4rem);font-weight:300;letter-spacing:-.03em;color:var(--fg)}.bp-client-type{margin:10px 0 16px;font-family:var(--mono);font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:rgba(235,233,228,.34)}.bp-client-copy{font-size:12px;line-height:1.7;color:rgba(235,233,228,.48)}.bp-client-link{display:inline-block;margin-top:22px;font-family:var(--mono);font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:rgba(235,233,228,.72);text-decoration:none}
#bp-tiers,#bp-future{background:#080705}.bp-tier-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:64px}.bp-tier-card{position:relative;padding:48px 40px;overflow:hidden;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.02)}.bp-tier-card.gold{border-color:rgba(195,155,75,.2)}.bp-tier-card.gold:before,.bp-tier-card.plat:before{content:'';position:absolute;inset:-1px;pointer-events:none;background:linear-gradient(135deg,rgba(195,155,75,.12),transparent 55%)}.bp-tier-card.plat{border-color:rgba(180,190,210,.25)}.bp-tier-card.plat:before{background:linear-gradient(135deg,rgba(180,190,210,.16),transparent 55%)}.bp-featured-badge{position:absolute;top:20px;right:20px;font-family:var(--mono);font-size:8px;letter-spacing:.2em;text-transform:uppercase;padding:5px 10px;background:rgba(180,190,210,.12);border:1px solid rgba(180,190,210,.25);color:rgba(200,210,225,.8)}.tier-gem{width:28px;height:28px;transform:rotate(45deg);margin-bottom:24px}.gold-gem{background:linear-gradient(135deg,#c9a84c,#e6c96f,#a87a2a)}.plat-gem{background:linear-gradient(135deg,#b0bcd0,#dde5f0,#8a98b0);box-shadow:0 0 20px rgba(180,200,230,.25)}.bp-tier-name{font-family:var(--mono);font-size:10px;letter-spacing:.28em;text-transform:uppercase;margin-bottom:8px}.bp-tier-name.gold{color:rgba(210,175,90,.85)}.bp-tier-name.plat{color:rgba(190,205,225,.85)}.bp-tier-headline{font-size:2.2rem;margin:0 0 8px}.bp-tier-tagline{font-size:13px;color:rgba(235,233,228,.4);margin-bottom:32px}.bp-tier-price{margin-bottom:32px;padding-bottom:32px;border-bottom:1px solid rgba(255,255,255,.07)}.bp-price-amount{font-family:var(--serif);font-weight:300;font-size:3.2rem;letter-spacing:-.03em;color:var(--fg);line-height:1}.bp-price-amount span{font-size:1.1rem;opacity:.5}.bp-price-period{font-family:var(--mono);font-size:10px;letter-spacing:.12em;color:rgba(235,233,228,.3);display:block;margin-top:4px}.bp-price-note{font-size:11px;color:rgba(235,233,228,.25);margin-top:6px;display:block}.bp-tier-features{list-style:none;padding:0;margin:0 0 36px;display:grid;gap:12px}.bp-tier-features li{display:flex;align-items:flex-start;gap:12px;font-size:13px;font-weight:300;color:rgba(235,233,228,.7);line-height:1.5}.bp-feat-dot{width:5px;height:5px;border-radius:50%;flex-shrink:0;margin-top:6px}.gold .bp-feat-dot{background:rgba(210,175,90,.7)}.plat .bp-feat-dot{background:rgba(190,205,225,.7)}.bp-tier-cta{width:100%;padding:14px;border:0;cursor:pointer;font-family:var(--mono);font-size:10px;letter-spacing:.22em;text-transform:uppercase}.gold .bp-tier-cta{background:rgba(195,155,75,.12);color:rgba(215,180,100,.9);border:1px solid rgba(195,155,75,.35)}.plat .bp-tier-cta{background:rgba(235,233,228,.9);color:#080705}
.bp-feat-table{width:100%;margin-top:64px;border-collapse:collapse}.bp-feat-cat{font-family:var(--mono);font-size:9px;letter-spacing:.28em;text-transform:uppercase;color:rgba(235,233,228,.28);padding:24px 0 12px;text-align:left}.bp-feat-row{border-top:1px solid rgba(255,255,255,.05)}.bp-feat-name{font-size:13px;font-weight:300;color:rgba(235,233,228,.65);padding:16px 0;width:55%}.bp-feat-small{font-size:11px;color:rgba(235,233,228,.35);text-align:center;width:22.5%}.bp-feat-check{text-align:center;padding:16px 0;width:22.5%}.bp-feat-check.has-gold:after,.bp-feat-check.has-plat:after{content:'✦';font-size:11px}.bp-feat-check.has-gold:after{color:rgba(210,175,90,.8)}.bp-feat-check.has-plat:after{color:rgba(190,205,225,.85)}.bp-feat-check.no-feat:after{content:'—';color:rgba(255,255,255,.12);font-size:11px}.bp-table-head th{font-family:var(--mono);font-size:10px;letter-spacing:.22em;text-transform:uppercase;padding:0 0 24px;text-align:center}.bp-table-head th:first-child{text-align:left;color:rgba(235,233,228,.25)}.th-gold{color:rgba(210,175,90,.75)}.th-plat{color:rgba(190,205,225,.75)}
#bp-outcomes{background:#050403;border-top:1px solid rgba(255,255,255,.06);border-bottom:1px solid rgba(255,255,255,.06)}.bp-outcomes-intro{max-width:44ch;margin-bottom:72px}.bp-metrics-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(255,255,255,.06)}.bp-metric{background:#050403;padding:48px 36px;position:relative;overflow:hidden}.bp-metric-bar{position:absolute;bottom:0;left:0;height:2px;width:100%;background:linear-gradient(90deg,rgba(120,165,220,.7),rgba(120,165,220,0))}.bp-metric-icon{position:absolute;top:20px;right:20px;font-size:18px;opacity:.15}.bp-metric-value{font-family:var(--serif);font-weight:300;font-style:italic;font-size:clamp(2.8rem,4.5vw,4.5rem);letter-spacing:-.03em;line-height:1;color:var(--fg);margin-bottom:10px}.bp-metric-label{font-size:12px;font-weight:300;color:rgba(235,233,228,.4);line-height:1.5}.bp-journey{margin-top:80px;position:relative}.bp-journey-line{position:absolute;top:24px;left:0;right:0;height:1px;background:rgba(255,255,255,.06);overflow:hidden}.bp-journey-line-fill{height:100%;width:100%;background:linear-gradient(90deg,rgba(120,165,220,.6),rgba(120,165,220,.1))}.bp-journey-nodes{display:flex;justify-content:space-between;position:relative}.bp-journey-node{text-align:center;flex:1}.bp-journey-dot{width:10px;height:10px;border-radius:50%;border:1px solid rgba(120,165,220,.9);background:#050403;margin:19px auto 16px;box-shadow:0 0 14px rgba(120,165,220,.35)}.bp-journey-label{font-family:var(--mono);font-size:8px;letter-spacing:.2em;text-transform:uppercase;color:rgba(235,233,228,.3)}.bp-journey-val{font-family:var(--serif);font-style:italic;font-size:1.1rem;color:var(--fg);margin-top:4px}
.bp-future-grid{gap:16px;margin-top:64px}.bp-future-card{padding:32px 28px;border:1px solid rgba(255,255,255,.06);background:rgba(255,255,255,.01);position:relative;overflow:hidden}.bp-scan-line{position:absolute;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(120,165,220,.25),transparent);top:0;animation:bp-scan 4s linear infinite}@keyframes bp-scan{from{transform:translateY(-100%)}to{transform:translateY(400%)}}.bp-future-timeline{font-family:var(--mono);font-size:8px;letter-spacing:.22em;text-transform:uppercase;color:rgba(120,165,220,.6);margin-bottom:18px;border:1px solid rgba(120,165,220,.2);padding:3px 8px;display:inline-block}.bp-future-icon{font-size:22px;margin-bottom:14px;opacity:.55;display:block}.bp-future-name{font-size:1.4rem;margin-bottom:10px}.bp-future-desc{font-size:12px;font-weight:300;line-height:1.65;color:rgba(235,233,228,.38)}
#bp-join{background:#040302;text-align:center;border-top:1px solid rgba(255,255,255,.06)}.bp-join-inner{max-width:620px;margin:0 auto}.bp-join-form{margin-top:48px;display:grid;gap:14px}.bp-input-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}.bp-input,.bp-select{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);padding:14px 18px;font-family:var(--sans);font-size:13px;color:var(--fg);outline:none;width:100%}.bp-input::placeholder{color:rgba(235,233,228,.25)}.bp-textarea{min-height:130px;resize:vertical}.bp-submit{width:100%;padding:18px;background:var(--fg);color:#040302;border:0;cursor:pointer;font-family:var(--mono);font-size:11px;letter-spacing:.24em;text-transform:uppercase}.bp-join-note{font-family:var(--mono);font-size:10px;letter-spacing:.15em;color:rgba(235,233,228,.2);margin-top:20px}.bp-reveal{opacity:0;transform:translateY(28px);transition:opacity .9s var(--ease),transform .9s var(--ease)}.bp-reveal.revealed{opacity:1;transform:translateY(0)}
@media(max-width:760px){.asset-lightbox{padding:18px}.asset-lightbox-frame{width:92vw;height:78vh}.asset-lightbox-frame figcaption{display:block;padding:14px}.asset-lightbox-frame span{display:block;margin-bottom:8px}.asset-lightbox-frame strong{display:block;text-align:left;font-size:1.35rem;line-height:1.1}.asset-lightbox-close{top:14px;right:14px;width:38px;height:38px}}@media(max-width:900px){.bp-client-grid,.bp-future-grid{grid-template-columns:1fr}.bp-metrics-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:800px){.bp-steps,.bp-tier-grid{grid-template-columns:1fr}.bp-steps:before{display:none}}@media(max-width:760px){.react-cinema{height:520svh}.brand-corner{top:42px;left:28px}.dsm-title-strip{height:90px}.dsm-strip-track{font-size:2.2rem}.vpo-column{inset:0;width:auto}.vpo-panel-wrap{height:100%;align-items:flex-end;padding:0 24px 105px!important;justify-content:center}.vpo-panel-wrap--left,.vpo-panel-wrap--right{justify-content:center}.vpo-blur-plate{inset:35% -20% -15%;filter:blur(30px);opacity:.08}.cloud-content{padding:2rem 1.65rem}.headline-reveal{font-size:clamp(2.15rem,10vw,3.1rem)}.headline-reveal--finale{font-size:clamp(2.35rem,11vw,3.4rem)}.composed-body{font-size:12px;line-height:1.65}.cinema-kicker{font-size:8px;letter-spacing:.22em;margin-bottom:1rem}.vpo-center-wrap{align-items:flex-end;padding:0 24px 120px}.frame-progress{left:32px}.scroll-hint{right:32px}.bp-container{padding:0 24px}.bp-section{padding:86px 0}#bp-nav{height:auto;min-height:76px;padding:10px 16px 0;display:grid;grid-template-columns:1fr auto;grid-template-areas:'brand cta' 'links links';row-gap:10px;align-items:center}.bp-nav-brand{grid-area:brand;font-size:21px}.bp-nav-cta{grid-area:cta;padding:8px 12px;font-size:8px;letter-spacing:.16em;white-space:nowrap}.bp-nav-links{grid-area:links;display:flex;gap:18px;max-width:calc(100vw - 32px);overflow-x:auto;overflow-y:hidden;padding:0 0 10px;scrollbar-width:none}.bp-nav-links::-webkit-scrollbar{display:none}.bp-nav-link{flex:0 0 auto;font-size:8px;letter-spacing:.18em;white-space:nowrap}.bp-intro-inner{padding:110px 24px 80px}.bp-intro-headline{font-size:clamp(3.3rem,15vw,5.3rem)}.bp-input-row{grid-template-columns:1fr}.bp-journey-nodes{display:grid;grid-template-columns:repeat(2,1fr);gap:24px}.bp-journey-line{display:none}}@media(max-width:540px){.bp-metrics-grid{grid-template-columns:1fr}.bp-feat-table{min-width:680px}.bp-container{overflow-x:hidden}}
`;

export default VPOBusiness;
