import MathHero from "../math/MathHero"
import Coursenav from "./Coursenav"
import Mathcard from "./Mathcard"



const Math = () => {
    return (
        <div>
            <MathHero />
            <div className="flex justify-center">
                <Coursenav />
            </div>
            <div className="flex text-center justify-center ">
                <Mathcard />
            </div>
        </div>
    )
}

export default Math