// ---- Light / dark theme toggle (in-memory only — see note below) ----
(function () {
  var root = document.documentElement;
  var btn = document.getElementById("themeToggle");
  var current = "dark";

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    btn.textContent = theme === "light" ? "☀️" : "🌙";
    btn.setAttribute(
      "aria-label",
      theme === "light" ? "Switch to dark mode" : "Switch to light mode",
    );
  }

  btn.addEventListener("click", function () {
    current = current === "dark" ? "light" : "dark";
    applyTheme(current);
  });
})();

// ---- Age gate (in-memory only, no storage APIs — resets each load by design) ----
(function () {
  var gate = document.getElementById("ageGate");
  var confirmBtn = document.getElementById("ageGateConfirm");
  var declineBtn = document.getElementById("ageGateDecline");

  confirmBtn.addEventListener("click", function () {
    gate.setAttribute("hidden", "");
  });
  declineBtn.addEventListener("click", function () {
    gate.querySelector(".age-gate__card").innerHTML =
      '<p style="color:var(--text-muted);font-size:0.9rem;">This site is only for visitors of legal smoking age. Please come back once you meet the age requirement in your area.</p>';
  });
})();

// ---- Smooth-scroll active nav state (optional polish) ----
(function () {
  var links = document.querySelectorAll(".nav__link");
  var sections = Array.from(links)
    .map(function (l) {
      return document.querySelector(l.getAttribute("href"));
    })
    .filter(Boolean);

  if (!("IntersectionObserver" in window)) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = "#" + entry.target.id;
          links.forEach(function (l) {
            l.style.color = l.getAttribute("href") === id ? "var(--text)" : "";
          });
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px" },
  );

  sections.forEach(function (s) {
    observer.observe(s);
  });
})();
