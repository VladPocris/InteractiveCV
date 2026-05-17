interface SectionDividerProps {
  position?: "top" | "bottom";
}

const SectionDivider = ({ position = "bottom" }: SectionDividerProps) => {
  return (
    <div className="section-divider" style={{ marginTop: position === "bottom" ? "-1px" : undefined }}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        style={{ transform: position === "top" ? "rotate(180deg)" : undefined }}
      >
        <defs>
          <linearGradient id="dividerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(271, 0%, 5%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(271, 76%, 53%)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(240, 0%, 5%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,80 L0,80 Z"
          fill="url(#dividerGrad)"
          opacity="0.5"
        />
        <path
          d="M0,55 C240,20 480,70 720,50 C960,30 1200,75 1440,55 L1440,80 L0,80 Z"
          fill="hsl(222, 84%, 5%)"
          opacity="1"
        />
      </svg>
    </div>
  );
};

export default SectionDivider;