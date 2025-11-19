// Use the same hotel data structure as hotel-details.js
const hotelData = {
  "Goa Paradise Resort": {
    location: "Goa",
    price: 5500,
    rooms: 12,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    desc: "A luxury beachside resort with sea-facing rooms and private pools.",
    amenities: ["Free WiFi", "Breakfast Included", "Swimming Pool", "Spa", "Parking"]
  },

  "Jaipur Heritage Palace": {
    location: "Jaipur",
    price: 4800,
    rooms: 7,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    desc: "Enjoy royal treatment in a heritage property surrounded by forts.",
    amenities: ["Air Conditioning", "Restaurant", "Cultural Tours", "Room Service"]
  },

  "Manali SnowView Hotel": {
    location: "Manali",
    price: 6000,
    rooms: 5,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    desc: "Snow view hotel with mountain-facing rooms.",
    amenities: ["Free WiFi", "Room Heater", "Trekking Guide", "Parking"]
  },

  "The Raj Bhavan": {
    location: "Kolkata",
    price: 10000,
    rooms: 6,
    image: "https://images.unsplash.com/photo-1558431382-9b06d0507edc?auto=format&fit=crop&w=800&q=80",
    desc: "A luxury palace with royal rooms.",
    amenities: ["Free WiFi", "Photoshoot Areas", "Royal Experience", "Parking"]
  },

  "Delux Comfort Inn": {
    location: "Kolkata",
    price: 4500,
    rooms: 3,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    desc: "A budget-friendly comfortable stay.",
    amenities: ["Room Service", "Free WiFi"]
  },

  "Mumbai Elite Towers": {
    location: "Mumbai",
    price: 7000,
    rooms: 10,
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
    desc: "Modern luxury rooms in the heart of Mumbai.",
    amenities: ["Breakfast Included", "Gym", "Pool", "Parking"]
  }
};

// Get URL params
const params = new URLSearchParams(window.location.search);
const h1 = params.get("h1");
const h2 = params.get("h2");

const container = document.getElementById("compareContainer");

// Render both cards side-by-side
function createCard(name) {
  const h = hotelData[name];
  return `
    <div class="compare-card">
      <img src="${h.image}">
      <h2>${name}</h2>
      <p><strong>Location:</strong> ${h.location}</p>
      <p><strong>Price:</strong> ₹${h.price}/night</p>
      <p><strong>Rooms:</strong> ${h.rooms}</p>
      <p><strong>Description:</strong> ${h.desc}</p>
      <h3>Amenities</h3>
      <ul>${h.amenities.map(a => `<li>${a}</li>`).join("")}</ul>

      <button class="btn-primary"
        onclick="window.location.href='hotel-details.html?name=${encodeURIComponent(name)}'">
        Book Now
      </button>
    </div>
  `;
}

container.innerHTML = createCard(h1) + createCard(h2);
