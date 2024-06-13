import { NavLink } from "react-router-dom";

function ErrorElement() {
    return <>
        <h1>404 not found go to <NavLink className="text-red-500 font-semibold text-xl" to="/">Home</NavLink></h1>
    </>
}
export default ErrorElement