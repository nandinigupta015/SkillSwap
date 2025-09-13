// login.js
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevents page reload

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (email === "" || password === "") {
    alert("⚠️ Please fill in all fields!");
    return;
  }

  // Fetch saved credentials from localStorage (set during signup)
  const savedEmail = localStorage.getItem("userEmail");
  const savedPassword = localStorage.getItem("userPassword");

  // Validate user login
  if (email === savedEmail && password === savedPassword) {
    alert("✅ Login successful! Welcome back.");

    // Save logged-in user info
    localStorage.setItem("loggedInUser", email);

    // Redirect to dashboard
    window.location.href = "dashboard.html";
  } else {
    alert("❌ Invalid credentials. Try again!");
  }

  // Reset form after attempt
  document.getElementById("loginForm").reset();
});
