import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

function Profile() {
    const { user } = useContext(AuthContext)
    return <>
        <h1 className="text-5xl">{user?.displayName}</h1>
        <img src={user?.profileImg} alt="" />
    </>
}
export default Profile