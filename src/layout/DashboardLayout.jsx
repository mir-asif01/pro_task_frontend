import { Outlet } from "react-router-dom"

function DashboardLoyout() {
    return <>
        <h1>Sidebar</h1>
        <Outlet></Outlet>
    </>
}
export default DashboardLoyout