// LOGIN JS CODE
// LOGIN JS CODE
// LOGIN JS CODE
// LOGIN JS CODE
// LOGIN JS CODE

// PASSWORD TOGGLE
document.addEventListener("DOMContentLoaded", () => {
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  togglePassword.addEventListener("click", () => {
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;
    togglePassword.textContent = type === "password" ? "👁️" : "🙈";
  });
});

// FORM SUBMISSION WITH VALIDATION AND BACKEND LOGIN
const form = document.getElementById("loginForm");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    showToast("Please fill in all fields");
    return;
  }

  if (!validateEmail(email)) {
    showToast("Invalid email address");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (result.success) {
      showToast("Login successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1500);
    } else {
      showToast("Invalid email or password.");
    }
  } catch (err) {
    showToast("Server error. Please try again.");
    console.error(err);
  }
});

// EMAIL VALIDATION
function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

// TOAST FUNCTION
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.display = "block";
  setTimeout(() => (toast.style.display = "none"), 3000);
}

// HAMBURGER TOGGLE
const hamburger = document.getElementById("hamburger");
const sideMenu = document.getElementById("sideMenu");

hamburger.addEventListener('click', () => {
  sideMenu.classList.toggle('open');
  hamburger.classList.toggle('open');
});

document.querySelectorAll('.mobile-nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    sideMenu.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

