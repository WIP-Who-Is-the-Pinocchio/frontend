interface ValidationMessageProps {
  show: boolean;
  check: boolean;
  message: string;
}

const ValidationMessage: React.FC<ValidationMessageProps> = ({
  show,
  check,
  message,
}) => {
  return (
    <>
      {show && check && (
        <div className="text-red-500 text-[10px] font-medium">{message}</div>
      )}
    </>
  );
};

export default ValidationMessage;
