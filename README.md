# Web UserMonitor - Arch Linux Edition 

[![Status](https://img.shields.io/badge/Status-En_Développement-orange.svg)]()
[![OS](https://img.shields.io/badge/OS-Arch_Linux-blue.svg?logo=arch-linux)]()

## Présentation du Projet
Ce projet est une solution d'ingénierie système pour le monitoring temps réel des utilisateurs sous **Arch Linux**. L'application permet de visualiser l'activité noyau (uptime, Load) et les sessions utilisateurs en temps réel via une interface moderne..

> **Problématique résolue :** Centralisation des métriques Kernel et monitoring en temp réel des utilisateurs.

---

## Fonctionnalités Principales
- **Tableau de Bord Temps Réel** : Visualisation des utilisateurs connectés/déconnectés.
- **Suivi d'Activité** : Monitoring des processus en cours pour chaque utilisateur connecté.

---

## Documentation & Livrables
Le projet est documenté étape par étape. Les documents de référence sont disponibles dans le dossier `/docs` :

| Livrable | Description | Format | Lien |
| :--- | :--- | :---: | :---: |
| **Cahier des Charges** | Objectifs, périmètre et besoins du projet | 📄 PDF | [Consulter](./docs/specifications/cahier_des_charges.pdf) |
| **Cahier d'Analyse** | Les objectifs du système et les contraintes fonctionnelles et non fonctionnelles | 📄 PDF | [Consulter](./docs/analyse/cahier_analyse.pdf) |
| **Cahier de Conception** | Architecture logique du système, l’organisation des composants et leurs interactions| 📄 PDF | [Consulter](./docs/conception/cahier_conception.pdf) |
| **Dossier de réalisation** | Guide technique et choix d'implémentation | 📄 PDF | [Consulter](./docs/realisation/dossier_realisation.pdf) |
---

## Stack Technique (Prévisionnelle)

- **Système cible** : Arch Linux
  
---

## Installation & Utilisation

### 1. Clonage du dépôt

```bash
git clone [https://github.com/OpenSecureFoundation/Linux-Web-User-Monitor.git](https://github.com/OpenSecureFoundation/Linux-Web-User-Monitor.git)
cd Linux-Web-User-Monitor
  ```  
# Configurer le Backend (Python + FastAPI)
# Configurer le Frontend (Node.js + Angular)
Le projet est divisé en deux modules autonomes. Suivez les instructions spécifiques dans chaque répertoire :

2.  **Backend (FastAPI) :** [Accéder au guide d'installation](./backend/README.md)
    * Configuration de l'environnement virtuel et privilèges `sudo`.
3.  **Frontend (Angular) :** [Accéder au guide d'installation](./frontend/README.md)
    * Configuration du frontend et  l'adresse IP de l'API.
