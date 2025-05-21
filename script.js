// DOM Elements
const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const bookingForm = document.getElementById('booking-form');
const confirmationMessage = document.getElementById('confirmation-message');
const categoryTabs = document.querySelectorAll('.category-tab');
const filterBtns = document.querySelectorAll('.filter-btn');

// Header scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Close menu when clicking on a nav link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');

    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Active navigation link based on scroll position
function highlightNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.pageYOffset + 150;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - header.offsetHeight;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNavLink);

// Service category tabs
categoryTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    categoryTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const category = tab.getAttribute('data-category');
    const tableRows = document.querySelectorAll('.services-table tbody tr');

    tableRows.forEach(row => {
      if (category === 'all') {
        row.style.display = '';
      } else if (row.classList.contains(category)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
});

// Gallery filter
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
      if (filter === 'all') {
        item.style.display = '';
      } else if (item.classList.contains(filter)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Booking form submission
if (bookingForm) {
  bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    bookingForm.style.display = 'none';
    confirmationMessage.style.display = 'block';
    confirmationMessage.scrollIntoView({ behavior: 'smooth' });
  });
}

// Testimonial slider drag-to-scroll
const testimonialSlider = document.querySelector('.testimonials-slider');
let isDown = false;
let startX;
let scrollLeft;

if (testimonialSlider) {
  testimonialSlider.addEventListener('mousedown', (e) => {
    isDown = true;
    testimonialSlider.classList.add('active');
    startX = e.pageX - testimonialSlider.offsetLeft;
    scrollLeft = testimonialSlider.scrollLeft;
  });

  testimonialSlider.addEventListener('mouseleave', () => {
    isDown = false;
    testimonialSlider.classList.remove('active');
  });

  testimonialSlider.addEventListener('mouseup', () => {
    isDown = false;
    testimonialSlider.classList.remove('active');
  });

  testimonialSlider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - testimonialSlider.offsetLeft;
    const walk = (x - startX) * 2;
    testimonialSlider.scrollLeft = scrollLeft - walk;
  });
}

// Newsletter subscription
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = this.querySelector('input[type="email"]');

    if (emailInput.value) {
      const message = document.createElement('p');
      message.textContent = 'Thank you for subscribing!';
      message.style.color = '#f5a5a7';
      message.style.marginTop = '10px';

      const inputContainer = emailInput.parentElement;
      inputContainer.appendChild(message);
      emailInput.value = '';

      setTimeout(() => {
        inputContainer.removeChild(message);
      }, 3000);
    }
  });
}

// Run on load
document.addEventListener('DOMContentLoaded', function() {
  highlightNavLink();
});
