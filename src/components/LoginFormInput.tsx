interface LoginFormInput {
  label: string;
  type: string;
  id: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginFormInput: React.FC<LoginFormInput> = ({
  label,
  type = "text",
  id,
  placeholder,
  onChange,
}) => {
  return (
    <div className="flex flex-col m-[10px] ">
      <label className="text-[10px] font-normal text-slate-400 my-1" htmlFor={id}>
        {label}
      </label>
      <input
        className="p-[5px] h-[25px] placeholder:text-[10px] rounded focus:outline-none"
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default LoginFormInput;
