// ====================
// 1. LOADER ANIMATION
// ====================
window.addEventListener('load', () => {
  const loader = document.getElementById('loaderWrapper');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('loader-hidden');
      setTimeout(() => {
        loader.style.display = 'none';
      }, 600);
    }, 800);
  }
});

// ====================
// 2. STICKY NAV + ACTIVE LINKS + SMOOTH SCROLL
// ====================
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section, .hero');
const navbar = document.getElementById('navbar');

function updateActiveLink() {
  let current = '';
  const scrollPos = window.scrollY + 150;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // close mobile menu after click
      const navMenu = document.getElementById('navLinks');
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
});

window.addEventListener('scroll', () => {
  updateActiveLink();
  // Navbar background sticky effect
  if (window.scrollY > 10) {
    navbar.style.background = 'rgba(10, 25, 47, 0.98)';
  } else {
    navbar.style.background = 'rgba(10, 25, 47, 0.95)';
  }
  // back to top button
  const backBtn = document.getElementById('backToTop');
  if (window.scrollY > 500) {
    backBtn.classList.add('show');
  } else {
    backBtn.classList.remove('show');
  }
});

// Back to top functionality
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ====================
// 3. HAMBURGER MENU (Mobile)
// ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// ====================
// 4. ANIMATED COUNTERS (Statistics)
// ====================
const counters = document.querySelectorAll('.counter');
let started = false;

function startCounters() {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = parseInt(counter.getAttribute('data-target'));
      const current = parseInt(counter.innerText);
      const increment = target / 80;
      if (current < target) {
        counter.innerText = Math.ceil(current + increment);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
}

// Trigger counters when stats section is visible
const statsSection = document.querySelector('.stats');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !started) {
      started = true;
      startCounters();
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
if (statsSection) observer.observe(statsSection);

// ====================
// 5. SCROLL REVEAL ANIMATION
// ====================
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1 });
revealElements.forEach(el => revealObserver.observe(el));

// ====================
// 6. CONTACT FORM SUBMIT (demo alert)
// ====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! Your message has been received. We will contact you soon.');
    contactForm.reset();
  });
}

// ====================
// 7. UPDATE FOOTER YEAR
// ====================
document.getElementById('currentYear').innerText = new Date().getFullYear();

// ====================
// 8. Ensure active link on page load
// ====================
setTimeout(() => {
  updateActiveLink();
}, 200);