import { Home } from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AppLayout>
          <Home />
        </AppLayout>
      ),
    },
    {
      path: "/s26",
      element: <AppLayout>s26</AppLayout>,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
