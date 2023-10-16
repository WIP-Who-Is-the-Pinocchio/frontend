import { useForm, SubmitHandler } from "react-hook-form";
import { formResource, InputTypes } from "../types";
import ImageSelector from "./ImageSelector";
import SelectDiv from "./SelectDiv";
import TextInputDiv from "./TextInputDiv";
import Table from "./Table";
import { regionData } from "./regionList";
import { useState } from "react";
import SelectRegion from "./SelectRegion";

interface FormUploaderProps {}

const FormUploader: React.FC<FormUploaderProps> = () => {
  const { handleSubmit, watch, register, formState, resetField } = useForm<InputTypes>({
    mode: "onChange", //실시간 validation을 위해 onChange 모드 설정
  });
  const { errors } = formState;
  const [selectedRegion, setSelectedRegion] = useState<string>();
  const [cityComponents, setCityComponents] = useState<JSX.Element[]>([]);
  const [committeesComponents, setCommitteesComponents] = useState<JSX.Element[]>([]);
  const [districtList, setDistrictList] = useState<string[]>([]);

  const onSubmit: SubmitHandler<InputTypes> = (data) => {
    //미리보기 검사용
    alert(`제출! ${JSON.stringify(data, null, 2)}`);
    console.log(data);
  };

  const handleSelectRegion = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(event.target.value);
  };

  const handleSelectDistrict = (
    index: number,
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setDistrictList((prev) => {
      const updatedDistrictList = [...prev];
      updatedDistrictList[index] = event.target.value;
      return updatedDistrictList;
    });
  };

  const handleClickAddCityComponent = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (!selectedRegion) {
      return;
    }
    setDistrictList((prev) => [...prev, ""]);
  };

  const handleClickDeleteCityComponent = (index: number) => {
    setDistrictList((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  };

  const handleClickAddStandingCommitteeComponent = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (!selectedRegion) return;
    setCommitteesComponents([
      ...committeesComponents,
      <TextInputDiv
        //이 부분 수정 예정

        id="additionalStandingCommittees"
        title={`추가상임위원회${committeesComponents.length + 1}`}
        register={register}
        errors={errors}
      />,
    ]);
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
            id="name"
            title="이름"
            placeholder="예) 홍길동"
            required
            register={register}
            errors={errors}
            validationRule={/^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z]*$/}
          />
          <SelectDiv
            id="affiliatedParty"
            title="소속정당"
            optionList={formResource.정당리스트}
            required
            register={register}
            errors={errors}
          />
          <TextInputDiv
            id="numberOfElections"
            title="당선횟수"
            type="number"
            placeholder="예) 1"
            required
            register={register}
            errors={errors}
            validationRule={/^\d+$/}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-[30px]">
        <div className="flex flex-col gap-[20px]">
          <SelectDiv
            id="region"
            title="지역구"
            optionList={Object.keys(regionData)}
            required
            register={register}
            errors={errors}
            onChange={handleSelectRegion}
          />
          {selectedRegion && (
            <SelectDiv
              id="subRegion" //이 부분 수정 예정
              title="세부 지역구"
              optionList={regionData[selectedRegion]}
              required
              register={register}
              errors={errors}
            />
          )}
          {selectedRegion &&
            districtList.map((selected, index) => (
              <SelectRegion
                //이 부분 수정 예정
                title={`세부 지역구`}
                optionList={regionData[selectedRegion]}
                selected={selected}
                index={index}
                onSelectDistrict={handleSelectDistrict}
                onClickDeleteCityComponent={handleClickDeleteCityComponent}
              />
            ))}
          {selectedRegion && (
            <button
              className="py-[6px] px-[12px] mt-[10px] border border-gray-200 rounded-lg text-[12px] font-medium text-gray-900 bg-neutral-50 hover:bg-gray-100 hover:text-gray-700 focus:outline-none"
              onClick={(e) => handleClickAddCityComponent(e)}
            >
              + 세부 지역구 추가
            </button>
          )}
          <SelectDiv
            id="division"
            title="분구"
            optionList={formResource.분구리스트}
            caption="분구 지역인 경우에만 선택"
            register={register}
            errors={errors}
          />
        </div>
        <div className="flex flex-col gap-[20px]">
          <SelectDiv
            id="standingCommittees"
            title="상임위원회"
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
          {/* <TextInputDiv
            id="additionalStandingCommittees"
            title="추가상임위원회"
            caption="겸직 위원의 경우에만 작성. 2개 이상은 띄어쓰기로 구분"
            register={register}
            errors={errors}
          /> */}
          {committeesComponents}
          <button
            className="py-[6px] px-[12px] mt-[10px] border border-gray-200 rounded-lg text-[12px] font-medium text-gray-900 bg-neutral-50 hover:bg-gray-100 hover:text-gray-700 focus:outline-none"
            onClick={(e) => handleClickAddStandingCommitteeComponent(e)}
          >
            + 상임위원회 추가
          </button>
        </div>
      </div>
      <Table
        tableResource={formResource.statusOfPledge}
        register={register}
        formState={formState}
      />
      <Table
        tableResource={formResource.completionStatusByTheme}
        register={register}
        formState={formState}
      />
      <Table
        tableResource={formResource.legislativeStatus}
        register={register}
        formState={formState}
      />
      <Table
        tableResource={formResource.financialStatus}
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
