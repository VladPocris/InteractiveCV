import { useEffect, useState } from "react";

const lines = [
  { text: "Initializing portfolio...", delay: 300 },
  { text: "Loading modules...", delay: 700 },
  { text: "Compiling experience...", delay: 1100 },
  { text: "Ready.", delay: 1500 },
];

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [typingLine, setTypingLine] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let mounted = true;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (!mounted) return prev;
        const done = visibleLines.length >= lines.length;
        const step = done ? 6 : 1;
        const next = Math.min(100, prev + step);
        if (next >= 100) {
          setTimeout(() => onComplete(), 120);
        }
        return next;
      });
    }, 18);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [visibleLines, onComplete]);

  useEffect(() => {
    const line = lines[typingLine];
    if (!line) return;

    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex < line.text.length) {
        setCurrentText(line.text.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setVisibleLines((prev) => [...prev, typingLine]);
        setCurrentText("");
        setTypingLine((prev) => prev + 1);
      }
    }, 14);

    return () => clearInterval(typeInterval);
  }, [typingLine]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="w-full max-w-lg mx-auto px-6">
        <div className="text-center mb-8">
          <div className="mx-auto w-28 h-28 rounded-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 flex items-center justify-center shadow-xl transform-gpu animate-[pulse_2.5s_ease-in-out_infinite]">
            <span className="text-4xl font-bold text-white">VP</span>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/60 backdrop-blur-sm overflow-hidden shadow-2xl">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="text-xs text-muted-foreground ml-2 font-mono">portfolio � bash</span>
          </div>

          <div className="p-5 font-mono text-sm space-y-2 min-h-[160px]" aria-live="polite">
            {visibleLines.map((lineIndex, i) => (
              <div key={i} className="flex animate-fade-in">
                <span className="text-primary mr-2 shrink-0">$</span>
                <span className="text-foreground/90">{lines[lineIndex].text}</span>
              </div>
            ))}
            {typingLine < lines.length && (
              <div className="flex">
                <span className="text-primary mr-2 shrink-0">$</span>
                <span className="text-foreground/90">{currentText}</span>
                <span className="w-2 h-4 bg-primary ml-0.5 animate-pulse" />
              </div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-xs text-muted-foreground mb-2 font-mono">
            <span>Loading assets...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-primary rounded-full transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

