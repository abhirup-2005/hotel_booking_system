document.addEventListener("DOMContentLoaded", () => {
  const themeBtn = document.getElementById("themeToggle");

  // ✅ 1. Load saved theme (if any)
  // const savedTheme = localStorage.getItem("theme");
  // if (savedTheme === "light") {
  //   document.body.classList.add("light-mode");
  //   if (themeBtn) themeBtn.textContent = "🌙 Dark";
  // } else {
  //   if (themeBtn) themeBtn.textContent = "☀️ Light";
  // }

  // ✅ 2. Toggle theme and save preference
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const isLight = document.body.classList.toggle("light-mode");
      localStorage.setItem("theme", isLight ? "light" : "dark");
      themeBtn.textContent = isLight ? "🌙 Dark" : "☀️ Light";
    });
  }
});

// === Hamburger Menu Toggle ===
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });

    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("show");
      });
    });
  }
});
