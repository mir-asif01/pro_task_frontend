import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

function Profile() {
    const { user } = useContext(AuthContext)
    console.log(user);
    return <>
        <div className="flex justify-center items-center">
            <div className="max-w-[350px] space-y-4 rounded-lg bg-white p-6 shadow-lg md:w-[350px] dark:bg-[#18181B]">
                <img width={200} height={200} className="h-[275px] w-[350px] rounded-lg object-cover" src={user?.photoURL} alt="card navigate ui" />
                <div className="grid gap-2">
                    <h1 className="text-lg font-semibold ">{user?.displayName}</h1>
                    <h1 className="text-lg font-semibold ">{user?.email}</h1>
                    <p className="text-sm text-gray-500 dark:text-white/60">This is the profile of {user?.displayName}.</p>
                </div>
            </div>
        </div>

    </>
}
export default Profile