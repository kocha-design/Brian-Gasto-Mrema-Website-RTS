// ==========================
// 1. LOADER ANIMATION
// ==========================
(function initLoader() {
  const loader = document.getElementById('loaderWrapper');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('loader-hidden');
      setTimeout(() => {
        loader.style.display = 'none';
      }, 600);
    }, 800);
  });
})();

// ==========================
// 2. STICKY NAV & ACTIVE LINK & BACK TO TOP
// ==========================
const navbar = document.getElementById('navbar');
const backBtn = document.getElementById('backToTop');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section, .hero');

function updateActiveLink() {
  const scrollPos = window.scrollY + 150;
  let current = '';
  sections.forEach(section => {
    const id = section.getAttribute('id');
    if (!id) return;
    const top = section.offsetTop;
    const bottom = top + section.clientHeight;
    if (scrollPos >= top && scrollPos < bottom) current = id;
  });
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === `#${current}`);
  });
}

function handleNavbarStyle() {
  if (!navbar) return;
  const scrolled = window.scrollY > 10;
  navbar.style.background = scrolled ? 'rgba(10, 25, 47, 0.98)' : 'rgba(10, 25, 47, 0.96)';
}

function handleBackToTop() {
  if (!backBtn) return;
  const show = window.scrollY > 500;
  backBtn.classList.toggle('show', show);
}

window.addEventListener('scroll', () => {
  updateActiveLink();
  handleNavbarStyle();
  handleBackToTop();
});

if (backBtn) {
  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ==========================
// 3. SMOOTH SCROLL (with mobile menu close)
// ==========================
const navMenu = document.getElementById('navLinks');
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;
    e.preventDefault();
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // close mobile menu if open
    if (navMenu && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

// ==========================
// 4. HAMBURGER MENU
// ==========================
const hamburger = document.getElementById('hamburger');
if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    const isActive = navMenu.classList.toggle('active');
    document.body.style.overflow = isActive ? 'hidden' : '';
  });
}

// ==========================
// 5. ANIMATED COUNTERS (with IntersectionObserver)
// ==========================
const counters = document.querySelectorAll('.counter');
let countersStarted = false;

function animateCounters() {
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    let current = 0;
    const update = () => {
      const step = Math.ceil(target / 70);
      current += step;
      if (current < target) {
        counter.innerText = current;
        requestAnimationFrame(update);
      } else {
        counter.innerText = target;
      }
    };
    update();
  });
}

const statsSection = document.querySelector('.stats');
if (statsSection && counters.length) {
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !countersStarted) {
      countersStarted = true;
      animateCounters();
      statsObserver.unobserve(statsSection);
    }
  }, { threshold: 0.4 });
  statsObserver.observe(statsSection);
}

// ==========================
// 6. SCROLL REVEAL
// ==========================
const revealElements = document.querySelectorAll('.reveal');
if (revealElements.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  }, { threshold: 0.1 });
  revealElements.forEach(el => revealObserver.observe(el));
}

// ==========================
// 7. CONTACT FORM SUBMIT
// ==========================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! Your message has been received. We will contact you soon.');
    contactForm.reset();
  });
}

// ==========================
// 8. FOOTER YEAR
// ==========================
const yearSpan = document.getElementById('currentYear');
if (yearSpan) yearSpan.innerText = new Date().getFullYear();

// ==========================
// 9. FAQ ACCORDION (clean & efficient)
// ==========================
const faqQuestions = document.querySelectorAll('.faq-question');
if (faqQuestions.length) {
  function closeAllFaqItems(exceptItem = null) {
    document.querySelectorAll('.faq-item').forEach(item => {
      if (exceptItem && item === exceptItem) return;
      if (item.classList.contains('open')) {
        item.classList.remove('open');
        const ans = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-question i');
        if (ans) ans.style.maxHeight = null;
        if (icon) {
          icon.classList.remove('fa-minus');
          icon.classList.add('fa-plus');
        }
      }
    });
  }

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const answer = faqItem.querySelector('.faq-answer');
      const icon = question.querySelector('i');
      const isOpen = faqItem.classList.contains('open');

      if (!isOpen) closeAllFaqItems(faqItem);

      faqItem.classList.toggle('open');
      if (answer) {
        if (!isOpen) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
          answer.style.maxHeight = null;
        }
      }
      if (icon) {
        icon.classList.toggle('fa-minus', !isOpen);
        icon.classList.toggle('fa-plus', isOpen);
      }
    });
  });
}

// ==========================
// 10. INITIAL ACTIVE LINK
// ==========================
setTimeout(() => {
  updateActiveLink();
}, 100);