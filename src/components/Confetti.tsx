import { useEffect, useRef } from 'react'

const COLORS = ['#8c1515', '#b83a4b', '#f9f6ef', '#d2c295', '#3f7d4c', '#c19a2b']

/** Lightweight canvas confetti burst; unmounts itself via onDone. */
export function Confetti({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onDone()
      return
    }
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    const dpr = window.devicePixelRatio || 1
    const w = (canvas.width = window.innerWidth * dpr)
    const h = (canvas.height = window.innerHeight * dpr)

    const pieces = Array.from({ length: 160 }, (_, i) => {
      const fromLeft = i % 2 === 0
      return {
        x: fromLeft ? 0 : w,
        y: h * 0.7,
        vx: (fromLeft ? 1 : -1) * (6 + Math.random() * 12) * dpr,
        vy: -(14 + Math.random() * 14) * dpr,
        size: (6 + Math.random() * 6) * dpr,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
        color: COLORS[i % COLORS.length],
        tree: i % 16 === 0,
      }
    })

    let frame = 0
    let raf = 0
    const tick = () => {
      frame++
      ctx.clearRect(0, 0, w, h)
      for (const p of pieces) {
        p.vy += 0.45 * dpr
        p.vx *= 0.985
        p.x += p.vx
        p.y += p.vy
        p.rot += p.vr
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.globalAlpha = Math.max(0, 1 - frame / 150)
        if (p.tree) {
          // A tiny Stanford Tree.
          ctx.fillStyle = '#3f7d4c'
          ctx.beginPath()
          ctx.moveTo(0, -p.size * 1.2)
          ctx.lineTo(p.size * 0.8, p.size * 0.6)
          ctx.lineTo(-p.size * 0.8, p.size * 0.6)
          ctx.fill()
        } else {
          ctx.fillStyle = p.color
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
        }
        ctx.restore()
      }
      if (frame < 150) raf = requestAnimationFrame(tick)
      else onDone()
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-50 h-full w-full" aria-hidden />
}
