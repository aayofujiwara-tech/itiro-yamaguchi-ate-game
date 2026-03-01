"use client";

interface QuizOptionsProps {
  options: string[];
  selectedOption: string | null;
  correctAnswer: string;
  answered: boolean;
  onSelect: (option: string) => void;
}

export default function QuizOptions({
  options,
  selectedOption,
  correctAnswer,
  answered,
  onSelect,
}: QuizOptionsProps) {
  const getButtonStyle = (option: string) => {
    const base: React.CSSProperties = {
      backgroundColor: "var(--bg-card)",
      border: "1px solid var(--border)",
      color: "var(--text-main)",
      transition: "all 0.2s ease",
    };

    if (!answered) {
      return base;
    }

    if (option === correctAnswer) {
      return {
        ...base,
        backgroundColor: "rgba(0, 255, 136, 0.1)",
        borderColor: "var(--correct)",
        color: "var(--correct)",
      };
    }

    if (option === selectedOption && option !== correctAnswer) {
      return {
        ...base,
        backgroundColor: "rgba(255, 68, 68, 0.1)",
        borderColor: "var(--incorrect)",
        color: "var(--incorrect)",
      };
    }

    return {
      ...base,
      opacity: 0.4,
    };
  };

  const getAnimationClass = (option: string) => {
    if (!answered) return "";
    if (option === correctAnswer) return "animate-pulse-correct";
    if (option === selectedOption && option !== correctAnswer)
      return "animate-shake";
    return "";
  };

  return (
    <div className="w-full space-y-3 mb-6">
      {options.map((option, index) => (
        <button
          key={`${option}-${index}`}
          onClick={() => !answered && onSelect(option)}
          disabled={answered}
          className={`w-full text-left px-5 py-4 rounded-lg text-sm md:text-base font-medium cursor-pointer disabled:cursor-default ${getAnimationClass(option)}`}
          style={getButtonStyle(option)}
          onMouseOver={(e) => {
            if (!answered) {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.boxShadow =
                "0 0 12px rgba(0, 212, 255, 0.2)";
            }
          }}
          onMouseOut={(e) => {
            if (!answered) {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.boxShadow = "none";
            }
          }}
        >
          <span
            className="mr-3 inline-block w-6 text-center"
            style={{ color: "var(--text-sub)", fontFamily: "Inter, monospace" }}
          >
            {String.fromCharCode(65 + index)}
          </span>
          {option}
        </button>
      ))}
    </div>
  );
}
