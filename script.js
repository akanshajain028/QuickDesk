// Preload sample users if not already stored
if (!localStorage.getItem("users")) {
  const sampleUsers = [
    { name: "Admin", email: "admin@example.com", password: "admin123", role: "admin" },
    { name: "Agent", email: "agent@example.com", password: "agent123", role: "agent" },
    { name: "Employee", email: "user@example.com", password: "user123", role: "employee" }
  ];
  localStorage.setItem("users", JSON.stringify(sampleUsers));
}

document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  // Register
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const role = document.getElementById("role").value;
      const registerSuccess = document.getElementById("registerSuccess");
      const registerError = document.getElementById("registerError");

      if (!name || !email || !password || !role) {
        registerError.textContent = "Please fill in all fields.";
        registerSuccess.textContent = "";
        return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = users.some((u) => u.email === email);

      if (userExists) {
        registerError.textContent = "Email already registered.";
        registerSuccess.textContent = "";
        return;
      }

      users.push({ name, email, password, role });
      localStorage.setItem("users", JSON.stringify(users));

      registerSuccess.textContent = "Registration successful! You may now log in.";
      registerError.textContent = "";
      registerForm.reset();
    });
  }

  // Login
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const role = document.getElementById("role").value;
      const loginError = document.getElementById("loginError");

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (u) => u.email === email && u.password === password && u.role === role
      );

      if (!user) {
        loginError.textContent = "Invalid email, password, or role.";
        return;
      }

      loginError.textContent = "";

      // Redirect based on role
      if (role === "admin") {
        window.location.href = "admin-dashboard.html";
      } else if (role === "agent") {
        window.location.href = "agent-dashboard.html";
      } else {
        window.location.href = "dashboard.html";
      }
    });
  }
});
