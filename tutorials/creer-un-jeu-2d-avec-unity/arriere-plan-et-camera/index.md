---
layout: tutorial
title: Affichage d'un arrière-plan
date: 13/11/20

show_promotion: steredenn

tutorial:
  name: Créer un jeu 2D avec Unity
  link: ../

links:
  summary: ../sommaire
  previous: ../installation-et-preparation
  next: ../ajout-du-joueur-et-des-ennemis
---

En partant du projet tout propre préparé dans la partie précédente, nous allons voir comment mettre en place l'arrière-plan de notre jeu.

# Ajout du fond

Ce premier arrière-plan sera statique. Nous utiliserons cette image :

[ ![TGPA background][background] ][background]

_(Clic droit pour sauver l'image)_

Importez-la dans le dossier "Textures" de votre projet (copiez simplement le fichier). Ne vous souciez pas des paramètres d'importation proposés par le logiciel pour le moment.

Puis créez un nouveau _game object_ de type `Sprite` dans la scène :

[ ![New sprite][new_sprite] ][new_sprite]

## Qu'est-ce qu'un sprite ?

Un _sprite_, en plus d'être une marque de soda, est le terme généralement utilisé pour désigner une image 2D dans un jeu. Dans Unity, c'est aussi un composant spécial pour afficher les images 2D très simplement.

## Ajouter l'image du fond au _sprite_

Si l'image était encore sélectionnée lorsque vous avez créé le _sprite_, alors l'image sera déjà affichée automatiquement.

Si ce n'est pas le cas, voici comment faire. Allez dans l'"Inspector" de ce "New Sprite" et sélectionnez "background" (ce que vous avez copié plus haut) comme image :

[  ![Select a sprite][sprite_select]  ][sprite_select]

_(Il faut cliquer sur la petite icône ronde à droite du champ "Select Sprite")_

<md-note>
_"Je ne vois pas mon sprite dans la fenêtre de sélection ?"_ : La première chose à faire est de vérifier que vous êtes bien dans l'onglet "Assets" de la fenêtre "Select Sprite". Des lecteurs nous ont signalé que dans certains projets (et même avec des projets créés grâce aux outils 2D), les images étaient importées en tant que "Texture" au lieu de "Sprite".
<br /><br />
Sélectionnez votre image dans le menu "Project" et, dans l'"Inspector", changez le "Texture Type" en "Sprite" :
<br />
[ ![Sprite mode][sprite] ][sprite]
<br />
Nous ne savons pas pourquoi le comportement par défaut n'est pas le même pour tous.
</md-note>

Vous devriez voir le ciel nuageux s'afficher dans la scène. Faisons un peu de rangement.

Dans l'onglet "Hierarchy", choisissez "New Sprite" et renommez-le en "Background1" ou quelque chose de facilement identifiable.

Puis déplacez cet objet dans `Level` -> `0 - Background`. Vérifiez que sa position est bien `(0, 0, 0)`.

[  ![Background is set][display_background]  ][display_background]

Exercice expresse : agrandissez l'arrière-plan pour plus tard en dupliquant ce morceau. Placez le nouveau morceau en `(20, 0, 0)` de manière à ce qu'il fasse une frise avec le premier élément.

[  ![Background2 in place][background2_in_place]  ][background2_in_place]

<md-tip>
_Astuce_: Vous pouvez dupliquer un objet avec les raccourcis `cmd + D` (OS X) ou `ctrl + D` (Windows).
</md-tip>

# Ajouter des éléments

Que l'on nommera plus facilement "Props", des petits objets qui viennent décorer la scène sans influer sur le gameplay.

Voici des "plateformes magiques qui volent", parfaites pour aller dans le ciel :

[ ![Platform sprites][platforms] ] [platforms]

_(Clic droit pour sauver l'image)_

Vous pouvez voir qu'il y a deux sprites dans la même image, ce qui va nous obliger à utiliser une nouvelle fonctionnalité de Unity.

## Extraire plusieurs sprites d'une image

1. Importer l'image dans votre dossier prévu pour
2. Sélectionnez la et regardez l'_Inspector_
3. Changez le _Sprite Mode_ en _Multiple_
4. Cliquez sur _Sprite Editor_

[ ![Multiple sprites][sprite_multiple] ][sprite_multiple]

Dans cette nouvelle fenêtre ("Sprite Editor"), vous pouvez dessiner des rectangles autour de chaque plateforme. Cela va permettre d'indiquer à Unity où sont les sprites dans l'image :

[ ![Sprite Editor][sprite_editor] ][sprite_editor]

Le bouton en haut à gauche "Slice" permet d'automatiser cette tâche si votre feuille de sprite est bien faite.

[ ![Automatic slicing][slice] ][slice]

Unity va falloir effectuer un découpage selon les paramètres fournis. Très efficace, veillez cependant à vérifiez le résultat obtenu pour ne pas avoir de sprites mal découpés ou parasités.

Pour ce didacticiel, nous allons le faire à la main. Appelez les plateformes "platform1" et "platform2". Vous devriez voir apparaître les sprites séparés sous l'image dans l'onglet _Project_ :

[ ![Sprite Editor result][sprite_editor_result] ][sprite_editor_result]

## Ajout des plateformes à la scène

C'est aussi facile que pour l'image du fond : il faut créer un nouveau _Sprite_ et assigner l'image de la plateforme pour chaque.

Modifiez la taille jusqu'à satisfaction.

Déplacez ensuite les deux _game objects_ obtenus dans ``1 - Middleground``. Assurez-vous que la position en Z est à ``0`` pour ne pas perturber notre système de plans.

[ ![Deux belles plateformes volantes][adding_platforms] ] [adding_platforms]

Tout devrait être affiché correctement. Cela n'était pas aussi facile avant l'arrivée des outils 2D, mais maintenant, c'est particulièrement simple.

## Prefabs

Nous allons sauver ces plateformes comme des ``prefabs``. Faites un  drag'n'drop de l'onglet _Hierarchy_ vers l'onglet _Project_, dans le dossier _Prefabs_.

[ ![Prefabs][prefabs] ] [prefabs]

Cela va créer un ``Prefab`` ayant exactement les mêmes propriétés que l'objet de base. Cet objet a d'ailleurs lui aussi été modifié et est maintenant connecté au prefab, plusieurs boutons sont apparus en haut de l'_Inpescotr_ :

[ ![Prefab connection][prefab_link] ][prefab_link]

<md-note>
_Note sur les boutons des Prefabs _: si vous modifiez cet objet dans la scène plus tard, vous pouvez appliquer ("Apply") ces changements au prefab et ainsi modifier directement tous les objets liés. Vous pouvez aussi annulez ("Revert") vos changements ou voir avec quel fichier est lié("Select") l'objet.
</md-note>

Maintenant vous pouvez facilement créer des nouvelles plateformes en faisant un drag'n'drop du prefab vers la scène. Essayez !

Vous pouvez ajouter plus de plateformes, de différentes tailles et positions. Elles peuvent aussi être sur d'autres plans.

Pour l'instant ce n'est pas extraordinaire mais c'est un début. Quand nous ajouterons un peu de _parallax scrolling_ tout cela prendra vie.

# Plans

Avant d'aller plus loin, nous allons modifier nos plans. Nous allons clairement les séparer en utilisant la profondeur (z), ce qui ne changera rien visuellement mais évitera des problèmes d'ordre d'affichage.

Changez simplement la position z des plans comme suit :

| Layer            | Z Position |
| ---------------- | ---------- |
| 0 - Background   | 10         |
| 1 - Middleground | 5          |
| 2 - Foreground   | 0          |

Si vous passez de la vue 2D à la vue 3D dans l'éditeur, vous comprendrez clairement ce que nous avons fait :

[ ![Layers in 3D view][layers_3d] ][layers_3d]

# Caméra et lumières

Bon. Dans l'ancienne version de ce tutoriel, nous avions une page entière consacrée à l'ajout de la lumière et aux paramètres de la caméra.

La bonne nouvelle, c'est qu'avec Unity 4.3 et un projet 2D, il n'y a tout simplement plus rien à faire, les paramètres par défaut sont plus que satisfaisant.

<md-info>
_Pour information_ : Si vous sélectionnez l'objet``Main Camera``, vous verrez un paramètre "Projection". La valeur est sur "Orthographic" (2D), et non pas sur "Perspective" (3D). Une caméra orthographique affiche tous les objets à la même profondeur, on perd la notion de... perspective, même si c'est toujours le moteur 3D de Unity qui est utilisé pour le rendu. Le Gif ci-dessus le montre plutôt bien.
</md-info>

# Prêt pour la suite

Vous avez appris à faire un décor simple à base de sprites. En réutilisant ces connaissances, nous allons afficher le joueur et des ennemis.

[background]: ../../2d-game-unity/background-and-camera/-img/background.png
[platforms]: ../../2d-game-unity/background-and-camera/-img/platforms.png
[new_sprite]: ../../2d-game-unity/background-and-camera/-img/new_sprite.png
[sprite]: ../../2d-game-unity/background-and-camera/-img/sprite.png
[sprite_select]: ../../2d-game-unity/background-and-camera/-img/sprite_select.png
[display_background]: ../../2d-game-unity/background-and-camera/-img/display_background.png
[background2_in_place]: ../../2d-game-unity/background-and-camera/-img/background2_in_place.png
[sprite_multiple]: ../../2d-game-unity/background-and-camera/-img/sprite_multiple.png
[sprite_editor]: ../../2d-game-unity/background-and-camera/-img/sprite_editor.png
[sprite_editor_result]: ../../2d-game-unity/background-and-camera/-img/sprite_editor_result.png
[adding_platforms]: ../../2d-game-unity/background-and-camera/-img/adding_platforms.png
[layers_3d]: ../../2d-game-unity/background-and-camera/-img/layers.gif
[prefabs]: ../../2d-game-unity/background-and-camera/-img/prefabs.png
[prefab_link]: ../../2d-game-unity/background-and-camera/-img/prefab_link.png
[slice]: ../../2d-game-unity/background-and-camera/-img/slice.png
