import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import Banner from "./homeComponents/Banner"
import WhyUs from "./homeComponents/WhyUs"

function Home() {

    const { user } = useContext(AuthContext)
    return <>
        <Banner></Banner>
        <WhyUs></WhyUs>
    </>
}
export default Home