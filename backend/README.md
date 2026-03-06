# Backend : Kernel Interface & REST API

Ce module constitue le moteur de l'application **Linux System Monitor**. Il agit comme une interface de communication de bas niveau entre le **User-Space** et les structures de données du **Noyau Linux**.

## Guide d'Installation Rapide

###  Prérequis
* **Système d'exploitation :** Arch Linux (recommandé).
* **Langage :** Python 3.10 ou supérieur.
* **Permissions :** Accès `sudo` impératif pour la lecture des fichiers binaires système (`/var/run/utmp`) et l'exécution des appels système.

###  Déploiement étape par étape
```bash
# 1. Accéder au répertoire
cd backend

# 2. Initialisation de l'environnement virtuel
python -m venv venv
source venv/bin/activate

# 3. Installer les dépendances
pip install fastapi uvicorn

# 4. Lancement du serveur avec privilèges (0.0.0.0 pour l'accès externe)
sudo ./venv/bin/python -m uvicorn app.main:app --host 0.0.0.0 --port 8000