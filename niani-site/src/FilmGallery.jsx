import { useEffect, useRef, useState } from 'react'
import './FilmGallery.css'

const INSTAGRAM_PROFILE = 'https://www.instagram.com/niani_designs/'
const MOBILE_FILM_CAROUSEL = '(max-width: 560px)'

const reels = [
  { code: 'DM5bn0sCCtK', title: 'A client’s story: Sridevi’s home' },
  { code: 'DbNuctRzQjH', title: 'Why settle for a design everyone else has?' },
  { code: 'DbAiKvVTemh', title: 'Two aesthetics, one home' },
  { code: 'Da--D8dzj-E', title: 'Interior details in motion' },
  { code: 'DaQAKMSqy5E', title: 'Designing an ice bath recovery studio' },
  { code: 'DaBWCCuhlYX', title: 'The site reality behind beautiful finishes' },
  { code: 'DSSoe-nAfxr', title: 'From tile sample to finished wall' },
  { code: 'DSINWoPAc8y', title: 'Welcome to our beige kitchen' },
  { code: 'DSF1K0xAR5X', title: 'Your sign to transform your space' },
  { code: 'DSDOvDbgYLU', title: 'Start your project with Niani' },
  { code: 'DR_tFGZkYgM', title: 'A budget TV unit renovation' },
  { code: 'DR4VuvXgQ8O', title: 'Whatever the style, we deliver it' },
  { code: 'DRzxY9bgZUV', title: 'Welcome to my garage' },
  { code: 'DRutN4-gZyp', title: 'Transforming an entrance' },
  { code: 'DPUbPcNk7yI', title: 'The Lego House: mandir' },
  { code: 'DOn2gTqgXdn', title: 'The Lego House: part one' },
  { code: 'DN5TlStES9C', title: 'The people behind the scenes' },
  { code: 'DNv1pPZwnkq', title: 'A little rhythm on site' },
  { code: 'DNn2Mm2BHcj', title: 'Gen-Z internet at work' },
  { code: 'DNdAhjWhell', title: 'A lime-bright design detail' },
  { code: 'DNLLLxNBzAE', title: 'Like the ceiling can’t hold us' },
  { code: 'DNGDmfABG8P', title: 'The reveal: part two' },
  { code: 'DNBRUDdhzZF', title: 'Design a studio apartment with us' },
  { code: 'DMx6r5TBsB1', title: 'Vaastu mistakes to avoid' },
  { code: 'DMqBQEFBdLQ', title: 'Pooja room inspiration' },
  { code: 'DMm89NChdbI', title: 'Where calm and classy coexist' },
  { code: 'DMkOhEChunj', title: 'Nail salon transformation' },
  { code: 'DMiVO2XBiai', title: 'Which interior is your favourite?' },
  { code: 'DMapxMuhDd8', title: 'Pinterest picks: part one' },
  { code: 'DMIqsZnhUnZ', title: 'Bring your project to Niani' },
  { code: 'DMFnb7nBuRG', title: 'Niani design stories: part three' },
  { code: 'DMDVA2tBi8d', title: 'Niani design stories: part two' },
  { code: 'DL-HNAyhVzV', title: 'Niani design stories: part one' },
  { code: 'DL42nnUhdeK', title: 'Blueprints and creative energy' },
  { code: 'DL2P8BYhMDo', title: 'Introducing Niani Designs' },
  { code: 'DLzmRxTCuU6', title: 'In every frame, in every space' },
]

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function SoundIcon({ isMuted }) {
  return isMuted ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M11 5 6.5 9H3v6h3.5l4.5 4V5Z" />
      <path d="m16 9 5 5m0-5-5 5" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M11 5 6.5 9H3v6h3.5l4.5 4V5Z" />
      <path d="M15 9.5a4 4 0 0 1 0 5M17.5 7a7.5 7.5 0 0 1 0 10" />
    </svg>
  )
}

function FeaturedFilm() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const [isInView, setIsInView] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    if (!sectionRef.current || typeof IntersectionObserver === 'undefined') return undefined

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.28 },
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isInView) {
      void video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [isInView])

  const toggleSound = () => {
    const nextMuted = !isMuted
    setIsMuted(nextMuted)
    if (videoRef.current) {
      videoRef.current.muted = nextMuted
      void videoRef.current.play().catch(() => {})
    }
  }

  return (
    <section className="featured-film" id="featured-film" ref={sectionRef}>
      <div className="featured-film__heading">
        <div>
          <span>Original feature</span>
          <h2>The Niani film</h2>
        </div>
        <p>Timeless interiors, shaped around the way you live.</p>
      </div>
      <div className="featured-film__media">
        <video
          ref={videoRef}
          src={`${import.meta.env.BASE_URL}niani-video.mp4`}
          aria-label="The Niani interior design film"
          autoPlay={isInView}
          muted={isMuted}
          loop
          playsInline
          preload="metadata"
        />
        <button
          className="reel-card__sound"
          type="button"
          onClick={toggleSound}
          aria-label={isMuted ? 'Turn sound on for the Niani film' : 'Mute the Niani film'}
        >
          <SoundIcon isMuted={isMuted} />
        </button>
      </div>
      <a className="featured-film__continue" href="#films-grid">
        Continue to the reel gallery
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M12 5v14m0 0 6-6m-6 6-6-6" />
        </svg>
      </a>
    </section>
  )
}

function NativeReel({ reel, index, isActive, isMobileCarousel, onEnded }) {
  const cardRef = useRef(null)
  const videoRef = useRef(null)
  const posterUrl = `${import.meta.env.BASE_URL}reel-thumbnails/${reel.code}.jpg`
  const [isNearViewport, setIsNearViewport] = useState(
    () => index < 2 || typeof IntersectionObserver === 'undefined',
  )
  const [isInView, setIsInView] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    if (!cardRef.current || typeof IntersectionObserver === 'undefined') return undefined

    const loadObserver = new IntersectionObserver(
      ([entry]) => setIsNearViewport(entry.isIntersecting),
      { rootMargin: '600px 0px' },
    )
    const playObserver = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.42 },
    )

    loadObserver.observe(cardRef.current)
    playObserver.observe(cardRef.current)
    return () => {
      loadObserver.disconnect()
      playObserver.disconnect()
    }
  }, [])

  const reelUrl = `https://www.instagram.com/reel/${reel.code}/`
  const shouldRenderVideo = isNearViewport && (isMobileCarousel || isActive)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isInView && isActive) {
      if (video.ended) video.currentTime = 0
      void video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [isActive, isInView, isNearViewport])

  const toggleSound = () => {
    const nextMuted = !isMuted
    setIsMuted(nextMuted)
    if (videoRef.current) {
      videoRef.current.muted = nextMuted
      void videoRef.current.play().catch(() => {})
    }
  }

  return (
    <article className={`reel-card${isActive ? ' reel-card--active' : ''}`} ref={cardRef}>
      <div className="reel-card__player">
        {shouldRenderVideo ? (
          <>
            <video
              ref={videoRef}
              src={`${import.meta.env.BASE_URL}reels/${reel.code}.mp4`}
              poster={posterUrl}
              aria-label={reel.title}
              autoPlay={isInView && isActive}
              muted={isMuted}
              loop={!isMobileCarousel}
              playsInline
              preload="metadata"
              onEnded={() => onEnded(index)}
            />
            <button
              className="reel-card__sound"
              type="button"
              onClick={toggleSound}
              aria-label={isMuted ? `Turn sound on for ${reel.title}` : `Mute ${reel.title}`}
            >
              <SoundIcon isMuted={isMuted} />
            </button>
          </>
        ) : (
          <div className="reel-card__placeholder" aria-hidden="true">
            <img src={posterUrl} alt="" loading="eager" decoding="async" />
            <span>{String(index + 1).padStart(2, '0')}</span>
            <PlayIcon />
          </div>
        )}
      </div>
      <div className="reel-card__details">
        <div>
          <span className="reel-card__number">Film {String(index + 1).padStart(2, '0')}</span>
          <h2>{reel.title}</h2>
        </div>
        <a href={reelUrl} target="_blank" rel="noreferrer" aria-label={`Open ${reel.title} on Instagram`}>
          <span>View original</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
            <path d="M5 19 19 5M9 5h10v10" />
          </svg>
        </a>
      </div>
    </article>
  )
}

function FilmGallery({ embedded = false }) {
  const carouselRef = useRef(null)
  const [activeReelIndex, setActiveReelIndex] = useState(0)
  const [isMobileCarousel, setIsMobileCarousel] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_FILM_CAROUSEL).matches,
  )

  useEffect(() => {
    if (embedded) return undefined

    window.scrollTo(0, 0)
    document.title = 'Films — Niani Designs'
    return () => {
      document.title = 'Niani Designs'
    }
  }, [embedded])

  useEffect(() => {
    const media = window.matchMedia(MOBILE_FILM_CAROUSEL)
    const handleChange = (event) => setIsMobileCarousel(event.matches)
    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return undefined

    let animationFrame = 0
    const updateMotion = () => {
      animationFrame = 0
      const carouselCenter = carousel.scrollLeft + carousel.clientWidth / 2
      const maxScroll = Math.max(1, carousel.scrollWidth - carousel.clientWidth)
      const collection = carousel.closest('.films-collection')
      collection?.style.setProperty('--carousel-progress', String(carousel.scrollLeft / maxScroll))
      let closestIndex = 0
      let closestDistance = Number.POSITIVE_INFINITY

      const cards = Array.from(carousel.children)
      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.clientWidth / 2
        const distance = (cardCenter - carouselCenter) / Math.max(1, carousel.clientWidth)
        const clampedDistance = Math.max(-1.4, Math.min(1.4, distance))
        if (Math.abs(distance) < closestDistance) {
          closestIndex = index
          closestDistance = Math.abs(distance)
        }
        card.style.setProperty('--carousel-distance', String(clampedDistance))
        card.style.setProperty('--carousel-abs-distance', String(Math.abs(clampedDistance)))
        card.style.setProperty('--carousel-layer', String(100 - Math.round(Math.abs(clampedDistance) * 50)))
      })
      cards.forEach((card, index) => {
        card.style.setProperty('--carousel-index-distance', String(Math.abs(index - closestIndex)))
      })
      setActiveReelIndex((currentIndex) => (currentIndex === closestIndex ? currentIndex : closestIndex))
    }
    const queueMotionUpdate = () => {
      if (!animationFrame) animationFrame = requestAnimationFrame(updateMotion)
    }

    carousel.addEventListener('scroll', queueMotionUpdate, { passive: true })
    window.addEventListener('resize', queueMotionUpdate)
    queueMotionUpdate()

    return () => {
      carousel.removeEventListener('scroll', queueMotionUpdate)
      window.removeEventListener('resize', queueMotionUpdate)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  const scrollToReel = (targetIndex, behavior = 'smooth') => {
    const carousel = carouselRef.current
    if (!carousel) return

    const targetCard = carousel.children[targetIndex]
    if (!targetCard) return

    const centeredPosition = targetCard.offsetLeft - (carousel.clientWidth - targetCard.clientWidth) / 2
    carousel.scrollTo({
      left: Math.max(0, centeredPosition),
      behavior,
    })
  }

  useEffect(() => {
    if (isMobileCarousel) return undefined

    const animationFrame = requestAnimationFrame(() => {
      const carousel = carouselRef.current
      if (!carousel) return

      const carouselCenter = carousel.clientWidth / 2
      const cards = Array.from(carousel.children)
      const targetIndex = cards.findIndex(
        (card) => card.offsetLeft + card.clientWidth / 2 >= carouselCenter,
      )
      scrollToReel(targetIndex < 0 ? cards.length - 1 : targetIndex, 'auto')
    })
    return () => cancelAnimationFrame(animationFrame)
  }, [isMobileCarousel])

  const handleReelEnded = (currentIndex) => {
    if (!isMobileCarousel) return

    const nextIndex = (currentIndex + 1) % reels.length
    scrollToReel(nextIndex, nextIndex === 0 ? 'auto' : 'smooth')
  }

  const moveCarousel = (direction) => {
    const carousel = carouselRef.current
    if (!carousel) return

    const cards = Array.from(carousel.children)
    const carouselCenter = carousel.scrollLeft + carousel.clientWidth / 2
    const currentIndex = cards.reduce((closestIndex, card, index) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2
      const closestCard = cards[closestIndex]
      const closestCenter = closestCard.offsetLeft + closestCard.clientWidth / 2
      return Math.abs(cardCenter - carouselCenter) < Math.abs(closestCenter - carouselCenter)
        ? index
        : closestIndex
    }, 0)
    const nextIndex = (currentIndex + direction + reels.length) % reels.length
    const isWrapping = (currentIndex === 0 && direction < 0)
      || (currentIndex === reels.length - 1 && direction > 0)

    scrollToReel(nextIndex, isWrapping ? 'auto' : 'smooth')
  }

  const carouselCollection = (
    <div className={`films-collection${embedded ? ' films-collection--embedded' : ''}`}>
      <div className="films-grid__heading">
        <div>
          <span>{embedded ? 'Explore films' : 'Reel gallery'}</span>
          <h2>Behind the spaces.</h2>
        </div>
        <div className="films-grid__guide">
          <p><span className="films-grid__desktop-note">Drag or use the arrows to explore.</span><span className="films-grid__mobile-note">Swipe or use the arrows. Auto-play continues after your choice.</span></p>
          <div className="films-carousel__controls" aria-label="Film carousel controls">
            <button type="button" onClick={() => moveCarousel(-1)} aria-label="Previous film">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button type="button" onClick={() => moveCarousel(1)} aria-label="Next film">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="m9 6 6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="films-grid__viewport">
        <section className="films-grid" id="films-grid" ref={carouselRef} aria-label="Niani Designs film carousel">
          {reels.map((reel, index) => (
            <NativeReel
              key={reel.code}
              reel={reel}
              index={index}
              isActive={index === activeReelIndex}
              isMobileCarousel={isMobileCarousel}
              onEnded={handleReelEnded}
            />
          ))}
        </section>
      </div>
    </div>
  )

  if (embedded) {
    return (
      <section className="home-films-stage" id="explore-films" aria-label="Explore Niani films">
        {carouselCollection}
      </section>
    )
  }

  return (
    <div className="films-page">
      <header className="films-nav">
        <a className="films-nav__brand" href="#hero" aria-label="Back to Niani Designs home">
          <img src={`${import.meta.env.BASE_URL}niani-logo.jpeg`} alt="" />
          <span>NIANI</span>
        </a>
        <div className="films-nav__actions">
          <a href={INSTAGRAM_PROFILE} target="_blank" rel="noreferrer">Instagram</a>
          <a className="films-nav__back" href="#hero">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Home
          </a>
        </div>
      </header>

      <main>
        <section className="films-hero">
          <div className="films-hero__eyebrow">
            <span>Niani films</span>
            <span>1 film · {reels.length} reels</span>
          </div>
          <h1>Spaces are better<br />when they move.</h1>
          <div className="films-hero__footer">
            <p>
              Walk through finished homes, material details, site stories,
              and the process behind Niani interiors.
            </p>
            <a href="#featured-film">
              Watch the Niani film
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="M12 5v14m0 0 6-6m-6 6-6-6" />
              </svg>
            </a>
          </div>
        </section>

        <FeaturedFilm />

        {carouselCollection}

        <section className="films-outro">
          <p>Seen something that feels like home?</p>
          <h2>Let’s shape your space.</h2>
          <div>
            <a className="films-outro__primary" href="#signup">Get a quote</a>
            <a href={INSTAGRAM_PROFILE} target="_blank" rel="noreferrer">Follow @niani_designs</a>
          </div>
        </section>
      </main>
    </div>
  )
}

export default FilmGallery
