import React from "react";

interface GomaoPageProps {}

const GomaoPage: React.FC<GomaoPageProps> = () => {
  return (
    <div className="flex">
      <div className="bg-dw-100 text-sm">여긴 바로 ㄱㅁㅇ</div>
      <img src="./src/assets/gomao.png" />
    </div>
  );
};

export default GomaoPage;
