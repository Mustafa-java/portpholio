'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import Starfield from '@/components/Starfield';
import VideoBackground from '@/components/VideoBackground';
import {
  ArrowRight,
  ExternalLink,
  Globe,
  Mail,
  Menu,
  Moon,
  Send,
  Sparkles,
  SunMedium,
  X,
} from 'lucide-react';
import { dictionaries } from '@/data/dictionary';
import { projects, type Locale, type Project } from '@/data/projects';

type Theme = 'light' | 'dark';

const tools = ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Lenis', 'Vercel'];

const ease = [0.22, 1, 0.36, 1] as const;

const sectionReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease },
  },
};

function usePortfolioPreferences() {
  const [theme, setTheme] = useState<Theme>('light');
  const [locale, setLocale] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const savedTheme = window.localStorage.getItem('theme') as Theme | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const nextTheme = savedTheme ?? systemTheme;

    const savedLocale = window.localStorage.getItem('locale') as Locale | null;
    const browserLocale = window.navigator.language.toLowerCase().startsWith('ru') ? 'ru' : 'en';
    const nextLocale = savedLocale ?? browserLocale;

    root.dataset.theme = nextTheme;
    setTheme(nextTheme);
    setLocale(nextLocale);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = locale;
    window.localStorage.setItem('locale', locale);
  }, [locale, mounted]);

  return { theme, setTheme, locale, setLocale, mounted };
}

function useLenis() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };

    frame = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);
}

function AnimatedHeadline({ text }: { text: string }) {
  const words = text.split(' ');

  return (
    <span className="text-balance">
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="hero-word mr-[0.16em] inline-block sm:mr-[0.18em] lg:mr-[0.2em]">
          <motion.span
            initial={{ y: '102%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease, delay: 0.05 * index }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden rounded-full border border-border/70 bg-surface/80 py-2.5 backdrop-blur-xl sm:py-3">
      <div className="marquee-track flex min-w-max gap-6 px-4 sm:gap-10 sm:px-6">
        {doubled.map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.2em] text-muted sm:gap-3 sm:text-sm sm:tracking-[0.24em]">
            <Sparkles className="h-3 w-3 text-accent sm:h-3.5 sm:w-3.5" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <motion.div
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="max-w-4xl space-y-4 sm:space-y-5"
    >
      <p className="text-[11px] uppercase tracking-[0.24em] text-muted sm:text-sm sm:tracking-[0.28em]">{eyebrow}</p>
      <h2 className="text-balance font-display text-[2.2rem] font-semibold leading-[1.02] tracking-[-0.02em] sm:text-5xl lg:text-[3.7rem]">
        {title}
      </h2>
      {subtitle ? <p className="max-w-3xl text-base leading-7 text-muted sm:text-lg sm:leading-8">{subtitle}</p> : null}
    </motion.div>
  );
}

function HeroPreviewStack({ locale }: { locale: Locale }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease, delay: 0.18 }}
      className="relative h-[25rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0f1018] shadow-[0_30px_120px_rgba(10,10,18,0.35)] sm:h-[32rem] sm:rounded-[2.5rem] lg:h-[41rem]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,130,255,0.28),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,122,92,0.22),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.00))]" />

      <div className="absolute left-4 right-4 top-4 z-20 hidden items-center justify-between rounded-full border border-white/10 bg-black/24 px-4 py-2 text-white/75 backdrop-blur-xl sm:left-6 sm:right-6 sm:top-6 lg:flex">
        <div className="flex items-center gap-2">
          <span className="browser-dot bg-[#ff5f57]" />
          <span className="browser-dot bg-[#febc2e]" />
          <span className="browser-dot bg-[#28c840]" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.22em] sm:text-xs">{projects[0].category[locale]}</span>
      </div>

      <div className="absolute inset-x-0 bottom-0 top-0 z-10 overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]">
          <motion.div
            initial={{ x: 40, y: 28, rotate: 6, opacity: 0 }}
            animate={{ x: 0, y: 0, rotate: 6, opacity: 1 }}
            transition={{ duration: 0.9, ease, delay: 0.35 }}
            className="absolute right-[-28%] top-[18%] hidden h-[46%] w-[78%] overflow-hidden rounded-[1.6rem] border border-white/12 shadow-[0_18px_50px_rgba(0,0,0,0.28)] sm:block sm:right-[-8%] sm:top-[18%] sm:h-[52%] sm:w-[62%] lg:right-[-2%] lg:top-[14%] lg:h-[58%] lg:w-[58%]"
          >

          <Image src={projects[1].images.desktop} alt={`${projects[1].name} preview`} fill className="object-cover object-top" sizes="(min-width: 1024px) 34vw, 60vw" />
        </motion.div>

          <motion.div
            initial={{ x: -40, y: 36, rotate: -6, opacity: 0 }}
            animate={{ x: 0, y: 0, rotate: -6, opacity: 1 }}
            transition={{ duration: 0.9, ease, delay: 0.48 }}
            className="absolute left-[-24%] top-[30%] hidden h-[42%] w-[74%] overflow-hidden rounded-[1.6rem] border border-white/12 shadow-[0_18px_50px_rgba(0,0,0,0.28)] sm:block sm:left-[-8%] sm:top-[30%] sm:h-[48%] sm:w-[58%] lg:left-[-2%] lg:top-[28%] lg:h-[54%] lg:w-[54%]"
          >

          <Image src={projects[2].images.desktop} alt={`${projects[2].name} preview`} fill className="object-cover object-top" sizes="(min-width: 1024px) 30vw, 54vw" />
        </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease, delay: 0.22 }}
            className="absolute left-1/2 top-[12%] h-[76%] w-[82%] -translate-x-1/2 overflow-hidden rounded-[1.4rem] border border-white/14 shadow-[0_30px_70px_rgba(0,0,0,0.35)] sm:top-[16%] sm:h-[64%] sm:w-[54%] sm:rounded-[1.8rem] lg:top-[12%] lg:h-[68%] lg:w-[52%]"
          >

          <Image src={projects[0].images.desktop} alt={`${projects[0].name} preview`} fill className="object-cover object-top" sizes="(min-width: 1024px) 36vw, 64vw" priority />
        </motion.div>
      </div>

      <div className="absolute inset-x-4 bottom-4 z-20 hidden rounded-[1.4rem] border border-white/10 bg-black/28 p-4 text-white backdrop-blur-xl sm:inset-x-6 sm:bottom-6 sm:p-5 lg:block">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/66 sm:text-xs">Featured previews</p>
            <p className="mt-2 font-display text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">{projects[0].name} · {projects[1].name} · {projects[2].name}</p>
          </div>
          <div className="hidden rounded-full bg-white px-4 py-2 text-sm font-medium text-[#111114] md:inline-flex">
            {locale === 'ru' ? 'Живые проекты' : 'Live projects'}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCaseStudy({ project, locale, copy, index }: { project: Project; locale: Locale; copy: (typeof dictionaries)['en']; index: number }) {
  const reversed = index % 2 === 1;

  return (
    <motion.article
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.16 }}
      className="relative overflow-hidden rounded-[1.8rem] border border-border/70 bg-surface/88 shadow-soft backdrop-blur-xl sm:rounded-[2.3rem]"
    >
      <div className={`grid gap-0 lg:grid-cols-2 ${reversed ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''}`}>
        <div className="relative overflow-hidden border-b border-border/70 bg-[#ecebf3] dark:bg-[#101018] lg:border-b-0 lg:border-r lg:border-border/70">
          <div className="flex items-center justify-between border-b border-border/70 px-4 py-3.5 sm:px-5 sm:py-4">
            <div className="flex items-center gap-2">
              <span className="browser-dot bg-[#ff5f57]" />
              <span className="browser-dot bg-[#febc2e]" />
              <span className="browser-dot bg-[#28c840]" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted sm:text-xs">{copy.work.preview}</span>
          </div>

          <Link href={project.liveUrl} target="_blank" rel="noreferrer" className="group block">
            <div className="relative aspect-[0.92/1] sm:aspect-[1.08/1] lg:aspect-[1/1] xl:aspect-[1.08/1]">
              <Image
                src={project.images.desktop}
                alt={`${project.name} desktop preview`}
                fill
                className="hidden object-cover object-top transition-transform duration-700 ease-out md:block group-hover:scale-[1.03]"
                sizes="(min-width: 1280px) 46vw, (min-width: 1024px) 48vw, 100vw"
                priority={index === 0}
              />
              <Image
                src={project.images.mobile}
                alt={`${project.name} mobile preview`}
                fill
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] md:hidden"
                sizes="100vw"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/38 via-transparent to-transparent" />
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-[1.2rem] border border-white/12 bg-black/28 px-4 py-3 text-white backdrop-blur-xl sm:inset-x-5 sm:bottom-5">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/66">{project.category[locale]}</p>
                  <p className="mt-1 font-display text-xl font-semibold sm:text-2xl">{project.name}</p>
                </div>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#111114]">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex flex-col justify-between p-5 sm:p-8 lg:p-10 xl:p-12">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
              <span>{project.category[locale]}</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span>{project.name}</span>
            </div>

            <div className="space-y-4">
              <h3 className="font-display text-[2rem] font-semibold leading-[1.02] tracking-[-0.02em] sm:text-[2.6rem]">
                {project.name}
              </h3>
              <p className="max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">{project.description[locale]}</p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {project.tags[locale].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border/80 bg-background/70 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-muted backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-5 text-sm font-medium text-white transition hover:opacity-95"
            >
              {copy.work.live}
            </Link>
            <div className="text-sm text-muted">{locale === 'ru' ? 'Desktop + mobile preview' : 'Desktop + mobile preview'}</div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function HomePage() {
  useLenis();

  const { locale, setLocale, theme, setTheme, mounted } = usePortfolioPreferences();
  const [menuOpen, setMenuOpen] = useState(false);
  const copy = useMemo(() => dictionaries[locale], [locale]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const toggleLocale = () => setLocale(locale === 'en' ? 'ru' : 'en');

  return (
    <main className="relative overflow-x-hidden text-foreground">
      <VideoBackground />
      <Starfield />
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="animated-grid absolute inset-0 opacity-[0.15]" />
        <div className="absolute left-[8%] top-[10rem] hidden h-[28rem] w-[28rem] rounded-full border border-border/40 lg:block" />
        <div className="absolute right-[10%] top-[16rem] hidden h-[20rem] w-[20rem] rounded-full border border-border/30 lg:block" />
        <div className="absolute left-1/2 top-[8rem] hidden h-[40rem] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border/40 to-transparent xl:block" />
        <div className="noise absolute inset-0 opacity-[0.10]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-border/30 bg-background/40 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <Link href="#hero" className="font-display text-lg font-semibold tracking-tight">
            Landings_Akyl
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
            <Link href="#work" className="transition-colors hover:text-foreground">
              {copy.nav.work}
            </Link>
            <Link href="#about" className="transition-colors hover:text-foreground">
              {copy.nav.about}
            </Link>
            <Link href="#process" className="transition-colors hover:text-foreground">
              {copy.nav.process}
            </Link>
            <Link href="#contact" className="transition-colors hover:text-foreground">
              {copy.nav.contact}
            </Link>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              aria-label="Toggle language"
              onClick={toggleLocale}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-border/70 bg-surface/80 px-4 text-sm text-muted backdrop-blur-xl transition hover:text-foreground"
            >
              <Globe className="h-4 w-4" />
              {mounted ? locale.toUpperCase() : 'EN'}
            </button>

            <button
              type="button"
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-surface/80 text-muted backdrop-blur-xl transition hover:text-foreground"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 20, scale: 0.8 }}
                  transition={{ duration: 0.24 }}
                  className="absolute"
                >
                  {theme === 'light' ? <Moon className="h-4 w-4" /> : <SunMedium className="h-4 w-4" />}
                </motion.span>
              </AnimatePresence>
            </button>

            <Link
              href="#contact"
              className="inline-flex h-10 items-center rounded-full bg-accent px-5 text-sm font-medium text-white shadow-[0_14px_40px_rgba(79,70,229,0.28)] transition hover:-translate-y-0.5 hover:opacity-95"
            >
              {copy.nav.cta}
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-surface/80 backdrop-blur-xl md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-border/50 md:hidden"
            >
              <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 text-sm sm:px-6">
                <Link href="#work" onClick={() => setMenuOpen(false)}>
                  {copy.nav.work}
                </Link>
                <Link href="#about" onClick={() => setMenuOpen(false)}>
                  {copy.nav.about}
                </Link>
                <Link href="#process" onClick={() => setMenuOpen(false)}>
                  {copy.nav.process}
                </Link>
                <Link href="#contact" onClick={() => setMenuOpen(false)}>
                  {copy.nav.contact}
                </Link>
                <div className="flex items-center gap-3 pt-2">
                  <button type="button" onClick={toggleLocale} className="rounded-full border border-border px-4 py-2">
                    {mounted ? locale.toUpperCase() : 'EN'}
                  </button>
                  <button type="button" onClick={toggleTheme} className="rounded-full border border-border px-4 py-2">
                    {theme === 'light' ? 'Dark' : 'Light'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <section id="hero" className="mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8 lg:pb-28 lg:pt-20">
        <div className="lg:grid lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-10">
          <motion.div initial="hidden" animate="visible" variants={sectionReveal} className="space-y-5 sm:space-y-8 lg:space-y-10">
            <div className="inline-flex max-w-full rounded-full border border-border/70 bg-surface/75 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.24em] text-muted backdrop-blur-xl sm:text-xs">
              {copy.hero.eyebrow}
            </div>

            <div className="space-y-5 sm:space-y-6">
              <h1 className="max-w-[13ch] overflow-visible pb-[0.18em] font-display text-[2.15rem] font-semibold leading-[1.06] tracking-[-0.012em] sm:max-w-5xl sm:text-[4rem] sm:leading-[1.02] sm:tracking-[-0.018em] lg:text-[5.45rem] lg:tracking-[-0.02em]">
                <AnimatedHeadline text={copy.hero.title} />
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.25 }}
                className="max-w-3xl text-base leading-7 text-muted sm:text-lg sm:leading-8"
              >
                {copy.hero.subtitle}
              </motion.p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              <Link
                href="#work"
                className="flex h-10 min-w-0 items-center justify-center rounded-full bg-accent px-4 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:opacity-95 sm:h-12 sm:w-auto sm:px-6"
              >
                {copy.hero.primary}
              </Link>
              <Link
                href="#contact"
                className="flex h-10 min-w-0 items-center justify-center rounded-full border border-border/70 bg-surface/75 px-4 text-sm font-medium backdrop-blur-xl transition hover:border-accent hover:text-accent sm:h-12 sm:w-auto sm:px-6"
              >
                {copy.hero.secondary}
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.5 }}
              className="max-w-full"
            >
              <Marquee items={copy.hero.marquee} />
            </motion.div>
          </motion.div>

          <div className="hidden lg:block lg:pl-4">
            <HeroPreviewStack locale={locale} />
          </div>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={copy.work.eyebrow} title={copy.work.title} subtitle={copy.work.subtitle} />
        </div>

        <div className="grid gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <ProjectCaseStudy key={project.slug} project={project} locale={locale} copy={copy} index={index} />
          ))}
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative overflow-hidden rounded-[2.4rem] border border-border/70 bg-surface/82 p-6 shadow-soft backdrop-blur-2xl sm:p-8"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(79,70,229,0.18),transparent_28%),radial-gradient(circle_at_78%_76%,rgba(255,122,92,0.14),transparent_26%)]" />
            <div className="relative z-10">
              <p className="text-sm uppercase tracking-[0.24em] text-muted">{copy.about.eyebrow}</p>

              <div className="mt-8 rounded-[2rem] border border-border/70 bg-background/68 p-5 backdrop-blur-xl sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.26em] text-muted">Visual signals</p>
                    <p className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
                      Direction before decoration.
                    </p>
                  </div>
                  <div className="mt-1 h-3 w-3 rounded-full bg-accent shadow-[0_0_24px_rgba(79,70,229,0.45)]" />
                </div>

                <div className="mt-8 grid gap-3">
                  <div className="flex flex-col gap-1 rounded-[1.35rem] border border-border/70 bg-surface/86 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-sm text-muted">Tone match</span>
                    <span className="font-medium">SaaS / Agency / Luxury</span>
                  </div>
                  <div className="flex flex-col gap-1 rounded-[1.35rem] border border-border/70 bg-surface/86 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-sm text-muted">Focus</span>
                    <span className="font-medium">Typography / Motion / CTA</span>
                  </div>
                  <div className="flex flex-col gap-1 rounded-[1.35rem] border border-border/70 bg-surface/86 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-sm text-muted">Result</span>
                    <span className="font-medium">Premium first impression</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-[2rem] border border-border/70 bg-surface/82 p-6 shadow-soft backdrop-blur-2xl sm:rounded-[2.4rem] sm:p-10 lg:p-12"
          >
            <h2 className="font-display text-[2.15rem] font-semibold leading-[1.02] tracking-[-0.02em] sm:text-[3.35rem] lg:text-[3.85rem]">
              {copy.about.title}
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
              {copy.about.body}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[copy.about.statOne, copy.about.statTwo, copy.about.statThree].map((stat, index) => (
                <motion.div
                  key={stat}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease, delay: index * 0.08 }}
                  className="rounded-[1.6rem] border border-border/70 bg-background/72 px-5 py-6 backdrop-blur-xl"
                >
                  <p className="font-display text-xl font-semibold">{stat}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="process" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading eyebrow={copy.process.eyebrow} title={copy.process.title} />

        <div className="mt-12 grid gap-6 lg:grid-cols-4">
          {copy.process.steps.map(([step, description], index) => (
            <motion.div
              key={step}
              variants={sectionReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08 }}
              className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-surface/82 p-7 shadow-soft backdrop-blur-2xl"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
              <div className="mb-8 flex items-center gap-4">
                <span className="font-display text-3xl font-semibold tracking-tight">0{index + 1}</span>
                <div className="h-px flex-1 bg-border/80" />
              </div>
              <h3 className="font-display text-2xl font-semibold tracking-tight">{step}</h3>
              <p className="mt-4 text-base leading-7 text-muted">{description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-[2.4rem] border border-border/70 bg-surface/82 p-8 shadow-soft backdrop-blur-2xl sm:p-10"
          >
            <p className="text-sm uppercase tracking-[0.24em] text-muted">{copy.tools.eyebrow}</p>
            <h2 className="mt-4 text-balance font-display text-4xl font-semibold leading-[1] tracking-[-0.02em] sm:text-5xl">
              {copy.tools.title}
            </h2>
            <div className="mt-10 flex flex-wrap gap-3">
              {tools.map((tool, index) => (
                <motion.span
                  key={tool}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, ease, delay: index * 0.05 }}
                  className="rounded-full border border-border/80 bg-background/72 px-4 py-2 text-sm font-medium text-muted backdrop-blur-xl"
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-[2.4rem] border border-border/70 bg-surface/82 p-8 shadow-soft backdrop-blur-2xl sm:p-10"
          >
            <p className="text-sm uppercase tracking-[0.24em] text-muted">{copy.value.eyebrow}</p>
            <h2 className="mt-4 text-balance font-display text-4xl font-semibold leading-[1] tracking-[-0.02em] sm:text-5xl">
              {copy.value.title}
            </h2>
            <ul className="mt-8 space-y-4">
              {copy.value.items.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, ease, delay: index * 0.06 }}
                  className="flex gap-3 text-base leading-7 text-muted"
                >
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_20px_rgba(79,70,229,0.5)]" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative overflow-hidden rounded-[2.5rem] border border-border/70 bg-surface/82 p-8 shadow-[0_30px_100px_rgba(16,16,24,0.08)] backdrop-blur-2xl sm:p-10 lg:p-12"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(255,122,92,0.14),transparent_32%)]" />
          <div className="relative z-10">
            <p className="text-[11px] uppercase tracking-[0.24em] text-muted sm:text-sm">{copy.contact.eyebrow}</p>
            <div className="mt-5 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-8">
              <div>
                <h2 className="text-balance font-display text-[2.2rem] font-semibold leading-[1.02] tracking-[-0.02em] sm:text-5xl lg:text-[3.7rem]">
                  {copy.contact.title}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:mt-5 sm:text-lg sm:leading-8">{copy.contact.subtitle}</p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <a
                  href="mailto:akylakk01@gmail.com"
                  className="flex flex-col gap-2 rounded-[1.5rem] border border-border/80 bg-background/72 px-5 py-4 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-accent sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="flex items-center gap-3 text-sm font-medium">
                    <Mail className="h-4 w-4 text-accent" />
                    {copy.contact.email}
                  </span>
                  <span className="text-sm text-muted">akylakk01@gmail.com</span>
                </a>

                <a
                  href="https://t.me/landings_akyl"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col gap-2 rounded-[1.5rem] border border-border/80 bg-background/72 px-5 py-4 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-accent sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="flex items-center gap-3 text-sm font-medium">
                    <Send className="h-4 w-4 text-accent" />
                    {copy.contact.telegram}
                  </span>
                  <span className="text-sm text-muted">t.me/landings_akyl</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-border/50">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>{copy.footer.copyright}</p>
          <div className="flex items-center gap-4">
            <a href="mailto:akylakk01@gmail.com" className="transition-colors hover:text-foreground">
              Email
            </a>
            <a
              href="https://t.me/landings_akyl"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Telegram
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
