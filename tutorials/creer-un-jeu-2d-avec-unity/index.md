---
layout: tutorial
title: Créer un jeu 2D avec Unity
date: 13/11/20

show_promotion: steredenn

tutorial:
  name: Créer un jeu 2D avec Unity
  link: ./

links:
  next: ./sommaire

lang: fr
---

**Ce tutorial (dans sa version française) n'a jamais été officiellement terminé.** Il est disponible si vous trouvez l'URL ou via Google, **mais nous ne l'avons jamais complètement relu, corrigé, nettoyé et mis à jour avec les nouvelles versions d'Unity** (c'est pourquoi ce tutorial n'est pas sur notre site). Nous le laissons en ligne uniquement parce que nous savons que certaines personnes l'utilisent et l'ont apprécié malgré tout. Il y aura probablement des bugs d'affichage, des erreurs et des coquilles.

Cependant, nous n'avons clairement pas le temps de terminer et maintenir cette traduction. **Nous ne répondrons pas à des demandes de support concernant cette traduction.**

[Si vous comprenez l'anglais, lisez plutôt la version originale, qui est à jour, propre et relue. ;)](/tutorials/2d-game-unity/)

<br><br><br>

---

En utilisant les nouveaux outils 2D intégrés à **Unity** avec la version 4.3, vous allez apprendre avec ce tutoriel à faire un petit jeu de type "Shoot'em up" (abrégé en _shmup_ par la suite).

Le résultat sera très similaire à cette démo :

[ ![Résultat en démo][result] ][demo_link]

_(Cliquez sur l'image pour jouer)_

<div data-block="danger">
  **Attention**: ce didacticiel en _version française n'a pas été entièrement relu, nettoyé, corrigé et maintenu à jour_ (et ne le sera jamais).

  Par manque de temps, nous n'avons pas pu le peaufiner davantage : vous risquez donc de tomber sur des coquilles et des fautes. **Nous ne répondrons pas à des demandes de support concernant cette traduction.**

  Il est cependant complet et couvre l'ensemble des étapes de la création d'un jeu vidéo pour **la version 4.3 de Unity**. Vous rencontrerez des erreurs si vous utilisez une version plus récente de Unity. Dans ce cas, [lisez la version anglaise qui est à jour et terminée](/tutorials/2d-game-unity/).
</div>

Nous nous focaliserons sur les _shmup_ à scrolling horizontaux (de gauche à droite), mais si ce didacticiel  fait bien son travail, vous n'aurez pas de mal à explorer d'autres types de scrolling et d'autres genres de jeu.

Les _assets_, le _gameplay_ et l'idée originale viennent du jeu [The Great Paper Adventure][tgpa_link] que Damien a réalisé il y a quelques années (2010). Le jeu original a été développé avec [XNA][xna_link] et nous avons donc pensé que refaire le début de ce projet sous Unity serait l'occasion idéale de tester les nouveaux outils 2D.

# Unity

[Unity3D][unity_link] est un moteur de jeu très populaire et complet permettant de créer des jeux vidéo multiplateformes, aussi bien en 2D qu'en 3D. Nous partons du principe que vous avez déjà quelques bases en programmation. Connaître l'outil est un plus, mais n'est pas nécessaire.

Ce tutoriel est entièrement réalisable avec la version **Gratuite** de Unity.

[ ![Unity][unity_logo_url] ][unity_download_link]

# Licences

- Les images sont sous licence [CC-BY-NC][cc_licence_link]. Elles ont été réalisées par [Thibault Person][tp_twitter_link] pour le jeu [The Great Paper Adventure][tgpa_link].

- Le code source est la propriété de Pixelnest Studio et est disponible sous [licence MIT][mit_licence_link].

Retrouvez plus d'informations sur ce sujet sur [GitHub][github_licence_link].

Le code source est également disponible [sur notre dépôt GitHub][github_repo_link].

# Contact

Si vous trouvez une faute de frappe, de français ou carrément un bug, n'hésitez pas à nous le signaler via [notre twitter][pxn_twitter_link] ou par [e-mail][pxn_mailto].

N'hésitez pas non plus à nous joindre si vous souhaitez des informations complémentaires sur un chapitre ou des explications sur un sujet précis.

Enfin, vous pouvez nous suivre sur [twitter][pxn_twitter_link] si vous aimez ce que nous faisons. :)

Ce tutoriel a été rédigé par [Damien][dam_twitter_link] et [Matthieu][mog_twitter_link]. C'est une rapide adaptation de notre [tutoriel en anglais](/tutorials/2d-game-unity). Nous n'avons malheureusement pas autant de temps à investir sur cette version, et c'est pourquoi nous sommes donc particulièrement à l'écoute quant aux corrections et problèmes d'écriture.

Nous vous souhaitons une bonne lecture. :)

<br>

Allez, découvrons ce que Unity a à nous offrir pour faire un jeu 2D.

[unity_logo_url]: ../2d-game-unity/-img/unity.png
[result]: ../2d-game-unity/-img/result.png

[demo_link]: ../2d-game-unity/-demo/demo.html "Play the demo"

[pxn_mailto]: mailto:contact@pixelnest.io "Pixelnest Mail"

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
