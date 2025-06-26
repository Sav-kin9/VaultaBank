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

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    loginCard.classList.add("shake");
    showToast("Please fill in all fields");
    setTimeout(() => loginCard.classList.remove("shake"), 300);
  } else if (!validateEmail(email)) {
    showToast("Invalid email address");
    loginCard.classList.add("shake");
    setTimeout(() => loginCard.classList.remove("shake"), 300);
  } else {
    // Simulate successful login
    showToast("Login successful! Redirecting...");
    setTimeout(() => {
      // Replace this with real redirect
      window.location.href = "dashboard.html";
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
