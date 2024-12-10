import './index.css';
interface ProgressProps {
  strokeWidth?: number;
  percent?: number;
  backgroundColor?: string;
  showPercentText?: boolean;
  percentText?: string;
}
export const Progress = (props: ProgressProps) => {
  const {
    strokeWidth = 18,
    percent = 50,
    backgroundColor,
    showPercentText = true,
    percentText,
  } = props;

  return (
    <div className="fcr-progress" style={{ height: strokeWidth, background: backgroundColor }}>
      <div
        className="fcr-progress-inner"
        style={{ height: strokeWidth, width: `${percent}%` }}></div>
      {showPercentText && (
        <div className="fcr-progress-percent-text">{percentText || `${percent}%`}</div>
      )}
    </div>
  );
};
