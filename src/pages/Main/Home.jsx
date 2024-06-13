import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

function Home() {

    const { user } = useContext(AuthContext)
    return <>
        <h1>Homepage</h1>
        <h1>Welcome {user?.displayName}</h1>
    </>
}
export default Home