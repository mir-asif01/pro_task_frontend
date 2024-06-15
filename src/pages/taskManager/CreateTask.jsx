import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

function CreateTask() {

    const { user } = useContext(AuthContext)
    const options = ["Low", "Moderate", "High"]
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const { register, handleSubmit, reset } = useForm()
    const onSubmit = async (data) => {
        // console.log(data);
        const newTask = {
            ...data,
            userEmail: user?.email,
            userPhoto: user?.photoURL,
            status: "to-do"
        }

        await fetch("https://pro-task-backend.vercel.app/task", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newTask)
        }).then(res => res.json())
            .then(res => {
                console.log(res)
                reset({ title: "", description: "", deadline: "", priority: "Low" })
                toast.success("New task is created !!")
            })

        console.log(newTask);
    }

    return <div className="flex justify-center items-center">
        <Toaster position="top-center" toastOptions={{ duration: 2500 }}></Toaster>
        <div className="w-full sm:w-1/2 mb-8 sm:mb-0">
            {/* Left side form */}
            <h2 className="text-2xl font-bold mb-6">Create A new <span className="text-green-600">Task__</span>
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col space-y-4 mb-4">
                    <input
                        {...register("title")}
                        className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none"
                        placeholder="Title" type="text" />
                    <input
                        {...register("description")}
                        className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none"
                        placeholder="Description" type="text" />
                    <input
                        {...register("deadline")}
                        className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none" placeholder="Deadline" type="date" />
                    <select
                        {...register("priority")}
                        value={selectedOption}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none"
                    >
                        {options.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <input type="submit" value="Add Task" className="inline-flex items-center justify-center rounded-md text-sm font-medium  h-10 px-4 py-2 w-full bg-red-600 text-white cursor-pointer" />
                </div>
            </form>
        </div>
    </div>
}
export default CreateTask