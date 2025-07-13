document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("employeeForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fields = ["firstName", "lastName", "email", "department", "role"];
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
      const employees = JSON.parse(localStorage.getItem("employees")) || [];
      const newEmployee = {
        id: Date.now(),
        ...formData,
      };
      employees.push(newEmployee);
      localStorage.setItem("employees", JSON.stringify(employees));

      alert("Employee added successfully!");

      // Redirect to index.html
      window.location.href = "index.html";
    }
  });
});
