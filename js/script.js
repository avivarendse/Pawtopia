// PET PERSONA SWITCHER

// 1. Grab our elements from the HTML
const btnDog = document.getElementById('btn-dog');
const btnCat = document.getElementById('btn-cat');
const heroImage = document.getElementById('hero-image');
const heroText = document.getElementById('hero-text');

// 2. Define what changes for dogs
btnDog.addEventListener('click', () => {
  btnDog.classList.add('active');
  btnCat.classList.remove('active');
  
  // Change image and text for dogs
  heroImage.src = 'images/78320481007905843.jpg'; // 
  heroText.textContent = 'Professional, loving daycare for dogs. Tail-wagging playtime, belly rubs, grooming, and cozy boarding.';
});

// 3. Define what changes for cats
btnCat.addEventListener('click', () => {
  btnCat.classList.add('active');
  btnDog.classList.remove('active');
  
  // Change image and text for cats
  heroImage.src = 'images/When you finally meet your twin and neither of you….jpg'; 
  heroText.textContent = 'Premier, peaceful luxury care for cats. Scratching posts, catnip playtime, premium grooming, and quiet suites.';
});


// PAW-PRINT TRAIL ANIMATION

// Listen for mouse movement anywhere on the screen
window.addEventListener('mousemove', (e) => {
  // Limit how many paws generate so the screen doesn't lag (1 in 8 chance per movement)
  if (Math.random() > 0.15) return;

  // Create a temporary paw element
  const paw = document.createElement('span');
  paw.classList.add('paw-trail');
  paw.textContent = '🐾';

  // Position it exactly where the cursor is
  paw.style.left = e.pageX + 'px';
  paw.style.top = e.pageY + 'px';

  // Add it to the website
  document.body.appendChild(paw);

  // Automatically delete it after 1 second when the animation ends
  setTimeout(() => {
    paw.remove();
  }, 1000);
});
