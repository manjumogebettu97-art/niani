/* ═══════════════════════════════════════════════════════════ */
/*  NIANI DESIGNS — Cinematic Motion System v2                 */
/*  Dense, progressive, dramatic. Every pixel earns its place. */
/* ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  const EASE = 'power3.out';
  const EASE_SLOW = 'power2.out';
  const EASE_SMOOTH = 'power2.inOut';
  const EASE_EXPO = 'expo.out';

  /* ───────── CURSOR GLOW ───────── */
  const glow = document.getElementById('cursorGlow');
  if (glow && window.matchMedia('(pointer:fine)').matches) {
    let gx = 0, gy = 0, cx = 0, cy = 0;
    document.addEventListener('mousemove', e => { gx = e.clientX; gy = e.clientY; });
    (function tick() {
      cx += (gx - cx) * 0.07;
      cy += (gy - cy) * 0.07;
      glow.style.transform = `translate(${cx - 160}px, ${cy - 160}px)`;
      requestAnimationFrame(tick);
    })();
  }

  /* ───────── GSAP-POWERED LOADER ───────── */
  const loader = document.getElementById('loader');
  const loaderTL = gsap.timeline();

  loaderTL
    .set('body', { opacity: 1 })
    .fromTo('.loader-logo', {
      opacity: 0, scale: 0.8, rotation: -4,
    }, {
      opacity: 1, scale: 1, rotation: 0,
      duration: 1.0, ease: EASE_EXPO,
    }, 0.2)
    .fromTo('.loader-line', {
      scaleX: 0, transformOrigin: 'left center',
    }, {
      scaleX: 1,
      duration: 1.6, ease: 'power1.inOut',
    }, 0.5)
    .to(loader, {
      opacity: 0,
      duration: 0.7,
      ease: EASE_SLOW,
      delay: 0.4,
      onComplete() {
        loader.style.pointerEvents = 'none';
        setTimeout(() => loader.remove(), 200);
        initPortal();
      },
    });

  /* ───────── HEADER SCROLL BEHAVIOUR ───────── */
  const hdr = document.getElementById('hdr');
  let lastY = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 400) {
      hdr.classList.toggle('hdr--hide', y > lastY && y - lastY > 4);
    } else {
      hdr.classList.remove('hdr--hide');
    }
    lastY = y;
  }, { passive: true });

  /* ───────── MOBILE MENU ───────── */
  const menuBtn = document.getElementById('menuBtn');
  const overlay = document.getElementById('overlay');

  menuBtn.addEventListener('click', () => {
    const open = overlay.classList.toggle('open');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  overlay.querySelectorAll('.ov-link').forEach(l => {
    l.addEventListener('click', () => {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ═══════════════════════════════════════════════════════ */
  /*  PORTAL ENTRANCE — dramatic, cinematic, unmissable      */
  /* ═══════════════════════════════════════════════════════ */
  function initPortal() {
    const tl = gsap.timeline({ defaults: { ease: EASE_EXPO } });

    // 1. Floating images burst in with big motion
    tl.fromTo('.p-float', {
      opacity: 0,
      scale: 0.6,
      y: 80,
    }, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 2.0,
      ease: EASE_EXPO,
      stagger: { each: 0.12, from: 'random' },
    }, 0.1);

    // 3. Headline words — dramatic stagger reveal
    tl.to('.pw', {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      scale: 1,
      duration: 1.4,
      ease: EASE_EXPO,
      stagger: 0.22,
    }, '-=1.2');

    // 4. Search bar floats up
    tl.fromTo('.portal-search', {
      opacity: 0, y: 40, scale: 0.95,
    }, {
      opacity: 1, y: 0, scale: 1,
      duration: 1.0, ease: EASE_EXPO,
    }, '-=0.5');

    // 5. Film button
    tl.fromTo('.portal-film', {
      opacity: 0, y: 30,
    }, {
      opacity: 1, y: 0,
      duration: 0.8, ease: EASE_EXPO,
    }, '-=0.4');

    // ── CONTINUOUS FLOAT — portal images gently breathe ──
    document.querySelectorAll('.p-float').forEach((el, i) => {
      const dir = i % 2 === 0 ? 1 : -1;
      gsap.to(el, {
        y: dir * 20 + 'px',
        rotation: dir * 1.5,
        duration: 4 + i * 0.7,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    });

    // ── PORTAL PARALLAX — images drift at different speeds on scroll ──
    document.querySelectorAll('.p-float').forEach((el, i) => {
      const speed = 0.15 + (i * 0.06);
      gsap.to(el, {
        y: () => -window.innerHeight * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: '.portal',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    });
  }

  /* ═══════════════════════════════════════════════════════ */
  /*  HERO VIDEO SECTION — entrance + parallax               */
  /* ═══════════════════════════════════════════════════════ */
  const heroVid = document.getElementById('heroVid');
  if (heroVid) {
    gsap.from(heroVid, {
      opacity: 0,
      scale: 0.96,
      duration: 1.4,
      ease: EASE_SMOOTH,
      scrollTrigger: {
        trigger: heroVid,
        start: 'top 90%',
      },
    });

    gsap.to('.hero-vid__wrap', {
      y: '-10%',
      ease: 'none',
      scrollTrigger: {
        trigger: heroVid,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    });
  }

  /* ═══════════════════════════════════════════════════════ */
  /*  EYEBROW TEXT — fade up reveal                          */
  /* ═══════════════════════════════════════════════════════ */
  const eyebrowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('vis-ey');
      eyebrowObserver.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  document.querySelectorAll('.flow-eyebrow').forEach(el => eyebrowObserver.observe(el));

  /* ═══════════════════════════════════════════════════════ */
  /*  SCROLL BLUR-WORD REVEALS — progressive text animation  */
  /* ═══════════════════════════════════════════════════════ */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const words = entry.target.querySelectorAll('.bw');
      const isNarrative = entry.target.classList.contains('nv') ||
                          entry.target.classList.contains('nv-closing');
      const delay = isNarrative ? 190 : 120;
      words.forEach((w, i) => {
        setTimeout(() => w.classList.add('vis'), i * delay);
      });
      revealObserver.unobserve(entry.target);
    });
  }, {
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.15,
  });

  document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

  /* ═══════════════════════════════════════════════════════ */
  /*  NARRATIVE PARALLAX — poetic fragments float up slowly  */
  /* ═══════════════════════════════════════════════════════ */
  document.querySelectorAll('.nv').forEach(nv => {
    gsap.fromTo(nv, { y: 50 }, {
      y: -35,
      ease: 'none',
      scrollTrigger: {
        trigger: nv,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    });
  });

  /* ═══════════════════════════════════════════════════════ */
  /*  FLOW HEADINGS — scale + fade entrance on scroll        */
  /* ═══════════════════════════════════════════════════════ */
  document.querySelectorAll('.flow-heading').forEach(heading => {
    gsap.from(heading, {
      scale: 0.92,
      opacity: 0,
      y: 30,
      duration: 1.2,
      ease: EASE_EXPO,
      scrollTrigger: {
        trigger: heading,
        start: 'top 88%',
      },
    });
  });

  /* ═══════════════════════════════════════════════════════ */
  /*  FLOW SUB TEXT — fade entrance                           */
  /* ═══════════════════════════════════════════════════════ */
  document.querySelectorAll('.flow-sub').forEach(sub => {
    gsap.from(sub, {
      y: 20,
      opacity: 0,
      duration: 1.0,
      ease: EASE_SLOW,
      scrollTrigger: {
        trigger: sub,
        start: 'top 90%',
      },
    });
  });

  /* ═══════════════════════════════════════════════════════ */
  /*  CLUSTER IMAGES — parallax + dramatic entrance          */
  /* ═══════════════════════════════════════════════════════ */
  document.querySelectorAll('.ci').forEach((ci, i) => {
    gsap.from(ci, {
      y: 80 + i * 20,
      opacity: 0,
      scale: 0.88,
      duration: 1.2,
      ease: EASE_EXPO,
      scrollTrigger: {
        trigger: ci,
        start: 'top 92%',
      },
    });

    // Continuous parallax
    gsap.to(ci, {
      y: -(20 + i * 10),
      ease: 'none',
      scrollTrigger: {
        trigger: '.cluster',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
      },
    });
  });

  /* ═══════════════════════════════════════════════════════ */
  /*  MOOD CARDS — staggered float-in with depth             */
  /* ═══════════════════════════════════════════════════════ */
  const moodRow = document.getElementById('moodRow');
  if (moodRow) {
    gsap.from('.mood-card', {
      y: 100,
      opacity: 0,
      scale: 0.9,
      duration: 1.3,
      ease: EASE_EXPO,
      stagger: 0.18,
      scrollTrigger: {
        trigger: moodRow,
        start: 'top 85%',
      },
    });

    // Image parallax inside mood cards
    document.querySelectorAll('.mood-img-wrap img').forEach((img) => {
      gsap.to(img, {
        y: '-12%',
        ease: 'none',
        scrollTrigger: {
          trigger: img.closest('.mood-card'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    });
  }

  /* ═══════════════════════════════════════════════════════ */
  /*  ELEMENT CARDS — staggered entrance with lift           */
  /* ═══════════════════════════════════════════════════════ */
  const elemRow = document.getElementById('elemRow');
  if (elemRow) {
    gsap.from('.elem-card', {
      y: 60,
      opacity: 0,
      scale: 0.94,
      duration: 1.0,
      ease: EASE_EXPO,
      stagger: 0.14,
      scrollTrigger: {
        trigger: elemRow,
        start: 'top 85%',
      },
    });
  }

  /* ═══════════════════════════════════════════════════════ */
  /*  ATTRIBUTION CARDS — slide in from left                 */
  /* ═══════════════════════════════════════════════════════ */
  const attrCards = document.getElementById('attrCards');
  if (attrCards) {
    gsap.from('.attr-card', {
      x: -60,
      opacity: 0,
      duration: 1.1,
      ease: EASE_EXPO,
      stagger: 0.14,
      scrollTrigger: {
        trigger: attrCards,
        start: 'top 85%',
      },
    });
  }

  /* ═══════════════════════════════════════════════════════ */
  /*  MARQUEE — duplicate chips + entrance                   */
  /* ═══════════════════════════════════════════════════════ */
  document.querySelectorAll('.mq-track').forEach(track => {
    const items = [...track.children];
    items.forEach(c => track.appendChild(c.cloneNode(true)));
  });

  const mqBox = document.querySelector('.mq-box');
  if (mqBox) {
    gsap.from(mqBox, {
      opacity: 0,
      y: 40,
      duration: 1.0,
      ease: EASE_SLOW,
      scrollTrigger: {
        trigger: mqBox,
        start: 'top 88%',
      },
    });
  }

  /* ═══════════════════════════════════════════════════════ */
  /*  DREAM CTA — dramatic entrance                          */
  /* ═══════════════════════════════════════════════════════ */
  const dream = document.querySelector('.dream');
  if (dream) {
    gsap.from('.dream-heading', {
      scale: 0.85,
      opacity: 0,
      y: 50,
      duration: 1.4,
      ease: EASE_EXPO,
      scrollTrigger: {
        trigger: dream,
        start: 'top 75%',
      },
    });

    gsap.from('.dream-actions', {
      y: 40,
      opacity: 0,
      duration: 1.0,
      ease: EASE_SLOW,
      scrollTrigger: {
        trigger: dream,
        start: 'top 65%',
      },
    });
  }

  /* ═══════════════════════════════════════════════════════ */
  /*  PAPER SECTION + FOOTER — entrance                      */
  /* ═══════════════════════════════════════════════════════ */
  const paper = document.getElementById('paper');
  if (paper) {
    gsap.from(paper, {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: EASE_SMOOTH,
      scrollTrigger: {
        trigger: paper,
        start: 'top 90%',
      },
    });
  }

  const wordmark = document.querySelector('.ft-wordmark');
  if (wordmark) {
    gsap.to(wordmark, {
      y: '-30%',
      ease: 'none',
      scrollTrigger: {
        trigger: wordmark,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      },
    });
  }

  /* ═══════════════════════════════════════════════════════ */
  /*  IMAGE REVEAL ON SCROLL — progressive image loading     */
  /* ═══════════════════════════════════════════════════════ */
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      gsap.fromTo(entry.target, {
        opacity: 0, scale: 0.96, y: 15,
      }, {
        opacity: 1, scale: 1, y: 0,
        duration: 0.9, ease: EASE_SLOW,
      });
      imgObserver.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -5% 0px', threshold: 0.1 });

  document.querySelectorAll('.attr-card img, .mood-img-wrap img').forEach(img => {
    gsap.set(img, { opacity: 0 });
    imgObserver.observe(img);
  });

  /* ═══════════════════════════════════════════════════════ */
  /*  SMOOTH ANCHOR SCROLL                                   */
  /* ═══════════════════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      const top = target.getBoundingClientRect().top + window.scrollY - 40;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ═══════════════════════════════════════════════════════ */
  /*  INQUIRY MODAL                                          */
  /* ═══════════════════════════════════════════════════════ */
  const modal = document.getElementById('inquiryModal');
  const modalClose = document.getElementById('modalClose');
  const inquiryForm = document.getElementById('inquiryForm');
  const formMsg = document.getElementById('formMsg');

  function openModal() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    overlay.classList.remove('open');
  }
  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('ovInquiry')?.addEventListener('click', e => { e.preventDefault(); openModal(); });
  document.getElementById('dreamInquiry')?.addEventListener('click', e => { e.preventDefault(); openModal(); });
  modalClose?.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  /* ───────── FORM ───────── */
  inquiryForm.addEventListener('submit', async e => {
    e.preventDefault();
    formMsg.textContent = '';
    const fd = new FormData(inquiryForm);
    try {
      await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: fd.get('name'),
          email: fd.get('email'),
          password: 'inquiry-' + Date.now(),
        }),
      });
      formMsg.style.color = '#2e7d32';
      formMsg.textContent = "Thank you. We'll be in touch.";
      inquiryForm.reset();
    } catch {
      formMsg.style.color = 'var(--accent)';
      formMsg.textContent = 'Something went wrong. Please email us.';
    }
  });

})();
