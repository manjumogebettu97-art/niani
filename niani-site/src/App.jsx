import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const floatingObjects = [
  {
    id: 'scene-1',
    type: 'image',
    src: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=700',
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
    src: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=700',
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
    src: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=700',
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
    src: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=700',
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
    src: 'https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=700',
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
    src: 'https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=700',
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
    src: 'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=700',
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
    src: 'https://images.pexels.com/photos/2082090/pexels-photo-2082090.jpeg?auto=compress&cs=tinysrgb&w=700',
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
    src: 'https://images.pexels.com/photos/6585754/pexels-photo-6585754.jpeg?auto=compress&cs=tinysrgb&w=700',
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
    src: 'https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg?auto=compress&cs=tinysrgb&w=700',
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
    src: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=700',
    label: 'Smoked oak',
    top: '84%',
    left: '91%',
    width: '92px',
    height: '66px',
    rotate: 12,
    depth: 1.3,
  },
]

const ambientDust = [
  { id: 'dust-1', top: '7%', left: '39%', size: '22px', opacity: 0.2, blur: '2px' },
  { id: 'dust-2', top: '14%', left: '47%', size: '18px', opacity: 0.15, blur: '1px' },
  { id: 'dust-3', top: '19%', left: '58%', size: '24px', opacity: 0.14, blur: '3px' },
  { id: 'dust-4', top: '32%', left: '41%', size: '15px', opacity: 0.17, blur: '1px' },
  { id: 'dust-5', top: '44%', left: '53%', size: '27px', opacity: 0.13, blur: '3px' },
  { id: 'dust-6', top: '55%', left: '44%', size: '19px', opacity: 0.18, blur: '2px' },
  { id: 'dust-7', top: '61%', left: '57%', size: '16px', opacity: 0.19, blur: '1px' },
  { id: 'dust-8', top: '73%', left: '49%', size: '23px', opacity: 0.15, blur: '2px' },
  { id: 'dust-9', top: '84%', left: '54%', size: '17px', opacity: 0.18, blur: '1px' },
]

const thinkCards = [
  {
    id: 'material-palette',
    title: 'By material palette',
    image:
      'https://images.pexels.com/photos/5998031/pexels-photo-5998031.jpeg?auto=compress&cs=tinysrgb&w=1000',
  },
  {
    id: 'visual-similarity',
    title: 'by visual similarity',
    image:
      'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1000',
  },
  {
    id: 'without-noise',
    title: 'and without noise.',
    image:
      'https://images.pexels.com/photos/1648768/pexels-photo-1648768.jpeg?auto=compress&cs=tinysrgb&w=1000',
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

const worldStripSlides = [
  {
    id: 'modular-kitchen',
    keyword: 'modular kitchen',
    images: [
      {
        src: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Modular kitchen inspiration left',
      },
      {
        src: 'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Modular kitchen inspiration center',
      },
      {
        src: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Modular kitchen inspiration right',
      },
    ],
  },
  {
    id: 'renovation',
    keyword: 'renovation',
    images: [
      {
        src: 'https://images.pexels.com/photos/1648768/pexels-photo-1648768.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Renovation inspiration left',
      },
      {
        src: 'https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Renovation inspiration center',
      },
      {
        src: 'https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Renovation inspiration right',
      },
    ],
  },
  {
    id: 'pooja-room',
    keyword: 'pooja room',
    images: [
      {
        src: 'https://images.pexels.com/photos/6585754/pexels-photo-6585754.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Pooja room inspiration left',
      },
      {
        src: 'https://images.pexels.com/photos/2082090/pexels-photo-2082090.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Pooja room inspiration center',
      },
      {
        src: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Pooja room inspiration right',
      },
    ],
  },
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

function App() {
  const shellRef = useRef(null)
  const floatingRefs = useRef([])
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
    const timer = setTimeout(() => setLoading(false), 2200)
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
    const ctx = gsap.context(() => {
      gsap.set('.floating-world', { autoAlpha: 1 })

      gsap.from('.main-nav', {
        y: -24,
        autoAlpha: 0,
        duration: 1.4,
        ease: 'power4.out',
      })

      gsap.from('[data-hero-reveal]', {
        y: 36,
        autoAlpha: 0,
        stagger: 0.18,
        duration: 1.6,
        delay: 0.25,
        ease: 'power4.out',
      })

      const totalItems = floatingRefs.current.filter(Boolean).length
      const orbits = []

      floatingRefs.current.forEach((item, index) => {
        if (!item) return
        const depth = Number(item.dataset.depth || 1)

        gsap.from(item, {
          autoAlpha: 0,
          scale: 0.85,
          y: gsap.utils.random(15, 35),
          duration: 2.2,
          ease: 'power3.out',
          delay: 0.3 + index * 0.06,
        })

        gsap.to(item, {
          y: `+=${gsap.utils.random(-12, 12)}`,
          x: `+=${gsap.utils.random(-10, 10)}`,
          rotation: `+=${gsap.utils.random(-2, 2)}`,
          duration: gsap.utils.random(8, 16),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 2.5 + index * 0.06,
        })

        orbits.push({
          item,
          offset: (index / totalItems) * Math.PI * 2,
          radiusX: 30 + index * 8 * depth,
          radiusY: 20 + index * 5 * depth,
          direction: index % 2 === 0 ? 1 : -1,
          depth,
        })
      })

      let scrollProgress = 0

      ScrollTrigger.create({
        trigger: '.hero-stage',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          scrollProgress = self.progress
          orbits.forEach(({ item, offset, radiusX, radiusY, direction, depth }) => {
            const t = scrollProgress * Math.PI * 4 * direction + offset
            const x = Math.cos(t) * radiusX
            const y = Math.sin(t) * radiusY
            const rot = Math.sin(t) * 5 * depth
            gsap.set(item, { x, y, rotation: rot })
          })
        },
      })

      gsap.utils.toArray('.ambient-dust').forEach((node) => {
        gsap.to(node, {
          x: gsap.utils.random(-16, 16),
          y: gsap.utils.random(-20, 20),
          scale: gsap.utils.random(0.86, 1.18),
          duration: gsap.utils.random(9, 18),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
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
        scale: 0.72,
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-stage',
          start: 'top top',
          end: 'bottom 60%',
          scrub: 0.6,
        },
      })

      gsap.fromTo(
        '.film-card',
        { scale: 0.6, borderRadius: '32px' },
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

      gsap.to('.floating-world', {
        autoAlpha: 0,
        scrollTrigger: {
          trigger: '.film-stage',
          start: 'top 90%',
          end: 'top 55%',
          scrub: true,
        },
      })

      ScrollTrigger.create({
        trigger: '.signup-stage',
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          orbits.forEach(({ item, offset, radiusX, radiusY, direction, depth }) => {
            const t = self.progress * Math.PI * 4 * direction + offset
            const x = Math.cos(t) * radiusX
            const y = Math.sin(t) * radiusY
            const rot = Math.sin(t) * 5 * depth
            gsap.set(item, { x, y, rotation: rot })
          })
        },
      })

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

    const handlePointer = (event) => {
      const xRatio = event.clientX / window.innerWidth - 0.5
      const yRatio = event.clientY / window.innerHeight - 0.5
      gsap.to('.floating-world', {
        x: xRatio * 14,
        y: yRatio * 10,
        duration: 2.5,
        ease: 'power3.out',
      })
    }

    window.addEventListener('pointermove', handlePointer)

    return () => {
      window.removeEventListener('pointermove', handlePointer)
      ctx.revert()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="niani-shell" ref={shellRef}>
      <div className={`splash-screen${loading ? '' : ' splash-screen--done'}`}>
        <img src={`${import.meta.env.BASE_URL}niani-logo.jpeg`} alt="Niani Designs" className="splash-logo" />
        <span className="splash-name">NIANI</span>
      </div>

      <header className={`main-nav${scrolled ? ' main-nav--scrolled' : ''}`}>
        <div className="nav-left">
          <a className="nav-brand" href="/" aria-label="Niani Designs home">
            <img src={`${import.meta.env.BASE_URL}niani-logo.jpeg`} alt="" />
          </a>
          <a className="nav-link" href="#hero">Explore</a>
          <a className="nav-link" href="#think">Curate</a>
        </div>

        <div className="nav-search-wrap">
          <svg className="nav-search-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8.5" cy="8.5" r="5.5" />
            <line x1="13" y1="13" x2="17" y2="17" />
          </svg>
          <input
            className="nav-search"
            type="text"
            placeholder="Search Niani inspirations..."
            aria-label="Search Niani inspirations"
          />
          <span className="nav-search-dots" aria-hidden="true">
            <span /><span /><span /><span />
          </span>
        </div>

        <div className="nav-right">
          <a className="nav-cta" href="#signup">Get Quote</a>
        </div>

        <button
          className={`nav-burger${menuOpen ? ' nav-burger--open' : ''}`}
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
      </header>

      {menuOpen && (
        <div className="mobile-menu" onClick={() => setMenuOpen(false)}>
          <a href="#hero">Explore</a>
          <a href="#think">Curate</a>
          <a className="mobile-menu__cta" href="#signup">Get Quote</a>
        </div>
      )}

      <div className="atmosphere-glow" aria-hidden="true" />
      <div className="floating-world" aria-hidden="true">
        <div className="floating-world__field">
          {floatingObjects.map((item, index) => (
            <article
              key={item.id}
              ref={(node) => {
                floatingRefs.current[index] = node
              }}
              className={`floating-object floating-object--${item.type}`}
              style={{
                top: item.top,
                left: item.left,
                width: item.width,
                height: item.height,
                rotate: `${item.rotate}deg`,
              }}
              data-depth={item.depth}
              aria-label={item.label}
            >
              <div className="floating-object__inner">
                {item.type === 'image' ? (
                  <img src={item.src} alt="" loading="lazy" />
                ) : (
                  <div className="floating-object__surface" style={item.style} />
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="floating-world__dust">
          {ambientDust.map((dust) => (
            <span
              key={dust.id}
              className="ambient-dust"
              style={{
                top: dust.top,
                left: dust.left,
                width: dust.size,
                height: dust.size,
                opacity: dust.opacity,
                filter: `blur(${dust.blur})`,
              }}
            />
          ))}
        </div>
      </div>

      <main className="world-flow">
        <section className="hero-stage" id="hero">
          <div className="hero-copy">
            <p className="hero-label" data-hero-reveal>
              NIANI
            </p>
            <h1 className="hero-headline" data-hero-reveal>
              <span>Your space</span>
              <span>for interior inspiration.</span>
            </h1>
          </div>
        </section>

        <section className="film-stage" id="film" data-reveal-group>
          <article className="film-card" data-reveal>
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
          </article>
        </section>

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
                  {worldSlidesWithLoop.map((slide) => (
                    <img
                      key={`${slide.id}-${columnIndex}`}
                      className="world-strip__image"
                      style={{ height: `${100 / worldSlidesWithLoop.length}%` }}
                      src={slide.images[columnIndex].src}
                      alt={slide.images[columnIndex].alt}
                      loading="lazy"
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
                      <img src={card.image} alt={card.title} loading="lazy" data-parallax="-6" />
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
                    <img src={card.image} alt={card.title} loading="lazy" data-parallax="-6" />
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
                src="https://images.pexels.com/photos/1648768/pexels-photo-1648768.jpeg?auto=compress&cs=tinysrgb&w=1300"
                alt="Editorial interior source card"
                loading="lazy"
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

        <section className="brand-stage" data-reveal-group>
          <h3 data-reveal>Inspiration for the world's most refined spaces.</h3>
          <div className="brand-logos" data-reveal>
            {brandNames.map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
        </section>

        <section className="signup-stage" id="signup" data-reveal-group>
          <div className="footer-links" data-reveal>
            <span className="link-hover">Instagram</span>
            <span className="link-hover">Pinterest</span>
            <span className="link-hover">Substack</span>
            <span className="link-hover">Journal</span>
          </div>
          <div className="wordmark" aria-hidden="true">NIANI</div>
        </section>
      </main>
    </div>
  )
}

export default App
