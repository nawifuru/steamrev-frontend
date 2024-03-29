import { motion } from "framer-motion";
import React from "react";

const svgVariants = {
    hidden: { rotate: -180 },
    visible: {
        rotate: 0,
        transition: { duration: 1 }
    }
}
function MainLogo() {
    return (
        <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#FFF"
            id="home-logo"
            viewBox="0 0 24 24"
        >
            <path fill="none" d="M0 0H24V24H0z"></path>
            <path d="M21 8c-1.45 0-2.26 1.44-1.93 2.51l-3.55 3.56c-.3-.09-.74-.09-1.04 0l-2.55-2.55C12.27 10.45 11.46 9 10 9c-1.45 0-2.27 1.44-1.93 2.52l-4.56 4.55C2.44 15.74 1 16.55 1 18c0 1.1.9 2 2 2 1.45 0 2.26-1.44 1.93-2.51l4.55-4.56c.3.09.74.09 1.04 0l2.55 2.55C12.73 16.55 13.54 18 15 18c1.45 0 2.27-1.44 1.93-2.52l3.56-3.55c1.07.33 2.51-.48 2.51-1.93 0-1.1-.9-2-2-2z"></path>
            <motion.path variants={svgVariants} initial="hidden" animate="visible" d="M15 9L15.94 6.93 18 6 15.94 5.07 15 3 14.08 5.07 12 6 14.08 6.93z"></motion.path>
            <motion.path variants={svgVariants} initial="hidden" animate="visible" d="M3.5 11L4 9 6 8.5 4 8 3.5 6 3 8 1 8.5 3 9z"></motion.path>
        </motion.svg>
    );
}

export default MainLogo;
