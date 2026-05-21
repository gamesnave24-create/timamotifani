import { useState } from 'react'
import { motion } from 'framer-motion'
import FloatingHearts from './FloatingHearts'

/**
 * Seção Hero — tela inicial com gradiente animado, coração pulsante
 * e corações que aparecem ao clicar.
 */
export default function Hero() {
  const [clickHearts, setClickHearts] = useState([])

  // Cria um coração na posição do clique
  const handleClick = (e) => {
    const heart = {
      id: Date.now() + Math.random(),
      x:  e.clientX,
      y:  e.clientY,
    }
    setClickHearts(prev => [...prev, heart])
    setTimeout(() => {
      setClickHearts(prev => prev.filter(h => h.id !== heart.id))
    }, 900)
  }

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden cursor-pointer select-none"
      onClick={handleClick}
    >
      {/* Gradiente animado de fundo */}
      <div className="absolute inset-0 animated-gradient" />

      {/* Véu escuro suave */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Orbs decorativos */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-700/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-700/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Corações flutuantes */}
      <FloatingHearts />

      {/* Corações do clique */}
      {clickHearts.map(heart => (
        <span
          key={heart.id}
          className="click-heart"
          style={{ left: heart.x, top: heart.y }}
        >
          ❤️
        </span>
      ))}

      {/* Conteúdo central */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Coração pulsante */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, type: 'spring', stiffness: 110 }}
          className="text-6xl md:text-8xl mb-8 beating-heart inline-block"
        >
          ❤️
        </motion.div>

        {/* Título principal */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: 'easeOut' }}
          className="font-playfair font-bold text-white leading-tight mb-6"
          style={{ fontSize: 'clamp(2.2rem, 6vw, 5.5rem)' }}
        >
          PARA O MEU{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-purple-400 text-glow-pink">
            BENZINHO
          </span>{' '}
          ❤️
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.8 }}
          className="text-base md:text-xl text-purple-200/75 font-light tracking-[0.22em] uppercase mb-6"
        >
          Um amor Lindho infinito e eterno
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-sm text-white/35 italic font-playfair"
        >
          Feito com muitho ❤️ por mim, para você
        </motion.p>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-center"
      >
        <div className="w-6 h-10 border-2 border-white/25 rounded-full flex justify-center pt-2 mx-auto">
          <div className="w-1 h-2.5 bg-white/50 rounded-full scroll-dot" />
        </div>
        <p className="text-white/25 text-[10px] mt-2 tracking-[0.3em] uppercase">Rolar</p>
      </motion.div>
    </section>
  )
}
