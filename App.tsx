import { RouterProvider } from "react-router-dom";
import { routers } from "@router/router";

export default function App() {
  return (
    <>
      <div>
        <RouterProvider router={routers} />
      </div>
    </>
  );
}
