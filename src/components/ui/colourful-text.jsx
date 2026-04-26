import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

/**
 * ColourfulText — Animated text with blur/bounce micro-animation.
 * Pass a single `color` to animate the whole word uniformly,
 * or omit it to cycle through the palette per-letter.
 */
export default function ColourfulText({ text, color }) {
  const palette = [
    'rgb(0, 229, 255)',   // --accent
    'rgb(0, 245, 212)',   // --teal
    'rgb(59, 130, 246)',  // --blue
    'rgb(34, 211, 238)',  // --cyan
    'rgb(96, 165, 250)',  // --blue-light
    'rgb(0, 184, 212)',   // --accent-dim
    'rgb(30, 64, 175)',   // --blue-dark
    'rgb(0, 229, 255)',
    'rgb(0, 245, 212)',
    'rgb(34, 211, 238)',
  ]

  const [currentColors, setCurrentColors] = useState(palette)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (color) return // no cycling needed for single-color mode

    const interval = setInterval(() => {
      const shuffled = [...palette].sort(() => Math.random() - 0.5)
      setCurrentColors(shuffled)
      setCount((prev) => prev + 1)
    }, 5000)

    return () => clearInterval(interval)
  }, [color])

  return text.split('').map((char, index) => (
    <motion.span
      key={`${char}-${count}-${index}`}
      initial={{ y: 0 }}
      animate={{
        color: color || currentColors[index % currentColors.length],
        y: [0, -3, 0],
        scale: [1, 1.01, 1],
        filter: ['blur(0px)', 'blur(5px)', 'blur(0px)'],
        opacity: [1, 0.8, 1],
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        repeat: Infinity,
        repeatDelay: 3,
      }}
      className="nb-colourful-char"
    >
      {char}
    </motion.span>
  ))
}
