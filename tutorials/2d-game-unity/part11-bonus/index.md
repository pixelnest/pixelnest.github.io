---
layout: tutorial
title: Bonus - advanced resources and tips
subtitle: Creating a 2D game with Unity
author: Damien
---

## Chapters

- [Installation and the first game scene](./part1-install-and-scene)
- [Adding and displaying a background](./part2-background-and-camera)
- [The player sprite and an enemy](./part3-player-and-enemies)
- [The shooting - part 1](./part4-shooting-101)
- [The shooting - part 2](./part5-shooting-102)
- [Parallax scrolling](./part6-parallax-scrolling)
- [Adding particles](./part7-particles)
- [Making some noise and adding music](./part8-sounds)
- [Menu - loading and restarting the game](./part9-menus)
- [Build, release and deployment](./part10-deployment)
- **> [Bonus - advanced resources and tips](./part11-bonus)**

## Summary

This is some extra links and tips for those who wants more than the tutorial.

## Valuable articles

This is some good readings we recommend you:

- [Creating a simple "Canabalt"-like with Unity](http://catlikecoding.com/unity/tutorials/runner/): a short, efficient, well written tutorial

- [50 Unity tips](http://devmag.org.za/2012/07/12/50-tips-for-working-with-unity-best-practices/): for more organized and efficient projects

- [Introduction to Coroutines](http://unitypatterns.com/introduction-to-coroutines/): Advanced scripting technique in Unity

- [Making 'Two and a half D' art for Lovers in a Dangerous Spacetime](http://www.gamasutra.com/blogs/MattHammill/20130206/186138/Making_Two_and_a_half_D_art_for_Lovers_in_a_Dangerous_Spacetime.php): A perfect example of a good use of the orthographic camera


## Git + Unity

You're working with a source control? Be careful, there is a trick with Unity.

[Read more about how to use Git with Unity](http://dmayance.com/git-and-unity-projects/)

## Nicer sprite

You may have noticed that 2D sprite can look ugly because of the automatic compression Unity does.

To improve that, change the texture parameter:

- Texture Type : Advanced
- Uncheck Mip Map
- Maybe set a higher Max Size (2048 to 4096)
- Format : RGBA 32 bit

[ ![texture settings][texture_settings]][texture_settings]

And Apply. It should be nicer. Still not perfect, but it's because of the sprite.

[ ![quality][quality_result]][quality_result]

## Flip

Need to mirror an image?
Set the opposite scale :) (Scale = -scale).

[ ![Flip][flip]][flip]

## Editor/Runtime color

Tips to know when you are ingame or in editor. Change the ingame color.

[ ![Ingame/Editor different colors][color]][color]

This is useful to avoid losing modification you did on some values.

Simply go to _Edit->Preferences_ and change the "Playmode Tint".

[ ![Playmode tint location][preferences_color]][preferences_color]






[texture_settings]: ./img/texture_settings.png

[quality_result]: ./img/quality_result.png

[flip]: ./img/flip.png

[color]: ./img/color.png

[preferences_color]: ./img/preferences_color.png

[camera_iso]: ./img/camera_iso.png
