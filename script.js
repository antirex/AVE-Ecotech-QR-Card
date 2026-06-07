document.getElementById('year').textContent = new Date().getFullYear();

  // theme toggle (initial theme already applied in <head> to avoid flash)
  const themeToggle = document.getElementById('themeToggle');
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  themeToggle.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // sticky header
  const header = document.getElementById('header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  // mobile menu
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  // reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // inquiry form -> FormSubmit (AJAX) with graceful fallbacks
  const form = document.getElementById('inquiryForm');
  const submitBtn = document.getElementById('submitBtn');
  const formNote = document.getElementById('formNote');
  const formSuccess = document.getElementById('formSuccess');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    try {
      const res = await fetch('https://formsubmit.co/ajax/aveecotech@gmail.com', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });
      if (!res.ok) throw new Error('bad status');
      // success
      submitBtn.style.display = 'none';
      formNote.style.display = 'none';
      formSuccess.hidden = false;
      form.reset();
    } catch (err) {
      // fallback: open email client with details pre-filled
      const v = (id) => encodeURIComponent(document.getElementById(id).value || '');
      const body = `Name: ${v('name')}%0AEmail: ${v('email')}%0AOrganization: ${v('org')}%0A%0AProject Brief:%0A${v('brief')}`;
      window.location.href = `mailto:aveecotech@gmail.com?subject=${encodeURIComponent('Inquiry — AVE EcoTech')}&body=${body}`;
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Inquiry';
      formNote.textContent = 'Opening your email app… if nothing happens, write to aveecotech@gmail.com.';
    }
  });

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // intro loader (once per session, with safety auto-hide)
  const loader = document.getElementById('loader');
  if (loader) {
    const hide = () => loader.classList.add('done');
    let seen = false;
    try { seen = !!sessionStorage.getItem('introSeen'); sessionStorage.setItem('introSeen', '1'); } catch (e) {}
    if (seen || prefersReduced) {
      loader.style.transition = 'none';
      hide();
    } else {
      window.addEventListener('load', () => setTimeout(hide, 1150));
    }
    setTimeout(hide, 4000); // never trap the page
  }

  // animated counters
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.target) || 0;
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    if (prefersReduced || target === 0) { el.textContent = prefix + target + suffix; return; }
    const dur = 1500, start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    // safety: guarantee the final value even if the frame loop is interrupted
    setTimeout(() => { el.textContent = prefix + target + suffix; }, dur + 400);
  };
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { animateCount(e.target); countIO.unobserve(e.target); } });
  }, { threshold: 0.4 });
  document.querySelectorAll('.count').forEach((c) => countIO.observe(c));

  // magnetic buttons (fine pointers only)
  if (window.matchMedia('(pointer: fine)').matches && !prefersReduced) {
    document.querySelectorAll('.btn-fill, .theme-toggle').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.4}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  // hero parallax
  if (!prefersReduced) {
    const heroMedia = document.querySelector('.hero-media');
    if (heroMedia) {
      let ticking = false;
      const apply = () => { const y = window.scrollY; if (y < 1000) heroMedia.style.transform = `translateY(${y * 0.06}px)`; ticking = false; };
      window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(apply); ticking = true; } }, { passive: true });
    }
  }
