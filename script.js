// SCROLL: Change navbar background when scrolling past header
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  const header = document.querySelector(".header-container");
  const headerHeight = header ? header.offsetHeight : 0;

  if (window.scrollY > headerHeight - 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// HAMBURGER & SIDE MENU TOGGLE
const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('sideMenu');

if (hamburger && sideMenu) {
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
}

// ========== INTERSECTION OBSERVER 1: HEADER ANIMATION ==========
const headerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll('.header-text, .header-img').forEach(target => headerObserver.observe(target));

// ========== INTERSECTION OBSERVER 2: SERVICES SECTION ==========
const servicesObserverOptions = {
  threshold: 0.15
};

const slideInFromDirection = (element, direction) => {
  element.style.opacity = "0";
  element.style.transform = direction;
  element.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
};

const revealElement = (element) => {
  element.style.opacity = "1";
  element.style.transform = "translate(0, 0)";
};

const servicesObserver = new IntersectionObserver((entries, observerSelf) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      revealElement(entry.target);
      observerSelf.unobserve(entry.target); // animate once
    }
  });
}, servicesObserverOptions);

// Animate the container itself (fade-up)
const container = document.querySelector(".services-container");
if (container) {
  slideInFromDirection(container, "translateY(50px)");
  servicesObserver.observe(container);
}

// Animate individual service cards with varied direction
const cards = document.querySelectorAll(".service-card");
cards.forEach((card, index) => {
  const directions = [
    "translateX(-50px)",  // from left
    "translateY(50px)",   // from bottom
    "translateX(50px)",   // from right
    "translateY(-50px)"   // from top
  ];
  const direction = directions[index % directions.length];
  slideInFromDirection(card, direction);
  servicesObserver.observe(card);
});

// TESTIMONIALS // CONTACT US SECTION

let currentTestimonial = 0;
const testimonials = document.querySelectorAll(".testimonial");

function showNextTestimonial() {
  testimonials[currentTestimonial].classList.remove("active");
  testimonials[currentTestimonial].classList.add("leave");

  currentTestimonial = (currentTestimonial + 1) % testimonials.length;

  setTimeout(() => {
    testimonials.forEach((el) => el.classList.remove("leave"));
    testimonials[currentTestimonial].classList.add("active");
  }, 600); // match CSS transition time
}

setInterval(showNextTestimonial, 5000); // switch every 5s

// Animate fields on scroll into view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-visible');
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll('.form-group').forEach(field => observer.observe(field));

// Form Submission Feedback
const contactForm = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

contactForm.addEventListener("submit", function(e) {
  e.preventDefault();
  statusEl.textContent = "Sending...";

  setTimeout(() => {
    statusEl.textContent = "Message sent successfully! We'll get back to you soon.";
    contactForm.reset();
  }, 1500);
});


// SOCIAL MEDIA ICONS HERE
// SOCIAL MEDIA ICONS HERE

