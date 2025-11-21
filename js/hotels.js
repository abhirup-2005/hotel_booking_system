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
      name: "Delux Comfort Inn",
      location: "Kolkata",
      price: 4500,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "The Raj Bhavan",
      location: "Kolkata",
      price: 10000,
      image: "https://images.unsplash.com/photo-1558431382-9b06d0507edc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074"
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
      <button class="compare-btn" data-name="${hotel.name}">Compare</button>

    `;
      container.appendChild(card);
    });

    // ✅ Add click listeners for all “More Details” buttons
    const detailButtons = container.querySelectorAll(".more-details-btn");
    detailButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const hotelName = e.target.getAttribute("data-name");
        window.location.href = `hotel-details.html?name=${encodeURIComponent(hotelName)}`;
        // 🔹 Later: replace alert with modal or redirect logic
        // window.location.href = `hotel-details.html?name=${encodeURIComponent(hotelName)}`;
      });
    });

    // ------------------ COMPARE LOGIC ------------------
    let firstCompare = localStorage.getItem("compare1");

    // Function to apply highlight if already selected
    function applySelectedHighlight() {
      const cards = document.querySelectorAll(".hotel-card");
      cards.forEach(card => {
        const name = card.querySelector("h3").textContent.trim();
        if (name === firstCompare) {
          card.classList.add("selected-compare");
        } else {
          card.classList.remove("selected-compare");
        }
      });
    }

    // Highlight initially when page loads
    applySelectedHighlight();

    const compareButtons = container.querySelectorAll(".compare-btn");

    compareButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const hotelName = e.target.getAttribute("data-name");
        const card = e.target.closest(".hotel-card");

        // === UNSELECT FEATURE ===
        if (firstCompare === hotelName) {
          localStorage.removeItem("compare1");
          firstCompare = null;

          card.classList.remove("selected-compare");
          document.querySelectorAll(".compare-btn").forEach(b => b.classList.remove("selected"));
          document.querySelectorAll(".hotel-card").forEach(c => c.classList.remove("selected-compare"));

          return; // STOP here
        }

        //Normal Flow
        if (!firstCompare) {
          // First hotel selected
          localStorage.setItem("compare1", hotelName);
          firstCompare = hotelName;

          // Add highlight visually
          applySelectedHighlight();
          btn.classList.add("selected");    // turn button green
        } else {
          const secondCard = e.target.closest(".hotel-card");
          secondCard.classList.add("selected-compare");
          btn.classList.add("selected");    // turn button green

          // wait a moment, then redirect
          setTimeout(() => {
            window.location.href = `compare.html?h1=${encodeURIComponent(firstCompare)}&h2=${encodeURIComponent(hotelName)}`;
            localStorage.removeItem("compare1");
          }, 1000);
        }

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

  // Trigger search when pressing Enter
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchBtn.click(); // performs the same search
    }
  });

});
