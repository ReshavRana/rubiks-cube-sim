import type { Vector3Tuple } from "three";
import type { CubeCoordinate, CubieColors, CubieConfig, CubieType } from "./cubeTypes";

export const CUBIE_STEP = 70;

const COORDINATES: CubeCoordinate[] = [-1, 0, 1];
const HALF_PI = Math.PI / 2;

const FACE_COLORS: CubieColors = {
  top: "green",
  bottom: "blue",
  front: "white",
  back: "yellow",
  right: "red",
  left: "orange",
};

export const CUBIE_CONFIGS: CubieConfig[] = COORDINATES.flatMap((x) =>
  COORDINATES.flatMap((y) =>
    COORDINATES.flatMap((z) => {
      if (x === 0 && y === 0 && z === 0) {
        return [];
      }

      return [{ x, y, z, type: getCubieType(x, y, z) }];
    }),
  ),
);

export function getCubieColors(): CubieColors {
  return FACE_COLORS;
}

export function getCubiePosition({ x, y, z }: CubieConfig): Vector3Tuple {
  return [x * CUBIE_STEP, y * CUBIE_STEP, z * CUBIE_STEP];
}

export function getCubieRotation({ x, y, z, type }: CubieConfig): Vector3Tuple {
  if (type === "center") {
    return getCenterRotation(x, y, z);
  }

  if (type === "edge") {
    return getEdgeRotation(x, y, z);
  }

  return [0, 0, 0];
}

function getCubieType(x: CubeCoordinate, y: CubeCoordinate, z: CubeCoordinate): CubieType {
  const occupiedAxes = Math.abs(x) + Math.abs(y) + Math.abs(z);

  if (occupiedAxes === 3) {
    return "corner";
  }

  if (occupiedAxes === 2) {
    return "edge";
  }

  return "center";
}

function getCenterRotation(x: CubeCoordinate, y: CubeCoordinate, z: CubeCoordinate): Vector3Tuple {
  if (y === 1) return [-Math.PI, 0, 0];
  if (y === -1) return [0, HALF_PI, 0];
  if (x === 1) return [0, 0, HALF_PI];
  if (x === -1) return [0, 0, -HALF_PI];
  if (z === -1) return [HALF_PI, 0, 0];

  return [-HALF_PI, 0, 0];
}

function getEdgeRotation(x: CubeCoordinate, y: CubeCoordinate, z: CubeCoordinate): Vector3Tuple {
  if (x === -1 && y === -1 && z === 0) return [0, 0, -HALF_PI];
  if (x === -1 && y === 0 && z === -1) return [HALF_PI, 0, -HALF_PI];
  if (x === -1 && y === 0 && z === 1) return [-HALF_PI, 0, -HALF_PI];
  if (x === -1 && y === 1 && z === 0) return [Math.PI, 0, -HALF_PI];
  if (x === 0 && y === -1 && z === -1) return [2 * Math.PI, -HALF_PI, -HALF_PI];

  return [-HALF_PI, 0, 0];
}
