
//app search option 

function initializeGlobalSearch() {
  const searchButton = document.querySelector("#searchBtn");
  const panel = document.querySelector("#searchPanel");
  const input = document.querySelector("#siteSearch");
  const message = document.querySelector("#searchMessage");
  const results = document.querySelector("#searchResults");
  const closeButton = panel?.querySelector(".search-close");
  if (!searchButton || !panel || !input || !message || !results) return;

  const products = [
    { name: "LT Power Cables", detail: "Low voltage power cable solutions", href: "pages/lt-power-cables.html", terms: "lt power low voltage electrical" },
    { name: "Building Wire", detail: "Reliable wires for building installations", href: "pages/building-wire.html", terms: "building wire house electrical copper" },
    { name: "Solar Cables", detail: "Cable solutions for solar applications", href: "pages/solar-cables.html", terms: "solar photovoltaic pv energy" },
    { name: "Multicore Cables", detail: "Multiple cores in a single cable", href: "pages/multicore-cables.html", terms: "multicore multi core industrial" },
    { name: "House Wiring", detail: "Wires for residential installations", href: "pages/house-wiring.html", terms: "house wiring residential domestic" },
    { name: "Wire & Cables", detail: "Explore the complete wire and cable range", href: "pages/wire-cables.html", terms: "wire wires cable cables range" },
    { name: "Screened Type", detail: "Screened cables for secure signal transmission", href: "pages/screened-type.html", terms: "screen screened instrumentation control" },
    { name: "Unscreened Type", detail: "Unscreened cable options for varied applications", href: "pages/unscreened-type.html", terms: "unscreened instrumentation control" }
  ];
  const normalizeWord = word => word.length > 3 && word.endsWith("s") ? word.slice(0, -1) : word;

  const renderResults = query => {
    const normalizedQuery = query.toLocaleLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    if (!normalizedQuery) {
      results.replaceChildren();
      message.textContent = "Search our cable range by product name.";
      return [];
    }
    const words = normalizedQuery.split(/\s+/).map(normalizeWord);
    const matches = products.filter(product => {
      const searchableWords = `${product.name} ${product.detail} ${product.terms}`
        .toLocaleLowerCase().replace(/[^a-z0-9]+/g, " ").split(/\s+/).map(normalizeWord);
      return words.every(word => searchableWords.some(candidate => candidate.includes(word)));
    });
    results.innerHTML = matches.map((product, index) => `
      <li role="option" id="search-result-${index}">
        <a class="search-result-link" href="${product.href}">
          <span class="search-result-copy"><strong>${product.name}</strong><small>${product.detail}</small></span>
          <span class="search-result-arrow" aria-hidden="true">↗</span>
        </a>
      </li>`).join("");
    message.textContent = matches.length
      ? `${matches.length} ${matches.length === 1 ? "product" : "products"} found. Select one to view details.`
      : "No matching products. Try ‘solar’, ‘house wiring’ or ‘screened’.";
    return matches;
  };

  const setOpen = open => {
    panel.classList.toggle("open", open);
    searchButton.setAttribute("aria-expanded", String(open));
    if (open) {
      input.focus();
      renderResults(input.value.trim());
    }
  };

  searchButton.addEventListener("click", () => setOpen(!panel.classList.contains("open")));
  closeButton?.addEventListener("click", () => setOpen(false));
  input.addEventListener("input", () => renderResults(input.value));
  panel.addEventListener("submit", event => {
    event.preventDefault();
    const query = input.value.trim();
    if (!query) {
      message.textContent = "Enter a cable or product name to search.";
      input.focus();
      return;
    }
    const matches = renderResults(query);
    if (matches.length === 1) window.location.assign(matches[0].href);
    else if (matches.length > 1) results.querySelector("a")?.focus();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && panel.classList.contains("open")) {
      setOpen(false);
      searchButton.focus();
    }
  });
  document.addEventListener("click", event => {
    if (panel.classList.contains("open") && !panel.contains(event.target) && !searchButton.contains(event.target)) {
      setOpen(false);
    }
  });
}

const sharedComponentBase = document.querySelector('script[src*="shared.js"]')?.src;
const sharedComponentRoot = sharedComponentBase
  ? new URL("components/", sharedComponentBase)
  : new URL("components/", document.baseURI);

Promise.all([
  fetch(new URL("header.html?v=20261022-8", sharedComponentRoot)).then(response => {
    if (!response.ok) throw new Error("Could not load shared header");
    return response.text();
  }),
  fetch(new URL("footer.html?v=20261022-4", sharedComponentRoot)).then(response => {
    if (!response.ok) throw new Error("Could not load shared footer");
    return response.text();
  }).catch(error => {
    console.error("Shared footer failed to load:", error);
    return "";
  })
]).then(([headerMarkup, footerMarkup]) => {
  const isAboutPage = /\/pages\/about\.html$/.test(window.location.pathname);
  const isProcessPage = /\/pages\/process\.html$/.test(window.location.pathname);
  const isContactPage = /\/pages\/contact\.html$/.test(window.location.pathname);
  const isCareersPage = /\/pages\/careers\.html$/.test(window.location.pathname);
  const isCertificationPage = /\/pages\/certifications\.html$/.test(window.location.pathname);
  const isProductPage = /\/pages\/(?:lt-power-cables|screened-type|unscreened-type|building-wire|house-wiring|solar-cables|multicore-cables|wire-cables)\.html$/.test(window.location.pathname);
  const isSubpage = isAboutPage || isProcessPage || isContactPage || isCareersPage || isCertificationPage || isProductPage;
  const pageRoot = "index.html";
  const currentPageAnchor = anchor => `${window.location.pathname}${window.location.search}${anchor}`;
  const headerHost = document.createElement("div");
  headerHost.innerHTML = headerMarkup;
  const footerHost = document.createElement("div");
  footerHost.innerHTML = footerMarkup;

  const sharedHeader = headerHost.querySelector("header");
  const sharedSearchPanel = headerHost.querySelector(".search-panel");
  const sharedFooter = footerHost.querySelector("footer");
  const sharedLinks = [
    ...headerHost.querySelectorAll("a[href^='#']"),
    ...footerHost.querySelectorAll("a[href^='#']")
  ];

  sharedLinks.forEach(link => {
    const target = link.getAttribute("href");
    if (isSubpage) {
      link.href = isAboutPage && target === "#about" ? currentPageAnchor("#about-page") : `${pageRoot}${target}`;
    } else {
      link.href = target;
    }
  });

  headerHost.querySelectorAll(".nav-link.active").forEach(link => {
    link.classList.remove("active");
  });

  const homeLink = headerHost.querySelector('.nav-link[href="index.html#home"], .nav-link[href="#home"]');
  if (homeLink && !isSubpage) homeLink.classList.add("active");

  const aboutLink = headerHost.querySelector('.nav-link[href="pages/about.html"]');
  if (aboutLink) {
    aboutLink.href = isAboutPage ? currentPageAnchor("#about-page") : "pages/about.html";
    aboutLink.classList.toggle("active", isAboutPage);
  }

  const processLink = headerHost.querySelector('.nav-link[href="pages/process.html"]');
  if (processLink) {
    processLink.href = isProcessPage ? currentPageAnchor("#process-page") : "pages/process.html";
    processLink.classList.toggle("active", isProcessPage);
  }

  const contactLink = headerHost.querySelector('.nav-link[href="pages/contact.html"]');
  if (contactLink) {
    contactLink.href = isContactPage ? currentPageAnchor("#contact-page") : "pages/contact.html";
    contactLink.classList.toggle("active", isContactPage);
  }

  const careersLink = headerHost.querySelector('.nav-link[href="pages/careers.html"]');
  if (careersLink) {
    careersLink.href = isCareersPage ? currentPageAnchor("#careers-page") : "pages/careers.html";
    careersLink.classList.toggle("active", isCareersPage);
  }

  const certificationLink = headerHost.querySelector('.nav-link[href="pages/certifications.html"]');
  if (certificationLink) {
    certificationLink.href = isCertificationPage ? currentPageAnchor("#certifications-page") : "pages/certifications.html";
    certificationLink.classList.toggle("active", isCertificationPage);
  }

  const productsToggle = headerHost.querySelector(".products-toggle");
  if (productsToggle) productsToggle.classList.toggle("active", isProductPage);

  const quoteLink = headerHost.querySelector('.quote-btn[href="#contact"]');
  if (quoteLink) {
    quoteLink.href = isContactPage
      ? currentPageAnchor("#contact-details")
      : "pages/contact.html#contact-details";
  }

  footerHost.querySelectorAll('a[href="pages/about.html"]').forEach(link => {
    link.href = isAboutPage ? currentPageAnchor("#about-page") : "pages/about.html";
  });

  if (isSubpage) {
    document.querySelectorAll("body > .site-footer a[href^='#']").forEach(link => {
      link.href = `${pageRoot}${link.getAttribute("href")}`;
    });
  }

  if (sharedHeader) document.body.prepend(sharedHeader);
  if (sharedSearchPanel && !document.querySelector("#searchPanel")) document.body.append(sharedSearchPanel);
  if (sharedFooter && !document.querySelector(".site-footer")) {
    document.body.append(sharedFooter);
  }

  if (isProductPage) {
    const productTitle = document.querySelector("#product-title")?.textContent.trim() || "Other / Not sure";
    const enquiryDialog = document.createElement("dialog");
    enquiryDialog.className = "product-enquiry-dialog";
    enquiryDialog.id = "productEnquiryDialog";
    enquiryDialog.setAttribute("aria-labelledby", "productEnquiryTitle");
    enquiryDialog.innerHTML = `
      <div class="product-enquiry-dialog-heading">
        <div><span>PRODUCT ENQUIRY</span><h2 id="productEnquiryTitle">Ask us about ${productTitle}</h2></div>
        <button class="product-enquiry-close" type="button" aria-label="Close enquiry form">&times;</button>
      </div>
      <form class="contact-form" id="contactForm">
        <div class="contact-form-heading"><p>Share your details and we’ll get your enquiry to the right team.</p></div>
        <div class="contact-form-fields">
          <div class="contact-field"><label for="contactName">Your name <span aria-hidden="true">*</span></label><input id="contactName" name="name" type="text" autocomplete="name" placeholder="e.g. Rahul Sharma" required></div>
          <div class="contact-field"><label for="contactEmail">Email address <span aria-hidden="true">*</span></label><input id="contactEmail" name="email" type="email" autocomplete="email" placeholder="you@company.com" required></div>
          <div class="contact-field"><label for="contactPhone">Phone number</label><input id="contactPhone" name="phone" type="tel" autocomplete="tel" placeholder="+91 98765 43210"></div>
          <div class="contact-field"><label for="contactProduct">Product interest</label><select id="contactProduct" name="product"><option>LT Power Cables</option><option>Building Wire</option><option>Solar Cables</option><option>Multicore Cables</option><option>House Wiring</option><option>Wire &amp; Cables</option><option>Screened Type</option><option>Unscreened Type</option><option>Other / Not sure</option></select></div>
          <div class="contact-field contact-field--message"><label for="contactMessage">Tell us about your requirement <span aria-hidden="true">*</span></label><textarea id="contactMessage" name="message" rows="4" placeholder="Application, quantity, or any questions you have..." required></textarea></div>
        </div>
        <div class="contact-form-submit"><button type="submit">Send an enquiry <span aria-hidden="true">↗</span></button><p>We’ll use your details only to respond to this enquiry.</p></div>
        <p class="contact-form-note" id="contactFormNote" role="status" aria-live="polite"></p>
      </form>`;
    document.body.append(enquiryDialog);

    const productSelect = enquiryDialog.querySelector("#contactProduct");
    if ([...productSelect.options].some(option => option.value === productTitle)) {
      productSelect.value = productTitle;
    }

    document.querySelectorAll(".product-enquire-button").forEach(button => {
      button.href = "#productEnquiryDialog";
      button.addEventListener("click", event => {
        event.preventDefault();
        enquiryDialog.showModal();
        enquiryDialog.querySelector("#contactName").focus();
      });
    });

    enquiryDialog.querySelector(".product-enquiry-close").addEventListener("click", () => enquiryDialog.close());
    enquiryDialog.addEventListener("click", event => {
      if (event.target === enquiryDialog) enquiryDialog.close();
    });
  }

  initializeGlobalSearch();

  const appScript = document.createElement("script");
  appScript.src = new URL("script.js?v=20261022-15", sharedComponentBase).href;
  document.body.append(appScript);
}).catch(error => {
  console.error("Shared site components failed to load:", error);
});
