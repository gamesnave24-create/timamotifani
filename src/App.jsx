import { useState } from 'react'
import { motion } from 'framer-motion'
import Hero         from './components/Hero'
import Counter      from './components/Counter'
import MusicPlayer  from './components/MusicPlayer'
import Gallery      from './components/Gallery'
import AboutUs      from './components/AboutUs'
import SurpriseModal from './components/SurpriseModal'

// Divisor decorativo entre seções
function Divider() {
  return (
    <div className="flex items-center justify-center py-2 px-8">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <span className="mx-4 text-pink-500/40 text-sm">❤</span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
    </div>
  )
}

export default function App() {
  const [showSurprise, setShowSurprise] = useState(false)

  return (
    <div className="min-h-screen bg-dark font-inter text-white overflow-x-hidden">

      {/* ── Seções principais ─────────────────────────── */}
      <Hero />
      <Divider />
      <Counter />
      <Divider />
      <MusicPlayer />
      <Divider />
      <Gallery />
      <Divider />
      <AboutUs />

      {/* ── Rodapé ────────────────────────────────────── */}
      <footer className="relative py-14 text-center border-t border-white/5">
        <div className="absolute inset-0 animated-gradient opacity-15 pointer-events-none" />
        <div className="relative z-10">
          <p className="font-playfair italic text-xl text-pink-400/70 mb-2">
            Feito com ❤️ para você
          </p>
          <p className="text-white/25 text-sm tracking-widest uppercase">
            Um amor que não tem fim
          </p>
        </div>
      </footer>

      {/* ── Botão surpresa flutuante ───────────────────── */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.93 }}
        onClick={() => setShowSurprise(true)}
        className="fixed bottom-6 right-6 z-50
                   w-14 h-14 rounded-full
                   bg-gradient-to-br from-pink-500 to-purple-600
                   shadow-lg shadow-pink-600/40
                   flex items-center justify-center text-2xl
                   animate-glow hover:shadow-pink-400/60
                   transition-shadow duration-300"
        title="Surpresa 🎁"
        aria-label="Abrir mensagem surpresa"
      >
        🎁
      </motion.button>

      {/* ── Modal surpresa ────────────────────────────── */}
      {showSurprise && (
        <SurpriseModal onClose={() => setShowSurprise(false)} />
      )}
    </div>
  )
}
