import { useForm, SubmitHandler } from "react-hook-form";
import { formResource, InputTypes } from "../types";
import ImageSelector from "./ImageSelector";
import TextInputDiv from "./TextInputDiv";
import Table from "./Table";
import { useState } from "react";
import ConstituencyInputs from "./ConstituencyInputs";
import CommitteeInputs from "./CommitteeInputs";

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
        <ImageSelector register={register} resetField={resetField} control={control} />
        <div className="flex flex-col gap-[24px] w-[500px]">
          <TextInputDiv
            title="프로필"
            onRegister={handleRegister("profile_url", "text", false)}
            ErrorMessage={ErrorMessage("profile_url")}
          />
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
      <CommitteeInputs control={control} />
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
