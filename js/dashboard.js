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

// =====DARK MODE TOGGLE======

const darkToggle = document.getElementById('darkModeToggle');
const darkIcon = document.getElementById('darkIcon');

darkToggle.addEventListener('click', (e) => {
  e.preventDefault();
  document.body.classList.toggle('dark');



// ========TOGGLE ICON BETWEEN MOON AND SUN========

  if (document.body.classList.contains('dark')) {
    darkIcon.classList.remove('fa-moon');
    darkIcon.classList.add('fa-sun');
  } else {
    darkIcon.classList.remove('fa-sun');
    darkIcon.classList.add('fa-moon');
  }
});


// ===== CHART.JS TRANSACTION SUMMARY =====

  const ctx = document.getElementById('transactionChart').getContext('2d');
  const transactionChart = new Chart(ctx, {
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

// ========HIDE BALANCE TOGGLE JS SCRIPT=========

const toggleBtn = document.getElementById('toggleBalance');
let isHidden = false;

toggleBtn.addEventListener('click', () => {
  const moneyEls = document.querySelectorAll('.money-value');
  isHidden = !isHidden;

  moneyEls.forEach(el => {
    if (isHidden) {
      el.textContent = '•••••••';
      el.classList.add('hidden-amount');
    } else {
      el.textContent = '$12,480.00'; // You can dynamically pull real value here later
      el.classList.remove('hidden-amount');
    }
  });

  toggleBtn.classList.toggle('fa-eye');
  toggleBtn.classList.toggle('fa-eye-slash');
});
