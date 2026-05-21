import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ============================================================
// ⚙️  CONFIGURAÇÃO — substitua pelos caminhos das suas fotos
//     Coloque os arquivos em public/photos/photo1.jpg, etc.
// ============================================================
const PHOTOS = [
  { src: '/photos/photo1.jpeg', caption: '' },
  { src: '/photos/photo2.jpeg', caption: '' },
  { src: '/photos/photo3.jpeg', caption: '' },
  { src: '/photos/photo4.jpeg', caption: '' },
  { src: '/photos/photo5.jpeg', caption: '' },
  { src: '/photos/photo6.jpeg', caption: '' },
]

// Gradientes usados como fallback quando a foto não carrega
const FALLBACKS = [
  'from-purple-700 to-pink-600',
  'from-pink-700 to-rose-600',
  'from-violet-700 to-purple-600',
  'from-rose-700 to-pink-600',
  'from-fuchsia-700 to-purple-600',
  'from-pink-700 to-violet-600',
]

// ============================================================
// Card de foto individual
// ============================================================
function PhotoCard({ photo, index, onClick }) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: 'easeOut' }}
      className="photo-item relative aspect-square rounded-2xl overflow-hidden
                 shadow-xl shadow-black/40 cursor-pointer group
                 ring-1 ring-white/8 hover:ring-pink-500/40 transition-all duration-300"
      onClick={() => onClick(index)}
    >
      {!imgError ? (
        <img
          src={photo.src}
          alt={photo.caption}
          loading="lazy"
          className="w-full h-full object-cover transition-all duration-500
                     group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-125"
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          className={`w-full h-full bg-gradient-to-br ${FALLBACKS[index % FALLBACKS.length]}
                      flex items-center justify-center`}
        >
          <span className="text-5xl">📸</span>
        </div>
      )}

      {/* Caption ao hover */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300
                   flex items-end p-4"
      >
        <p className="text-white text-sm font-playfair italic leading-snug">
          {photo.caption}
        </p>
      </div>
    </motion.div>
  )
}

// ============================================================
// Lightbox
// ============================================================
function Lightbox({ photos, index, onClose }) {
  const [current, setCurrent] = useState(index)

  const prev = () => setCurrent(i => (i - 1 + photos.length) % photos.length)
  const next = () => setCurrent(i => (i + 1) % photos.length)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[90] flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/88 backdrop-blur-md" />

        {/* Conteúdo */}
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 max-w-2xl w-full"
          onClick={e => e.stopPropagation()}
        >
          <img
            src={photos[current].src}
            alt={photos[current].caption}
            className="w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
          />
          <p className="text-center text-white/60 mt-4 font-playfair italic text-sm">
            {photos[current].caption}
          </p>

          {/* Botão fechar */}
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 w-10 h-10 rounded-full
                       bg-white/10 hover:bg-white/20 text-white text-xl
                       flex items-center justify-center transition-colors duration-200"
          >
            ×
          </button>

          {/* Prev / Next */}
          {photos.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2
                           w-10 h-10 rounded-full bg-black/50 hover:bg-black/70
                           text-white flex items-center justify-center
                           text-lg transition-colors duration-200"
              >
                ‹
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2
                           w-10 h-10 rounded-full bg-black/50 hover:bg-black/70
                           text-white flex items-center justify-center
                           text-lg transition-colors duration-200"
              >
                ›
              </button>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ============================================================
// Seção Galeria
// ============================================================
export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  return (
    <section className="relative py-28 px-4 overflow-hidden">
      {/* Fundo */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0818] via-[#0e0b20] to-[#0a0818]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-700/6  rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-700/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center mb-16"
        >
          <span className="text-pink-400 text-sm uppercase tracking-[0.35em] font-medium">
            📸 Memórias
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Momentos que marcaram
          </h2>
          <p className="text-purple-200/45 max-w-md mx-auto text-sm md:text-base leading-relaxed">
            Cada foto conta uma história, cada momento vale uma eternidade
          </p>
        </motion.div>

        {/* Grid de fotos */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {PHOTOS.map((photo, i) => (
            <PhotoCard
              key={i}
              photo={photo}
              index={i}
              onClick={setLightboxIndex}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={PHOTOS}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  )
}
