import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { Canvas } from "@react-three/fiber";

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

      <div id="canvas-container">
        <Canvas>
          <ambientLight intensity={0.1} />
          <directionalLight color="yellow" position={[0, 0, 5]} />
          <mesh>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial />
          </mesh>
        </Canvas>
      </div>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
