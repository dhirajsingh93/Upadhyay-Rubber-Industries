(() => {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("contactFormNote");

    if (!(form instanceof HTMLFormElement) || !(status instanceof HTMLElement)) {
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Build a mailto message from the validated form fields without sending data to a server.
        const fields = new FormData(form);
        const subject = `Website enquiry: ${fields.get("interest") || "General"}`;
        const message = [
            `Name: ${fields.get("name")}`,
            `Company: ${fields.get("company") || "Not provided"}`,
            `Email: ${fields.get("email")}`,
            `Phone: ${fields.get("phone") || "Not provided"}`,
            `Enquiry type: ${fields.get("interest") || "Not specified"}`,
            "",
            "Requirement:",
            fields.get("message"),
        ].join("\n");
        const mailto = `mailto:info@upadhyayrubber.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

        // Keep the form data in the page and let the visitor's email app send it.
        status.textContent = "Your email app will open with your enquiry details ready to send.";
        window.location.href = mailto;
    });
})();
