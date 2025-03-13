import Banner from "../../components/common/Banner";
import BlogCard from "../../components/common/blogcard/CardBlog";
import StemEducationHeader from "../../components/common/cardstudent";
import CourseCategories from "../../components/categorycourse/CourseCategories";
import CourseListingPage from "../../components/categorycourse/CourseListingPage";
import CourseCard from "../../components/allcourse/allcourse-card";
import FinancialEducationCards from "../../components/common/Deetailcard";
import MainCategory from "../../components/common/MainCategory";
import TeacherCourseUploadForm from "../../components/common/TeacherCourseUploadForm";
import CourseList from "../../components/common/courses/course-list";
import ExampleWrapper from "../../components/common/SpringModel";

const HomePage = () => {
  return (
    <>
      <div>
      
        <Banner />
        <MainCategory />
    
        <CourseCategories />
        <CourseList />
        <CourseListingPage />
        <BlogCard />
        <StemEducationHeader />
        <FinancialEducationCards />
        {/* <TeacherCourseUploadForm/> */}
      </div>
    </>
  );
};

export default HomePage;
