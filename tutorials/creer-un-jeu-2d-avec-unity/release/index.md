---
layout: tutorial
title: Préparer et déployer un exécutable de son jeu
date: 13/11/20

tutorial:
  name: Créer un jeu 2D avec Unity
  link: ../

links:
  summary: ../sommaire
  previous: ../menus
  next: ../conclusion
---

Le jeu est prêt. Maintenant nous devons le sortir de Unity : créer un exécutable que l'on peut partager ou mettre en ligne (et en vente). Cette partie sera courte, car c'est assez simple à faire avec Unity.

# "Build Settings", deuxième manche

Nous avons déjà vu cette fenêtre dans la partie sur les menus.

Réouvrez-la avec "File" -> "Build Settings".

Dans la liste de gauche, vous pouvez choisir une plateforme cible. Cela fera apparaître sur la droite une série de paramètres pour le déploiement.

[ ![platforms][platforms] ][platforms]

Une fois choisie, il suffit de cliquez sur "Build" ou "Build & Run".

Essayons d'exporter une version web :

1. Sélectionnez "Web Player" dans les "Platform"
2. Faites un "Build" du jeu
3. Unity devrait produire une page HTML prêt à l'emploi
4. Ouvrez-là et essayez votre jeu

Voici la première et plus simple façon de distribuer votre jeu. Il vous suffit d'héberger quelque part sur l'Internet les deux fichiers produits et de diffuser le lien.

[ ![The web version][web_result] ][web_result]

# "Player Settings"

Évidemment, une palanquée de paramètres est disponible pour l'export (la résultion, le nom, l'icône, etc). Pour les modifier il faut aller dans l'onglet "Player Settings" :

* "File" -> "Build Settings" -> "Player Settings"

Ou :

* "Edit" -> "Project Settings" -> "Player"

Ici par exemple nous modifions la résolution utilisée par le player web pour notre jeu en 1280 * 780 :

[ ![Player settings][player_settings] ][player_settings]

# Déployer sur PC (Windows, Mac et Linux)

Il n'y a pas grand chose à dire pour ces plateformes. En sélectionnant  "PC, Mac & Linux Standalone", vous pourrez ensuite préciser quelle plateforme vous visez réellement :

[ ![pc_target][pc_target] ][pc_target]

Et c'est a peu près tout. Unity fera un joli exécutable, pas mal non ?

# Bonus pour les utilisateurs Mac : déployer sur iOS

Déployer sur mobile est un _chouilla_ plus compliqué. Il vous faut au préalable avoir les outils officiels de développement (le SDK) pour la plateforme visée d'installés.

Cela veut aussi dire qu'il faudra Mac OS X pour déployer un jeu sur iOS.

Nous allons voir la procédure détaillée pour déployer un jeu iOS, elle est probablement très similaire pour Android.

Tout d'abord, sélectionnez "iOS" dans la fenêtre "Build Settings"

[ ![ios_build][ios_build] ][ios_build]

Allez dans les "Player settings" pour mettre à jour certains paramètres (version du SDK, icon, etc.).

<md-note>
_Astuce_ : Si vous voulez tester sur le simulateur, il y a une option un peu cachée. Dans les "Player Settings" pour iOS, cherchez le champ "SDK version". Choisissez la valeur "Simulator SDK":
<br/><br />
[ ![ios_simulator][ios_simulator_mini] ][ios_simulator]
<br />
</md-note>

Faite un nouveau "Build" du projet. Unity vous demandera de choisir une destination :

[ ![ios_build2][ios_build2] ][ios_build2]

Car en fait, Unity va générer un projet XCode :

[ ![ios_project_xcode][ios_project_xcode] ][ios_project_xcode]

Et voilà pourquoi il vous faut tous les outils de développement d'installés. Sans eux vous ne pourrez pas ouvrir, compiler et lancer le projet sur un terminal ou le simulateur iOS.

Ouvrez le fichier `.xcodeproj` avec Xcode. Heureusement il n'y a rien à faire à part lancer le projet :

[ ![ios_xcode][ios_xcode] ][ios_xcode]

Lancez le jeu, il devrait alors s'exécuter comme une application iOS normale dans le simulateur (ou sur votre terminal) :

[ ![ios_result][ios_result] ][ios_result]

Et ça marche !

Les sprites sont bien affichées, le jeu démarrer... mais c'est aussi injouable car nous ne gérons pas les contrôles tactiles (sauf le "tap" qui est livré avec les contrôles par défaut pour "Fire1").

La résolution et l'orientation ne sont pas bien gérées non plus.

Et selon votre jeu, vous découvrirez aussi que les performances sot peut-être très mauvaises.

C'est pour cela que viser le mobile n'est pas chose aisée, même avec Unity : il faut optimiser et bricoler finement son jeu pour tirer le meilleur parti des tablettes et smartphones.

# Changer la qualité selon la plateforme

Pour certaines assets, vous voudrez peut-être avoir une qualité différente selon la plateforme.

les images par exemple, peuvent êtres de moins bonne qualité sur mobile (mais gare au retina) tandis que la version PC aura la meilleure qualité possible.

[ ![texture_specific_quality][texture_specific_quality] ][texture_specific_quality]

Garez en tête que ce genre de décision et d’optimisations se font plutôt à la fin du développement.

# Prochaine étape ?

Et voilà. Vous y êtes arrivés. Le développement du jeu pour ce didacticiel est terminé.

Vous ne vous sentez probablement pas prêts à vous lancer dans votre propre jeu, mais vous l'êtes en réalité. Ce qu'il vous faut, c'est un peu de temps et d'investissement pour vous lancer.

Il ne vous reste plus qu'à lire les dernières étapes, le mot de la fin :).

[platforms]: ../../2d-game-unity/deployment/-img/platforms.png
[web_result]: ../../2d-game-unity/deployment/-img/web_result.png
[player_settings]: ../../2d-game-unity/deployment/-img/player_settings.png
[pc_target]: ../../2d-game-unity/deployment/-img/pc_target.png
[texture_specific_quality]: ../../2d-game-unity/deployment/-img/texture_specific_quality.png

[ios_build]: ../../2d-game-unity/deployment/-img/ios_build.png
[ios_build2]: ../../2d-game-unity/deployment/-img/ios_build_2.png
[ios_project_xcode]: ../../2d-game-unity/deployment/-img/ios_project_xcode.png
[ios_simulator]: ../../2d-game-unity/deployment/-img/ios_simulator.png
[ios_simulator_mini]: ../../2d-game-unity/deployment/-img/ios_simulator_mini.png
[ios_xcode]: ../../2d-game-unity/deployment/-img/ios_xcode.png
[ios_result]: ../../2d-game-unity/deployment/-img/ios_result.png
