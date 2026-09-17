(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  var projects = document.querySelectorAll(".project");
  if (!projects.length) return;

  function showAll() {
    projects.forEach(function (project) {
      project.classList.add("is-visible");
    });
  }

  if (!("IntersectionObserver" in window)) {
    showAll();
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    showAll();
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -36px 0px" }
  );

  projects.forEach(function (project) {
    observer.observe(project);
  });
})();
