interface ButtonBoxProps {
  width: string;
  btnName: string;
  color?: string;
  onClick: () => void;
}

interface ColorClasses {
  [key: string]: string;
}

const ButtonBox: React.FC<ButtonBoxProps> = ({
  width,
  btnName,
  color = "violet-300",
  onClick,
}) => {
  const colorClasses: ColorClasses = {
    "violet-300": "bg-violet-300 hover:bg-violet-400",
    "violet-500": "bg-violet-500 hover:bg-violet-600",
  };
  return (
    <button
      className={`${colorClasses[color]} text-white font-semibold  py-1 px-1 rounded ${width}`}
      onClick={onClick}
    >
      {btnName}
    </button>
  );
};

export default ButtonBox;
