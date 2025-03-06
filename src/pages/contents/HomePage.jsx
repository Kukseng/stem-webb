import Banner from "../../components/common/Banner";
import BlogCard from "../../components/common/blogcard/CardBlog";
import StemEducationHeader from "../../components/common/cardstudent";
import CourseCategories from "../../components/common/categorycourse/CourseCategories";
import CourseListingPage from "../../components/common/categorycourse/CourseListingPage";
import CourseCard from "../../components/common/courses/allcourse/allcourse-card";
import FinancialEducationCards from "../../components/common/Deetailcard";
import MainCategory from "../../components/common/MainCategory";
import TeacherCourseUploadForm from "../../components/common/TeacherCourseUploadForm";
import CourseList from "../../components/common/courses/Course-List";

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
