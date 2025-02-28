

const Stickynav = () => {
  return (
    <section className="flex justify-center items-center p-2 bg-white font-suwan">
      <div className="flex justify-center items-center">
       
        <p className="text-[#92908e] font-normal  text-sm sm:text-md">
         
          <span className="sm:hidden md:hidden">
          🚀 "ទទួលបានការបង្រៀនពីអ្នកជំនាញ ដោះស្រាយបញ្ហាតាមបែបងាយៗ"
          </span>
        {/*  md to lg*/}
          <span className="hidden sm:inline md:line-clamp-1">
          🚀 "ទទួលបានការបង្រៀនពីអ្នកជំនាញ ដោះស្រាយបញ្ហាជាជំហានៗ និងស្វែងយល់លំហាត់អន្តរកម្មដើម្បីជំរុញដំណើរការរៀនសូត្ររបស់អ្នក"
          </span>
        </p>
      </div>
    </section>
  );
};

export default Stickynav;
