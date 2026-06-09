/**
 * The Atelier collection — the curated set of volumetric-capture pieces that
 * can be inspected in the interactive 3D showroom (`/atelier`).
 *
 * Each entry maps to a real GLB/GLTF asset shipped in `public/models`.
 */
export interface AtelierPiece {
  id: string;
  index: string;
  name: string;
  designer: string;
  house: string;
  material: string;
  edition: string;
  year: string;
  note: string;
  modelUrl: string;
  /** Multiplier applied after auto-framing to fine-tune presence in frame. */
  presence: number;
}

export const atelierCollection: AtelierPiece[] = [
  {
    id: "nocturne-gown",
    index: "01",
    name: "Nocturne Gown",
    designer: "Atelier VPO",
    house: "In-House Couture",
    material: "Silk-crepe, hand-draped",
    edition: "Edition of 12",
    year: "FW / 26",
    note: "A single continuous cut, captured mid-fall. The weight of the crepe reads in the way it gathers at the hem — study it from below.",
    modelUrl: "/models/blackdress.glb",
    presence: 1,
  },
  {
    id: "j-darnel-miu-miu",
    index: "02",
    name: "Runway No. 01",
    designer: "J. Darnel",
    house: "Miu Miu",
    material: "Volumetric runway capture",
    edition: "Archive piece",
    year: "SS / 25",
    note: "A full-look capture from the opening walk. Silhouette, styling and posture preserved exactly as it left the runway.",
    modelUrl: "/models/j._darnel_miu_miu.glb",
    presence: 1,
  },
  {
    id: "anna-chasovsky",
    index: "03",
    name: "Portrait Study",
    designer: "Anna Chasovsky",
    house: "Independent",
    material: "Photogrammetry portrait",
    edition: "1 of 1",
    year: "26",
    note: "A high-fidelity portrait scan. Rotate slowly — the texture detail is at its richest in raking light.",
    modelUrl: "/models/anna_chasovsky/scene.gltf",
    presence: 1,
  },
];

export interface AtelierEnvironment {
  id: string;
  label: string;
  /** CSS background for the stage behind the model. */
  background: string;
  /** Ground-plane / contact-shadow tint. */
  ground: string;
  /** Overall lighting warmth key. */
  key: string;
  fill: string;
  ambient: number;
}

export const atelierEnvironments: AtelierEnvironment[] = [
  {
    id: "noir",
    label: "Noir",
    background: "radial-gradient(120% 90% at 50% 25%, hsl(30 8% 13%) 0%, hsl(30 8% 6%) 60%, hsl(30 8% 4%) 100%)",
    ground: "#050505",
    key: "#ffffff",
    fill: "#e9dccb",
    ambient: 0.35,
  },
  {
    id: "gallery",
    label: "Gallery",
    background: "radial-gradient(120% 90% at 50% 20%, hsl(40 14% 95%) 0%, hsl(38 12% 90%) 60%, hsl(36 10% 85%) 100%)",
    ground: "#c9c2b6",
    key: "#fffaf3",
    fill: "#ffffff",
    ambient: 0.75,
  },
  {
    id: "ember",
    label: "Ember",
    background: "radial-gradient(120% 90% at 50% 30%, hsl(18 20% 12%) 0%, hsl(14 25% 7%) 55%, hsl(10 30% 4%) 100%)",
    ground: "#1a0d08",
    key: "#ffd9b0",
    fill: "#ff6a3d",
    ambient: 0.4,
  },
];
