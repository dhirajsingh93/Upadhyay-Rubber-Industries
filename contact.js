<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@5/dist/email.min.js"></script>


document.addEventListener("DOMContentLoaded", function () {
    // ========================================
    // EMAILJS CONFIGURATION — APNI DETAILS DAALO
    // ========================================
    const PUBLIC_KEY = "VEleHEvNxASP5mJdW";
    const SERVICE_ID = "service_6exifar";
    const TEMPLATE_ID = "template_px4c71p";

    // Initialize EmailJS
    emailjs.init({
        publicKey: PUBLIC_KEY
    });

    const form = document.getElementById("contact-form");
    const submitButton = form?.querySelector('button[type="submit"]');
    const statusMessage = document.getElementById("contactFormNote");

    if (!form || !submitButton || !statusMessage) {
        console.error("Contact form elements not found.");
        return;
    }

    const originalButtonText = submitButton.innerHTML;

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Prevent duplicate submissions
        if (submitButton.disabled) return;

        // Reset previous message
        statusMessage.textContent = "";
        statusMessage.classList.remove("is-success", "is-error");

        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = "Sending enquiry...";

        statusMessage.textContent = "Sending your enquiry. Please wait.";

        try {
            // Send all named form fields through EmailJS
            await emailjs.sendForm(
                SERVICE_ID,
                TEMPLATE_ID,
                form,
                {
                    publicKey: PUBLIC_KEY
                }
            );

            // SUCCESS MESSAGE
            statusMessage.textContent =
                "✓ Enquiry sent successfully! Thank you for contacting Upadhyay Rubber Industry. Our team will get back to you soon.";

            statusMessage.classList.add("is-success");

            // Clear the form after successful submission
            form.reset();

        } catch (error) {
            console.error("EmailJS Error:", error);

            // ERROR MESSAGE
            statusMessage.textContent =
                "✕ Sorry, your enquiry could not be sent. Please try again or contact us directly by email.";

            statusMessage.classList.add("is-error");

        } finally {
            // Restore button
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    });
});
