import React, { useState, useEffect } from "react";
import {
  Search,
  Menu,
  X,
  UserCircle,
  Settings,
  Inbox,
  HelpingHand,
  LogOut,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import logomodified from "../../assets/images/logo/o-removebg-preview.png";
import { useGetProfileQuery } from "../../api/auth-api";
import { useDispatch } from "react-redux";
import { setCredentials, logout } from "../../redux/services/authSlice";
import { motion, AnimatePresence } from "framer-motion";

// Navigation items (removed dropdown from "វគ្គសិក្សា")
const navItems = [
  { label: "ទំព័រដើម", href: "/" },
  { label: "វគ្គសិក្សា", href: "/courses" }, // Removed hasDropdown and dropdownItems
  { label: "វេទិកា", href: "/forums" },
  { label: "មាតិកា", href: "/blog" },
  { label: "អំពីពួកយើង", href: "/aboutus" },
];

// Profile menu items
const profileMenuItems = [
  { label: "ប្រវត្តិរូប", icon: UserCircle, href: "/profile" },
  { label: "កែប្រែប្រវត្តិរូប", icon: Settings, href: "/edit-profile" },
  { label: "សារ", icon: Inbox, href: "/messages" },
  { label: "ជំនួយ", icon: HelpingHand, href: "/help" },
];

function MainNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("access_token"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    if (accessToken && refreshToken) {
      dispatch(setCredentials({ access: accessToken, refresh: refreshToken }));
      setIsLoggedIn(true);
    }
  }, [dispatch]);

  const { data: profile, isLoading: profileLoading, error: profileError } = useGetProfileQuery(undefined, {
    skip: !isLoggedIn,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    console.log("Route changed to:", location.pathname); 
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  }, [location.pathname]);

  const handleLinkClick = (href) => {
    setIsMobileMenuOpen(false);
    navigate(href);
    console.log("Navigating to:", href); 
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    dispatch(logout());
    setIsLoggedIn(false);
    navigate("/login");
  };

  const userName = profileLoading ? "Loading..." : profile?.username || "User";

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeInOut" } },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: "easeInOut" } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2, ease: "easeInOut" } },
  };

  return (
    <nav
      className={`bg-white bg-opacity-30 backdrop-blur-md sticky top-0 z-50 transition-shadow duration-300 ${
        isScrolled ? "shadow-lg" : "border-b border-gray-100"
      }`}
    >
      <div className=" mx-auto">
        <div className="flex items-center justify-between py-3 px-4 md:px-6 lg:px-8">
     
          <Link to="/" className="flex-shrink-0">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="h-16 w-16 md:h-18 md:w-18 lg:h-20 lg:w-20 rounded-full flex items-center justify-center text-white font-bold text-lg">
                <img
                  src={logomodified}
                  alt="ISTEM"
                  className="h-19 w-19 md:h-18 md:w-18 lg:h-20 lg:w-20 object-cover object-center"
                />
              </div>
              <h1 className="2xl:text-2xl xl:text-xl md:text-base lg:text:lg font-bold font-popins">
                <span className="text-yellow-300 font-bold">i</span>
                <span className="text-primary font-bold">S</span>
                <span className="text-primary font-bold">T</span>
                <span className="text-primary font-bold">E</span>
                <span className="text-yellow-300 font-bold">M</span>
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => handleLinkClick(item.href)}
                className="px-1 lg:px-2 text-gray-700 hover:text-[#1e8fb8] transition-colors duration-200 font-medium  text-sm lg:text-lg  xl:text-xl 2xl:text-2xl  font-medium flex items-center whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-4">
            {/* Desktop Search Bar */}
            <div className="hidden lg:flex items-center relative bg-white bg-opacity-30 backdrop-blur-md border rounded-[40px] border-card overflow-hidden">
              <Search className="h-5 w-10 text-gray-400 ml-2 lg:ml-3" />
              <input
                type="text"
                placeholder="ស្វែងរក..."
                className="w-20 lg:w-28 xl:w-36 px-1 lg:px-2 py-1.5 border-none outline-none focus:ring-0 focus:outline-none bg-transparent text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    console.log("Search query:", e.target.value);
                  }
                }}
              />
              <button className="bg-primary text-md text-white px-3 lg:px-4 xl:px-6 py-1.5 rounded-[40px] font-medium hover:bg-[#1e8fb8] transition-colors">
                ស្វែងរក
              </button>
            </div>

            {/* Profile or Login */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-1 sm:space-x-2">
  <span className="text-gray-700 text-xs xl:text-sm hidden sm:block">
    {userName}
  </span>
  <Link
    to="/profile"
    onClick={() => handleLinkClick("/profile")}
    className="h-10 w-10 xl:h-12 xl:w-12 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer shadow-md hover:scale-105 transition-all overflow-hidden"
    role="button"
    aria-label="ទៅកាន់ប្រវត្តិរូប"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleLinkClick("/profile");
      }
    }}
  >
    {profileLoading ? (
      <div className="animate-pulse bg-gray-300 h-full w-full rounded-full"></div>
    ) : profile?.image ? (
      <img
        src={profile.image}
        alt="User Profile"
        className="h-full w-full rounded-full object-cover object-center"
      />
    ) : (
      <span className="text-gray-600 text-sm font-semibold">👤</span>
    )}
  </Link>
</div>
            ) : (
              <Link to="/login">
                <div className="flex items-center space-x-4 sm:space-x-3">
                  <button className="hidden sm:block text-primary hover:text-[#1e8fb8] text-[16px] xl:text-[16px] font-medium transition-colors whitespace-nowrap">
                    ចូលគណនី
                  </button>
                </div>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1 sm:p-2"
              aria-label={isMobileMenuOpen ? "បិទម៉ឺនុយ" : "បើកម៉ឺនុយ"}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="lg:hidden py-4 space-y-4 border-t border-gray-100 max-w-[1300px] mx-auto px-4 bg-white shadow-lg"
            >
              {/* Mobile Search Bar */}
              <div className="pb-3">
                <div className="flex items-center bg-gray-50 border rounded-full border-gray-200">
                  <Search className="h-4 w-4 text-gray-400 ml-4" />
                  <input
                    type="text"
                    placeholder="ស្វែងរក..."
                    className="w-full px-3 py-2 border-none outline-none focus:ring-0 focus:outline-none bg-transparent text-sm text-gray-600 placeholder-gray-400"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        console.log("Search query:", e.target.value);
                      }
                    }}
                  />
                  <button className="mr-2 bg-primary text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-[#1e8fb8] transition-colors duration-200 transform hover:scale-105 active:scale-95">
                    ស្វែងរក
                  </button>
                </div>
              </div>

              {/* Mobile Navigation Items */}
              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => handleLinkClick(item.href)}
                    className="block py-2 px-3 text-gray-700 hover:text-[#1e8fb8] hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Mobile Login Button (if not logged in) */}
              {!isLoggedIn && (
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex flex-col space-y-2">
                    <Link
                      to="/login"
                      onClick={() => handleLinkClick("/login")}
                      className="w-full py-2 px-4 text-primary border border-primary rounded-lg text-center text-sm font-medium hover:bg-primary hover:text-white transition-colors"
                    >
                      ចូលគណនី
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default MainNavbar;