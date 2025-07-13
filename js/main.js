document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const employeeList = document.getElementById("employeeList");
  let currentSort = "";

  // Load employees from localStorage
  let employees = JSON.parse(localStorage.getItem("employees")) || [];
  let currentPage = 1;
  let entriesPerPage = 10;
  let filteredData = employees; // to support search/filter pagination

  // Render employees to DOM
  function renderEmployees(data) {
    const start = (currentPage - 1) * entriesPerPage;
    const end = start + entriesPerPage;
    const paginated = data.slice(start, end);

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

    renderPaginationButtons(data);
    attachDeleteEvents();
  }

  function renderPaginationButtons(data) {
    const totalPages = Math.ceil(data.length / entriesPerPage);
    const paginationDiv = document.getElementById("paginationButtons");
    paginationDiv.innerHTML = "";

    if (totalPages <= 1) return;

    if (currentPage > 1) {
      const prev = createPageButton("Prev", currentPage - 1);
      paginationDiv.appendChild(prev);
    }

    for (let i = 1; i <= totalPages; i++) {
      const btn = createPageButton(i, i);
      if (i === currentPage) btn.classList.add("active");
      paginationDiv.appendChild(btn);
    }

    if (currentPage < totalPages) {
      const next = createPageButton("Next", currentPage + 1);
      paginationDiv.appendChild(next);
    }
  }

  function createPageButton(text, pageNum) {
    const btn = document.createElement("button");
    btn.innerText = text;
    btn.addEventListener("click", () => {
      currentPage = pageNum;
      renderEmployees(sortData(filteredData, currentSort));
    });
    return btn;
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
    filteredData = filtered; // assign
    currentPage = 1;
    renderEmployees(sortData(filteredData, currentSort));
  });

  document.getElementById("clearFilters").addEventListener("click", () => {
    document.getElementById("filterName").value = "";
    document.getElementById("filterDepartment").value = "";
    document.getElementById("filterRole").value = "";
    filteredData = employees;
    currentPage = 1;
    renderEmployees(sortData(filteredData, currentSort));
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

    currentPage = 1;
    filteredData = filtered;
    renderEmployees(sortData(filteredData, currentSort));
  });

  document.getElementById("entriesPerPage").addEventListener("change", (e) => {
    entriesPerPage = parseInt(e.target.value);
    currentPage = 1;
    renderEmployees(sortData(filteredData, currentSort));
  });

  function sortData(data, sortBy) {
    const sorted = [...data]; // avoid mutating original

    switch (sortBy) {
      case "name-asc":
        sorted.sort((a, b) => a.firstName.localeCompare(b.firstName));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.firstName.localeCompare(a.firstName));
        break;
      case "department-asc":
        sorted.sort((a, b) => a.department.localeCompare(b.department));
        break;
      case "department-desc":
        sorted.sort((a, b) => b.department.localeCompare(a.department));
        break;
    }

    return sorted;
  }

  document.getElementById("sortBy").addEventListener("change", (e) => {
    currentSort = e.target.value;
    const sorted = sortData(filteredData, currentSort);
    currentPage = 1;
    renderEmployees(sorted);
  });
  filteredData = employees;
  renderEmployees(sortData(filteredData, currentSort));
});
