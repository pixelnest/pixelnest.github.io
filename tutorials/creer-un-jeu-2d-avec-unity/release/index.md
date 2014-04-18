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

Le jeu est prêt. Maintenant, il est temps de le faire fonctionner en dehors de Unity. Nous allons créer un exécutable que l'on peut partager ou mettre en ligne (et en vente). Cette partie sera courte, car c'est assez simple à faire avec Unity.

# "Build Settings", deuxième manche

Nous avons déjà vu cette fenêtre dans la partie sur les menus.

Réouvrez-la avec "File" -> "Build Settings".

Dans la liste de gauche, vous pouvez choisir une plateforme cible. Cela fera apparaître sur la droite une série de paramètres pour le déploiement.

[ ![platforms][platforms] ][platforms]

Une fois la configuration terminée, il suffit de cliquez sur "Build" ou "Build & Run".

Essayons d'abord d'exporter une version web de notre jeu :

1. Sélectionnez "Web Player" dans les "Platform".
2. Faites un "Build" du jeu.
3. Unity devrait produire une page HTML prête à l'emploi.
4. Ouvrez-la et essayez le jeu.

Voici la première (et la plus simple) façon de distribuer votre jeu. Il vous suffit d'héberger les deux fichiers produits sur Internet, puis de diffuser le lien.

[ ![The web version][web_result] ][web_result]

# "Player Settings"

Évidemment, une palanquée de paramètres est disponible pour l'export (la résolution, le nom, l'icône, etc). Pour les modifier, il faut aller dans l'onglet "Player Settings" :

* "File" -> "Build Settings" -> "Player Settings"

Ou :

* "Edit" -> "Project Settings" -> "Player"

Ici, par exemple, nous modifions la résolution utilisée par le _web player_ pour notre jeu en `1280 * 780` :

[ ![Player settings][player_settings] ][player_settings]

# Déployer sur PC (Windows, Mac et Linux)

Il n'y a pas grand chose à dire pour ces plateformes. En sélectionnant  "PC, Mac & Linux Standalone", vous pourrez ensuite préciser quelles plateformes vous visez réellement :

[ ![pc_target][pc_target] ][pc_target]

Et c'est a peu près tout. Unity fera un chouette exécutable, pas mal non ?

# Bonus pour les utilisateurs Mac : déployer sur iOS

Déployer sur mobile est un _chouilla_ plus compliqué. Il vous faut au préalable installer les outils officiels de développement (le SDK) pour la plateforme visée.

Cela veut aussi dire qu'il faudra un Mac avec OS X pour déployer un jeu sur iOS.

Nous allons voir la procédure détaillée pour déployer un jeu iOS. Elle doit être probablement très similaire pour Android.

Tout d'abord, sélectionnez "iOS" dans la fenêtre "Build Settings" :

[ ![ios_build][ios_build] ][ios_build]

Puis allez dans les "Player Settings" pour mettre à jour certains paramètres (version du SDK, icône, etc.).

<md-note>
_Astuce_ : Si vous voulez tester sur le simulateur, il y a une option un peu cachée. Dans les "Player Settings" pour iOS, cherchez le champ "SDK version". Indiquez la valeur "Simulator SDK":
<br/><br />
[ ![ios_simulator][ios_simulator_mini] ][ios_simulator]
<br />
</md-note>

Lancez un nouveau "Build" du projet. Unity vous demandera de choisir une destination :

[ ![ios_build2][ios_build2] ][ios_build2]

En réalité, Unity va générer un projet XCode :

[ ![ios_project_xcode][ios_project_xcode] ][ios_project_xcode]

C'est notamment la raison pour laquelle vous devez avoir tous les outils de développement installés. Sans eux vous ne pourrez pas ouvrir, compiler et lancer le projet sur un terminal ou le simulateur iOS.

Ouvrez le fichier `.xcodeproj` avec XCode. Ne vous inquiétez pas, il n'y a rien à faire à part lancer le projet :

[ ![ios_xcode][ios_xcode] ][ios_xcode]

Cliquez sur le bouton "Run". Le jeu devrait alors s'exécuter comme une application iOS normale dans le simulateur (ou sur votre terminal iOS) :

[ ![ios_result][ios_result] ][ios_result]

Et… ça marche !

Les _sprites_ sont bien affichés et le jeu s'exécute normalement... mais c'est aussi injouable, car nous ne gérons pas les contrôles tactiles (sauf le "Tap" — une pression du doigt — qui est configuré avec les contrôles par défaut pour "Fire1").

La résolution et l'orientation ne sont pas bien gérées non plus. Selon votre jeu, vous découvrirez peut-être aussi que les performances sont terriblement mauvaises.

C'est pour cela que viser le mobile n'est pas chose aisée, même avec Unity : il faut optimiser et bricoler finement son jeu pour tirer le meilleur parti des tablettes et smartphones.

# Changer la qualité selon la plateforme

Pour certains _assets_, vous désirerez peut-être avoir une qualité différente en fonction des plateformes.

les images, par exemple, peuvent être de moins bonne qualité sur mobile (attention au retina néanmois) tandis que la version PC aura la meilleure qualité possible.

[ ![texture_specific_quality][texture_specific_quality] ][texture_specific_quality]

Gardez en tête que ce genre de décisions et d’optimisations se font plutôt à la fin du développement, si nécessaire. Ne commencez pas par optimiser pour vous rendre compte plus tard que ce n'était pas important.

# Prochaine étape ?

Et voilà. Vous y êtes arrivés. Le développement du jeu avec ce didacticiel est terminé.

Vous ne vous sentez probablement pas prêts à vous lancer dans votre propre jeu, mais vous l'êtes en réalité. Ce qu'il vous faut, c'est un peu de temps et d'investissement pour vous lancer.

Il ne vous reste plus qu'à lire le petit mot de la fin. :)


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
