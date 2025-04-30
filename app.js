// app.js - Updated with fixed navbar and scroll highlighting

document.addEventListener('DOMContentLoaded', () => {
  // Original dark mode functionality
  const html = document.documentElement;
  const darkToggle = document.getElementById('darkModeToggle');
  const darkIcon = document.getElementById('darkModeIcon');
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  const mobileMenu = document.getElementById('mobile-menu');

  // Load saved theme
  if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
    darkIcon.textContent = '🌙';
  } else {
    html.classList.remove('dark');
    darkIcon.textContent = '☀️';
  }

  // Toggle theme
  if (darkToggle) {
    darkToggle.addEventListener('click', () => {
      html.classList.toggle('dark');
      const isDark = html.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      darkIcon.textContent = isDark ? '🌙' : '☀️';
    });
  }

  // Mobile nav toggle
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Get all section elements and nav links
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const footerLinks = document.querySelectorAll('footer a[href^="#"]');
  
  // Add active class to navlinks for the current section
  const highlightNavLinks = () => {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100; // Offset for fixed navbar
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      const inViewport = (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight);
      
      // Update navbar links
      navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${sectionId}`) {
          if (inViewport) {
            link.classList.add('text-teal-500');
            link.classList.add('font-bold');
          } else {
            link.classList.remove('text-teal-500');
            link.classList.remove('font-bold');
          }
        }
      });
      
      // Update footer links
      footerLinks.forEach(link => {
        if (link.getAttribute('href') === `#${sectionId}`) {
          if (inViewport) {
            link.classList.add('text-teal-500');
          } else {
            link.classList.remove('text-teal-500');
          }
        }
      });
    });
    
    // Handle home link separately (active when at the top of the page)
    if (scrollY < 100) {
      navLinks.forEach(link => {
        if (link.getAttribute('href') === '#home') {
          link.classList.add('text-teal-500');
          link.classList.add('font-bold');
        }
      });
      
      footerLinks.forEach(link => {
        if (link.getAttribute('href') === '#home') {
          link.classList.add('text-teal-500');
        }
      });
    }
  };

  // Add scroll event listener
  window.addEventListener('scroll', highlightNavLinks);
  
  // Add click event listeners to smooth scroll
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Adjust for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
      }
    });
  });
  
  // Same for footer links
  footerLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Adjust for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Call once on load to set initial state
  highlightNavLinks();

  // Swiper init
  try {
    const swiper = new Swiper(".mySwiper", {
      slidesPerView: 3,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        640: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 5 }
      }
    });
  } catch (error) {
    console.error('Swiper initialization error:', error);
  }
});