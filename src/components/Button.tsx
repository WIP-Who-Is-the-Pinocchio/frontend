interface ButtonBoxProps {
  width: string;
  btnName: string;
  onClick: () => void;
}

const ButtonBox: React.FC<ButtonBoxProps> = ({ width, btnName, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-violet-300 hover:bg-violet-400 text-white font-semibold  py-1 px-1 rounded ${width}`}
    >
      {btnName}
    </button>
  );
};

export default ButtonBox;
