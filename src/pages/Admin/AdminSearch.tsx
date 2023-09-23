import { useState } from "react";

import Dropdown from "@components/Dropdown";
import { memberData } from "@assets/datas/memberData";

const AdminSearch = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("이름");

  const searchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    setSearchValue(() => currentValue);
  };

  //드롭다운으로 필터 후 검색 데이터 보여줌
  const searchData = (selectedItem: string) => {
    const filteredData = memberData.filter((member) => {
      const value = member[selectedItem];
      if (typeof value === "string") {
        return value.includes(searchValue);
      }
      return "";
    });

    return filteredData;
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
          <button className="border border-sk w-20 h-8 rounded-lg bg-purple-100">
            검색
          </button>
        </div>
      </div>
      <div className="bg-white w-full min-h-3/4 rounded-lg p-10">
        <div className="flex justify-between border-b p-5">
          <div>이름</div>
          <div>당선횟수</div>
          <div>소속정당</div>
          <div>지역구</div>
          <div>총 공약수</div>
          <div>완료</div>
          <div>추진중</div>
          <div>필요재정총액</div>
          <div>확보재정총액</div>
          <div>집행재정총액</div>
        </div>
        {searchValue ? (
          <div>
            {searchData(selectedItem).map((data) => (
              <div className="flex justify-between border-b p-5">
                <div className="flex flex-col items-center ">
                  <img
                    src={data.프로필}
                    alt={data.이름}
                    className="w-10 h-15 rounded-full"
                  />
                  <div>{data.이름}</div>
                </div>
                <div>{data.당선횟수}</div>
                <div>{data.소속정당}</div>
                <div>{data.지역구}</div>
                <div>{data.총공약수}</div>
                <div>{data.완료}</div>
                <div>{data.추진중}</div>
                <div>{data.필요재정총액}</div>
                <div>{data.확보재정총액}</div>
                <div>{data.집행재정총액}</div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {memberData.map((data) => (
              <div className="flex justify-between border-b p-5">
                <div className="flex flex-col items-center ">
                  <img
                    src={data.프로필}
                    alt={data.이름}
                    className="w-10 h-15 rounded-full"
                  />
                  <div>{data.이름}</div>
                </div>
                <div>{data.당선횟수}</div>
                <div>{data.소속정당}</div>
                <div>{data.지역구}</div>
                <div>{data.총공약수}</div>
                <div>{data.완료}</div>
                <div>{data.추진중}</div>
                <div>{data.필요재정총액}</div>
                <div>{data.확보재정총액}</div>
                <div>{data.집행재정총액}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSearch;
