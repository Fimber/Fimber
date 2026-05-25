import React, { useState, useEffect, lazy, Suspense } from 'react';
import {
  ArrowUpRight,
  Linkedin,
  ExternalLink,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

import { SERVICES, PROJECTS, EXPERIENCES, TESTIMONIALS } from './data';
import { BlogPost } from './types';
import { getCrawlablePosts, loadPostsFromStorage } from './lib/blogPosts';
import { navigateTo, parseRoute } from './lib/routes';
import { applyPageMeta, resolvePageMeta } from './lib/pageMeta';
import CustomCursor from './components/CustomCursor';
import Marquee from './components/Marquee';
import StatsCounter from './components/StatsCounter';
import CompanyLogo from './components/CompanyLogo';
import ExperienceTimelineItem from './components/ExperienceTimelineItem';
import SectionBackdrop from './components/SectionBackdrop';
import ScrollReveal from './components/ScrollReveal';
import SiteNav from './components/SiteNav';
import SiteFooter from './components/SiteFooter';
import ContactForm from './components/ContactForm';
import HeroImage from './components/HeroImage';

const AdminLoginModal = lazy(() => import('./components/AdminLoginModal'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostRoute = lazy(() => import('./pages/BlogPostRoute'));

function RouteFallback() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center text-slate-500 font-mono text-sm">
      Loading…
    </div>
  );
}

interface AppProps {
  /** Set during static pre-render at build time */
  prerenderPath?: string;
}

export default function App({ prerenderPath }: AppProps = {}) {
  const isPrerender = prerenderPath !== undefined;
  const [pathname, setPathname] = useState(
    () => prerenderPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/')
  );
  const route = parseRoute(pathname);

  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Published posts: defaults from data.ts (crawler-safe); localStorage merges in browser only
  const [posts, setPosts] = useState<BlogPost[]>(getCrawlablePosts);

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);

  // Smooth custom scroll handler of 1000ms (1 second) duration
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      if (targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
          const startPosition = window.scrollY;
          const distance = targetPosition - startPosition;
          let startTime: number | null = null;

          const animation = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / 1000, 1);
            
            const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
            
            window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));

            if (timeElapsed < 1000) {
              requestAnimationFrame(animation);
            }
          };

          requestAnimationFrame(animation);
        }
      } else {
        const startPosition = window.scrollY;
        const distance = -startPosition;
        let startTime: number | null = null;

        const animation = (currentTime: number) => {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / 1000, 1);
          
          const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
          
          window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));

          if (timeElapsed < 1000) {
            requestAnimationFrame(animation);
          }
        };

        requestAnimationFrame(animation);
      }
    }
  };

  const navigate = (path: string) => {
    const hashIndex = path.indexOf('#');
    const base = hashIndex >= 0 ? path.slice(0, hashIndex) || '/' : path;
    const hash = hashIndex >= 0 ? path.slice(hashIndex + 1) : '';

    if (base !== pathname) {
      navigateTo(base);
    }

    if (hash) {
      window.requestAnimationFrame(() => {
        const target = document.getElementById(hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    if (isPrerender) return;

    const handleScroll = () => {
      setNavScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);

    setPosts(loadPostsFromStorage());

    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', onPopState);
    };
  }, [isPrerender]);

  useEffect(() => {
    if (isPrerender) return;
    applyPageMeta(resolvePageMeta(pathname, posts));
  }, [pathname, posts, isPrerender]);

  const refreshBlogPosts = () => {
    if (isPrerender) return;
    setPosts(loadPostsFromStorage());
  };

  if (route.type === 'post') {
    return (
      <Suspense fallback={<RouteFallback />}>
        <BlogPostRoute id={route.id} posts={posts} />
      </Suspense>
    );
  }

  const handleAdminAuthSuccess = () => {
    setLoginModalOpen(false);
    setAdminPanelOpen(true);
  };

  const shell = (content: React.ReactNode) => (
    <div className="min-h-screen bg-[#080808] text-[#E0D8D0] relative flex flex-col font-sans">
      {!isPrerender && <CustomCursor />}
      <SiteNav
        pathname={pathname}
        navScrolled={navScrolled}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onNavigate={navigate}
        onAnchorClick={handleAnchorClick}
      />
      {content}
      <SiteFooter onAdminOpen={() => setLoginModalOpen(true)} />
      {(loginModalOpen || adminPanelOpen) && (
        <Suspense fallback={null}>
          <AdminLoginModal
            isOpen={loginModalOpen}
            onClose={() => setLoginModalOpen(false)}
            onSuccess={handleAdminAuthSuccess}
          />
          <AdminPanel
            isOpen={adminPanelOpen}
            onClose={() => setAdminPanelOpen(false)}
            onRefreshBlog={refreshBlogPosts}
          />
        </Suspense>
      )}
    </div>
  );

  if (route.type === 'blog') {
    return shell(
      <Suspense fallback={<RouteFallback />}>
        <BlogPage posts={posts} />
      </Suspense>
    );
  }

  return shell(
    <>
          <section className="relative min-h-screen pt-28 md:pt-36 pb-16 md:pb-20 px-6 md:px-12 flex flex-col justify-center overflow-hidden">
            <SectionBackdrop variant="hero" opacity="opacity-[0.35]" />
            <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[#D4AF37]/[0.015] via-transparent to-[#D4AF37]/[0.02] pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />
            <div className="absolute top-1/4 right-0 w-[min(520px,55vw)] h-[min(640px,70vh)] bg-[#5c3a1f]/20 rounded-full blur-[100px] pointer-events-none z-0" />

            {/* Micro grid pattern alignment */}
            <div className="absolute inset-0 z-0 opacity-[0.035] bg-[linear-gradient(rgba(212,175,55,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.06)_1px,transparent_1px)] [background-size:80px_80px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_20%,transparent_100%)] pointer-events-none" />

            <div className="max-w-6xl w-full mx-auto relative z-10 select-none">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 lg:items-stretch">
                {/* Copy column — top & bottom aligned with portrait */}
                <div className="order-2 lg:order-1 flex flex-col justify-between gap-8 lg:min-h-[min(68vh,600px)]">
                  <div className="space-y-6 lg:space-y-7">
                    <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] rounded-full px-4 py-1.5 font-mono text-xs tracking-widest uppercase animate-fadeIn">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                      <span>Open for content contracts</span>
                    </div>

                    <h1 className="font-syne text-[9vw] sm:text-[2.5rem] md:text-[3.25rem] lg:text-[3.75rem] xl:text-[4rem] font-extrabold text-[#E0D8D0] leading-[1.02] tracking-tighter animate-fadeIn">
                      I write technical content for B2B SaaS companies.{' '}
                      <span className="text-[#D4AF37]">I also write the code.</span>
                    </h1>
                  </div>

                  <div className="space-y-6 pt-6 border-t border-white/5">
                    <p className="text-slate-300 text-base md:text-lg font-light max-w-lg leading-relaxed">
                      I build the demo app, hit the errors, test the edge cases, then write the
                      tutorial. Companies like LogRocket, Permify, Decodo, and Refine hire me to do
                      this on repeat.
                    </p>

                    <div className="flex flex-wrap gap-3 sm:gap-4 items-center">
                      <a
                        href="#contact"
                        onClick={handleAnchorClick}
                        className="group bg-[#D4AF37] hover:bg-[#bfa030] active:scale-[0.98] text-[#080808] font-bold text-base py-3.5 px-7 rounded-full flex items-center gap-2.5 transition-all duration-300 shadow-xl shadow-[#D4AF37]/10 cursor-none"
                      >
                        <span>Start a Project</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>

                      <a
                        href="#work"
                        onClick={handleAnchorClick}
                        className="group bg-white/5 border border-white/10 hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 text-[#E0D8D0] font-bold text-base py-3.5 px-7 rounded-full flex items-center gap-2.5 transition-all duration-300 cursor-none"
                      >
                        <span>See My Work</span>
                        <ChevronRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="order-1 lg:order-2 flex justify-center lg:justify-end lg:h-full">
                  <div className="relative w-full max-w-[300px] sm:max-w-[340px] lg:max-w-none lg:w-full lg:max-w-[400px] lg:h-full lg:min-h-[min(68vh,600px)]">
                    <div className="absolute -inset-3 lg:-inset-4 bg-gradient-to-br from-[#D4AF37]/25 via-[#5c3a1f]/30 to-transparent rounded-[2rem] blur-2xl opacity-80" />
                    <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#D4AF37]/50 via-[#D4AF37]/10 to-transparent opacity-60" />
                    <div className="relative h-full min-h-[360px] sm:min-h-[400px] lg:min-h-0 overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50 bg-[#4a3020] aspect-[4/5] lg:aspect-auto">
                      <HeroImage />
                      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#080808] via-[#080808]/80 to-transparent pointer-events-none" />
                      <div className="absolute inset-x-0 bottom-0 p-5 pt-12">
                        <p className="font-syne text-xl font-bold text-white tracking-tight">Fimber Elemuwa</p>
                        <p className="text-sm text-[#D4AF37] font-mono tracking-wider mt-0.5 uppercase">
                          Technical Content Writer
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* About */}
          <section id="about" className="relative py-20 md:py-24 px-6 md:px-12 border-t border-white/5">
            <div className="max-w-3xl mx-auto w-full relative z-10">
              <ScrollReveal>
                <div className="space-y-6 text-slate-300 text-base md:text-lg font-light leading-relaxed">
                  <p>
                    I studied Medical Microbiology at the University of Port Harcourt. Yeah,
                    microbiology. Somewhere between bacterial gene expression and building side
                    projects in React, I figured out I was better at explaining technical systems
                    than most people who build them.
                  </p>
                  <p>
                    I started freelancing in 2022. Within 8 months I went from &ldquo;I think I want
                    to write&rdquo; to paid contracts with LogRocket, SitePoint, and In Plain English.
                    Two years later I was writing RBAC implementation guides for Permify, scraping
                    infrastructure docs for Decodo, and running content programs across saas.group&apos;s
                    entire portfolio.
                  </p>
                  <p>
                    I&apos;ve published over 100 technical articles. I&apos;ve managed a developer
                    publication with 50,000+ readers. I&apos;ve built content systems that drove 35%
                    organic growth for a web scraping API and landed #1 on Google for authorization
                    topics.
                  </p>
                  <p className="text-[#E0D8D0] font-normal">
                    I still code most days. That&apos;s the part that matters.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* 5. Endless Infinite Brand Slider */}
          <ScrollReveal>
            <Marquee />
          </ScrollReveal>

          {/* 6. Dynamic Rolling Counter Stats */}
          <ScrollReveal>
            <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <StatsCounter target={4} suffix="+" label="years writing for developer audiences" />
                <StatsCounter target={15} suffix="+" label="clients across B2B SaaS and devtools" />
                <StatsCounter target={100} suffix="+" label="articles published and ranking" />
                <StatsCounter target={100} suffix="%" label="contract renewal rate" />
              </div>
            </section>
          </ScrollReveal>

          {/* 7. Services Section */}
          <section id="services" className="relative py-24 px-6 md:px-12 max-w-6xl mx-auto w-full border-t border-white/5 overflow-hidden">
            <SectionBackdrop variant="services" opacity="opacity-50" />
            <ScrollReveal>
              <div className="mb-16 relative z-10">
                <h2 className="font-syne text-4xl md:text-5xl font-extrabold text-white leading-[1.05] tracking-tight">
                  What I Do
                </h2>
              </div>
            </ScrollReveal>

            {/* Services Grid with micro elevations */}
            <ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 rounded-3xl overflow-hidden border border-white/5 relative z-10">
                {SERVICES.map((srv, idx) => {
                  const isLastOdd =
                    idx === SERVICES.length - 1 && SERVICES.length % 2 !== 0;
                  return (
                  <div
                    key={srv.num}
                    className={`bg-[#0b0c10] hover:bg-[#13151c] p-8 md:p-12 transition-colors duration-400 relative group min-h-[320px] flex flex-col justify-between ${
                      isLastOdd ? 'md:col-span-2' : ''
                    }`}
                  >
                    {/* Subtle hover gradient circle */}
                    <div className="absolute -right-16 -top-16 w-32 h-32 bg-[#D4AF37]/[0.015] rounded-full blur-2xl group-hover:bg-[#D4AF37]/[0.04] transition-all duration-500" />
                    
                    <div>
                      <div className="flex justify-between items-center mb-10">
                        <span className="font-mono text-sm text-[#D4AF37]/40 tracking-widest">{srv.num}</span>
                      </div>

                      <h3 className="font-syne text-xl md:text-2xl font-bold text-white mb-4 tracking-tight">
                        {srv.title}
                      </h3>
                      
                      <p className="text-slate-300 text-base font-light leading-relaxed mb-6 whitespace-pre-line">
                        {srv.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5">
                      <p className="text-xs font-mono tracking-wide text-slate-500 uppercase mb-1">
                        Proof
                      </p>
                      <p className="text-sm text-[#D4AF37]/90 font-light leading-relaxed">
                        {srv.proof}
                        {srv.proofLink && (
                          <>
                            {' '}
                            <a
                              href={srv.proofLink.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline underline-offset-2 hover:text-[#D4AF37] transition-colors"
                            >
                              {srv.proofLink.label} →
                            </a>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </section>

          {/* Featured case study */}
          <section className="relative py-24 px-6 md:px-12 max-w-6xl mx-auto w-full border-t border-white/5">
            <ScrollReveal>
              <div className="relative z-10">
                <h2 className="font-syne text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight mb-8">
                  How I Grew Scrape.do&apos;s Organic Traffic by ~35%
                </h2>
                <div className="space-y-5 text-slate-300 text-base md:text-lg font-light leading-relaxed max-w-3xl">
                  <p>
                    Scrape.do needed developer-focused content to rank for competitive web scraping
                    keywords. Big players dominated the search results. Their blog was thin.
                  </p>
                  <p>
                    I wrote SDK guides, integration tutorials, and deep technical pieces on anti-bot
                    bypass, proxy rotation, TLS fingerprinting, and dynamic content handling. Every
                    article included working code samples that developers could actually run.
                  </p>
                  <p>
                    <span className="text-[#E0D8D0]">
                      Result: organic traffic grew approximately 35%. Several target keywords hit the
                      top 3 on Google. The content still ranks.
                    </span>
                  </p>
                </div>
                <a
                  href="https://scrape.do/authors/fimber/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-8 font-mono text-sm tracking-widest uppercase text-[#D4AF37] hover:text-[#bfa030] transition-colors"
                >
                  <span>See the live articles</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </ScrollReveal>
          </section>

          {/* 8. Selected Works / Projects */}
          <section id="work" className="relative py-24 bg-[#0b0c10]/40 border-y border-white/5 overflow-hidden">
            <SectionBackdrop variant="work" opacity="opacity-40" />
            <ScrollReveal>
              <div className="max-w-6xl mx-auto w-full px-6 md:px-12 relative z-10">
                <div className="mb-16">
                  <h2 className="font-syne text-4xl md:text-5xl font-extrabold text-white leading-[1.05] tracking-tight">
                    Selected Work
                  </h2>
                  <p className="text-slate-400 text-base font-light mt-4">
                    Want the full list?{' '}
                    <a
                      href="mailto:fimberelemuwa@gmail.com"
                      className="text-[#D4AF37] hover:underline underline-offset-2"
                    >
                      Email me.
                    </a>
                  </p>
                </div>

                {/* Projects Grid with Framer Motion hover mechanics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {PROJECTS.map((proj) => (
                    <a
                      key={`${proj.client}-${proj.link}`}
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`rounded-2xl p-8 flex flex-col justify-between min-h-[300px] transition-all duration-300 relative group cursor-none hover:-translate-y-1.5 ${
                        proj.featured
                          ? 'bg-[#13151c]/30 border border-[#D4AF37]/45 shadow-md shadow-[#D4AF37]/5 hover:border-[#D4AF37]/55 hover:bg-[#13151c]/50'
                          : 'bg-[#090b10] border border-white/5 hover:border-[#D4AF37]/20 hover:bg-[#13151c]/40'
                      }`}
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-start gap-4 text-sm font-mono">
                          <CompanyLogo
                            company={proj.client}
                            imageClassName="h-8 max-w-[110px]"
                          />
                          <span className="text-slate-600 shrink-0 pt-1">{proj.date.split('—')[0]}</span>
                        </div>

                        {proj.featured && (
                          <span className="inline-flex items-center gap-1.5 bg-[#D4AF37]/15 border border-[#D4AF37]/35 rounded-full px-3 py-1 text-xs font-mono font-semibold tracking-wider text-[#D4AF37] uppercase">
                            <BookOpen className="w-3 h-3" aria-hidden />
                            Interactive Docs
                          </span>
                        )}

                        <h3 className="font-syne text-lg font-bold text-white group-hover:text-white leading-snug tracking-tight">
                          {proj.title}
                        </h3>
                      </div>

                      <div className="space-y-4 mt-8 pt-6 border-t border-white/5">
                        <div className="flex flex-wrap gap-1.5">
                          {proj.metrics.map((metric, mIdx) => (
                            <span
                              key={mIdx}
                              className={`rounded-full px-3 py-0.5 text-xs font-medium tracking-wide ${
                                metric === 'Interactive Docs'
                                  ? 'bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] font-semibold'
                                  : 'bg-[#D4AF37]/5 border border-[#D4AF37]/15 text-[#D4AF37]'
                              }`}
                            >
                              {metric}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-sm text-slate-500 font-mono pt-2">
                          <span>{proj.featured ? 'Explore Live Docs' : 'Read Live Article'}</span>
                          {proj.featured ? (
                            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-slate-400 group-hover:text-[#D4AF37] transition-all" />
                          ) : (
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-slate-400 group-hover:text-[#D4AF37] transition-all" />
                          )}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* 9. Experience Chronology Timeline */}
          <section id="experience" className="relative py-24 px-6 md:px-12 max-w-6xl mx-auto w-full overflow-hidden">
            <SectionBackdrop variant="experience" opacity="opacity-40" />
            <ScrollReveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
                
                {/* Sticky timeline info left */}
                <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-4">
                  <h2 className="font-syne text-4xl font-extrabold text-white leading-tight tracking-tight">
                    Experience
                  </h2>
                  <p className="text-slate-300 text-base font-light leading-relaxed pt-4">
                    Four years writing for developer audiences across authorization, web scraping,
                    frontend architecture, and SaaS content programs.
                  </p>
                </div>

                {/* Rolling timelines list right */}
                <div className="lg:col-span-8 flex flex-col">
                  {EXPERIENCES.map((exp) => (
                    <div key={exp.company}>
                      <ExperienceTimelineItem exp={exp} />
                    </div>
                  ))}
                </div>

              </div>
            </ScrollReveal>
          </section>

          {/* 10. Testimonials Carousel / Grid */}
          <section className="relative py-24 bg-[#0b0c10]/50 border-t border-white/5 space-y-16 overflow-hidden">
            <SectionBackdrop variant="experience" opacity="opacity-25" />
            <ScrollReveal>
              <div className="max-w-6xl mx-auto w-full px-6 md:px-12 text-center md:text-left relative z-10">
                <h2 className="font-syne text-4xl md:text-5xl font-extrabold text-white leading-[1.05] tracking-tight">
                  What Clients Say
                </h2>
              </div>

              <div className="max-w-6xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 mt-16">
                {TESTIMONIALS.map((test, idx) => (
                  <div
                    key={idx}
                    className="bg-[#090b10] border border-white/5 rounded-2xl p-8 flex flex-col justify-between min-h-[300px] relative group hover:border-[#D4AF37]/10 transition-colors duration-350"
                  >
                    <p className="text-slate-300 font-light text-base leading-relaxed italic relative z-10">
                      "{test.quote}"
                    </p>

                    <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/5">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-syne text-sm font-bold ${test.colorClass}`}>
                        {test.initials}
                      </div>
                      <div>
                        <h4 className="font-syne text-sm font-bold text-white">{test.author}</h4>
                        <p className="text-xs text-slate-500 font-mono tracking-wider uppercase mt-0.5">{test.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </section>

          {/* 12. Modern CTA Core Segment */}
          <section id="contact" className="relative py-28 px-6 md:px-12 bg-gradient-to-t from-[#0b0c10] to-[#080808] overflow-hidden border-t border-white/5 text-center">
            <SectionBackdrop variant="contact" opacity="opacity-60" />
            {/* Visual tech glowing center circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/[0.025] rounded-full blur-3xl pointer-events-none z-0" />

            <ScrollReveal>
              <div className="max-w-4xl mx-auto relative z-10 space-y-8">
                <h2 className="font-syne text-4xl md:text-5xl font-extrabold text-[#ede9e0] leading-tight tracking-tight text-center">
                  Want to work together?
                </h2>

                <p className="text-slate-300 text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed text-center">
                  I take on 2–3 content contracts at a time. If you need technical tutorials,
                  developer docs, or a full content program for your SaaS product, reach out.
                  I&apos;ll get back to you within 24 hours.
                </p>

                <ContactForm />

                <div className="flex justify-center pt-2">
                  <a
                    href="https://www.linkedin.com/in/fimber-elemuwa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white/5 border border-white/10 hover:border-slate-500 hover:text-white text-slate-300 font-bold text-base py-4 px-8 rounded-full flex items-center gap-2.5 transition-all duration-300 cursor-none"
                  >
                    <Linkedin className="w-4 h-4 text-[#D4AF37]" />
                    <span>Connect on LinkedIn</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </section>

    </>
  );
}
