interface ProgressBarType {
  value: number;
  onComplete: () => void;
}

export const ProgressBar = ({ value, onComplete }: ProgressBarType) => {
  const percent = Math.min(100, Math.max(value, 0));

  if (percent === 100) {
    onComplete();
  }

  return (
    <div className="progress">
      <span style={{ color: percent > 49 ? "white" : "black" }}>
        {percent}%
      </span>
      <div
        style={{
          transform: `scaleX(${percent / 100})`,
          transformOrigin: "left",
        }}
      />
    </div>
  );
};
