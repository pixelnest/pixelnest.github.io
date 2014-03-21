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
  next: ../writing-bulletml
---

All we did before didn't require any scripting from your side.

However, we let you the possibility to change any behavior explained before.

<md-note>
_Pool_: A concrete example would be to handle properly the instantiation and destruction of the bullets with a pool of pre-instantiated objects.
</md-note>

# Bullet states

Each bullet has three states:

- **Created**: the container is created but not filled.

- **Spawned**: the bullet has been created and its type is known. You can select the right sprite and properties.

- **Destroyed**: the bullet should be removed from the game.

The plugin handles each step and let you redefine them **separately**.

This is important to understand: if you only redefine the _Create_ behavior, then the plugin will use the default _Spawn_ and _Delete_ behaviors.

To implement your own behavior, you can add a delegate for those three events, corresponding to the following methods:

* `BulletObject OnBulletCreated()` — called when the engine has requested a new `Bullet` object without knowing its type.
* `void OnBulletSpawned(Bullet, string)` — called by the engine when the bullet is ready to be displayed on the screen.

  All the information (name, type, position, etc) is available during this step.

* `void OnBulletDestroyed(Bullet)` — called when the engine is destroying the given bullet.

<md-note>
_Spawn_: If you redefine `OnBulletSpawned`, you can safely leave the `Bullet Bank` field (of `BulletManagerScript`) empty.
</md-note>

# Player position

Finally, you can redefine the way BulletML gets the player position with:

* `Vector2 GetPlayerPosition()` — returns a `Vector2` of the current position of the "player" `GameObject` (or what you want BulletML to *aim* at).

  It can be required if you have two players and want the enemies to target one or the other but not always the same.


<br />And that's it. All you need to know to use _BulletML for Unity_ at its full potential have been learned. Happy hacking.
 :)

Convinced? Then, get the plugin here:

<a href="#todo">
  <img
    src="../-img/buy.png"
    class="intent-button"
    alt="Buy BulletML for Unity"
    title="Buy BulletML for Unity"
  />
</a>

Need support or information? Read the following section.
