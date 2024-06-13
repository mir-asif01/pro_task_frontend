import { useState } from "react";

function CreateTask() {

    const options = ["Low", "Moderate", "High"]
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };
    return <div className="flex justify-center items-center">
        <div className="w-full sm:w-1/2 mb-8 sm:mb-0">
            {/* Left side form */}
            <h2 className="text-2xl font-bold mb-6">Create A new <span className="text-green-600">Task__</span>
            </h2>
            <form>
                <div className="flex flex-col space-y-4 mb-4">
                    <input className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none" placeholder="Title" type="text" />
                    <input className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none" placeholder="Description" type="text" />
                    <input className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none" placeholder="Deadline" type="date" />
                    <div className="relative">
                        <select
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
                    </div>
                    <input type="submit" value="Add Task" className="inline-flex items-center justify-center rounded-md text-sm font-medium  h-10 px-4 py-2 w-full bg-red-600 text-white cursor-pointer" />
                </div>
            </form>
        </div>
    </div>
}
export default CreateTask