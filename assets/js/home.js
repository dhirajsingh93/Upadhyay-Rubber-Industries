// Homepage-only interactions, kept separate from shared site behavior.

// Product gallery and manufacturing process interactions.
(() => {
            const $ = s => document.querySelector(s);

            /* ---------- products ---------- */
            const items = [
                ["dust-cover", "Dust Cover", "Neoprene", "Keeps dust and moisture out of joints and rods.", "moulded-components"],
                ["packing-seal", "Packing Seal", "NBR", "Oil-resistant sealing for industrial assemblies.", "oil-packing-seals"],
                ["gasket", "Gasket", "Silicone", "Flexible sealing across a wide temperature range.", "rubber-gaskets"],
                ["o-ring", "O-Ring", "Silicone", "Round-section seal for static and moving joints.", "o-rings-seal-kits"],
                ["oil-seal", "Oil Seal", "HNBR", "Holds lubricant in and copes with heat and chemicals.", "oil-packing-seals"],
                ["end-cap-gasket", "End Cap Gasket", "EPDM", "Weather and ozone resistant end sealing.", "rubber-gaskets"],
                ["rod-bush", "Rod Bush", "Natural rubber", "Absorbs vibration and shock at mounting points.", "rubber-bushes"],
                ["rubber-boot", "Rubber Boot", "Neoprene", "Flexible, bellows-style protective cover.", "moulded-components"],
                ["sleeve", "Sleeve", "PVC", "Extruded profile cut to your length.", "extruded-profiles"],
                ["hose", "Hose", "HNBR", "Moulded bend for fluid and air lines.", "extruded-profiles"],
                ["grommet", "Grommet", "Neoprene", "Protects cables and lines passing through panels.", "rubber-bushes"],
                ["bush", "Bush", "Natural rubber", "Simple isolation bush for vibration control.", "rubber-bushes"]
            ];
            const sec = $("#products"), view = $("#prView"), track = $("#prTrack"),
                bar = $("#prBar"), meter = $(".pr-line"), wide = matchMedia("(min-width:901px)");

            $(".pr-cta").insertAdjacentHTML("beforebegin", items.map(([f, n, m, d, cat]) =>
                `<a class="pc" href="./products.html#${cat}" data-product-category="${cat}"><img src="images/${f}.jpg" alt="${n}, ${m}" loading="lazy" width="520" height="416"><div><em>${m}</em><h3>${n}</h3><p>${d}</p><span class="pc-go" aria-hidden="true">↗</span></div></a>`
            ).join(""));

            let raf = 0;
            function updateProducts() {
                raf = 0;
                let p = 0;
                if (wide.matches) {
                    /* desktop: vertical scroll drives the sideways movement */
                    view.scrollLeft = 0;
                    const dist = Math.max(0, track.scrollWidth - view.clientWidth);
                    sec.style.height = innerHeight + dist + "px";
                    p = dist ? Math.min(1, Math.max(0, -sec.getBoundingClientRect().top / dist)) : 0;
                    track.style.transform = `translate3d(${-dist * p}px,0,0)`;
                } else {
                    /* tablet / phone: normal swipeable row */
                    sec.style.height = "";
                    track.style.transform = "";
                    const max = view.scrollWidth - view.clientWidth;
                    p = max > 0 ? view.scrollLeft / max : 0;
                }
                bar.style.width = p * 100 + "%";
                meter.setAttribute("aria-valuenow", Math.round(p * 100));
            }
            const queue = () => raf || (raf = requestAnimationFrame(updateProducts));
            addEventListener("scroll", queue, { passive: true });
            addEventListener("resize", queue);
            addEventListener("load", queue);
            view.addEventListener("scroll", queue, { passive: true });
            updateProducts();

            /* ---------- process ---------- */
            const pv = $("#ppView"), steps = [...pv.querySelectorAll(".pp-step")],
                page = $("#ppPage"), pbar = $("#ppBar"), prev = $("#ppPrev"), next = $("#ppNext"),
                two = n => String(n).padStart(2, "0");

            /* icon + stage label on every step */
            const icons = [
                "<rect x='6' y='4' width='12' height='17' rx='2'/><path d='M9 4h6v3H9zM9 14l2 2 4-4'/>",
                "<path d='M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M8 15h8'/>",
                "<circle cx='8.5' cy='8' r='4'/><circle cx='15.5' cy='8' r='4'/><path d='M3 18c4 0 5-2 9-2s5 2 9 2'/>",
                "<rect x='4' y='3' width='16' height='7' rx='1'/><rect x='4' y='14' width='16' height='7' rx='1'/><path d='M10 10v4M14 10v4'/>",
                "<path d='M12 3v7M9 7l3 3 3-3'/><rect x='5' y='12' width='14' height='4' rx='1'/><path d='M4 21h16'/>",
                "<path d='M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 1-3 0-6 1-9z'/>",
                "<circle cx='6' cy='7' r='3'/><circle cx='6' cy='17' r='3'/><path d='M8.5 8.5L20 19M8.5 15.5L20 5'/>",
                "<rect x='3' y='9' width='18' height='6' rx='1'/><path d='M7 9v3M11 9v2M15 9v3M19 9v2'/>",
                "<path d='M5 19a9 9 0 1 1 14 0'/><path d='M12 14l4-5'/><circle cx='12' cy='14' r='1.5'/>",
                "<circle cx='12' cy='10' r='6'/><path d='M9.5 10l2 2 3-3.5M8.5 15l-1.5 6 5-3 5 3-1.5-6'/>",
                "<path d='M3 8l9-5 9 5v8l-9 5-9-5zM3 8l9 5 9-5M12 13v8'/>",
                "<path d='M3 6h11v10H3zM14 9h4l3 3v4h-7'/><circle cx='7.5' cy='17.5' r='1.8'/><circle cx='17.5' cy='17.5' r='1.8'/>"
            ];
            const stage = ["Plan", "Plan", "Make", "Make", "Make", "Make", "Make", "Check", "Check", "Check", "Deliver", "Deliver"];
            steps.forEach((el, i) => {
                el.insertAdjacentHTML("afterbegin", `<span class="pp-ic"><svg viewBox="0 0 24 24" aria-hidden="true">${icons[i]}</svg></span>`);
                el.querySelector("h3").insertAdjacentHTML("beforebegin", `<small>${stage[i]}</small>`);
            });

            function updateProcess() {
                const w = steps[0].offsetWidth + 16,
                    per = Math.max(1, Math.round(pv.clientWidth / w)),
                    first = Math.min(steps.length - 1, Math.round(pv.scrollLeft / w)),
                    last = Math.min(steps.length, first + per);
                page.textContent = `${two(first + 1)}–${two(last)} / ${steps.length}`;
                pbar.style.width = (last / steps.length) * 100 + "%";
                prev.disabled = pv.scrollLeft < 4;
                next.disabled = pv.scrollLeft >= pv.scrollWidth - pv.clientWidth - 4;
            }
            const go = dir => pv.scrollBy({ left: dir * pv.clientWidth * 0.95 });
            prev.addEventListener("click", () => go(-1));
            next.addEventListener("click", () => go(1));
            pv.addEventListener("scroll", updateProcess, { passive: true });
            addEventListener("resize", updateProcess);
            updateProcess();
        })();

// Customer logo carousel interaction.
(() => {
    /* logo file name, company name */
    const clients = [
      ["affy", "Affy India Pvt. Ltd."], ["eva", "EVA Industries"], ["mini-meter", "Mini Meter Pvt. Ltd."], ["palak", "Palak Plastic Pvt. Ltd."],
      ["talbros", "Talbros Automotive Components Ltd."], ["sunren", "Sunren Automotive Pvt. Ltd."], ["vishwakarma", "Vishwakarma Auto Parts Pvt. Ltd."], ["superlink", "Superlink Industries"],
      ["pragati", "Pragati Coating Pvt. Ltd."], ["alok", "Alok Industries"], ["sheller", "Sheller Industries"], ["accurate", "Accurate Industries"],
      ["rh-kioko", "RH Kioko Automotive"], ["autokoi", "Autokoi Industries"], ["century", "Century Springs Pvt. Ltd."], ["mechseal", "Mechseal Engineers Pvt. Ltd."]
    ];
    const $ = id => document.getElementById(id);
    const view = $("csView"), track = $("csTrack"), prev = $("csPrev"), next = $("csNext");

    track.innerHTML = clients.map(([f, n]) =>
      `<li class="cs-card"><span class="cs-logo"><img src="images/clients/${f}.png" alt="${n} logo" loading="lazy"></span><h3>${n}</h3></li>`
    ).join("");

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = () => track.firstElementChild.offsetWidth + 16;
    const max = () => view.scrollWidth - view.clientWidth;

    /* move by n cards; wraps around at both ends */
    function go(dir, n) {
      const x = view.scrollLeft;
      if (dir > 0 && x >= max() - 4) view.scrollTo({ left: 0 });
      else if (dir < 0 && x <= 4) view.scrollTo({ left: max() });
      else view.scrollBy({ left: dir * step() * n });
    }
    const perPage = () => Math.max(1, Math.floor(view.clientWidth / step()));

    /* autoplay: one card every 2 seconds, only while visible */
    let timer = null, visible = false;
    const stop = () => { clearInterval(timer); timer = null; };
    const play = () => {
      if (timer || !visible || reduce || document.hidden) return;
      timer = setInterval(() => go(1, 1), 1000);
    };
    const restart = () => { stop(); play(); };

    prev.addEventListener("click", () => { go(-1, perPage()); restart(); });
    next.addEventListener("click", () => { go(1, perPage()); restart(); });
    view.addEventListener("pointerenter", stop);
    view.addEventListener("pointerleave", play);
    view.addEventListener("focusin", stop);
    view.addEventListener("focusout", play);
    document.addEventListener("visibilitychange", () => document.hidden ? stop() : play());
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? play() : stop(); }, { threshold: 0.2 }).observe(view);
  })();
