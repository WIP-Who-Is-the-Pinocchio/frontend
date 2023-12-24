import { useState, ChangeEventHandler, KeyboardEventHandler, FC } from "react";

import Dropdown from "@components/Dropdown";
import ArrowButton from "@components/ArrowButton";
import { MPDataKeys } from "@components/admin/uploadMP/types";
import { TableRows } from "./components/TableBoard";
import useGetMPData from "@hooks/queries/useGetMPData";
import useSearchCondition from "@hooks/queries/useSearchCondition";
import { MPDataType } from "../../../types/MPData.type";
import { SortState } from "../../../types/sortState.type";
import { SearchConditionType } from "../../../types/searchCondition.type";
import sortDataByKey from "@utils/sortDataByKey";

interface AdminSearchProps {}

interface ConstituencyType {
  region: string;
  district: string;
  section: string;
}

function renderDataValue(data: MPDataType, key: string) {
  const value = data[key as keyof MPDataType];
  if (Array.isArray(value)) {
    // 'constituency'의 경우 배열 처리
    return value.map((item: ConstituencyType) => Object.values(item).slice(1).join(" "));
  }
  return value;
}

const AdminSearch: FC<AdminSearchProps> = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedItem, setSelectedItem] = useState<SearchConditionType>("이름");
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [sortStates, setSortStates] = useState<{ [key: string]: SortState }>({});
  const [isSearchTrigger, setIsSearchTrigger] = useState(false);

  const { MPData } = useGetMPData(21);
  const { searchData } = useSearchCondition(selectedItem, searchValue, isSearchTrigger);

  const searchValueChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const currentValue = e.target.value;
    setSearchValue(() => currentValue);
  };

  // setSelectItem 핸들러
  const handlerSelectItem = (item: SearchConditionType) => {
    setSelectedItem(item);
    setIsSearchTrigger(false);
  };

  // 엔터 키 이벤트
  const handleEnterPressed: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      setIsSearchTrigger(true);
      return searchData;
    }
  };

  const handleSearchButton = () => {
    setIsSearchTrigger(true);
  };

  //어떤 컬럼이 클릭됐는지
  const handleColumnClick = (key: string) => {
    setSortStates((prevStates) => {
      const currentState = prevStates[key] || SortState.NONE;

      let newState: SortState;

      switch (currentState) {
        case SortState.NONE:
          newState = SortState.ASC;
          break;
        case SortState.ASC:
          newState = SortState.DESC;
          break;
        case SortState.DESC:
          newState = SortState.NONE;
          break;
        default:
          newState = SortState.NONE;
          break;
      }

      // 다른 열의 상태를 초기화하고 현재 열의 상태만 업데이트
      return { ...{ [key]: newState } };
    });
  };

  console.log(sortDataByKey(MPData, sortStates, Object.keys(sortStates)[0]));

  return (
    <div className="bg-purple-50 w-screen p-10">
      <div className="flex justify-between items-center bg-white w-full h-10 rounded-lg p-10 mb-10">
        <div className="font-semibold">국회의원 검색</div>
        <div>
          <Dropdown
            items={["이름", "소속 정당", "관할 지역구"]}
            selectedItem={selectedItem}
            onSelectedItem={handlerSelectItem}
          />
          <input
            value={searchValue}
            onChange={searchValueChange}
            onKeyUp={handleEnterPressed}
            className="border border-black rounded w-96 h-7 mr-10 p-1"
          />
          <button
            onClick={handleSearchButton}
            className="border border-sk w-20 h-8 rounded-lg bg-purple-100"
          >
            검색
          </button>
        </div>
      </div>
      <div className="bg-white w-full min-h-3/4 rounded-lg p-10">
        <div className="relative h-[32rem] whitespace-nowrap overflow-x-auto overflow-scroll shadow-md">
          <table className="w-full text-gray-500 text-[14px] text-left">
            <thead className="sticky top-0 z-20 bg-gray-50 text-[12px] text-gray-700 shadow-[0px_3px_15px_-4px_rgba(0,0,0,.15)]">
              <tr>
                {Object.values(MPDataKeys).map((key) => (
                  <th
                    key={key}
                    scope="col"
                    className="px-[24px] py-[12px] whitespace-nowrap"
                  >
                    <div
                      onClick={() => {
                        handleColumnClick(key);
                        if (sortStates[key] !== SortState.ASC) {
                          setSelectedKey(selectedKey === key ? null : key);
                        }
                      }}
                      className="flex items-center cursor-pointer"
                    >
                      <div className="mr-[10px]">{key}</div>
                      <ArrowButton
                        state={sortStates[key]}
                        isActive={selectedKey === key}
                      />
                    </div>
                  </th>
                ))}
                <th
                  scope="col"
                  className="sticky right-0 z-10 px-[24px] py-[12px] bg-white whitespace-nowrap"
                ></th>
              </tr>
            </thead>
            <tbody>
              {searchValue ? (
                <TableRows
                  data={searchData}
                  MPDataKeys={MPDataKeys}
                  renderDataValue={renderDataValue}
                />
              ) : (
                <TableRows
                  data={sortDataByKey(MPData, sortStates, Object.keys(sortStates)[0])}
                  MPDataKeys={MPDataKeys}
                  renderDataValue={renderDataValue}
                />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSearch;
