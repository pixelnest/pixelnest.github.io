---
layout: tutorial
title: Installer Unity et préparer un nouveau projet
date: 13/11/20

show_promotion: steredenn

tutorial:
  name: Créer un jeu 2D avec Unity
  link: ../

links:
  summary: ../sommaire
  previous: ../sommaire
  next: ../arriere-plan-et-camera
---

Dans ce premier chapitre, nous aborderons les fondamentaux du logiciel : installation de celui-ci, création d'un nouveau projet et préparation à la suite du programme.

# Installation de l'environnement

Commençons par le plus simple : télécharger et configurer Unity.

[ ![Unity][unity_logo_url] ][unity_logo_url]

## Installer Unity

Téléchargez la dernière version à partir du [site officiel][unity_download_link].

Exécutez le fichier téléchargé et tout devrait s'installer correctement.

## Choisir un éditeur de script

Unity est livré avec MonoDevelop (4.0.1 actuellement) pour l'écriture du code des scripts.

### Windows

Si vous êtes sur Windows, vous pouvez utiliser une alternative :

* [Visual Studio 2013 Desktop (C#)][vs_download_link]

Encore une fois, téléchargez et installez : tout est prêt à l'emploi. Changez ensuite les préférences de Unity pour que Visual Studio soit l'éditeur de scripts par défaut :

[ ![Préferences][unity_prefs_vs_url] ][unity_prefs_vs_url]

<div data-block="warning">
_A savoir_ : Il n'est pas possible de déboguer un projet Unity simplement avec Visual Studio 2013 Express. Il faut pour cela avoir au moins une version pro de Visual Studio et acheter le plugin [UnityVS][unityvs_link]. Vous aurez donc un meilleur éditeur pour le code mais l’absence de fonctionnalités de deboguage peut être critique dans certains cas.
</div>

### Mac OS X

[MonoDevelop 4][md_link] est très similaire à [Xamarin Studio][xs_link]. Cela veut dire qu'il est bien meilleur que ce vieux MonoDevelop 2 fourni avec les précédentes versions de Unity. C'est loin d'être parfait, mais c'est probablement la meilleure option à ce jour si vous êtes sur OS X.

### Quel langage de script ?

Unity permet l'utilisation de trois langages pour les scripts : JavaScript (UnityScript), C# et Boo.

Nous vous conseillons d'utiliser le C#. En effet, c'est un langage puissant, fortement typé et moins sujet aux erreurs. Et c'est dans ce langage que sont écrits les scripts de ce tutoriel.

## "Je n'ai jamais touché à Unity"

Si vous n'avez encore jamais utilisé Unity auparavant, nous allons faire de notre mieux pour vous expliquer le logiciel tout au long de ce tutoriel.

Apprendre à utiliser l'interface principale de Unity est relativement simple. Dans un premier temps, _le logiciel pourra vous sembler envahissant et complexe_, mais ce n'est que l'histoire de quelques heures avant d'être à l'aise avec (le côté "clicodrome" peut être très rédhibitoire, il est vrai).

Voici d'autres ressources qui pourront vous aider à vous familiariser avec l'outil (en anglais) :

- [Vidéos Unity officielles][unity_videos_link]: Très bien réalisées et très complètes, ces vidéos sont une ressource essentielle pour découvrir et apprendre Unity.

# La première scène

## Création d'un nouveau projet

Si vous êtes déjà dans l'éditeur, allez dans "File", et créez un nouveau projet. Sinon en ouvrant le logiciel vous serez déjà sur la bonne fenêtre.

N'importez aucun des paquets standards proposés, cela ne ferait que vous embrouiller. Vous pourrez toujours les ajouter par la suite.

[ ![Création d'un nouveau projet sur Unity][unity_create_project] ][unity_create_project]

Choisissez l'option **2D**. Comme avant, il est toujours possible de modifier ce paramètres plus tard mais le saisir maintenant à l'avantage de préparer la caméra et certains comportements automatiques.

Ne vous en faites pas trop pour le nom du jeu/du projet. Il est très facile d'en changer :

- Le nom de projet est défini par le dossier où sont stockés les fichiers.
- Le nom du jeu est défini dans les options.

## Préparer le projet

Comme Damien l'explique dans un [autre article (EN)][dam_versionning_tutorial], si vous voulez utiliser un système de versionnement (comme Git ou SVN — _et vous devriez en utiliser un_), il y a une rapide manipulation à faire dès le début du projet.

Plutôt que de tout réexpliquer, nous vous invitons donc à jeter un œil sur cet article si le sujet vous concerne. ;)

## Unity et disposition des onglets

Vous devriez désormais faire face à une belle scène vide. Voici la disposition que nous utilisons pour travailler:

[ ![Un projet vide pour le moment][unity_empty_project] ][unity_empty_project]

Prenez un peu de temps pour adapter l'interface à vos besoins et à votre écran. Il peut être par exemple intéressant d'avoir la fenêtre de jeu à côté de la console pour le deboguage.

Nous vous conseillons de créer dans l'onglet "Project" de Unity des dossiers pour ranger vos différents objets et éléments. Ces dossiers et fichiers sont en réalité stockés dans le dossier _Assets_ de votre projet.

<div data-block="note">
_Note :_ Le dossier "Assets" est le dossier racine des projets Unity pour tout ce qui touche aux contenus. Vous ne le voyez _peut-être_ pas dans le logiciel — selon la disposition utilisée dans l'onglet "Projects" ("One-column" ou "Two-columns") —, mais vous pouvez le voir dans tous les cas dans votre explorateur de fichiers.
</div>

[ ![Dossiers][unity_folders] ][unity_folders]

Voici un exemple d'arborescence que nous utilisons dans nos projets à Pixelnest. Libre à vous de l'adapter à vos besoins.

## Assets du projet

Vous allez retrouver dans l'onglet "Project" différents types d'assets :

### Prefabs

Objets réutilisables (des ennemis, des projectiles, des bonus, etc.).

Nous pouvons faire l'analogie entre les prefabs et les `class` des langages de programmation objet. Ici, c'est une sorte de moule à partir duquel vous fabriquez des objets quasi-identiques. L'intérêt est de pouvoir stocker des paramètres pour un objet mais de ne le créer qu'à un moment précis de l'exécution du programme.

### Scenes

Une scène est un écran dans le jeu, comme un niveau ou un menu. Elles contiennent des paramètres et des objets qui leurs sont propres.

Contrairement aux autres objets dans Unity, les scènes sont créées via le menu "File".

Il faut également les sauver régulièrement et **manuellement**. C'est une erreur typique que vous ferez souvent et, même si Unity vous demandera de sauvegarder avant de quitter, il vous arrivera fréquemment de faire un nouveau _commit_ sans avoir enregistré cette scène auparavant.

### Sounds

Tout simplement : les sons et musiques de notre jeu.

### Scripts

Un script est une unité de code qui sera exécutée par Unity. Nous utilisons ce dossier pour conserver nos scripts dans un seul endroit.

### Textures

On désigne par "Texture" toutes les images et les _sprites_ de notre jeu. Si vous ne faites que de la 2D, vous pouvez très bien l'appeler "Sprites", cela n'aura aucune incidence.

En revanche, et en 3D, cela permet l'automatisation par Unity de certaines tâches. [Plus d'informations ici (EN)](http://answers.unity3d.com/questions/172384/importing-models.html) ou [ici (EN)](http://docs.unity3d.com/Documentation/Components/class-Mesh.html).

<div data-block="note">
_Dossier Resources_ : Si vous avez déjà utilisé Unity, vous connaissez peut-être le dossier `Resources`. Ce dernier est spécial : il permet de charger un fichier ou un objet qui se trouve à l'intérieur à partir d'un script (en utilisant la classe statique `Resources`).
<br>Comme nous ne l'utiliserons pas avant la fin du projet (chapitre sur les menus), nous avons préféré ne pas le créer pour le moment pour simplifier la structure du jeu.
</div>

## Notre première scène

L'onglet "Hierarchy" contient tout ce qui est présent dans la scène qui est actuellement ouverte (Double-clic sur une scène dans "Projet" pour ouvrir celle-ci). C'est ce que nous pouvons manipuler et préparer avant de lancer le jeu.

Chaque élément de la scène est un _game object_ pour Unity. Ces objets peuvent être imbriqués les uns dans les autres pour former une arborescence.

[ ![Objets pour le rangement][unity_logical_objects] ][unity_logical_objects]

Vous voyez ici que notre objet `Level` a trois objets en enfants.

### Objets vides

Une petite astuce pour rester organisé est d'utiliser des nouveaux objets vides en tant que "dossiers" d'objets :

[ ![Empty objects][unity_create_empty] ][unity_create_empty]

**Vérifiez bien que la position de chacun de ces "objet-dossiers" est `(0, 0, 0)`. Puisque qu'ils n'utilisent pas cette information, autant ne pas s'en servir. De plus, cela permet de les avoir tous à la même place dans la scène.**

<div data-block="note">
_Note_ : Changer la position d'un objet affectera tous ses enfants car ceux-ci sont liés. C'est le principe du "graphe de scène".
</div>

Ces objets vides peuvent être vus comme purement logique et sans rapport avec le _gameplay_.

### Remplissage de la scène

Par défaut, une scène est créée avec une caméra appelée `Main Camera`. Gardez-la, vous en aurez besoin !

Nous allons créer les objets vides suivants :

- `Scripts` : Tous les scripts qui ne sont pas liés à un objet précis seront attachés à cet objet. Par exemple, un script pour la gestion globale du jeu ou pour les sons.
- `Render` : Déplacez la caméra ici. Nous pourrions également mettre les lumières ici.
- `Level`

Dans l'objet `Level`, ajoutez trois objets vides comme enfants :

- `0 - Background`
- `1 - Middleground`
- `2 - Foreground`

Cela constituera nos plans d'affichage pour plus tard.

Sauvez la scène dans le dossier… "Scenes" ! Appelez-la comme vous le souhaitez (pourquoi pas "Stage1" ?).

Vous devriez avoir :

[ ![Première scène][unity_first_scene] ][unity_first_scene]

<div data-block="tip">
_Astuce_ : Par défaut, un "game object" est lié à la position de ses parents.<br>Donc si le parent se déplace, tourne ou change de taille, tous ses enfant subiront également ces transformations proportionnellement à leurs propres propriétés.
</div>

# Prochaine étape

Nous sommes toujours loin d'un jeu complet, non ?

Mais nous avons maintenant une base propre pour la suite. Les choses sérieuses commencent dans le prochain chapitre, avec l'affichage du décor et de l'arrière-plan !


[unity_logo_url]: ../../2d-game-unity/install-and-scene/-img/unity.png
[unity_create_project]: ../../2d-game-unity/install-and-scene/-img/create_project.png
[unity_empty_project]: ../../2d-game-unity/install-and-scene/-img/empty_project.png
[unity_folders]: ../../2d-game-unity/install-and-scene/-img/folders.png
[unity_logical_objects]: ../../2d-game-unity/install-and-scene/-img/logical_objects.png
[unity_prefs_vs_url]: ../../2d-game-unity/install-and-scene/-img/unity_vs2013.png
[unity_create_empty]: ../../2d-game-unity/install-and-scene/-img/unity_create_empty.png
[unity_first_scene]: ../../2d-game-unity/install-and-scene/-img/first_scene.png

[unity_download_link]: http://unity3d.com/unity/download "Download Unity"
[vs_download_link]: http://www.microsoft.com/visualstudio/eng/downloads#d-2013-express "Download Visual Studio"
[md_link]: http://monodevelop.com/ "MonoDevelop"
[xs_link]: http://xamarin.com/studio "Xamarin Studio"
[unityvs_link]: http://unityvs.com/

[unity_videos_link]: http://unity3d.com/learn/tutorials/modules/beginner/editor "Unity Editor Tutorials"

[dam_versionning_tutorial]: http://dmayance.com/git-and-unity-projects/
