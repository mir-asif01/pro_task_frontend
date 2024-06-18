import { useContext } from "react"
import { useForm } from "react-hook-form"
import toast, { Toaster } from "react-hot-toast"
import { AuthContext } from "../../context/AuthContext"

function AddReview() {

    const { user } = useContext(AuthContext)
    const { register, handleSubmit, reset } = useForm()
    const onSubmit = async (data) => {
        const review = data
        await fetch("https://pro-task-backend.onrender.com/add-review", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(review)
        }).then(res => res.json())
            .then(res => {
                toast.success("Your review is collected, Thanks!!")
                reset({ userEmail: "", userName: "", review: "" })
            })
    }

    return <>
        <div className="max-w-[800px] mx-auto my-10 sm:my-24 p-6 bg-white shadow-md sm:px-8 sm:py-10 lg:px-12 lg:py-16">
            <Toaster position="top-center" toastOptions={{ duration: 2500 }}></Toaster>
            <div className="flex flex-col-reverse sm:flex-row justify-between space-x-0 sm:space-x-12">
                <div className="w-full sm:w-1/2 mb-8 sm:mb-0">
                    {/* Left side form */}
                    <h2 className="text-4xl text-center font-bold mb-6">Add Review___</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col space-y-4 mb-4">
                            <input
                                defaultValue={user?.email ?? ""}
                                readOnly
                                {...register("userEmail")}
                                className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none"
                                placeholder="Your Email" type="email" />
                            <input
                                {...register("userName")}
                                className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none"
                                placeholder="Your Name" type="text" />
                            <input
                                {...register("review")}
                                className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none"
                                placeholder="Your Review comment" type="text" />
                        </div>
                        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium  h-10 px-4 py-2 w-full bg-red-600 text-white">
                            Submit Review
                        </button>
                    </form>
                </div>
                {/* Right side content */}
                <div className="w-full flex justify-center items-center mb-24 sm:my-0 sm:w-1/2">
                    <h1 className="text-4xl">Help us <span className="text-green-700 font-semibold">improve</span> our service__</h1>
                </div>
            </div>
        </div>

    </>
}
export default AddReview