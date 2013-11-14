---
layout: tutorial
title: Affichage d'un arrière-plan
author: Damien
date: 13/11/13

tutorial:
  name: Créer un jeu 2D avec Unity
  link: ../

links:
  summary: ../sommaire
  previous: ../nstallation-et-preparation
  next: ../joueur-et-ennemis
---

En partant du projet tout propre préparé dans la partie précédente, nous allons voir comment mettre en place l'arrière-plan de notre jeu.

# Ajout du fond

Ce premier arrière-plan sera statique. Nous utiliserons cette image :

[  ![TGPA background][background]  ][background]

Importez-la dans le dossier "Textures" de votre projet (copiez simplement le fichier).

Ne vous souciez pas des paramètres d'import proposés par le logiciel pour le moment.

Créez un nouveau _game object_ de type ``Sprite`` dans la scène.

[  ![New sprite][new_sprite]  ][new_sprite]

## Qu'est-ce qu'un sprite ?

Un "sprite", en plus d'être une marque de soda, est le terme généralement utilisé pour désigner une image 2D dans un jeu. Dans Unity, c'est aussi un composant spécial pour afficher les images 2D.

## Ajouter l'image du fond au sprite

Si l'image était encore sélectionnée lorsque vous avez créé le sprite, alors l'image est déjà affichée automatiquement.

Si ce n'est pas le cas, voici comment faire. Allez dans l'_Inspector_ de ce "New Sprite" et sélctionner "background" comme image :

[  ![Select a sprite][sprite_select]  ][sprite_select]

_(Il faut cliquer sur la petite icône ronde à droite du champ "Select Sprite")_

Vous devriez voir le ciel nuageux s'afficher dans la scène. Faisons un peu de rangement.

Dans l'onglet _Hierrachy_, choississez "New Sprite" et renommez le en "Background1" ou quelque chose de facilement identifiable.

Puis déplacez cet objet dans _Level->0 - Background_. Vérifiez que sa position est (0, 0, 0).

[  ![Background is set][display_background]  ][display_background]

**Exercice express :** agrandissez l'arrière-plan pour plus tard en duplicant ce morceau. Placez le nouveau bout en (20,0,0) de manière à ce qu'il fasse suite avec le premier morceau.

[  ![Background2 in place][background2_in_place]  ][background2_in_place]

## Ajouter des éléments

Que l'on nommera plus facilement "Props", des petits objets qui viennent décorer la scène sans influer sur le gameplay.

Voici des "plateformes magiques qui volent", parfaites pour aller dans le ciel :

[ ![Platform sprites][platforms] ] [platforms]

Vous pouvez voir qu'il y a deux sprites dans la même image, ce qui va nous obliger à utiliser une nouvelle fonctionnalité de Unity.

### Extraire plusieurs sprites d'une image

- Importer l'image dans votre dossier prévu pour
- Sélectionnez la et regardez l'_Inspector_
- Changez le _Sprite Mode_ en _Multiple_
- Cliquez sur _Sprite Editor_

[ ![Multiple sprites][sprite_multiple] ][sprite_multiple]

- Dans cette nouvelle fenêtre, vous pouvez dessiner des rectangles autour de chaque plateforme. Cela va permettre d'indiquer à Unity où sont les sprites dans l'image :
 
[ ![Sprite Editor][sprite_editor] ][sprite_editor]

Le bouton en haut à gauche "Slice" permet d'automatiser cette tâche si votre feuille de sprite est bien faite.

Appelez les plateformes découpées "platform1" et "platform2". Vous devriez voir apparaître les sprites séparés sous l'image dans l'onglet _Project_.uld see the two sprites separately:

[ ![Sprite Editor result][sprite_editor_result] ][sprite_editor_result]

### Ajout des plateformes à la scène

C'est aussi facile que pour l'imae du fond : il faut créer un nouveau _Sprite_ et assigner l'image de la plateforme pour chaque.

Modifiez la taille jusqu'à statisfaction.

Déplacez ensuite les deux _game objects_ obtenus dans "1 - Middleground". **Assurez-vous que la position en Z est à 0** pour ne pas perturber notre système de plans.

[ ![Two shiny new platforms][adding_platforms] ] [adding_platforms]

Tout devrait être affiché correctement. Cela n'était pas aussi simple avant l'arrivée des outils 2D, mais maintenant, c'est particulièrement simple.

### Prefabs

Nous allons asuver ces plateformes comme des _Prefabs_. Fait un  drag'n'drop de l'onglet _Hierarchy_ vers l'onglet _Project_, dans le dossier _Prefabs_.

Maintenant vous pouvez facilement créer des nouvelles plateformes en faisant un drag'n'drop du prefab vers la scène. Essayez !y.

[ ![Prefabs][prefabs] ] [prefabs]

Vous pouvez ajouter plus de plateformes, de différentes tailles et positions. Elles peuvent aussi être sur d'autres plans.

Pour l'instant ce n'est pas extraordinaire mais c'est un début. QUand nous ajouterons un peu de _parallax scrolling_ tout cela prendra vie.

## Plans

Avant d'aller plus loin, nous allons modifier nos plans. Nous allons clairement les séparer en utilisant la profondeur (z), ce qui ne changera rien visuellement mais évitera des problèmes d'ordre d'affichage.

Changez simplement la position z des plans comme suit :

<table>
<tr>
<th>Plan</th>
<th>position Z</th>
</tr>
<tr>
<td>0 - Background</td>
<td>10</td>
</tr>
<tr>
<td>1 - Middleground</td>
<td>5</td>
</tr>
<tr>
<td>3 - Foreground</td>
<td>0</td>
</tr>
</table>

Si vous passez de la vue 2D à la vue 3D dans l'éditeur, vous comprendrez clairement ce que nous avons fait :

[ ![Layers in 3D view][layers_3d] ][layers_3d]

## Prêt pour la suite

Vous avez appris à faire un décor simple à base de sprite. En réutilisant ces connaissances, nous allons afficher le joueur et des ennemis.


[background]: ../../background-and-camera/-img/background.png
[platforms]: ../../background-and-camera/-img/platforms.png
[new_sprite]: ../../background-and-camera/-img/new_sprite.png
[sprite_select]: ../../background-and-camera/-img/sprite_select.png
[display_background]: ../../background-and-camera/-img/display_background.png
[background2_in_place]: ../../background-and-camera/-img/background2_in_place.png
[sprite_multiple]: ../../background-and-camera/-img/sprite_multiple.png
[sprite_editor]: ../../background-and-camera/-img/sprite_editor.png
[sprite_editor_result]: ../../background-and-camera/-img/sprite_editor_result.png
[adding_platforms]: ../../background-and-camera/-img/adding_platforms.png
[layers_3d]: ../../background-and-camera/-img/layers.gif
[prefabs]: ../../background-and-camera/-img/prefabs.png