
import React from 'react'
import { Clock } from 'lucide-react'
import { FileQuestion } from 'lucide-react'
import { GraduationCap } from 'lucide-react'


const MathHero = () => {
    return (
        <div>
            <section className="h-80 bg-[#16789E] grid grid-cols-4 mb-[200px]">
                <div className=" col-span-3">
                    <div className="ml-[80px] pt-4 flex items-center gap-4">
                        <button className="bg-[#4FDCCE] px-4 py-2 text-white font-suwannaphum text-2xl rounded-xl">គណិតវិទ្យា</button>
                        <p className="text-2xl text-white font-suwannaphum text-center">បង្រៀនដៅយ Moli Ka</p>
                    </div>
                    <h1 className="text-white font-suwannaphum text-5xl pl-[80px] pt-5 font-bold">ការរៀន HTML ដែលពេញនិយមនៅឆ្នាំ2025សម្រាប់កម្រិតដំបូង</h1>
                    <div className="flex ml-[150px] gap-4 mt-[70px]">
                        <p className="flex gap-2 text-white font-suwannaphum text-2xl items-center"><Clock /> ២ សប្តាហ័</p>
                        <p className="flex gap-2 text-white font-suwannaphum text-2xl items-center"><GraduationCap /> 2weeks</p>
                        <p className="flex gap-2 text-white font-suwannaphum text-2xl items-center"><Clock /> 2weeks</p>
                        <p className="flex gap-2 text-white font-suwannaphum text-2xl items-center"><Clock /> 2weeks</p>
                        <p className="flex gap-2 text-white font-suwannaphum text-2xl items-center"><FileQuestion /> តេស្ត</p>
                    </div>
                </div>
                <div className="flex justify-center items-end">

                    <button className=" absolute z-1 bg-[#4FDCCE] rounded-3xl px-4 py-2 text-white font-suwannaphum items-center mb-[30px] hover:scale-150 duration-100">
                        ចាប់ផ្តើមរៀន
                    </button>
                </div>
            </section>
        </div>
    )
}

export default MathHero