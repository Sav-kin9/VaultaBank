// SCROLL: Change navbar background when scrolling past header
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  const header = document.querySelector(".header-container");
  const headerHeight = header.offsetHeight;

  if (window.scrollY > headerHeight - 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// HAMBURGER & SIDE MENU TOGGLE
const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('sideMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  sideMenu.classList.toggle('active');
  document.body.classList.toggle('menu-open'); // Prevent background scroll
});

// CLOSE SIDE MENU WHEN A LINK IS CLICKED
document.querySelectorAll('.side-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    sideMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
  });
});

// INTERSECTION OBSERVER FOR ANIMATIONS
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll('.header-text, .header-img').forEach(target => observer.observe(target));
