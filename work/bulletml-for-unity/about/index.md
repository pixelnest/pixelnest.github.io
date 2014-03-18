---
layout: tutorial
title: About BulletML
subtitle: BulletML for Unity
show_ads: false
show_metadata: false

tutorial:
  show_label: false
  name: BulletML for Unity
  link: ../

links:
  summary: ../table-of-contents
  previous: ../package-and-license
  next: ../dependencies
---

[BulletML](http://www.asahi-net.or.jp/~cs8k-cyu/bulletml/index_e.html), for _Bullet Markup Language_, is an XML format designed by Kenta Cho to create bullet patterns in "Shoot'Em Up" games.

The C# parser and engine used in this plugin is open-source, maintained by Dan Manning and can be found on [GitHub](https://github.com/dmanning23/BulletMLLib/). We use a slightly modified version to get it running on Unity.

# Writing you own BulletML file

The format is [fully documented](http://www.asahi-net.or.jp/~cs8k-cyu/bulletml/bulletml_ref_e.html) by its creator.

We have also bundled the original [DTD](http://en.wikipedia.org/wiki/Document_type_definition) in the package so you can validate your own files.

TODO check the step-by-step.

# Existing patterns?

You can find some well-know patterns written in BulletML on Internet. We have already bundled some of them in our package and demos.

Remember that they may not work nicely altogether: they were written for different types of games, scales and orientations. It's still a good start to create your own.

<md-warning>
*Caution*: Some patterns need to handle more than 3500 bullets on the screen. It requires some performance optimizations that are _NOT_ covered by this plugin.
</md-warning>

TODO we have also included our own custom examples with the plugin.

# Framerate

The BulletML library is designed to run at 60 frames per second. Alas, Unity set the framerate at 30 FPS by default on mobile devices.

That's why we override the `Application.targetFramerate` and set it to 60 in `BulletManagerScript`.

You can change this property by your own value or disable the fix in our script, but beware of different speeds between mobile and desktop platforms.
