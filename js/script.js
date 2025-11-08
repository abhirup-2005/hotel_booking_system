// === Common Script for All Pages ===

document.addEventListener("DOMContentLoaded", () => {
  const themeBtn = document.getElementById("themeToggle");
  if (!themeBtn) return; // if button not found on page

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    themeBtn.textContent = document.body.classList.contains("light-mode")
      ? "🌙 Dark Mode"
      : "☀️ Light Mode";
  });
});
