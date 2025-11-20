// Mock data same as hotels.js BUT with more details:
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
    desc: "Enjoy royal treatment in a heritage property surrounded by forts.",
    amenities: ["Air Conditioning", "Restaurant", "Cultural Tours", "Room Service"]
  },
  "The Raj Bhavan": {
    location: "Kolkata",
    price: 10000,
    rooms: 6,
    image: "https://images.unsplash.com/photo-1558431382-9b06d0507edc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074",
    desc: "A luxury palace with royal rooms and asthetics.",
    amenities: ["Free WiFi", "Breakfast Included", "Photo-shoot areas", "Royal vibes", "Parking"]
  },
  "Delux Comfort Inn": {
    location: "Kolkata",
    price: 4500,
    rooms: 3,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    desc: "TBD",
    amenities: ["TBD"]
  },
  "Mumbai Elite Towers": {
    location: "Mumbai",
    price: 7000,
    rooms: 10,
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
    desc: "TBD",
    amenities: ["TBD"]
  }
};

// Get hotel name from URL
const params = new URLSearchParams(window.location.search);
const hotelName = params.get("name");

if (hotelName && hotelData[hotelName]) {
  const h = hotelData[hotelName];

  document.getElementById("hotelBanner").style.backgroundImage = `url('${h.image}')`;
  document.getElementById("hotelName").textContent = hotelName;
  document.getElementById("hotelLocation").textContent = "📍 " + h.location;
  document.getElementById("hotelPrice").textContent = `₹${h.price}/night`;
  document.getElementById("hotelRooms").textContent = `Available Rooms: ${h.rooms}`;
  document.getElementById("hotelDescription").textContent = h.desc;

  const amenityList = document.getElementById("hotelAmenities");
  h.amenities.forEach(a => {
    const li = document.createElement("li");
    li.textContent = a;
    amenityList.appendChild(li);
  });
}

document.getElementById("bookNowBtn").addEventListener("click", () => {
  const bookingBox = document.getElementById("bookingBox");
  bookingBox.style.display = "block";

  // Wait a moment for animation/layout to settle, then scroll
  setTimeout(() => {
    const booking = document.getElementById("bookingBox");
    if (booking) {
      booking.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 200);
});


// -----------------------------
// Dynamic Guest Details Section
// -----------------------------
const guestInput = document.getElementById("guests");
const guestContainer = document.getElementById("guestDetailsContainer");

guestInput.addEventListener("input", () => {
  const count = Number(guestInput.value);

  guestContainer.innerHTML = ""; // Clear old fields

  for (let i = 1; i <= count; i++) {
    const box = document.createElement("div");
    box.classList.add("guest-box");

    box.innerHTML = `
      <h4>Guest ${i}</h4>

      <label>Full Name</label>
      <input type="text" placeholder="Enter full name" id="guest${i}_name">

      <label>Age</label>
      <input type="number" placeholder="Enter age" id="guest${i}_age" min="1">

      <label>ID Proof Document</label>
      <input type="file" id="guest${i}_doc" accept="image/*,.pdf">
    `;

    guestContainer.appendChild(box);
  }
});

// -----------------------------
// ERROR HANDLING (UPDATED WITH GUEST VALIDATION)
// -----------------------------
const roomInput = document.getElementById("room-cnt");
const checkInInput = document.getElementById("checkIn");
const checkOutInput = document.getElementById("checkOut");
const guestInputField = document.getElementById("guests");

// Create error message elements
const roomError = document.createElement("p");
roomError.className = "error-msg";

const checkInError = document.createElement("p");
checkInError.className = "error-msg";

const checkOutError = document.createElement("p");
checkOutError.className = "error-msg";

const guestError = document.createElement("p");
guestError.className = "error-msg";

// Attach errors below inputs
roomInput.insertAdjacentElement("afterend", roomError);
checkInInput.insertAdjacentElement("afterend", checkInError);
checkOutInput.insertAdjacentElement("afterend", checkOutError);
guestInputField.insertAdjacentElement("afterend", guestError);


// -----------------------------
// Validate Rooms
// -----------------------------
roomInput.addEventListener("input", () => {
    const required = Number(roomInput.value);
    const available = hotelData[hotelName].rooms;

    if (required > available) {
        roomError.innerText = `Only ${available} rooms available. Enter ≤ ${available}.`;
    } else {
        roomError.innerText = "";
    }
});


// -----------------------------
// Validate Check-in ≥ Now
// -----------------------------
checkInInput.addEventListener("change", () => {
    const now = new Date();
    const checkInDate = new Date(checkInInput.value);

    if (checkInDate < now) {
        checkInError.innerText = "Check-in time cannot be in the past!";
        checkInInput.value = "";
        return;
    }

    checkInError.innerText = "";

    if (checkOutInput.value) validateCheckout();
});


// -----------------------------
// Validate Check-out logic
// -----------------------------
function validateCheckout() {
    const now = new Date();
    const checkInDate = new Date(checkInInput.value);
    const checkOutDate = new Date(checkOutInput.value);

    if (checkOutDate < now) {
        checkOutError.innerText = "Check-out cannot be in the past!";
        checkOutInput.value = "";
        return;
    }

    if (checkOutDate <= checkInDate) {
        checkOutError.innerText = "Check-out must be later than check-in!";
        checkOutInput.value = "";
        return;
    }

    checkOutError.innerText = "";
}

checkOutInput.addEventListener("change", validateCheckout);


// -----------------------------
// Validate Guests ≥ 1
// -----------------------------
guestInputField.addEventListener("input", () => {
    const guests = Number(guestInputField.value);

    if (guests < 1) {
        guestError.innerText = "At least 1 guest is required.";
    } else {
        guestError.innerText = "";
    }
});

// ==========================================
// CONFIRM BOOKING BUTTON FUNCTIONALITY
// ==========================================

const confirmBtn = document.querySelector(".confirm-btn");

confirmBtn.addEventListener("click", () => {

    // ------------------------------
    // 1. VALIDATE GUEST FIELDS
    // ------------------------------
    const guestCount = Number(guestInput.value);

    if (guestCount < 1) {
        alert("Enter at least 1 guest.");
        return;
    }

    for (let i = 1; i <= guestCount; i++) {
        const name = document.getElementById(`guest${i}_name`).value.trim();
        const age = document.getElementById(`guest${i}_age`).value.trim();
        const doc = document.getElementById(`guest${i}_doc`).value;

        if (!name || !age || !doc) {
            alert(`Please fill all details for Guest ${i}.`);
            return;
        }

        if (Number(age) < 1) {
            alert(`Guest ${i} age must be at least 1.`);
            return;
        }
    }

    // ------------------------------
    // 2. VALIDATE SIGN-IN STATUS
    // ------------------------------
    const isLogged = localStorage.getItem("eliteLogged");
    const user = JSON.parse(localStorage.getItem("eliteUser"));

    if (!isLogged || !user) {
        // open sign up modal automatically
        document.getElementById("authModal").style.display = "flex";
        return;
    }

    // ------------------------------
    // 3. SHOW SUCCESS POPUP MODAL
    // ------------------------------
    const roomsBooked = document.getElementById("room-cnt").value;
    const hotel = hotelName;
    const email = user.email;

    // Create modal
    const successModal = document.createElement("div");
    successModal.className = "auth-modal";
    successModal.style.display = "flex";

    successModal.innerHTML = `
        <div class="auth-content" style="max-width:400px; text-align:center;">
            <h2>Booking Successful 🎉</h2>
            <p style="margin:15px 0;">
                <strong>${roomsBooked}</strong> room(s) are booked in 
                <strong>${hotel}</strong>.<br>
                Details have been sent to <strong>${email}</strong>.
            </p>
            <button class="btn-primary" id="closeSuccessPopup" style="margin-top:10px;">
                Close
            </button>
        </div>
    `;

    document.body.appendChild(successModal);

    // Close popup
    document.getElementById("closeSuccessPopup").addEventListener("click", () => {
        successModal.remove();
    });
});
