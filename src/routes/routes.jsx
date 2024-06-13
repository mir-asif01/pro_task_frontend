import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/shared/Login";
import Register from "../pages/shared/Register";
import ErrorElement from "../pages/shared/ErrorElement";
import Home from "../pages/Main/Home";

import AddReview from "../pages/Main/AddReview";
import AllTasks from "../pages/Main/AllTasks";
import TaskManagerLayout from "../layout/TaskManagerLayout";
import TaskManagerHome from "../pages/taskManager/TaskManagerHome";
import CreateTask from "../pages/taskManager/CreateTask";

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
                path: "/add-review",
                element: <AddReview></AddReview>
            },
            {
                path: "*",
                element: <ErrorElement></ErrorElement>
            }
        ]
    },
    {
        path: "task-manager",
        element: <TaskManagerLayout></TaskManagerLayout>,
        children: [
            {
                path: "/task-manager",
                element: <TaskManagerHome></TaskManagerHome>
            },
            {
                path: "all-tasks",
                element: <AllTasks></AllTasks>
            },
            {
                path: "create-task",
                element: <CreateTask></CreateTask>
            },
            {
                path: "*",
                element: <ErrorElement></ErrorElement>
            }
        ]
    }
])
