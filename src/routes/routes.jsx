import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/shared/Login";
import Register from "../pages/shared/Register";
import ErrorElement from "../pages/shared/ErrorElement";
import DashboardLoyout from "../layout/DashboardLayout";
import Home from "../pages/Main/Home";
import AllTasks from "../pages/Dashboard/AllTasks";
import DashboardHome from "../pages/Dashboard/DashboardHome";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "*",
                element: <ErrorElement></ErrorElement>
            }
        ]
    },
    {
        path: "dashboard",
        element: <DashboardLoyout></DashboardLoyout>,
        children: [
            {
                path: "/dashboard",
                element: <DashboardHome></DashboardHome>
            },
            {
                path: "all-tasks",
                element: <AllTasks></AllTasks>
            }
        ]
    }
])
