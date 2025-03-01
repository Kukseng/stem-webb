import Footer from "../components/layout/footer/Footer";

import Stickynav from "../components/layout/navbar/Stickynav";
import MainNavbar from "../components/layout/navbar/MainNavbar";

// import { Slider } from "@material-tailwind/react";
// import Banner from "../components/card/banner";

const MainLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen font-suwannaphum">
      <header className="sticky top-0 z-50">
        <Stickynav />
        <MainNavbar />
      </header>

      <main className="">
        {/* This div ensures content starts below the fixed navbar */}
        <div>{children}</div>

        <div className="h-auto"></div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
