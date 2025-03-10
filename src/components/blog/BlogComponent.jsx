import blog from "../../assets/blog.png";
import { FaRegCalendar } from "react-icons/fa6";
import React from "react";

const blogPosts = [
  {
    id: 1,
    title: "បណ្តុំការរៀន HTML ដែលពេញនិយម",
    date: "មករា 24, 2025",
    description: "ការសិក្សាពីកម្រិតដំបូងរហូតដល់កម្រិតខ្ពស់",
    image: blog,
  },
  {
    id: 2,
    title: "បណ្តុំការរៀន HTML ដែលពេញនិយម",
    date: "មករា 24, 2025",
    description: "ការសិក្សាពីកម្រិតដំបូងរហូតដល់កម្រិតខ្ពស់",
    image: blog,
  },
  {
    id: 3,
    title: "បណ្តុំការរៀន HTML ដែលពេញនិយម",
    date: "មករា 24, 2025",
    description: "ការសិក្សាពីកម្រិតដំបូងរហូតដល់កម្រិតខ្ពស់",
    image: blog,
  },
  {
    id: 4,
    title: "បណ្តុំការរៀន HTML ដែលពេញនិយម",
    date: "មករា 24, 2025",
    description: "ការសិក្សាពីកម្រិតដំបូងរហូតដល់កម្រិតខ្ពស់",
    image: blog,
  },
  {
    id: 5,
    title: "បណ្តុំការរៀន HTML ដែលពេញនិយម",
    date: "មករា 24, 2025",
    description: "ការសិក្សាពីកម្រិតដំបូងរហូតដល់កម្រិតខ្ពស់",
    image: blog,
  },
  {
    id: 6,
    title: "បណ្តុំការរៀន HTML ដែលពេញនិយម",
    date: "មករា 24, 2025",
    description: "ការសិក្សាពីកម្រិតដំបូងរហូតដល់កម្រិតខ្ពស់",
    image: blog,
  },
];

const BlogComponent = () => {
  return (
    <>
      <div className="mx-auto px-6 py-10">
        {/* paragrah */}
        <div className="flex justify-between">
          <p className="inline text-4xl font-bold pb-7 mb-2">អត្ថបទទាំងអស់</p>
          <a
              href="#"
              className="mt-3 flex items-center justify-center mb-2 text-sm px-6 w-[100px] h-[37px] text-white bg-primary rounded-[40px]"
              >
              បង្ហោះថ្មី
          </a>
        </div>
        {/* the end of paragrah */}
        {/* Responsive Grid Layout */}
        <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
          {/* Blog Cards Section */}
          <div className="grid grid-cols-1 md:col-span-2 md:grid-cols-2 lg:grid-cols-2 lg:col-span-2 xl-cols-2 xl:col-span-2 2xl:grid-cols-2 2xl:col-span-2 gap-6">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
              >
                <a href="#">
                  <img
                    className="rounded-t-lg w-full h-[200px] object-cover"
                    src={post.image}
                    alt="blog image"
                  />
                </a>
                <div className="p-4">
                  <a href="#">
                    <h3 className="mb-2 text-2xl font-bold dark:text-white">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-2 py-1">
                      <FaRegCalendar className="text-gray-500 dark:text-gray-400" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {post.date}
                      </p>
                    </div>
                  </a>
                  <p className="mb-2 text-gray-700 dark:text-gray-400">
                    {post.description}
                  </p>
                  <a
                    href="#"
                    className="mt-1 inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-primary rounded-full"
                  >
                    អានបន្ថែម
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Section */}
          <div className=" flex flex-col gap-6 ">
            {/* List Section */}
            <div className="text-sm font-medium bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <a
                href="#"
                className="block w-full px-4 py-2 text-white bg-primary border-b border-gray-200 rounded-t-lg dark:bg-gray-800 dark:border-gray-600 text-base"
              >
                ប្រភេទ
              </a>
              {[
                { label: "ទូទៅ", count: 15 },
                { label: "រូបវិទ្យា", count: 15 },
                { label: "គីមីវិទ្យា", count: 15 },
                { label: "ជីវវិទ្យា", count: 15 },
                { label: "វិទ្យាសាស្រ្តកុំព្យូទ័រ", count: 15 },
                { label: "គណិតវិទ្យា", count: 15 },
              ].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex justify-between items-center w-full px-4 py-2 border-b cursor-pointer hover:bg-gray-100 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <p>{item.label}</p>
                  <p>{item.count}</p>
                </a>
              ))}
            </div>

            {/* New Posts Section */}
            <div className="flex flex-col">
              <p className="px-4 py-2 block text-white bg-primary rounded-t-lg dark:bg-gray-800 dark:border-gray-600 text-base">
                ការបង្ហោះថ្មីៗ
              </p>

              {blogPosts.slice(0, 4).map((post, index) => {
                const isLast = index === blogPosts.length - 1;
                return (
                  <div
                    key={post.id}
                    className={`over:bg-gray-100 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary flex flex-row bg-white border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700 overflow-hidden
                   ${isLast ? "rounded-b-lg" : ""}`}
                   >
                    <a href="#" className=" w-[120px] h-[80px] overflow-hidden dark:bg-gray-800 dark:border-gray-600 text-white  text-base">
                      <img
                        className="w-full h-full object-cover p-[1px]"
                        src={post.image}
                        alt="blog image"
                      />
                    </a>
                    <p className="p-2 text-sm dark:text-white">{post.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
          {/* End of Sidebar */}
        </div>
      </div>
    </>
  );
};

export default BlogComponent;
