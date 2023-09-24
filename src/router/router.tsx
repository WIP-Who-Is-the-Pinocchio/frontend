import { Outlet, createBrowserRouter } from "react-router-dom";
import { Router as RemixRouter } from "@remix-run/router/dist/router";
import MainPage from "@pages/MainPage";
import GomaoPage from "@pages/Gomao/Gomao";
import AdminLogin from "@pages/Admin/AdminLogin";
import AdminLayout from "@pages/Admin/AdminLayout";
import AdminDashboard from "@pages/Admin/AdminDashboard";

export const routers: RemixRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <div>{window.location.pathname}</div>
        <LayOutWrapper />
      </div>
    ),
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
    ],
  },
  {
    path: "admin",
    element: (
      <div>
        <div>
          {window.location.pathname}
          <AdminLayout />
        </div>
      </div>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
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
    ],
  },
]);

function LayOutWrapper() {
  return (
    <div>
      <h1>헤더 ㄱㅁㅇ</h1>
      <Outlet />
    </div>
  );
}
