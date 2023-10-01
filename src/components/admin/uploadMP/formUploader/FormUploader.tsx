import { useForm, SubmitHandler } from "react-hook-form";
import ImageSelector from "./ImageSelector";
import SelectDiv from "./SelectDiv";
import TextInputDiv from "./TextInputDiv";
import Table from "./Table";
import { formResource, Inputs, InputKeys } from "./formUploaderResource";

interface FormUploaderProps {}

const FormUploader: React.FC<FormUploaderProps> = () => {
  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  console.log(watch());
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[24px]">
      <h1 className="px-[20px] text-[20px] font-semibold text-left text-gray-900 bg-white">
        기본정보
      </h1>
      <div className="flex justify-center gap-[30px] mb-[24px]">
        <ImageSelector />
        <div className="flex flex-col gap-[24px] w-[300px]">
          <TextInputDiv
            id={InputKeys.이름}
            placeholder="예) 홍길동"
            required
            register={register}
            errors={errors}
          />
          <SelectDiv
            id={InputKeys.소속정당}
            optionList={formResource.정당리스트}
            required
            register={register}
          />
          <TextInputDiv
            id={InputKeys.당선횟수}
            placeholder="예) 1"
            required
            register={register}
            errors={errors}
          />
        </div>
      </div>
      <div className="flex gap-[20px]">
        <SelectDiv
          id={InputKeys.상임위원회}
          optionList={formResource.상임위원회리스트}
          tooltip="의장을 제외한 모든 의원은 하나의 상임위원회의 위원이 되며 다만
                    의회운영위원회의 위원을 겸할 수 있다. 따라서 어느 상임위원도
                    의회운영위원이 되는 경우를 제외하고는 다른 상임위원회의 의원이 되는
                    일은 있을 수 없다. 다만 상임위원은 그 수에 제한없이 특별위원회의
                    위원을 겸직할 수 있다. -의회용어사전"
          required
          register={register}
        />
        <TextInputDiv
          id={InputKeys.추가상임위원회}
          caption="겸직 위원의 경우에만 작성. 2개 이상은 띄어쓰기로 구분"
          register={register}
          errors={errors}
        />
      </div>
      <div className="flex gap-[20px]">
        <SelectDiv
          id={InputKeys.지역구}
          optionList={formResource.지역구리스트}
          required
          register={register}
        />
        <TextInputDiv
          id={InputKeys.세부지역구}
          placeholder="예) 안양시 동안구"
          register={register}
          errors={errors}
        />
        <SelectDiv
          id={InputKeys.분구}
          optionList={formResource.분구리스트}
          caption="분구 지역인 경우에만 선택"
          register={register}
        />
      </div>
      <Table
        title={formResource.공약이행현황.title}
        subtitle={formResource.공약이행현황.subtitle}
        theadList={formResource.공약이행현황.theadList}
        tbodyList={formResource.공약이행현황.tbodyList}
        register={register}
      />
      <Table
        title={formResource.성격내용별완료현황.title}
        subtitle={formResource.성격내용별완료현황.subtitle}
        theadList={formResource.성격내용별완료현황.theadList}
        tbodyList={formResource.성격내용별완료현황.tbodyList}
        register={register}
      />
      <Table
        title={formResource.입법현황.title}
        subtitle={formResource.입법현황.subtitle}
        theadList={formResource.입법현황.theadList}
        tbodyList={formResource.입법현황.tbodyList}
        register={register}
      />
      <Table
        title={formResource.재정현황.title}
        subtitle={formResource.재정현황.subtitle}
        theadList={formResource.재정현황.theadList}
        tbodyList={formResource.재정현황.tbodyList}
        unit={formResource.재정현황.unit}
        register={register}
      />
      <div>
        <input type="submit" />
      </div>
    </form>
  );
};

export default FormUploader;
