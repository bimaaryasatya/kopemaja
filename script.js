// Dark/Light mode toggle
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
                    (prefersDarkScheme.matches ? 'dark' : 'light');
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
