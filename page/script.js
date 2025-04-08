// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
  });
}

// Close menu when clicking on nav links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      navMenu.classList.remove('active');
      hamburger.textContent = '☰';
    }
  });
});

// Dark/Light mode toggle
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or default to light
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Photo slider functionality
const slider = document.querySelector('.slider-container');
const slides = document.querySelectorAll('.slide');
const slideWidth = slides[0].offsetWidth + 32; // width + margin

// Clone slides for infinite loop
slides.forEach(slide => {
  const clone = slide.cloneNode(true);
  slider.appendChild(clone);
});

// Pause animation on hover
slider.addEventListener('mouseenter', () => {
  slider.style.animationPlayState = 'paused';
});

slider.addEventListener('mouseleave', () => {
  slider.style.animationPlayState = 'running';
});

// Reset slider position when animation completes
slider.addEventListener('animationiteration', () => {
  slider.style.transform = 'translateX(0)';
});

// Scroll animations
function initScrollAnimations() {
  const animateElements = document.querySelectorAll('.content-card, .about, .gallery-item, .contact');
  
  // Initialize elements
  animateElements.forEach(el => {
    el.classList.add('scroll-animate');
    
    if (el.classList.contains('content-card') || el.classList.contains('about') || el.classList.contains('contact')) {
      el.classList.add('slide-up');
    } else if (el.classList.contains('gallery-item')) {
      el.classList.add('pop-up');
    }
  });

  // Set up IntersectionObserver with more sensitive thresholds
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        entry.target.classList.remove('fade-out');
        entry.target.style.visibility = 'visible';
      } else {
        entry.target.classList.add('fade-out');
        entry.target.classList.remove('fade-in');
        entry.target.style.visibility = 'hidden';
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  });

  // Observe all animate elements
  animateElements.forEach(el => {
    observer.observe(el);
  });

  // Manually trigger first check in case elements are already visible
  animateElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('fade-in');
      el.style.visibility = 'visible';
    }
  });
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', initScrollAnimations);
