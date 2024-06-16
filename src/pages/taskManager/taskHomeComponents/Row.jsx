import toast, { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";

function Row({ task, setTasks, tasks }) {

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:4000/tasks/${task?._id}`, {
                method: "DELETE",
                headers: {
                    'content-type': "application/json"
                }
            }).then(res => res.json())
                .then(res => {
                    toast.success("Task Deleted..")
                })
            setTasks(tasks.filter(t => t._id !== id))

        } catch (error) {
            if (error) {
                console.log(error);
            }
        }
    }

    return <>
        <Toaster position="top-center" toastOptions={{ duration: 2500 }}></Toaster>
        <tr className="h-[70px] border-b bg-[#484D58] text-[#FFFFFF]">
            <th className="px-2 text-start">{task?.userEmail}</th>
            <th className=" text-start ">{task?.title}</th>
            <th className=" text-start ">{task?.priority}</th>
            <th className=" text-start ">{task?.status}</th>
            <th className=" text-start ">{task?.deadline}</th>
            <th className=" text-start">
                <NavLink to={`edit-task/${task?._id}`}>
                    <button className="flex items-center rounded-full bg-blue-600 px-4 py-2 font-bold text-white shadow-md transition-all duration-300 hover:bg-blue-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mr-2 h-6 w-6"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /> </svg>
                        Edit
                    </button>

                </NavLink>
            </th>
            <th className="px-6 py-4 text-start">
                <button onClick={() => handleDelete(task._id)} className="flex items-center rounded-full bg-red-500 px-4 py-2 font-bold text-white shadow-md transition-all duration-300 hover:bg-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mr-2 h-6 w-6">  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> </svg>
                    Delete
                </button>
            </th>
        </tr>
    </>
}
export default Row