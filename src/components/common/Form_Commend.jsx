import React from "react";

const Form_Commend = () => {
    return (
      <div>
        <div className="mt-10">
          <h3 className="text-xl font-semibold">មតិ</h3>
          <p className="text-gray-600 mt-2">20 ក្នុងការបញ្ចេញមតិ</p>
          <hr className="my-4" />
          <form className="space-y-4">
            <div className="flex gap-4">
              <input type="text" placeholder="ឈ្មោះ*" className="w-1/2 p-2 border rounded-lg" />
              <input type="email" placeholder="អ៊ីម៉ែល*" className="w-1/2 p-2 border rounded-lg" />
            </div>
            <textarea placeholder="ការបញ្ចេញមតិ" className="w-full p-2 border rounded-lg" rows="4"></textarea>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">បញ្ចូន</button>
          </form>
        </div>
      </div>
    );
  };
  
  export default Form_Commend;
  