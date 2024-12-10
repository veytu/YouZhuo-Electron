import { VideoIcon, FilesIcon } from '../icons';
import { useHistory } from 'react-router';
const UnderSection = () => {
  const history = useHistory();
  // alex-tag-to-record
  const handleRecord = () => {
    history.push('/csrecord');
  };
  // alex-tag-to-resource
  const handleResource = () => {
    history.push('/csresource');
  };
  return (
    <div className="fcr-mt-6 fcr-grid fcr-grid-cols-2 fcr-gap-6 fcr-text-white fcr-font-bold fcr-text-lg">
      <div
        onClick={handleRecord}
        className="sys-shadow fcr-flex fcr-flex-col fcr-gap-2 fcr-justify-center fcr-items-center fcr-cursor-pointer">
        <span>本地录课</span>
        <img src={VideoIcon} alt="video" />
      </div>
      <div
        onClick={handleResource}
        className="sys-shadow fcr-flex fcr-flex-col fcr-gap-2 fcr-justify-center fcr-items-center fcr-cursor-pointer">
        <span>课程资源</span>
        <img src={FilesIcon} alt="video" />
      </div>
    </div>
  );
};

export default UnderSection;
