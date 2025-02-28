import React, { useState, useEffect } from "react";
import { Search, ChevronDown, Beaker, Code, Calculator, Leaf, Menu, X, UserCircle, Settings, Inbox, LucideHelpingHand, LogOut } from "lucide-react";
import { Link } from "react-router";
import { Dropdown, Button } from 'flowbite-react';
import logomodified from "../../../assets/images/logo/logo-modified.png";

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`bg-white sticky top-0 z-50 transition-shadow duration-200 ${
        isScrolled ? "shadow-md" : "border-b border-gray-100"
      }`}
    >
      <div className="mx-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 md:h-10 md:w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                <img src={logomodified} alt="ISTEM" className="h-8 w-8 md:h-10 md:w-10" />
              </div>
              <h1 className="text-base md:text-lg text-gray-800 font-bold">
                ISTEM
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation for 1024px+ */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) =>
              item.hasDropdown ? (
                <Dropdown key="stem" label="វគ្គសិក្សា">
                  {stemMenuItems.map((stemItem) => (
                    <Dropdown.Item key={stemItem.label}>
                      <Link to={stemItem.href} className="flex items-start space-x-4 text-gray-700">
                        <stemItem.icon className="w-5 h-5 text-blue-600" />
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">{stemItem.label}</h4>
                          <p className="text-xs text-gray-500 mt-0.5">{stemItem.description}</p>
                        </div>
                      </Link>
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className="px-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm whitespace-nowrap"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          <div className="flex items-center space-x-4 lg:space-x-6">
            {/* Search Bar - Adjusted for image match */}
            <div className="hidden lg:flex items-center relative bg-gray-50 border rounded-full border-gray-200 overflow-hidden">
              <Search className="h-4 w-4 text-gray-400 ml-3" />
              <input
                type="text"
                placeholder="ស្វែងរក..."
                className="w-28 lg:w-32 xl:w-40 px-2 py-1.5 border-none outline-none focus:ring-0 focus:outline-none bg-transparent text-sm"
              />
              <button className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-medium hover:bg-blue-700 transition-colors">
                ស្វែងរក
              </button>
            </div>

            {/* Register Button - Adjusted for image match */}
            <button className="hidden lg:block bg-blue-600 text-xs xl:text-sm text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-all whitespace-nowrap">
              ចុះឈ្មោះចូលរៀន
            </button>

            {/* Profile - Adjusted for image match */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 text-xs xl:text-sm hidden sm:block">
                សូដា
              </span>
              <div className="relative">
                <div className="h-8 w-8 xl:h-10 xl:w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <UserCircle className="h-5 w-5 xl:h-6 xl:w-6 text-gray-600" />
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2"
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
          <div className="lg:hidden py-4 space-y-4 border-t border-gray-100">
            <div className="px-4 pb-3">
              <div className="flex items-center bg-gray-50 border rounded-full border-gray-200">
                <Search className="h-4 w-4 text-gray-400 ml-4" />
                <input
                  type="text"
                  placeholder="ស្វែងរក..."
                  className="w-full px-3 py-2 border-none outline-none focus:ring-0 focus:outline-none bg-transparent text-sm text-gray-600 placeholder-gray-400"
                />
                <button className="mr-2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105 active:scale-95">
                  ស្វែងរក
                </button>
              </div>
            </div>
            <div className="space-y-1 px-4">
              {navItems.map((item) =>
                item.hasDropdown ? (
                  <Dropdown key="stem" label="វគ្គសិក្សា">
                    {stemMenuItems.map((stemItem) => (
                      <Dropdown.Item key={stemItem.label}>
                        <Link to={stemItem.href} className="flex items-start space-x-4 text-gray-700">
                          <stemItem.icon className="w-5 h-5 text-blue-600" />
                          <div>
                            <h4 className="text-sm font-medium text-gray-800">{stemItem.label}</h4>
                            <p className="text-xs text-gray-500 mt-0.5">{stemItem.description}</p>
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
          </div>
        )}
      </div>
    </nav>
  );
}

export default MainNavbar;