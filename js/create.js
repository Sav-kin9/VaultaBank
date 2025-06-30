// SIGNUP JS CODE
// SIGNUP JS CODE
// SIGNUP JS CODE
// SIGNUP JS CODE


// Show/hide password
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", () => {
  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = type;
  togglePassword.textContent = type === "password" ? "👁️" : "🙈";
});

// Form validation and interaction
const form = document.getElementById("loginForm");
const loginCard = document.querySelector(".login-card");
const confirmPasswordInput = document.getElementById("confirmPassword");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value.trim() : null;

  if (!email || !password || (confirmPasswordInput && !confirmPassword)) {
    loginCard.classList.add("shake");
    showToast("Please fill in all fields");
    setTimeout(() => loginCard.classList.remove("shake"), 300);
  } else if (!validateEmail(email)) {
    loginCard.classList.add("shake");
    showToast("Invalid email address");
    setTimeout(() => loginCard.classList.remove("shake"), 300);
  } else if (confirmPasswordInput && password !== confirmPassword) {
    loginCard.classList.add("shake");
    showToast("Passwords do not match");
    setTimeout(() => loginCard.classList.remove("shake"), 300);
  } else {
    // Simulate successful login/signup
    showToast("Success! Redirecting...");
    setTimeout(() => {
      window.location.href = "dashboard.html"; // Or replace with actual path
    }, 1500);
  }
});

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.display = "block";
  setTimeout(() => (toast.style.display = "none"), 3000);
}

function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

// // Form validation and interaction ENDS HERE

const hamburger = document.getElementById('hamburger');
  const sideMenu = document.getElementById('sideMenu');
  const navbar = document.querySelector('.navbar');

  // Toggle Side Menu
  hamburger.addEventListener('click', () => {
    sideMenu.classList.toggle('open');
  });

  // Close side menu on link click (optional)
  document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      sideMenu.classList.remove('open');
    });
  });

  // Scroll-based background change
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });