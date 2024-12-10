import SystemInfo from './sys';
import UnderSection from './under-section';
import './index.css';
const CompositeArea = () => {
  return (
    <div className="sysinfo fcr-grid ">
      <SystemInfo />
      <UnderSection />
    </div>
  );
};

export default CompositeArea;
