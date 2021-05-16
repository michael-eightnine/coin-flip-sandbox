import { useRef, useEffect } from "react";
import gsap from "gsap";
import * as THREE from "three";
import { useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import iconSrc from "../icons/icon-gold.svg";
// import icon2Src from "../icons/icon-purp.svg";

import { Html } from "@react-three/drei";

const Coin = () => {
  const meshRef = useRef();
  const animationRef = useRef({ isAnimating: false });
  const camera = useThree((three) => three.camera);

  const gltf = useLoader(GLTFLoader, "./models/gold-coin.glb");

  useEffect(() => {
    if (!meshRef.current) return;

    // Bounce animation
    animationRef.current.initialPosition = gsap.to(meshRef.current.position, {
      delay: 0,
      duration: 2,
      y: "+=.35",
      yoyo: true,
      repeat: -1,
      ease: "Power1.easeOut",
    });

    // 180 spin
    animationRef.current.initialSpin = gsap.to(meshRef.current.rotation, {
      delay: 0,
      repeatDelay: 2,
      duration: 2,
      y: `+=${THREE.Math.degToRad(180)}`,
      yoyo: false,
      repeat: -1,
      ease: "back",
    });
  }, [meshRef]);

  const onClick = () => {
    if(animationRef.current.isAnimating) return;

    animationRef.current.initialPosition.pause();
    animationRef.current.initialSpin.pause();
    animationRef.current.isAnimating = true;

    // Reset coin position to starting position
    gsap.fromTo(
      meshRef.current.position,
      { y: meshRef.current.position.y },
      { y: -1, duration: 0.5, ease: "Power1.easeOut" }
    );
    gsap.fromTo(
      meshRef.current.rotation,
      { y: meshRef.current.rotation.y },
      { y: 0, duration: 0.5, ease: "Power1.easeOut" }
    );

    // Up animation
    gsap.to(meshRef.current.position, {
      delay: 0.5,
      duration: 1,
      y: `+=4`,
      yoyo: false,
      repeat: 0,
      ease: "Power1.easeOut",
    });

    // Pre-set spin, this has a duration of 0 so its not visible in browser
    gsap.to(meshRef.current.rotation, {
      delay: 0.5,
      duration: 0,
      x: `${THREE.Math.degToRad(1080)}`,
      y: `${THREE.Math.degToRad(45)}`,
      yoyo: false,
      repeat: 0,
      ease: "Power2.easeOut",
    });

    // Spin back to no rotation, this simulates the actual coin flipping
    gsap.to(meshRef.current.rotation, {
      delay: 0.5,
      duration: 3.25,
      x: `${THREE.Math.degToRad(0)}`,
      y: `${THREE.Math.degToRad(0)}`,
      yoyo: false,
      repeat: 0,
      ease: "back",
    });

    // Back to below center (post flip)
    gsap.to(meshRef.current.position, {
      delay: 1.5,
      duration: 1.5,
      y: "-1",
      repeat: 0,
      ease: "Power2.easeIn",
    });

    // Re-align to center
    gsap.to(meshRef.current.position, {
      delay: 3,
      duration: 0.75,
      y: "0",
      repeat: 0,
      ease: "back.out(3)",
      onComplete: () => {
        setTimeout(() => {
          animationRef.current.initialPosition.invalidate().restart();
          animationRef.current.initialSpin.invalidate().restart();
          animationRef.current.isAnimating = false;
        }, 2000);
      },
    });

    // Pan camera out during flip and then pan back in
    // This helps keep our scene in a similar-ish bounding box during the vertical animation
    gsap.fromTo(
      camera.position,
      { z: 10 },
      {
        z: 15,
        duration: 1,
        delay: 0.15,
        ease: "Power1.easeOut",
        onComplete: () => {
          gsap.fromTo(
            camera.position,
            { z: 15 },
            { z: 10, duration: 2.25, delay: 0.5, ease: "Power1.easeOut" }
          );
        },
      }
    );
  };

  return (
    <>
      <mesh ref={meshRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <primitive object={gltf.scene} scale={3} />
        <Html center transform zIndexRange={[5, 6]}>
          <div className="icon-wrap">
            <img className="icon" src={iconSrc} alt="coin-icon" />
            {/* <img className="icon" src={icon2Src} alt="coin-icon" /> */}
          </div>
        </Html>
      </mesh>
      <mesh onClick={() => onClick()} position={[0, 0, 3]}>
        <planeBufferGeometry attach="geometry" args={[3, 3]} />
        <meshPhongMaterial
          attach="material"
          color="black"
          transparent
          opacity={0}
        />
      </mesh>
    </>
  );
};

export default Coin;
