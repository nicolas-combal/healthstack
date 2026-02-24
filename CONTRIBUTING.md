# 🌿 Branching Strategy – GitFlow (résumé rapide)

Nous utilisons **Git** avec le modèle **Gitflow**.

## Branches principales

- **main** → code en production (stable uniquement)

- **develop** → branche d’intégration des features

- **feature/\*** → nouvelles fonctionnalités (ex: feature/login)

- **release/\*** → préparation d’une version

- **hotfix/\*** → correction urgente en production

## Cycle simplifié
```
feature → develop → release → main
                     ↘ hotfix ↗
```

## Semantic Versioning

Nous suivons le **Semantic Versioning** :

**MAJOR.MINOR.PATCH**

**MAJOR** → changement cassant

**MINOR** → nouvelle feature compatible

**PATCH** → bugfix

Exemple : **1.4.2**

# 🔄 Workflow – Cycle de vie d’une feature

Voici le cycle standard d’un ticket :

## 1️⃣ Création du ticket

- Décrit le besoin

- Critères d’acceptation définis

- Estimation des story points

## 2️⃣ Création de la branche

La création de la branche se fait automatiquement à la création du ticket

## 3️⃣ Développement

- Attribution du ticket et passage à l'état "En cours"

- Commits atomiques et explicites

- Nommage conventionnel : type/titre du ticket

```
Exemples :

feature/US12345-login-page

fix/login-validation
```

- Tests

## 4️⃣ Pull Request vers develop

- Déplacement du ticket dans "A valider"

- Code review obligatoire

- Corrections si demandées

## 5️⃣ Merge dans develop

- Suppression de la branche feature

- Déplacement du ticket dans la colonne "Terminé"

## 6️⃣ Release

- Création d’une branche **release/x.y.z**

- Tests finaux

- Merge dans main

- Tag de version

## 7️⃣ Production

- Déploiement depuis main

- Tag Git correspondant à la version