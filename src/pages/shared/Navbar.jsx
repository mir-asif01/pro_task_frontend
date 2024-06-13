
import { useContext, useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

function Navbar() {
    const [dropDownState, setDropDownState] = useState(false);
    const dropDownMenuRef = useRef();
    const navigate = useNavigate()
    const { logOut, user, setUser } = useContext(AuthContext)

    const handleLogOut = () => {
        logOut()
            .then(res => {
                toast.success("Logout Successful")
                setUser(null)
                navigate("/")
            })
    }


    useEffect(() => {
        const closeDropDown = (e) => {
            if (!dropDownMenuRef?.current?.contains(e?.target)) {
                setDropDownState(false);
            }
        };

        document.addEventListener('mousedown', closeDropDown);

        return () => {
            document.removeEventListener('mousedown', closeDropDown);
        };
    }, []);

    return (
        <nav className="flex items-center justify-between bg-[#393E46] px-4 py-2 text-white">
            <Toaster position='top-center' toastOptions={{ duration: 2500 }} />
            <div className="scale-100 cursor-pointer rounded-2xl px-3 py-2 text-2xl font-semibold text-white transition-all duration-200 hover:scale-110">
                <h2 className='font-semibold'>__ProTask__</h2>
            </div>
            <ul className="hidden items-center justify-between gap-10 md:flex">
                <li className="text-xl group flex  cursor-pointer flex-col">
                    <NavLink to={"/"}>Home</NavLink>
                    <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                </li>
                {
                    user?.email ? <>
                        <li className="text-xl group flex  cursor-pointer flex-col">
                            <NavLink to={"/task-manager"}>Tasks</NavLink>
                            <span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                        </li>
                        <li className="text-xl group flex  cursor-pointer flex-col">
                            <NavLink to={"/add-review"}>Add Review</NavLink>
                            <span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                        </li>
                        <li className="text-xl group flex  cursor-pointer flex-col">
                            <button className="bg-slate-600 px-3 py-2 rounded-lg " onClick={handleLogOut}>Logout</button>
                            <span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                        </li>
                    </> :
                        <>
                            <li className="text-xl group flex  cursor-pointer flex-col">
                                <NavLink to={"/login"}>Login</NavLink>
                                <span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                            </li>
                            <li className="text-xl group flex  cursor-pointer flex-col">
                                <NavLink to={"/register"}>Register</NavLink>
                                <span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                            </li>
                        </>
                }
            </ul>
            <div ref={dropDownMenuRef} onClick={() => setDropDownState(!dropDownState)} className="relative flex transition-transform md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer" > <line x1="4" x2="20" y1="12" y2="12" /> <line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /> </svg>
                {dropDownState && (
                    <ul className="mt-[0.1rem] z-10  gap-2  bg-[#393E46]  absolute right-0 top-11 flex w-[200px] flex-col  rounded-lg   text-base ">

                        <li className="cursor-pointer  px-6 py-2 text-white rounded-t-lg hover:bg-sky-600 ">
                            <NavLink to={"/"}>Home</NavLink>
                        </li>
                        {
                            user?.email ? <>
                                <li className="cursor-pointer  px-6 py-2 text-white hover:bg-sky-600 ">
                                    <NavLink to={"/all-tasks"}>Tasks</NavLink>
                                </li>
                                <li className="cursor-pointer  px-6 py-2 text-white hover:bg-sky-600 ">
                                    <NavLink to={"/add-review"}>Add Review</NavLink>
                                </li>
                                <li className="cursor-pointer  px-6 py-2 text-white hover:bg-sky-600 ">
                                    <button className="bg-slate-600 px-3 py-2 rounded-lg " onClick={handleLogOut}>Logout</button>
                                </li>
                            </> :
                                <>
                                    <li className="cursor-pointer  px-6 py-2 text-white hover:bg-sky-600 ">
                                        <NavLink to={"/login"}>Login</NavLink>
                                    </li>
                                    <li className="cursor-pointer  px-6 py-2 text-white hover:bg-sky-600 ">
                                        <NavLink to={"/register"}>Register</NavLink>
                                    </li>
                                </>
                        }
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar

