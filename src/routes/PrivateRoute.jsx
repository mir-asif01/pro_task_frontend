import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function PrivateRoute({ children }) {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    return <>
        {
            user?.email ? children : navigate("/login")
        }

    </>
}

export default PrivateRoute