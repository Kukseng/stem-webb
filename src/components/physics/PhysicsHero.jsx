import { Clock } from "lucide-react"

const PhysicsHero = () => {
    return (
        <div>
            <section className="h-80 bg-[#16789E] grid grid-cols-4 mb-[200px]">
                <div className=" col-span-3">
                    <div className="ml-[80px] pt-4 flex items-center gap-4">
                        <button className="bg-[#4FDCCE] px-4 py-2 text-white font-suwannaphum text-2xl rounded-xl">Programming</button>
                        <p className="text-2xl text-white font-suwannaphum text-center">បង្រៀនដៅយ Moli Ka</p>
                    </div>
                    <h1 className="text-white font-suwannaphum text-5xl pl-[80px] pt-5 font-bold">ការរៀន HTML ដែលពេញនិយមនៅឆ្នាំ2025សម្រាប់កម្រិតដំបូង</h1>
                    <div className="flex ml-[150px] gap-4 mt-[70px]">
                        <p className="flex gap-2 text-white font-suwannaphum text-2xl items-center"><Clock /> 2weeks</p>
                        <p className="flex gap-2 text-white font-suwannaphum text-2xl items-center"><Clock /> 2weeks</p>
                        <p className="flex gap-2 text-white font-suwannaphum text-2xl items-center"><Clock /> 2weeks</p>
                        <p className="flex gap-2 text-white font-suwannaphum text-2xl items-center"><Clock /> 2weeks</p>
                        <p className="flex gap-2 text-white font-suwannaphum text-2xl items-center"><Clock /> 2weeks</p>
                    </div>
                </div>
                <div className="flex justify-center items-end">
                    <img src="https://m.media-amazon.com/images/M/MV5BMTk1MDc4MjY0MV5BMl5BanBnXkFtZTcwNjExNzMzNw@@._V1_FMjpg_UX1000_.jpg" alt="" className=" w-[400px] h-[500px] rounded-[30px] " />
                    <button className=" absolute z-1 bg-[#4FDCCE] rounded-3xl px-4 py-2 text-white font-suwannaphum items-center mb-[30px] hover:scale-150 duration-100">
                        ចាប់ផ្តើមរៀន
                    </button>
                </div>
            </section>
        </div>
    )
}
export default PhysicsHero