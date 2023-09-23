import { Outlet, createBrowserRouter } from "react-router-dom";
import MainPage from "@pages/MainPage";
import GomaoPage from "@pages/Gomao/Gomao";
import AdminLogin from "@pages/Admin/AdminLogin";
import AdminLayout from "@pages/Admin/AdminLayout";
import AdminDashboard from "@pages/Admin/AdminDashboard";
import AdminSearch from "@pages/Admin/AdminSearch";

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
        path: "adminLogin",
        element: <AdminLogin />,
      },
      {
        path: "admin_search",
        element: <AdminSearch />,
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
