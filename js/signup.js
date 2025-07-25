// ====== PASSWORD TOGGLE ======
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", () => {
  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = type;
  togglePassword.textContent = type === "password" ? "👁️" : "🙈";
});

// ====== FIREBASE SDK SETUP ======
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

// ====== CONFIGURE FIREBASE ======
const firebaseConfig = {
  apiKey: "AIzaSyBfXEAt4f-GAnKJ3o_Ye0U-PPqSWG1GMTM",
  authDomain: "vaultabank.firebaseapp.com",
  projectId: "vaultabank",
  storageBucket: "vaultabank.firebasestorage.app",
  messagingSenderId: "122695226609",
  appId: "1:122695226609:web:4c37346c32a92640f44550",
  measurementId: "G-KSVNV5DMWC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// ====== SIGNUP FORM LOGIC ======
const signupForm = document.getElementById("loginForm");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const profilePhoto = document.getElementById("profilePhoto").files[0];

  if (!fullName || !email || !password || !confirmPassword || !profilePhoto) {
    showToast("Please fill in all fields");
    return;
  }

  if (password !== confirmPassword) {
    showToast("Passwords do not match");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Upload profile photo
    const photoRef = ref(storage, `users/${user.uid}/profile.jpg`);
    await uploadBytes(photoRef, profilePhoto);
    const photoURL = await getDownloadURL(photoRef);

    // Generate ID and Account Number
    const idNumber = "ID" + Date.now().toString().slice(-6);
    const accountNumber = "AC" + Math.floor(100000000 + Math.random() * 900000000);

    // Save to Firestore
    await setDoc(doc(db, "users", user.uid), {
      fullName,
      email,
      idNumber,
      accountNumber,
      photoURL,
      uid: user.uid,
      createdAt: new Date()
    });

    // Update Firebase profile
    await updateProfile(user, {
      displayName: fullName,
      photoURL
    });

    showToast("Signup successful! Redirecting...");
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1500);

  } catch (error) {
    console.error("Signup error:", error);
    showToast("Error: " + error.message);
  }
});

// ====== TOAST MESSAGE ======
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.display = "block";
  setTimeout(() => (toast.style.display = "none"), 3000);
}

// ====== SIDE MENU + NAVBAR SCROLL ======
const hamburger = document.getElementById("hamburger");
const sideMenu = document.getElementById("sideMenu");
const navbar = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
  sideMenu.classList.toggle("open");
});

document.querySelectorAll(".mobile-nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    sideMenu.classList.remove("open");
  });
});

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});
