import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

function AllTasks() {
    const { user } = useContext(AuthContext)
    const [tasks, setTasks] = useState([])
    // const [toDoTasks, setToDoTasks] = useState([])
    const [onGoingTasks, setOnGoingTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])

    // console.log(tasks);
    // console.log(onGoingTasks);
    // console.log(completedTasks);

    useEffect(() => {
        async function fetchTasks() {
            try {
                fetch(`http://localhost:4000/tasks?email=${user?.email}`)
                    .then(res => res.json())
                    .then(res => {
                        setTasks(res)
                        console.log(res)
                    })
            } catch (error) {
                if (error) {
                    console.log(error);
                }
            }
        }
        fetchTasks()
    }, [user?.email])

    useEffect(() => {
        function filterTasks() {
            tasks.map(task => {
                if (task?.status === "on-going") {
                    setOnGoingTasks([...onGoingTasks, task])
                }
                if (task?.status === "completed") {
                    setCompletedTasks([...completedTasks, task])
                }
            })
        }
        filterTasks()
    }, [tasks])

    const handleOnDrag = (e, task) => {
        e.dataTransfer.setData("application/json", JSON.stringify(task))
    }

    const handleOnDrop = (e) => {
        const taskJson = e.dataTransfer.getData("task")
        const task = JSON.parse(taskJson)
        console.log(task);
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }
    const TaskCard = ({ task }) => {
        const { title, description } = task
        return <div
            draggable={true}
            onDragStart={(e) => handleOnDrag("task", task)}
            className="border border-gray-200 px-5 py-4 rounded-md"
        >
            <p className="text-gray-600 text-xl">{title}</p>
            <p className="text-gray-600 ">{description}</p>
        </div>
    }
    return (
        <>
            <section>
                <h1 className="text-3xl">Manage your <span className="text-green-600 my-10">__tasks__</span></h1>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 justify-center items-center overflow-scroll">
                    <div className="border border-slate-900 py-7 rounded-md">
                        <h1 className="text-2xl font-semibold mb-4 text-center underline">To do list</h1>
                        <div className="flex flex-col justify-center items-center gap-4">
                            {tasks.length === 0 ?
                                <p className="text-slate-500 font-bold">Drag and Drop a task!</p>
                                : tasks.map(task => <TaskCard key={task._id} task={task}></TaskCard>)}
                        </div>
                    </div>
                    <div onDrop={handleOnDrop} onDragOver={handleDragOver} className="border border-slate-900 py-7 rounded-md">
                        <h1 className="text-2xl font-semibold mb-4 text-center underline">On Going</h1>
                        <div className="flex flex-col justify-center items-center gap-4">
                            {onGoingTasks.length === 0 ?
                                <p className="text-slate-500 font-bold">Drag and Drop a task!</p>
                                : onGoingTasks.map(task => <TaskCard key={task._id} task={task}></TaskCard>)}
                        </div>
                    </div>
                    <div className="border border-slate-900 py-7 rounded-md">
                        <h1 className="text-2xl font-semibold mb-4 text-center underline">Completed</h1>
                        <div className="flex flex-col justify-center items-center gap-4">
                            {completedTasks.length === 0 ?
                                <p className="text-slate-500 font-bold">Drag and Drop a task!</p>
                                : completedTasks.map(task => <TaskCard key={task._id} task={task}></TaskCard>)}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default AllTasks

