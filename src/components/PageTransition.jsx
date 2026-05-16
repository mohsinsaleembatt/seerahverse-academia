import { motion } from 'framer-motion'

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.985, rotate: -0.25 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, y: -12, scale: 0.985, rotate: 0.25 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex-1"
    >
      {children}
    </motion.div>
  )
}

export default PageTransition

