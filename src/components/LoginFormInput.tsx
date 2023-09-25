interface DataInputProps {
  label: string;
  type: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

function LoginFormInput({ label, type, id, placeholder, onChange }: DataInputProps) {
  return (
    <>
      <div className="flex flex-col my-3 ">
        <label className="text-sm font-normal text-slate-400 my-1" htmlFor={id}>
          {label}
        </label>
        <input
          className="rounded py-1 px-1  h-7 placeholder:text-xs  focus:outline-none"
          type={type}
          id={id}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </>
  );
}

export default LoginFormInput;
