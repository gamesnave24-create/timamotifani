import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

// ============================================================
// ⚙️  CONFIGURAÇÃO — coloque o arquivo em public/music.mp3
// ============================================================
const TRACK = {
  title:  'A Little Respect',
  artist: 'Erasure',
  cover:  '/cover.jpg',
  src:    '/music.mp3',
}

// ============================================================
// Utilitário: formata segundos → m:ss
// ============================================================
function formatTime(secs) {
  if (!secs || isNaN(secs) || !isFinite(secs)) return '0:00'
  const m = Math.floor(secs / 60)
  const s = Math.floor(secs % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

// ============================================================
// Componente Player
// ============================================================
export default function MusicPlayer() {
  const audioRef    = useRef(null)
  const progressRef = useRef(null)

  const [isPlaying,   setIsPlaying]   = useState(false)
  const [isMuted,     setIsMuted]     = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration,    setDuration]    = useState(0)
  const [volume,      setVolume]      = useState(0.8)
  const [coverError,  setCoverError]  = useState(false)

  // Configura o elemento <audio> e inicia reprodução na primeira interação
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.8

    const onTimeUpdate = () => setCurrentTime(audio.currentTime)
    const onDuration   = () => setDuration(audio.duration)
    const onPlay       = () => setIsPlaying(true)
    const onPause      = () => setIsPlaying(false)
    const onEnded      = () => setIsPlaying(false)

    audio.addEventListener('timeupdate',        onTimeUpdate)
    audio.addEventListener('loadedmetadata',    onDuration)
    audio.addEventListener('durationchange',    onDuration)
    audio.addEventListener('play',              onPlay)
    audio.addEventListener('pause',             onPause)
    audio.addEventListener('ended',             onEnded)

    // Tenta auto-play mudo; desmuta na primeira interação
    audio.muted = true
    audio.play().then(() => {
      setIsPlaying(true)
      setIsMuted(true)

      let unlocked = false
      const unlock = () => {
        if (unlocked) return
        unlocked = true
        audio.muted = false
        setIsMuted(false)
        ;['click', 'scroll', 'keydown', 'touchstart', 'mousemove'].forEach(ev =>
          document.removeEventListener(ev, unlock)
        )
      }
      ;['click', 'scroll', 'keydown', 'touchstart', 'mousemove'].forEach(ev =>
        document.addEventListener(ev, unlock, { passive: true })
      )
    }).catch(() => {
      // Auto-play bloqueado — aguarda interação manual
      setIsPlaying(false)
      setIsMuted(false)
      audio.muted = false
    })

    return () => {
      audio.removeEventListener('timeupdate',     onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onDuration)
      audio.removeEventListener('durationchange', onDuration)
      audio.removeEventListener('play',           onPlay)
      audio.removeEventListener('pause',          onPause)
      audio.removeEventListener('ended',          onEnded)
    }
  }, [])

  // Play / Pause
  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) audio.pause()
    else audio.play()
  }, [isPlaying])

  // Mutar / Desmutar
  const toggleMute = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !isMuted
    setIsMuted(!isMuted)
  }, [isMuted])

  // Clique na barra de progresso para seek
  const handleProgressClick = useCallback((e) => {
    const bar   = progressRef.current
    const audio = audioRef.current
    if (!bar || !audio || !duration || isNaN(duration)) return
    const rect    = bar.getBoundingClientRect()
    const ratio   = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
    audio.currentTime = ratio * duration
    setCurrentTime(audio.currentTime)
  }, [duration])

  // Volume
  const handleVolume = useCallback((e) => {
    const v     = parseFloat(e.target.value)
    const audio = audioRef.current
    setVolume(v)
    if (audio) {
      audio.volume = v
      if (v > 0 && isMuted) {
        audio.muted = false
        setIsMuted(false)
      }
    }
  }, [isMuted])

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <section className="relative py-28 px-4 overflow-hidden">
      {/* Elemento de áudio oculto */}
      <audio ref={audioRef} src={TRACK.src} loop preload="metadata" />
      {/* Fundo */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0818] via-[#090c1e] to-[#0a0818]" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2
                   w-[500px] h-[500px] bg-purple-700/6 rounded-full blur-[120px]
                   pointer-events-none"
      />

      <div className="relative z-10 max-w-lg mx-auto">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-pink-400 text-sm uppercase tracking-[0.em] font-medium">
               "I'm so in love with you"
          </span>
          <h2 className="font-playfair text-4xl md:text-4xl font-bold text-white mt-3">
          🎵 Nossa Música
          </h2>
        </motion.div>

        {/* Card do player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="glass-strong rounded-3xl p-8 md:p-10 shadow-2xl shadow-purple-900/30
                     border border-white/8"
        >
          {/* Capa do álbum */}
          <div className="flex justify-center mb-8">
            <motion.div
              animate={isPlaying ? { y: [0, -10, 0] } : { y: 0 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-44 h-44 md:w-52 md:h-52 rounded-2xl overflow-hidden
                         shadow-2xl shadow-black/60"
            >
              {!coverError ? (
                <img
                  src={TRACK.cover}
                  alt="Capa da música"
                  className="w-full h-full object-cover"
                  onError={() => setCoverError(true)}
                />
              ) : (
                <div className="w-full h-full animated-gradient flex items-center justify-center">
                  <span className="text-6xl">🎵</span>
                </div>
              )}
              {/* Borda brilhante */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
            </motion.div>
          </div>

          {/* Info da faixa */}
          <div className="text-center mb-7">
            <h3 className="font-playfair text-2xl font-bold text-white mb-1">
              {TRACK.title}
            </h3>
            <p className="text-purple-300/65 text-sm tracking-wide">{TRACK.artist}</p>
          </div>

          {/* Barras do equalizador */}
          {isPlaying && (
            <div className="flex justify-center items-end gap-1 h-6 mb-6">
              {[1, 2, 3, 4, 5].map(i => (
                <div
                  key={i}
                  className="eq-bar w-1.5 rounded-full bg-gradient-to-t from-purple-600 to-pink-400"
                />
              ))}
            </div>
          )}

          {/* Barra de progresso */}
          <div className="mb-4">
            <div
              ref={progressRef}
              className="w-full h-1.5 bg-white/10 rounded-full cursor-pointer group relative"
              onClick={handleProgressClick}
              role="slider"
              aria-label="Progresso da música"
            >
              <div
                className="progress-bar h-full rounded-full transition-[width] duration-150 relative"
                style={{ width: `${progress}%` }}
              >
                {/* Thumb */}
                <div
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2
                             w-3.5 h-3.5 bg-white rounded-full shadow-md
                             opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                />
              </div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-white/35 tabular-nums">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controles */}
          <div className="flex items-center justify-center gap-8 mb-7">
            {/* Anterior (decorativo) */}
            <button
              className="text-white/30 hover:text-white/60 transition-colors duration-200 text-xl"
              aria-label="Anterior"
              onClick={() => audioRef.current && (audioRef.current.currentTime = 0)}
            >
              ⏮
            </button>

            {/* Play / Pause */}
            <motion.button
              whileTap={{ scale: 0.91 }}
              whileHover={{ scale: 1.06 }}
              onClick={togglePlay}
              className="w-16 h-16 rounded-full
                         bg-gradient-to-br from-pink-500 to-purple-600
                         flex items-center justify-center text-white text-2xl
                         shadow-lg shadow-pink-600/35
                         hover:shadow-pink-500/55 transition-shadow duration-300
                         animate-glow"
              aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
            >
              {isPlaying ? '⏸' : '▶'}
            </motion.button>

            {/* Próxima (decorativo) */}
            <button
              className="text-white/30 hover:text-white/60 transition-colors duration-200 text-xl"
              aria-label="Próxima"
            >
              ⏭
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-3">
            <span className="text-white/35 text-sm select-none">🔈</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={volume}
              onChange={handleVolume}
              className="w-full opacity-55 hover:opacity-90 transition-opacity duration-200"
              aria-label="Volume"
            />
            <span className="text-white/35 text-sm select-none">🔊</span>
          </div>

          {/* Botão desmutar */}
          {isMuted && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={toggleMute}
              className="mt-5 w-full py-2.5 rounded-xl
                         bg-gradient-to-r from-pink-500/20 to-purple-600/20
                         border border-pink-400/30
                         text-pink-300 text-sm font-medium tracking-wide
                         hover:from-pink-500/35 hover:to-purple-600/35
                         transition-all duration-200"
            >
              🔇 Clique para ativar o som
            </motion.button>
          )}
        </motion.div>
      </div>
    </section>
  )
}
