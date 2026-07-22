// ============================================================
// script.js — Interactions de la page (index.html).
//
// Rôle    : anime les titres, gère l'accordéon Parcours, la nav
//           active et les apparitions au scroll. Aucune dépendance.
// Entrée  : le DOM d'index.html (.section-title, .accordion-item,
//           [data-nav], [data-reveal]).
// Note    : chargé en fin de <body>, donc après le DOM.
// ============================================================

// === 1. Titres de section : un cadre autour de chaque lettre ===
//
// On découpe le texte de chaque .section-title en une série de
// <span class="letter">, un par caractère. Un espace devient un
// span "letter-space" (sans cadre, voir style.css), juste pour
// garder l'espacement entre les mots.
document.querySelectorAll(".section-title").forEach((title) => {
  const text = title.textContent;
  title.textContent = ""; // on vide le titre, on va le reconstruire avec des spans

  text.split("").forEach((char) => {
    const letter = document.createElement("span");
    if (char === " ") {
      letter.className = "letter letter-space";
    } else {
      letter.className = "letter";
      letter.textContent = char;
    }
    title.appendChild(letter);
  });
});

// === 2. Accordéon (section Parcours) ===
//
// Un seul élément ouvert à la fois : cliquer sur un titre ouvre sa
// carte et referme celle qui était ouverte avant.
const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((item) => {
  const header = item.querySelector(".accordion-header");

  header.addEventListener("click", () => {
    const wasOpen = item.classList.contains("is-open");

    accordionItems.forEach((other) => other.classList.remove("is-open"));

    if (!wasOpen) {
      item.classList.add("is-open");
    }
  });
});

// === 3. Lien actif du menu selon la section visible ===
const sections = document.querySelectorAll("section[id]");
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
  { rootMargin: "-45% 0px -45% 0px" }
);

sections.forEach((section) => navObserver.observe(section));

// === 4. Apparition/disparition au scroll (tous les [data-reveal]) ===
//
// Contrairement à un simple "reveal one-shot", on ne fait JAMAIS
// unobserve() : la classe .is-visible est retirée dès que l'élément
// n'est plus dans la zone visible, pas juste ajoutée une fois.
// rootMargin ne réduit la zone "visible" qu'en HAUT (-90px, à peu près
// la hauteur de la nav flottante — en dur ici, pas lu depuis la
// variable CSS --nav-height) : la limite qui déclenche le fondu est
// donc pile sous la nav, que l'élément la franchisse en scrollant
// vers le haut ou vers le bas (l'IntersectionObserver ne se soucie pas
// de la direction, seulement de la position actuelle).
const revealItems = document.querySelectorAll("[data-reveal]");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-visible", entry.isIntersecting);
    });
  },
  { rootMargin: "-90px 0px 0px 0px", threshold: 0 }
);

revealItems.forEach((item) => revealObserver.observe(item));
