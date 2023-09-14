import { Outlet, createBrowserRouter } from "react-router-dom";
import MainPage from "@pages/MainPage";
import GomaoPage from "@pages/Gomao/Gomao";

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
