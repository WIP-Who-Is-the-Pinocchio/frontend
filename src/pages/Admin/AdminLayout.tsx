import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  // 여기에 admin 레이아웃 스타일이나 구성을 추가할 수 있습니다.
  return (
    <div className="admin-layout">
      {/* 상단 네비게이션, 사이드바, 헤더 등을 추가할 수 있습니다. */}
      <header>Admin Header</header>
      <nav>Admin Sidebar</nav>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
