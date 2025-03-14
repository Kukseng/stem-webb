import React, { useState, useEffect } from "react";
import {
  Search,
  ChevronDown,
  Beaker,
  Code,
  Calculator,
  Leaf,
  Menu,
  X,
  UserCircle,
  Settings,
  Inbox,
  LucideHelpingHand,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Dropdown } from "flowbite-react";
import logomodified from "../../assets/images/logo/o-removebg-preview.png";
import { useGetProfileQuery } from "../../api/auth-api";
import { useDispatch } from "react-redux";
import { setCredentials, logout } from "../../redux/services/authSlice";
import { motion, AnimatePresence } from "framer-motion"; // For animations

const stemMenuItems = [
  {
    label: "ALL",
    description: "រៀនអំពីជីវវិទ្យា គីមីវិទ្យា និងរូបវិទ្យា",
    icon: Beaker,
    href: "/courses",
  },
  {
    label: "រូបវិទ្យា",
    description: "រៀនអំពីជីវវិទ្យា គីមីវិទ្យា និងរូបវិទ្យា",
    icon: Beaker,
    href: "",
  },
  {
    label: "ជីវវិទ្យា",
    description: "កម្មវិធីកុំព្យូទ័រ និងវិស្វកម្ម",
    icon: Code,
    href: "",
  },
  {
    label: "ភាសារខ្មែរ",
    description: "វិស្វកម្មអេឡិចត្រូនិច និងមេកានិច",
    icon: Calculator,
    href: "",
  },
  {
    label: "គណិតវិទ្យា",
    description: "ពីជគណិត ធរណីមាត្រ និងស្ថិតិ",
    icon: Leaf,
    href: "",
  },
];

const profileMenuItems = [
  { label: "ប្រវត្តិរូប", icon: UserCircle, href: "/profile" },
  { label: "កែប្រែប្រវត្តិរូប", icon: Settings, href: "/edit-profile" },
  { label: "សារ", icon: Inbox, href: "/messages" },
  { label: "ជំនួយ", icon: LucideHelpingHand, href: "/help" },
];

const navItems = [
  { label: "ទំព័រដើម", href: "/" },
  { label: "វគ្គសិក្សា", hasDropdown: true },
  { label: "វេទិកា", href: "/forums" },
  { label: "មាតិកា", href: "/blog" },
  { label: "អំពីពួកយើង", href: "/aboutus" },
];

function MainNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    if (accessToken && refreshToken) {
      dispatch(setCredentials({ access: accessToken, refresh: refreshToken }));
      setIsLoggedIn(true);
    }
  }, [dispatch]);

  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
  } = useGetProfileQuery(undefined, {
    skip: !isLoggedIn,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    dispatch(logout());
    setIsLoggedIn(false);
    navigate("/login");
  };

  const userName = profileLoading
    ? ""
    : profile?.username || "User";


  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 },
  };

  return (
    <nav
      className={`bg-white bg-opacity-30 backdrop-blur-md sticky top-0 z-50 transition-shadow duration-300 ${isScrolled ? "shadow-lg" : "border-b border-gray-100"
        }`}
    >
      <div className="w-full">
        <div className="mx-auto flex items-center justify-between py-3 px-4 md:px-6 lg:px-8 2xl:mx-14">

          <Link to="/" className="flex-shrink-0">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="h-16 w-16 md:h-18 md:w-18 lg:h-20 lg:w-20 rounded-full flex items-center justify-center text-white font-bold text-lg">
                <img
                  src={logomodified}
                  alt="ISTEM"
                  className="h-16 w-16 md:h-18 md:w-18 lg:h-20 lg:w-20 object-cover object-center"
                />
              </div>
              <h1 className="text-xl md:text-2xl lg:text-[26px] 2xl:text-4xl font-bold font-suwannaphum">
                <span className="text-primary">I</span>
                <span className="text-primary">S</span>
                <span className="text-primary">T</span>
                <span className="text-primary">E</span>
                <span className="text-primary">M</span>
              </h1>
            </div>
          </Link>

          <div className="hidden lg:flex 2xl:text-lg text-gray-600 sm:text-sm font-semibold items-center space-x-3 xl:space-x-6">
            {navItems.map((item) =>
              item.hasDropdown ? (
                <Dropdown
                  key="stem"
                  label="វគ្គសិក្សា"
                  inline={true}
                  placement="bottom"
                  arrowIcon={true}
                  trigger="hover"
                  className="relative"
                >
                  <Dropdown.Header />
                  <AnimatePresence>
                    <motion.div
                      className="p-4 w-[480px] bg-white shadow-2xl rounded-2xl border border-gray-100 backdrop-blur-sm bg-opacity-80"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={dropdownVariants}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <div className="grid grid-cols-2 gap-4">
                        {stemMenuItems.map((stemItem) => (
                          <Link
                            key={stemItem.label}
                            to={stemItem.href}
                            onClick={handleLinkClick}
                            className="block p-3 hover:bg-gradient-to-r hover:from-primary/10 hover:to-blue-50 rounded-lg transition-all group"
                          >
                            <div className="flex items-center space-x-3">
                              <motion.div
                                className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-colors"
                                whileHover={{ scale: 1.1 }}
                              >
                                <stemItem.icon className="w-5 h-5 text-primary group-hover:text-[#1e8fb8] transition-colors" />
                              </motion.div>
                              <div>
                                <h4 className="text-sm font-semibold text-gray-600 group-hover:text-[#1e8fb8] transition-colors">
                                  {stemItem.label}
                                </h4>
                                <p className="text-xs text-gray-500 mt-1">
                                  {stemItem.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </Dropdown>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={handleLinkClick}
                  className="px-1 lg:px-2 text-gray-600 hover:text-[#1e8fb8] transition-colors duration-200 text-sm lg:text-base xl:text-lg font-semibold whitespace-nowrap"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-4">
            <div className="hidden lg:flex items-center relative bg-white bg-opacity-30 backdrop-blur-md border rounded-[40px] border-card overflow-hidden">
              <Search className="h-4 w-4 text-gray-400 ml-2 lg:ml-3" />
              <input
                type="text"
                placeholder="ស្វែងរក..."
                className="w-20 lg:w-28 xl:w-36 px-1 lg:px-2 py-1.5 border-none outline-none focus:ring-0 focus:outline-none bg-transparent text-sm"
              />
              <button className="bg-primary text-sm  text-white px-3 lg:px-4 xl:px-6 py-1.5 rounded-[40px] font-medium hover:bg-[#1e8fb8] transition-colors">
                ស្វែងរក
              </button>
            </div>

            {isLoggedIn ? (
              <div className="flex items-center space-x-1 sm:space-x-2">
                <span className="text-gray-700 text-xs xl:text-sm hidden sm:block">
                  {userName}
                </span>
                <div className="relative">
                  <Dropdown
                    label=""
                    renderTrigger={() => (
                      <div className="h-10 w-10 xl:h-12 xl:w-12 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer shadow-md hover:scale-105 transition-all">
                        {profile?.image ? (
                          <img
                            src={profile.image}
                            alt="User Profile"
                            className="h-full w-full rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-600 text-sm font-semibold">
                            👤
                          </span>
                        )}
                      </div>
                    )}
                  >
                    {profileMenuItems.map((item) => (
                      <Dropdown.Item
                        key={item.label}
                        icon={item.icon}
                        as={Link}
                        to={item.href}
                      >
                        <span>{item.label}</span>
                      </Dropdown.Item>
                    ))}
                    <Dropdown.Divider />
                    <Dropdown.Item icon={LogOut} onClick={handleLogout}>
                      <span>ចាកចេញ</span>
                    </Dropdown.Item>
                  </Dropdown>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <div className="flex items-center space-x-4 sm:space-x-3">
                  <button className="hidden sm:block text-primary hover:text-[#1e8fb8] text-[18px] xl:text-[16px] 2xl:text-sm font-medium transition-colors whitespace-nowrap">
                    ចូលគណនី
                  </button>
                </div>
              </Link>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1 sm:p-2"
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
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-4 border-t border-gray-100 max-w-[1300px] mx-auto px-4">
            <div className="pb-3">
              <div className="flex items-center bg-gray-50 border rounded-full border-gray-200">
                <Search className="h-4 w-4 text-gray-400 ml-4" />
                <input
                  type="text"
                  placeholder="ស្វែងរក..."
                  className="w-full px-3 py-2 border-none outline-none focus:ring-0 focus:outline-none bg-transparent text-sm text-gray-600 placeholder-gray-400"
                />
                <button className="mr-2 bg-primary text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-hover transition-colors duration-200 transform hover:scale-105 active:scale-95">
                  ស្វែងរក
                </button>
              </div>
            </div>
            <div className="space-y-1">
              {navItems.map((item) =>
                item.hasDropdown ? (
                  <Dropdown
                    key="stem-mobile"
                    label="វគ្គសិក្សា"
                    className="w-full"
                    renderTrigger={() => (
                      <div className="flex justify-between items-center w-full py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                        <span>វគ្គសិក្សា</span>
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      </div>
                    )}
                  >
                    <div className="space-y-2 p-2">
                      {stemMenuItems.map((stemItem) => (
                        <Link
                          key={stemItem.label}
                          to={stemItem.href}
                          onClick={handleLinkClick}
                          className="block p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="bg-primary/10 p-2.5 rounded-lg">
                              <stemItem.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                            </div>
                            <div>
                              <h4 className="text-base font-semibold text-gray-800 group-hover:text-primary transition-colors">
                                {stemItem.label}
                              </h4>
                              <p className="text-sm text-gray-500 mt-1">
                                {stemItem.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </Dropdown>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={handleLinkClick}
                    className="block py-2 px-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
            {!isLoggedIn && (
              <div className="pt-4 border-t border-gray-100">
                <div className="flex flex-col space-y-2">
                  <Link
                    to="/login"
                    onClick={handleLinkClick}
                    className="w-full py-2 px-4 text-primary border border-primary rounded-lg text-center text-sm font-medium hover:bg-primary hover:text-white transition-colors"
                  >
                    ចូលគណនី
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default MainNavbar;