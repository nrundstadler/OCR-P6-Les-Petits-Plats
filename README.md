# Projet 7 : Les petits plats

7ème projet de la formation "Développeur d'application JavaScript React" d'OpenClassrooms.

![Screenshot](screenshot.jpg)

## Solution proposée

La version live de ce projet est disponible sur [Github Pages](https://nrundstadler.github.io/OCR-P7-Les-Petits-Plats/src/).

## Contexte du projet

L’objectif de ce projet était de créer un site de recettes de cuisine dynamique, où les utilisateurs peuvent rechercher des recettes par mots-clés et filtrer par ingrédients, appareils... L'enjeu principal était de mettre en place une recherche performante et optimisée.

## Description

Ce projet a commencé par la création de l’interface du site en suivant une maquette Figma fournie. Pour cela, j'ai décidé d’utiliser le Framework CSS **Tailwind**.

### Fonctionnalités développées

- **Recherche par mots-clés :** J'ai implémenté deux versions de l'algorithme de recherche, l'une utilisant des boucles natives, l'autre basée sur les méthodes fonctionnelles.
- **Comparaison des performances :** Après avoir implémenté les deux versions, j'ai testé et comparé leurs performances en utilisant des outils comme Jsben.ch. Les résultats ont été documentés dans une fiche d’investigation de fonctionnalité, accessible [ici](https://github.com/nrundstadler/OCR-P7-Les-Petits-Plats/blob/main/fiche_investigation.pdf).
- **Filtrage par tags :** Le site permet aux utilisateurs de restreindre les résultats de recherche à des recettes correspondant à des critères spécifiques comme les ingrédients ou les appareils de cuisine.
- **Optimisation du code :** Le projet met l'accent sur le respect des bonnes pratiques de développement, avec un code découpé en fonctions réutilisables.
  :

## Technologies utilisées

- **HTML** : Structure du site.
- **CSS** : Mise en forme avec **Tailwind CSS**.
- **JavaScript** : Développement des fonctionnalités de recherche et de filtrage.
- **Figma** : Maquette et design du site.
- **Git** : Gestion du code source.
- **Jsben.ch** : Outil de test de performance pour comparer les implémentations de l’algorithme.
