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
  summary: ../table-of-contents
  previous: ../about
  next: ../how-to-use
---

In addition to Unity 4.3 or superior, the plugin requires two extra libraries (bundled with the package in the `/Plugins` folder):

* **BulletMLLib.dll**: a C# BulletML implementation (parser and engine) based on this open-source [repository](https://github.com/dmanning23/BulletMLLib/).

  We have mainly modified and updated the library to make it work on the Unity framework.

* **Equationator.dll**: an [open-source library](https://github.com/dmanning23/Equationator) to compute an equation from a `String`.
