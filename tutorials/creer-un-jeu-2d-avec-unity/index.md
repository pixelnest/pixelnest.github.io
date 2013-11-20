---
layout: tutorial
title: Créer un jeu 2D avec Unity
date: 13/11/20

tutorial:
  name: Créer un jeu 2D avec Unity
  link: ./

links:
  next: ./sommaire

lang: fr
---

En utilisant les récents outils 2D intégrés à **Unity**, vous allez apprendre avec ce tutoriel à faire un petit jeu de type "Shoot'em up" (abrégé en _shmup_ par la suite).

Le résultat sera très similaire à cette démo :

[ ![Résultat en démo][result] ][demo_link]

_(Cliquez sur l'image pour jouer)_

Je me focaliserai sur les _shmup_ à scrolling horizontaux, de gauche à droite, mais si ce didacticiel fait bien son travail vous n'aurez pas de mal à explorer d'autres sens et d'autres genres.

Les _assets_, le _gameplay_ et l'idée originale viennent du jeu [The Great Paper Adventure][tgpa_link] que j'ai réalisé il y a quelques années (2010). Le jeu original est développé avec [XNA][xna_link], je me suis donc dit que c'était une occasion idéale de tester les nouveaux outils Unity sur ce projet.

# Unity

[Unity3D][unity_link] est un moteur de jeu très utilisé et complet pour créer des jeux vidéo multiplateformes, 2D ou 3D. Nous partons du principe que vous avez déjà quelques rudiments en programmation. Connaître l'outil est un plus, mais n'est pas nécessaire.

Ce tutoriel est entièrement réalisable avec la version **Gratuite** de Unity.

[ ![Unity][unity_logo_url] ][unity_download_link]

# Licences

- Les images sont sous licences [CC-BY-NC][cc_licence_link]. Elles sont été réalisées par [Thibault Person][tp_twitter_link] pour le jeu [The Great Paper Adventure][tgpa_link].

- Le code source est la propriété de Pixelnest Studio et est disponible sous [licence MIT][mit_licence_link].

Retrouvez plus d'informations sur ce sujet sur [GitHub][github_licence_link].

Le code source est disponible [sur notre dépôt GitHub][github_repo_link].

# Contact

Si vous trouvez une faute de frappe, de français ou technique, n'hésitez pas à nous le signaler via [notre twitter][pxn_twitter_link]. ou par [e-mail][pxn_mailto].

N'hésitez pas non plus à nous joindre si vous souhaitez des informations complémentaires à un chapitre ou des explications sur un sujet.

Enfin, vous pouvez nous suivre sur [twitter][pxn_twitter_link] si vous aimez ce que nous faisons :).

Ce tutoriel a été principalement rédigé par [Damien][dam_twitter_link] puis relu et corrigé par [Matthieu][mog_twitter_link].

Nous vous souhaitons une bonne lecture.

<br />

Assez parlés, découvrons ce que Unity a à nous offrir pour faire un jeu 2D.

[unity_logo_url]: ../2d-game-unity/-img/unity.png
[result]: ../2d-game-unity/-img/result.png

[demo_link]: ../2d-game-unity/-demo/demo.html "Play the demo"

[pxn_mailto]: mailto:site@pixelnest.io "Pixelnest Mail"

[unity_link]: http://unity3d.com/ "Unity3D"
[xna_link]: http://en.wikipedia.org/wiki/Microsoft_XNA "Microsoft XNA"
[tgpa_link]: http://www.thegreatpaperadventure.com "The Great Paper Adventure"
[tp_twitter_link]: http://twitter.com/mrlapinou "Thibault Person Twitter"
[pxn_twitter_link]: http://twitter.com/pixelnest "Pixelnest Studio Twitter"
[dam_twitter_link]: http://twitter.com/valryon "Damien Mayance Twitter"
[mog_twitter_link]: http://twitter.com/solarsailer "Matthieu Oger Twitter"
[unity_download_link]: http://unity3d.com/unity/download "Download Unity 4.3"
[cc_licence_link]: http://creativecommons.org/licenses/by-nc/2.0/fr/ "CC-BY-NC"
[mit_licence_link]: http://choosealicense.com/licenses/mit/ "MIT Licence"
[github_repo_link]: https://github.com/pixelnest/2d-game-unity-tutorial "Repository"
[github_licence_link]: https://github.com/pixelnest/2d-game-unity-tutorial/blob/master/LICENSE.md "Repository licence"
