const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-box input");

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();

  // redirect with query in URL
  window.location.href = `hotels.html?search=${encodeURIComponent(query)}`;
});
