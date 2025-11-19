const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-box input");

searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();

    // redirect with query in URL
    window.location.href = `hotels.html?search=${encodeURIComponent(query)}`;
});

// === Dynamic Destinations Slider ===
const destSlider = document.getElementById("destSlider");

if (destSlider) {
    // same hotel data source (simplified for demo)
    const destinations = [
        {
            name: "Goa",
            image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "Jaipur",
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "Manali",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "Mumbai",
            image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "Kolkata",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "Kolkata",
            image: "https://images.unsplash.com/photo-1558431382-9b06d0507edc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074"
        }
    ];

    // Render each destination card
    destinations.forEach(dest => {
        const card = document.createElement("div");
        card.classList.add("dest-card");
        card.style.backgroundImage = `url('${dest.image}')`;
        card.innerHTML = `
      <div class="overlay">
        <h3>${dest.name}</h3>
        <a href="hotels.html?search=${encodeURIComponent(dest.name)}" class="btn-small">Explore</a>
      </div>
    `;
        destSlider.appendChild(card);
    });
}

/* ================================
   HERO BACKGROUND SLIDESHOW
================================== */
const hero = document.querySelector(".hero");

const slideImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1606402179428-a57976d71fa4?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?auto=format&fit=crop&w=1920&q=80"
];

let currentSlide = 0;

// Create slide layers
slideImages.forEach((img, index) => {
    const slide = document.createElement("div");
    slide.classList.add("hero-bg-slide");
    slide.style.backgroundImage = `url('${img}')`;
    if (index === 0) slide.style.opacity = 1;
    hero.prepend(slide); // add behind content
});

const slides = document.querySelectorAll(".hero-bg-slide");

// Automatic slideshow every 6s
setInterval(() => {
    slides[currentSlide].style.opacity = 0; // fade out
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].style.opacity = 1; // fade in
}, 4000);
