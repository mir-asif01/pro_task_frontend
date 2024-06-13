import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/shared/Login";
import Register from "../pages/shared/Register";
import ErrorElement from "../pages/shared/ErrorElement";
import Home from "../pages/Main/Home";

import AddReview from "../pages/Main/AddReview";
import AllTasks from "../pages/Main/AllTasks";

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
                path: "/all-tasks",
                element: <AllTasks></AllTasks>
            },
            {
                path: "/add-review",
                element: <AddReview></AddReview>
            },
            {
                path: "*",
                element: <ErrorElement></ErrorElement>
            }
        ]
    }
])
