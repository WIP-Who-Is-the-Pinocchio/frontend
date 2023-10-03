import { useForm, SubmitHandler } from "react-hook-form";
import { formResource, InputTypes } from "../types";
import ImageSelector from "./ImageSelector";
import SelectDiv from "./SelectDiv";
import TextInputDiv from "./TextInputDiv";
import Table from "./Table";

interface FormUploaderProps {}

const FormUploader: React.FC<FormUploaderProps> = () => {
  const { handleSubmit, watch, register, formState, resetField } = useForm<InputTypes>({
    mode: "onChange", //실시간 validation을 위해 onChange 모드 설정
  });
  const { errors } = formState;

  const onSubmit: SubmitHandler<InputTypes> = (data) => {
    //미리보기 검사용
    alert(`제출! ${JSON.stringify(data, null, 2)}`);
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[24px] lg:gap-[40px]"
    >
      <h1 className="px-[20px] text-[20px] font-semibold text-left text-gray-900 bg-white">
        기본정보
      </h1>
      <div className="flex justify-center gap-[70px] mb-[24px]">
        <ImageSelector register={register} resetField={resetField} />
        <div className="flex flex-col gap-[24px] w-[500px]">
          <TextInputDiv
            id="이름"
            placeholder="예) 홍길동"
            required
            register={register}
            errors={errors}
            validationRule={/^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z]*$/}
          />
          <SelectDiv
            id="소속정당"
            optionList={formResource.정당리스트}
            required
            register={register}
            errors={errors}
          />
          <TextInputDiv
            id="당선횟수"
            type="number"
            placeholder="예) 1"
            required
            register={register}
            errors={errors}
            validationRule={/^\d+$/}
          />
        </div>
      </div>
      <div className="flex gap-[20px] ">
        <SelectDiv
          id="상임위원회"
          optionList={formResource.상임위원회리스트}
          tooltip="의장을 제외한 모든 의원은 하나의 상임위원회의 위원이 되며 다만
                    의회운영위원회의 위원을 겸할 수 있다. 따라서 어느 상임위원도
                    의회운영위원이 되는 경우를 제외하고는 다른 상임위원회의 의원이 되는
                    일은 있을 수 없다. 다만 상임위원은 그 수에 제한없이 특별위원회의
                    위원을 겸직할 수 있다. -의회용어사전"
          required
          register={register}
          errors={errors}
        />
        <TextInputDiv
          id="추가상임위원회"
          caption="겸직 위원의 경우에만 작성. 2개 이상은 띄어쓰기로 구분"
          register={register}
          errors={errors}
        />
      </div>
      <div className="flex gap-[20px]">
        <SelectDiv
          id="지역구"
          optionList={formResource.지역구리스트}
          required
          register={register}
          errors={errors}
        />
        <TextInputDiv
          id="세부지역구"
          placeholder="예) 안양시 동안구"
          register={register}
          errors={errors}
        />
        <SelectDiv
          id="분구"
          optionList={formResource.분구리스트}
          caption="분구 지역인 경우에만 선택"
          register={register}
          errors={errors}
        />
      </div>
      <Table
        tableResource={formResource.공약이행현황}
        register={register}
        formState={formState}
      />
      <Table
        tableResource={formResource.성격내용별완료현황}
        register={register}
        formState={formState}
      />
      <Table
        tableResource={formResource.입법현황}
        register={register}
        formState={formState}
      />
      <Table
        tableResource={formResource.재정현황}
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
