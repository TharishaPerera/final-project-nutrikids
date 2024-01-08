import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
}

const quote = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.08,
    },
  },
};

const singleWord = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

const base = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 20,
  },
  transition: {
    duration: 0.5,
  },
};

// FIXME: Improvements needed
export const AnimatedText = ({ text, className }: AnimatedTextProps) => {
  return (
    <motion.div
      className={className}
      variants={quote}
      initial="initial"
      whileInView="animate"
      //   initial={{ opacity: 0, y: 50 }}
      //   animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
    >
      {text.split(" ").map((word, index) => (
        <motion.span
          key={word + "-" + index}
          className="inline-block"
          variants={singleWord}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </motion.div>
  );
};
