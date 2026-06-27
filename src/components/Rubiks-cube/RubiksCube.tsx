import { CenterCubie, CornerCubie, EdgeCubie } from "./Cubie";
import {
  CUBIE_CONFIGS,
  getCubieColors,
  getCubiePosition,
  getCubieRotation,
} from "./cubeModel";
import type { CubieConfig, CubieRenderProps } from "./cubeTypes";

function createCubieProps(config: CubieConfig): CubieRenderProps {
  return {
    ...config,
    colors: getCubieColors(),
    position: getCubiePosition(config),
    rotation: getCubieRotation(config),
  };
}

function CubieRenderer(config: CubieConfig) {
  const cubieProps = createCubieProps(config);

  switch (config.type) {
    case "corner":
      return <CornerCubie {...cubieProps} />;
    case "edge":
      return <EdgeCubie {...cubieProps} />;
    case "center":
      return <CenterCubie {...cubieProps} />;
  }
}

function RubiksCube() {
  return (
    <group>
      {CUBIE_CONFIGS.map((config) => (
        <CubieRenderer key={`${config.x}-${config.y}-${config.z}`} {...config} />
      ))}
    </group>
  );
}

export default RubiksCube;
