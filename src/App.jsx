import AppRoutes from "./routes/AppRoutes";
import { motion, useScroll } from "framer-motion"
function App() {
  const { scrollYProgress } = useScroll();
  return (
    <>
       <motion.div
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          originX: 0,
          backgroundColor: "#FFFFFF",
          zIndex: 1000,
        }}
      />
      <AppRoutes />
    </>
  );
}

export default App;
