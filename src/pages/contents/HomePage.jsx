import Banner from "../../components/common/Banner";
import BlogPage from "../../components/common/blogcard";
import StemEducationHeader from "../../components/common/cardstudent";

import CourseCategories from "../../components/common/categorycourse/CourseCategories";
import CourseListingPage from "../../components/common/categorycourse/CourseListingPage";
import CourseCardCom from "../../components/common/CourseCardCom";
import FinancialEducationCards from "../../components/common/Deetailcard";
import MainCategory from "../../components/common/MainCategory";
import { CircularPagination } from "../../components/common/Pegenation";

import CoursePlatform from "../../components/common/Testcard";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <MainCategory/>
      <CourseCategories />
     
      <CourseCardCom/>
      <CourseListingPage />
      {/* <CourseCard /> */}
      <BlogPage/>
      <StemEducationHeader/>
      <FinancialEducationCards/>
    </div>
  );
};

export default HomePage;
