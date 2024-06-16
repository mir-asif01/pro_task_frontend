import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
function AllTasks() {
    const { user } = useContext(AuthContext)
    const [tasks, setTasks] = useState([])
    const [toDoTasks, setToDoTasks] = useState([])
    const [onGoingTasks, setOnGoingTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])

    useEffect(() => {
        async function fetchTasks() {
            try {
                await fetch(`http://localhost:4000/tasks?email=${user?.email}`)
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
            setToDoTasks(tasks.filter(t => t.status === "to-do"))
            setOnGoingTasks(tasks.filter(t => t.status === "on-going"))
            setCompletedTasks(tasks.filter(t => t.status === "completed"))
        }
        filterTasks()
    }, [tasks])


    //to-do,on-going,completed

    const handleOnDrag = (e, taskId) => {
        e.dataTransfer.setData("taskId", taskId)
    }

    const handleDropOnTodo = async (e) => {
        const taskId = e.dataTransfer.getData("taskId")
        const task = tasks.find(t => t._id === taskId)
        const isAdded = toDoTasks.find(t => t._id === task._id)
        if (isAdded) {
            toast.error("Task already exist...");
            return
        }
        task.status = "to-do"
        setToDoTasks([...toDoTasks, task])
        setOnGoingTasks(onGoingTasks.filter(t => t._id !== taskId))
        setCompletedTasks(completedTasks.filter(t => t._id !== taskId))
        toast.success("Task moved to to-do list...")
        // console.log("To Do", task);
    }
    const handlDropOnOnGoing = async (e) => {
        const taskId = e.dataTransfer.getData("taskId")
        const task = tasks.find(t => t._id === taskId)
        const isAdded = onGoingTasks.find(t => t._id === task._id)
        if (isAdded) {
            toast.error("Task already exist...");
            return
        }
        task.status = "on-going"
        setOnGoingTasks([...onGoingTasks, task])
        setToDoTasks(toDoTasks.filter(t => t._id !== taskId))
        setCompletedTasks(completedTasks.filter(t => t._id !== taskId))
        toast.success("Task moved to on-going list...")
        // console.log("On going", task);
    }

    const handlDropOnCompleted = async (e) => {
        const taskId = e.dataTransfer.getData("taskId")
        const task = tasks.find(t => t._id === taskId)
        const isAdded = completedTasks.find(t => t._id === task._id)
        if (isAdded) {
            toast.error("Task already exist...");
            return
        }
        task.status = "completed"
        setCompletedTasks([...completedTasks, task])
        setToDoTasks(toDoTasks.filter(t => t._id !== taskId))
        setOnGoingTasks(onGoingTasks.filter(t => t._id !== taskId))
        toast.success("Task moved to completed list...")
        // console.log("Completed", task);
    }


    const handleDragOver = (e) => {
        e.preventDefault()
    }
    const TaskCard = ({ task }) => {
        const { title, description, status } = task
        return <div
            draggable={true}
            onDragStart={(e) => handleOnDrag(e, task._id)}
            className="border border-gray-200 px-5 py-4 rounded-md"
        >
            <p className="text-gray-600 text-xl">{title}</p>
            <p className="text-gray-600 ">{description}</p>
            <span className={status === "to-do" ? "bg-pink-400 text-xs text-white px-2 py-1 rounded-sm" : status === "on-going" ? "bg-yellow-500 text-xs text-white px-2 py-1 rounded-sm" : status === "completed" ? "bg-green-600 text-xs text-white px-2 py-1 rounded-sm" : ""}>{status}</span>
        </div>
    }
    return (
        <>
            <section>
                <Toaster position="top-center" toastOptions={{ duration: 2500 }}></Toaster>
                <h1 className="text-3xl">Manage your <span className="text-green-600 my-10">__tasks__</span></h1>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 justify-center items-center overflow-scroll">
                    <div onDrop={handleDropOnTodo} onDragOver={handleDragOver} className="border border-slate-900 py-7 rounded-md">
                        <h1 className="text-2xl font-semibold mb-4 text-center underline">To do list</h1>
                        <div className="flex flex-col justify-center items-center gap-4">
                            {toDoTasks.length === 0 ?
                                <>
                                    <h1 className="text-slate-600 font-semibold text-xl">No Tasks found!</h1>
                                    <span className="font-bold text-green-600">Please create new task!!</span>

                                    <p className="text-slate-500 font-bold">Drag and Drop a task!</p>
                                </>
                                : toDoTasks.map(task => <TaskCard key={task._id} task={task}></TaskCard>)}
                        </div>
                    </div>
                    <div onDrop={handlDropOnOnGoing} onDragOver={handleDragOver} className="border border-slate-900 py-7 rounded-md">
                        <h1 className="text-2xl font-semibold mb-4 text-center underline">On Going</h1>
                        <div className="flex flex-col justify-center items-center gap-4">
                            {onGoingTasks.length === 0 ?
                                <>
                                    <h1 className="text-slate-600 font-semibold text-xl">No Tasks found!
                                    </h1>
                                    <span className="font-bold text-green-600">Please create new task!!</span>
                                    <p className="text-slate-500 font-bold">Drag and Drop a task!</p>
                                </>
                                : onGoingTasks.map(task => <TaskCard key={task._id} task={task}></TaskCard>)}
                        </div>
                    </div>
                    <div onDrop={handlDropOnCompleted} onDragOver={handleDragOver} className="border border-slate-900 py-7 rounded-md">
                        <h1 className="text-2xl font-semibold mb-4 text-center underline">Completed</h1>
                        <div className="flex flex-col justify-center items-center gap-4">
                            {completedTasks.length === 0 ?
                                <>
                                    <h1 className="text-slate-600 font-semibold text-xl">No Tasks found!</h1>
                                    <span className="font-bold text-green-600">Please create new task!!</span>

                                    <p className="text-slate-500 font-bold">Drag and Drop a task!</p>
                                </>
                                : completedTasks.map(task => <TaskCard key={task._id} task={task}></TaskCard>)}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default AllTasks

