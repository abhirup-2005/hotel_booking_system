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
