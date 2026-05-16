import { motion } from 'framer-motion'
import worldPencil from '../assets/images/worldPencil.webp'
import worldBW from '../assets/images/worldBW.webp'
import world from '../assets/images/world.webp'
import hero from '../assets/images/hero.png'
import worldOutline from '../assets/images/worldOutline.webp'

const Hero = () => {

  const scrollToVision = (e) => {
    e.preventDefault()
    const visionSection = document.getElementById('vision')
    if (visionSection) {
      visionSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <section className="page-shell">
      <div className="relative -mt-30 min-h-[60vh] sm:min-h-screen overflow-hidden rounded-[var(--radius-lg)] rounded-t-none hero-pattern p-4 sm:p-8 md:p-12 shadow-soft flex flex-col justify-center">
        <div className="absolute inset-0 opacity-30">
          <img src={world} alt="hero image" className="h-full w-full object-cover mix-blend-screen" loading="lazy" />
          {/* <img src={worldBW} alt="hero image" className="h-full w-full object-cover mix-blend-screen" loading="lazy" /> */}
          {/* <img src={worldPencil} alt="hero image" className="h-full w-full object-cover mix-blend-screen" loading="lazy" /> */}
          {/* <img src={worldOutline} alt="hero image" className="h-full w-full object-cover mix-blend-screen" loading="lazy" /> */}
        </div>
        <div className="relative flex flex-col gap-3 sm:gap-6">
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex w-fit items-center gap-2 mt-8 sm:mt-16 lg:mt-32 mb-8 sm:mb-16 lg:mb-32 rounded-[var(--radius-pill)] bg-white/10 px-2 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold uppercase tracking-[0.04em] sm:tracking-[0.08em]"
          >
            Leadership + Knowledge
          </motion.p>
          <motion.h1
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold leading-tight w-full"
          >
            <span className='bg-gradient-to-r from-[var(--color-primary)]/20 to-[var(--color-bg)]/10 pl-1 sm:pl-2 pr-2 sm:pr-6 backdrop-blur-2xl border-b-2 inline-block'><span className='text-[var(--color-primary)]'>Where </span><span className='bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-text-primary)]'>knowledge meets leadership.</span></span>
          </motion.h1>
          <motion.p
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-[var(--color-text-muted-secondary)] sm:max-w-2xl pl-1 sm:pl-2"
          >
            With the finest possible knowledge and leadership traits, we can generate transformative leaders for the next century.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="flex flex-wrap items-center gap-2 sm:gap-3"
          >
            <motion.a
              href="#vision"
              onClick={scrollToVision}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="button group inline-flex items-center gap-2 shadow-md text-transparent bg-gradient-to-r from-[var(--color-primary)]/20 to-transparent group-hover:bg-[var(--color-bg)] group-hover:text-[var(--color-primary)] px-2 sm:px-3 lg:px-4 pr-3 sm:pr-4 lg:pr-6 hover:pr-4 sm:hover:pr-6 lg:hover:pr-10 py-2 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg font-semibold hover:bg-white/5 transition-all duration-300"
            >
              <span
                className="relative z-10 transition-colors duration-300 font-bold text-[var(--color-primary)] group-hover:text-[var(--color-bg)]"
              >
                Our vision
              </span>
              <span aria-hidden className='z-20 font-black text-[var(--color-primary)] group-hover:text-[var(--color-bg)] ml-2 group-hover:mt-0 group-hover:opacity-100 transition-all duration-300 overflow-hidden -rotate-90 group-hover:rotate-0'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1" />
                </svg>
              </span>
              <span className="absolute inset-0 z-0 h-full w-0 bg-[var(--color-primary)] transition-all duration-400 ease-out group-hover:w-full">
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section >
  )
}

export default Hero

