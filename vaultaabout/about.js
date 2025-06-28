// === NAVBAR, SIDEMENU, HAMBURGER ===

// Select elements
const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('sideMenu');
const navbar = document.querySelector('.navbar');

// Toggle hamburger and side menu
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  sideMenu.classList.toggle('active');
  document.body.classList.toggle('menu-open'); // Optional: disables scroll
});

// Close side menu when a link is clicked
document.querySelectorAll('.side-menu a, .mobile-nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    sideMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
  });
});

// Change navbar style on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});
