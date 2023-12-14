import { useState, useEffect, ChangeEventHandler, KeyboardEventHandler, FC } from "react";

import Dropdown from "@components/Dropdown";
import ArrowButton from "@components/ArrowButton";
import { MPDataKeys } from "@components/admin/uploadMP/types";
import { memberData, MemberType } from "@assets/datas/memberData";
import sortDataByKey from "@utils/sortDataByKey";
import { SortState, SortDataType } from "../../types/sortState.type";

interface AdminSearchProps {}

const AdminSearch: FC<AdminSearchProps> = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedItem, setSelectedItem] = useState<string>("이름");
  const [displayData, setDisplayData] = useState<MemberType[]>([]);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [sortStates, setSortStates] = useState<{ [key: string]: SortState }>({});
  const [sortDisplayData, setSortDisplayData] = useState<SortDataType>(displayData);
  const [sortMemberData, setSortMemberData] = useState<SortDataType>(memberData);

  const searchValueChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const currentValue = e.target.value;
    setSearchValue(() => currentValue);
  };

  //드롭다운으로 필터 후 검색 데이터 보여줌
  const searchData = (selectedItem: string) => {
    return memberData.filter((member) => {
      const value = member[selectedItem];
      if (typeof value === "string") {
        return value.includes(searchValue);
      } else if (typeof value === "number") {
        return value === Number(searchValue);
      }
      return false;
    });
  };

  // setSelectItem 핸들러
  const handlerSelectItem = (item: string) => {
    setSelectedItem(item);
  };

  // 검색 버튼 클릭했을 떄, 데이터 변하도록
  const searchButtonClicked = () => {
    const filteredData = searchData(selectedItem);
    setDisplayData(filteredData);
  };

  // 엔터 키 이벤트
  const handleEnterPressed: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      searchButtonClicked();
    }
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

  useEffect(() => {
    setSortDisplayData(sortDataByKey(displayData, sortStates, selectedKey));
    setSortMemberData(sortDataByKey(memberData, sortStates, selectedKey));
  }, [sortStates, selectedKey, displayData]);

  return (
    <div className="bg-purple-50 w-screen p-10">
      <div className="flex justify-between items-center bg-white w-full h-10 rounded-lg p-10 mb-10">
        <div className="font-semibold">국회의원 검색</div>
        <div>
          <Dropdown
            items={["이름", "소속정당", "지역구"]}
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
            onClick={searchButtonClicked}
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
                <th
                  scope="col"
                  className="sticky left-0 bg-white px-[24px] py-[12px] whitespace-nowrap"
                >
                  <div
                    onClick={() => {
                      handleColumnClick(MPDataKeys[1]);
                      if (sortStates[MPDataKeys[1]] !== SortState.ASC) {
                        setSelectedKey(
                          selectedKey === MPDataKeys[1] ? null : MPDataKeys[1],
                        );
                      }
                    }}
                    className="flex items-center cursor-pointer"
                  >
                    <div className="mr-[10px]">{MPDataKeys[1]}</div>
                    <ArrowButton
                      state={sortStates[MPDataKeys[1]] || SortState.NONE}
                      isActive={selectedKey === MPDataKeys[1]}
                    />
                  </div>
                </th>
                {MPDataKeys.slice(2).map((key) => (
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
              {displayData.length !== 0 ? (
                <>
                  {sortDisplayData.map((data, index) => {
                    const profile = data[MPDataKeys[0]];
                    const name = data[MPDataKeys[1]];
                    return (
                      <tr key={index} className="bg-white border-b">
                        <th
                          scope="row"
                          className="flex items-center sticky left-0 z-10 px-[24px] py-[12px] bg-white text-gray-900 whitespace-nowrap shadow-[5px_0px_8px_-4px_rgba(0,0,0,.15)]"
                        >
                          <div
                            style={{ backgroundImage: `url(${profile})` }}
                            className={`w-[40px] h-[40px] border border-gray-200 rounded-full bg-cover bg-top`}
                          />
                          <div className="pl-[12px]">
                            <div className="text-[14px] font-semibold">{name}</div>
                          </div>
                        </th>
                        {MPDataKeys.slice(2).map((key) => (
                          <td
                            key={key}
                            className="px-[24px] py-[12px] text-[12px] whitespace-nowrap"
                          >
                            {data[key]}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </>
              ) : (
                <>
                  {sortMemberData.map((data, index) => {
                    const profile = data[MPDataKeys[0]];
                    const name = data[MPDataKeys[1]];
                    return (
                      <tr key={index} className="bg-white border-b">
                        <th
                          scope="row"
                          className="flex items-center sticky left-0 z-10 px-[24px] py-[12px] bg-white text-gray-900 whitespace-nowrap shadow-[5px_0px_8px_-4px_rgba(0,0,0,.15)]"
                        >
                          <div
                            style={{ backgroundImage: `url(${profile})` }}
                            className={`w-[40px] h-[40px] border border-gray-200 rounded-full bg-cover bg-top`}
                          />
                          <div className="pl-[12px]">
                            <div className="text-[14px] font-semibold">{name}</div>
                          </div>
                        </th>
                        {MPDataKeys.slice(2).map((key) => (
                          <td
                            key={key}
                            className="px-[24px] py-[12px] text-[12px] whitespace-nowrap"
                          >
                            {data[key]}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSearch;
