import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// ============================================================
// ⚙️  CONFIGURAÇÃO — altere para a data de início do namoro
// ============================================================
const RELATIONSHIP_START = new Date('2025-11-21T22:47:00')

// ============================================================
// Card individual de tempo
// ============================================================
function TimeCard({ value, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.65, ease: 'easeOut' }}
      whileHover={{ scale: 1.04, y: -4 }}
      className="glass rounded-2xl p-6 md:p-8 flex flex-col items-center gap-2
                 min-w-[110px] border border-white/8
                 hover:border-pink-500/40 transition-colors duration-300 group"
    >
      {/* Número */}
      <span
        className="font-playfair font-bold text-transparent bg-clip-text
                   bg-gradient-to-b from-white to-pink-300
                   group-hover:to-pink-400 transition-all duration-300
                   tabular-nums leading-none"
        style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)' }}
      >
        {String(value).padStart(2, '0')}
      </span>

      {/* Label */}
      <span className="text-purple-300/65 text-[11px] md:text-xs uppercase tracking-widest font-medium">
        {label}
      </span>

      {/* Brilho sutil no hover */}
      <div className="absolute inset-0 rounded-2xl bg-pink-500/0 group-hover:bg-pink-500/5 transition-colors duration-300 pointer-events-none" />
    </motion.div>
  )
}

// ============================================================
// Seção Contador
// ============================================================
export default function Counter() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calc = () => {
      const diff        = Date.now() - RELATIONSHIP_START.getTime()
      const totalSecs   = Math.max(0, Math.floor(diff / 1000))
      const seconds     = totalSecs % 60
      const totalMins   = Math.floor(totalSecs / 60)
      const minutes     = totalMins % 60
      const totalHours  = Math.floor(totalMins / 60)
      const hours       = totalHours % 24
      const days        = Math.floor(totalHours / 24)
      setTime({ days, hours, minutes, seconds })
    }

    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [])

  const startFormatted = RELATIONSHIP_START.toLocaleDateString('pt-BR', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <section className="relative py-28 px-4 overflow-hidden">
      {/* Fundo */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0818] via-[#0d0a22] to-[#0a0818]" />

      {/* Orbs */}
      <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-purple-700/10 rounded-full blur-[90px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-pink-700/10  rounded-full blur-[90px] -translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-16"
        >
          <span className="inline-block text-pink-400 text-sm uppercase tracking-[0.35em] font-medium mb-4">
            ❤️ Juntos há
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mt-1 mb-4">
            Nossa Jornada
          </h2>
          <p className="text-purple-200/50 text-sm md:text-base max-w-sm mx-auto leading-relaxed">
            Cada segundo ao seu lado é incrivel, Que venham muitos mais anos de felicidade ao seu lado! Te amo demais! ❤️
          </p>
        </motion.div>

        {/* Cards de tempo */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-5">
          <TimeCard value={time.days}    label="Dias"     delay={0.10} />
          <TimeCard value={time.hours}   label="Horas"    delay={0.20} />
          <TimeCard value={time.minutes} label="Minutos"  delay={0.30} />
          <TimeCard value={time.seconds} label="Segundos" delay={0.40} />
        </div>

        {/* Data de início */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="mt-12 text-2xl md:text-4xl italic font-playfair font-semibold
                     text-transparent bg-clip-text
                     bg-gradient-to-r from-pink-300 via-white to-purple-300
                     drop-shadow-[0_0_50px_rgba(236,72,153,0.6)]"
        >
          Desde {startFormatted}
        </motion.p>
      </div>
    </section>
  )
}
