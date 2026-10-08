/** Line-art campus silhouette: redwoods, palms, Main Quad arcades, and Hoover Tower. */
export function Skyline({ className = '' }: { className?: string }) {
  const arches = (x0: number, n: number) =>
    Array.from({ length: n }, (_, i) => {
      const x = x0 + i * 13
      return `M${x} 40 V32 a4.5 4.5 0 0 1 9 0 V40`
    }).join(' ')

  return (
    <svg viewBox="0 0 320 42" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {/* ground */}
      <path d="M0 40.5 H320" />
      {/* redwoods */}
      <path d="M14 40 V34 M14 12 L22 26 H18 L24 34 H4 L10 26 H6 Z" />
      <path d="M306 40 V34 M306 12 L314 26 H310 L316 34 H296 L302 26 H298 Z" />
      {/* palms */}
      <path d="M44 40 C45 32 45 26 43 18 M43 18 C38 15 34 17 32 20 M43 18 C47 14 52 15 55 18 M43 18 C41 13 37 11 34 12 M43 18 C46 12 50 11 53 12" />
      <path d="M277 40 C276 32 276 26 278 18 M278 18 C283 15 287 17 289 20 M278 18 C274 14 269 15 266 18 M278 18 C280 13 284 11 287 12 M278 18 C275 12 271 11 268 12" />
      {/* Main Quad arcades with red-tile rooflines */}
      <path d="M66 40 V27 H146 V40 M63 27 L70 23 H142 L149 27" />
      <path d={arches(70, 6)} />
      <path d="M174 40 V27 H254 V40 M171 27 L178 23 H250 L257 27" />
      <path d={arches(178, 6)} />
      {/* Hoover Tower */}
      <path d="M152 40 V12 H168 V40 M154 12 V8 H166 V12 M156 8 C156 4 164 4 164 8 M160 4 V1" />
      <path d="M157 16 V22 M160 16 V22 M163 16 V22" />
    </svg>
  )
}
