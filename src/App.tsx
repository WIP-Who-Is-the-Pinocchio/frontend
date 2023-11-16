import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { routers } from "@router/router";

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div>
          <RouterProvider router={routers} />
          <ReactQueryDevtools initialIsOpen={false} />
        </div>
      </QueryClientProvider>
    </>
  );
}
