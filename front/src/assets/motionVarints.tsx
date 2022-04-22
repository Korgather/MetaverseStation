export const pageVariants = {
  initial: {
    transform: `translateY(50px)`,
    opacity: 0,
    transition: { duration: 0.3 },
  },
  visible: {
    transform: `translateY(0px)`,
    opacity: 1,
    transition: { duration: 0.3 },
  },
  leaving: {
    transform: `translateY(50px)`,
    opacity: 0,
    transition: { duration: 0.3 },
  },
};
