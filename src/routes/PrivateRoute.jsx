import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
    const { user } = useContext(AuthContext)

    return <>
        {
            user?.email ? children : <Navigate to={"/login"}></Navigate>
        }

    </>
}

export default PrivateRoute