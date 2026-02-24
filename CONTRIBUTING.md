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

La branche est créée depuis l’Issue GitHub (bouton **"Create a branch"**) ou manuellement en local, en incluant le numéro du ticket dans le nom de la branche.

## 3️⃣ Développement

- Attribution du ticket et passage à l'état "En cours"

- Commits atomiques et explicites

- Nommage conventionnel : type/titre du ticket

```
Exemples :

git commit -m "Fix(auth): add first issue implementation  (#4)"
```


###  Versioning automatique – Conventional Commits

Nous utilisons le **Semantic Versioning** :
MAJOR.MINOR.PATCH

La version est mise à jour automatiquement en fonction des messages de commit lors du merge vers `main`.

### Format obligatoire des commits

```
type(scope): description courte
```

### Exemples :

```
feat(auth): ajout de l’authentification JWT (#4)
fix(api): correction d’un bug de validation (#4)
```

### Impact sur la version

| Type de commit | Impact |
|---------------|--------|
| `feat:` | ⬆ MINOR (ex: 1.4.2 → 1.5.0) |
| `fix:` | ⬆ PATCH (ex: 1.4.2 → 1.4.3) |
| `BREAKING CHANGE:` | ⬆ MAJOR (ex: 1.4.2 → 2.0.0) |
| autres (`docs`, `chore`, `refactor`, etc.) | pas de nouvelle version |



- Tests

## 4️⃣ Pull Request vers develop

- Ouverture d’une Pull Request vers **develop**
- Déplacement du ticket dans **"In Review"** / **"À valider"**
- Code review obligatoire
- Corrections si demandées

```
Exemples (description de PR) :

Implements authentication logic.

Closes #4
```

## 5️⃣ Merge dans develop

- Suppression de la branche feature
- L’issue peut être fermée automatiquement si la PR contient **Closes #X** (selon la branche cible et la configuration GitHub)
- Déplacement du ticket dans la colonne **"Done"** / **"Terminé"** (manuel ou automatique)


## 6️⃣ Release

- Création d’une branche **release/x.y.z**

- Tests finaux

- Merge dans main

- Tag de version

## 7️⃣ Production

- Déploiement depuis main

- Tag Git correspondant à la version
