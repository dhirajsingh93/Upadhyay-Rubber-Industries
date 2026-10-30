// EmailJS Contact Form Handler for Upadhyay Rubber Industries
// Keep in sync with assets/js/contact.js
document.addEventListener("DOMContentLoaded", function () {
    const PUBLIC_KEY = "CH5sJMGp9EhCsCWHs";
    const SERVICE_ID = "service_k0ale4h";
    const TEMPLATE_ID = "template_0o3yzik";

    if (typeof emailjs !== "undefined") {
        emailjs.init({
            publicKey: PUBLIC_KEY
        });
    }

    const form = document.getElementById("contact-form");
    const submitButton = form ? form.querySelector('button[type="submit"]') : null;
    const statusMessage = document.getElementById("contactFormNote");

    if (!form || !submitButton || !statusMessage) {
        return;
    }

    const originalButtonText = submitButton.innerHTML;

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (submitButton.disabled) return;

        statusMessage.textContent = "";
        statusMessage.classList.remove("is-success", "is-error");

        if (typeof emailjs === "undefined") {
            statusMessage.textContent = "✕ Email service is currently unavailable. Please contact us directly via WhatsApp (+91 88104 22099) or email (info@upadhyayrubber.com).";
            statusMessage.classList.add("is-error");
            return;
        }

        submitButton.disabled = true;
        submitButton.innerHTML = "Sending enquiry...";
        statusMessage.textContent = "Sending your enquiry. Please wait...";

        try {
            const formData = new FormData(form);
            const templateParams = {
                name: formData.get("name") || "",
                from_name: formData.get("name") || "",
                company: formData.get("company") || "Not provided",
                email: formData.get("email") || "",
                from_email: formData.get("email") || "",
                reply_to: formData.get("email") || "",
                phone: formData.get("phone") || "Not provided",
                contact_number: formData.get("phone") || "Not provided",
                interest: formData.get("interest") || "General",
                message: formData.get("message") || ""
            };

            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                templateParams,
                PUBLIC_KEY
            );

            statusMessage.textContent =
                "✓ Enquiry sent successfully! Thank you for contacting Upadhyay Rubber Industry. Our team will get back to you soon.";
            statusMessage.classList.add("is-success");
            form.reset();

        } catch (error) {
            console.error("EmailJS Error:", error);
            statusMessage.textContent =
                "✕ Sorry, your enquiry could not be sent. Please try again or contact us directly via WhatsApp or info@upadhyayrubber.com.";
            statusMessage.classList.add("is-error");

        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    });
});
