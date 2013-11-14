---
layout: tutorial
title: Installer Unity et préparer un nouveau projet
author: Damien Matthieu
date: 13/11/13

tutorial:
  name: Créer un jeu 2D avec Unity
  link: ../

links:
  summary: ../sommaire
  previous: ../sommaire
  next: ../decor-et-arriere-plan
---

Dans ce premier chapitre nous aborderons la base : installer le logiciel, créer un nouveau projet et le préparer à la suite des événements. 

# Installation de l'environnement

On commence par le plus simple : télécharger et configurer Unity.

[ ![Unity][unity_logo_url] ][unity_logo_url]

## Installer Unity

Téléchargez la dernière version à partir du [site officiel][unity_download_link].

Exécutez le fichier téléchargé et tout devrait s'installer correctement.

## Choisir un éditeur de script

Unity est livré avec MonoDevelop (4.0.1 actuellement) pour l'écriture de code pour les scripts.

### Windows

Si vous êtes sur Windows, vous pouvez utiliser une alternative :

* [Visual Studio 2013 Desktop (C#)][vs_download_link] 

Encore une fois, téléchargez et installez, tout est prêt à l'emploi. Changez ensuite une préférence dans Unity pour que Visual Studio soit l'éditeur de scripts par défaut :

[ ![Préferences][unity_prefs_vs_url] ][unity_prefs_vs_url]

**Remarque : ** Il n'est pas possible de débugger gratuitement avec Visual Studio. Il faut faut un plugin (VSUnity) et une version au moins Pro de Visual Studio.

### Mac OS X

[MonoDevelop 4][md_link] est très similaire à [Xamarin Studio][xs_link]. Cela veut dire qu'il est aussi bien meilleur que ce vieux MonoDevelop 2 fourni avec les précédentes versions de Unity. Il est loin d'être parfait, mais c'est probablement la meilleure option à ce jour.

### Quel langage de script ?

Unity reconnaît trois langages pour les scripts : JavaScript (UnityScript), C# et Boo.

Nous vous recommandons d'utiliser le C#, c'est un langage puissant, fortement typé et moins sujet aux erreurs. Et ce tutoriel est rédigé en C#.

## "Je n'ai jamais touché à Unity"

Si vous venez juste d'installer le logiciel pour la première fois, il se peut que nous allions un peu vite sur certains points.

Même si dans un premier temps, l'interface semble envahissante et complexe, on s'habitude vite à ce logiciel un peu "clicodrome" il est vrai.

Voici d'autres ressources qui pourront vous aider à vous familiariser avec l'outil (EN) : 

- [Vidéos Unity officielles][unity_videos_link]: Très bien réalisées et très complètes, ces vidéos sont une ressource essentielle pour découvrir et apprendre Unity.

- [Unity Patterns][unitypatterns_link]: Un tout nouveau site qui parle de techniques plus ou moins avancées liées à Unity, comme les co-routines par exemple.

# La première scène

## Création d'un nouveau projet

Si vous êtres déjà dans l'éditeur, allez dans "File", et créez un nouveau projet. Sinon en ouvrant le logiciel vous serez déjà sur la bonne fenêtre.

N'importez aucun des paquets standard proposés, cela ne ferait que vous embrouiller. Vous pourrez toujours les ajouter par la suite.

[ ![Création d'un nouveau projet sur Unity][unity_create_project] ][unity_create_project]

Choisissez l'option **2D**. Comme avant, il est toujours possible de modifier ce paramètres plus tard mais le saisir maintenant à l'avantage de préparer la caméra.

Ne vous en faites pas trop pour le nom du jeu. Il est très facile à changer car il est défini par le dossier qui stocke le projet et il est possible de le définir plus proprement dans les options.

## Préparer le projet

Comme Damien l'explique dans un [autre article (EN)][dam_versionning_tutorial], si vous voulez utilisez un système de versionnement type Git ou SVN, il y a une petite manipulation à faire.

Plutôt que de tout réexpliquer nous vous invitons donc à jeter un œil sur cet article si le sujet vous concerne ;).

## Unity et disposition des onglets

Vous faite désormais face à une belle scène vide. Voici la disposition que vous utilisons pour travailler. Prenez un peu de temps pour adapter l'interface à vos besoins et à votre écran.

Il peut être par exemple intéressant d'avoir la fenêtre de jeu à côté de la console pour le debug.

[ ![Un projet vide pour le moment][unity_empty_project] ][unity_empty_project]

Avant d'attaquer la création de notre jeu, il nous reste une dernière étape.

Nous vous conseillons de créer dans l'onglet "Project" de Unity des dossiers comme suit pour ranger les différents éléments. Ces dossiers et fichiers sont en réalité stockés dans le dossier _Assets_ de votre projet. 

_Note :_ Le dossier "Assets" est un le dossier racine des projets Unity pour tout ce qui touche au contenu. Vous ne le voyez pas dans le logiciel, mais vous pouvez le voir dans votre explorateur de fichiers.

[ ![Dossiers][unity_folders] ][unity_folders]

Voici un exemple d'arborescence que nous utilisons dans nos projets à Pixelnest. Libre à vous de l'adapter à vos besoins.

## Assets du projet

Vous allez retrouver dans l'onglet "Project" différents types d'assets :

### Prefabs

Objets réutilisables (des ennemis, des projectiles, des bonus...).

On peut faire l'analogie entre les prefabs et les ``class`` des langages de programmation objet. Ici c'est une sorte de moule à partir duquel vous fabriquez des objets quasi identiques.

L'intérêt est de pouvoir stocker des paramètres pour un objet mais de ne le créer qu'à un moment précis de l'exécution.

### Scenes

Une scène est un écran dans le jeu, souvent un niveau ou un menu. Elles contiennent des paramètres et des objets qui leur sont propres.

Contrairement aux autres objets, les scènes sont créées via le menu "File".

Il faut les sauver régulièrement et manuellement. C'est une erreur typique que vous ferez souvent et, même si Unity vous demandera de sauvegarder avant de quitter, l'erreur classique est de faire un nouveau _commit_ sans avoir sauvegardé précédemment.

### Sounds

Tout simplement les sons et musiques de notre jeu.

### Scripts

Toute la partie code se retrouve ici.

### Textures

On entend par texture toutes les images et les sprites de notre jeu. Si vous ne faite que de la 2D, vous pouvez très bien l'appeler "Sprites", cela n'aura pas d'incidence.

En revanche en 3D cela permet l'automatisation par Unity de certaines tâches. [Plus d'informations](http://answers.unity3d.com/questions/172384/importing-models.html) or [this](http://docs.unity3d.com/Documentation/Components/class-Mesh.html).

## Notre première scène

L'onglet _Hierarchy_ contient tous ce qui présent dans la scène. C'est ce qu'il faut manipuler, préparer avant de lancer le jeu.

Chaque élément de la scène est un _game object_ pour Unity. Ces objets peuvent être imbriqués les uns sous les autres pour former une arborescence.

[ ![Objets pour le rangement][unity_logical_objects] ][unity_logical_objects]

Vous voyez ici que notre objet ``Level`` a trois objets en enfant.

### Objets vides

Une petite astuce pour rester organisé est d'utilisé des nouveaux objets vides comme des "dossiers" d'objets :

[ ![Empty objects][unity_create_empty] ][unity_create_empty]

**Vérifiez bien que leur position est ``(0, 0, 0)``. Ils n'utilisent pas cette information donc autant ne pas s'en servir. De plus, cela permet de les avoir tous à la même place.**

_Note_ : Changer la position d'un objet affectera tous ses enfants, ils sont liés. C'est le principe du graph de scène.

Ces objets vides peuvent être vu comme purement logiques et sans rapports avec le gameplay.

### Remplissage de la scène

Par défaut, une scène est créer avec une caméra``Main Camera``. Gardez-la, vous en aurez besoin !

Nous allons créer les objets vides suivants :

- ``Scripts``: tout ce qui est script et qui n'est pas lié à un objet précis sera attaché à cet objet. Par exemple, un script pour la gestion globale du jeu ou pour les sons
- ``Render``: Déplacez la caméra ici. Nous pourrions aussi y mettre la lumière.
- ``Level``

Dans l'objet ``Level``, ajoutez trois objets vides comme enfants : 

- ``0 - Background``
- ``1 - Middleground``
- ``2 - Foreground``

Cela constituera nos plans pour plus tard.

Sauvez la scène dans le dossier... "Scenes" ! Appelez-la comme vous le souhaitez (pourquoi pas "Stage1" ?).

Vous devriez avoir :

[ ![Première scène][unity_first_scene] ][unity_first_scene]

# Prochaine étape

Nous sommes toujours loin d'un jeu complet non ?

Mais nous avons maintenant une base propre pour la suite. Les choses sérieuses commencent ensuite, avec l'affichage du décor et de l'arrière-plan !

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

[unity_videos_link]: http://unity3d.com/learn/tutorials/modules/beginner/editor "Unity Editor Tutorials"
[unitypatterns_link]: http://unitypatterns.com/ "Unity Patterns"

[dam_versionning_tutorial]: http://dmayance.com/git-and-unity-projects/
