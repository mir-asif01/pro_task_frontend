import { Outlet } from "react-router-dom";
import Navbar from "../pages/shared/Navbar";
import Footer from "../pages/shared/Footer";

function MainLayout() {
    return <>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </>
}

export default MainLayout