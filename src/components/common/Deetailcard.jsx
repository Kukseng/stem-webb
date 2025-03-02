import React from 'react';

const FinancialEducationCards = () => {
  const cards = [
    {
      title: "ត្រៀមសាងបទពិសោធន៍",
      subtitle: "ត្រូវប្រើមនុស្សល្អបទពិសោធន៍",
      description: "សំណាងកកើតមកពីឱកាសនិងផែនការសីលធម៌និងផ្សារភ្ជាប់សុខភាពល្អទៅនឹងបេះដូងរបស់អ្នកតែ១",
      icon: () => (
        <div className="h-24 w-24 relative">
          <div className="rounded-full bg-slate-600 h-full w-full"></div>
          <div className="absolute top-6 right-0 w-12 h-12 rounded-full bg-green-400"></div>
          <div className="absolute bottom-0 left-4 w-6 h-10 bg-green-400 rounded-t-md"></div>
          <div className="absolute bottom-5 right-3 w-5 h-8 bg-red-400 rounded-md"></div>
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
            <div className="w-16 h-6 bg-purple-200 absolute bottom-0 rounded-lg z-10"></div>
            <div className="w-14 h-10 bg-amber-400 absolute -top-8 left-4 rotate-12 rounded-sm"></div>
            <div className="w-14 h-10 bg-amber-400 absolute -top-6 -left-2 -rotate-12 rounded-sm"></div>
            <div className="w-12 h-8 bg-amber-400 absolute -top-3 left-2 rounded-sm"></div>
            <div className="w-6 h-6 rounded-full bg-red-400 absolute -top-12 left-0"></div>
            <div className="w-6 h-6 text-teal-500 absolute -top-10 right-0">+</div>
            <div className="w-3 h-3 rounded-full bg-teal-300 absolute -top-6 -right-2"></div>
          </div>
        </div>
      ),
    },
    {
      title: "ត្រៀមសាងបទពិសោធន៍",
      subtitle: "ត្រូវប្រើមនុស្សល្អបទពិសោធន៍",
      description: "សំណាងកកើតមកពីឱកាសនិងផែនការសីលធម៌និងផ្សារភ្ជាប់សុខភាពល្អទៅនឹងបេះដូងរបស់អ្នកតែ១",
      icon: () => (
        <div className="h-24 w-24 relative">
          <div className="w-16 h-12 bg-pink-200 absolute bottom-2 right-2 rounded-lg"></div>
          <div className="w-12 h-10 bg-yellow-300 absolute top-2 right-0 rounded-full"></div>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 py-[100px]">
      {cards.map((card, index) => (
        <div key={index} className="rounded-xl border border-gray-200 p-6 flex flex-col items-center text-center bg-white w-full md:w-1/3">
          <div className="mb-4">
            {card.icon()}
          </div>
          <h2 className="text-xl font-bold mb-2">{card.title}</h2>
          <p className="text-sm text-gray-600 mb-2">{card.subtitle}</p>
          <p className="text-xs text-gray-500 mb-4">{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FinancialEducationCards;