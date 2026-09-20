  // intro loader (once per session, with safety auto-hide) — runs first so nothing below can trap the page
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const loader = document.getElementById('loader');
  if (loader) {
    const hide = () => loader.classList.add('done');
    let seen = false;
    try { seen = !!sessionStorage.getItem('introSeen'); sessionStorage.setItem('introSeen', '1'); } catch (e) {}
    if (seen || prefersReduced) {
      loader.style.transition = 'none';
      hide();
    } else {
      window.addEventListener('load', () => setTimeout(hide, 1000));
    }
    setTimeout(hide, 4000); // never trap the page
  }

  document.getElementById('year').textContent = new Date().getFullYear();

  // theme toggle (initial theme already applied in <head> to avoid flash)
  const themeToggle = document.getElementById('themeToggle');
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
  const setMenu = (open) => { navLinks.classList.toggle('open', open); burger.setAttribute('aria-expanded', String(open)); };
  burger.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

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
      const body = `Name: ${v('name')}%0AEmail: ${v('email')}%0APhone: ${v('phone')}%0AOrganisation: ${v('org')}%0A%0AArea, finish and site:%0A${v('brief')}`;
      window.location.href = `mailto:aveecotech@gmail.com?subject=${encodeURIComponent('Inquiry — AVE EcoTech')}&body=${body}`;
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send inquiry';
      formNote.textContent = 'Opening your email app… if nothing happens, write to aveecotech@gmail.com.';
    }
  });

  // colour picker: click a swatch, the tile photo changes
  const tileImg = document.getElementById('tileImg');
  const tileNote = document.getElementById('tileNote');
  const colourName = document.getElementById('colourName');
  const swatches = Array.from(document.querySelectorAll('.swatch'));
  swatches.forEach((sw) => { const pre = new Image(); pre.src = sw.dataset.img; }); // preload so the swap is instant
  const pickColour = (sw) => {
    if (sw.classList.contains('is-on')) return;
    swatches.forEach((o) => { const on = o === sw; o.classList.toggle('is-on', on); o.setAttribute('aria-checked', String(on)); });
    colourName.textContent = sw.dataset.name;
    tileNote.textContent = sw.dataset.note;
    tileImg.classList.add('is-swapping');
    setTimeout(() => {
      tileImg.src = sw.dataset.img;
      tileImg.alt = 'EcoTiles — ' + sw.dataset.name;
      tileImg.classList.remove('is-swapping');
    }, 180);
  };
  swatches.forEach((sw, i) => {
    sw.addEventListener('click', () => pickColour(sw));
    sw.addEventListener('keydown', (e) => {
      const step = (e.key === 'ArrowRight' || e.key === 'ArrowDown') ? 1 : (e.key === 'ArrowLeft' || e.key === 'ArrowUp') ? -1 : 0;
      if (!step) return;
      e.preventDefault();
      const next = swatches[(i + step + swatches.length) % swatches.length];
      next.focus(); pickColour(next);
    });
  });

  // brochure: ask who is downloading (lead), then hand over the PDF
  const BROCHURE = 'AVE-EcoTech-Brochure.pdf';
  const dialog = document.getElementById('brochureDialog');
  const bForm = document.getElementById('brochureForm');
  const bSubmit = document.getElementById('brochureSubmit');
  const bNote = document.getElementById('brochureNote');
  const startDownload = () => {
    const a = document.createElement('a');
    a.href = BROCHURE; a.download = 'AVE-EcoTech-Brochure.pdf'; // same-origin download: no new tab, so no popup blocker
    document.body.appendChild(a); a.click(); a.remove();
  };
  const alreadyGiven = () => { try { return !!localStorage.getItem('brochureLead'); } catch (e) { return false; } };
  document.querySelectorAll('[data-brochure]').forEach((el) => el.addEventListener('click', (e) => {
    e.preventDefault();
    if (alreadyGiven() || !dialog || typeof dialog.showModal !== 'function') { startDownload(); return; }
    dialog.showModal();
  }));
  if (dialog) {
    document.getElementById('brochureClose').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); }); // click on the backdrop
    bForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!bForm.reportValidity()) return;
      bSubmit.disabled = true;
      bSubmit.textContent = 'Preparing…';
      try {
        await fetch('https://formsubmit.co/ajax/aveecotech@gmail.com', { method: 'POST', headers: { 'Accept': 'application/json' }, body: new FormData(bForm) });
      } catch (err) { /* never hold the brochure hostage to a network error */ }
      try { localStorage.setItem('brochureLead', '1'); } catch (err) {}
      startDownload();
      bSubmit.style.display = 'none';
      bNote.innerHTML = 'Thank you — your download has started. If it has not, <a href="' + BROCHURE + '" target="_blank" rel="noopener">open the brochure here</a>.';
    });
  }

  // hero bond: once the courses are laid, the clay brick moves to a new place every few seconds
  const bricks = Array.from(document.querySelectorAll('.bond .brick'));
  if (bricks.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(() => {
      if (document.hidden) return;
      const current = bricks.findIndex((b) => b.classList.contains('is-clay'));
      let next = current;
      while (next === current) next = Math.floor(Math.random() * bricks.length);
      bricks[current].classList.remove('is-clay');
      bricks[next].classList.add('is-clay');
    }, 3200);
  }
