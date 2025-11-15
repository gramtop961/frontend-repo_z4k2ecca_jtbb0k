import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles, Star, Menu, Instagram, Twitter, Linkedin, Play, Zap, Rocket } from 'lucide-react'

function useMagnetic() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const strength = 24
    const handle = (e) => {
      const rect = el.getBoundingClientRect()
      const relX = e.clientX - rect.left - rect.width / 2
      const relY = e.clientY - rect.top - rect.height / 2
      el.style.transform = `translate(${relX / strength}px, ${relY / strength}px)`
    }
    const reset = () => {
      el.style.transform = 'translate(0,0)'
    }
    el.addEventListener('mousemove', handle)
    el.addEventListener('mouseleave', reset)
    return () => {
      el.removeEventListener('mousemove', handle)
      el.removeEventListener('mouseleave', reset)
    }
  }, [])
  return ref
}

function Cursor() {
  const dot = useRef(null)
  useEffect(() => {
    const el = dot.current
    if (!el) return
    const move = (e) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return (
    <div className="pointer-events-none fixed inset-0 z-[60] mix-blend-difference">
      <div ref={dot} className="absolute -translate-x-1/2 -translate-y-1/2 size-4 rounded-full bg-white/90 shadow-[0_0_40px_8px_rgba(255,255,255,0.25)]" />
    </div>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <div className="fixed top-0 left-0 right-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between rounded-full border border-white/10 bg-white/10 backdrop-blur-xl px-4 py-2">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-gradient-to-tr from-fuchsia-500 to-cyan-400" />
            <span className="font-semibold tracking-tight text-white">Studio Nova</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-white/80">
            <a className="hover:text-white transition-colors" href="#work">Works</a>
            <a className="hover:text-white transition-colors" href="#about">About</a>
            <a className="hover:text-white transition-colors" href="#contact">Contact</a>
          </div>
          <button onClick={() => setOpen(!open)} className="md:hidden text-white/80 hover:text-white"><Menu /></button>
          <div className="hidden md:block">
            <MagneticButton>
              <span className="mr-2">Start a project</span>
              <ArrowRight className="size-4" />
            </MagneticButton>
          </div>
        </div>
        {open && (
          <div className="md:hidden mt-3 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-4 text-white/90 space-y-4">
            <a className="block" href="#work">Works</a>
            <a className="block" href="#about">About</a>
            <a className="block" href="#contact">Contact</a>
          </div>
        )}
      </div>
    </div>
  )
}

function MagneticButton({ children }) {
  const ref = useMagnetic()
  return (
    <button ref={ref} className="group inline-flex items-center overflow-hidden rounded-full border border-white/20 bg-white/10 px-5 py-2 text-white backdrop-blur-xl transition-all hover:border-white/40">
      <span className="relative flex items-center">
        <span className="absolute -inset-6 -z-10 rounded-full bg-gradient-to-tr from-fuchsia-400/30 to-cyan-400/30 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
        {children}
      </span>
    </button>
  )
}

function GradientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 size-[90vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.25),transparent_60%)]" />
      <div className="absolute top-1/2 left-[12%] size-[30vmax] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.2),transparent_60%)] blur-2xl" />
      <div className="absolute bottom-[-10%] right-[-5%] size-[40vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.2),transparent_60%)] blur-3xl" />
      <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)' }} />
    </div>
  )
}

function Hero() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0 -z-0">
        <svg className="absolute -top-20 right-0 w-[900px] opacity-40" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#f0)">
            <path d="M463.5 333.5C435.7 415.3 304.5 476.4 223.5 455.5C142.5 434.7 130.7 331.8 158.5 250C186.3 168.2 253.6 108.4 334.6 129.2C415.6 150.1 491.3 251.7 463.5 333.5Z" fill="url(#g0)"/>
          </g>
          <defs>
            <linearGradient id="g0" x1="120" y1="120" x2="520" y2="520" gradientUnits="userSpaceOnUse">
              <stop stopColor="#22d3ee"/>
              <stop offset="1" stopColor="#a78bfa"/>
            </linearGradient>
            <filter id="f0" x="0" y="0" width="600" height="600" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feGaussianBlur stdDeviation="60"/>
            </filter>
          </defs>
        </svg>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-white/80 backdrop-blur-xl">
              <Sparkles className="size-4 text-cyan-300" />
              <span className="text-xs">Design that feels alive</span>
            </div>
            <h1 className="text-balance text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white">
              Digital experiences for brands that dare to stand out
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-white/70">
              We craft playful, high-performance websites blending motion, art direction and code. Built to win hearts and awwwards.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton>
                <Play className="mr-2 size-4" />
                See showreel
              </MagneticButton>
              <a href="#work" className="group inline-flex items-center text-white/80 hover:text-white">
                <span className="mr-2">Explore works</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            <div className="mt-10 flex items-center gap-6 text-white/70">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <span>Trusted by 120+ bold brands</span>
            </div>
          </div>

          <div className="relative">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-2 shadow-2xl backdrop-blur-xl">
              <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
                <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(34,211,238,0.25),transparent_30%,rgba(168,85,247,0.25))]" />
                <motion.img src="https://images.unsplash.com/photo-1520942702018-0862200e6873?q=80&w=1600&auto=format&fit=crop" alt="showcase" className="h-full w-full object-cover" initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 2, ease: 'easeOut' }} />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl bg-black/40 p-3 text-white backdrop-blur">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-full bg-gradient-to-tr from-fuchsia-500 to-cyan-400" />
                    <div>
                      <p className="text-sm font-medium">Nova Playgrounds</p>
                      <p className="text-xs text-white/70">Interactive microsite</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Zap className="size-4 text-cyan-300" />
                    <span>WebGL • Motion</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Marquee() {
  const items = ['Strategy', 'Design', 'Motion', '3D', 'WebGL', 'Branding']
  return (
    <div className="relative overflow-hidden py-6">
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      <div className="flex [--speed:40s]">
        {[0, 1].map((n) => (
          <div key={n} className="flex shrink-0 animate-[marquee_var(--speed)_linear_infinite] gap-8 pr-8">
            {items.map((t, i) => (
              <span key={i} className="inline-flex items-center gap-3 text-xl font-semibold tracking-tight text-white/80">
                <span className="rounded-full border border-white/15 px-4 py-1 text-white/70">{t}</span>
                <span className="size-1 rounded-full bg-white/30" />
              </span>
            ))}
          </div>
        ))}
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  )
}

function WorkCard({ title, tag, img }) {
  return (
    <motion.a href="#" whileHover={{ y: -6 }} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <div className="relative aspect-[16/10] overflow-hidden">
        <motion.img src={img} alt={title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80" />
        <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs text-white/80 backdrop-blur">{tag}</div>
      </div>
      <div className="flex items-center justify-between p-5 text-white">
        <div>
          <h3 className="font-semibold tracking-tight">{title}</h3>
          <p className="text-xs text-white/60">Case study</p>
        </div>
        <motion.div initial={{ rotate: -45 }} whileHover={{ rotate: 0 }} className="rounded-full border border-white/15 bg-white/10 p-2">
          <ArrowRight className="size-5" />
        </motion.div>
      </div>
    </motion.a>
  )
}

function Works() {
  const data = [
    { title: 'Aurora Spirits', tag: 'E-commerce', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop' },
    { title: 'Echo Festival', tag: 'Campaign', img: 'https://images.unsplash.com/photo-1536859355448-76f92ebdc33d?q=80&w=1600&auto=format&fit=crop' },
    { title: 'Nova Labs', tag: 'Product', img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1600&auto=format&fit=crop' },
    { title: 'Orbit Fitness', tag: 'Brand', img: 'https://images.unsplash.com/photo-1541534401786-2077eed87a72?q=80&w=1600&auto=format&fit=crop' },
  ]
  return (
    <section id="work" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">Selected Works</h2>
            <p className="mt-2 text-white/60">A taste of playful interfaces and bold identities.</p>
          </div>
          <a className="hidden sm:inline-flex items-center gap-2 text-white/80 hover:text-white" href="#">
            View all <ArrowRight className="size-4" />
          </a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((item, i) => (
            <WorkCard key={i} {...item} />
          ))}
          <div className="hidden lg:block">
            <div className="h-full rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-500/10 to-cyan-400/10 p-6 text-white">
              <div className="flex h-full flex-col items-start justify-between">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/70">
                    <Rocket className="size-3 text-cyan-300" />
                    Open for 2025
                  </div>
                  <h3 className="text-2xl font-semibold">We partner with brave teams</h3>
                  <p className="mt-2 text-sm text-white/70">Tell us about your wildest idea — we will make it tangible.</p>
                </div>
                <MagneticButton>
                  <span className="mr-2">Start a project</span>
                  <ArrowRight className="size-4" />
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Logos() {
  const logos = [
    'https://seeklogo.com/images/N/netflix-logo-0F1EDD3A1F-seeklogo.com.png',
    'https://seeklogo.com/images/A/airbnb-logo-6F78E3C77A-seeklogo.com.png',
    'https://seeklogo.com/images/N/notion-logo-4CE8FBF5C0-seeklogo.com.png',
    'https://seeklogo.com/images/F/figma-logo-4B30E73F80-seeklogo.com.png',
    'https://seeklogo.com/images/S/stripe-logo-4F5E367DCE-seeklogo.com.png',
  ]
  return (
    <div className="relative py-16">
      <div className="mx-auto max-w-6xl px-4">
        <p className="mb-6 text-center text-xs uppercase tracking-[0.2em] text-white/50">Teams that trust our craft</p>
        <div className="grid grid-cols-2 place-items-center gap-10 sm:grid-cols-3 md:grid-cols-5">
          {logos.map((src, i) => (
            <img key={i} src={src} className="h-8 opacity-60 invert" alt="logo" />
          ))}
        </div>
      </div>
    </div>
  )
}

function StripFeatures() {
  const features = [
    { icon: <Sparkles className="size-4" />, title: 'Art Direction', desc: 'Distinctive look & feel' },
    { icon: <Zap className="size-4" />, title: 'Micro-interactions', desc: 'Delight at every scroll' },
    { icon: <Star className="size-4" />, title: 'Performance', desc: 'Blazing-fast experiences' },
  ]
  return (
    <div className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((f, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white backdrop-blur">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/70">
                {f.icon}
                <span>{f.title}</span>
              </div>
              <p className="text-white/80">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CTA() {
  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-fuchsia-500/10 to-cyan-400/10 p-1">
          <div className="rounded-[1.6rem] bg-black/50 p-10 text-center text-white backdrop-blur-xl">
            <p className="mx-auto max-w-2xl text-balance text-3xl sm:text-4xl font-bold tracking-tight">
              Ready to create something unforgettable?
            </p>
            <p className="mt-4 text-white/70">We blend motion, narrative and engineering into living brands.</p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <MagneticButton>
                <span className="mr-2">Book discovery call</span>
                <ArrowRight className="size-4" />
              </MagneticButton>
              <a className="inline-flex items-center gap-2 text-white/80 hover:text-white" href="#work">See case studies</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-10 text-white/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-gradient-to-tr from-fuchsia-500 to-cyan-400" />
            <span className="text-white">Studio Nova</span>
          </div>
          <div className="flex items-center gap-4">
            <a className="hover:text-white" href="#"><Instagram className="size-5" /></a>
            <a className="hover:text-white" href="#"><Twitter className="size-5" /></a>
            <a className="hover:text-white" href="#"><Linkedin className="size-5" /></a>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-white/50">© {new Date().getFullYear()} Studio Nova. Crafted with love and motion.</p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen text-white">
      <GradientBackground />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Logos />
        <StripFeatures />
        <Works />
        <CTA />
      </main>
    </div>
  )
}
