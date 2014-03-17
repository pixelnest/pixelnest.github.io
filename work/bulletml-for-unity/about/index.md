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

[BulletML](http://www.asahi-net.or.jp/~cs8k-cyu/bulletml/index_e.html), Bullet Markup Language, is an XML format designed by Kenta Cho for bullet patterns in Shoot Them Up games.

The C# parser and engine used in this plugin is open-source, maintained by Dan Manning and can be found on [GitHub](https://github.com/dmanning23/BulletMLLib/). We use a slightly modified version to get it running with Unity.

# Writing you own BulletML files.

The format is [fully documented](http://www.asahi-net.or.jp/~cs8k-cyu/bulletml/bulletml_ref_e.html) by its creator.

Also, we have bundle the original DTD in the package so you can validate your own files.

# Existing patterns?

You can find some well-know patterns written in BulletML. We have bundled some of them in the demo, you may have a looK.

Remember that they may not work nicely altogether: they were written for different types of games, scales, orientation.

Also, some patterns need to handle more than 3500 bullets on the screen, it requires some performance optimization that are **not** covered by this plugin.

# Framerate

The BulletML lib has been made to run at 60 frames per second. But Unity, on mobile devices, set the framerate at 30 FPS by default.

That's why, in `BulletManagerScript`, we override the `Application.targetFramerate` and set it to 60.

You can change with your own value or disable the fix in our script but beware of different speeds between mobile and desktop platforms.
