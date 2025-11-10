document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("hotelSearchInput");
  const searchBtn = document.getElementById("hotelSearchBtn");
  const resultsDiv = document.getElementById("searchResults");
  const noResults = document.getElementById("noResults");
  const recommendedDiv = document.getElementById("recommendedHotels");
  const recommendedSection = document.getElementById("recommendedSection");

  // ---- Mock Hotel Data ----
const hotels = [
  {
    name: "Goa Paradise Resort",
    location: "Goa",
    price: 5500,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Jaipur Heritage Palace",
    location: "Jaipur",
    price: 4800,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Manali SnowView Hotel",
    location: "Manali",
    price: 6000,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Mumbai Elite Towers",
    location: "Mumbai",
    price: 7000,
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80"

  },
  {
    name: "Delhi Comfort Inn",
    location: "Delhi",
    price: 4500,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
  }
];


  // ---- Load search query from URL ----
  const params = new URLSearchParams(window.location.search);
  const query = params.get("search")?.trim().toLowerCase() || "";
  searchInput.value = query;

  // ---- Render hotels ----
  function renderHotels(list, container) {
  container.innerHTML = "";
  list.forEach(hotel => {
    const card = document.createElement("div");
    card.classList.add("hotel-card");
    card.innerHTML = `
      <img src="${hotel.image}" alt="${hotel.name}">
      <h3>${hotel.name}</h3>
      <p>${hotel.location}</p>
      <p>₹${hotel.price.toLocaleString()}/night</p>
      <button class="more-details-btn" data-name="${hotel.name}">More Details</button>
    `;
    container.appendChild(card);
  });

  // ✅ Add click listeners for all “More Details” buttons
  const detailButtons = container.querySelectorAll(".more-details-btn");
  detailButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const hotelName = e.target.getAttribute("data-name");
      alert(`Showing details for: ${hotelName}`);
      // 🔹 Later: replace alert with modal or redirect logic
      // window.location.href = `hotel-details.html?name=${encodeURIComponent(hotelName)}`;
    });
  });
}


  function performSearch(q) {
    const matched = hotels.filter(
      h =>
        h.name.toLowerCase().includes(q) ||
        h.location.toLowerCase().includes(q)
    );

    // Clear previous results
    resultsDiv.innerHTML = "";
    recommendedDiv.innerHTML = "";
    noResults.style.display = "none";
    recommendedSection.style.display = "none";

    if (matched.length > 0) {
      renderHotels(matched, resultsDiv);

      // Remaining hotels for recommendation
      const remaining = hotels.filter(h => !matched.includes(h));
      if (remaining.length > 0) {
        renderHotels(remaining, recommendedDiv);
        recommendedSection.style.display = "block";
      }
    } else {
      noResults.style.display = "block";
      renderHotels(hotels, recommendedDiv);
      recommendedSection.style.display = "block";
    }
  }

  // ---- Initial search ----
  performSearch(query);

  // ---- On new search ----
  searchBtn.addEventListener("click", () => {
  const newQuery = searchInput.value.trim().toLowerCase();
  performSearch(newQuery);

  // ✅ Update URL parameter so the latest search persists on reload
  const newUrl = `${window.location.pathname}?search=${encodeURIComponent(newQuery)}`;
  window.history.replaceState(null, "", newUrl);
});
});
