---
id: biosignals-impedance-analysis
title: Acquisition de signaux respiratoires ; Magnitude, Phase et saturation dynamique
date: 2025-12-18
description: Une analyse technique sur la mesure de la respiration par bio-impédance, focalisée sur la gestion de la dynamique en présence de fortes résistances de protection.
---

# Acquisition de signaux respiratoires : Magnitude, Phase et saturation dynamique

### Introduction : Le principe physique
La mesure de la respiration par impédancemétrie repose sur l'injection d'un courant alternatif haute fréquence dans le thorax, généralement entre 45 kHz et 64 kHz. L'expansion pulmonaire modifie la résistivité globale du milieu. Ce phénomène crée une modulation d'amplitude (AM) dont l'enveloppe porte l'information physiologique. C'est un signal délicat à extraire, car la variation utile est souvent minime par rapport à l'impédance de base.

### Magnitude et Phase : Une approche vectorielle
Après démodulation numérique, le signal est traité comme un vecteur complexe. On en extrait deux composantes essentielles :

* **La Magnitude (|Z|)** : C'est l'image de l'impédance totale du trajet électrique. Elle regroupe la résistance statique des câbles, l'interface peau-électrode et la variation dynamique liée au cycle respiratoire. Techniquement, elle représente la taille du vecteur.
* **La Phase ($\theta$)** : Elle traduit le déphasage entre le courant injecté et la tension mesurée. Puisque les tissus et les câbles ont une composante capacitive, cette donnée est fondamentale. Elle permet notamment de distinguer une vraie respiration d'un artéfact de mouvement, car un déplacement de câble modifie la réactance de façon beaucoup plus brutale qu'un cycle pulmonaire.



### L'impact des résistances de protection
L'intégration de circuits de protection contre la défibrillation (ESIS ou RFI) est une contrainte majeure pour l'électronique d'acquisition. Ces filtres ajoutent des résistances série importantes. 

Si l'on prend l'exemple d'une configuration avec 5,7 kΩ par canal, l'impédance de boucle statique monte à 11,4 kΩ. Cette valeur socle écrase la profondeur de modulation. La variation respiratoire (souvent entre 0,2 $\Omega$ et 1 $\Omega$) devient un minuscule signal alternatif flottant sur une composante continue massive.

### Le casse-tête du gain et de la saturation
Le réglage du gain de l'amplificateur est le point le plus critique. Si l'on applique un gain trop fort sur un signal chargé d'une telle composante continue, l'entrée du convertisseur (ADC) sature instantanément. 

Prenons un courant d'excitation réglé au maximum, par exemple via le paramètre **RESPAMP** à 64 µA p-p, sur notre charge de 11,4 kΩ :
1. **Tension d'entrée brute** : $V = I \times R \approx 0,73 V$.
2. **Limite de saturation selon le gain** : $V_{max} \approx 1,8 V / \text{Gain}$.

Analyse des réglages du paramètre **RESPGAIN** :
* **Avec un Gain de 2** : La limite de saturation est à 0,9 V. Comme notre signal est à 0,73 V, on garde une marge de manœuvre (headroom) correcte tout en optimisant la résolution.
* **Avec un Gain de 3** : La limite tombe à 0,6 V. Ici, le signal de 0,73 V dépasse la plage d'entrée. L'étage sature, le signal est écrêté et l'information respiratoire est perdue.



### Conclusion technique
En présence de fortes résistances de protection, la détection de la respiration est un exercice d'équilibre. La stratégie la plus efficace consiste à utiliser un courant d'excitation élevé pour maximiser le rapport signal sur bruit, tout en limitant le gain de tension (**RESPGAIN** à 1 ou 2) pour ne pas sortir de la plage linéaire du convertisseur. C'est le seul moyen de conserver une résolution sub-ohmique sans sacrifier la stabilité du signal.