(() => {
    // Keep this empty until the renewed certificate expiry date is confirmed.
    const CERTIFICATE_VALID_UNTIL = "";

    const getElement = (id) => document.getElementById(id);
    const certificateList = getElement("cfList");
    const dialog = getElement("cfDialog");
    const stage = getElement("cfStage");
    const image = getElement("cfImg");
    const zoomButton = getElement("cfZoom");

    if (CERTIFICATE_VALID_UNTIL && certificateList) {
        const row = document.createElement("div");
        const icon = document.createElement("i");
        const label = document.createElement("dt");
        const value = document.createElement("dd");

        icon.className = "fa-solid fa-calendar-days";
        icon.setAttribute("aria-hidden", "true");
        label.textContent = "Valid until";
        value.textContent = CERTIFICATE_VALID_UNTIL;
        row.append(icon, label, value);
        certificateList.append(row);
    }

    function setZoom(isZoomed) {
        dialog.classList.toggle("is-zoom", isZoomed);
        zoomButton.setAttribute("aria-label", isZoomed ? "Zoom out" : "Zoom in");
        zoomButton.firstElementChild.className = isZoomed
            ? "fa-solid fa-magnifying-glass-minus"
            : "fa-solid fa-magnifying-glass-plus";
    }

    // Lock background scrolling while the native modal dialog is open.
    function openViewer() {
        dialog.showModal();
        document.body.style.overflow = "hidden";
        stage.scrollTo(0, 0);
    }

    getElement("cfOpen").addEventListener("click", openViewer);
    getElement("cfOpen2").addEventListener("click", openViewer);
    getElement("cfClose").addEventListener("click", () => dialog.close());
    zoomButton.addEventListener("click", () => {
        setZoom(!dialog.classList.contains("is-zoom"));
    });
    image.addEventListener("click", () => {
        setZoom(!dialog.classList.contains("is-zoom"));
    });
    stage.addEventListener("click", (event) => {
        if (event.target === stage) dialog.close();
    });
    dialog.addEventListener("close", () => {
        setZoom(false);
        document.body.style.overflow = "";
    });
})();
