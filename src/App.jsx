import AppRoutes from "./routes/AppRoutes";
import { motion, useScroll } from "motion/react"

function App() {
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
        <AppRoutes />
      </div>
    </>
  )
}

export default App;
