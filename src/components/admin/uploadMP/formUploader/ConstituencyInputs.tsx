import { Control, useFieldArray } from "react-hook-form";
import { InputTypes } from "../types";
import SelectDiv from "./SelectDiv";
import { useEffect, useState } from "react";
import Title from "./Title";
import { regionType } from "../regionList";
import axios from "axios";

interface ConstituencyInputsPropsType {
  control: Control<InputTypes, any>;
}

const initialConstituencyData = {
  region: "",
  district: null,
  section: null,
};

interface ConstituencyDataType {
  region: string;
  district: string | null;
  section: string | null;
}
interface ConstituencyResType {
  region: string;
  district: string;
  section: string;
}

const ConstituencyInputs = ({ control }: ConstituencyInputsPropsType) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "constituency",
  });
  const [selectedConstituency, setSelectedConstituency] = useState<ConstituencyDataType>(
    initialConstituencyData,
  );
  const [isNewInputOpened, setIsNewInputOpend] = useState(true);
  const [districtList, setDistrictList] = useState<string[]>([]);
  const [sectionList, setSectionList] = useState<string[]>([]);

  useEffect(() => {
    if (selectedConstituency.region.length === 0) {
      return;
    }
    getConstituencyData(selectedConstituency.region);
  }, [selectedConstituency.region]);

  const getConstituencyData = async (region: string) => {
    const regionInEn = regionType[region];
    const baseURL = "http://localhost:2309/wip/public/api/v1";

    axios
      .get(`${baseURL}/constituency/${regionInEn}`, { withCredentials: true })
      .then((res) => {
        const constituencyData: ConstituencyResType[] = res.data;
        const districtArray = constituencyData
          .filter((item) => item.district !== null)
          .map((item) => item.district);
        const uniqueDistrictArray = [...new Set(districtArray)];
        const sectionArray = constituencyData
          .filter((item) => item.section !== null)
          .map((item) => item.section);
        const uniqueSectionArray = [...new Set(sectionArray)];
        setDistrictList(uniqueDistrictArray);
        setSectionList(uniqueSectionArray);
      })
      .catch((e) => {
        console.log(e);
        alert("지역구 데이터를 불러오는데 실패했습니다.");
      });
  };

  const handleSelectRegion = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRegion = event.target.value;
    setSelectedConstituency({ ...selectedConstituency, region: selectedRegion });
  };

  const handleSelectDistrict = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDistrict = event.target.value;
    setSelectedConstituency({ ...selectedConstituency, district: selectedDistrict });
  };

  const handleSelectSection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSection = event.target.value;
    setSelectedConstituency({ ...selectedConstituency, section: selectedSection });
  };

  const handleClickAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!selectedConstituency) {
      return;
    }
    if (selectedConstituency.region.length === 0) {
      alert("지역구를 선택해주세요.");
      return;
    }
    append(selectedConstituency);
    setSelectedConstituency(initialConstituencyData);
    setIsNewInputOpend(false);
  };

  const handleClickCloseNewInput = () => {
    setSelectedConstituency(initialConstituencyData);
    setIsNewInputOpend(false);
  };

  const handleClickOpenNewInput = () => {
    setIsNewInputOpend(true);
  };

  return (
    <div className="relative max-w-[730px] w-full p-[20px] m-auto mt-[20px] border-[1px] border-purple-200 rounded-[20px]">
      <div className="absolute top-[-10px] px-[10px] bg-white">
        <Title>지역구</Title>
      </div>
      <ul className="flex flex-col justify-between pt-[10px]">
        {fields.map((field, index) => (
          <li
            key={field.id}
            className="flex items-center px-[3px]  text-[14px] text-stone-800"
          >
            <span>•&nbsp;</span>
            <p>{field.region}&nbsp;</p>
            <p>{field.district && `/ ${field.district}`}&nbsp;</p>
            <p>{field.section && `/ ${field.section}`}</p>
            <div
              onClick={() => remove(index)}
              className=" pl-[10px] pb-[2px] cursor-pointer text-stone-400 text-[18px]"
            >
              &times;
            </div>
          </li>
        ))}
      </ul>
      {isNewInputOpened ? (
        <div className="pt-[20px]">
          <div className="grid grid-cols-3 gap-[10px]">
            <SelectDiv
              title="행정 구역"
              optionList={Object.keys(regionType)}
              required
              onChange={handleSelectRegion}
            />
            {districtList.length > 0 && (
              <SelectDiv
                title="세부 지역구"
                optionList={districtList}
                onChange={handleSelectDistrict}
              />
            )}
            {sectionList.length > 0 && (
              <SelectDiv
                title="분구"
                optionList={sectionList}
                onChange={handleSelectSection}
                caption="분구 지역인 경우에만 선택"
              />
            )}
          </div>
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
          + 지역구 추가
        </button>
      )}
    </div>
  );
};

export default ConstituencyInputs;
