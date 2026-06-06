export default function TimerRing({ timeLeft, total = 30 }) {
  const radius = 36;
  const stroke = 4;
  const normalised = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalised;
  const progress = timeLeft / total;
  const offset = circumference * (1 - progress);

  const color =
    timeLeft > 10 ? "#1D9E75" : timeLeft > 5 ? "#EF9F27" : "#E24B4A";

  return (
    <div style={styles.wrap}>
      <svg width="80" height="80" viewBox="0 0 80 80">
        {/* Track */}
        <circle
          cx="40"
          cy="40"
          r={normalised}
          fill="none"
          stroke="#F1EFE8"
          strokeWidth={stroke}
        />
        {/* Progress ring */}
        <circle
          cx="40"
          cy="40"
          r={normalised}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 40 40)"
          style={{
            transition: "stroke-dashoffset 0.9s linear, stroke 0.3s ease",
          }}
        />
      </svg>
      {/* Number in centre */}
      <div style={{ ...styles.number, color }}>{timeLeft}</div>
    </div>
  );
}

const styles = {
  wrap: {
    position: "relative",
    width: "80px",
    height: "80px",
    flexShrink: 0,
  },
  number: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "1.3rem",
    fontWeight: 700,
    fontFamily: "'JetBrains Mono', monospace",
    lineHeight: 1,
  },
};
