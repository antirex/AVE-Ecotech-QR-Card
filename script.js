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
