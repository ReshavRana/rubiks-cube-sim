import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { BufferGeometry } from "three";
import type { CubieColors, CubieRenderProps } from "./cubeTypes";

type CubieGltf = {
  nodes: Record<string, { geometry: BufferGeometry }>;
};

type CubieBodyProps = {
  geometry: BufferGeometry;
};

type StickerMaterialProps = {
  color: string;
};

type EdgeStickerColors = {
  edgeCubieColor: string;
  frontCubieColor: string;
};

function CubieBody({ geometry }: CubieBodyProps) {
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color="#050505"
        metalness={0.8}
        roughness={0.2}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function StickerMaterial({ color }: StickerMaterialProps) {
  return (
    <meshStandardMaterial
      color={color}
      polygonOffset
      polygonOffsetFactor={-1}
      side={THREE.DoubleSide}
    />
  );
}

export function CornerCubie({ colors, position, rotation }: CubieRenderProps) {
  const { nodes } = useGLTF("/corner-cubie.glb") as unknown as CubieGltf;

  return (
    <group position={position} rotation={rotation}>
      <group position={[0, 0, 0]} scale={100}>
        <CubieBody geometry={nodes["3_Black_0001_1"].geometry} />
        <mesh geometry={nodes["3_Black_0001_2"].geometry}>
          <StickerMaterial color={colors.top || colors.bottom || "black"} />
        </mesh>
        <mesh geometry={nodes["3_Black_0001_3"].geometry}>
          <StickerMaterial color={colors.front || colors.back || "black"} />
        </mesh>
        <mesh geometry={nodes["3_Black_0001_4"].geometry}>
          <StickerMaterial color={colors.left || colors.right || "black"} />
        </mesh>
      </group>
    </group>
  );
}

export function EdgeCubie({ colors, position, rotation, x, y, z }: CubieRenderProps) {
  const { nodes } = useGLTF("/edge-cubie.glb") as unknown as CubieGltf;
  const { edgeCubieColor, frontCubieColor } = getEdgeStickerColors(x, y, z, colors);

  return (
    <group position={position} rotation={rotation}>
      <group position={[0, 0, 0]} scale={100}>
        <CubieBody geometry={nodes["24_Black_0001_1"].geometry} />
        <mesh geometry={nodes["24_Black_0001_2"].geometry}>
          <StickerMaterial color={frontCubieColor} />
        </mesh>
        <mesh geometry={nodes["24_Black_0001_3"].geometry}>
          <StickerMaterial color={edgeCubieColor} />
        </mesh>
      </group>
    </group>
  );
}

export function CenterCubie({ colors, position, rotation, x, y, z }: CubieRenderProps) {
  const { nodes } = useGLTF("/center-cubie.glb") as unknown as CubieGltf;
  const cubieColor = getCenterStickerColor(x, y, z, colors);

  return (
    <group position={position} rotation={rotation}>
      <group position={[0, 0, 0]} scale={100}>
        <CubieBody geometry={nodes["22_Black_0003"].geometry} />
        <mesh geometry={nodes["22_Black_0003_1"].geometry}>
          <StickerMaterial color={cubieColor} />
        </mesh>
      </group>
    </group>
  );
}

function getEdgeStickerColors(
  x: number,
  y: number,
  z: number,
  colors: CubieColors,
): EdgeStickerColors {
  if (x === -1 && y === -1 && z === 0) {
    return { frontCubieColor: colors.back, edgeCubieColor: colors.right };
  }

  if (x === -1 && y === 0 && z === -1) {
    return { frontCubieColor: colors.top, edgeCubieColor: colors.bottom };
  }

  if (x === -1 && y === 0 && z === 1) {
    return { frontCubieColor: colors.back, edgeCubieColor: colors.top };
  }

  if (x === -1 && y === 1 && z === 0) {
    return { frontCubieColor: colors.back, edgeCubieColor: colors.left };
  }

  if (x === 0 && y === -1 && z === -1) {
    return { frontCubieColor: colors.bottom, edgeCubieColor: colors.right };
  }

  return { frontCubieColor: "black", edgeCubieColor: "black" };
}

function getCenterStickerColor(x: number, y: number, z: number, colors: CubieColors): string {
  if (x === -1) return colors.back;
  if (x === 1) return colors.front;
  if (y === 1) return colors.left;
  if (y === -1) return colors.right;
  if (z === 1) return colors.top;
  if (z === -1) return colors.bottom;

  return "black";
}

useGLTF.preload("/center-cubie.glb");
useGLTF.preload("/edge-cubie.glb");
useGLTF.preload("/corner-cubie.glb");
