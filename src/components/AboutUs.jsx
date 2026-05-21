import { motion } from 'framer-motion'

// ============================================================
// ⚙️  CONFIGURAÇÃO — personalize textos, nomes e imagem
// ============================================================
const ABOUT = {
  couplePhoto: '/couple.jpeg',      // Coloque uma foto em public/couple.jpg
  names:       'Victor & Tifani',
  paragraphs: [
    'Às vezes eu paro pra pensar em como minha vida ficou muito melhor depois que você chegou',
    'Parece meio besta falar isso, mas é a mais pura verdade. Você é a minha melhor amiga, minha parceira, e a pessoa que me entende como ninguém.',
    'Você trouxe um sentimento leve pra mim, uma paz que eu não encontrava em lugar nenhum',
    'O jeito que você cuida de mim, o jeito que me entende até quando eu não sei explicar as coisas, tudo isso faz eu ter mais certeza ainda que é você ',
    'Eu amo nossos momentos simples, nossas conversas, nossas brincadeiras, até nossos ciúmes bobos, Porque no final de tudo é com você que eu quero estar sempre',
  ],
  quote: '"Eu sou rico porque tenho você."',
}

// Coração flutuante animado
function FloatingEmoji({ emoji, delay }) {
  return (
    <motion.span
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 2.2, delay, repeat: Infinity, ease: 'easeInOut' }}
      className="text-2xl select-none"
    >
      {emoji}
    </motion.span>
  )
}

// ============================================================
// Seção Sobre Nós
// ============================================================
export default function AboutUs() {
  return (
    <section className="relative py-28 px-4 overflow-hidden">
      {/* Fundo com gradiente animado sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0818] to-[#0a0818]" />
      <div className="absolute inset-0 animated-gradient opacity-20 pointer-events-none" />

      {/* Orbs decorativos */}
      <div className="absolute -top-20 left-1/2 w-[600px] h-[300px] bg-purple-700/8
                      rounded-full blur-[120px] -translate-x-1/2 pointer-events-none" />

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
            💕 Sobre nós
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mt-3">
            A nossa história
          </h2>
        </motion.div>

        {/* Layout de duas colunas */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Foto do casal */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            {/* Moldura decorativa externa */}
            <div className="absolute -inset-4 rounded-3xl border border-pink-500/15 pointer-events-none" />
            <div className="absolute -inset-8 rounded-3xl border border-purple-500/8 pointer-events-none" />

            <div
              className="relative rounded-3xl overflow-hidden aspect-[4/5]
                         shadow-2xl shadow-purple-900/40 group ring-1 ring-white/8"
            >
              <img
                src={ABOUT.couplePhoto}
                alt={ABOUT.names}
                className="w-full h-full object-cover transition-transform duration-700
                           group-hover:scale-105"
                onError={(e) => {
                  // Fallback quando a foto não existe
                  const el = e.target.parentElement
                  e.target.remove()
                  el.style.background = 'linear-gradient(135deg, #4c1d95 0%, #831843 100%)'
                  el.innerHTML = '<span style="font-size:6rem;display:flex;align-items:center;justify-content:center;height:100%">💕</span>'
                }}
              />
              {/* Degradê inferior */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-950/50 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className="space-y-6"
          >
            {/* Nomes */}
            <h3
              className="font-playfair font-bold text-transparent bg-clip-text
                         bg-gradient-to-r from-white via-pink-200 to-purple-200"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)' }}
            >
              {ABOUT.names}
            </h3>

            {/* Parágrafos */}
            {ABOUT.paragraphs.map((text, i) => (
              <p key={i} className="text-purple-200/65 leading-relaxed text-base md:text-lg">
                {text}
              </p>
            ))}

            {/* Citação */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="glass rounded-2xl p-6 border-l-4 border-pink-500 mt-2"
            >
              <p className="font-playfair text-lg md:text-xl italic text-pink-200 text-glow-pink leading-relaxed">
                {ABOUT.quote}
              </p>
            </motion.div>

            {/* Emojis flutuantes */}
            <div className="flex gap-3 pt-2">
              {['❤️', '💕', '💖', '💗', '💓'].map((emoji, i) => (
                <FloatingEmoji key={i} emoji={emoji} delay={i * 0.22} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
