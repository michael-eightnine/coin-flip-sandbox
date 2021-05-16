import { Canvas } from "@react-three/fiber";
import Scene from "./three/Scene";
import Loader from './Loader';

const App = () => (
  <div className="canvas-container">
    <Canvas colorManagement>
      <Scene />
    </Canvas>
    <Loader />
  </div>
);

export default App;
