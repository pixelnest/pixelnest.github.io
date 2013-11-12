---
layout: tutorial
title: Creating a 2D game with Unity
subtitle: like a little Shoot Them Up.
author: Damien
date: 12/12/12
---

Today we will share our knowledge in **Unity** and provides you all need ou  to make a simple 2D game.

Something like that. **Click to play the demo!**

[  ![Tutorial result][result]  ][demo_link]

We will focus on a Shoot them up with horizontal scrolling, but if we do our job correctly you'll understand how to extend to many other genre.

About licences:

- Assets are licenced [CC-BY-NC](http://creativecommons.org/licenses/by-nc/2.0/fr/). They have been made by [Thibault Person](twitter.com/mrlapinou) for the game [The Great Paper Adventure](http://www.thegreatpaperadventure.com).

- Source code is copyrighted Pixelnest Studio and licenced MIT

Get more information about our [licenses on GitHub](https://github.com/pixelnest/2d-game-unity-tutorial/blob/master/LICENSE.md) 


The source code is available on our [GitHub repository](https://github.com/pixelnest/2d-game-unity-tutorial).

## Chapters

[  ![Unity][unity_logo_url]  ][unity_logo_url]

Please select a chapter you are interested in to continue.

{% for post in site.posts %}
{% if post.layout == 'tutorial' %}
  - <a href="{{ post.url }}">{{post.title}}</a>
{% endif %}
{% endfor %}

**Remarks:**

- Unity will soon release 2D specific tools, this tutorial is NOT talking about them for now. We will update it as soon as we had our hands on the new toolset.
- This tutorial was made with Unity 4.2.1 

[unity_logo_url]: ./Unity.png
[result]: ./result.png
[demo_link]: ./demo/demo.html
