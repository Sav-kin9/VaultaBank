// ========INITIALIZE FIREBASE========

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBfXEAt4f-GAnK3o_Ye0U-PPqSWG1GMTM",
  authDomain: "vaultabank.firebaseapp.com",
  projectId: "vaultabank",
  storageBucket: "vaultabank.appspot.com",
  messagingSenderId: "122695226609",
  appId: "1:122695226609:web:39dd0fbcdda8705bf44550",
  measurementId: "G-HN5GB1KTHY",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully.");
      window.location.href = "login.html";
    } catch (error) {
      alert('Logout failed: ' + error.message);
    }
  });
}

const usernameSpan = document.getElementById('username');
const fullNameEl = document.getElementById('fullName');
const idNumberEl = document.getElementById('idNumber');
const accountNumberEl = document.getElementById('accountNumber');

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      fullNameEl.textContent = data.fullName;
      idNumberEl.textContent = data.idNumber;
      accountNumberEl.textContent = data.accountNumber;
      usernameSpan.textContent = data.fullName.split(" ")[0];

      if (data.photoURL) {
        const photoEls = document.querySelectorAll("#userPhoto");
        photoEls.forEach(el => el.src = data.photoURL);
      }
    } else {
      alert("User data not found.");
    }
  }
});

// =====TOGGLE SIDEBAR AND OVERLAY=====

const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.sidebar');
const overlay = document.createElement('div');
overlay.classList.add('overlay');
document.body.appendChild(overlay);

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  sidebar.classList.toggle('active');
  overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
  menuToggle.classList.remove('active');
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
});

// =====DARK MODE TOGGLE WITH ICON, CHART UPDATE, LOCAL STORAGE & TOAST======

const darkToggle = document.getElementById('darkModeToggle');
const darkIcon = document.getElementById('darkIcon');
const toast = document.createElement('div');
toast.className = 'toast';
document.body.appendChild(toast);

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

function updateChartColors(isDark) {
  if (typeof transactionChart !== 'undefined') {
    transactionChart.options.scales.x.ticks.color = isDark ? '#ccc' : '#555';
    transactionChart.options.scales.y.ticks.color = isDark ? '#ccc' : '#555';
    transactionChart.update();
  }
}

function setDarkMode(enabled) {
  document.body.classList.toggle('dark', enabled);
  if (enabled) {
    darkIcon.classList.remove('fa-moon');
    darkIcon.classList.add('fa-sun');
    showToast("Dark mode activated ☀️");
  } else {
    darkIcon.classList.remove('fa-sun');
    darkIcon.classList.add('fa-moon');
    showToast("Light mode activated 🌞");
  }
  updateChartColors(enabled);
  localStorage.setItem('darkMode', enabled);
}

if (darkToggle) {
  darkToggle.addEventListener('click', (e) => {
    e.preventDefault();
    const isDark = !document.body.classList.contains('dark');
    setDarkMode(isDark);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const prefersDark = localStorage.getItem('darkMode') === 'true';
  setDarkMode(prefersDark);
});

// ===== CHART.JS TRANSACTION SUMMARY =====

const chartCanvas = document.getElementById('transactionChart');
if (chartCanvas) {
  const ctx = chartCanvas.getContext('2d');
  window.transactionChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Transactions ($)',
        data: [220, 480, 300, 600, 410, 300, 520],
        fill: true,
        tension: 0.4,
        backgroundColor: 'rgba(0, 179, 134, 0.1)',
        borderColor: '#00B386',
        pointBackgroundColor: '#00B386',
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: '#eee' },
          ticks: {
            color: document.body.classList.contains('dark') ? '#ccc' : '#555'
          }
        },
        x: {
          grid: { display: false },
          ticks: {
            color: document.body.classList.contains('dark') ? '#ccc' : '#555'
          }
        }
      }
    }
  });
}

// ========HIDE BALANCE TOGGLE JS SCRIPT=========

const toggleBtn = document.getElementById('toggleBalance');
if (toggleBtn) {
  let isHidden = false;
  toggleBtn.addEventListener('click', () => {
    const moneyEls = document.querySelectorAll('.money-value');
    isHidden = !isHidden;

    moneyEls.forEach(el => {
      if (isHidden) {
        el.textContent = '•••••••';
        el.classList.add('hidden-amount');
      } else {
        el.textContent = '$12,480.00'; // Replace with actual dynamic value later
        el.classList.remove('hidden-amount');
      }
    });

    toggleBtn.classList.toggle('fa-eye');
    toggleBtn.classList.toggle('fa-eye-slash');
  });
}
