---
id: docker-ollama-agents
title: Premiers pas avec Ollama et des agents Docker
date: 2025-01-02
description: Retour d’expérience sur la mise en place d’un premier agent LLM local avec Docker et Ollama
---

# Premiers pas avec Ollama et des agents Docker

Mon petit homeserver a 8 Go de RAM et j’avais Portainer déjà installé. Je voulais juste faire tourner un modèle local et interagir avec lui depuis un conteneur.

J’ai commencé par créer un stack dans Portainer avec l’image officielle Ollama depuis Docker Hub. J’ai exposé le port 11434 et ajouté un volume pour stocker les modèles. Quand j’ouvre `http://monserveur:11434`, le message "Ollama is running" apparaît, simple mais suffisant.

Ensuite j’ai lancé dans la console du conteneur :

```bash
ollama pull llama3.2:3b
```

Une fois téléchargé, le modèle est stocké dans le volume. J’ai testé directement avec :

```bash
ollama run llama3.2:3b
```

Le modèle répond, un peu lent sur CPU mais fonctionnel.

Pour l’API, j’ai envoyé un simple appel HTTP et j’ai reçu une réponse JSON. C’était clair que le modèle était chargé et prêt à servir pour les agents.

J’ai ensuite créé un agent minimal en Python. Le script envoie un prompt à Ollama, affiche la réponse, puis s’arrête. Pas de framework, juste `requests`.

Le script est packagé dans une image Docker basée sur `python:3.11-slim`. J’ai remplacé le conteneur agent du stack par cette image, redéployé et vérifié les logs. La réponse apparaît correctement.

Avec ce setup, j’ai vu que 8 Go suffisent, qu’un modèle partagé est la bonne approche et qu’Ollama simplifie beaucoup le travail. Ce n’est pas rapide ni hyper intelligent, mais ça fonctionne, c’est stable et compréhensible.

La suite logique serait de donner des rôles aux agents, leur faire lire des fichiers et lancer plusieurs agents qui utilisent le même Ollama. Pour l’instant, avoir un LLM local qui répond reste déjà une petite victoire.
