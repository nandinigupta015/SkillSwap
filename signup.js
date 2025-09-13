document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (name === "" || email === "" || password === "") {
    alert("⚠️ Please fill in all fields!");
    return;
  }

  // Password validation rules
  const hasLength = password.length >= 6;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);

  if (!(hasLength && hasUpper && hasNumber && hasSpecial)) {
    alert("❌ Password does not meet all requirements!");
    return;
  }

  // Save user details in localStorage
  localStorage.setItem("userName", name);
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userPassword", password);

  alert("✅ Signup successful! You can now login.");
  window.location.href = "login.html"; // Redirect to login
});

// Password Strength Checker
const passwordInput = document.getElementById("password");
const strengthText = document.getElementById("passwordStrength");

// Rules elements
const lengthRule = document.getElementById("lengthRule");
const upperRule = document.getElementById("upperRule");
const numberRule = document.getElementById("numberRule");
const specialRule = document.getElementById("specialRule");

passwordInput.addEventListener("input", function () {
  const password = passwordInput.value;

  // Check rules
  const hasLength = password.length >= 6;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);

  // Update rules display
  updateRule(lengthRule, hasLength);
  updateRule(upperRule, hasUpper);
  updateRule(numberRule, hasNumber);
  updateRule(specialRule, hasSpecial);

  // Strength meter logic
  let strength = 0;
  if (hasLength) strength++;
  if (hasUpper) strength++;
  if (hasNumber) strength++;
  if (hasSpecial) strength++;

  if (strength <= 1) {
    strengthText.textContent = "Weak 🔴";
    strengthText.style.color = "red";
  } else if (strength === 2 || strength === 3) {
    strengthText.textContent = "Medium 🟠";
    strengthText.style.color = "orange";
  } else if (strength === 4) {
    strengthText.textContent = "Strong 🟢";
    strengthText.style.color = "green";
  } else {
    strengthText.textContent = "";
  }
});

// Helper function
function updateRule(element, isValid) {
  if (isValid) {
    element.textContent = "✅ " + element.textContent.slice(2);
    element.classList.add("valid");
  } else {
    element.textContent = "❌ " + element.textContent.slice(2);
    element.classList.remove("valid");
  }
}