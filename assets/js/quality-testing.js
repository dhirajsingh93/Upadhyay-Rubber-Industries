// Quality-testing page behavior: image fallbacks, footer year, and reveal animations.

// Show a designed fallback when a page image cannot be loaded.
function handleQtImageError(img) {
    if (!img || img.dataset.fallbackHandled === "true") return;

    img.dataset.fallbackHandled = "true";
    img.style.display = "none";

    const parent = img.parentElement;
    if (!parent) return;

    const fallback = parent.querySelector(".qt-image-fallback");

    if (fallback) {
        fallback.style.display = "grid";
    }
}

// Keep the footer year current without requiring a yearly content edit.
const qualityYear = document.getElementById("quality-footer-year");

if (qualityYear) {
    qualityYear.textContent = new Date().getFullYear();
}

// Reveal sections on scroll, while honoring reduced-motion preferences.
const qtRevealElements = document.querySelectorAll(".qt-reveal");
const qtReduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (qtReduceMotion || !("IntersectionObserver" in window)) {
    qtRevealElements.forEach((element) => {
        element.classList.add("qt-visible");
    });
} else {
    const qtObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("qt-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    qtRevealElements.forEach((element) => {
        qtObserver.observe(element);
    });
}
