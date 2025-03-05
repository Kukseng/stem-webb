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

import image from "../../../assets/markup-cropped.svg"; // Import the SVG
import { Link } from "react-router";
import { Dropdown, Button } from "flowbite-react";
import logomodified from "../../../assets/images/logo/o-removebg-preview.png";
import Banner from "../../common/Banner";

const stemMenuItems = [
  {
    label: "វិទ្យាសាស្រ្ត",
    description: "រៀនអំពីជីវវិទ្យា គីមីវិទ្យា និងរូបវិទ្យា",
    icon: Beaker,
    href: "/science",
  },
  {
    label: "បច្ចេកវិទ្យា",
    description: "កម្មវិធីកុំព្យូទ័រ និងវិស្វកម្ម",
    icon: Code,
    href: "/technology",
  },
  {
    label: "វិស្វកម្ម",
    description: "វិស្វកម្មអេឡិចត្រូនិច និងមេកានិច",
    icon: Calculator,
    href: "/engineering",
  },
  {
    label: "គណិតវិទ្យា",
    description: "ពីជគណិត ធរណីមាត្រ និងស្ថិតិ",
    icon: Leaf,
    href: "/mathematics",
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
  { label: "វគ្គសិក្សា", hasDropdown: true },
  { label: "គ្រូបង្រៀន", href: "/គ្រូបង្រៀន" },
  { label: "មាតិកា", href: "/មាតិកា" },
  { label: "អំពីពួកយើង", href: "/អំពីពួកយើង" },
];

function MainNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSTEMMenuOpen, setIsSTEMMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if user is logged in

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`bg-white bg-opacity-30 backdrop-blur-md sticky top-0 z-50 transition-shadow duration-200 ${
        isScrolled ? "shadow-md" : "border-b border-gray-100"
      }`}
    >
      <div className="w-full">
        <div className=" mx-auto flex items-center justify-between py-3 px-4 md:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
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

          {/* Desktop Navigation for 1024px+ */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-6">
            {navItems.map((item) =>
              item.hasDropdown ? (
                <Dropdown
                  key="stem"
                  label="វគ្គសិក្សា"
                  className="relative"
                  arrowIcon={false}
                >
                  <Dropdown.Header>
                    <span className="block text-sm">វគ្គសិក្សា</span>
                  </Dropdown.Header>
                  {stemMenuItems.map((stemItem) => (
                    <Dropdown.Item key={stemItem.label}>
                      <Link
                        to={stemItem.href}
                        className="flex items-start space-x-4 text-gray-700"
                      >
                        <stemItem.icon className="w-5 h-5 text-primary " />
                        <div>
                          <h4 className="text-sm font-medium text-descrid">
                            {stemItem.label}
                          </h4>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {stemItem.description}
                          </p>
                        </div>
                      </Link>
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
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
              /* Login/Register buttons - Only shown when not logged in */
              <div className="flex items-center space-x-4 sm:space-x-3">
                <Link to="/ចូលគណនី">
                <button
                  className="hidden sm:block text-primary hover:text-[#1e8fb8] text-[16px] xl:text-[16px] font-medium transition-colors whitespace-nowrap"
                >
                  ចូលគណនី
                </button>
                </Link>

                <Link to="/ចុះឈ្មោះថ្មី">
                <button
                  className="hidden sm:block text-primary hover:text-[#1e8fb8] text-[16px] xl:text-[16px] font-medium transition-colors whitespace-nowrap"
                >
                  ចុះឈ្មោះថ្មី
                </button>
                </Link>

                <Link to="/ភ្លេចលេខសម្ងាត់">
                <button
                  className="hidden sm:block text-primary hover:text-[#1e8fb8] text-[16px] xl:text-[16px] font-medium transition-colors whitespace-nowrap"
                >
                  ភ្លេចលេខសម្ងាត់
                </button>
                </Link>


                {/* <button className="hidden sm:block bg-primary text-xs xl:text-sm text-white px-3 lg:px-4 py-1.5 rounded-full hover:bg-[#1e8fb8] transition-all whitespace-nowrap">
                  ចុះឈ្មោះចូលរៀន
                </button> */}
              </div>
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
                  <Dropdown key="stem" label="វគ្គសិក្សា">
                    {stemMenuItems.map((stemItem) => (
                      <Dropdown.Item key={stemItem.label}>
                        <Link
                          to={stemItem.href}
                          className="flex items-start space-x-4 text-gray-700"
                        >
                          <stemItem.icon className="w-5 h-5 text-blue-600" />
                          <div>
                            <h4 className="text-sm font-medium text-gray-800">
                              {stemItem.label}
                            </h4>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {stemItem.description}
                            </p>
                          </div>
                        </Link>
                      </Dropdown.Item>
                    ))}
                  </Dropdown>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="block py-2 px-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
            {!isLoggedIn && (
              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex flex-col space-y-2">
                  
                  <button
                    // onClick={() => setIsLoggedIn(true)}
                    className="w-full py-2 px-4 text-primary border border-primary rounded-lg text-center text-sm font-medium hover:bg-primary hover:text-white transition-colors"
                  >
                    ចូលគណនី
                  </button>
                  {/* <button className="w-full py-2 px-4 bg-primary text-white rounded-lg text-center text-sm font-medium hover:bg-[#1e8fb8] transition-colors">
                    ចុះឈ្មោះចូលគណនី
                  </button> */}
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