import { useForm, SubmitHandler } from "react-hook-form";
import { formResource, InputTypes } from "../types";
import ImageSelector from "./ImageSelector";
import TextInputDiv from "./TextInputDiv";
import Table from "./Table";
import { useState } from "react";
import AdditionalCommitteeTextInputContainer from "./AdditionalCommitteeTextInputContainer";
import ConstituencyInputs from "./ConstituencyInputs";

interface FormUploaderProps {}

const FormUploader: React.FC<FormUploaderProps> = () => {
  const { handleSubmit, watch, register, formState, resetField, control } =
    useForm<InputTypes>({
      mode: "onChange", //실시간 validation을 위해 onChange 모드 설정
    });

  const { errors } = formState;
  const [additionalCommitteeList, setAdditionalCommitteeList] = useState<string[]>([]);
  const onSubmit: SubmitHandler<InputTypes> = (data) => {
    //미리보기 검사용
    alert(`제출! ${JSON.stringify(data, null, 2)}`);
    console.log(data);
  };

  console.log(watch());

  const handleClickAddAdditionalCommitteeList = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setAdditionalCommitteeList((prev) => [...prev, ""]);
  };

  const handleChangeAdditionalCommitteeValue = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAdditionalCommitteeList((prev) => {
      const updatedList = [...prev];
      updatedList[index] = e.target.value;
      return updatedList;
    });
  };

  const handleDeleteAdditionalCommittee = (index: number) => {
    setAdditionalCommitteeList((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ]);
  };

  const handleSetInputValue = (value: string, type: string) => {
    if (type === "number") {
      return parseFloat(value);
    }

    return value;
  };

  const handleRegister = (
    id: keyof InputTypes,
    type: string,
    required: boolean,
    validationRule?: RegExp,
  ) => {
    return {
      ...register(id, {
        required: required && "필수 입력란을 작성해주세요.",
        pattern: {
          value: validationRule || /.*/,
          message: "입력 형식이 올바르지 않습니다.",
        },
        setValueAs: (value) => handleSetInputValue(value, type),
      }),
    };
  };

  const ErrorMessage = (id: keyof InputTypes) => {
    if (errors[id]?.message) {
      return (
        <p className="mt-[4px] text-[11px] font-normal text-red-500">
          {errors[id]?.message}
        </p>
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[24px] lg:gap-[40px]"
    >
      <h1 className="px-[20px] text-[20px] font-semibold text-left text-gray-900 bg-white">
        기본정보
      </h1>
      <div className="flex justify-center gap-[70px] mb-[20px]">
        <ImageSelector register={register} resetField={resetField} />
        <div className="flex flex-col gap-[24px] w-[500px]">
          <TextInputDiv
            title="이름"
            required
            onRegister={handleRegister(
              "name",
              "text",
              true,
              /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z]*$/,
            )}
            ErrorMessage={ErrorMessage("name")}
          />
          <TextInputDiv
            title="소속정당"
            required
            onRegister={handleRegister(
              "political_party",
              "text",
              true,
              /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z]*$/,
            )}
            ErrorMessage={ErrorMessage("political_party")}
          />
          <TextInputDiv
            title="당선횟수"
            type="number"
            required
            onRegister={handleRegister("elected_count", "number", true, /^[1-9]\d*$/)}
            ErrorMessage={ErrorMessage("elected_count")}
          />
        </div>
      </div>
      <ConstituencyInputs control={control} />
      <div className="flex flex-col gap-[20px]">
        <TextInputDiv
          title="상임위원회"
          tooltip="의장을 제외한 모든 의원은 하나의 상임위원회의 위원이 되며 다만
                    의회운영위원회의 위원을 겸할 수 있다. 따라서 어느 상임위원도
                    의회운영위원이 되는 경우를 제외하고는 다른 상임위원회의 의원이 되는
                    일은 있을 수 없다. 다만 상임위원은 그 수에 제한없이 특별위원회의
                    위원을 겸직할 수 있다. -의회용어사전"
          required
          onRegister={handleRegister("standing_committees", "text", true)}
          ErrorMessage={ErrorMessage("standing_committees")}
        />
        {additionalCommitteeList.map((value, index) => (
          <AdditionalCommitteeTextInputContainer
            //이 부분 수정 예정
            id="additional_standing_committees"
            title={"추가상임위원회"}
            value={value}
            errors={errors}
            index={index}
            onChangeValue={handleChangeAdditionalCommitteeValue}
            onClickDelete={handleDeleteAdditionalCommittee}
          />
        ))}
        <button
          className="py-[6px] px-[12px] mt-[10px] border border-gray-200 rounded-lg text-[12px] font-medium text-gray-900 bg-neutral-50 hover:bg-gray-100 hover:text-gray-700 focus:outline-none"
          onClick={(e) => handleClickAddAdditionalCommitteeList(e)}
        >
          + 상임위원회 추가
        </button>
      </div>
      <Table
        tableResource={formResource.status_of_promise}
        register={register}
        formState={formState}
      />
      <Table
        tableResource={formResource.completion_status_by_theme}
        register={register}
        formState={formState}
      />
      <Table
        tableResource={formResource.legislative_status}
        register={register}
        formState={formState}
      />
      <Table
        tableResource={formResource.financial_status}
        register={register}
        formState={formState}
      />
      <div className="flex items-center justify-center">
        <input
          className="flex justify-center items-center w-[80px] px-[12px] py-[8px] rounded-lg bg-purple-400 text-[13px] text-white font-medium focus:outline-none hover:bg-gray-300 focus:ring-1 focus:ring-gray-200"
          type="submit"
        />
      </div>
    </form>
  );
};

export default FormUploader;
