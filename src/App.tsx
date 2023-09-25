import React from "react";
import { RouterProvider } from "react-router-dom";
import { routers } from "@router/router";

const App: React.FC = () => {
  return (
    <div>
      <RouterProvider router={routers} />
    </div>
  );
};

export default App;
