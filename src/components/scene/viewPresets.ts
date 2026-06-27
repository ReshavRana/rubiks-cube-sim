import type { Vector3Tuple } from "three";

export type ViewAxis = "x" | "y" | "z" | "iso";

export const VIEW_PRESETS: Record<ViewAxis, Vector3Tuple> = {
  x: [10, 0, 0],
  y: [0, 10, 0],
  z: [0, 0, 10],
  iso: [8, 8, 8],
};
