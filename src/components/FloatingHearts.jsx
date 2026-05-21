import { useEffect, useState } from 'react'

/**
 * Corações que sobem aleatoriamente pelo fundo da tela.
 * Renderizados em posição fixa para não interferir no layout.
 */
export default function FloatingHearts() {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    const EMOJIS = ['❤️', '💕', '💖', '💗', '🩷']

    const spawn = () => {
      const heart = {
        id:       Date.now() + Math.random(),
        x:        Math.random() * 100,          // % horizontal
        duration: 7 + Math.random() * 7,        // segundos
        size:     0.7 + Math.random() * 1.1,    // rem
        emoji:    EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      }

      setHearts(prev => [...prev, heart])

      // Remove after animation
      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== heart.id))
      }, heart.duration * 1000)
    }

    // Spawn inicial
    spawn()
    const interval = setInterval(spawn, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {hearts.map(heart => (
        <span
          key={heart.id}
          className="floating-heart"
          style={{
            left:              `${heart.x}%`,
            bottom:            '-5%',
            fontSize:          `${heart.size}rem`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          {heart.emoji}
        </span>
      ))}
    </>
  )
}
