import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import RedirecIfAuth from "../features/RedirecIfAuth";
import ProtectedRout from "../features/ProtectedRout";
import Header from "../features/components/Header";
import { Outlet } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ActivityPage from "../pages/ActivityPage";
import SummaryPage from "../pages/SummaryPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <RedirecIfAuth>
        <LoginPage />
      </RedirecIfAuth>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRout>
        <Header />
        <Outlet />
      </ProtectedRout>
    ),
    children: [
      { path: "", element: <HomePage /> },
      { path: "/activity", element: <ActivityPage /> },
      { path: "/summary", element: <SummaryPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
