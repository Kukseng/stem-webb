import React from 'react';
import iconwomen from '../../assets/iconsvg/iconwomen.svg';
import icon from '../../assets/iconsvg/iconbook.svg';

const FinancialEducationCards = () => {
  const cards = [
    {
      title: "ត្រៀមសាងបទពិសោធន៍",
      subtitle: "ត្រូវប្រើមនុស្សល្អបទពិសោធន៍",
      description: "សំណាងកកើតមកពីឱកាសនិងផែនការសីលធម៌និងផ្សារភ្ជាប់សុខភាពល្អទៅនឹងបេះដូងរបស់អ្នកតែ១",
      icon: () => (
        <div className="h-24 w-24 flex justify-center items-center">
        <div className="relative">
         <img src={iconwomen} className="w-12 h-12 text-white" />
         </div>
      </div>
      ),
    },
    {
      title: "ត្រៀមសាងបទពិសោធន៍",
      subtitle: "ត្រូវប្រើមនុស្សល្អបទពិសោធន៍",
      description: "សំណាងកកើតមកពីឱកាសនិងផែនការសីលធម៌និងផ្សារភ្ជាប់សុខភាពល្អទៅនឹងបេះដូងរបស់អ្នកតែ១",
      icon: () => (
        <div className="h-24 w-24 flex justify-center items-center">
          <div className="relative">
           <img src={iconwomen} className="w-12 h-12 text-white" />
           </div>
        </div>
      ),
    },
    {
      title: "ត្រៀមសាងបទពិសោធន៍",
      subtitle: "ត្រូវប្រើមនុស្សល្អបទពិសោធន៍",
      description: "សំណាងកកើតមកពីឱកាសនិងផែនការសីលធម៌និងផ្សារភ្ជាប់សុខភាពល្អទៅនឹងបេះដូងរបស់អ្នកតែ១",
      icon: () => (
        <div className="h-24 w-24 flex justify-center items-center">
          <div className="relative">
           <img src={iconwomen} className="w-12 h-12 text-white" />
           </div>
        </div>
      ),
    },
  ];

  return (
    <div className='w-max-content mx-auto'>
    <div className="flex flex-col md:flex-row gap-4 p-4 py-[100px]">
      {cards.map((card, index) => (
        <div key={index} className="rounded-xl border border-gray-200 p-6 flex flex-col items-center text-center bg-white w-full md:w-1/3">
          <div className="mb-4">
            {card.icon()}
          </div>
          <h2 className="text-[24px] font-bold mb-2">{card.title}</h2>
          
          <p className="text-Descride  text-descrid  mb-2">{card.subtitle}</p>
          <p className="text-Descride  text-descrid  mb-4 w-[320px]">{card.description}</p>
        </div>
      ))}
    </div>
    </div>
  );
};

export default FinancialEducationCards;