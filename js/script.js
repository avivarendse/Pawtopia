const petButtons = document.querySelectorAll(".pet-buttons button");
const petInput = document.getElementById("petTypeInput");

petButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    petButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    petInput.value = btn.textContent.trim();
  });
});

function openMap() {
  document.getElementById("mapModal").style.display = "flex";
}

function closeMap() {
  document.getElementById("mapModal").style.display = "none";
}

const form = document.querySelector("form");
const confirmation = document.getElementById("confirmationMessage");
const dropOff = document.getElementById("dropOff");
const pickUp = document.getElementById("pickUp");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (dropOff.value && pickUp.value && pickUp.value < dropOff.value) {
    alert("Pick-up date cannot be before drop-off date 🐾");
    return;
  }

  confirmation.style.display = "block";

  form.reset();

  petButtons.forEach(b => b.classList.remove("active"));
  petInput.value = "";

  setTimeout(() => {
    confirmation.style.display = "none";
  }, 4000);
});