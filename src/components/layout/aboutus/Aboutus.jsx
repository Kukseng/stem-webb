import React from 'react'
// import cherimg from "../../../assets/images/"
import { ArrowRight } from 'lucide-react'
import img from '../../../assets/images/logo/cher.png'
import img1 from '../../../assets/images/logo/ISTAD.png'
import react from '../../../assets/React.png'
import java from '../../../assets/Java.png'
import JS from '../../../assets/JS.png'
import phyton from '../../../assets/Phyton.png'
import Mongo from '../../../assets/Mongo.png'
import PostSql from '../../../assets/PostSql.png'
import Tailwind from '../../../assets/Tailwind.png'
import Reactjs from '../../../assets/React.png';
import { Facebook } from 'lucide-react'
import { Linkedin } from 'lucide-react'
import js from '@eslint/js'


const Aboutus = () => {
    return (
        // HeroSection
        <div>
            <div className='mx-[80px] my-[60px]'>
                <div className='HeroSection grid grid-cols-2'>
                    <div>
                        <h1 className='text-[#49BBBD] font-suwannaphum text-5xl font-bold'>iSTEM</h1>
                        <h2 className=' text-[#555555] text-5xl my-[40px] font-bold'>ផ្តល់ឱកាសល្អបំផុតដល់សិស្ស</h2>
                        <p className=' font-suwannaphum text-3xl text-[#384D6C] leading-12'>សិស្សបន្ទាប់ពីបញ្ចប់ថ្នាក់មធ្យមសិក្សាទុតិយភូមិឬមិនទាន់បញ្ចប់ក៍អាចសិក្សានៅលើវេសាយពួកយើងបានដែរពួកយើងអាចផ្តល់អោយនូវចំណេះដឹងថ្មីៗផ្លែកៗទាន់សម័យ។យើងប្តេជ្ញាផ្តល់ជូននូវបទពិសោធន៍
                            អប់រំផ្លាស់ប្តូរដែលផ្តល់អំណាចដល់បុគ្គលម្នាក់ៗឱ្យឈានដល់សក្តានពលពេញលេញរបស់ពួកគេ។ មិនថាអ្នកជាសិស្សអ្នកសិក្សាពេញមួយជីវិត
                            ឬជាអ្នកជំនាញដែលស្វែងរកជំនាញថ្មីនោះទេ យើងផ្តល់ធនធាន និងការគាំទ្រដើម្បីជួយអ្នកឱ្យទទួលបានជោគជ័យ។
                            យើងផ្តល់ជូននូវកម្មវិធីអប់រំជាច្រើនដែលត្រូវបានរចនាឡើងដើម្បីបំពេញតម្រូវការសិក្សាចម្រុះវគ្គសិក្សារបស់យើងគ្របដណ្តប់លើមុខវិជ្ជាផ្សេងៗគ្នា
                        </p>
                        <button type="button" class="text-white font-suwannaphum items-center px-[30px] py-3 my-[20px] flex cursor-pointer bg-[#1C96C5] hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-2xl text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            ចាប់ផ្តើមរៀន <ArrowRight />
                        </button>
                    </div>
                    <div className=''>
                        <div className=' absolute p-[100px]'>
                            <img src={img} alt="" className='w-[450px] rotate-[350deg]' />
                        </div>
                        <div className=' flex justify-end'>
                            <img src={img} alt="" className='w-[450px] justify-end ' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-[100px] bg-[#1C96C5]'>
            </div>
            <div>
                <h3 className='text-[#1C96C5] pt-[100px] text-5xl font-bold text-center '>ណែនាំដោយ</h3>
            </div>
            {/* TeacherCard */}
            <div className='mx-[80px] flex justify-center py-[100px] gap-12'>



                <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <a href="#" className=' flex justify-center'>
                        <img class="rounded-full w-[300px] h-[300px]" src={img} alt="" />
                    </a>
                    <div class="p-5">
                        <a href="#">
                            <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Teahcer Name</h5>
                        </a>
                        <p className='text-center text-cyan-700 font-suwannaphum'>Mentor</p>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        <div className='Icon flex gap-2 justify-center'>
                            <div className=' hover:text-gray-400 dark:text-white'>
                                <Facebook />
                            </div>
                            <div className=' hover:text-gray-400 dark:text-white'>
                                <Linkedin />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <a href="#" className=' flex justify-center'>
                        <img class="rounded-full w-[300px] h-[300px]" src={img} alt="" />
                    </a>
                    <div class="p-5">
                        <a href="#">
                            <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Teahcer Name</h5>
                        </a>
                        <p className='text-center text-cyan-700 font-suwannaphum'>Mentor</p>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        <div className='Icon flex gap-2 justify-center'>
                            <div className=' hover:text-gray-400 dark:text-white'>
                                <Facebook />
                            </div>
                            <div className=' hover:text-gray-400 dark:text-white'>
                                <Linkedin />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div>
                <p className='text-[#1C96C5] text-5xl font-bold text-center'>សមាជិកក្រុម</p>
            </div>
            {/* TeamCard */}
            <div className='mx-[300px] grid grid-cols-3 grid-rows-2 items-center pt-[100px] gap-20 '>


                <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <a href="#" className=' flex justify-center'>
                        <img class="rounded-full w-[300px] h-[300px]" src={img1} alt="" />
                    </a>
                    <div class="p-5">
                        <a href="#">
                            <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Team Name</h5>
                        </a>
                        <p className='text-center text-cyan-700 font-suwannaphum'>Mentor</p>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        <div className='Icon flex gap-2 justify-center'>
                            <div className=' hover:text-gray-400 dark:text-white'>
                                <Facebook />
                            </div>
                            <div className=' hover:text-gray-400 dark:text-white'>
                                <Linkedin />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <a href="#" className=' flex justify-center'>
                        <img class="rounded-full w-[300px] h-[300px]" src={img1} alt="" />
                    </a>
                    <div class="p-5">
                        <a href="#">
                            <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Team Name</h5>
                        </a>
                        <p className='text-center text-cyan-700 font-suwannaphum'>Mentor</p>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        <div className='Icon flex gap-2 justify-center'>
                            <div className=' hover:text-gray-400 dark:text-white'>
                                <Facebook />
                            </div>
                            <div className=' hover:text-gray-400 dark:text-white'>
                                <Linkedin />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <a href="#" className=' flex justify-center'>
                        <img class="rounded-full w-[300px] h-[300px]" src={img1} alt="" />
                    </a>
                    <div class="p-5">
                        <a href="#">
                            <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Team Name</h5>
                        </a>
                        <p className='text-center text-cyan-700 font-suwannaphum'>Mentor</p>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        <div className='Icon flex gap-2 justify-center'>
                            <div className=' hover:text-gray-400 dark:text-white'>
                                <Facebook />
                            </div>
                            <div className=' hover:text-gray-400 dark:text-white'>
                                <Linkedin />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <a href="#" className=' flex justify-center'>
                        <img class="rounded-full w-[300px] h-[300px]" src={img1} alt="" />
                    </a>
                    <div class="p-5">
                        <a href="#">
                            <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Team Name</h5>
                        </a>
                        <p className='text-center text-cyan-700 font-suwannaphum'>Mentor</p>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        <div className='Icon flex gap-2 justify-center'>
                            <div className=' hover:text-gray-400 dark:text-white'>
                                <Facebook />
                            </div>
                            <div className=' hover:text-gray-400 dark:text-white'>
                                <Linkedin />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <a href="#" className=' flex justify-center'>
                        <img class="rounded-full w-[300px] h-[300px]" src={img1} alt="" />
                    </a>
                    <div class="p-5">
                        <a href="#">
                            <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Team Name</h5>
                        </a>
                        <p className='text-center text-cyan-700 font-suwannaphum'>Mentor</p>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        <div className='Icon flex gap-2 justify-center'>
                            <div className=' hover:text-gray-400 dark:text-white'>
                                <Facebook />
                            </div>
                            <div className=' hover:text-gray-400 dark:text-white'>
                                <Linkedin />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <a href="#" className=' flex justify-center'>
                        <img class="rounded-full w-[300px] h-[300px]" src={img1} alt="" />
                    </a>
                    <div class="p-5">
                        <a href="#">
                            <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Team Name</h5>
                        </a>
                        <p className='text-center text-cyan-700 font-suwannaphum'>Mentor</p>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        <div className='Icon flex gap-2 justify-center'>
                            <div className=' hover:text-gray-400 dark:text-white'>
                                <Facebook />
                            </div>
                            <div className=' hover:text-gray-400 dark:text-white'>
                                <Linkedin />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=' flex justify-center pt-[100px]'>
                <div className='h-[8px] w-[100px] bg-gradient-to-r from-[#57007B] to-[#F76680]'>            </div>
            </div>
            <h3 className='text-center text-5xl pt-10 font-suwannaphum font-bold'>Our</h3>
            <h3 className='text-center text-5xl pt-10 font-suwannaphum font-bold'>Teahc Stack</h3>
            <div className=' flex justify-center gap-2'>
                <a href="" className=' flex justify-center gap-20 pt-[100px]'>
                    <p class="text-3xl font-bold text-black hover:bg-gradient-to-r hover:from-[#57007B] hover:to-[#F76680] hover:bg-clip-text hover:text-transparent transition-all duration-400">
                        Frontend
                    </p>
                    <p class="text-3xl font-bold text-black hover:bg-gradient-to-r hover:from-[#57007B] hover:to-[#F76680] hover:bg-clip-text hover:text-transparent transition-all duration-400">
                        Backend
                    </p>
                    <p class="text-3xl font-bold text-black hover:bg-gradient-to-r hover:from-[#57007B] hover:to-[#F76680] hover:bg-clip-text hover:text-transparent transition-all duration-400">
                        Database
                    </p>
                    <p class="text-3xl font-bold text-black hover:bg-gradient-to-r hover:from-[#57007B] hover:to-[#F76680] hover:bg-clip-text hover:text-transparent transition-all duration-400">
                        CMS
                    </p>
                    <p class="text-3xl font-bold text-black hover:bg-gradient-to-r hover:from-[#57007B] hover:to-[#F76680] hover:bg-clip-text hover:text-transparent transition-all duration-400">
                        CloudTesting
                    </p>
                    <p class="text-3xl font-bold text-black hover:bg-gradient-to-r hover:from-[#57007B] hover:to-[#F76680] hover:bg-clip-text hover:text-transparent transition-all duration-400">
                        DevOps
                    </p>
                </a>
            </div>
            <div className='flex justify-center gap-[200px] pt-[100px]'>
                <img src={Reactjs} alt="" className='w-[200px] h-[100px]' />
                <img src={JS} alt="" className='w-[100px] h-[100px]' />
                <img src={Tailwind} alt="" className='w-[200px] h-[120px]' />
                <img src={java} alt="" className='w-[100px] h-[100px]' />
            </div>
            <div className='flex justify-center gap-[200px] pt-[40px]'>
                <img src={phyton} alt="" className='w-[200px] h-[100px]' />
                <img src={PostSql} alt="" className='w-[200px] h-[100px]' />
                <img src={Mongo} alt="" className='w-[250px] h-[100px]' />
            </div>
            <h3 className='text-center text-4xl pt-[100px] font-bold text-[#384D6C] font-suwannaphum'>FAQ</h3>
            <p className='text-center text-1xl pt-[40px] text-[#384D6C] font-suwannaphum'>5 សំណួរដែលគេសួរញឹកញាប់អំពី iSTEM Education</p>
            <div className='flex justify-center flex-wrap'>
                <div className='w-[40%]'>
                    <div className=' border-l-2 border-black  pl-5 mt-6'>
                        <p className='text-1xl py-[40px] text-[#384D6C] font-bold font-suwannaphum'>តើ iSTEM Education ជាអ្វី?</p>
                        <p className='text-1xl text-[#384D6C] font-suwannaphum leading-8 '> iSTEM Education រួមបញ្ចូលវិទ្យាសាស្ត្រ បច្ចេកវិទ្យា វិស្វកម្ម និងគណិតវិទ្យា (STEM) ដោយផ្តោតលើការច្នៃប្រឌិត និងភាពជាសហគ្រិន។ វាសង្កត់ធ្ងន់ទៅលើការដោះស្រាយបញ្ហា ការគិតបែបរិះគន់ និងការរៀនដោយដៃ ដើម្បីរៀបចំសិស្សសម្រាប់អាជីពក្នុងវិស័យដែលកំពុងរីកចម្រើន។
                            ជាស្នូលរបស់វា ការអប់រំ iSTEM លើកកម្ពស់កម្មវិធីសិក្សាដែលអនុវត្តដោយដៃ និងផ្អែកលើគម្រោង ដោយលើកទឹកចិត្តសិស្សឱ្យចូលរួមជាមួយសម្ភារៈក្នុងវិធីដែលបង្កើតទាំងជំនាញជាក់ស្តែង និងទ្រឹស្តី។ តាមរយៈការបញ្ចូលទិដ្ឋភាពនៃការច្នៃប្រឌិត វាលើកទឹកចិត្តសិស្សមិនត្រឹមតែរៀនចំណេះដឹងដែលមានស្រាប់ប៉ុណ្ណោះទេ ប៉ុន្តែថែមទាំងអភិវឌ្ឍបច្ចេកវិទ្យាថ្មីៗ ដំណើរការ និងដំណោះស្រាយដើម្បីដោះស្រាយបញ្ហាប្រឈមក្នុងសង្គមផងដែរ។</p>
                    </div>
                    <div className='border-l-2 border-black  pl-5 mt-4'>
                        <p className='text-1xl  text-[#384D6C] font-bold font-suwannaphum'>តើ iSTEM ខុសពីការអប់រំបែបប្រពៃណីយ៉ាងដូចម្តេច?</p>
                    </div>
                    <div className='border-l-2 border-black  pl-5 mt-4'>
                        <p className='text-1xl  text-[#384D6C] font-bold font-suwannaphum'>តើ iSTEM Education មានអត្ថប្រយោជន៍អ្វីខ្លះ?</p>
                    </div>
                    <div className='border-l-2 border-black  pl-5 mt-4'>
                        <p className='text-1xl  text-[#384D6C] font-bold font-suwannaphum'> តើ iSTEM Education សាកសមនឹងក្រុមអាយុប៉ុន្មាន?</p>
                    </div>
                    <div className='border-l-2 border-black  pl-5 mt-4'>
                        <p className='text-1xl  text-[#384D6C] font-bold font-suwannaphum'>តើ សាលារៀនអាចបញ្ចូល iSTEM Education ទៅក្នុងកម្មវិធីសិក្សារបស់ពួកគេដោយរបៀបណា?</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Aboutus