// ---------------------------------------------------------
// Highlight the nav link for the section currently in view
// ---------------------------------------------------------
const navLinks = document.querySelectorAll(".nav-link");
const sectionMap = new Map();

navLinks.forEach((link) => {
  const href = link.getAttribute("href");
  if (!href || !href.startsWith("#") || href === "#") return;
  const section = document.getElementById(href.slice(1));
  if (section) sectionMap.set(section, link);
});

if ("IntersectionObserver" in window && sectionMap.size) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = sectionMap.get(entry.target);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove("is-active"));
          link.classList.add("is-active");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sectionMap.forEach((_, section) => navObserver.observe(section));
}

// ---------------------------------------------------------
// Reveal cards as they scroll into view
// ---------------------------------------------------------
const revealTargets = document.querySelectorAll(
  ".skill-card, .education-card, .project-card, .contact-card, .about-image, .about-content"
);

revealTargets.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(22px)";
  el.style.transition = "opacity .6s cubic-bezier(.22,1,.36,1), transform .6s cubic-bezier(.22,1,.36,1)";
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = (i % 3) * 80;
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, delay);
          revealObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealTargets.forEach((el) => revealObserver.observe(el));
} else {
  revealTargets.forEach((el) => {
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  });
}

// ---------------------------------------------------------
// Footer year
// ---------------------------------------------------------
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
