import Banner from "../../components/common/Banner";
import BlogCard from "../../components/common/blogcard";
import StemEducationHeader from "../../components/common/cardstudent";

import CourseCategories from "../../components/common/categorycourse/CourseCategories";
import CourseListingPage from "../../components/common/categorycourse/CourseListingPage";
import CourseCardCom from "../../components/common/CourseCardCom";
import FinancialEducationCards from "../../components/common/Deetailcard";
import MainCategory from "../../components/common/MainCategory";


const HomePage = () => {
  return (
    <div>
      <Banner />
      <MainCategory/>
      <CourseCategories />
     
      <CourseCardCom/>
      <CourseListingPage />
      <BlogCard/>
      <StemEducationHeader/>
      <FinancialEducationCards/>
    </div>
  );
};

export default HomePage;
