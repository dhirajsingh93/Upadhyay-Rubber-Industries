document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // ELEMENTS
  // =========================
  const header = document.querySelector("#header");
  const hero = document.querySelector("#home");
  const heroBackgrounds = [...document.querySelectorAll(".hero-bg")];
  const heroStepButtons = [...document.querySelectorAll("[data-hero-step]")];

  const heroMessage = document.querySelector("#heroMessage");
  const heroEyebrowText = document.querySelector("#heroEyebrowText");
  const heroTitle = document.querySelector("#heroTitle");
  const heroHighlight = document.querySelector("#heroHighlight");
  const heroDescription = document.querySelector("#heroDescription");
  const scrollCue = document.querySelector("#scrollCue");

  const menuToggle = document.querySelector("#menuToggle");
  const nav = document.querySelector("#nav");
  const productsToggle = document.querySelector("#productsToggle");
  const productsMenu = document.querySelector("#productsMenu");
  const searchBtn = document.querySelector("#searchBtn");

  // =========================
  // ACTIVE NAV LINK SYNC
  // =========================
  function syncActiveNavLink() {
    if (!nav) return;
    const path = window.location.pathname.toLowerCase();
    const filename = path.split("/").pop() || "index.html";

    const navLinks = nav.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      let isCurrent = false;
      const href = (link.getAttribute("href") || "").toLowerCase().split("#")[0].split("/").pop();

      if (link.id === "productsToggle") {
        isCurrent = filename.includes("product");
      } else if (filename === "" || filename === "index.html") {
        isCurrent = href === "" || href === "index.html" || link.getAttribute("href") === "#home";
      } else if (href && (filename === href || filename.replace(".html", "") === href.replace(".html", ""))) {
        isCurrent = true;
      }

      if (isCurrent) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      }
    });
  }

  syncActiveNavLink();


  // =========================
  // HERO SLIDES
  // =========================
  const heroScenes = [
    {
      image: "images/site/home-1.jpg",
      position: "center center",
      eyebrow: "ENGINEERED FOR INDUSTRIAL EXCELLENCE",
      title: "Precision in Every ",
      highlight: "Component.",
      description:
        "Upadhyay Rubber Industry delivers rubber and plastic component solutions for industrial and OEM requirements, focusing on precision, reliability, and application-specific needs."
    },
    {
      image: "images/site/home-2.jpg",
      position: "center center",
      eyebrow: "INDUSTRIAL RUBBER SOLUTIONS",
      title: "Built for ",
      highlight: "Reliable Performance.",
      description:
        "Explore rubber bushes, moulded components, extruded profiles, gaskets, and sealing solutions tailored to your requirements."
    },
    {
      image: "images/site/home-3.jpg",
      position: "center center",
      eyebrow: "CUSTOMISED COMPONENTS",
      title: "Your Needs. ",
      highlight: "Our Solutions.",
      description:
        "Discuss your product specifications with our team and explore suitable rubber components for industrial and manufacturing needs."
    }
  ];

  let activeHeroStep = 0;
  let activeBackgroundLayer = 0;
  let scrollStateFrame = 0;
  let lastScrollY = window.scrollY;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  // Preload hero images
  heroScenes.forEach((scene) => {
    const image = new Image();
    image.src = scene.image;
  });

  // Initialize both backgrounds
  if (heroBackgrounds[0] && heroScenes[0]) {
    heroBackgrounds[0].style.backgroundImage =
      `url("${heroScenes[0].image}")`;

    heroBackgrounds[0].style.backgroundPosition =
      heroScenes[0].position;

    heroBackgrounds[0].classList.add("is-visible");
  }

  if (heroBackgrounds[1] && heroScenes[1]) {
    heroBackgrounds[1].style.backgroundImage =
      `url("${heroScenes[1].image}")`;

    heroBackgrounds[1].style.backgroundPosition =
      heroScenes[1].position;
  }

  // =========================
  // CHANGE HERO SLIDE
  // =========================
  function setHeroStep(step) {
    if (!hero || !heroScenes[step]) return;

    step = Math.max(0, Math.min(step, heroScenes.length - 1));

    const scene = heroScenes[step];

    if (step !== activeHeroStep) {
      const nextLayerIndex = activeBackgroundLayer === 0 ? 1 : 0;
      const nextLayer = heroBackgrounds[nextLayerIndex];
      const currentLayer = heroBackgrounds[activeBackgroundLayer];

      if (nextLayer) {
        nextLayer.style.backgroundImage = `url("${scene.image}")`;
        nextLayer.style.backgroundPosition = scene.position;

        nextLayer.classList.add("is-visible");

        if (currentLayer) {
          currentLayer.classList.remove("is-visible");
        }

        activeBackgroundLayer = nextLayerIndex;
      }

      if (
        heroEyebrowText &&
        heroTitle &&
        heroHighlight &&
        heroDescription
      ) {
        heroEyebrowText.textContent = scene.eyebrow;
        heroTitle.textContent = scene.title;
        heroHighlight.textContent = scene.highlight;
        heroDescription.textContent = scene.description;

        if (heroMessage && !reducedMotion.matches) {
          heroMessage.classList.remove("is-entering");

          // Restart the CSS animation
          void heroMessage.offsetWidth;

          heroMessage.classList.add("is-entering");
        }
      }

      activeHeroStep = step;
    }

    hero.dataset.activeStep = String(step);

    heroStepButtons.forEach((button, index) => {
      const isActive = index === step;

      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  // =========================
  // SCROLL TO HERO SLIDE
  // =========================
  function scrollToHeroStep(step) {
    if (!hero) return;

    step = Math.max(0, Math.min(step, heroScenes.length - 1));

    const scrollDistance = hero.offsetHeight - window.innerHeight;

    if (scrollDistance <= 0) {
      setHeroStep(step);
      return;
    }

    const progress = (step + 0.5) / heroScenes.length;
    const top = window.scrollY + hero.getBoundingClientRect().top +
      scrollDistance * progress;

    window.scrollTo({
      top,
      behavior: reducedMotion.matches ? "auto" : "smooth"
    });
  }

  // =========================
  // HEADER + HERO SCROLL
  // =========================
  function updateScrollState() {
    scrollStateFrame = 0;

    const currentScrollY = window.scrollY;

    if (header) {
      const scrollDelta = currentScrollY - lastScrollY;

      const navigationOpen =
        nav?.classList.contains("open") ||
        productsToggle?.getAttribute("aria-expanded") === "true";

      header.classList.toggle("scrolled", currentScrollY > 35);

      if (
        currentScrollY <= 35 ||
        navigationOpen ||
        scrollDelta < -8
      ) {
        header.classList.remove("is-hidden");
      } else if (scrollDelta > 8 && currentScrollY > 120) {
        header.classList.add("is-hidden");
      }
    }

    lastScrollY = currentScrollY;

    if (!hero) return;

    const scrollDistance = hero.offsetHeight - window.innerHeight;

    const progress =
      scrollDistance > 0
        ? Math.min(
            1,
            Math.max(
              0,
              -hero.getBoundingClientRect().top / scrollDistance
            )
          )
        : 0;

    const step = Math.min(
      heroScenes.length - 1,
      Math.floor(progress * heroScenes.length)
    );

    setHeroStep(step);
  }

  function scheduleScrollStateUpdate() {
    if (scrollStateFrame) return;

    scrollStateFrame = window.requestAnimationFrame(updateScrollState);
  }

  window.addEventListener("scroll", scheduleScrollStateUpdate, {
    passive: true
  });

  window.addEventListener("resize", scheduleScrollStateUpdate);

  // Hero indicator buttons
  heroStepButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      scrollToHeroStep(index);
    });
  });

  // Scroll cue
  if (scrollCue && hero) {
    scrollCue.addEventListener("click", (event) => {
      event.preventDefault();

      const nextStep = Math.min(
        activeHeroStep + 1,
        heroScenes.length - 1
      );

      if (nextStep === activeHeroStep) {
        const nextSection = document.querySelector("#products");

        if (nextSection) {
          nextSection.scrollIntoView({
            behavior: reducedMotion.matches ? "auto" : "smooth"
          });
        }

        return;
      }

      scrollToHeroStep(nextStep);
    });
  }

  // =========================
  // PRODUCTS DROPDOWN
  // =========================
  function setProductsMenuOpen(isOpen) {
    if (!productsToggle || !productsMenu) return;

    productsToggle.setAttribute("aria-expanded", String(isOpen));
    productsMenu.hidden = !isOpen;
  }

  let productsHoverCloseTimer;

  const canHoverProducts = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  );

  function cancelProductsHoverClose() {
    window.clearTimeout(productsHoverCloseTimer);
  }

  function scheduleProductsHoverClose() {
    cancelProductsHoverClose();

    productsHoverCloseTimer = window.setTimeout(() => {
      setProductsMenuOpen(false);
    }, 180);
  }

  if (productsToggle && productsMenu) {
    if (canHoverProducts.matches) {
      productsToggle.addEventListener("mouseenter", () => {
        cancelProductsHoverClose();
        setProductsMenuOpen(true);
      });

      productsMenu.addEventListener("mouseenter", cancelProductsHoverClose);

      productsToggle.addEventListener(
        "mouseleave",
        scheduleProductsHoverClose
      );

      productsMenu.addEventListener(
        "mouseleave",
        scheduleProductsHoverClose
      );
    }

    productsToggle.addEventListener("click", () => {
      cancelProductsHoverClose();

      const isOpen =
        productsToggle.getAttribute("aria-expanded") === "true";

      setProductsMenuOpen(!isOpen);
    });
  }

  // =========================
  // MOBILE NAVIGATION
  // =========================
  if (menuToggle && nav) {
    function closeMenu() {
      nav.classList.remove("open");

      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");

      setProductsMenuOpen(false);
    }

    menuToggle.addEventListener("click", () => {
      const isOpen =
        menuToggle.getAttribute("aria-expanded") === "true";

      if (isOpen) {
        closeMenu();
      } else {
        nav.classList.add("open");

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation");
      }
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    document.addEventListener("click", (event) => {
      if (header && !header.contains(event.target)) {
        closeMenu();
      }
    });
  }

  // =========================
  // SEARCH PANEL
  // Created dynamically
  // =========================
  let searchPanel = document.querySelector("#searchPanel");
  let searchInput;
  let searchResults;

  if (!searchPanel) {
    searchPanel = document.createElement("section");

    searchPanel.id = "searchPanel";
    searchPanel.className = "search-panel";
    searchPanel.setAttribute("aria-label", "Website search");
    searchPanel.setAttribute("aria-hidden", "true");

    searchPanel.innerHTML = `
      <div class="search-panel-heading">
        <div>
          <span class="search-kicker">QUICK SEARCH</span>
          <label for="siteSearch">What are you looking for?</label>
        </div>

        <button
          type="button"
          class="search-close"
          id="searchClose"
          aria-label="Close search"
        >&times;</button>
      </div>

      <form class="search-field" id="siteSearchForm">
        <input
          id="siteSearch"
          type="search"
          placeholder="Search products or sections..."
          autocomplete="off"
          aria-label="Search products or sections"
        />

        <button type="submit" aria-label="Submit search">
          &#8594;
        </button>
      </form>

      <p class="search-hint" id="searchHint">
        Search for products, quality, manufacturing, or contact details.
      </p>

      <ul class="search-results" id="searchResults"></ul>
    `;

    document.body.appendChild(searchPanel);
  }

  searchInput = searchPanel.querySelector("#siteSearch");
  searchResults = searchPanel.querySelector("#searchResults");

  const searchClose = searchPanel.querySelector("#searchClose");
  const searchForm = searchPanel.querySelector("#siteSearchForm");
  const searchHint = searchPanel.querySelector("#searchHint");

  function getSearchableItems() {
    const items = [];
    const seen = new Set();

    document.querySelectorAll("a[href]").forEach((link) => {
      if (searchPanel.contains(link)) return;

      const label = link.innerText.trim().replace(/\s+/g, " ");
      const href = link.getAttribute("href");

      if (!label || !href || href === "#") return;

      const key = `${label}|${href}`;

      if (seen.has(key)) return;
      seen.add(key);

      items.push({
        label,
        href,
        searchText: label.toLowerCase()
      });
    });

    document.querySelectorAll("h1, h2, h3, [id]").forEach((element) => {
      if (searchPanel.contains(element)) return;

      const label = element.innerText?.trim().replace(/\s+/g, " ");
      const id = element.id;

      if (!label || !id || label.length > 150) return;

      const href = `#${id}`;
      const key = `${label}|${href}`;

      if (seen.has(key)) return;
      seen.add(key);

      items.push({
        label,
        href,
        searchText: label.toLowerCase()
      });
    });

    return items;
  }

  function renderSearchResults(query = "") {
    if (!searchResults) return;

    searchResults.replaceChildren();

    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      if (searchHint) {
        searchHint.textContent =
          "Type a keyword to find matching pages and sections.";
      }

      return;
    }

    const matches = getSearchableItems()
      .filter((item) => item.searchText.includes(normalizedQuery))
      .slice(0, 10);

    if (searchHint) {
      searchHint.textContent = matches.length
        ? `${matches.length} matching result(s) shown.`
        : "No matching sections or links found. Try another keyword.";
    }

    matches.forEach((item) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      const copy = document.createElement("span");
      const arrow = document.createElement("span");

      link.className = "search-result-link";
      link.href = item.href;

      copy.className = "search-result-copy";

      const strong = document.createElement("strong");
      strong.textContent = item.label;

      copy.appendChild(strong);

      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = "↗";

      link.append(copy, arrow);
      li.appendChild(link);
      searchResults.appendChild(li);
    });
  }

  function openSearch() {
    if (!searchPanel) return;

    searchPanel.classList.add("open");
    searchPanel.setAttribute("aria-hidden", "false");

    if (searchBtn) {
      searchBtn.setAttribute("aria-expanded", "true");
    }

    if (searchInput) {
      window.setTimeout(() => searchInput.focus(), 50);
    }
  }

  function closeSearch() {
    if (!searchPanel) return;

    searchPanel.classList.remove("open");
    searchPanel.setAttribute("aria-hidden", "true");

    if (searchBtn) {
      searchBtn.setAttribute("aria-expanded", "false");
    }
  }

  if (searchBtn && searchPanel) {
    searchBtn.addEventListener("click", () => {
      const isOpen = searchPanel.classList.contains("open");

      if (isOpen) {
        closeSearch();
      } else {
        openSearch();
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderSearchResults(searchInput.value);
    });
  }

  if (searchForm) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      renderSearchResults(searchInput?.value || "");

      const firstResult = searchResults?.querySelector("a");

      if (firstResult) {
        firstResult.click();
      }
    });
  }

  if (searchClose) {
    searchClose.addEventListener("click", closeSearch);
  }

  if (searchResults) {
    searchResults.addEventListener("click", (event) => {
      const link = event.target.closest("a");

      if (!link) return;

      closeSearch();

      if (nav?.classList.contains("open")) {
        nav.classList.remove("open");
        menuToggle?.setAttribute("aria-expanded", "false");
        menuToggle?.setAttribute("aria-label", "Open navigation");
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSearch();
      setProductsMenuOpen(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (
      searchPanel?.classList.contains("open") &&
      !searchPanel.contains(event.target) &&
      !searchBtn?.contains(event.target)
    ) {
      closeSearch();
    }
  });

  // =========================
  // INITIALIZE
  // =========================
  // Keep the shared copyright year current on pages that include the footer.
  const footerYear = document.querySelector("#footer-year");
  if (footerYear) {
    footerYear.textContent = String(new Date().getFullYear());
  }

  setHeroStep(0);
  updateScrollState();
});


//done here-----


