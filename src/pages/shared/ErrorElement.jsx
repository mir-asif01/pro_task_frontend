import { NavLink } from "react-router-dom";

function ErrorElement() {
    return <div className="my-56 flex justify-center items-center">
        <h1 className="text-5xl">404 not found go to <NavLink className="text-red-500 underline font-semibold text-xl" to="/">Home</NavLink></h1>
    </div>
}
export default ErrorElement