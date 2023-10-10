import { Outlet, createBrowserRouter } from "react-router-dom";
import MainPage from "@pages/MainPage";
import GomaoPage from "@pages/Gomao/Gomao";
import AdminLogin from "@pages/Admin/AdminLogin";
import AdminLayout from "@pages/Admin/AdminLayout";
import AdminDashboard from "@pages/Admin/AdminDashboard";
import AdminSignUp from "@pages/Admin/AdminSignUp";
import AdminSearch from "@pages/Admin/AdminSearch";
import UploadMP from "@pages/Admin/UploadMP";

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
      {
        path: "/admin/signup",
        element: <AdminSignUp />,
      },
    ],
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "uploadMP",
        element: <UploadMP />,
      },
      {
        path: "login",
        element: <AdminLogin />,
        children: [
          {
            index: true,
            element: <div>관리자 로그인</div>,
          },
          {
            path: "gomgom",
            element: <div>곰곰뜨면성공</div>,
          },
        ],
      },
      {
        path: "search",
        element: <AdminSearch />,
      },
    ],
  },
]);

function LayOutWrapper() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
