import Aboutus from "../../components/layout/aboutus/Aboutus";

import { motion, useScroll } from "motion/react"

const AboutPage = () => {
  const { scrollYProgress } = useScroll()
  return (
    <>
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 5,
          originX: 0,
          backgroundColor: "#ffffff",
          zIndex: 1000,
        }}
      />
      <div>
        <Aboutus />
      </div>
    </>
  )



    ;
};

export default AboutPage;
