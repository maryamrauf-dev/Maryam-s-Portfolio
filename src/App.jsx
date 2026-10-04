import { useEffect, useRef, useState } from 'react'
import { Link, Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom'
import { Menu, X, Layout, Server, ShieldCheck, Brain, Wrench, MessageSquare } from 'lucide-react'
const Icons = { Layout, Server, ShieldCheck, Brain, Wrench, MessageSquare }
import { links, projects, experience, toolkit, certs } from './data.js'

const img = (n) => `${import.meta.env.BASE_URL}img/${n}.jpg`
const mail = links.email ? `mailto:${links.email}` : links.linkedin
const Mono = ({ children, className = '' }) => <span className={`font-mono text-[11px] tracking-wide uppercase ${className}`}>{children}</span>
const Arrow = () => <span className="arr" aria-hidden="true">↗</span>

function Reveal({ children, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { e.target.classList.add('in'); o.disconnect() } }, { threshold: .12 })
    o.observe(ref.current); return () => o.disconnect()
  }, [])
  return <div ref={ref} className={`rv ${className}`}>{children}</div>
}

const nav = ['About', 'Projects', 'Experience', 'Certificates', 'Contact']
function Nav() {
  const [sc, setSc] = useState(false), [open, setOpen] = useState(false), [act, setAct] = useState('')
  const go = useNavigate(), loc = useLocation()
  useEffect(() => {
    const f = () => { setSc(scrollY > 60); let a = ''; nav.forEach(n => { const el = document.getElementById(n.toLowerCase()); if (el && el.getBoundingClientRect().top < innerHeight * .4) a = n }); setAct(a) }
    f(); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f)
  }, [])
  const jump = (id) => (e) => { e.preventDefault(); setOpen(false); const run = () => document.getElementById(id)?.scrollIntoView(); if (loc.pathname !== '/') { go('/'); setTimeout(run, 80) } else run() }
  return (
    <header className={`fixed left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ${sc ? 'top-3 w-[min(94vw,760px)] rounded-full bg-ink text-off shadow-lg' : 'top-0 w-full max-w-[1400px] text-ink'} px-4 md:px-8 py-3`}>
      <nav aria-label="Main" className="flex items-center justify-between">
        <a href="#top" onClick={jump('top')} className="font-display text-xl font-extrabold">MR<span className="text-lime bg-ink rounded-full px-0.5">.</span></a>
        <ul className="hidden md:flex gap-1">{nav.map(n => <li key={n}><a href={`#${n.toLowerCase()}`} onClick={jump(n.toLowerCase())} aria-current={act === n ? 'true' : undefined} className={`px-3 py-1.5 rounded-full text-sm transition-colors hover:bg-lime hover:text-ink ${act === n ? 'bg-lime text-ink' : ''}`}>{n}</a></li>)}</ul>
        <button className="md:hidden p-1" aria-expanded={open} aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </nav>
      {open && <ul className={`md:hidden mt-3 pb-2 grid gap-1 ${sc ? '' : 'bg-off'}`}>{nav.map(n => <li key={n}><a href={`#${n.toLowerCase()}`} onClick={jump(n.toLowerCase())} className="block px-3 py-2 rounded-lg hover:bg-lime hover:text-ink">{n}</a></li>)}</ul>}
    </header>
  )
}

function Avatar() {
  const [m, setM] = useState([0, 0])
  const png = (n) => `${import.meta.env.BASE_URL}img/${n}.webp`
  return (
    <div className="relative mx-auto w-full max-w-[560px]" onMouseMove={(e) => { if (matchMedia('(prefers-reduced-motion:reduce)').matches) return; const r = e.currentTarget.getBoundingClientRect(); setM([(e.clientX - r.left) / r.width - .5, (e.clientY - r.top) / r.height - .5]) }} onMouseLeave={() => setM([0, 0])}>
      <div className="transition-transform duration-300 ease-out" style={{ transform: `translate(${m[0] * 8}px,${m[1] * 6}px)` }}>
        <div className="breathe relative">
          <img src={png('maryam')} alt="Illustration of Maryam Rauf in a lavender hijab and black blazer" className="block w-full h-auto"/>
          <img src={png('maryam-blink')} alt="" aria-hidden="true" className="blink absolute inset-0 w-full h-full"/>
        </div>
      </div>
    </div>
  )
}


function Hero() {
  return (
    <section id="top" className="min-h-screen px-5 md:px-10 pt-28 pb-0 grid lg:grid-cols-12 gap-10 items-center max-w-[1400px] mx-auto">
      <div className="lg:col-span-7">
        <Mono className="text-ink/65">Full-stack developer / AI engineering</Mono>
        <h1 className="mt-5 text-[clamp(38px,7.2vw,118px)]">Hi, I'm<br/><span className="bg-lav px-2 -mx-2">MARYAM</span> Rauf.</h1>
        <p className="mt-6 font-display text-2xl md:text-3xl font-medium tracking-tight">Full-stack development × AI engineering.</p>
        <p className="mt-3 max-w-[48ch] text-ink/75">I build web applications, work with APIs and data, and explore how AI can turn ideas into useful tools.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#projects" onClick={(e)=>{e.preventDefault();document.getElementById('projects').scrollIntoView()}} className="group bg-ink text-off px-6 py-3.5 rounded-full font-display font-extrabold hover:bg-lime hover:text-ink transition-colors">EXPLORE MY WORK <Arrow/></a>
          <a href="#contact" onClick={(e)=>{e.preventDefault();document.getElementById('contact').scrollIntoView()}} className="border border-ink px-6 py-3.5 rounded-full font-display font-extrabold hover:bg-lav transition-colors">LET'S CONNECT</a>
        </div>
      </div>
      <div className="lg:col-span-5 relative self-end"><Avatar/></div>
    </section>
  )
}

function ProjectCard({ p }) {
  return (
    <Reveal>
      <article className="group h-full flex flex-col">
        <Link to={`/project/${p.id}`} className="relative block" aria-label={`View ${p.title} case study`}>
          <div className="border border-ink bg-off overflow-hidden">
            <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-ink"><i className="w-2 h-2 rounded-full bg-lime"/><i className="w-2 h-2 rounded-full bg-lav"/><Mono className="ml-2 opacity-70">{p.id}.app</Mono></div>
            <div className="aspect-[16/10] bg-lav/30 flex items-center justify-center"><img src={img(p.img)} alt={`${p.title} application screenshot`} loading="lazy" className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"/></div>
          </div>
          <span className="absolute -bottom-3 left-3 bg-lime text-ink px-2.5 py-0.5 font-mono text-[10px] uppercase">↳ {p.note}</span>
        </Link>
        <div className="pt-7 flex-1 flex flex-col">
          <Mono className="opacity-70">{p.n} / {p.group === 'web' ? 'Full-stack' : 'AI / ML'}</Mono>
          <h3 className="mt-2 text-[clamp(26px,2.6vw,38px)]">{p.title}</h3>
          <p className="mt-2 text-sm opacity-85 max-w-[46ch]">{p.summary}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">{p.tags.slice(0, 5).map(t => <li key={t} className="font-mono text-[10px] border border-ink px-2 py-0.5 rounded-full transition-colors hover:bg-lime">{t}</li>)}</ul>
          <Link to={`/project/${p.id}`} className="mt-auto pt-5 self-start font-display font-extrabold text-sm"><span className="border-b-2 border-lime pb-0.5">VIEW CASE STUDY <Arrow/></span></Link>
        </div>
      </article>
    </Reveal>
  )
}

function Projects() {
  return (
    <section id="projects" className="px-5 md:px-10 pt-24 max-w-[1400px] mx-auto">
      <div className="flex items-end justify-between gap-4"><h2 className="text-[clamp(44px,8vw,120px)]">Selected<br/>work</h2><Mono className="text-ink/65 text-right">07 projects<br/>web + AI</Mono></div>
      <div className="mt-12 grid sm:grid-cols-2 gap-x-8 gap-y-14">{projects.map(p => <ProjectCard key={p.id} p={p}/>)}</div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="px-5 md:px-10 pt-28 max-w-[1400px] mx-auto">
      <h2 className="text-[clamp(44px,8vw,120px)]">Experience</h2>
      <ol className="mt-12 ml-2 md:ml-4 border-l border-ink">{experience.map(e => (
        <li key={e.role} className="relative pl-8 md:pl-14 pb-14 last:pb-2">
          <span className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full bg-lime border border-ink" aria-hidden="true"/>
          <Reveal><div className="grid md:grid-cols-12 gap-5">
            <div className="md:col-span-5"><Mono className="text-ink/65 block">{e.period || 'Dates — add in data.js'} · {e.mode}</Mono><h3 className="mt-2 text-[clamp(26px,2.8vw,40px)]">{e.role}</h3><p className="mt-1 font-display text-lg">{e.org}</p></div>
            <div className="md:col-span-7"><ul className="space-y-2.5 list-none">{e.bullets.map(b => <li key={b} className="pl-5 relative before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-2 before:h-2 before:bg-lime before:border before:border-ink">{b}</li>)}</ul>
              {e.cert && <img src={img(e.cert)} alt="NovaXccelerate internship certificate of completion" loading="lazy" className="mt-5 w-36 border border-ink"/>}</div>
          </div></Reveal>
        </li>))}</ol>
    </section>
  )
}

function Toolkit() {
  return (
    <section className="px-5 md:px-10 pt-28 max-w-[1400px] mx-auto" aria-labelledby="tk">
      <div className="flex items-end justify-between gap-4"><h2 id="tk" className="text-[clamp(44px,8vw,120px)]">What I<br/>work with</h2><Mono className="text-ink/65 text-right max-w-[26ch]">Grouped by purpose, not by proficiency</Mono></div>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">{toolkit.map((g, i) => { const I = Icons[g.i]; return (
        <Reveal key={g.t} className="h-full"><div className="h-full min-h-[270px] p-6 border border-ink bg-lav flex flex-col">
          <div className="flex items-center justify-between"><I size={20} aria-hidden="true"/><Mono className="opacity-70">0{i + 1}</Mono></div>
          <h3 className="mt-4 text-2xl">{g.t}</h3><p className="mt-1 text-sm opacity-75">{g.d}</p>
          <ul className="mt-5 flex flex-wrap content-start gap-2">{g.items.map(t => <li key={t} className="font-mono text-[11px] border border-ink px-2.5 py-1 rounded-full flex items-center gap-1.5 transition-colors hover:bg-lime"><i className="w-1.5 h-1.5 rounded-full bg-ink/60"/>{t}</li>)}</ul>
        </div></Reveal>) })}
      </div>
    </section>
  )
}

function Certificates() {
  return (
    <section id="certificates" className="px-5 md:px-10 pt-28 max-w-[1400px] mx-auto">
      <h2 className="text-[clamp(32px,4.8vw,70px)]">Certificates<br/>&amp; learning</h2>
      <div className="mt-10">{certs.map(c => (
        <Reveal key={c.t}><div className="grid md:grid-cols-12 gap-6 py-8 items-start">
          <div className="md:col-span-3">{c.img ? <img src={img(c.img)} alt={`${c.t} certificate preview`} loading="lazy" className="w-full border border-ink"/> : <div className="aspect-[4/3] bg-lav border border-ink p-4 flex items-end font-display font-extrabold text-2xl leading-none">{c.t}</div>}</div>
          <div className="md:col-span-5"><h3 className="text-3xl">{c.t}</h3><p className="mt-2 font-display">{c.p}</p><p className="mt-3 text-ink/80">{c.d}</p></div>
          <div className="md:col-span-4"><Mono className="block text-ink/65">{c.date}{c.dur && ` · ${c.dur}`}</Mono><ul className="mt-3 flex flex-wrap gap-1.5">{c.tags.map(t => <li key={t} className="font-mono text-[11px] border border-ink px-2 py-0.5 rounded-full">{t}</li>)}</ul>
            {c.url && <a href={c.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block font-display font-extrabold border-b-2 border-lime">View Certificate <Arrow/></a>}</div>
        </div></Reveal>))}</div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="px-5 md:px-10 pt-28 max-w-[1400px] mx-auto grid md:grid-cols-12 gap-8">
      <h2 className="md:col-span-5 text-[clamp(32px,4.8vw,70px)]">A little<br/>context</h2>
      <Reveal className="md:col-span-7"><div>
        <p className="font-display font-medium text-2xl md:text-4xl leading-tight tracking-tight">I like understanding how things work, then building something with what I learned.</p>
        <p className="mt-6 max-w-[58ch] text-ink/80">My work sits somewhere between full-stack development and AI engineering, from building web applications and APIs to experimenting with NLP, transformers, LLMs and intelligent systems.</p>
        <p className="mt-4 font-mono text-xs text-ink/65">I'm open to new opportunities and collaborations.</p>
      </div></Reveal>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="mt-32 bg-lav">
      <div className="px-5 md:px-10 py-24 max-w-[1400px] mx-auto">
        <h2 className="text-[clamp(42px,9.6vw,160px)] uppercase leading-[.85]">Got something to build?</h2>
        <p className="mt-8 max-w-[44ch] text-lg">Have an idea, a project, or something interesting to explore? Let's talk.</p>
        <a href={mail} {...(links.email ? {} : { target: '_blank', rel: 'noopener noreferrer' })} className="group mt-8 inline-block bg-ink text-off px-8 py-4 rounded-full font-display font-extrabold text-xl hover:bg-lime hover:text-ink transition-colors">LET'S TALK <Arrow/></a>
        <ul className="mt-14 pt-5 border-t border-ink flex flex-wrap gap-x-10 gap-y-3 font-display text-xl font-medium">
          {links.email && <li><a className="underline decoration-lime decoration-4 underline-offset-4" href={`mailto:${links.email}`}>Email</a></li>}
          <li><a className="underline decoration-lime decoration-4 underline-offset-4" href={links.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a className="underline decoration-lime decoration-4 underline-offset-4" href={links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        </ul>
        <footer className="mt-16 flex justify-between font-mono text-xs"><span>MR. © {new Date().getFullYear()} Maryam Rauf</span><a href="#top" onClick={(e)=>{e.preventDefault();scrollTo(0,0)}}>Back to top ↑</a></footer>
      </div>
    </section>
  )
}

function Section({ n, title, children }) {
  return <div className="grid md:grid-cols-12 gap-4 md:gap-10 py-9 border-t border-ink"><h2 className="md:col-span-3 font-display text-xl tracking-tight leading-tight"><Mono className="block text-ink/65 mb-2">{n}</Mono>{title}</h2><div className="md:col-span-9">{children}</div></div>
}
const Bul = ({ items }) => <ul className="space-y-2.5 max-w-[64ch]">{items.map(x => <li key={x} className="pl-5 relative before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-2 before:h-2 before:bg-lime before:border before:border-ink">{x}</li>)}</ul>

function Case() {
  const { id } = useParams(); const i = projects.findIndex(p => p.id === id); const p = projects[i]; const nx = projects[(i + 1) % projects.length]
  const go = useNavigate(); const backToProjects = () => { go('/'); setTimeout(() => document.getElementById('projects')?.scrollIntoView(), 80) }
  useEffect(() => { scrollTo(0, 0) }, [id])
  if (!p) return <div className="pt-40 px-10">Project not found. <Link to="/" className="underline">Back home</Link></div>
  return (
    <main className="px-5 md:px-10 pt-28 pb-10 max-w-[1400px] mx-auto">
      <button onClick={backToProjects} className="font-mono text-xs uppercase hover:bg-lime">← Back to projects</button>
      <Mono className="block mt-10 text-ink/65">{p.n} / {p.group === 'web' ? 'Full-stack' : 'AI / ML'}</Mono>
      <h1 className="mt-3 text-[clamp(38px,8.0vw,128px)]">{p.title}</h1>
      <p className="mt-4 font-display text-2xl max-w-[34ch]">{p.kind || p.summary}</p>
      <div className="mt-12">
        <Section n="01" title="Overview"><p className="max-w-[64ch]">{p.summary}</p></Section>
        <Section n="02" title="Problem or purpose"><p className="max-w-[64ch]">{p.purpose}</p></Section>
        <Section n="03" title="Features I implemented"><Bul items={p.features}/></Section>
        <Section n="04" title="Architecture and how it works"><ol className="flex flex-wrap items-center gap-2">{p.arch.map((a, k) => <li key={a} className="flex items-center gap-2"><span className="border border-ink px-3 py-2 font-mono text-xs bg-off border-l-4 border-l-lime">{a}</span>{k < p.arch.length - 1 && <span aria-hidden="true">→</span>}</li>)}</ol></Section>
        <Section n="05" title="Technical decisions and challenges"><Bul items={p.decisions}/></Section>
        <Section n="06" title="Technology stack"><ul className="flex flex-wrap gap-2">{p.stack.map(t => <li key={t} className="font-mono text-xs border border-ink px-2.5 py-1 rounded-full hover:bg-lime">{t}</li>)}</ul></Section>
        <Section n="07" title="Application walkthrough"><img src={img(p.img)} alt={`${p.title} interface`} loading="lazy" className="w-full max-w-[900px] border border-ink"/></Section>
        <Section n="08" title="Live demo">{p.live ? <a className="font-display font-extrabold border-b-2 border-lime" href={p.live} target="_blank" rel="noopener noreferrer">Open live demo ↗</a> : <p className="text-ink/70">No verified live URL yet.</p>}</Section>
        <Section n="09" title="Source code">{p.repo ? <a className="group bg-ink text-off px-6 py-3 rounded-full font-display font-extrabold inline-block hover:bg-lime hover:text-ink" href={p.repo} target="_blank" rel="noopener noreferrer">View on GitHub <Arrow/></a> : <p className="text-ink/70">No public repository linked.</p>}</Section>
      </div>
      <div className="mt-16 pt-8 border-t border-ink">
        <Mono className="text-ink/65">Next project</Mono>
        <Link to={`/project/${nx.id}`} className="group mt-4 grid sm:grid-cols-12 gap-6 items-center">
          <div className="sm:col-span-5 border border-ink"><div className="aspect-[16/10] bg-lav/30 flex items-center justify-center"><img src={img(nx.img)} alt={`${nx.title} preview`} loading="lazy" className="max-w-full max-h-full object-contain"/></div></div>
          <div className="sm:col-span-7"><Mono className="opacity-70">{nx.n} / {nx.group === 'web' ? 'Full-stack' : 'AI / ML'}</Mono><h3 className="mt-2 text-[clamp(30px,4vw,56px)]">{nx.title}</h3><p className="mt-2 max-w-[44ch] text-sm opacity-85">{nx.summary}</p><span className="mt-4 inline-block font-display font-extrabold border-b-2 border-lime">VIEW CASE STUDY <Arrow/></span></div>
        </Link>
        <button onClick={backToProjects} className="mt-10 border border-ink px-6 py-3 rounded-full font-display font-extrabold hover:bg-lime transition-colors">← BACK TO PROJECTS</button>
      </div>
    </main>
  )
}

const Home = () => <main><Hero/><Projects/><Experience/><Toolkit/><Certificates/><About/><Contact/></main>
export default function App() {
  return <><Nav/><Routes><Route path="/" element={<Home/>}/><Route path="/project/:id" element={<><Case/><Contact/></>}/></Routes></>
}
