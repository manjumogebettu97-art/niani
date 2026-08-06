import { useCallback, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import QuoteModal from '../components/form/QuoteModal'
import SiteFooter from '../components/layout/SiteFooter'
import SiteNav from '../components/layout/SiteNav'
import FilmGallery from '../FilmGallery'
import SpiralWhirlCanvas from '../SpiralWhirlCanvas'
import '../App.css'

gsap.registerPlugin(ScrollTrigger)

const floatingObjects = [
  {
    id: 'scene-1',
    type: 'image',
    src: `${import.meta.env.BASE_URL}atmosphere/fragment-suite.webp`,
    label: 'Suite fragment',
    top: '10%',
    left: '5%',
    width: '92px',
    height: '64px',
    rotate: -14,
    depth: 1.05,
  },
  {
    id: 'scene-2',
    type: 'image',
    src: `${import.meta.env.BASE_URL}atmosphere/fragment-living.webp`,
    label: 'Quiet living',
    top: '14%',
    left: '17%',
    width: '72px',
    height: '52px',
    rotate: 7,
    depth: 1.12,
  },
  {
    id: 'scene-3',
    type: 'image',
    src: `${import.meta.env.BASE_URL}atmosphere/fragment-mood.webp`,
    label: 'Mood layer',
    top: '12%',
    left: '83%',
    width: '98px',
    height: '70px',
    rotate: -9,
    depth: 1.25,
  },
  {
    id: 'scene-4',
    type: 'image',
    src: `${import.meta.env.BASE_URL}atmosphere/fragment-dining.webp`,
    label: 'Dining line',
    top: '18%',
    left: '92%',
    width: '82px',
    height: '58px',
    rotate: 12,
    depth: 1.12,
  },
  {
    id: 'scene-5',
    type: 'swatch',
    label: 'Walnut',
    style: {
      background: 'linear-gradient(135deg, #c3916d, #866042)',
    },
    top: '9%',
    left: '31%',
    width: '66px',
    height: '49px',
    rotate: -8,
    depth: 1,
  },
  {
    id: 'scene-6',
    type: 'texture',
    label: 'Linen',
    style: {
      background:
        'repeating-linear-gradient(65deg, rgba(238,227,209,0.98), rgba(238,227,209,0.98) 6px, rgba(222,206,184,0.98) 6px, rgba(222,206,184,0.98) 12px)',
    },
    top: '21%',
    left: '6%',
    width: '77px',
    height: '53px',
    rotate: 8,
    depth: 1.22,
  },
  {
    id: 'scene-7',
    type: 'image',
    src: `${import.meta.env.BASE_URL}atmosphere/fragment-seat.webp`,
    label: 'Seat detail',
    top: '26%',
    left: '88%',
    width: '90px',
    height: '66px',
    rotate: -8,
    depth: 1.3,
  },
  {
    id: 'scene-8',
    type: 'swatch',
    label: 'Burgundy',
    style: {
      background: 'linear-gradient(145deg, #8f1c2a, #50030c)',
    },
    top: '34%',
    left: '9%',
    width: '67px',
    height: '50px',
    rotate: -11,
    depth: 1.08,
  },
  {
    id: 'scene-9',
    type: 'image',
    src: `${import.meta.env.BASE_URL}atmosphere/fragment-shelf.webp`,
    label: 'Shelf curation',
    top: '39%',
    left: '4%',
    width: '87px',
    height: '62px',
    rotate: 13,
    depth: 1.22,
  },
  {
    id: 'scene-10',
    type: 'image',
    src: `${import.meta.env.BASE_URL}atmosphere/fragment-gallery.webp`,
    label: 'Gallery wall',
    top: '44%',
    left: '92%',
    width: '95px',
    height: '68px',
    rotate: -12,
    depth: 1.35,
  },
  {
    id: 'scene-11',
    type: 'texture',
    label: 'Stone',
    style: {
      background: 'radial-gradient(circle at 20% 22%, #f1e8d8, #cdbca3 44%, #a9977f)',
    },
    top: '52%',
    left: '9%',
    width: '80px',
    height: '57px',
    rotate: 9,
    depth: 1.12,
  },
  {
    id: 'scene-12',
    type: 'image',
    src: `${import.meta.env.BASE_URL}atmosphere/fragment-evening.webp`,
    label: 'Evening lounge',
    top: '56%',
    left: '86%',
    width: '93px',
    height: '66px',
    rotate: 11,
    depth: 1.15,
  },
  {
    id: 'scene-13',
    type: 'image',
    src: `${import.meta.env.BASE_URL}atmosphere/fragment-kitchen.webp`,
    label: 'Kitchen hush',
    top: '63%',
    left: '91%',
    width: '84px',
    height: '60px',
    rotate: -13,
    depth: 1.25,
  },
  {
    id: 'scene-14',
    type: 'swatch',
    label: 'Cloud light',
    style: {
      background: 'radial-gradient(circle at 35% 20%, #fff, #e9dcc4 65%, #c8b79e)',
    },
    top: '67%',
    left: '13%',
    width: '70px',
    height: '51px',
    rotate: 6,
    depth: 1.08,
  },
  {
    id: 'scene-15',
    type: 'image',
    src: `${import.meta.env.BASE_URL}atmosphere/fragment-table.webp`,
    label: 'Table line',
    top: '74%',
    left: '7%',
    width: '90px',
    height: '64px',
    rotate: -10,
    depth: 1.14,
  },
  {
    id: 'scene-16',
    type: 'swatch',
    label: 'Brass glow',
    style: {
      background: 'linear-gradient(140deg, #e1b66f, #98743f)',
    },
    top: '80%',
    left: '82%',
    width: '66px',
    height: '48px',
    rotate: -7,
    depth: 1.2,
  },
  {
    id: 'scene-17',
    type: 'image',
    src: `${import.meta.env.BASE_URL}atmosphere/fragment-oak.webp`,
    label: 'Smoked oak',
    top: '84%',
    left: '91%',
    width: '92px',
    height: '66px',
    rotate: 12,
    depth: 1.3,
  },
]

const thinkCards = [
  {
    id: 'material-palette',
    title: 'By material palette',
    image: `${import.meta.env.BASE_URL}atmosphere/think-material-palette.webp`,
    alt: 'Walnut, brass, linen and stone samples arranged on cream paper',
  },
  {
    id: 'visual-similarity',
    title: 'by visual similarity',
    image: `${import.meta.env.BASE_URL}atmosphere/think-visual-similarity.webp`,
    alt: 'Walnut shelf styled with neutral books, ceramic and brushed brass',
  },
  {
    id: 'without-noise',
    title: 'and without noise.',
    image: `${import.meta.env.BASE_URL}atmosphere/think-without-noise.webp`,
    alt: 'Quiet reading nook with a linen chair and brass floor lamp',
  },
]

const brandNames = [
  'Loro Piana',
  'B&B Italia',
  'Minotti',
  'Flos',
  'Poliform',
  'Baxter',
  'Gubi',
  'Vitra',
  'Muuto',
  'Audo',
]

const sampleReviews = [
  {
    quote: 'Niani made the entire process feel considered. Every material, proportion, and detail came together as one calm, beautiful home.',
    name: 'Sample client 01',
    project: 'Sample review · Residential interior',
    photo: 'sample-client-01.jpg',
  },
  {
    quote: 'The team understood how we wanted to live, not just how we wanted the rooms to look. The finished space feels distinctly ours.',
    name: 'Sample client 02',
    project: 'Sample review · Full-home renovation',
    photo: 'sample-client-02.jpg',
  },
  {
    quote: 'From the first conversation to the final styling, the experience was clear, collaborative, and attentive to the smallest details.',
    name: 'Sample client 03',
    project: 'Sample review · Interior styling',
    photo: 'sample-client-03.jpg',
  },
]

const worldStripSlides = [
  {
    id: 'modular-kitchen',
    keyword: 'modular kitchen',
    images: [
      {
        src: `${import.meta.env.BASE_URL}atmosphere/strip-kitchen-01.webp`,
        alt: 'Matte cream modular kitchen with walnut cabinetry and brass pulls',
      },
      {
        src: `${import.meta.env.BASE_URL}atmosphere/strip-kitchen-02.webp`,
        alt: 'Walnut and cream pantry wall with integrated handle channels',
      },
      {
        src: `${import.meta.env.BASE_URL}atmosphere/strip-kitchen-03.webp`,
        alt: 'Stone kitchen island beneath two brushed brass pendant lights',
      },
    ],
  },
  {
    id: 'renovation',
    keyword: 'renovation',
    images: [
      {
        src: `${import.meta.env.BASE_URL}atmosphere/strip-renovation-01.webp`,
        alt: 'Living room renovation pairing new walnut joinery with retained plaster',
      },
      {
        src: `${import.meta.env.BASE_URL}atmosphere/strip-renovation-02.webp`,
        alt: 'Finished dining area with an oval walnut table and cane chairs',
      },
      {
        src: `${import.meta.env.BASE_URL}atmosphere/strip-renovation-03.webp`,
        alt: 'Restored balcony with pale stone flooring and a teak bench',
      },
    ],
  },
  {
    id: 'pooja-room',
    keyword: 'pooja room',
    images: [
      {
        src: `${import.meta.env.BASE_URL}atmosphere/strip-pooja-01.webp`,
        alt: 'Carved teak mandir on a pale stone base with a brass diya',
      },
      {
        src: `${import.meta.env.BASE_URL}atmosphere/strip-pooja-02.webp`,
        alt: 'Pooja niche integrated into full-height walnut joinery',
      },
      {
        src: `${import.meta.env.BASE_URL}atmosphere/strip-pooja-03.webp`,
        alt: 'Traditional teak mandir with a geometric jali screen',
      },
    ],
  },
]

const spiralImageUrls = [
  ...floatingObjects.filter((item) => item.type === 'image').map((item) => item.src),
  ...thinkCards.map((card) => card.image),
  ...worldStripSlides.flatMap((slide) => slide.images.map((image) => image.src)),
]

const WORLD_SLIDE_INTERVAL = 5000
const WORLD_SLIDE_TRANSITION = 850
const WORLD_COLUMN_STAGGER = 1000
const THINK_SLIDE_INTERVAL = 3200
const THINK_SLIDE_TRANSITION = 700
const THINK_CAROUSEL_BREAKPOINT = '(max-width: 760px)'

const getIsMobileThinkCarousel = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia(THINK_CAROUSEL_BREAKPOINT).matches
}

function Home() {
  const shellRef = useRef(null)
  const heroSequenceRef = useRef(null)
  const rafRef = useRef(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [worldSlideIndex, setWorldSlideIndex] = useState(0)
  const [worldSlideInstant, setWorldSlideInstant] = useState(false)
  const [thinkSlideIndex, setThinkSlideIndex] = useState(0)
  const [thinkSlideInstant, setThinkSlideInstant] = useState(false)
  const [thinkCarouselPaused, setThinkCarouselPaused] = useState(false)
  const [isMobileThinkCarousel, setIsMobileThinkCarousel] = useState(getIsMobileThinkCarousel)
  const [quoteOpen, setQuoteOpen] = useState(false)

  const openQuoteModal = useCallback(() => {
    setMenuOpen(false)
    setQuoteOpen(true)
  }, [])
  const closeQuoteModal = useCallback(() => setQuoteOpen(false), [])

  const worldSlidesWithLoop = [...worldStripSlides, worldStripSlides[0]]
  const worldColumnCount = worldStripSlides[0].images.length
  const worldSlidePercent = 100 / worldSlidesWithLoop.length
  const activeWorldSlide = worldStripSlides[worldSlideIndex % worldStripSlides.length]
  const thinkSlidesWithLoop = [...thinkCards, thinkCards[0]]

  useEffect(() => {
    const media = window.matchMedia(THINK_CAROUSEL_BREAKPOINT)
    const handleChange = (event) => {
      const nextIsMobile = event.matches
      setIsMobileThinkCarousel(nextIsMobile)
      if (!nextIsMobile) {
        setThinkCarouselPaused(false)
        setThinkSlideInstant(false)
        setThinkSlideIndex(0)
      }
    }

    media.addEventListener('change', handleChange)

    return () => media.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (!isMobileThinkCarousel || thinkCarouselPaused) return

    const ticker = setInterval(() => {
      setThinkSlideIndex((current) => current + 1)
    }, THINK_SLIDE_INTERVAL)

    return () => clearInterval(ticker)
  }, [isMobileThinkCarousel, thinkCarouselPaused])

  useEffect(() => {
    if (!isMobileThinkCarousel || thinkSlideIndex < thinkCards.length) return

    const resetTimer = setTimeout(() => {
      setThinkSlideInstant(true)
      setThinkSlideIndex(0)
    }, THINK_SLIDE_TRANSITION + 60)

    return () => clearTimeout(resetTimer)
  }, [isMobileThinkCarousel, thinkSlideIndex])

  useEffect(() => {
    if (!isMobileThinkCarousel || !thinkSlideInstant) return

    const rafId = requestAnimationFrame(() => {
      setThinkSlideInstant(false)
    })

    return () => cancelAnimationFrame(rafId)
  }, [isMobileThinkCarousel, thinkSlideInstant])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ticker = setInterval(() => {
      setWorldSlideIndex((current) => current + 1)
    }, WORLD_SLIDE_INTERVAL)

    return () => clearInterval(ticker)
  }, [])

  useEffect(() => {
    if (worldSlideIndex < worldStripSlides.length) return

    const resetDelay = WORLD_SLIDE_TRANSITION + WORLD_COLUMN_STAGGER * (worldColumnCount - 1) + 120
    const resetTimer = setTimeout(() => {
      setWorldSlideInstant(true)
      setWorldSlideIndex(0)
    }, resetDelay)

    return () => clearTimeout(resetTimer)
  }, [worldSlideIndex, worldColumnCount])

  useEffect(() => {
    if (!worldSlideInstant) return

    const rafId = requestAnimationFrame(() => {
      setWorldSlideInstant(false)
    })

    return () => cancelAnimationFrame(rafId)
  }, [worldSlideInstant])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
      infinite: false,
    })

    const update = (time) => {
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(update)
    }

    lenis.on('scroll', ScrollTrigger.update)
    rafRef.current = requestAnimationFrame(update)

    return () => {
      cancelAnimationFrame(rafRef.current)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    if (loading) return undefined

    const ctx = gsap.context(() => {
      gsap.from('.main-nav', {
        y: -24,
        autoAlpha: 0,
        duration: 1,
        ease: 'power4.out',
      })

      gsap.from('.hero-copy__inner', {
        autoAlpha: 0,
        scale: 0.93,
        duration: 1,
        ease: 'power4.out',
      })

      gsap.utils.toArray('[data-reveal-group]').forEach((group) => {
        const targets = group.querySelectorAll('[data-reveal]')
        if (!targets.length) return

        targets.forEach((target, i) => {
          const isHeading = target.matches('h2, h3')
          const isParagraph = target.matches('p')
          gsap.from(target, {
            y: isHeading ? 50 : isParagraph ? 30 : 40,
            autoAlpha: 0,
            duration: isHeading ? 1.6 : isParagraph ? 1.4 : 1.5,
            delay: i * 0.1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: target,
              start: 'top 90%',
            },
          })
        })
      })

      gsap.utils.toArray('[data-parallax]').forEach((element) => {
        const amount = Number(element.dataset.parallax || -7)
        gsap.to(element, {
          yPercent: amount,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            scrub: 0.8,
            start: 'top bottom',
            end: 'bottom top',
          },
        })
      })

      gsap.to('.hero-copy', {
        scale: 0.85,
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-film-sequence',
          start: 'top top',
          end: () => `+=${Math.max(160, window.innerHeight * 0.18)}`,
          scrub: true,
        },
      })

      gsap.fromTo(
        '.film-card',
        {
          scale: () => {
            const card = document.querySelector('.film-card')
            return card ? Math.min(1, 600 / card.offsetWidth) : 0.52
          },
          borderRadius: '20px',
        },
        {
          scale: 1,
          borderRadius: '18px',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.film-stage',
            start: 'top 95%',
            end: 'top 30%',
            scrub: 0.8,
          },
        },
      )

      const isMobileViewport = window.matchMedia('(max-width: 760px)').matches

      gsap.timeline({
        scrollTrigger: {
          trigger: '.world-stage',
          start: 'top 90%',
          end: 'top 42%',
          scrub: 1,
        },
      })
        .to(
          '.film-card',
          {
            y: isMobileViewport ? -26 : -64,
            scale: isMobileViewport ? 0.95 : 0.9,
            autoAlpha: isMobileViewport ? 0.74 : 0.58,
            filter: isMobileViewport ? 'blur(1.2px)' : 'blur(2.4px)',
            ease: 'none',
          },
          0,
        )
        .fromTo(
          '.world-strip',
          {
            y: isMobileViewport ? 68 : 126,
            scale: isMobileViewport ? 0.96 : 0.91,
            autoAlpha: 0,
            filter: isMobileViewport ? 'blur(3px)' : 'blur(7px)',
            clipPath: 'inset(14% 0% 14% 0% round 12px)',
          },
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            filter: 'blur(0px)',
            clipPath: 'inset(0% 0% 0% 0% round 12px)',
            ease: 'none',
          },
          0,
        )
        .fromTo(
          '.world-strip__search',
          {
            y: 28,
            autoAlpha: 0,
            scale: 0.94,
          },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            ease: 'none',
          },
          0.22,
        )

      gsap.from('.wordmark', {
        scale: 0.85,
        autoAlpha: 0,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.wordmark',
          start: 'top 92%',
        },
      })

      gsap.utils.toArray('.brand-logos span').forEach((span, i) => {
        gsap.from(span, {
          y: 20,
          autoAlpha: 0,
          duration: 0.8,
          delay: i * 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.brand-logos',
            start: 'top 88%',
          },
        })
      })
    }, shellRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [loading])

  return (
    <div className="niani-shell" ref={shellRef}>
      <div className={`splash-screen${loading ? '' : ' splash-screen--done'}`}>
        <div className="splash-loader" role="status" aria-label="Loading Niani Designs">
          <img
            className="splash-mark"
            src={`${import.meta.env.BASE_URL}niani-mark.png`}
            alt=""
            width="112"
            height="153"
          />
          <span className="splash-bar" />
        </div>
      </div>

      <SiteNav
        scrolled={scrolled}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((open) => !open)}
        onCloseMenu={() => setMenuOpen(false)}
        onOpenQuote={openQuoteModal}
      />

      <div className="atmosphere-glow" aria-hidden="true" />

      <main className="world-flow">
        <div className="hero-film-sequence" ref={heroSequenceRef}>
          <section className="hero-stage" id="hero">
            <div className="spiral-whirl">
              <SpiralWhirlCanvas
                imageUrls={spiralImageUrls}
                sequenceRef={heroSequenceRef}
                onReady={() => setLoading(false)}
              />
            </div>
            <div className="hero-vignette" aria-hidden="true" />
            <div className="hero-copy">
              <div className="hero-copy__inner">
                <img
                  src={`${import.meta.env.BASE_URL}niani-logo.jpeg`}
                  alt=""
                  className="hero-brand-mark"
                />
                <p className="hero-label">NIANI</p>
                <h1 className="hero-headline">
                  <span>Your space</span>
                  <span>for interior inspiration.</span>
                </h1>
                <div className="hero-actions">
                  <button className="hero-pill cta-button" type="button" onClick={openQuoteModal}>Get a quote</button>
                  <a className="hero-outline" href="#explore-films">Explore films</a>
                </div>
              </div>
            </div>
          </section>

          <section className="film-stage" id="film" data-reveal-group>
            <a className="film-prompt" href="#explore-films">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
              Watch our interior design film
            </a>
            <a className="film-card" href="#explore-films" data-reveal aria-label="Explore Niani films">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                src={`${import.meta.env.BASE_URL}niani-video.mp4`}
              />
              <div className="film-overlay">
                <div className="film-overlay__left">
                  <svg className="film-overlay__play" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M8 5v14l11-7z"/></svg>
                  <span className="film-overlay__text">Watch</span>
                </div>
                <span className="film-overlay__text film-overlay__right">the film</span>
              </div>
            </a>
          </section>
        </div>

        <section className="world-stage" data-reveal-group>
          <h2 data-reveal>Every search opens a new world.</h2>
          <div className="world-strip" data-reveal>
            {[0, 1, 2].map((columnIndex) => (
              <div className="world-strip__column" key={`world-column-${columnIndex}`}>
                <div
                  className={`world-strip__track${worldSlideInstant ? ' world-strip__track--instant' : ''}`}
                  style={{
                    height: `${worldSlidesWithLoop.length * 100}%`,
                    transform: `translateY(-${worldSlideIndex * worldSlidePercent}%)`,
                    transitionDelay: worldSlideInstant ? '0s' : `${columnIndex}s`,
                  }}
                >
                  {worldSlidesWithLoop.map((slide, slideIndex) => (
                    <img
                      key={`${slide.id}-${columnIndex}-${slideIndex}`}
                      className="world-strip__image"
                      style={{ height: `${100 / worldSlidesWithLoop.length}%` }}
                      src={slide.images[columnIndex].src}
                      alt={slide.images[columnIndex].alt}
                      width="1200"
                      height="800"
                      loading="lazy"
                      data-ai-placeholder
                      data-parallax="-5"
                    />
                  ))}
                </div>
              </div>
            ))}
            <div className="world-strip__search" key={activeWorldSlide.id} aria-live="polite">
              {activeWorldSlide.keyword}
            </div>
          </div>
        </section>

        <section className="think-stage" id="think" data-reveal-group>
          <p data-reveal>
            Your collections, your references, your taste.
            <br />
            Connected, searchable, yours.
          </p>
          <h2 data-reveal>Search the way you think.</h2>

          {isMobileThinkCarousel ? (
            <div
              className="think-carousel"
              data-reveal
              onMouseEnter={() => setThinkCarouselPaused(true)}
              onMouseLeave={() => setThinkCarouselPaused(false)}
              onTouchStart={() => setThinkCarouselPaused(true)}
              onTouchEnd={() => setThinkCarouselPaused(false)}
              onTouchCancel={() => setThinkCarouselPaused(false)}
            >
              <div
                className={`think-carousel__track${thinkSlideInstant ? ' think-carousel__track--instant' : ''}`}
                style={{
                  transform: `translateX(-${thinkSlideIndex * 100}%)`,
                }}
              >
                {thinkSlidesWithLoop.map((card, index) => (
                  <article key={`${card.id}-${index}`} className="think-card grid-item think-carousel__card">
                    <div className="think-card__media">
                      <img src={card.image} alt={card.alt} width="1000" height="1250" loading="lazy" data-ai-placeholder data-parallax="-6" />
                    </div>
                    <span>{card.title}</span>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <div className="think-grid">
              {thinkCards.map((card) => (
                <article key={card.id} className="think-card grid-item" data-reveal>
                  <div className="think-card__media">
                    <img src={card.image} alt={card.alt} width="1000" height="1250" loading="lazy" data-ai-placeholder data-parallax="-6" />
                  </div>
                  <span>{card.title}</span>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="know-stage" data-reveal-group>
          <div className="know-grid">
            <h2 data-reveal>
              Know what
              <br />
              you're
              <br />
              looking at.
            </h2>

            <article className="know-card grid-item" data-reveal>
              <img
                src={`${import.meta.env.BASE_URL}atmosphere/know-editorial.webp`}
                alt="Walnut joinery, brass reveal, stone ledge, and ceramic editorial detail"
                width="1000"
                height="1250"
                loading="lazy"
                data-ai-placeholder
                data-parallax="-8"
              />
              <span>Editorial details by Niani</span>
            </article>

            <p data-reveal>
              Niani researches interior references,
              <br />
              surfacing the source,
              <br />
              material, and mood.
            </p>
          </div>
        </section>

        <FilmGallery embedded />

        <section className="reviews-stage" aria-labelledby="reviews-title" data-reveal-group>
          <div className="reviews-heading">
            <p data-reveal>Client reviews</p>
            <h2 id="reviews-title" data-reveal>The spaces, in their words.</h2>
          </div>
          <div className="reviews-grid" data-reveal>
            {sampleReviews.map((review) => (
              <article className="review-card" key={review.name}>
                <span className="review-card__mark" aria-hidden="true">“</span>
                <blockquote>{review.quote}</blockquote>
                <footer>
                  <img
                    src={`${import.meta.env.BASE_URL}review-clients/${review.photo}`}
                    alt=""
                    loading="lazy"
                  />
                  <div>
                    <strong>{review.name}</strong>
                    <span>{review.project}</span>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </section>

        <section className="brand-stage" data-reveal-group>
          <h3 data-reveal>Inspiration for the world's most refined spaces.</h3>
          <div className="brand-logos" data-reveal>
            {brandNames.map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
        </section>

        <SiteFooter />
      </main>
      {quoteOpen && <QuoteModal onClose={closeQuoteModal} />}
    </div>
  )
}

export default Home
