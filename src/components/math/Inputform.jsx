import { popover } from '@material-tailwind/react';
import React, { useState } from 'react';

const Inputform = () => {
    const [isChecked, setIsChecked] = useState(false);

    // Handle checkbox state change
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className='flex justify-center space-x-4 my-6 '>
            <form className='w-[50%] grid gap-4'>
                <h4 className='text-2xl font-suwannaphum font-bold'>
                    ផ្តល់មតិ
                </h4>
                <p className='text-2xl'>
                    អាស័យដា្ឋនអុីមែលរបស់អ្នកមិនត្រូវបានផ្សប់ផ្សាយទេ។
                </p>

                <div className='grid grid-cols-2 gap-4 max-sm:grid-cols-1 '>
                    <input
                        type="text"
                        placeholder='ឈ្មោះ*'
                        className='focus:border-cyan-500 rounded-md'
                    />
                    <input
                        type="text"
                        placeholder='អ៊ីមែល*'
                        className='focus:border-cyan-500 rounded-md'
                    />
                </div>

                <div>
                    <textarea name="" id="" placeholder='បញ្ចេញមតិ' className='w-full min-h-[130px] max-h-[130px]'>
                        បញ្ចេញមតិ
                    </textarea>
                </div>

                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            className='font-suwannaphum mr-4'

                        />

                        រក្សា​ទុក​ឈ្មោះ អ៊ីមែល​របស់​ខ្ញុំ​នៅ​ក្នុង​កម្មវិធី​រុករក​នេះ​សម្រាប់​ពេល​បន្ទាប់នៅពេល​ដែល​ខ្ញុំ​ផ្ដល់​មតិ
                    </label>
                </div>

                <div>
                    {isChecked ? (
                        <p>You have agreed to the terms and conditions.</p>
                    ) : (
                        <p>You have not agreed to the terms and conditions.</p>
                    )}
                </div>
                <div>
                    <button className=" rounded-full border-2 text-white bg-cyan-600 px-6 py-3 font-semibold uppercase transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-10px] hover:shadow-[4px_4px_20px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
                        បង្ហោះ
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Inputform;
