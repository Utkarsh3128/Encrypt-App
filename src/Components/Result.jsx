import { useResultContext } from "./resultContext";
import { motion } from "framer-motion";

const Result = () => {
  const { result } = useResultContext();
  return (
    <div className="grid place-content-center h-screen">
      <h1 className="text-[30px] text">Encrypted Message: </h1>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
          },
          show: {
            opacity: 1,
          },
        }}
        initial="hidden"
        animate="show"
        transition={{
          staggerChildren: 0.07,
        }}
        className="flex text-[30px] mx-auto"
      >
        {Array.from(`${result}`).map((letter, index) => (
          <motion.span
            variants={{
              hidden: {
                y: 50,
                opacity: 0,
              },
              show: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.5,
                  ease: "easeInOut",
                },
              },
            }}
            key={index}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default Result;
