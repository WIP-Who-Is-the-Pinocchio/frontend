import { twMerge } from "tailwind-merge";

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  color?: "light" | "dark";
  onClick: () => void;
}

interface ColorClasses {
  [key: string]: string;
}

const Button: React.FC<ButtonProps> = ({
  className,
  children,
  color = "light",
  onClick,
}) => {
  const colorClasses: ColorClasses = {
    light: "bg-violet-300 hover:bg-violet-400",
    dark: "bg-violet-500 hover:bg-violet-600",
  };
  return (
    <button
      className={twMerge(
        `text-white font-semibold  p-[5px] rounded text-sm`,
        colorClasses[color],
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
