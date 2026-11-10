(function () {
  "use strict";
  var header = document.querySelector(".site-header");
  var nav = document.getElementById("hauptnavigation");
  var toggle = document.querySelector(".menu-toggle");

  function onScroll() { header && header.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
  }

  // Dropdown "Leistungen"
  document.querySelectorAll(".has-sub").forEach(function (item) {
    var btn = item.querySelector("button");
    var hoverable = window.matchMedia("(hover: hover) and (min-width: 921px)");
    function set(open) { item.dataset.open = String(open); btn.setAttribute("aria-expanded", String(open)); }
    btn.addEventListener("click", function () { set(item.dataset.open !== "true"); });
    item.addEventListener("mouseenter", function () { if (hoverable.matches) set(true); });
    item.addEventListener("mouseleave", function () { if (hoverable.matches) set(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
    document.addEventListener("click", function (e) { if (!item.contains(e.target) && hoverable.matches) set(false); });
  });

  // Lightbox
  var dialog = document.querySelector(".lightbox");
  if (dialog && dialog.showModal) {
    var img = dialog.querySelector("img");
    document.querySelectorAll("[data-lightbox]").forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        img.src = a.getAttribute("href");
        img.alt = (a.querySelector("img") || {}).alt || "";
        dialog.showModal();
      });
    });
    dialog.addEventListener("click", function (e) { if (e.target === dialog || e.target.tagName === "BUTTON") dialog.close(); });
  }

  // YouTube: erst nach Klick laden (Datenschutz)
  document.querySelectorAll("[data-youtube]").forEach(function (box) {
    var btn = box.querySelector(".play");
    btn && btn.addEventListener("click", function () {
      var f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + box.dataset.youtube + "?autoplay=1&rel=0";
      f.title = box.dataset.title || "Video";
      f.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen";
      f.allowFullscreen = true;
      box.innerHTML = ""; box.appendChild(f);
    });
  });

  // Referenzen filtern
  var filter = document.querySelector(".ref-filter");
  if (filter) {
    filter.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      filter.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      var cat = b.dataset.cat;
      document.querySelectorAll(".ref").forEach(function (r) { r.hidden = cat !== "alle" && r.dataset.cat !== cat; });
    });
  }

  // Kontaktformular: Fehlermeldung aus Query
  var params = new URLSearchParams(location.search);
  if (params.get("fehler")) {
    var al = document.querySelector(".alert.error"); if (al) al.classList.add("show");
  }
  var ts = document.querySelector("input[name=ts]"); if (ts) ts.value = String(Date.now());
})();
