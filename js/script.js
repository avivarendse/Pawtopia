const petButtons = document.querySelectorAll(".pet-buttons button");
const petInput = document.getElementById("petTypeInput");

if (petButtons.length) {
  petButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      petButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      if (petInput) petInput.value = btn.textContent.trim();
    });
  });
}

function openMap() {
  document.getElementById("mapModal").style.display = "flex";
}

function closeMap() {
  document.getElementById("mapModal").style.display = "none";
}

// Contact form
const form = document.querySelector("form");
const confirmation = document.getElementById("confirmationMessage");
const dropOff = document.getElementById("dropOffDate");
const pickUp = document.getElementById("pickUpDate");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (dropOff && pickUp && dropOff.value && pickUp.value) {
      if (pickUp.value < dropOff.value) {
        alert("Pick-up date cannot be before drop-off date 🐾");
        return;
      }
    }

    if (confirmation) confirmation.style.display = "block";

    form.reset();

    petButtons.forEach(b => b.classList.remove("active"));
    if (petInput) petInput.value = "";

    setTimeout(() => {
      if (confirmation) confirmation.style.display = "none";
    }, 4000);
  });
}

// Pet Persona Switcher
const btnDog = document.getElementById('btn-dog');
const btnCat = document.getElementById('btn-cat');
const heroImage = document.getElementById('hero-image');
const heroText = document.getElementById('hero-text');

if (btnDog) {
  btnDog.addEventListener('click', () => {
    btnDog.classList.add('active');
    btnCat.classList.remove('active');

    if (heroImage) {
      heroImage.src = 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800';
      heroImage.alt = 'Happy puppy at Pawtopia';
    }

    if (heroText) {
      heroText.textContent = 'Professional, loving daycare for dogs. Tail-wagging playtime, belly rubs, grooming, and cozy boarding.';
    }
  });
}

if (btnCat) {
  btnCat.addEventListener('click', () => {
    btnCat.classList.add('active');
    btnDog.classList.remove('active');

    if (heroImage) {
      heroImage.src = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800';
      heroImage.alt = 'Happy kitten at Pawtopia';
    }

    if (heroText) {
      heroText.textContent = 'Premier, peaceful luxury care for cats. Scratching posts, catnip playtime, premium grooming, and quiet suites.';
    }
  });
}

// Paw Print Trail Animation
window.addEventListener('mousemove', (e) => {
  if (Math.random() > 0.15) return;

  const paw = document.createElement('span');
  paw.classList.add('paw-trail');
  paw.textContent = '🐾';

  paw.style.left = e.pageX + 'px';
  paw.style.top = e.pageY + 'px';

  document.body.appendChild(paw);

  setTimeout(() => {
    paw.remove();
  }, 1000);
});