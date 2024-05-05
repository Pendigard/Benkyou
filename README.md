# Benkyou

## Description

Benkyou est un site web qui permet de réviser des notions de japonais.

## Installation

1. Cloner le projet
2. Lancer un serveur web (ex: avec l'extension Live Server de Visual Studio Code)

## Modification

Pour l'instant les générateurs de questions de vocabulaire et de terminaison de verbes sont implémentés.

### Ajouter une notion

Pour ajouter une notion, ajouter un bouton dans le fichier `[notion].html` redirigeant vers le fichier `pages/generateur_[notion].html?type=[type de la notion]`. Par exemple, pour ajouter des questions sur le vocabulaire des transports, ajouter un bouton dans `vocabulaire.html` redirigeant vers `vocabulaire/generateur_voc.html?type=transport`. Ensuite créer un fichier `transport.js` dans le dossier `script/vocabulaire` et créer les objets de questions réponse (voir `script/vocabulaire/localisation.js` pour un exemple).
Le processus est similaire pour les terminaisons de verbes. (voir `script/conjugaison/terminaison/te.js` pour un exemple).

## Auteur

- Célian VASSON

