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

  const normalizePath = (path) => {
    const withoutIndex = path.replace(/\/index\.html$/, "/");
    return withoutIndex.endsWith("/") ? withoutIndex : `${withoutIndex}/`;
  };

  const currentPath = normalizePath(window.location.pathname);

  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");

    if (href && !href.startsWith("#")) {
      try {
        const linkUrl = new URL(href, window.location.href);
        if (linkUrl.origin === window.location.origin && normalizePath(linkUrl.pathname) === currentPath) {
          link.classList.add("is-active");
        }
      } catch {
        // Ignore non-URL hrefs.
      }
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

  const connectPanel = document.querySelector("[data-home-connect]");
  if (connectPanel) {
    const openButton = connectPanel.querySelector("[data-connect-open]");
    const form = connectPanel.querySelector("[data-connect-form]");
    const submitButton = connectPanel.querySelector("[data-connect-submit]");
    const errorMessage = connectPanel.querySelector("[data-connect-error]");
    const successMessage = connectPanel.querySelector("[data-connect-success]");

    openButton.addEventListener("click", () => {
      openButton.hidden = true;
      openButton.setAttribute("aria-expanded", "true");
      form.hidden = false;
      connectPanel.classList.add("is-open");
      form.querySelector("input").focus();
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      errorMessage.hidden = true;
      submitButton.disabled = true;
      submitButton.textContent = "Sending…";
      form.setAttribute("aria-busy", "true");

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (!response.ok) throw new Error("Formspree rejected the submission");

        form.hidden = true;
        successMessage.hidden = false;
        successMessage.focus();
      } catch {
        errorMessage.textContent = "Sorry, your message could not be sent. Please try again.";
        errorMessage.hidden = false;
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Send message";
        form.removeAttribute("aria-busy");
      }
    });
  }

  const communityForm = document.querySelector("[data-community-form]");
  if (communityForm) {
    const submitButton = communityForm.querySelector("[data-community-submit]");
    const errorMessage = communityForm.querySelector("[data-community-error]");
    const successMessage = document.querySelector("[data-community-success]");

    communityForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      errorMessage.hidden = true;
      submitButton.disabled = true;
      submitButton.textContent = "Sending…";
      communityForm.setAttribute("aria-busy", "true");

      try {
        const response = await fetch(communityForm.action, {
          method: "POST",
          body: new FormData(communityForm),
          headers: { Accept: "application/json" },
        });

        if (!response.ok) throw new Error("Formspree rejected the submission");

        communityForm.hidden = true;
        successMessage.hidden = false;
        successMessage.focus();
      } catch {
        errorMessage.textContent = "Sorry, we couldn't send your details. Please try again.";
        errorMessage.hidden = false;
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "I’m ready";
        communityForm.removeAttribute("aria-busy");
      }
    });
  }

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
