const form = document.getElementById("contactForm");
const message = document.getElementById("message");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const inputs = form.querySelectorAll("input, select, textarea");
    let valid = true;

    inputs.forEach(input => {
        if (!input.value) {
            valid = false;
        }
    });

    if (valid) {
        message.style.color = "green";
        message.textContent = "Thanks for reaching out! We'll get back to you within one business day.";
        form.reset();
    } else {
        message.style.color = "red";
        message.textContent = "Please fill in all required fields before submitting.";
    }
});

const faqButtons = document.querySelectorAll(".faq-item button");

faqButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const answer = btn.nextElementSibling;

        if (answer.style.display === "block") {
            answer.style.display = "none";
        } else {
            answer.style.display = "block";
        }
    });
});