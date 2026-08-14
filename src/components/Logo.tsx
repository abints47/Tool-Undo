import React from "react";
import { Wrench } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
  dark?: boolean;
}

export default function Logo({ size = "md", showText = true, className = "", dark = false }: LogoProps) {
  const iconSizes = {
    sm: 18,
    md: 22,
    lg: 28,
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const textColor = dark ? "text-ink" : "text-white";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="rounded-xl bg-linear-to-br from-violet-500 to-purple-600 p-2 flex items-center justify-center shadow-md">
        <Wrench size={iconSizes[size]} className="text-white" strokeWidth={2.5} />
      </div>
      {showText && (
        <span className={`font-extrabold italic ${textColor} ${textSizes[size]} tracking-tight`}>
          ToolUndo
        </span>
      )}
    </div>
  );
}
