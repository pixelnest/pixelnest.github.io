---
layout: tutorial
title: The player and some enemies
author: Damien
date: 13/11/13

tutorial:
  name: Creating a 2D game with Unity
  link: ../

links:
  summary: ../#summary
  previous: ../background-and-camera
  next: ../shooting-1
---

## Chapters

<Sommaire ici>

## Summary

We have a background, some props, it is time to add some useful game elements, like the player!

## Creating the player sprite

Here the sprite we will use:

[![Player Sprite][player]][player]

It is the same steps than for platforms.

Sprite creation procedure:

- Copy the player image to the _Texture_ folder
- New sprite
- If necessary, select each sprite in the image
- Select the sprite to display

Place it in the "0 - Foreground" layer.
Change its scale: 0.3x0.3x1 should be fine.

Add a _Box collider 2D_. This is our **Hitbox**. You can see it in the editor and tweak it's size in the inspector. Here, with a size of 10x10x1, it's way too large for a real shoot them up but it's still smaller than the sprite:

[![Player hitbox][hitbox]][hitbox]

**Tip:** if you plan to make a shoot them up, spend a lot of time tweaking your hitboxes. It should perfectly fit an element from the player sprite. What about the ship window here? You can change the collider's shape, for a Circle collider 2D_ for example, it change nothing to the behavior thanks to Unity.

**Remark:** If you want a super precise hitbox, use the _Polygon Collider 2D_. It is less efficient but allows you to shape the exact collider you want using your mouse in the editor.

Save the prefab. You now have a player base!

[![Adding Player Sprite][adding_player]][adding_player]

## The rigidbody magic

There is one last component to add to our player: a _Rigidbody 2D_.

This will tell the physics engine how to handle the game object, and it will also allow collision events to be raised in scripts. And we will use them soon.

- select your player
- add a _Rigidbody 2D_ component.

Now hit play, and see what does it change.

[![Falling player][failing_ship]][failing_ship]

The ship is falling, no matter what. Say hello to **gravity** ! This can be used in some kind of games, but we don't want to use it here. As default scenes come with a default gravity (y = -9.81) and rigidbodies add a mass, the ship is now attracted to the bottom.

Fortunately, it is simple to disable gravity on some object. Just set "Gravity Scale" to 0. That's it, the ship is flying again.

You may also check "Fixed Angles" as we don't want our ship to rotate with the physics.

The complete settings:

[![Player rigibody settings][player_full_settings]][player_full_settings]

## Moving the player

Time for some scripting! So far we didn't code anything. That's the power of (love) Unity.

From Unity, create a new C# script in the _Scripts_ folder. Call it "PlayerScript".

**Remark: you can do it in JavaScript too. Code snippets will be C# but it quite easy to translate from a language to another.**

Open your favorite IDE or use the shortcut (_Assets -> Sync MonoDevelop Project_) to edit the script.

If you come from XNA, you won't be lost. You can define some method (here called "message" as we are not using C# inheritance system) that Unity will recognize and execute.

Default script come with **Start** and **Update**. Here is a short list of the most used functions:

- ``Awake()``: called once when the object is created. It replace the constructor (Unity will forbid you any instruction in constructor)
- ``Start()``: called after Awake()
- ``Update()``: main loop
- ``Destroy()``: object is destroyed, last chance to execute some code
- ``OnCollisionEnter(CollisionInfo info)``: a collider is touching the object collider
- ``OnCollisionExit(CollisionInfo info)``: a collider is not touching anymore the object collider
- ``OnTriggerEnter(Collider otherCollider)``: a collider marked as trigger is touching the object collider
- ``OnTriggerExit(Collider otherCollider)``: a collider marked as trigger is touching the object collider

We will get back on some of them in details when we will be using them.

For our player script, we will add simple controls: arrows move the ship.

`````csharp
using UnityEngine;

/// <summary>
/// Player controller and behavior
/// </summary>
public class PlayerScript : MonoBehaviour
{
  /// <summary>
  /// 0 - The speed of the ship
  /// </summary>
  public Vector2 Speed = new Vector2(50, 50);

  void Update()
  {
    // 1 - Retrieve axis information
    float inputX = Input.GetAxis("Horizontal");
    float inputY = Input.GetAxis("Vertical");

    // 2 - Movement per direction
    Vector3 movement = new Vector3(
      Speed.x * inputX,
      Speed.y * inputY,
      0);

    // 3 - Relative to the time
    movement *= Time.deltaTime;

    // 4 - Move the game object
    transform.Translate(movement);
  }
}
`````

Explanations:

<table>
<tr>
<th>Step</th>
<th>Explanations</th>
</tr>
<tr>
<td>0</td>
<td>we define a public variable that will appear in the editor. This is the speed applied to the ship. The value itself doesn't have a proper unit, but exposing it public without accessors allows you to live modify it in Unity through the inspector window. Remember it's script programming, not fully traditional C# programming. This implies to break some rules and convention.</td>
</tr
<tr>
<td>1</td>
<td>we used the default axis that can be redefine in _Edit->Project Settings->Input_. This will return a value between [-1,1], 0 being the idle state</td>
</tr
<tr>
<td>2</td>
<td>Multiply the direction by the speed</td>
</tr
<tr>
<td>3</td>
<td>Make sure everything is relative to the game time (so if the game slow down, your ship will slow too) </td>
</tr
<tr>
<td>4</td>
<td>Simply translate our sprit.</td>
</tr
</table>

Now attach the script to the game object (drag'n'drop to add it as a new component).

Hit the "play" button in top of the editor. The ship is moving!

[![The player moves!][ship_moving]][ship_moving]

Try to tweak the speed: click on the player, modify the speed values in the inspector, see the consequences.

[![The inspector for a script][player_value_tweak]][player_value_tweak]

**Warning: modifications at runtime are lost when the game is stopped! It's a great tool to tweak but remember what you are doing!**

This was the first sign of life in our game! Let's add more!

## The first enemy

A _shoot them up_ is nothing without tons of enemies to kill.
Let's use an innocent Poulpi:

[![Poulpi Sprite][poulpi]][poulpi]

### The sprite

Time to create a new sprite! Again:

- Copy the image to the _Texture_ folder
- New sprite using this image
- Scale the sprite transform to 0.4x0.4x1
- Add a _Box Collider 2D_ with a size of 4x4
- Add a rigidbody 2D with 0 gravity and fixed angles.

Save the prefab... and that's it!

[![Enemy Sprite in Unity][enemy_definition]][enemy_definition]

## The script

We will script a simple behavior: it will just moves in a direction.

Create a new script "MoveScript".

We could have call it "EnemyScript", but we could reuse it later in another context. Also, the modularity provided by Unity component-based system offers a great way to separate scripts with different features. Of course, you can still have one giant script doing everything with a lot of parameters, it's your choice.

We will reuse some pieces we have already written in the "PlayerScript" for movement, but we will add another designer variable for the direction.

The script:

```csharp
using UnityEngine;

/// <summary>
/// Simply moves the current game object
/// </summary>
public class MoveScript : MonoBehaviour
{
  // 0 - Designer variables

  /// <summary>
  /// Projectile speed
  /// </summary>
  public Vector2 Speed = new Vector2(10, 10);

  /// <summary>
  /// Moving direction
  /// </summary>
  public Vector2 Direction = new Vector2(-1, 0);

  void Update()
  {
    // 1 - Movement
    Vector3 movement = new Vector3(
      Speed.x * Direction.x,
      Speed.y * Direction.y,
      0);

    movement *= Time.deltaTime;
    transform.Translate(movement);
  }
}

```

Add it to the enemy. Hit play, it should move like beyond.

[![Enemy is now moving][moving_enemy]][moving_enemy]

If you move the player and collide the two sprites, they will just block each other as we didn't define the collision behavior yet.

## Ready for the next step

Now we want to kill that moving thing! And for that, we need ammo!
[Take me to the next step]()

[player]: ./img/player.png

[hitbox]: ./img/hitbox.png
[adding_player]: ./img/adding_player.png
[failing_ship]: ./img/failing_ship.gif
[player_full_settings]: ./img/player_full_settings.png
[ship_moving]: ./img/moving_ship.gif
[player_value_tweak]: ./img/player_value_tweak.png
[enemy_definition]: ./img/enemy_definition.png
[moving_enemy]: ./img/moving_enemy.gif
