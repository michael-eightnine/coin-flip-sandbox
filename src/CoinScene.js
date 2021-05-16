import { Suspense } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import Coin from "./Coin";

const CoinScene = () => (
  <Suspense fallback={null}>
    <Coin />
    <ambientLight intensity={0.5} color="#ffa129" />
    {/* <ambientLight intensity={0.5} color="#E6B5FF" /> */}
    <ambientLight intensity={0.3} color="#FFDA8D" />
    {/* <ambientLight intensity={0.2} color="#E6B5FF" /> */}

    <pointLight
      position={[0, 4, 1]}
      color="#FFF"
      power={10}
      decay={0}
      castShadow
    />

    <pointLight position={[-.5, .5, 4]} color="#FFCC00" power={10} decay={0} />
    {/* <pointLight position={[-.75, .75, 4]} color="#AF52DE" power={10} decay={0} /> */}
    <pointLight position={[1, -2, 2]} color="#FF9500" power={10} decay={0} />
    {/* <pointLight position={[1, -2, 2]} color="#8053ED" power={10} decay={0} /> */}
    <PerspectiveCamera
      makeDefault
      near={1}
      far={100}
      fov={50}
      position={[0, 0, 10]}
    />
  </Suspense>
);

export default CoinScene;
