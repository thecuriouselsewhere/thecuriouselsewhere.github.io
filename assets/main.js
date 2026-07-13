(function () {
  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector("#site-nav");

  if (navToggle && nav) {
    var navLinks = Array.prototype.slice.call(nav.querySelectorAll("a"));
    var compactQuery = window.matchMedia("(max-width: 1080px)");

    function syncMenuState() {
      if (compactQuery.matches) {
        nav.setAttribute("aria-hidden", document.body.classList.contains("nav-open") ? "false" : "true");
      } else {
        document.body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
        nav.setAttribute("aria-hidden", "false");
      }
    }

    function closeMenu(restoreFocus) {
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
      syncMenuState();

      if (restoreFocus) {
        navToggle.focus();
      }
    }

    function openMenu() {
      document.body.classList.add("nav-open");
      navToggle.setAttribute("aria-expanded", "true");
      navToggle.setAttribute("aria-label", "Close menu");
      syncMenuState();

      if (navLinks.length) {
        window.setTimeout(function () {
          navLinks[0].focus();
        }, 120);
      }
    }

    syncMenuState();
    compactQuery.addEventListener("change", syncMenuState);

    navToggle.addEventListener("click", function () {
      var isOpen = document.body.classList.contains("nav-open");
      if (isOpen) {
        closeMenu(false);
      } else {
        openMenu();
      }
    });

    nav.addEventListener("click", function () {
      closeMenu(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && document.body.classList.contains("nav-open")) {
        closeMenu(true);
      }
    });
  }
})();
