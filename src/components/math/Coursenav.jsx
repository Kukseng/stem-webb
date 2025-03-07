import { Label } from "flowbite-react";
import { href } from "react-router";

const Courseitem = [
    { Label: "ខ្មែរ", href: "#" },
    { label: "គណិតវិទ្យា", hrer: "#" },
    { label: "រូបវិទ្យា", href: "#" },
    { label: "ជីវិទ្យា", href: "#" }
]

import React from 'react';

const Coursenav = () => {
    return (
        <div className="hidden lg:flex items-center space-x-3 xl:space-x-6 2xl:gap-10">
            {Courseitem.map((item) =>

            (
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
    )
}
export default Coursenav;
