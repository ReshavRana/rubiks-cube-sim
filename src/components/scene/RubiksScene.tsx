import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import RubiksCube from "../Rubiks-cube/RubiksCube";
import { ViewControls } from "./ViewControls";
import { VIEW_PRESETS, type ViewAxis } from "./viewPresets";

export function RubiksScene() {
  const [activeView, setActiveView] = useState<ViewAxis>("iso");

  return (
    <main id="canvas-container">
      <ViewControls activeView={activeView} onChangeView={setActiveView} />

      <Canvas>
        <color attach="background" args={["#050505"]} />
        <PerspectiveCamera makeDefault position={VIEW_PRESETS[activeView]} fov={45} />

        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />

        <group scale={0.04}>
          <RubiksCube />
        </group>

        <OrbitControls makeDefault enableDamping dampingFactor={0.1} />
        <Environment preset="city" />
        <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
      </Canvas>
    </main>
  );
}
