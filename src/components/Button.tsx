interface ButtonBoxProps {
  width: string;
  btnName: string;
  onClick: () => void;
}

export default function ButtonBox({ width, btnName, onClick }: ButtonBoxProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-violet300 hover:bg-violet400 text-white font-semibold  py-1 px-1 rounded ${width}`}
    >
      {btnName}
    </button>
  );
}
