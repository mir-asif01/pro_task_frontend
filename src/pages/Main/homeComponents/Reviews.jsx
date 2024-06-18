import { useEffect, useState } from "react"

function Reviews() {
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        async function fetchReviews() {
            try {
                await fetch("https://pro-task-backend.onrender.com/reviews")
                    .then(res => res.json())
                    .then(res => setReviews(res))
            } catch (error) {
                console.log(error);
            }
        }
        fetchReviews()
    },
        [reviews])
    return <>
        <div className="my-24">
            <h1 className="text-4xl text-center mb-20">Top Public Reviews___</h1>
            <div className="flex flex-col sm:flex-row px-20 justify-center items-center gap-10">
                {
                    reviews.map(rev => <div className="border border-gray-600 rounded-md p-10" key={rev._id}>
                        <h1 className="font-bold text-2xl text-slate-900 text-center">{rev?.userName}</h1>
                        <h1 className="font-bold text-2xl text-green-500 text-center">{rev?.userEmail}</h1>
                        <p className="text-xl text-gray-600 mt-2 text-justify">{rev?.review}</p>
                    </div>)
                }
            </div>
        </div>


    </>
}

export default Reviews