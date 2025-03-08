import PhysicsCard from "./PhysicCard"
import PhysicsHero from "./PhysicsHero"
import Coursenav from "../math/Coursenav";




const Physics = () => {
    return (
        <div>
            {/* <PhysicsHero /> */}
            <div className="flex justify-center">
                <Coursenav />
            </div>
            <PhysicsCard />
        </div>
    )
}

export default Physics