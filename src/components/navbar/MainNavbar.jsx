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

import image from "../../assets/markup-cropped.svg";
import { Link } from "react-router";
import { Dropdown, Button } from "flowbite-react";
import logomodified from "../../assets/images/logo/o-removebg-preview.png";


const stemMenuItems = [
  {
    label: "ALL",
    description: "រៀនអំពីជីវវិទ្យា គីមីវិទ្យា និងរូបវិទ្យា",
    icon: Beaker,
    href: "/allcourse",
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
  { label: "ប្រវត្តិរូប", icon: UserCircle },
  { label: "កែប្រែប្រវត្តិរូប", icon: Settings },
  { label: "សារ", icon: Inbox },
  { label: "ជំនួយ", icon: LucideHelpingHand },
  { label: "ចាកចេញ", icon: LogOut },
];

const navItems = [
  { label: "ទំព័រដើម", href: "/" },
  { label: "វគ្គសិក្សា",icon:Dropdown, hasDropdown: true },
  { label: "គ្រូបង្រៀន", href: "/profile" },
  { label: "មាតិកា", href: "/blog" },
  { label: "អំពីពួកយើង", href: "/aboutus" },
];
function MainNavbar() {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  return (
    <nav
      className={`bg-white bg-opacity-30 backdrop-blur-md sticky top-0 z-50 transition-shadow duration-200 ${isScrolled ? "shadow-md" : "border-b border-gray-100"
        }`}
    >
      <div className="w-full">
        <div className=" mx-auto flex items-center justify-between py-3 px-4 md:px-6 lg:px-8 2xl:mx-14">
          {/* Logo */}

          <Link to="/" className="flex-shrink-0 ">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="h-16 w-16 md:h-18 md:w-18 lg:h-20 lg:w-20 rounded-full flex items-center justify-center text-white font-bold text-lg">
                <img
                  src={logomodified}
                  alt="ISTEM"
                  className="h-16 w-16 md:h-18 md:w-18 lg:h-20 lg:w-20 object-cover object-center"
                />
              </div>
              <h1 className="text-xl md:text-2xl lg:text-[26px] text-primary font-bold font-suwannaphum">
                ISTEM
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex 2xl:max-w-content2xl lg:max-w-contentlg md:max-w-contentmd sm:max-w-contentsm items-center space-x-3 xl:space-x-8">
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
                  <Dropdown.Header>
                    {/* <div className="flex items-center px-1 lg:px-2 text-descrid hover:text-[#1e8fb8] transition-colors duration-200 text-sm lg:text-base xl:text-lg font-semibold whitespace-nowrap cursor-pointer">
                      វគ្គសិក្សា
                      <ChevronDown className="ml-1 w-4 h-4" />
                    </div> */}
                  </Dropdown.Header>
                  <div className="p-2 w-[320px] bg-white shadow-2xl rounded-xl border border-gray-100">
                    <div className="space-y-2">
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
                  </div>
                </Dropdown>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={handleLinkClick}
                  className="px-1 lg:px-2 text-descrid hover:text-[#1e8fb8] transition-colors duration-200 text-sm lg:text-base xl:text-lg font-semibold whitespace-nowrap"
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
              <button className="bg-primary text-xs text-white px-3 lg:px-4 xl:px-6 py-1.5 rounded-[40px] font-medium hover:bg-[#1e8fb8] transition-colors">
                ស្វែងរក
              </button>
            </div>

            {isLoggedIn ? (
              <div className="flex items-center space-x-1 sm:space-x-2">
                <span className="text-gray-700 text-xs xl:text-sm hidden sm:block">
                  សូដា
                </span>
                <div className="relative">
                  <Dropdown
                    label=""
                    renderTrigger={() => (
                      <div className="h-8 w-8 xl:h-10 xl:w-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
                        <UserCircle className="h-5 w-5 xl:h-6 xl:w-6 text-gray-600" />
                      </div>
                    )}
                  >
                    {profileMenuItems.map((item) => (
                      <Dropdown.Item key={item.label} icon={item.icon}>
                        <span>{item.label}</span>
                      </Dropdown.Item>
                    ))}
                    <Dropdown.Divider />
                    <Dropdown.Item
                      icon={LogOut}
                      onClick={() => setIsLoggedIn(false)}
                    >
                      <span>ចាកចេញ</span>
                    </Dropdown.Item>
                  </Dropdown>
                </div>
              </div>
            ) : (
              <Link to="/ចូលគណនី">
                <div className="flex items-center space-x-4 sm:space-x-3">
                  <button
                    className="hidden sm:block text-primary hover:text-[#1e8fb8] text-[16px] xl:text-[16px] font-medium transition-colors whitespace-nowrap"
                  >
                    ចូលគណនី
                  </button>
                </div>
              </Link>
            )}

            {/* Mobile Menu Button */}
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
              <div className="ចូ-4 pt-3 border-t border-gray-100">
                <div className="flex flex-col space-y-2">
                  
                  <button
                    onClick={() => {
                      setIsLoggedIn(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-2 px-4 text-primary border border-primary rounded-lg text-center text-sm font-medium hover:bg-primary hover:text-white transition-colors"
                  >
                    ចូលគណនី
                  </button>
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