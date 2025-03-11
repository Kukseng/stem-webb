import Footer from "../components/footer/Footer";

import Stickynav from "../components/navbar/Stickynav";
import MainNavbar from "../components/navbar/MainNavbar";

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
        <div>{children}</div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
