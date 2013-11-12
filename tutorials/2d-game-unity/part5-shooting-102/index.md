---
layout: tutorial
title: The shooting (2/2)
subtitle: Creating a 2D game with Unity
author: Damien
---

## Chapters

- [Installation and the first game scene](./part1-install-and-scene)
- [Adding and displaying a background](./part2-background-and-camera)
- [The player sprite and an enemy](./part3-player-and-enemies)
- [The shooting - part 1](./part4-shooting-101)
- **> [The shooting - part 2](./part5-shooting-102)**
- [Parallax scrolling](./part6-parallax-scrolling)
- [Adding particles](./part7-particles)
- [Making some noise and adding music](./part8-sounds)
- [Menu - loading and restarting the game](./part9-menus)
- [Build, release and deployment](./part10-deployment)
- [Bonus - advanced resources and tips](./part11-bonus)

## Summary

Our magnificent ship is now shooting innocent flying octopuses.
This can't be like that. They need to respond. Shoot the player.

Using what we did in the last part, we will modify the enemy behavior so it will shoots projectiles too.

[Download the project from part 4](https://github.com/pixelnest/2d-game-unity-tutorial/releases/tag/part4)

## The enemy projectile

We will create a new projectile using this sprite:

[![Poulpi shot Sprite][shot_poulpi]][shot_poulpi]

If you are as lazy as I am, duplicate the "Shot1" prefab, rename it "ShotEnemy1" and change the material for a new one using the sprite above.

To duplicate, create an instance by doing a drag'n'drop in the scene, rename the created game object, resave it as a prefab.

You can also recreate a whole new sprite, quad, rigibody, collider with trigger, etc).

The right scale is 1.5 x 1.5 x 1.

Something like this:

[![Poulpi shot configuration][shot_config2]][shot_config2]

If you hit play, the shot will move and potentially destroy the enemy. This is because of the _ShotScript_ properties.

Don't change them. Remember the _WeaponScript_ from last part? It will set those values properly.

Save as a prefab, remove from the scene.

## Making the enemy actually shoot

As we did for the player, we need to add the weapon to the enemy and make him call the projectile creation method.

### New scripts and assignments

- Add a _WeaponScript_ to the enemy. Dran'n'drop the "ShotEnemy1" prefab into the "Shot Prefab" variable of the script.

- Then create a new script, _EnemyScript_. It will simply try to trigger the weapon at each frame, a kind of auto-fire.

`````csharp
using UnityEngine;

/// <summary>
/// Enemy generic behavior
/// </summary>
public class EnemyScript : MonoBehaviour
{
  private WeaponScript weapon;

  void Awake()
  {
    // Retrieve the wepaon only once
    weapon = GetComponent<WeaponScript>();
  }

  void Update()
  {
    // Auto-fire
    if (weapon != null && weapon.CanAttack)
    {
      weapon.Attack(true);
    }
  }
}

`````

- Assign this new script to our enemy

You should have this (I just slightly reduce the firing rate to 0.15):

[![Poulpi configuration with weapon][enemy_config]][enemy_config]

**Remark:** if you are modifying the game object in the scene, remember to save all changes to the prefab using the "Apply" button on the top right.

Try and see!

[![Poulpi is shooting like hell][shoot_right]][shoot_right]

Okay, it's kinda working. The weapon is firing on it's right because that's what we told him. The right of the enemy can be seen in the editor, it's simply the gizmo.

[![Gizmo][gizmo]][gizmo]

If you rotate the object, you can make it fire at the left but the rest is messed up.

[![Reversing][reverse]][reverse]

So what?! Obviously, I made this mistake for a reason.

###  Shooting in all direction

The _WeaponScript_ has been made in a way that it is interesting to rotate its game object. It gives you a flexible direction, imagine a giant robot arm shooting laser.

We need to modify our enemy:

- Create a new **empty game object**. We will call it "WeaponObject" (just to know what we are talking about)
- Delete the _WeaponScript_ for "Enemy1"
- Add a _WepaonScript_ to "WeaponObject" and set the shot prefab like you did before
- **Rotate**  "WeaponObject" to (0,0,180)

You should have this:

[![Enemy with a new object][enemy_full_config]][enemy_full_config]

Now we modify the script.
_GetComponent_ will return null as the _WeaponScript_ is not attached to the same game object as the _EnemyScript_.
Fortunately, we can look in the hierarchy of the current game object using the _...InChildren_ methods.

I also added a way to manage multiple weapons, for fun, it's just that we look for a list instead of just one instance.

The whole _EnemyScript_:
`````csharp
using System.Collections.Generic;
using UnityEngine;

/// <summary>
/// Enemy generic behavior
/// </summary>
public class EnemyScript : MonoBehaviour
{
  private WeaponScript[] weapons;

  void Awake()
  {
    // Retrieve the wepaon only once
    weapons = GetComponentsInChildren<WeaponScript>();
  }

  void Update()
  {
    foreach (WeaponScript weapon in weapons)
    {
      // Auto-fire
      if (weapon != null && weapon.CanAttack)
      {
        weapon.Attack(true);
      }
    }
  }
}

`````

Finally, update the shot speed (in the _MoveScript_) so they go faster than the enemy:

[![Super dangerous Poulpi][shoot_ok]][shoot_ok]

Here we are a super dangerous Poulpi. Of course we need to tweak the variable to make a real game.

### Bonus: firing in two direction

Add another weapon and the enemy fire in two direction. This is just a few clicks and a duplication in the editor, no scripts!

The result:

[![Still a super dangerous Poulpi with two guns][shoot_two_dir]][shoot_two_dir]


## Player taking damage

But the player is still invincible. No challenge there.
Simply adds a _HealthScript_ to him. Make sure to uncheck the "IsEnemy" field.

[![Script configuration for player health][player_no_enemy]][player_no_enemy]

[![Player hit by an enemy projectile][player_die]][player_die]

## Bonus

This is just some hints to go further on the shooting feature. You can skip it if you are not interested into more specific shoot them up thoughts.

### Pooling the projectiles?

As you shoot you will see game objects being created and removed only after 20 seconds
.
If you are doing a danmaku and need a LOT of bullets, this is not a viable technique.

One of the solution to handle a lot of bullet is to use a **pooling system**. You can simply use an array of bullets, limited in size. When if the array is filled, you delete the oldest object and replace it by a new one.

I won't implement one here but it is quite simple. I used [the same technique a previous painting script, see the gist](http://dmayance.com/unity-paint-part-2/).

You can also reduce the time to live of a bullet so it will disappear quicker.

Remember also that Unity is really slow on the _Instantiate_ method, you need to use it carefully.

### Adjusting hitboxes

Collision are unfair for now. Using squares is fine (most games use AABB - squares with no rotation - for collisions), but we need to adjust the size.

The Unity editor is here really useful. Click on the game object you want to adjust, see the green lines: it's your collider.

Now just adjust it (shape, size, position, etc). Move the object out of the background to be precise.

Here's what I did for the player. It's not super precise, but it can be. At least it fits the sprite so we barely see the new dimensions.

[![Player adjusted collider][player_collider]][player_collider]

Of course all colliders need to be adjusted, otherwise some collisions will still be unfair. But that's part of the gameplay: the player should easily hit enemies (larger collider on shot and on enemy).

### Starting with delay

Simply watching the gif, you should see how synchronous all enemies are.
We could simply add a delay to the weapon: it's just initializing the cooldown to something else than 0.

This would allow to have weapon still shooting continuously but all in the same time (why not "top" then, 0.5 sec later, "bottom");

Once again, it depends on the gameplay you want to achieve.

## Ready for the next step

We now have a shooter! A very basic and hardcore one, but still a shooter.
You can add more enemies and shoot them. Slow the firing rate to 0.95 for the enemy if you want it to be playable.

[![Result][result]][result]

It is now time to enhance the background and the scene to get a full level.

[Take me to the next step]()

[shot_poulpi]: ./img/shot_poulpi.png

[shot_config2]: ./img/shot_config2.png

[enemy_config]: ./img/enemy_config.png

[shoot_right]: ./img/shoot_right.gif

[gizmo]: ./img/gizmo.png

[reverse]: ./img/reverse.png

[enemy_full_config]: ./img/enemy_full_config.png

[shoot_ok]: ./img/shoot_ok.gif

[shoot_two_dir]: ./img/shoot_two_dir.gif

[player_no_enemy]: ./img/player_no_enemy.png

[player_die]: ./img/player_die.gif

[result]: ./img/result.gif

[player_collider]: ./img/player_collider.png
