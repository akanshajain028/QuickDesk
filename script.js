// Preload sample users once
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
  const createTicketForm = document.getElementById("createTicketForm");

  // Registration
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

      if (role === "admin") {
        window.location.href = "admin-dashboard.html";
      } else if (role === "agent") {
        window.location.href = "agent-dashboard.html";
      } else {
        window.location.href = "dashboard.html";
      }
    });
  }

  // Create Ticket
  if (createTicketForm) {
    createTicketForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const subject = document.getElementById("subject").value.trim();
      const description = document.getElementById("description").value.trim();
      const category = document.getElementById("category").value;

      const tickets = JSON.parse(localStorage.getItem("tickets")) || [];

      const ticket = {
        id: "TCK-" + Date.now(),
        subject,
        description,
        category,
        status: "Open",
        createdAt: new Date().toLocaleString(),
      };

      tickets.push(ticket);
      localStorage.setItem("tickets", JSON.stringify(tickets));

      alert(`Ticket submitted! Your Ticket Number is: ${ticket.id}`);
      createTicketForm.reset();
    });
  }

  // Dashboard
  const ticketTable = document.getElementById("ticketTable");
  if (ticketTable) {
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];

    if (tickets.length === 0) {
      ticketTable.innerHTML = "<p>No tickets submitted yet.</p>";
    } else {
      let html = `
        <table>
          <thead>
            <tr>
              <th>Ticket No</th>
              <th>Subject</th>
              <th>Category</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
      `;

      tickets.forEach(t => {
        html += `
          <tr>
            <td>${t.id}</td>
            <td>${t.subject}</td>
            <td>${t.category}</td>
            <td>${t.status}</td>
            <td>${t.createdAt}</td>
          </tr>
        `;
      });

      html += `</tbody></table>`;
      ticketTable.innerHTML = html;
    }
  }
});
