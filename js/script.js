document.addEventListener("DOMContentLoaded", () => {
  const themeBtn = document.getElementById("themeToggle");

  // Load saved theme (if any)
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    if (themeBtn) themeBtn.textContent = "🌙 Dark";
  } else {
    if (themeBtn) themeBtn.textContent = "☀️ Light";
  }

  // Toggle theme and save preference
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const isLight = document.body.classList.toggle("light-mode");
      localStorage.setItem("theme", isLight ? "light" : "dark");
      themeBtn.textContent = isLight ? "🌙 Dark" : "☀️ Light";
    });
  }
});

// === Smooth Hamburger Menu with Overlay ===
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const overlay = document.getElementById("navOverlay");

  if (hamburger && navMenu) {

    function openMenu() {
      navMenu.classList.add("show");
      overlay.classList.add("show");
      hamburger.textContent = "✖";
      hamburger.classList.add("rotate");
      document.body.style.overflow = "hidden"; // disable background scrolling
    }

    function closeMenu() {
      navMenu.classList.remove("show");
      overlay.classList.remove("show");
      hamburger.textContent = "☰";
      hamburger.classList.remove("rotate");
      document.body.style.overflow = ""; // restore scroll
    }

    // Toggle menu when hamburger clicked
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      if (navMenu.classList.contains("show")) closeMenu();
      else openMenu();
    });

    // Close when clicking any nav link
    navMenu.querySelectorAll("a, button").forEach(item => {
      item.addEventListener("click", () => closeMenu());
    });

    // Close when clicking outside (overlay)
    overlay.addEventListener("click", () => closeMenu());

    // Extra: Close if user taps outside on page
    document.addEventListener("click", (e) => {
      if (
        navMenu.classList.contains("show") &&
        !navMenu.contains(e.target) &&
        e.target !== hamburger
      ) {
        closeMenu();
      }
    });
  }
});


// === Back to Top Button ===
document.addEventListener("DOMContentLoaded", () => {
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      backToTop.style.display = "block";
      backToTop.style.opacity = "1";
    } else {
      backToTop.style.opacity = "0";
      setTimeout(() => {
        backToTop.style.display = "none";
      }, 300);
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});

// ============================
// AUTH MODAL SYSTEM
// ============================

const authModal = document.getElementById("authModal");
const closeAuth = document.getElementById("closeAuth");

closeAuth.addEventListener("click", () => {
  authModal.style.display = "none";
});




// ============================
// SIGN UP (LocalStorage)
// ============================

document.getElementById("signUpSubmit").addEventListener("click", () => {
  const name = suName.value.trim();
  const email = suEmail.value.trim();
  const user = suUser.value.trim();
  const pass = suPass.value;
  const cpass = suCPass.value;

  const error = document.getElementById("suError");

  if (!name || !email || !user || !pass || !cpass) {
    error.style.color = "#f94e4eff";
    error.textContent = "All fields are required!";
    return;
  }

  if (pass !== cpass) {
    error.style.color = "#f94e4eff";
    error.textContent = "Passwords do not match!";
    return;
  }

  // Save user in storage
  const userData = { name, email, user, pass };
  localStorage.setItem("eliteUser", JSON.stringify(userData));

  error.style.color = "#4caf50";
  error.textContent = "Account created! Please sign in.";

});


// ============================
// SIGN IN (LocalStorage)
// ============================

document.getElementById("signInSubmit").addEventListener("click", () => {
  const loginId = siUser.value.trim(); // username OR email
  const pass = siPass.value;
  const error = document.getElementById("siError");

  const saved = JSON.parse(localStorage.getItem("eliteUser"));

  if (!saved) {
    error.textContent = "No account found!";
    return;
  }

  if (loginId !== saved.user && loginId !== saved.email) {
    error.textContent = "Username / Email not found!";
    return;
  }

  if (pass !== saved.pass) {
    error.textContent = "Incorrect password!";
    return;
  }

  // SUCCESS
  localStorage.setItem("eliteLogged", "yes");

  authModal.style.display = "none";
  applyUserLoggedUI();
});


// ============================
// UPDATE UI WHEN LOGGED IN
// ============================

function applyUserLoggedUI() {
  const isLogged = localStorage.getItem("eliteLogged");

  if (isLogged) {
    document.querySelectorAll(".sign-up").forEach(el => {
      el.textContent = "Profile";
    });
  }
}

applyUserLoggedUI();

// ============================
// PROFILE MODAL
// ============================

const profileModal = document.getElementById("profileModal");
const closeProfile = document.getElementById("closeProfile");

function openProfileModal() {
  const user = JSON.parse(localStorage.getItem("eliteUser"));
  if (!user) return;

  document.getElementById("pfName").textContent = user.name;
  document.getElementById("pfUser").textContent = user.user;
  document.getElementById("pfEmail").textContent = user.email;

  profileModal.style.display = "flex";
}

closeProfile.addEventListener("click", () => {
  profileModal.style.display = "none";
});




// ============================
// LOG OUT
// ============================

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("eliteLogged");
  profileModal.style.display = "none";

  // Restore sign-up texts
  document.querySelectorAll(".sign-up").forEach(el => {
    el.textContent = "Sign Up";
  });
});

// ============================
// DELETE ACCOUNT (with password confirm)
// ============================

// Step 1: Show password prompt
document.getElementById("deleteBtn").addEventListener("click", () => {
  document.getElementById("deleteConfirmBox").style.display = "block";
});

// Step 2: Final delete after password check
document.getElementById("finalDeleteBtn").addEventListener("click", () => {
  const passInput = document.getElementById("deletePassInput").value;
  const errorMsg = document.getElementById("deleteError");

  const savedUser = JSON.parse(localStorage.getItem("eliteUser"));
  if (!savedUser) return;

  if (passInput !== savedUser.pass) {
    errorMsg.textContent = "Incorrect password!";
    return;
  }

  // Password correct → delete account
  localStorage.removeItem("eliteLogged");
  localStorage.removeItem("eliteUser");

  // Optional cleanup (not needed if reloading)
  document.getElementById("deleteConfirmBox").style.display = "none";
  document.getElementById("deletePassInput").value = "";
  document.getElementById("deleteError").textContent = "";

  // Refresh the page to reset ALL UI
  location.reload();

  // Clean up confirmation box for next time
  document.getElementById("deleteConfirmBox").style.display = "none";
  document.getElementById("deletePassInput").value = "";
  errorMsg.textContent = "";
});

// ============================
// UNIFIED SIGN-UP / PROFILE CLICK HANDLER
// ============================

document.querySelectorAll(".sign-up").forEach(el => {
  el.addEventListener("click", (e) => {
    e.preventDefault();

    const isLogged = localStorage.getItem("eliteLogged");

    if (isLogged) {
      // Open Profile modal
      openProfileModal();
    } else {
      // Open Sign up / Sign in modal
      authModal.style.display = "flex";
    }
  });
});
