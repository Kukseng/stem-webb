import React from 'react';
import { BookOpen, User, ClipboardList, CheckCircle2 } from 'lucide-react';

const ScienceInterface = () => {
  const subjects = [
    {
      title: "វិទ្យាសាស្ត្រធម្មជាតិ",
      englishTitle: "Natural Sciences",
      theme: "bg-gradient-to-br from-green-100 to-emerald-50",
      accent: "bg-emerald-500",
      subjects: [
        { name: "រូបវិទ្យា", enName: "Physics", checked: true },
        { name: "គីមីវិទ្យា", enName: "Chemistry", checked: true },
        { name: "ជីវវិទ្យា", enName: "Biology", checked: true },
        { name: "ផែនដី", enName: "Earth Science", checked: true },
      ]
    },
    {
      title: "វិទ្យាសាស្ត្របច្ចេកវិទ្យា",
      englishTitle: "Technology Sciences",
      theme: "bg-gradient-to-br from-blue-100 to-cyan-50",
      accent: "bg-blue-500",
      subjects: [
        { name: "វិទ្យាសាស្ត្រកុំព្យូទ័រ", enName: "Computer Science", checked: true },
        { name: "វិទ្យាសាស្ត្រអាកាស", enName: "Aerospace Science", checked: true },
        { name: "វិទ្យាសាស្ត្រអេឡិចត្រូនិក", enName: "Electronics", checked: true },
        { name: "វិទ្យាសាស្ត្ររចនាប័ទ្ម", enName: "Design Science", checked: true },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-8">
      {/* Navigation */}
      <div className="flex justify-center mb-12">
        <div className="bg-white shadow-lg rounded-2xl p-2">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <BookOpen className="w-4 h-4" />
              <span>កម្មវិធីសិក្សា</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <User className="w-4 h-4" />
              <span>គណនីរបស់ខ្ញុំ</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <ClipboardList className="w-4 h-4" />
              <span>កម្រងសំណួរវាយតម្លៃ</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        {subjects.map((category, index) => (
          <div key={index} className={`${category.theme} rounded-2xl shadow-xl overflow-hidden`}>
            <div className="p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{category.title}</h2>
                <p className="text-gray-600">{category.englishTitle}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.subjects.map((subject, subIndex) => (
                  <div 
                    key={subIndex} 
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`${category.accent} w-8 h-8 rounded-full flex items-center justify-center shadow-inner`}>
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-lg font-medium text-gray-800">
                          {subject.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {subject.enName}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScienceInterface;