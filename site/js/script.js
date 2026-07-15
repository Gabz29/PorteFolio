// ============================================================
// 1. SURLIGNER LE LIEN ACTIF DU MENU
// On observe chaque grande section (<header id="accueil">, <section id="...">,
// <footer id="contact">) et on regarde laquelle est actuellement au milieu de
// l'écran, pour mettre en couleur (.active) le lien du menu correspondant.
// ============================================================
const sections = document.querySelectorAll("section[id], header[id], footer[id]");
const navLinks = document.querySelectorAll("[data-nav]");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", isCurrent);
      });
    });
  },
  { rootMargin: "-45% 0px -45% 0px" } // ne compte que la bande au milieu de l'écran
);

sections.forEach((section) => navObserver.observe(section));

// ============================================================
// 2. ANIMATION D'APPARITION AU SCROLL
// Tous les éléments marqués data-reveal démarrent invisibles (voir style.css).
// Dès qu'un élément entre dans l'écran, on lui ajoute la classe "is-visible",
// ce qui déclenche la transition CSS (fondu + léger décalage vers le haut).
// ============================================================
const revealItems = document.querySelectorAll("[data-reveal]");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target); // une seule fois suffit
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => revealObserver.observe(item));
