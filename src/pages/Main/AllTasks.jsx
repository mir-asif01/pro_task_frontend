import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";

function AllTasks() {
    const { user } = useContext(AuthContext)
    const [tasks, setTasks] = useState([])
    const [toDoTasks, setToDoTasks] = useState([])
    const [onGoingTasks, setOnGoingTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])

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
        setToDoTasks([...toDoTasks, task])
        setOnGoingTasks(onGoingTasks.filter(t => t._id !== taskId))
        setCompletedTasks(completedTasks.filter(t => t._id !== taskId))
        // console.log("To Do", task);
    }
    const handlDropOnOnGoing = async (e) => {
        const taskId = e.dataTransfer.getData("taskId")
        const task = tasks.find(t => t._id === taskId)
        setOnGoingTasks([...onGoingTasks, task])
        setToDoTasks(toDoTasks.filter(t => t._id !== taskId))
        setCompletedTasks(completedTasks.filter(t => t._id !== taskId))
        // console.log("On going", task);
    }

    const handlDropOnCompleted = async (e) => {
        const taskId = e.dataTransfer.getData("taskId")
        const task = tasks.find(t => t._id === taskId)
        setCompletedTasks([...completedTasks, task])
        setToDoTasks(toDoTasks.filter(t => t._id !== taskId))
        setOnGoingTasks(onGoingTasks.filter(t => t._id !== taskId))
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
            <p className="text-xs">{status}</p>
        </div>
    }
    return (
        <>
            <section>
                <h1 className="text-3xl">Manage your <span className="text-green-600 my-10">__tasks__</span></h1>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 justify-center items-center overflow-scroll">
                    <div onDrop={handleDropOnTodo} onDragOver={handleDragOver} className="border border-slate-900 py-7 rounded-md">
                        <h1 className="text-2xl font-semibold mb-4 text-center underline">To do list</h1>
                        <div className="flex flex-col justify-center items-center gap-4">
                            {toDoTasks.length === 0 ?
                                <p className="text-slate-500 font-bold">Drag and Drop a task!</p>
                                : toDoTasks.map(task => <TaskCard key={task._id} task={task}></TaskCard>)}
                        </div>
                    </div>
                    <div onDrop={handlDropOnOnGoing} onDragOver={handleDragOver} className="border border-slate-900 py-7 rounded-md">
                        <h1 className="text-2xl font-semibold mb-4 text-center underline">On Going</h1>
                        <div className="flex flex-col justify-center items-center gap-4">
                            {onGoingTasks.length === 0 ?
                                <p className="text-slate-500 font-bold">Drag and Drop a task!</p>
                                : onGoingTasks.map(task => <TaskCard key={task._id} task={task}></TaskCard>)}
                        </div>
                    </div>
                    <div onDrop={handlDropOnCompleted} onDragOver={handleDragOver} className="border border-slate-900 py-7 rounded-md">
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

