---
id: modelisation-electro-aerospray
title: Modélisation multiphysique de l'électro-aérospray : de la théorie à la production de patchs
date: 2025-12-19
description: Une synthèse technique sur la modélisation des écoulements diphasiques appliqués à l'encapsulation de principes actifs pour le traitement des allergies.
---

# Électro-aérospray : Modélisation des écoulements et fragmentation capillaire

Ces dernières années chez DBV Technologies, on s'est rendu compte que l'électrospray classique atteignait ses limites dès que la conductivité $\sigma$ du liquide augmentait. Pour les patchs Viaskin Milk, il a fallu passer à l'électro-aérospray (EAS). L'idée derrière cette technique, c'est de coupler un champ électrique $\vec{E}$ avec une assistance pneumatique $\Delta P_g$ pour stabiliser le ménisque. C'est un problème de mécanique des fluides diphasique assez élégant, mais techniquement complexe à modéliser car il faut capturer des échelles allant du millimètre au micron.

## La physique du cône et l'interface diffuse

Pour le cône de liquide en sortie de buse, l'approche par champ de phase (Phase Field) s'est imposée. On résout les équations de Navier-Stokes pour l'incompressibilité :

$$\nabla \cdot \vec{u} = 0$$
$$\rho\frac{\partial\vec{u}}{\partial t}+\rho(\vec{u}\cdot\nabla)\vec{u}=\nabla\cdot[-p\vec{I}+\mu(\nabla\vec{u}+\nabla\vec{u}^{T})]+\vec{F}_{st}$$

Le terme de tension de surface $\vec{F}_{st}$ est couplé à l'équation de Cahn-Hilliard qui gère l'interface diffuse via une fonctionnelle $\phi$ :

$$\frac{\partial\phi}{\partial t}+\vec{u}\cdot\nabla\phi=\chi\epsilon^{2}\lambda\nabla^{2}[-\nabla^{2}\phi+\frac{\phi(\phi^{2}-1)}{\epsilon^{2}}]$$

Dans le régime stationnaire dynamique (SD), on observe une cellule de recirculation dont la taille adimensionnée $s_{R}$ suit une loi quasiment linéaire avec le débit : $s_{R} \sim 1 - \frac{Q_{l}}{Q_{r}}$. C'est un point critique pour la stabilité. Si on baisse trop le débit, on tombe dans le régime transitoire (T). On a alors un comportement en paliers pour la période d'oscillation $\tau$. Ces sauts de période correspondent au nombre d'oscillations capillaires $n_{o}$ que le ménisque effectue avant d'éjecter un jet. On a pu fitter ce comportement avec une loi du type $n_{o} = A[(\frac{B}{Re_{l}})^{\alpha}-C]$. C'est fascinant de voir comment la viscosité $\mu_{l}$ vient amortir ces tremblements microscopiques.

## Fragmentation du jet et analyse de stabilité

Une fois le jet formé, la question est de savoir comment il se rompt. J'ai utilisé une méthode ALE (Arbitrary Lagrangian-Eulerian) pour suivre précisément la surface. L'objectif était de voir l'influence de la contrainte électrique additionnelle sur la loi de Rayleigh. Pour un jet électrisé en mode variqueux ($m=0$), l'équation de dispersion est modifiée par un terme électrique $\Gamma$ :

$$\left(\frac{\omega}{\omega_0}\right)^2 = \frac{kr_j[1 - k^2r_j^2]I_1(kr_j)}{I_0(kr_j)} - kr_j\Gamma \left[1 - \frac{kr_jK_1(kr_j)}{K_0(kr_j)}\right]$$

Malgré cette complexité mathématique, les simulations montrent que pour les pressions utilisées en industrie ($\Delta P_g < 0.5$ bar), on reste très proche de la limite de Rayleigh où le diamètre des gouttes $d_g$ est lié au diamètre du jet $d_j$ par :

$$d_g \simeq 1.89 d_j$$

On a pu tester l'influence du potentiel $\Delta V$ sur cette rupture. En réalité, l'électricité dans l'EAS sert surtout à guider les gouttes et à éviter leur coalescence par répulsion coulombienne plutôt qu'à modifier radicalement le diamètre de fragmentation primaire. C'est une nuance importante.

## Optimisation industrielle

Si on veut sortir de la théorie pour aller vers la machine de production, les préconisations sont assez claires. Il faut viser le régime stationnaire pour garantir une homogénéité du dépôt. Cela implique un débit $Q_l$ compris entre 5 et 7 ml/h pour une buse de 200 $\mu m$. Si on descend à 3 ml/h, on pulse, et le dépôt devient hétérogène. 

Le ratio géométrique $\psi = \frac{H}{D_o}$ doit rester supérieur à 0.25 pour éviter le régime de "flow blurring" qui, bien que produisant des gouttes très fines, est beaucoup trop instable et turbulent pour un dosage pharmaceutique précis. Bref, l'électro-aérospray est une superbe solution hybride, à condition de bien calibrer son nombre de Weber gazeux $We_g$ pour ne pas arracher le jet prématurément.