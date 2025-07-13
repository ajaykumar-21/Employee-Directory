document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const employeeList = document.getElementById("employeeList");

  // Load employees from localStorage
  let employees = JSON.parse(localStorage.getItem("employees")) || [];

  // Render employees to DOM
  function renderEmployees(data) {
    employeeList.innerHTML = "";

    data.forEach((emp, index) => {
      const card = document.createElement("div");
      card.className = "employee-card";
      card.dataset.id = emp.id;

      card.innerHTML = `
        <p><strong>${emp.firstName} ${emp.lastName}</strong></p>
        <p>Email: ${emp.email}</p>
        <p>Department: ${emp.department}</p>
        <p>Role: ${emp.role}</p>
        <button class="edit-btn" data-index="${index}">Edit</button>
        <button class="delete-btn" data-index="${index}">Delete</button>
      `;

      employeeList.appendChild(card);
    });

    attachDeleteEvents();
  }

  function attachDeleteEvents() {
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        employees.splice(index, 1);
        localStorage.setItem("employees", JSON.stringify(employees));
        renderEmployees(employees);
      });
    });
  }

  // Initial render
  renderEmployees(employees);

  // Search functionality
  searchInput.addEventListener("input", (e) => {
    const searchText = e.target.value.toLowerCase();

    const filtered = employees.filter((emp) => {
      return (
        emp.firstName.toLowerCase().includes(searchText) ||
        emp.lastName.toLowerCase().includes(searchText) ||
        emp.email.toLowerCase().includes(searchText)
      );
    });

    renderEmployees(filtered);
  });
});
