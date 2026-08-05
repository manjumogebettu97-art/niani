import { useEffect, useMemo, useRef } from 'react'

const TAU = Math.PI * 2
const SAMPLE_COUNT = 4096

const mod = (value, length) => ((value % length) + length) % length
const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

function pointOnSpiral(progress, turns, radius) {
  const angle = progress * turns * TAU
  const distance = radius * (1 - progress)

  return {
    x: distance * Math.cos(angle),
    y: -distance * Math.sin(angle),
  }
}

function createSpiralLookup(turns, radius) {
  const rawPoints = []
  const cumulativeLengths = [0]

  for (let index = 0; index <= 16384; index += 1) {
    const point = pointOnSpiral(index / 16384, turns, radius)
    rawPoints.push(point)

    if (index > 0) {
      const previous = rawPoints[index - 1]
      cumulativeLengths.push(
        cumulativeLengths[index - 1] + Math.hypot(point.x - previous.x, point.y - previous.y),
      )
    }
  }

  const totalLength = cumulativeLengths[cumulativeLengths.length - 1]
  const points = []
  const tangents = []
  let cursor = 0

  for (let index = 0; index <= SAMPLE_COUNT; index += 1) {
    const targetLength = (index / SAMPLE_COUNT) * totalLength

    while (cursor < rawPoints.length - 2 && cumulativeLengths[cursor + 1] < targetLength) {
      cursor += 1
    }

    const segmentLength = cumulativeLengths[cursor + 1] - cumulativeLengths[cursor]
    const mix = segmentLength > 0 ? (targetLength - cumulativeLengths[cursor]) / segmentLength : 0
    const start = rawPoints[cursor]
    const end = rawPoints[cursor + 1]
    const x = start.x + (end.x - start.x) * mix
    const y = start.y + (end.y - start.y) * mix

    points.push({ x, y })

    const progress = (cursor + mix) / 16384
    const angle = progress * turns * TAU
    const distance = radius * (1 - progress)
    const dx = -radius * Math.cos(angle) - distance * Math.sin(angle) * turns * TAU
    const dy = radius * Math.sin(angle) - distance * Math.cos(angle) * turns * TAU
    const magnitude = Math.hypot(dx, dy) || 1
    tangents.push({ x: dx / magnitude, y: dy / magnitude })
  }

  return { points, tangents, totalLength }
}

function sampleSpiral(lookup, progress) {
  const scaled = clamp(progress, 0, 0.999999) * SAMPLE_COUNT
  const index = Math.floor(scaled)
  const mix = scaled - index
  const point = lookup.points[index]
  const nextPoint = lookup.points[index + 1]
  const tangent = lookup.tangents[index]
  const nextTangent = lookup.tangents[index + 1]

  return {
    x: point.x + (nextPoint.x - point.x) * mix,
    y: -(point.y + (nextPoint.y - point.y) * mix),
    tx: tangent.x + (nextTangent.x - tangent.x) * mix,
    ty: -(tangent.y + (nextTangent.y - tangent.y) * mix),
  }
}

function roundedRect(context, width, height, radius) {
  const safeRadius = Math.min(radius, width / 2, height / 2)
  context.beginPath()
  context.moveTo(safeRadius, 0)
  context.arcTo(width, 0, width, height, safeRadius)
  context.arcTo(width, height, 0, height, safeRadius)
  context.arcTo(0, height, 0, 0, safeRadius)
  context.arcTo(0, 0, width, 0, safeRadius)
  context.closePath()
}

function createTile(image, area, radius) {
  const naturalRatio = image.naturalWidth && image.naturalHeight
    ? image.naturalWidth / image.naturalHeight
    : 0.8
  const ratio = clamp(naturalRatio, 0.62, 1.48)
  const height = Math.sqrt(area / ratio)
  const width = height * ratio
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const canvas = document.createElement('canvas')

  canvas.width = Math.ceil(width * dpr)
  canvas.height = Math.ceil(height * dpr)

  const context = canvas.getContext('2d')
  context.scale(dpr, dpr)
  roundedRect(context, width, height, radius)
  context.clip()

  const imageRatio = image.naturalWidth / image.naturalHeight
  let sourceWidth = image.naturalWidth
  let sourceHeight = image.naturalHeight
  let sourceX = 0
  let sourceY = 0

  if (imageRatio > ratio) {
    sourceWidth = image.naturalHeight * ratio
    sourceX = (image.naturalWidth - sourceWidth) / 2
  } else {
    sourceHeight = image.naturalWidth / ratio
    sourceY = (image.naturalHeight - sourceHeight) / 2
  }

  context.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    width,
    height,
  )
  context.strokeStyle = 'rgba(80, 3, 12, 0.14)'
  context.lineWidth = 1
  roundedRect(context, width, height, radius)
  context.stroke()

  return { canvas, width, height }
}

function loadImage(src) {
  return new Promise((resolve) => {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.decoding = 'async'
    image.onload = () => resolve(image)
    image.onerror = () => resolve(null)
    image.src = src
  })
}

const CONFIG = {
  turns: 8,
  radius: 1875,
  cameraSize: 2500,
  baseVelocity: 0.32,
  fadeIn: 8,
  fadeOut: 8,
  spacing: 1,
  spread: 0.95,
  sizeAttenuation: 0.35,
  cornerRadius: 20,
  scrollBoost: 8,
  burst: {
    multiplier: 24,
    duration: 3200,
    rampUp: 700,
  },
}

const TILE_AREAS = [9632, 19111, 18700]

export default function SpiralWhirlCanvas({ imageUrls, sequenceRef, onReady }) {
  const sceneRef = useRef(null)
  const canvasRef = useRef(null)
  const onReadyRef = useRef(onReady)
  const lookup = useMemo(() => createSpiralLookup(CONFIG.turns, CONFIG.radius), [])

  useEffect(() => {
    onReadyRef.current = onReady
  }, [onReady])

  useEffect(() => {
    const canvas = canvasRef.current
    const scene = sceneRef.current
    const sequence = sequenceRef.current
    if (!canvas || !scene || !sequence) return undefined

    const context = canvas.getContext('2d', { alpha: true })
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const itemCount = Math.max(10, Math.ceil(lookup.totalLength / 250))
    const itemSources = Array.from(
      { length: itemCount },
      (_, index) => imageUrls[index % imageUrls.length],
    )

    let frameId = 0
    let stopped = false
    let visible = true
    let lastFrameTime = 0
    let lastScrollTime = performance.now()
    let lastScrollY = window.scrollY
    let scrollVelocity = 0
    let smoothedVelocity = 0
    let spiralPosition = 0
    let width = 0
    let height = 0
    let dpr = 1
    let burstStartedAt = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
    }

    const updateScrollVelocity = () => {
      const now = performance.now()
      const elapsed = Math.max(now - lastScrollTime, 16)
      const currentScrollY = window.scrollY
      scrollVelocity = ((currentScrollY - lastScrollY) / elapsed) * 1000
      lastScrollY = currentScrollY
      lastScrollTime = now
    }

    const handleVisibility = () => {
      visible = !document.hidden
      lastFrameTime = 0
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    window.addEventListener('scroll', updateScrollVelocity, { passive: true })
    document.addEventListener('visibilitychange', handleVisibility)
    resize()

    Promise.all([...new Set(imageUrls)].map(loadImage)).then((loadedImages) => {
      if (stopped) return

      const imageMap = new Map()
      loadedImages.forEach((image, index) => {
        if (image) imageMap.set([...new Set(imageUrls)][index], image)
      })

      const tiles = itemSources.map((src, index) => {
        const image = imageMap.get(src)
        return image ? createTile(image, TILE_AREAS[index % TILE_AREAS.length], CONFIG.cornerRadius) : null
      })

      burstStartedAt = performance.now()
      canvas.style.opacity = '1'
      onReadyRef.current?.()

      const draw = (time) => {
        frameId = requestAnimationFrame(draw)
        if (!visible || !width || !height) return

        const delta = lastFrameTime ? Math.min((time - lastFrameTime) / 1000, 0.15) : 0
        lastFrameTime = time
        smoothedVelocity += (scrollVelocity - smoothedVelocity) * Math.min(1, delta * 10)
        scrollVelocity *= Math.pow(0.0005, delta)

        const burstElapsed = time - burstStartedAt
        const burstRamp = Math.min(burstElapsed / CONFIG.burst.rampUp, 1) ** 2
        const burstLife = Math.min(burstElapsed / CONFIG.burst.duration, 1)
        const burstTarget = 1 + (CONFIG.burst.multiplier - 1) * (1 - burstLife) ** 2
        const burstMultiplier = 1 + (burstTarget - 1) * burstRamp
        const speedBoost = 1 + (Math.abs(smoothedVelocity) / 1000) * CONFIG.scrollBoost

        if (!reducedMotion) {
          spiralPosition = mod(
            spiralPosition + CONFIG.baseVelocity * burstMultiplier * speedBoost * delta,
            100,
          )
        }

        const sequenceRect = sequence.getBoundingClientRect()
        const sequenceProgress = clamp(-sequenceRect.top / (window.innerHeight * 1.3), 0, 1)
        const sceneOpacity = clamp(1 - (sequenceProgress - 0.25) / 0.15, 0, 1)
        scene.style.opacity = String(sceneOpacity)

        context.setTransform(1, 0, 0, 1, 0, 0)
        context.clearRect(0, 0, canvas.width, canvas.height)

        const cameraSize = window.innerWidth > 1920
          ? Math.round((window.innerWidth / 1920) * CONFIG.cameraSize)
          : CONFIG.cameraSize
        const radius = cameraSize * 0.75
        const scaleX = width / cameraSize
        const scaleY = height / cameraSize
        const centerX = width / 2
        const centerY = height / 2

        for (let index = 0; index < itemCount; index += 1) {
          const tile = tiles[index]
          if (!tile) continue

          const wrappedPosition = mod(
            spiralPosition + (index / itemCount - 0.5) * 100 * CONFIG.spacing,
            100,
          )
          const pathProgress = wrappedPosition / 100
          const sample = sampleSpiral(lookup, pathProgress)
          const cameraRatio = cameraSize / CONFIG.cameraSize
          const sampleX = sample.x * cameraRatio
          const sampleY = sample.y * cameraRatio
          const originalDistance = Math.hypot(sampleX, sampleY)
          const spreadScale = originalDistance > 0
            ? radius * (originalDistance / radius) ** (1 / CONFIG.spread) / originalDistance
            : 1
          const x = sampleX * spreadScale
          const y = sampleY * spreadScale

          const edgeOpacity = wrappedPosition < CONFIG.fadeIn
            ? wrappedPosition / CONFIG.fadeIn
            : wrappedPosition > 100 - CONFIG.fadeOut
              ? (100 - wrappedPosition) / CONFIG.fadeOut
              : 1
          const tileScale = Math.min(originalDistance / radius, 1) ** CONFIG.sizeAttenuation
          const rotation = Math.atan2(sample.ty, sample.tx)
          const cos = Math.cos(rotation) * tileScale
          const sin = Math.sin(rotation) * tileScale
          const drawX = centerX + x * scaleX
          const drawY = centerY + y * scaleY

          context.setTransform(
            cos * scaleX * dpr,
            sin * scaleY * dpr,
            -sin * scaleX * dpr,
            cos * scaleY * dpr,
            drawX * dpr,
            drawY * dpr,
          )
          context.globalAlpha = edgeOpacity * sceneOpacity
          context.drawImage(tile.canvas, -tile.width / 2, -tile.height / 2, tile.width, tile.height)
        }

        context.globalAlpha = 1
        context.setTransform(1, 0, 0, 1, 0, 0)
      }

      frameId = requestAnimationFrame(draw)
    })

    return () => {
      stopped = true
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      window.removeEventListener('scroll', updateScrollVelocity)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [imageUrls, lookup, sequenceRef])

  return (
    <div ref={sceneRef} className="spiral-whirl__scene" aria-hidden="true">
      <canvas ref={canvasRef} className="spiral-whirl__canvas" />
    </div>
  )
}
