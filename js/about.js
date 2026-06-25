
/* =============================================================
   1. VARIABLES AND DATA TYPES
   String, Boolean, Number, Array, Object all demonstrated below.
============================================================= */

// String — site name used in dynamic messages
const SITE_NAME = "Pawtopia";

// Boolean — tracks whether dark mode is currently on
let isDarkMode = false;

// Number — used in form validation (min name length)
const MIN_NAME_LENGTH = 2;

// Array — list of pet types for form validation reference
const VALID_PET_TYPES = ["puppy", "kitten", "both"];

// Array of Objects — FAQ data: each item is an object with
// a 'question' string and an 'answer' string
const FAQ_DATA = [
  {
    question: "What age does my pet need to be to join Pawtopia?",
    answer:
      "We work exclusively with puppies and kittens — typically between 8 weeks and 12 months old. This is the developmental window where specialised care makes the biggest difference."
  },
  {
    question: "What does a typical day look like at Pawtopia?",
    answer:
      "Every day is structured around play, rest, enrichment, and social interaction. We balance active sessions with rest periods to keep energy levels healthy and avoid overstimulation."
  },
  {
    question: "Will I receive updates while my pet is in your care?",
    answer:
      "Yes — every pet gets a daily report card plus photo updates so you always know how their day is going. We believe an informed owner is a happy owner."
  },
  {
    question: "How do you keep puppies and kittens separate?",
    answer:
      "Our facility has dedicated spaces for puppies and kittens. Dogs and cats are kept in separate areas with their own caregivers, routines, and enrichment programmes."
  },
  {
    question: "How do I arrange a first visit?",
    answer:
      "Fill in the 'Arrange a Visit' form on this page and we'll be in touch within one business day to confirm a time that works for you and your pet."
  }
];

// Object — stores the visit form field configuration used during validation
const FORM_CONFIG = {
  requiredFields: ["visitor-name", "visitor-email", "pet-name", "pet-type"],
  emailFieldId:   "visitor-email"
};


/* =============================================================
   2. HELPER FUNCTIONS
   Named functions — reusable utilities
============================================================= */

/**
 * Checks whether a string looks like a valid email address.
 * Uses a regular expression (conditional inside the function).
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  // Conditional statement — regex test
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Marks a form field as invalid and shows its error message.
 * DOM Manipulation — adds a class and makes the error visible.
 * @param {string} fieldId
 * @param {string} message
 */
function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorEl = document.getElementById(fieldId + "-error");

  if (field)   field.classList.add("invalid");
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add("visible"); // DOM Manipulation — class toggle
  }
}

/**
 * Clears the invalid state from a form field.
 * @param {string} fieldId
 */
function clearFieldError(fieldId) {
  const field   = document.getElementById(fieldId);
  const errorEl = document.getElementById(fieldId + "-error");

  if (field)   field.classList.remove("invalid");
  if (errorEl) errorEl.classList.remove("visible");
}

/**
 * Clears all field errors before re-validating the form.
 * Uses the FORM_CONFIG object and iterates with forEach (Array method).
 */
function clearAllErrors() {
  // Array method — forEach loops over the requiredFields array
  FORM_CONFIG.requiredFields.forEach(function (id) {
    clearFieldError(id);
  });
}


/* =============================================================
   3. DARK MODE TOGGLE
   Additional feature 1
   Concepts: DOM Manipulation, Event Handling, Conditional,
             Variables, Functions
============================================================= */

/**
 * Toggles dark mode on the page.
 * Flips the isDarkMode boolean and updates the UI accordingly.
 */
function toggleDarkMode() {
  // Conditional statement
  isDarkMode = !isDarkMode;

  // DOM Manipulation — add/remove class on body
  document.body.classList.toggle("dark-mode", isDarkMode);

  // DOM Manipulation — update button label
  const toggleBtn = document.getElementById("darkModeToggle");
  if (toggleBtn) {
    // Ternary operator (conditional)
    toggleBtn.textContent = isDarkMode ? "☀ Light Mode" : "☾ Dark Mode";
  }

  // User feedback — page title updates to confirm mode
  document.title = isDarkMode
    ? `[Dark] About Us — ${SITE_NAME}`
    : `About Us — ${SITE_NAME}`;
}

/**
 * Sets up the dark mode toggle button.
 * Event Handling — listens for a click event.
 */
function initDarkMode() {
  const toggleBtn = document.getElementById("darkModeToggle");

  if (toggleBtn) {
    // Event Handling — addEventListener for click
    toggleBtn.addEventListener("click", toggleDarkMode);
  }
}


/* =============================================================
   4. FAQ ACCORDION
   Additional feature 2
   Concepts: Arrays, Objects, DOM Manipulation, Event Handling,
             Functions, Conditional Statements, forEach
============================================================= */

/**
 * Builds the FAQ list dynamically from the FAQ_DATA array of objects.
 * DOM Manipulation — creates elements and injects them into the page.
 */
function buildFAQ() {
  // DOM Manipulation — get the container element by ID
  const faqList = document.getElementById("faq-list");
  if (!faqList) return;

  // Array method — forEach iterates over FAQ_DATA (array of objects)
  FAQ_DATA.forEach(function (item, index) {
    // Create list item element
    const li = document.createElement("li");
    li.className = "faq-item";
    li.setAttribute("data-index", index); // data attribute for identification

    // Build inner HTML using object properties (item.question, item.answer)
    li.innerHTML = `
      <button class="faq-question" aria-expanded="false">
        ${item.question}
        <span class="faq-icon" aria-hidden="true">+</span>
      </button>
      <div class="faq-answer" role="region">
        <p>${item.answer}</p>
      </div>
    `;

    faqList.appendChild(li); // DOM Manipulation — append to list
  });
}

/**
 * Opens or closes a single FAQ item.
 * Conditional Statements — checks current open state.
 * @param {HTMLElement} item — the .faq-item element
 */
function toggleFAQItem(item) {
  const isOpen = item.classList.contains("open"); // Boolean result

  // Close all other items first (accordion behaviour)
  const allItems = document.querySelectorAll(".faq-item");
  allItems.forEach(function (el) {
    el.classList.remove("open");
    el.querySelector(".faq-question").setAttribute("aria-expanded", "false");
  });

  // Conditional — only open if it was previously closed
  if (!isOpen) {
    item.classList.add("open");
    item.querySelector(".faq-question").setAttribute("aria-expanded", "true");
  }
}

/**
 * Attaches click event listeners to all FAQ question buttons.
 * Event Handling — uses event delegation on each button.
 */
function initFAQ() {
  buildFAQ(); // Render FAQ items first

  // Event Handling — attach click listeners after items are built
  const faqList = document.getElementById("faq-list");
  if (!faqList) return;

  faqList.addEventListener("click", function (event) {
    // Find the closest .faq-item parent of the clicked element
    const item = event.target.closest(".faq-item");
    if (item) {
      toggleFAQItem(item); // Function call — conditional inside
    }
  });
}


/* =============================================================
   5. VISIT REQUEST FORM VALIDATION
   Concepts: Form Validation, Event Handling, DOM Manipulation,
             Conditional Statements, Functions, User Feedback
============================================================= */

/**
 * Validates all fields in the visit request form.
 * Returns true if valid, false if any field has an error.
 * @returns {boolean}
 */
function validateVisitForm() {
  // Variable — tracks whether the whole form is valid
  let isValid = true;

  clearAllErrors(); // Clear previous errors before re-checking

  // --- Required field check ---
  // Array method — forEach over requiredFields array (from FORM_CONFIG object)
  FORM_CONFIG.requiredFields.forEach(function (fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    const value = field.value.trim(); // String method

    // Conditional statement — check empty
    if (value === "") {
      showFieldError(fieldId, "This field is required.");
      isValid = false; // Update boolean variable
    }
  });

  // --- Name minimum length check ---
  const nameField = document.getElementById("visitor-name");
  if (nameField && nameField.value.trim().length > 0) {
    // Conditional — check minimum length (uses Number variable MIN_NAME_LENGTH)
    if (nameField.value.trim().length < MIN_NAME_LENGTH) {
      showFieldError("visitor-name", `Name must be at least ${MIN_NAME_LENGTH} characters.`);
      isValid = false;
    }
  }

  // --- Email format check ---
  const emailField = document.getElementById(FORM_CONFIG.emailFieldId);
  if (emailField && emailField.value.trim().length > 0) {
    // Conditional — uses helper function isValidEmail()
    if (!isValidEmail(emailField.value.trim())) {
      showFieldError(FORM_CONFIG.emailFieldId, "Please enter a valid email address.");
      isValid = false;
    }
  }

  // --- Pet type check ---
  const petTypeField = document.getElementById("pet-type");
  if (petTypeField && petTypeField.value !== "") {
    // Conditional — check value is in the VALID_PET_TYPES array
    // Array method — includes() checks membership
    if (!VALID_PET_TYPES.includes(petTypeField.value)) {
      showFieldError("pet-type", "Please select a valid pet type.");
      isValid = false;
    }
  }

  return isValid; // Return boolean
}

/**
 * Handles the visit request form submission.
 * Event Handling — called on the form's "submit" event.
 * @param {Event} event
 */
function handleVisitFormSubmit(event) {
  // Prevent the default browser form submission (page reload)
  event.preventDefault();

  // Run validation — Conditional based on return value
  if (!validateVisitForm()) {
    return; // Stop here if form is invalid
  }

  // --- All valid — show success message (User Feedback) ---
  const successEl = document.getElementById("form-success");
  const submitBtn = document.getElementById("form-submit");
  const form      = document.getElementById("visit-form");

  // DOM Manipulation — show success banner
  if (successEl) {
    // String — dynamic message using SITE_NAME variable
    successEl.textContent =
      `Thanks! We'll be in touch within one business day to arrange your ${SITE_NAME} visit. 🐾`;
    successEl.style.display = "block";
  }

  // DOM Manipulation — disable button to prevent double-submit
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Request Sent!";
  }

  // Reset form fields after a short delay
  setTimeout(function () {
    if (form)      form.reset();
    if (submitBtn) {
      submitBtn.disabled    = false;
      submitBtn.textContent = "Request a Visit";
    }
    if (successEl) successEl.style.display = "none";
  }, 5000); // 5 seconds — Number variable
}

/**
 * Sets up the visit request form — attaches the submit listener.
 * Event Handling
 */
function initVisitForm() {
  const form = document.getElementById("visit-form");

  if (form) {
    // Event Handling — listen for the form submit event
    form.addEventListener("submit", handleVisitFormSubmit);

    // Live validation — clear error as user types (Event Handling)
    const inputs = form.querySelectorAll("input, select, textarea");
    inputs.forEach(function (input) {
      input.addEventListener("input", function () {
        clearFieldError(input.id); // DOM Manipulation — remove error styling
      });
    });
  }
}


/* =============================================================
   6. MOBILE NAV TOGGLE
   Concepts: Event Handling, DOM Manipulation, Conditional
============================================================= */

/**
 * Sets up the hamburger menu for mobile screens.
 */
function initMobileNav() {
  const navbar    = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");

  if (navToggle && navbar) {
    // Event Handling — click event on the toggle button
    navToggle.addEventListener("click", function () {
      // DOM Manipulation — toggle the "open" class on the navbar
      const isOpen = navbar.classList.toggle("open");

      // Conditional — update aria-expanded for accessibility
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }
}


/* =============================================================
   7. PAGE INITIALISATION
   Runs everything once the DOM is fully loaded.
   Event Handling — DOMContentLoaded event
============================================================= */

document.addEventListener("DOMContentLoaded", function () {
  // Initialise all features in order
  initDarkMode();    // Dark Mode Toggle (additional feature 1)
  initFAQ();         // FAQ Accordion    (additional feature 2)
  initVisitForm();   // Form validation + submission
  initMobileNav();   // Mobile hamburger menu
});