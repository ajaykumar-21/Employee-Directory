document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const employeeCards = document.querySelectorAll(".employee-card");

  searchInput.addEventListener("input", (e) => {
    const searchText = e.target.value.toLowerCase();

    employeeCards.forEach((card) => {
      const name = card.querySelector("p strong").innerText.toLowerCase();
      const email = card
        .querySelector("p:nth-child(2)")
        .innerText.toLowerCase();

      const isVisible = name.includes(searchText) || email.includes(searchText);
      card.style.display = isVisible ? "block" : "none";
    });
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".employee-card");
      card.remove();
    });
  });
});
