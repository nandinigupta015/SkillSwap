// Handle profile picture upload
const profilePic = document.getElementById("profilePic");
const uploadPic = document.getElementById("uploadPic");

uploadPic.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      profilePic.src = reader.result;
      localStorage.setItem("profilePic", reader.result);
    };
    reader.readAsDataURL(file);
  }
});

// Load stored profile data
window.onload = () => {
  if (localStorage.getItem("userName")) {
    document.getElementById("userName").textContent = localStorage.getItem("userName");
  }
  if (localStorage.getItem("userBio")) {
    document.getElementById("userBio").textContent = localStorage.getItem("userBio");
  }
  if (localStorage.getItem("userAge")) {
    document.getElementById("userAge").textContent = localStorage.getItem("userAge");
  }
  if (localStorage.getItem("userLocation")) {
    document.getElementById("userLocation").textContent = localStorage.getItem("userLocation");
  }
  if (localStorage.getItem("userMode")) {
    document.getElementById("userMode").textContent = localStorage.getItem("userMode");
  }
  if (localStorage.getItem("profilePic")) {
    profilePic.src = localStorage.getItem("profilePic");
  }
};

// Edit profile modal
const modal = document.getElementById("editModal");
const editBtn = document.getElementById("editProfileBtn");
const closeBtn = document.querySelector(".close");

editBtn.onclick = () => {
  modal.style.display = "flex";
  document.getElementById("editName").value = localStorage.getItem("userName") || "";
  document.getElementById("editBio").value = localStorage.getItem("userBio") || "";
  document.getElementById("editAge").value = localStorage.getItem("userAge") || "";
  document.getElementById("editLocation").value = localStorage.getItem("userLocation") || "";
  document.getElementById("editMode").value = localStorage.getItem("userMode") || "Learning";
};

closeBtn.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};

// Save edited profile
document.getElementById("editProfileForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("editName").value;
  const bio = document.getElementById("editBio").value;
  const age = document.getElementById("editAge").value;
  const location = document.getElementById("editLocation").value;
  const mode = document.getElementById("editMode").value;

  // Save to localStorage
  localStorage.setItem("userName", name);
  localStorage.setItem("userBio", bio);
  localStorage.setItem("userAge", age);
  localStorage.setItem("userLocation", location);
  localStorage.setItem("userMode", mode);

  // Update UI
  document.getElementById("userName").textContent = name;
  document.getElementById("userBio").textContent = bio;
  document.getElementById("userAge").textContent = age;
  document.getElementById("userLocation").textContent = location;
  document.getElementById("userMode").textContent = mode;

  modal.style.display = "none";
});

// Matches (for demo purpose)
const matchesContainer = document.getElementById("matchesContainer");
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.getAttribute("data-tab");
    if (type === "new") {
      matchesContainer.innerHTML = "<p>You have 2 new matches 🎉</p>";
    } else if (type === "current") {
      matchesContainer.innerHTML = "<p>Currently chatting with Alex & Priya 💬</p>";
    } else {
      matchesContainer.innerHTML = "<p>Past matches: Sam, Riya, John</p>";
    }
  });
});

