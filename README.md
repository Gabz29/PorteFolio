# CV — Gabriel Quellec

Site portfolio / CV en ligne, en une page, présentant mon profil, mon parcours,
mes projets et mes coordonnées.

**En ligne :** [gabz29.github.io/PorteFolio](https://gabz29.github.io/PorteFolio/) (hébergé via GitHub Pages)

## Structure

```
index.html              Page unique (entrée du site)
site/
  css/style.css          Styles (thème sombre, mise en page responsive)
  js/script.js           Titres animés, accordéon Parcours, nav active, effets au scroll
  img/                    Photos, logos de compétences, visuels de projets
  CV_Gabriel_Quellec.pdf  CV téléchargeable depuis la section Contact
```

## Sections

- **Accueil** — nom, recherche actuelle (stage / alternance)
- **Profil** — bio, hard skills, soft skills
- **Parcours** — formations et expériences en accordéon
- **Projets** — projets récents avec description et technologies
- **Contact** — email, téléphone, réseaux, téléchargement du CV

## Lancer le site en local

Aucune dépendance ni build : ouvrir `index.html` directement dans un navigateur,
ou servir le dossier avec un petit serveur local, par exemple :

```
npx serve .
```

## Stack

HTML / CSS / JavaScript vanilla — pas de framework ni de build step.
