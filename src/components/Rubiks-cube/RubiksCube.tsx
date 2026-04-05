import React from "react";
import { CenterCubie, EdgeCubie, CornerCubie } from "./Cubie.jsx";

const STEP = 70;

const FACE_COLORS = {
  up: "green", // y = 1
  down: "blue", // y = -1
  front: "white", // z = 1
  back: "yellow", // z = -1
  right: "red", // x = 1
  left: "orange", // x = -1
};

const CUBIE_CONFIG = (() => {
  const nodes = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        // We still skip 0,0,0 here because we handle the Core separately below
        if (x === 0 && y === 0 && z === 0) continue;

        const absSum = Math.abs(x) + Math.abs(y) + Math.abs(z);
        let type = "center";
        if (absSum === 3) type = "corner";
        if (absSum === 2) type = "edge";

        nodes.push({ x, y, z, type });
      }
    }
  }
  console.log("reshav rotation",{nodes})
  return nodes;
})();

const getCubieColors = (x, y, z) => {
  const colors = {}; // Start with an empty object
  colors.top = FACE_COLORS.up;
  colors.bottom = FACE_COLORS.down;
  colors.front = FACE_COLORS.front;
  colors.back = FACE_COLORS.back;
  colors.right = FACE_COLORS.right;
  colors.left = FACE_COLORS.left;
  return colors;
};

const getCenterRotation = (x, y, z) => {
  if (y === 1) return [-Math.PI, 0, 0]; // Top face
  if (y === -1) return [0, Math.PI / 2, 0]; // Bottom face
  if (x === 1) return [0, 0, Math.PI / 2]; // Right face
  if (x === -1) return [0, 0, -Math.PI / 2]; // Left face
  if (z === -1) return [Math.PI / 2, 0, 0]; // Back face
  return [-Math.PI / 2, 0, 0]; // Front face (default)
};
const getCubieRotation = (x, y, z, type) => {
  if (type === "center") return getCenterRotation(x, y, z);

  // Default rotation
  let rx = 0,
    ry = 0,
    rz = 0;

  // // Simple Logic: Rotate pieces based on their position to face outward
  // if (z === -1) ry = -Math.PI/2; // Face the Back
  // if (x === 1) ry = -Math.PI / 2; // Face the Right
  // if (x === -1) ry = Math.PI / 2; // Face the Left

  // // Handle Top/Bottom tilting for Edges and Corners
  // if (y === 1) rx = -Math.PI / 2; // Tilt Up
  // if (y === -1) rx = Math.PI / 2; // Tilt Down

  // console.log("reshav rotation",{x,y,z,rx,ry,rz});

  return [rx, ry, rz];
};

const CubieRenderer = ({ x, y, z, type }) => {
  const position = [x * STEP, y * STEP, z * STEP];
  const dynamicColors = getCubieColors(x, y, z);
  // console.log("reshav", { dynamicColors });

  // Apply the new rotation logic to EVERY piece
  const rotation = getCubieRotation(x, y, z, type);

  switch (type) {
    case "corner":
      return (
        <CornerCubie
          x={x}
          y={y}
          z={z}
          position={position}
          rotation={rotation}
          colors={dynamicColors}
        />
      );
    case "edge":
      return (
        <EdgeCubie
          x={x}
          y={y}
          z={z}
          position={position}
          rotation={rotation}
          colors={dynamicColors}
        />
      );
    case "center":
      return (
        <CenterCubie
          x={x}
          y={y}
          z={z}
          position={position}
          rotation={rotation}
          colors={dynamicColors}
        />
      );
    default:
      return null;
  }
};

const RubiksCube = () => {
  return (
    <group>
      {/* 1. The Dummy Core at the very center
      <CubeCore /> */}

      {/* 2. The 26 visible cubies */}
      {CUBIE_CONFIG.map((config) => (
        <CubieRenderer
          key={`${config.x}-${config.y}-${config.z}`}
          {...config}
        />
      ))}
    </group>
  );
};

export default RubiksCube;
