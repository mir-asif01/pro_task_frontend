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
import Profile from "../pages/taskManager/Profile";
import EditTask from "../pages/taskManager/EditTask";
import PrivateRoute from "./PrivateRoute";

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
                element: <PrivateRoute><AddReview></AddReview></PrivateRoute>
            },
            {
                path: "*",
                element: <ErrorElement></ErrorElement>
            }
        ]
    },
    {
        path: "task-manager",
        element: <PrivateRoute><TaskManagerLayout></TaskManagerLayout></PrivateRoute>,
        children: [
            {
                path: "/task-manager",
                element: <PrivateRoute><TaskManagerHome></TaskManagerHome></PrivateRoute>
            },
            {
                path: "all-tasks",
                element: <PrivateRoute><AllTasks></AllTasks></PrivateRoute>
            },
            {
                path: "profile",
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },
            {
                path: "create-task",
                element: <PrivateRoute><CreateTask></CreateTask></PrivateRoute>
            },
            {
                path: "edit-task/:id",
                element: <PrivateRoute><EditTask></EditTask></PrivateRoute>,
                loader: async ({ params }) => await fetch(`http://localhost:4000/tasks/${params.id}`)
            },
            {
                path: "*",
                element: <ErrorElement></ErrorElement>
            }
        ]
    }
])
