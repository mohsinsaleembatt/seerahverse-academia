import React from 'react'
import { motion } from 'framer-motion'
import './Vision.css'
import logo from '../../assets/images/logo.webp'


const Vision = () => {


	const a4Style = {
		margin: '0 auto',
		backgroundColor: 'transparent',
		position: 'relative',
		boxSizing: 'border-box',
	};

	const containerVariants = {
		hidden: { opacity: 0, y: 50, scale: 0.95 },
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.6,
				ease: [0.22, 1, 0.36, 1],
				staggerChildren: 0.1,
			},
		},
	}

	const itemVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: [0.22, 1, 0.36, 1],
			},
		},
	}

	return (
		<section className="visionSection w-full" id="vision">
			<motion.div
				className="visionContainer"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: '-100px' }}
			>
				<motion.div
					style={a4Style}
					className="visionText" variants={itemVariants}
				>
					<p className='group z-20 font-semibold text-md text-left'>
						<span className="urdu text-5xl mb-15 text-[var(--color-bg)]" id="watn">وطن ہے سارا جہاں ہمارا</span><br />
						SeerahVerse Academia is founded with the mission to equip Muslims with the finest possible training and
						knowledge,<span className='px-2 rounded-sm group-hover:bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-bg)]/80 group-hover:text-white transition-all duration-300'>integrating scientific excellence with the timeless wisdom of Islamic
							philosophy. Our vision
							extends beyond conventional education; we aim to cultivate a generation of transformative leaders who will
							next shape the intellectual and moral landscape of the world over the next 50 to 100 years.
							<span className="absolute inset-0 -z-1 h-full w-0 bg-[var(--color-primary)]/30 transition-all duration-400 ease-out group-hover:w-full"></span>
						</span>
						<br /> <br />
						We envision a world where knowledge is not only pursued but also applied for the greater good, fostering a
						sense of responsibility and ethical leadership among our students. <br /><br />
						Through innovative programs and a commitment to excellence, we strive to empower our students to become
						catalysts for positive change in their communities and beyond. <br /><br />
						<span className='font-bold'>We invite you to join us on this transformative journey, as we work together to build a brighter future for
							all.</span>
						<img className='mt-10 w-20 p-2 shadow' src={logo} alt="logoStamp" />
					</p>
				</motion.div>
			</motion.div>
		</section>
	)
}

export default Vision
