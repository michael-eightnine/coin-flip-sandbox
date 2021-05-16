import { Canvas } from "@react-three/fiber";
import CoinScene from "./CoinScene";

const App = () => (
  <div className="canvas-container">
    <Canvas colorManagement shadowMap>
      <CoinScene />
    </Canvas>
  </div>
);

export default App;
