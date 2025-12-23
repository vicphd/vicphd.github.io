---
id: ecg-rld-system-design
title: Analyse de l'implémentation du Right Leg Drive en électrocardiographie
date: 2025-12-18
description: Une exploration technique sur l'élimination du bruit de mode commun via une boucle de rétroaction active pour les systèmes d'acquisition ECG.
---

# Analyse de l'implémentation du Right Leg Drive en électrocardiographie

Dans le domaine de l'acquisition de signaux bio-électriques, le défi majeur réside systématiquement dans le rapport signal sur bruit. Le signal cardiaque, dont l'amplitude dépasse rarement quelques millivolts, est constamment submergé par des interférences environnementales, principalement le bruit de mode commun issu du réseau électrique (50 Hz ou 60 Hz).

### La problématique du mode commun

Le corps humain agit comme une antenne captant les champs électromagnétiques environnants. Cette tension de mode commun, que l'on peut noter $V_{cm}$, est présente de manière quasi identique sur tous les points du derme. 

L'utilisation d'un amplificateur d'instrumentation est une première étape cruciale. Son rôle est d'extraire la différence de potentiel entre deux électrodes tout en ignorant ce qui leur est commun. L'équation simplifiée en sortie de l'amplificateur est la suivante :

$$V_{out} = G \cdot (V_+ - V_-) + \frac{V_{cm}}{CMRR}$$

Ici, $G$ représente le gain et $CMRR$ le taux de réjection du mode commun. Bien que les amplificateurs modernes possèdent des $CMRR$ élevés, les déséquilibres d'impédance au niveau des contacts peau-électrode transforment une partie du mode commun en signal différentiel, rendant le tracé illisible.



### Le concept du Right Leg Drive (RLD)

Pour pallier cette limite, on utilise une boucle de rétroaction active nommée Right Leg Drive. L'idée n'est plus seulement de rejeter le bruit au niveau de l'amplificateur, mais de réduire activement la tension de mode commun présente sur le corps du patient.

Le circuit RLD fonctionne en collectant le signal de mode commun via des résistances de sommation connectées aux entrées de mesure. Ce signal est ensuite envoyé vers un amplificateur inverseur. La tension résultante $V_{RLD}$ est injectée à nouveau vers le corps, généralement par une électrode placée sur la jambe droite. 

La tension de mode commun finale est alors définie par :

$$V_{cm\_final} = \frac{V_{cm}}{1 + A_{loop}}$$

Où $A_{loop}$ est le gain de la boucle de rétroaction. En injectant un signal en opposition de phase, on annule mathématiquement une grande partie de l'interférence avant même qu'elle n'atteigne l'étage d'entrée.



### Contraintes d'implémentation sur un système à deux voies

Une question revient souvent lors de la conception de prototypes simplifiés : peut-on implémenter un RLD avec seulement deux électrodes ? La réponse courte est négative pour des raisons de physique des circuits.

Une électrode ne peut pas remplir simultanément deux fonctions opposées. Dans un système de mesure classique (type Lead II), les électrodes sur le bras droit (RA) et la jambe gauche (LL) servent à capturer le dipôle électrique du cœur. Si l'on tentait d'injecter le signal de correction RLD sur l'une de ces mêmes électrodes, on créerait une boucle locale qui corromprait la mesure différentielle.

Pour qu'un système RLD soit efficace, il nécessite impérativement une troisième électrode dédiée à l'injection du courant de compensation :

* L'électrode RA et l'électrode LL servent d'entrées pour l'amplificateur d'instrumentation.
* Une troisième électrode, idéalement placée sur la jambe droite (RL), sert de point d'injection pour la sortie du circuit RLD.

Cette configuration permet de maintenir une impédance de référence basse pour le corps tout en maximisant la réjection du bruit. Il est à noter que pour des raisons de sécurité électrique, cette boucle doit inclure des résistances de limitation de courant afin de garantir que le courant injecté reste bien en dessous des seuils de micro-chocs définis par les normes médicales en vigueur.