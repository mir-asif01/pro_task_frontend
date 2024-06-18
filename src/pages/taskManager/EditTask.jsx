import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { json, useLoaderData } from "react-router-dom";

function CreateTask() {

    const { user } = useContext(AuthContext)
    const task = useLoaderData()
    const options = ["Low", "Moderate", "High"]
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const { register, handleSubmit, reset } = useForm()
    const onSubmit = async (data) => {
        console.log(data);
        const newTask = {
            ...data,
        }
        await fetch(`https://pro-task-backend.onrender.com/tasks/${task?._id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newTask)
        }).then(res => res.json())
            .then(res => {
                toast.success("Task Updated...")
            })

        console.log(newTask);
    }

    return <div className="flex justify-center items-center">
        <Toaster position="top-center" toastOptions={{ duration: 2500 }}></Toaster>
        <div className="w-full sm:w-1/2 mb-8 sm:mb-0">
            {/* Left side form */}
            <h2 className="text-2xl font-bold mb-6">Update the<span className="text-green-600"> Task__</span>
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col space-y-4 mb-4">
                    <input
                        {...register("title")}
                        defaultValue={task?.title}
                        className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none"
                        placeholder="Title" type="text" />
                    <input
                        {...register("description")}
                        defaultValue={task?.description}
                        className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none"
                        placeholder="Description" type="text" />
                    <input
                        {...register("deadline")}
                        readOnly
                        defaultValue={task?.deadline}
                        className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none" placeholder="Deadline" type="date" />
                    <select
                        {...register("priority")}
                        value={selectedOption}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none"
                    >
                        {options.map((option, index) => (
                            <option key={index}
                                defaultValue={task?.priority}
                                readOnly
                                value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <input type="submit" value="Update" className="inline-flex items-center justify-center rounded-md text-sm font-medium  h-10 px-4 py-2 w-full bg-green-600 text-white cursor-pointer" />
                </div>
            </form>
        </div>
    </div>
}
export default CreateTask