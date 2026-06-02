window.addEventListener('load', () => {
  const loader = document.getElementById('loaderWrapper');
  if (loader) {
    setTimeout(() => { loader.classList.add('loader-hidden'); setTimeout(() => loader.style.display = 'none', 600); }, 800);
  }
});

// active nav + smooth scroll
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section, .hero');
function updateActiveLink() {
  let current = '';
  const scrollPos = window.scrollY + 150;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
}
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.getElementById(this.getAttribute('href').substring(1));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('navLinks')?.classList.remove('active');
    document.body.style.overflow = '';
  });
});
window.addEventListener('scroll', () => {
  updateActiveLink();
  const backBtn = document.getElementById('backToTop');
  if (window.scrollY > 500) backBtn.classList.add('show');
  else backBtn.classList.remove('show');
});
document.getElementById('backToTop')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// hamburger
document.getElementById('hamburger')?.addEventListener('click', () => {
  const menu = document.getElementById('navLinks');
  menu.classList.toggle('active');
  document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
});

// counter animation
const counters = document.querySelectorAll('.counter');
let started = false;
function startCounters() {
  counters.forEach(c => {
    const update = () => {
      const target = +c.dataset.target, current = +c.innerText;
      const inc = target / 70;
      if (current < target) { c.innerText = Math.ceil(current + inc); setTimeout(update, 20); }
      else c.innerText = target;
    };
    update();
  });
}
const statsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !started) { started = true; startCounters(); statsObserver.unobserve(entries[0].target); }
}, { threshold: 0.4 });
if (document.querySelector('.stats')) statsObserver.observe(document.querySelector('.stats'));

// scroll reveal
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
}, { threshold: 0.1 });
revealElements.forEach(el => revealObserver.observe(el));

// contact form
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
  e.preventDefault(); alert('Thank you! Your message has been received. We will contact you soon.'); e.target.reset();
});
document.getElementById('currentYear').innerText = new Date().getFullYear();
updateActiveLink();