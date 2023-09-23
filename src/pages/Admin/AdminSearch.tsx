import { useState } from "react";

import Dropdown from "@components/Dropdown";
import { memberData, MemberType } from "@assets/datas/memberData";

const AdminSearch = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("이름");
  const [displayData, setDisplayData] = useState<MemberType[]>([]);

  const searchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    setSearchValue(() => currentValue);
  };

  //드롭다운으로 필터 후 검색 데이터 보여줌
  const searchData = (selectedItem: string) => {
    return memberData.filter((member) => {
      const value = member[selectedItem];
      if (typeof value === "string") {
        return value.includes(searchValue);
      }
      return false;
    });
  };

  // 검색 버튼 클릭했을 떄, 데이터 변하도록
  const searchButtonClicked = () => {
    const filteredData = searchData(selectedItem);
    setDisplayData(filteredData);
  };

  return (
    <div className="bg-purple-50 w-screen h-screen p-10">
      <div className="flex justify-between items-center bg-white w-full h-10 rounded-lg p-10 mb-10">
        <div>국회의원 검색</div>
        <div>
          <Dropdown
            items={["이름", "당선횟수", "소속정당", "지역구"]}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
          <input
            value={searchValue}
            onChange={searchValueChange}
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
        <div className="flex justify-between border-b p-5">
          <div className="w-1/16 text-center">이름</div>
          <div className="w-1/16 text-center">당선횟수</div>
          <div className="w-2/16 text-center">소속정당</div>
          <div className="w-3/16 text-center">지역구</div>
          <div className="w-1/16 text-center">총 공약수</div>
          <div className="w-1/16 text-center">완료</div>
          <div className="w-1/16 text-center">추진중</div>
          <div className="w-2/16 text-center">필요재정총액</div>
          <div className="w-2/16 text-center">확보재정총액</div>
          <div className="w-2/16 text-center">집행재정총액</div>
        </div>
        {displayData.length !== 0 ? (
          <div>
            {displayData.map((data) => (
              <div className="flex justify-between text-center border-b p-5">
                <div className="flex flex-col text-center items-center w-1/16">
                  <img
                    src={data.프로필}
                    alt={data.이름}
                    className="w-10 h-15 rounded-full"
                  />
                  <div>{data.이름}</div>
                </div>
                <div className="w-1/16 text-center">{data.당선횟수}</div>
                <div className="w-2/16 text-center">{data.소속정당}</div>
                <div className="w-3/16 text-center">{data.지역구}</div>
                <div className="w-1/16 text-center">{data.총공약수}</div>
                <div className="w-1/16 text-center">{data.완료}</div>
                <div className="w-1/16 text-center">{data.추진중}</div>
                <div className="w-2/16 text-center">{data.필요재정총액}</div>
                <div className="w-2/16 text-center">{data.확보재정총액}</div>
                <div className="w-2/16 text-center">{data.집행재정총액}</div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {memberData.map((data) => (
              <div className="flex justify-between border-b p-5">
                <div className="flex flex-col text-center items-center w-1/16">
                  <img
                    src={data.프로필}
                    alt={data.이름}
                    className="w-10 h-15 rounded-full"
                  />
                  <div>{data.이름}</div>
                </div>
                <div className="w-1/16 text-center">{data.당선횟수}</div>
                <div className="w-2/16 text-center">{data.소속정당}</div>
                <div className="w-3/16 text-center">{data.지역구}</div>
                <div className="w-1/16 text-center">{data.총공약수}</div>
                <div className="w-1/16 text-center">{data.완료}</div>
                <div className="w-1/16 text-center">{data.추진중}</div>
                <div className="w-2/16 text-center">{data.필요재정총액}</div>
                <div className="w-2/16 text-center">{data.확보재정총액}</div>
                <div className="w-2/16 text-center">{data.집행재정총액}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSearch;
