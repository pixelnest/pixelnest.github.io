---
layout: tutorial
title: "Documentation: Dependencies"
subtitle: BulletML for Unity
show_ads: false
show_metadata: false

tutorial:
  show_label: false
  name: BulletML for Unity
  link: ../

links:
  summary: ../table-of-contents/
  previous: ../about/
  next: ../how-to-use/

redirect_from: /work/bulletml-for-unity/dependencies/
---

In addition to Unity 4.3 or higher, the plugin requires two extra libraries (bundled with the package in the `/Plugins` folder):

* **BulletMLLib.dll**: a C# BulletML implementation (parser and engine). We have only embedded the dll in the plugin as we found it easier to distribute.

  But we understand that you may need to have an access to the source code. That's why we released our [open-source fork on GitHub](https://github.com/pixelnest/BulletMLLib). Feel free to have a look or even make your own fork.

  We have mainly modified and updated the library to make it work on the Unity 4.3 framework.

<div data-block="info">
  The fork is based on the work of [Dan Manning](https://twitter.com/DannobotGames) with [this repository](https://github.com/dmanning23/BulletMLLib).
</div>

* **Equationator.dll**: an [open-source library](https://github.com/dmanning23/Equationator) to compute an equation from a `String`.

<br />Both libraries are licensed under the [MIT License](http://choosealicense.com/licenses/mit/).
