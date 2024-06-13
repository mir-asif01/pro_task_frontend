import { NavLink, Outlet } from "react-router-dom"
import React, { useState } from 'react';


function TaskManagerLayout() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return <>
        <div className="flex min-h-screen overflow-x-scroll bg-gray-100">
            <div className="flex">
                <button
                    className="p-4 md:hidden bg-slate-900 text-white focus:outline-none"
                    onClick={toggleSidebar}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        ></path>
                    </svg>
                </button>
                <div
                    className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
                >
                    <div className="p-4 flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Task Manager</h1>
                        <button
                            className="md:hidden  text-white border focus:outline-none"
                            onClick={toggleSidebar}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <nav className="mt-5">
                        <NavLink className="block py-2.5 px-4 hover:bg-gray-700" to="all-tasks">All Tasks</NavLink>
                        <NavLink className="block py-2.5 px-4 hover:bg-gray-700" to="create-task">New Task</NavLink>
                        <NavLink className="block py-2.5 px-4 hover:bg-gray-700" to="/">Homepage</NavLink>
                    </nav>
                </div>
                <div
                    className={`fixed bg-black opacity-50 ${isOpen ? 'block' : 'hidden'
                        } md:hidden`}
                    onClick={toggleSidebar}
                ></div>
            </div>
            <div className="flex-1 p-10">
                <Outlet></Outlet>
            </div>
        </div>
    </>
}

export default TaskManagerLayout