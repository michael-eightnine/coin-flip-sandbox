import {useProgress} from '@react-three/drei';

const Loader = () => {
  const {active, progress} = useProgress();

  if(!active && progress === 100) return null;

  return <div className="loader">Loading...</div>
}

export default Loader;
