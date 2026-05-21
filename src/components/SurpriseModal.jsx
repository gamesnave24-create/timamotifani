import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ============================================================
// ⚙️  CONFIGURAÇÃO — altere a mensagem surpresa
// ============================================================
const SURPRISE = {
  photo: '/surprise.png',  // ← coloque a foto em public/surprise.png (ou .jpg)
}

// ============================================================
// Modal Surpresa
// ============================================================
export default function SurpriseModal({ onClose }) {
  const [photoError, setPhotoError] = useState(false)

  return (
    <AnimatePresence>
      {/* Overlay */}
      <motion.div
        key="surprise-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

        {/* Card */}
        <motion.div
          initial={{ scale: 0.75, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.75, opacity: 0, y: 50 }}
          transition={{ type: 'spring', stiffness: 140, damping: 22 }}
          className="relative glass-strong rounded-3xl p-4 max-w-lg w-full
                     shadow-2xl shadow-pink-900/40 border border-pink-500/20
                     overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Orbs decorativos internos */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* Botão fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-5 text-white/40 hover:text-white/80
                       text-3xl leading-none transition-colors duration-200 font-light"
            aria-label="Fechar"
          >
            ×
          </button>

          {/* Foto surpresa */}
          {!photoError && SURPRISE.photo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="rounded-2xl overflow-hidden shadow-xl shadow-black/50 ring-1 ring-white/10"
            >
              <img
                src={SURPRISE.photo}
                alt="Surpresa"
                className="w-full max-h-[80vh] object-contain"
                onError={() => setPhotoError(true)}
              />
            </motion.div>
          )}

          {/* Fallback se a foto falhar */}
          {(photoError || !SURPRISE.photo) && (
            <div className="flex items-center justify-center py-16">
              <span className="text-7xl beating-heart inline-block">💌</span>
            </div>
          )}

          {/* Botão fechar */}
          <div className="mt-4 text-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.04 }}
              onClick={onClose}
              className="px-8 py-3 rounded-full
                         bg-gradient-to-r from-pink-500 to-purple-600
                         text-white text-sm font-medium
                         shadow-lg shadow-pink-600/30
                         hover:shadow-pink-500/50 transition-shadow duration-300"
            >
              Fechar ❤️
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
