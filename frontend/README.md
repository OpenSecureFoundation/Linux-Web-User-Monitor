# Monitor-UI (Frontend)

Interface d'administration temps réel développée en Angular.

##  Guide d'Installation Rapide

###  Prérequis
* **Node.js :** v22.21.1
* **Angular CLI :** v19.0.7

###  Déploiement étape par étape
```bash
# 1. Accéder au répertoire
cd frontend
Installer Angular CLI (si besoin) : `npm install -g @angular/cli`

# 2. Installer les dépendances
npm install

# 3. Configuration de l'IP API (src/environments/environment.ts)
# Modifier l'ip actuel par l'IP de la VM Arch Linux dans le fichier.

# 4. Lancement du serveur (Host 0.0.0.0 pour accès Windows)
ng serve --host 0.0.0.0(Accessible sur http://localhost:4200)


