(function () {
  document.documentElement.classList.add("js");

  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");

  function setMenu(open) {
    menu.classList.toggle("open", open);
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
  }

  toggle.addEventListener("click", function () {
    setMenu(!menu.classList.contains("open"));
  });

  document.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      setMenu(false);
    });
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) setMenu(false);
  });

  var revealEls = document.querySelectorAll(".reveal");

  function revealAll() {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealAll();
  }
})();
