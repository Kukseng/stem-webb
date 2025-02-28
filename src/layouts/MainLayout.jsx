import Footer from "../components/layout/footer/Footer";

import Stickynav from "../components/layout/navbar/Stickynav";
import MainNavbar from "../components/layout/navbar/MainNavbar";

// import { Slider } from "@material-tailwind/react";
// import Banner from "../components/card/banner";

const MainLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen ">
      <header className="sticky  z-50 font-suwannaphum ">
        <Stickynav />
        <MainNavbar />
      </header>

      <main className="relative z-0">
        {/* This div ensures content starts below the fixed navbar */}
        <div className=" font-suwan ">{children}</div>

        <div className="h-[900px]">vlollr</div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};



export default MainLayout;
