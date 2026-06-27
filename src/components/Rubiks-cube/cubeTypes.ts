import type { Vector3Tuple } from "three";

export type CubeCoordinate = -1 | 0 | 1;
export type CubieType = "center" | "edge" | "corner";

export type CubieConfig = {
  x: CubeCoordinate;
  y: CubeCoordinate;
  z: CubeCoordinate;
  type: CubieType;
};

export type CubieColors = {
  top: string;
  bottom: string;
  front: string;
  back: string;
  right: string;
  left: string;
};

export type CubieRenderProps = CubieConfig & {
  colors: CubieColors;
  position: Vector3Tuple;
  rotation: Vector3Tuple;
};
