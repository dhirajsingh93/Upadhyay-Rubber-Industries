// Product catalogue data, rendering, and category navigation.
(() => {
    "use strict";

    const CONTACT = "./contactus.html#contact-form";
    const WA = "918810422099";

    const escapeHTML = (value) =>
        String(value).replace(/[&<>"']/g, (char) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[char]);

    const feature = (icon, label) => ({ icon, label });

    const photo = (name, filename, material = "") => ({
        name,
        image: `images/${filename}.jpg`,
        material
    });

    const productPhoto = (name, filename) => ({
        name,
        image: `images/products/${filename}.jpg`,
        material: ""
    });

    const categories = [
        {
            id: "rubber-bushes",
            group: "Rubber Components",
            title: "Rubber Bushes",
            image: "images/products/rubber-bushes.jpg",
            caption: "Rubber bushes and mounting components",
            description:
                "Explore rubber bushes, grommets, washers, spacers and mounting components for industrial applications. Share your drawing, dimensions and application details to discuss the right component for your requirement.",
            features: [
                feature("fa-wave-square", "Vibration isolation applications"),
                feature("fa-arrows-up-down", "Elastic component designs"),
                feature("fa-shield-halved", "Shock absorption applications"),
                feature("fa-compass-drafting", "Drawing-based enquiries")
            ],
            related: [
                photo("Rod Bush", "rod-bush", "Rubber component"),
                photo("Rubber Bush", "bush", "Rubber component"),
                productPhoto("Rubber Mounts", "rubber-mounts"),
                photo("Grommet", "grommet", "Rubber component"),
                productPhoto("Rubber Washers", "rubber-washers"),
                productPhoto("Spacers", "spacers")
            ]
        },

        {
            id: "moulded-components",
            group: "Rubber Components",
            title: "Moulded Components",
            image: "images/products/custom-molded-parts.jpg",
            caption: "Moulded rubber components",
            description:
                "Explore moulded rubber components such as dust covers, boots, bellows, diaphragms, stoppers and other shaped parts. Product suitability, dimensions and material requirements can be discussed according to the intended application.",
            features: [
                feature("fa-bullseye", "Application-specific shapes"),
                feature("fa-layer-group", "Different component designs"),
                feature("fa-circle-check", "Inspection-focused workflow"),
                feature("fa-compass-drafting", "Custom drawing enquiries")
            ],
            related: [
                photo("Dust Cover", "dust-cover", "Rubber component"),
                photo("Rubber Boot", "rubber-boot", "Rubber component"),
                productPhoto("Rubber Bellows", "rubber-bellows"),
                productPhoto("Diaphragms", "diaphragms"),
                productPhoto("Rubber Stoppers", "rubber-stoppers"),
                productPhoto("Rubber Plugs", "rubber-plugs"),
                productPhoto("Flexible Couplings", "flexible-couplings"),
                productPhoto("Rubber Pads", "rubber-pads"),
                productPhoto("Rubber Rollers", "rubber-rollers")
            ]
        },

        {
            id: "extruded-profiles",
            group: "Rubber Components",
            title: "Extruded Profiles",
            image: "images/products/rubber-profiles.jpg",
            caption: "Rubber profiles and shaped sections",
            description:
                "Explore rubber profiles, sleeves, sheets and edge trims in a range of shapes and dimensions. Share the required cross-section, length and intended application to discuss a suitable profile requirement.",
            features: [
                feature("fa-shapes", "Custom profile enquiries"),
                feature("fa-ruler", "Specified dimensions"),
                feature("fa-scissors", "Length requirements"),
                feature("fa-cubes-stacked", "Multiple profile applications")
            ],
            related: [
                photo("Sleeve", "sleeve", "Component"),
                productPhoto("Rubber Profiles", "rubber-profiles"),
                productPhoto("Edge Trims", "edge-trims"),
                productPhoto("Rubber Sheets", "rubber-sheets"),
                productPhoto("Foam Rubber", "foam-rubber"),
                productPhoto("Silicone Hoses", "silicone-hoses")
            ]
        },

        {
            id: "o-rings-seal-kits",
            group: "Sealing Solutions",
            title: "O-Rings & Seal Kits",
            image: "images/products/o-rings.jpg",
            caption: "O-rings and sealing components",
            description:
                "Explore O-rings and sealing components for static and moving applications. Share details about the working environment, dimensions, operating conditions and material requirements so the application can be evaluated.",
            features: [
                feature("fa-ring", "O-rings and shaped seals"),
                feature("fa-temperature-half", "Operating temperature details"),
                feature("fa-flask", "Material compatibility discussion"),
                feature("fa-layer-group", "Different sealing profiles")
            ],
            related: [
                photo("O-Ring", "o-ring", "Sealing component"),
                productPhoto("V-Rings", "v-rings"),
                productPhoto("U-Cups", "u-cups"),
                productPhoto("Quad Rings", "quad-rings"),
                productPhoto("X-Rings", "x-rings"),
                productPhoto("Back-up Rings", "back-up-rings")
            ]
        },

        {
            id: "rubber-gaskets",
            group: "Sealing Solutions",
            title: "Rubber Gaskets",
            image: "images/products/gaskets.jpg",
            caption: "Gaskets for application-specific sealing",
            description:
                "Explore rubber gaskets and sealing components made to suit application requirements. Share your required outline, dimensions, thickness, operating environment and material preference for an enquiry.",
            features: [
                feature("fa-compass-drafting", "Custom outline enquiries"),
                feature("fa-ruler-combined", "Thickness and dimensions"),
                feature("fa-cloud-sun", "Environmental requirements"),
                feature("fa-droplet", "Sealing application details")
            ],
            related: [
                photo("Gasket", "gasket", "Sealing component"),
                photo("End Cap Gasket", "end-cap-gasket", "Sealing component"),
                productPhoto("Rubber Gaskets", "gaskets")
            ]
        },

        {
            id: "oil-packing-seals",
            group: "Sealing Solutions",
            title: "Oil & Packing Seals",
            image: "images/products/oil-seals.jpg",
            caption: "Oil seals and packing components",
            description:
                "Explore oil seals and packing seals for applications where sealing performance is important. Share information about the working fluid, operating temperature, shaft or housing dimensions and intended use.",
            features: [
                feature("fa-oil-can", "Oil-related applications"),
                feature("fa-temperature-high", "Operating conditions"),
                feature("fa-shield-halved", "Wear requirements"),
                feature("fa-droplet", "Sealing requirements")
            ],
            related: [
                photo("Oil Seal", "oil-seal", "Sealing component"),
                photo("Packing Seal", "packing-seal", "Sealing component"),
                productPhoto("Oil Seals", "oil-seals")
            ]
        },

        {
            id: "custom-moulding",
            group: "Custom Solutions",
            title: "Custom Moulding",
            image: "images/press.jpg",
            caption: "Custom moulding and component development",
            description:
                "Discuss custom-moulded rubber parts based on a drawing or sample. The component geometry, material, tooling requirement, quantity and intended use can be reviewed before proceeding with a manufacturing enquiry.",
            features: [
                feature("fa-industry", "Moulding requirements"),
                feature("fa-gears", "Tooling discussions"),
                feature("fa-screwdriver-wrench", "Mould design enquiries"),
                feature("fa-layer-group", "Application-specific parts")
            ],
            related: [
                photo("Dust Cover", "dust-cover", "Rubber component"),
                photo("Rubber Boot", "rubber-boot", "Rubber component"),
                photo("Oil Seal", "oil-seal", "Sealing component"),
                photo("Rod Bush", "rod-bush", "Rubber component")
            ]
        },

        {
            id: "custom-components",
            group: "Custom Solutions",
            title: "Custom Components",
            image: "images/products/custom-molded-parts.jpg",
            caption: "Components discussed around your requirements",
            description:
                "Looking for a component that is not listed in the catalogue? Share a drawing, sample, dimensions and intended application. Our team can discuss your requirement, material preference and expected quantity.",
            features: [
                feature("fa-box-open", "Drawing or sample enquiries"),
                feature("fa-ruler-combined", "Dimensions and specifications"),
                feature("fa-truck-fast", "Supply requirement discussions"),
                feature("fa-industry", "Industrial applications")
            ],
            related: [
                productPhoto("Custom Moulded Parts", "custom-molded-parts"),
                photo("Hose", "hose", "Component"),
                photo("Sleeve", "sleeve", "Component"),
                photo("Grommet", "grommet", "Component")
            ]
        }
    ];

    const nav = document.getElementById("pgNav");
    const panel = document.getElementById("pgPanel");

    if (!nav || !panel) return;

    const padNumber = (n) => String(n).padStart(2, "0");

    nav.innerHTML = categories.map((category, index) => `
        <button
            class="pg-tab"
            role="tab"
            type="button"
            id="tab-${category.id}"
            data-index="${index}"
            aria-selected="false"
            tabindex="-1"
            aria-controls="pgPanel">

            ${escapeHTML(category.title)}

            <i class="fa-solid fa-chevron-right"
                aria-hidden="true"></i>
        </button>
    `).join("");

    const tabs = Array.from(nav.querySelectorAll(".pg-tab"));

    function renderRelated(product) {
        return `
            <li class="pg-card">

                <div class="pg-card-image">
                    <img
                        src="${escapeHTML(product.image)}"
                        alt="${escapeHTML(product.name)}"
                        loading="lazy">
                </div>

                <div class="pg-card-body">

                    <h5>${escapeHTML(product.name)}</h5>

                    ${product.material
                        ? `<em>${escapeHTML(product.material)}</em>`
                        : ""}

                </div>

            </li>
        `;
    }

    function showCategory(index, updateHash = false) {
        const safeIndex =
            ((index % categories.length) + categories.length)
            % categories.length;

        const category = categories[safeIndex];

        tabs.forEach((tab, tabIndex) => {
            const selected = tabIndex === safeIndex;

            tab.setAttribute("aria-selected", String(selected));
            tab.tabIndex = selected ? 0 : -1;
        });

        panel.setAttribute(
            "aria-labelledby",
            `tab-${category.id}`
        );

        panel.classList.remove("is-in");

        const whatsappMessage = encodeURIComponent(
            `Hi Upadhyay Rubber Industries, I would like to enquire about ${category.title}.`
        );

        panel.innerHTML = `
            <div class="pg-top">

                <figure class="pg-img">

                    <img
                        src="${escapeHTML(category.image)}"
                        alt="${escapeHTML(category.title)}"
                        loading="eager">

                    <figcaption class="pg-img-caption">
                        ${escapeHTML(category.caption)}
                    </figcaption>

                </figure>

                <div class="pg-info">

                    <span class="pg-eb">
                        ${padNumber(safeIndex + 1)} ·
                        ${escapeHTML(category.group)}
                    </span>

                    <h3 class="pg-title">
                        ${escapeHTML(category.title)}
                    </h3>

                    <p>${escapeHTML(category.description)}</p>

                    <div class="pg-btns">

                        <a class="pg-btn"
                            href="${CONTACT}">

                            Enquire Now

                            <i class="fa-solid fa-arrow-up-right-from-square"
                                aria-hidden="true"></i>

                        </a>

                        <a class="pg-wa"
                            href="https://wa.me/${WA}?text=${whatsappMessage}"
                            target="_blank"
                            rel="noopener noreferrer">

                            <i class="fa-brands fa-whatsapp"
                                aria-hidden="true"></i>

                            WhatsApp Enquiry

                        </a>

                    </div>

                    <ul class="pg-feats">

                        ${category.features.map(item => `
                            <li>
                                <i class="fa-solid ${escapeHTML(item.icon)}"
                                    aria-hidden="true"></i>

                                <span>${escapeHTML(item.label)}</span>
                            </li>
                        `).join("")}

                    </ul>

                </div>

            </div>

            <div class="pg-rel">

                <div class="pg-rel-head">

                    <div>
                        <span class="pg-eb">Explore More</span>
                        <h4>Related Products</h4>
                    </div>

                    <p>
                        Product images and selections can be updated
                        to match your final catalogue.
                    </p>

                </div>

                <ul class="pg-grid">
                    ${category.related.map(renderRelated).join("")}
                </ul>

            </div>
        `;

        requestAnimationFrame(() => {
            panel.classList.add("is-in");
        });

        if (updateHash) {
            history.replaceState(
                null,
                "",
                `#${category.id}`
            );
        }

        if (window.matchMedia("(max-width: 1050px)").matches) {
            tabs[safeIndex].scrollIntoView({
                inline: "center",
                block: "nearest",
                behavior: "smooth"
            });
        }
    }

    function getCurrentIndex() {
        return tabs.findIndex(
            tab => tab.getAttribute("aria-selected") === "true"
        );
    }

    nav.addEventListener("click", (event) => {
        const tab = event.target.closest(".pg-tab");

        if (!tab) return;

        showCategory(Number(tab.dataset.index), true);
    });

    nav.addEventListener("keydown", (event) => {
        const movement = {
            ArrowDown: 1,
            ArrowRight: 1,
            ArrowUp: -1,
            ArrowLeft: -1
        };

        const current = getCurrentIndex();
        let next;

        if (event.key === "Home") {
            next = 0;
        } else if (event.key === "End") {
            next = categories.length - 1;
        } else if (event.key in movement) {
            next = (
                current + movement[event.key] + categories.length
            ) % categories.length;
        } else {
            return;
        }

        event.preventDefault();

        showCategory(next, true);
        tabs[next].focus();
    });

    function getIndexFromHash() {
        const hash = window.location.hash.slice(1);

        const index = categories.findIndex(
            category => category.id === hash
        );

        return index >= 0 ? index : 0;
    }

    window.addEventListener("hashchange", () => {
        const hash = window.location.hash.slice(1);

        const index = categories.findIndex(
            category => category.id === hash
        );

        if (index >= 0) {
            showCategory(index, false);
        }
    });

    /* Click a category from the navbar dropdown or footer. */
    document.addEventListener("click", (event) => {
        const link = event.target.closest("[data-product-category]");

        if (!link) return;

        const categoryId = link.dataset.productCategory;

        const index = categories.findIndex(
            category => category.id === categoryId
        );

        if (index < 0) return;

        showCategory(index, true);

        const productsSection = document.getElementById("products");

        if (productsSection) {
            setTimeout(() => {
                productsSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }, 30);
        }
    });

    showCategory(getIndexFromHash(), false);
})();

// Fallback presentation for missing product images.
(() => {
    const fallbackImage = (img) => {
        if (img.dataset.fallbackApplied === "true") return;

        img.dataset.fallbackApplied = "true";
        img.style.display = "none";

        const container =
            img.closest(".pg-img, .pg-card-image");

        if (!container) return;

        container.style.background =
            "radial-gradient(circle at 50% 35%, #ffffff, #dceaf5)";

        const icon = document.createElement("div");

        icon.setAttribute("aria-hidden", "true");

        icon.style.cssText = `
            display:grid;
            place-items:center;
            width:100%;
            height:100%;
            min-height:130px;
            color:#0b6aa8;
            font-size:clamp(40px, 7vw, 78px);
        `;

        icon.innerHTML = '<i class="fa-solid fa-industry"></i>';

        container.appendChild(icon);
    };

    document.addEventListener("error", (event) => {
        const target = event.target;

        if (
            target instanceof HTMLImageElement &&
            target.closest(".pg-img, .pg-card-image")
        ) {
            fallbackImage(target);
        }
    }, true);
})();

// Reveal-on-scroll behavior for product page sections.
(() => {
    const revealElements = document.querySelectorAll(
        ".products-intro-main, .products-intro-feature, .pg-heading, .products-custom-box"
    );

    revealElements.forEach(element => {
        element.classList.add("products-reveal");
    });

    if (!("IntersectionObserver" in window)) {
        revealElements.forEach(element => {
            element.classList.add("is-visible");
        });

        return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                currentObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => observer.observe(element));
})();
