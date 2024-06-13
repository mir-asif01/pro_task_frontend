import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import Banner from "./homeComponents/Banner"
import WhyUs from "./homeComponents/WhyUs"
import Reviews from "./homeComponents/Reviews"

function Home() {
    return <>
        <Banner></Banner>
        <WhyUs></WhyUs>
        <Reviews></Reviews>
    </>
}
export default Home