import { Outlet, createBrowserRouter } from "react-router-dom";
import MainPage from "@pages/MainPage";
import GomaoPage from "@pages/Gomao/Gomao";
import AdminLogin from "@pages/Admin/AdminLogin";
import AdminLayout from "@pages/Admin/AdminLayout";
import AdminDashboard from "@pages/Admin/AdminDashboard";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <LayOutWrapper />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "gomao",
        element: <GomaoPage />,
      },
      {
        path: "/admin/login",
        element: <AdminLogin />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
    ],
  },
]);

function LayOutWrapper() {
  return (
    <div>
      {/* <h1>헤더 ㄱㅁㅇ</h1> */}
      <Outlet />
    </div>
  );
}
