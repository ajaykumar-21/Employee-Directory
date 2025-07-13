document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("employeeForm");
  const urlParams = new URLSearchParams(window.location.search);
  const employeeId = urlParams.get("id");

  const fields = ["firstName", "lastName", "email", "department", "role"];
  let employees = JSON.parse(localStorage.getItem("employees")) || [];
  let isEditMode = false;

  if (employeeId) {
    const emp = employees.find((e) => e.id == employeeId);
    if (emp) {
      isEditMode = true;
      document.getElementById("formTitle").innerText = "Edit Employee";
      fields.forEach((field) => {
        document.getElementById(field).value = emp[field];
      });
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    const formData = {};
    fields.forEach((field) => {
      const input = document.getElementById(field);
      const error = document.getElementById(`${field}Error`);
      error.style.display = "none";

      if (!input.value.trim()) {
        error.textContent = `${field} is required`;
        error.style.display = "block";
        isValid = false;
      } else {
        formData[field] = input.value.trim();
      }
    });

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailPattern.test(formData.email)) {
      const emailError = document.getElementById("emailError");
      emailError.textContent = "Invalid email format";
      emailError.style.display = "block";
      isValid = false;
    }

    if (isValid) {
      if (isEditMode) {
        // Update existing employee
        employees = employees.map((emp) => {
          if (emp.id == employeeId) {
            return { ...emp, ...formData };
          }
          return emp;
        });
        alert("Employee updated successfully!");
      } else {
        // Create new employee
        const newEmployee = { id: Date.now(), ...formData };
        employees.push(newEmployee);
        alert("Employee added successfully!");
      }

      localStorage.setItem("employees", JSON.stringify(employees));
      window.location.href = "index.html";
    }
  });
});
