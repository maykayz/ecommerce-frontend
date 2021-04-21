import React from 'react'
import { motion } from "framer-motion"

const Logo = () => {
	
	return(
		<div>
			<svg width="76px" height="32px" viewBox="0 0 76 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
				<title>Moony Logo</title>
				<desc>Created with Sketch.</desc>
				<g id="Group-2" transform="translate(0.000000, 2.000000)">
                <text id="M" fontFamily="Didot-Bold, Didot" fontSize="24" fontWeight="bold">
                    <tspan x="0" y="23">M   </tspan>
                </text>
				<motion.circle
					initial={{ scale: 0.3 }}
					animate={{ scale: 0.8}}
					transition={{ duration: 0.3 }}
					whileHover={{ scale: 0.3 }} 
					cx="29"
					cy="17.5"
					r="6"
					
				>
				</motion.circle>
				<motion.circle
					initial={{ scale: 0.3 }}
					animate={{ scale: 1 }}
					transition={{ duration: 0.5 }}
					whileHover={{ scale: 0.3 }} 
					cx="42"
					cy="17.5"
					r="6"
					fill="#E66300"
				>
				</motion.circle>
                <text id="n" fontFamily="Didot-Bold, Didot" fontSize="24" fontWeight="bold">
                    <tspan x="49" y="23">n</tspan>
                </text>
				<motion.text
					initial={{scale: 10}}
					animate={{ scale: 1}}
					transition={{ duration: 0.3 }}
					id="y" fontFamily="Didot-Bold, Didot" fontSize="24" fontWeight="bold"
				>
                    <tspan x="64" y="23">y</tspan>
				</motion.text>
            </g>
			</svg>
		</div>
	)
}

export default Logo