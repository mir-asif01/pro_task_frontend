import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import Row from "./taskHomeComponents/Row"
import { NavLink } from "react-router-dom"

function TaskManagerHome() {

    const { user } = useContext(AuthContext)
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        async function fetchTasks() {
            try {
                await fetch(`http://localhost:4000/tasks?email=${user?.email}`)
                    .then(res => res.json())
                    .then(res => {
                        setTasks(res)
                    })
            } catch (error) {
                if (error) {
                    console.log(error);
                }
            }
        }
        fetchTasks()
    }, [tasks, user?.email])

    return <>
        <div className="">
            <h1 className="text-green-600 mb-10 text-4xl font-bold">___All Tasks___</h1>
            <table className="min-w-full border border-gray-200 bg-white shadow-lg">
                {/* Table Header */}
                <thead>
                    <tr className="h-[70px] border-b bg-[#141B29] text-[#FFFFFF]">
                        <th className="px-6 py-4 text-start">Creator</th>
                        <th className="px-6 py-4 text-start">Title</th>
                        <th className="px-6 py-4 text-start">Priority</th>
                        <th className="px-6 py-4 text-start">Status</th>
                        <th className="px-6 py-4 text-start">Deadline</th>
                        <th className="px-6 py-4 text-start"></th>
                        <th className="px-6 py-4 text-start"></th>
                    </tr>
                </thead>
                <tbody>
                    {/* Table rows */}
                    {
                        tasks.length <= 0 ?
                            <div className="p-5 flex flex-col justify-center items-center">
                                <h1 className="text-red-500 text-xl">No task was created...<NavLink className="bg-slate-800 text-white px-3 py-2 rounded-md ml-3" to={"create-task"}>Create Here</NavLink></h1>

                            </div> :
                            tasks.map(task => <Row key={task._id} task={task} setTasks={setTasks} tasks={tasks}></Row>)
                    }
                </tbody>
            </table>
        </div>

    </>
}
export default TaskManagerHome