---
layout: post
title: The player sprite
subtitle: Creating a 2D game with Unity
author: Damien
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
- New quad
- Rename
- Place
- Remove mesh collider
- Drag'n'drop texture
- Change materials shader to _Transparent -> Cutout -> Diffuse_

Place it in the foreground.
Change its scale. 5x4x1 should be fine.

Add a box collider. This will become our **Hitbox** later. Make sure the hitbox has a size of 1x1x1 (by default the z is so small on quads that it will be hard to trigger collisions). 

**Tip:** if you plan to make a shoot them up, spend a lot of time tweaking your hitboxes. It should perfectly fit an element from the player sprite. What about the ship window here? You can change the collider's shape, for a _sphere collider_ for example, it change nothing to the behavior thanks to Unity.

Save the prefab. You now have a player base!

[![Adding Player Sprite][adding_player]][adding_player]

Notice that as the player is in the foreground plane, in front of the background and platforms.

## The rigidbody magic

There is one last component to add to our player: a _rigidbody_.

This will tell the physics engine how to handle the game object, and it will also allow collision events to be raised in scripts. And we will use them soon.

- select your player
- add a _rigidbody_ component.
- disable rotation ("Freeze Rotation") on X, Y and Z, we don't want to the ship to respond to the world's physic
- disable Z ("Freeze position"), we are not using the Z axis so we should always disable it

Now hit play, and see what does it change.

[![Falling player][falling_ship]][falling_ship]

The ship is falling, no matter what. Say hello to **gravity** ! This can be used in some kind of games, but we don't want to use it here. As default scenes come with a default gravity (y = -9.81) and _rigidbody_ add a mass, the ship is now attracted to the bottom.

Fortunately, it is simple to disable gravity on some object. Just uncheck "Use gravity". That's it, the ship is flying again.

The complete settings:

[![Player rigibody settings][player_rigidbody]][player_rigidbody]

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

- 0: we define a public variable that will appear in the editor. This is the speed applied to the ship. The value itself doesn't have a proper unit, but exposing it public without accessors allows you to live modify it in Unity through the inspector window. Remember it's script programming, not fully traditional C# programming. This implies to break some rules and convention.
- 1: we used the default axis that can be redefine in _Edit->Project Settings->Input_. This will return a value between [-1,1], 0 being the idle state
- 2: Multiply the direction by the speed
- 3: Make sure everything is relative to the game time (so if the game slow down, your ship will slow too) 
- 4: simply translate our sprite. We have no rigidbody attached so things are simple here, otherwise be careful with the physics

Now attach the script to the game object (drag'n'drop to add it as a new component).

Hit the "play" button in top of the editor. The ship is moving!

[![The player moves!][ship_moving]][ship_moving]

Try to tweak the speed: click on the player, modify the speed values in the inspector, see the consequences.

[![The inspector for a script][inspector_script]][inspector_script]


**Warning: modification at runtime are lost when the game is stopped! It's a great tool to tweak but remember what you are doing!**

This was the first sign of life in our game! Let's add more!

## The first enemy

A _shoot them up_ is nothing without tons of enemies to kill.
Let's use an innocent Poulpi:

[![Poulpi Sprite][poulpi]][poulpi]

### The sprite

Time to create a new sprite! Again:

- Copy the image to the _Texture_ folder
- Quad
- Rename it to "Enemy"
- Texture
- Change new material's shader
- Remove **mesh collider**, replace it by a **box collider** (remember to change the collider z scale to 1)
- Scale the sprite transform to 3x2x1
- As for the player, add a rigidbody with constraints and no gravity.

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

[![Enemy is now moving][enemy_moving]][enemy_moving]

If you move the player and collide the two sprites, they will just block each other as we didn't define the collision behavior yet.

## Ready for the next step

Now we want to kill that moving thing! And for that, we need ammo!
[Take me to the next step]()

[player]: ./player.png

[adding_player]: ./adding_player.png

[inspector_script]: ./inspector_script.png

[ship_moving]: ./ship_moving.gif

[poulpi]: ./poulpi.png

[falling_ship]: ./falling_ship.gif

[player_rigidbody]: ./player_rigidbody.png

[enemy_definition]: ./enemy_definition.png

[enemy_moving]: ./enemy_moving.gif