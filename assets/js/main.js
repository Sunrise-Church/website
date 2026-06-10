(() => {
  const nav = document.querySelector("[data-site-nav]");
  const menu = document.querySelector("[data-mobile-menu]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const menuClose = document.querySelector("[data-menu-close]");
  const currentYear = document.querySelector("[data-current-year]");

  if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
  }

  const updateNavState = () => {
    if (!nav) return;
    const shouldScrollStyle =
      !document.body.classList.contains("home-page") || window.scrollY > 50;
    nav.classList.toggle("nav-scrolled", shouldScrollStyle);
  };

  const setMenuOpen = (open) => {
    if (!menu || !menuToggle) return;
    menu.hidden = !open;
    document.body.classList.toggle("menu-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
  };

  const currentFile = (() => {
    const file = window.location.pathname.split("/").pop();
    return file === "" ? "index.html" : file;
  })();

  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");

    if (href === currentFile || (currentFile === "index.html" && href === "index.html")) {
      link.classList.add("is-active");
    }

    if (link.hasAttribute("data-placeholder-link")) {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        setMenuOpen(false);
      });
      return;
    }

    if (href && href.startsWith("#") && href.length > 1) {
      link.addEventListener("click", (event) => {
        const target = document.querySelector(href);
        if (!target) return;
        event.preventDefault();
        setMenuOpen(false);
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }

    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.querySelectorAll("[data-visual-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  });

  menuToggle?.addEventListener("click", () => setMenuOpen(true));
  menuClose?.addEventListener("click", () => setMenuOpen(false));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  });

  window.addEventListener("scroll", updateNavState, { passive: true });
  updateNavState();
})();
