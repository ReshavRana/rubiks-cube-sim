import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import RubikCube from "./components/Rubiks_cube.jsx";
import { OrbitControls } from "@react-three/drei";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started with Rey's code.</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <div id="canvas-container" className="hero">
        <Canvas camera={{ position: [10, 10, 10], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} />

          <RubikCube scale={0.05} />

          <OrbitControls  />
        </Canvas>
      </div>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
