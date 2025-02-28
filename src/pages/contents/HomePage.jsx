import Banner from "../../components/common/Banner";

import CourseCategories from "../../components/common/categorycourse/CourseCategories";
import CourseListingPage from "../../components/common/categorycourse/CourseListingPage";
import MainCategory from "../../components/common/MainCategory";
import ScienceInterface from "../../components/common/ScienceInterface";
import CoursePlatform from "../../components/common/Testcard";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <MainCategory/>
      <CourseCategories />
      <CoursePlatform/>
      <ScienceInterface/>
      <CourseListingPage />
      {/* <CourseCard /> */}
    </div>
  );
};

export default HomePage;
