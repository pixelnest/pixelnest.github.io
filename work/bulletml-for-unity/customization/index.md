---
layout: tutorial
title: "Documentation: Customization"
subtitle: BulletML for Unity
show_ads: false
show_metadata: false

tutorial:
  show_label: false
  name: BulletML for Unity
  link: ../

links:
  summary: ../table-of-contents
  previous: ../how-to-use
  next: ../support
---

All we did before didn't require any scripting from your side.

However, we let you the possibility to change the behavior explained above.
A concrete example would be to handle properly the instatiation and destruction of the bullets with a pool of pre-instantiated objects.

Each bullet has three states:

- **Created**: the container is created but not filled

- **Spawned**: we know which bullet has been created and we can select the right sprite, properties, etc.

- **Destroyed**: the bullet should be removed from the game

The plugin handle each step and let you redefine them **separately**. This is important to understand, if you only redefine the **Create** behavior, then it will be the default spawn and destruction that will executed.

To implement your own behavior, you can add a delegate to those three events corresponding to the states above:

* ``BulletObject CreateBulletHandler()``: called when the engine is requested a new Bullet object without knowing the type of bullet that will be used.
* ``void SpawnBulletHandler(Bullet, string)``: called by the engine when the bullet is ready to be on the screen. We have all the information we need (name, type, position, etc).
* ``void DeleteBulletHandler(Bullet)``: called when the engine is destroying the given bullet.

If you redefine ``SpawnBulletHandler``, you can leave the Bullet Bank field empty and you shoudln't receive any error.

Finally, you can redefine the way BulletML get the player position.

* ``Vector2 GetPlayerPosition()``: returns a Vector2 of the position representing the player, or what you want BulletML to *aim*. It can be required if you have two players and want the enemies to target one or the other but not always the same.
