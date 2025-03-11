import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router'; // Correct import for React Router
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { TbArrowBigRightLinesFilled } from "react-icons/tb";

const Courseitem = [
    { label: "វគ្គសិក្សាទាំអស់", href: "/allcourse" },
    { label: "ខ្មែរ", href: "/khmer" },
    { label: "គណិតវិទ្យា", href: "/math" },
    { label: "រូបវិទ្យា", href: "/physic" },
    { label: "ជីវិទ្យា", href: "/biology" }
];

const Coursenav = () => {
    const location = useLocation(); // Get the current location object
    const [selected, setSelected] = useState(Courseitem[0]); // Default to first course item

    // Update selected tab based on the current route (pathname)
    useEffect(() => {
        const currentTab = Courseitem.find((tab) => tab.href === location.pathname);
        if (currentTab) {
            setSelected(currentTab);
        }
    }, [location.pathname]); // Run when the location changes

    return (
        <div className="px-[90px] py-4 my-8  flex items-center flex-wrap gap-6 border-[#e6e6e6] shadow-md border-2 rounded-full transition-all  ">
            {Courseitem.map((tab) => (
                <Link to={tab.href} key={tab.label} >
                    <Chip
                        text={tab.label}
                        selected={selected === tab}
                        setSelected={setSelected}
                    />
                </Link>
            ))}
        </div>
    );
};

const Chip = ({ text, selected, setSelected }) => {
    return (
        <button
            onClick={() => setSelected({ text })}
            className={`${selected
                ? "text-black transition-all "
                : "text-black hover:text-black hover:bg-slate-300 hover:rounded-full duration-[0.5s]"
                } text-2xl transition-colors px-12 py-0.5 rounded-full relative `}
        >
            <span className="relative z-10">{text}</span>
            {selected && (
                <motion.span
                    layoutId="pill-tab"
                    transition={{ type: "spring", duration: 1 }}
                    className="absolute inset-0    rounded-full "

                >
                    <div>
                        <p className='pl-4 flex pt-2 text-[#424242] animate-pulse animate-infinite animate-duration-[2000ms] animate-ease-linear animate-normal'  ><TbArrowBigRightLinesFilled /></p>
                    </div>
                </motion.span>
            )}
        </button>
    );
};

export default Coursenav;
