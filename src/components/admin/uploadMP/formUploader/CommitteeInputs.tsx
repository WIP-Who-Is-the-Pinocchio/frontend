import { Control, useFieldArray } from "react-hook-form";
import { InputTypes } from "../types";
import { useState } from "react";
import Title from "./Title";

interface CommitteeInputsPropsType {
  control: Control<InputTypes, any>;
}

const initialCommitteeData = {
  is_main: false,
  name: "",
};

const CommitteeInputs = ({ control }: CommitteeInputsPropsType) => {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "committee",
  });
  const [committee, setCommittee] = useState(initialCommitteeData);
  const [isNewInputOpened, setIsNewInputOpend] = useState(true);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    const isNew = fields.length === 0;
    let newCommittee = {
      is_main: isNew,
      name: inputText,
    };
    setCommittee(newCommittee);
  };

  const handleClickAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    append(committee);
    setCommittee(initialCommitteeData);
    setIsNewInputOpend(false);
  };

  const handleClickCloseNewInput = () => {
    setCommittee(initialCommitteeData);
    setIsNewInputOpend(false);
  };

  const handleClickOpenNewInput = () => {
    setIsNewInputOpend(true);
  };

  const handleClickRemove = (index: number) => {
    if (index === 0) {
      const newObj = {
        ...fields[1],
        is_main: true,
      };
      update(1, newObj);
    }
    remove(index);
  };

  return (
    <div className="relative max-w-[730px] w-full p-[20px] m-auto mt-[20px] border-[1px] border-purple-200 rounded-[20px]">
      <div className="absolute top-[-10px] px-[10px] bg-white">
        <Title
          tooltip="의장을 제외한 모든 의원은 하나의 상임위원회의 위원이 되며 다만
                    의회운영위원회의 위원을 겸할 수 있다. 따라서 어느 상임위원도
                    의회운영위원이 되는 경우를 제외하고는 다른 상임위원회의 의원이 되는
                    일은 있을 수 없다. 다만 상임위원은 그 수에 제한없이 특별위원회의
                    위원을 겸직할 수 있다. -의회용어사전"
        >
          상임위원회
        </Title>
      </div>
      <ul className="flex flex-col justify-between pt-[10px]">
        {fields.map((field, index) => (
          <li
            key={field.id}
            className="flex items-center px-[3px]  text-[14px] text-stone-800"
          >
            <span>•&nbsp;</span>
            {field.is_main && <span className="text-stone-500">[기본]&nbsp;</span>}
            <p>{field.name}</p>
            <div
              onClick={() => handleClickRemove(index)}
              className=" pl-[10px] pb-[2px] cursor-pointer text-stone-400 text-[18px]"
            >
              &times;
            </div>
          </li>
        ))}
      </ul>
      {isNewInputOpened ? (
        <div className="pt-[20px]">
          <input
            type="text"
            className="block w-full h-[44px] p-[10px] border border-gray-300 rounded-lg text-[12px] text-gray-900 outline-none      "
            placeholder="상임위원회명"
            onChange={handleChangeInput}
          />
          <div className="flex justify-center gap-[7px] mt-[10px]">
            <button
              onClick={handleClickCloseNewInput}
              className="py-[6px] px-[15px] mt-[10px] border border-gray-300 rounded-lg text-[12px] font-medium text-gray-900 bg-neutral-100 hover:bg-neutral-200 hover:text-gray-700 focus:outline-none cursor-pointer"
            >
              취소
            </button>
            <button
              onClick={handleClickAdd}
              className="py-[6px] px-[15px] mt-[10px] border border-gray-200 rounded-lg text-[12px] font-medium text-white bg-purple-400 hover:bg-purple-200 hover:text-gray-700 focus:outline-none cursor-pointer"
            >
              추가
            </button>
          </div>
        </div>
      ) : (
        <button
          className="py-[6px] px-[12px] mt-[10px] border border-gray-200 rounded-lg text-[12px] font-medium text-gray-900 bg-neutral-50 hover:bg-gray-100 hover:text-gray-700 focus:outline-none"
          onClick={handleClickOpenNewInput}
        >
          + 상임위원회 추가
        </button>
      )}
    </div>
  );
};

export default CommitteeInputs;
