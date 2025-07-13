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
        <a href="form.html?id=${emp.id}" class="edit-btn">Edit</a>
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

  document.getElementById("filterToggleBtn").addEventListener("click", () => {
    document.getElementById("filterSidebar").classList.toggle("hidden");
  });

  document.getElementById("applyFilters").addEventListener("click", () => {
    const nameVal = document.getElementById("filterName").value.toLowerCase();
    const deptVal = document
      .getElementById("filterDepartment")
      .value.toLowerCase();
    const roleVal = document.getElementById("filterRole").value.toLowerCase();

    const filtered = employees.filter((emp) => {
      return (
        (!nameVal || emp.firstName.toLowerCase().includes(nameVal)) &&
        (!deptVal || emp.department.toLowerCase().includes(deptVal)) &&
        (!roleVal || emp.role.toLowerCase().includes(roleVal))
      );
    });

    renderEmployees(filtered);
  });

  document.getElementById("clearFilters").addEventListener("click", () => {
    document.getElementById("filterName").value = "";
    document.getElementById("filterDepartment").value = "";
    document.getElementById("filterRole").value = "";
    renderEmployees(employees);
  });

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
