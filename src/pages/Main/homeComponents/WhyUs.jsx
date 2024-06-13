import bannerImg from "../../../assets/bannerImg.webp"
function WhyUs() {
    return <>
        <div className="w-full sm:w-2/3 mx-auto mb-20">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-10">
                <div>
                    <h1 className="text-xl font-semibold mb-3">WHY, __ProTask__</h1>
                    <p className="font-semibold text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ipsa asperiores tempora ab accusantium nobis non corrupti! Dolorum saepe accusantium vel distinctio unde, corrupti beatae. Velit veritatis, suscipit molestiae reprehenderit vero dolorem! Animi enim deserunt delectus quia culpa. Adipisci, ipsum.</p>
                    <button className="inline-flex mt-3 h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50" href="#">
                        Explore Now
                    </button>
                </div>
                <div>
                    <img src={bannerImg} className="" alt="" />
                </div>
            </div>
            <div className="mt-20">
                <section className="flex justify-center items-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-center items-center">
                        <div className="border border-gray-200 p-3 md:p-16 rounded-md hover:shadow-md">
                            <h1 className="text-3xl text-center p-5 border border-gray-600 ">{100}+ </h1>
                            <p className="text-slate-700 text-center my-2 font-bold">Active Users using__</p>
                        </div>
                        <div className="border border-gray-200 p-3 md:p-16 rounded-md hover:shadow-md">
                            <h1 className="text-3xl text-center p-5 border border-gray-600 ">{20}+ </h1>
                            <p className="text-slate-700 text-center my-2 font-bold">Companies Using__</p>
                        </div>
                        <div className="border border-gray-200 p-3 md:p-16 rounded-md hover:shadow-md">
                            <h1 className="text-3xl text-center p-5 border border-gray-600 ">{60}+ </h1>
                            <p className="text-slate-700 text-center my-2 font-bold">Projects Cmpleted__</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </>
}

export default WhyUs