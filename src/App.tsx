import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera } from "@react-three/drei";
import RubiksCube from "./components/Rubiks-cube/RubiksCube";

function App() {
  // Store the target camera position
  const [camPos, setCamPos] = useState([8, 8, 8]);

  // Helper function to update camera
  const setView = (axis) => {
    const distance = 10; // Adjust based on how "zoomed in" you want the view
    switch (axis) {
      case 'x': setCamPos([distance, 0, 0]); break;
      case 'y': setCamPos([0, distance, 0]); break;
      case 'z': setCamPos([0, 0, distance]); break;
      case 'iso': setCamPos([8, 8, 8]); break; // Isometric/Default
      default: break;
    }
  };

  return (
    <div id="canvas-container" style={{ width: "100vw", height: "100vh", position: 'relative' }}>
      
      {/* Floating UI Buttons */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 10,
        display: 'flex',
        gap: '10px',
        background: 'rgba(255,255,255,0.1)',
        padding: '10px',
        borderRadius: '8px',
        backdropFilter: 'blur(5px)'
      }}>
        <button onClick={() => setView('x')} style={btnStyle}>X-Axis</button>
        <button onClick={() => setView('y')} style={btnStyle}>Y-Axis</button>
        <button onClick={() => setView('z')} style={btnStyle}>Z-Axis</button>
        <button onClick={() => setView('iso')} style={{...btnStyle, background: '#444'}}>Reset</button>
      </div>

      <Canvas>
        <color attach="background" args={["#050505"]} />
        
        {/* We use PerspectiveCamera from Drei to easily update position via props */}
        <PerspectiveCamera makeDefault position={camPos} fov={45} />

        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        
        <group scale={0.04}>
          <RubiksCube />
        </group>

        <OrbitControls makeDefault enableDamping dampingFactor={0.1} />
        <Environment preset="city" />
        <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
      </Canvas>
    </div>
  );
}

// Simple CSS-in-JS for the buttons
const btnStyle = {
  padding: '8px 12px',
  cursor: 'pointer',
  background: '#222',
  color: 'white',
  border: '1px solid #555',
  borderRadius: '4px',
  fontWeight: 'bold'
};

export default App;