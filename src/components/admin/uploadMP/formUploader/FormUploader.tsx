import { useForm, SubmitHandler } from "react-hook-form";
import ImageSelector from "./ImageSelector";
import SelectDiv from "./SelectDiv";
import TextInputDiv from "./TextInputDiv";
import Table from "./Table";
import {
  정당리스트,
  상임위원회리스트,
  지역구리스트,
  분구리스트,
  공약이행현황,
  성격내용별완료현황,
  입법현황,
  재정현황,
} from "./formUploaderResource";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
};

interface FormUploaderProps {}

const FormUploader: React.FC<FormUploaderProps> = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[24px]">
      <h1 className="px-[20px] text-[20px] font-semibold text-left text-gray-900 bg-white">
        기본정보
      </h1>
      <div className="flex justify-center gap-[30px] mb-[24px]">
        <ImageSelector />
        <div className="flex flex-col gap-[24px] w-[300px]">
          <TextInputDiv title="이름" id="이름" placeholder="예) 홍길동" />
          <SelectDiv title="소속 정당" id="정당" optionList={정당리스트} />
          <TextInputDiv title="당선 횟수" id="당선 횟수" placeholder="예) 1" />
        </div>
      </div>
      <div className="flex gap-[20px]">
        <SelectDiv
          id="상임위원회"
          optionList={상임위원회리스트}
          title="상임위원회"
          tooltip="의장을 제외한 모든 의원은 하나의 상임위원회의 위원이 되며 다만
                    의회운영위원회의 위원을 겸할 수 있다. 따라서 어느 상임위원도
                    의회운영위원이 되는 경우를 제외하고는 다른 상임위원회의 의원이 되는
                    일은 있을 수 없다. 다만 상임위원은 그 수에 제한없이 특별위원회의
                    위원을 겸직할 수 있다. -의회용어사전"
        />
        <TextInputDiv
          title="위원회 추가입력"
          id="위원회 추가입력"
          isOptional={true}
          caption="겸직 위원의 경우에만 작성. 2개 이상은 띄어쓰기로 구분"
        />
      </div>
      <div className="flex gap-[20px]">
        <SelectDiv title="지역구" id="지역구" optionList={지역구리스트} />
        <TextInputDiv
          title="세부 지역구"
          id="세부 지역구"
          placeholder="예) 안양시 동안구"
        />
        <SelectDiv
          title="분구"
          id="분구"
          optionList={분구리스트}
          isOptional={true}
          caption="분구 지역인 경우에만 선택"
        />
      </div>
      <Table
        title={공약이행현황.title}
        subtitle={공약이행현황.subtitle}
        theadList={공약이행현황.theadList}
        tbodyList={공약이행현황.tbodyList}
      />
      <Table
        title={성격내용별완료현황.title}
        subtitle={성격내용별완료현황.subtitle}
        theadList={성격내용별완료현황.theadList}
        tbodyList={성격내용별완료현황.tbodyList}
      />
      <Table
        title={입법현황.title}
        subtitle={입법현황.subtitle}
        theadList={입법현황.theadList}
        tbodyList={입법현황.tbodyList}
      />
      <Table
        title={재정현황.title}
        subtitle={재정현황.subtitle}
        theadList={재정현황.theadList}
        tbodyList={재정현황.tbodyList}
        unit={재정현황.unit}
      />
    </form>
  );
};

export default FormUploader;
