---
layout: tutorial
title: Create a player and its enemies
author: Damien
date: 13/11/13

tutorial:
  name: Creating a 2D game with Unity
  link: ../

links:
  summary: ../table-of-contents
  previous: ../background-and-camera
  next: ../shooting-1
---

In the previous chapter, we have added a background and some _props_ to our scene. It is time to add some useful game elements, like the player!

# Creating the player

Creating a player controllable entity needs some elements : a sprite, a way to control it and a way to let it interact with the world.

We will explore this process step by step.

Let's begin with the sprite.

## Add a sprite

Here is the image that we will use:

[![Player Sprite][player]][player]

_(Right click to save the image)_

1. Copy the player image to the "Textures" folder.

2. Create a new ``Sprite``. Name it "Player".

3. Select the sprite to display in the "Sprite" property of the "Sprite Renderer" component.

  If you have any trouble, refer to the previous part. We did exactly the same procedure for the background and _props_.

4. Place the player in the "0 - Foreground" layer.

5. Change its scale. ``(0.3, 0.3, 1)`` should be fine.

## A word about components

We have just talked about a "Sprite Renderer" component. If you haven't remarked, a game object is composed of a few components, visibles in the "Inspector" pane.

By default, an empty game object looks like:

[![Empty game object components][empty_components]][empty_components]

This object has only one component: a "Transform". This component is required and cannot be disabled or removed from an object.

You can add as many components as you want on an object. A script is added as a component, for example. Every component (except the "Transform") can be enabled or disabled during the lifetime of the object.

[![Enable a game object component][components]][components]

_(You can click on the checkbox to disabled it. You can right-click on a component to reset it, remove it, etc.)_

<md-note>
_Note_: Components can interact with other components. If an object has a component that requires another component of an object to work with, you can just drag the whole object inside this component and it will find the correct one in the object.
</md-note>

A "Sprite Renderer" is a component that is able to display a sprite texture.

Now that we have learned about the concept of component, let's add one to the player!

## Add a Box Collider

Click on the "Add Component" button of the player object. Choose a "Box Collider 2D".

This will represent the player [_hitbox_][hitbox_link].

You can see the collider in the editor "Scene" view and tweak its size in the "Inspector" with the "Size" property.

<md-tip>
_Tip_: There is another way to edit a box collider. Select a game object with a box collider and maintain the ``shift`` key of your keyboard. You can observe that the box collider (_the green rectangle_) is now showing four small handles onto. Drag one of them to change the shape of the box.
Be careful, the _blue rectangle represents the_ ``Transform`` component of your game object, not the collider.
</md-tip>

We will set the size of the collider to ``(10, 10)``.

It's way too large for a real _shmup_ but it's still smaller than the sprite:

[![Player hitbox][hitbox]][hitbox]

For the time being, it will be enough.

<md-tip>
_Tip_: If you plan to make a _shmup_, spend a lot of time tweaking your hitboxes. In general, it should fit perfectly a small element inside the player sprite. What about the ship window here? You could also change the collider shape — with a "Circle Collider 2D" for example. It changes nothing to the behavior thanks to Unity, but it will slightly improve the gameplay.
</md-tip>

Save the player game objet to a prefab. You now have a basic player entity!

[![Adding Player Sprite][adding_player]][adding_player]

### Polygon Collider 2D

If you want a super precise and custom shaped hitbox, Unity offers a "Polygon Collider 2D" component. It's less efficient but allows you to set the shape exactly like you want.

<md-tip>
_Tip_: The "Polygon Collider 2D" is like the other colliders: you can modify the shape with your mouse in the "Scene" view. By holding ``cmd`` or ``ctrl``, you can remove a point, and with ``shift`` you can adjust a point or add one onto the collider shape.
</md-tip>

## The Rigidbody magic

There is one last component to add on our player: a "Rigidbody 2D".

This will tell to the physics engine how to handle the game object. Furthermore, it will also allow collision events to be raised in scripts.

1. Select your ``Player`` game object in the "Hierarchy".
2. Add a "Rigidbody 2D" component.

Now, hit play and observe:

[![Falling player][failing_ship]][failing_ship]

The ship is falling!

Say hello to our beloved _gravity_. :)

As new scenes come with a default gravity and rigidbodies add a mass to an object, the ship is now attracted to the bottom.

<md-info>
The default gravity of Unity is ``9.81``, i.e. the earth gravity.
</md-info>

Gravity can be used in some kind of games, but we don't want to have to handle it here. Fortunately, it is simple to disable gravity on a rigidbody. Just set "Gravity Scale" to 0. _That's it, the ship is flying again_.

You may also want to tick the "Fixed Angles" property as we don't want our ship to rotate because of the physics.

The complete settings:

[![Player rigibody settings][player_full_settings]][player_full_settings]

## Moving the player

Time for some scripting! So far, we didn't code anything. That's the power of (love) Unity.

Inside Unity, create a new C# script in your "Scripts" folder. Call it "PlayerScript".

<md-info>
_Remark_: You can do it in JavaScript too. As we said before, code snippets will be in C#, but it is quite easy to translate the code from a language to another.
</md-info>

Open your favorite editor or use the "Sync" submenu (Click on "Assets" in the menubar, then on "Sync MonoDevelop Project") to edit the script.

<md-note>
_"Sync MonoDevelop Project"_: This submenu is a bit weird. First, the name does not change, even if you have set up another editor. <br />We also recommend to use this menu the first time you have to script, because Unity will create the solutions and link the Unity libraries in them (for Visual Studio, Xamarin Studio or MonoDevelop). <br />If you simply open the script instead, the compiler of your IDE will likely catch some errors because it won't know Unity. <br />It doesn't matter because you will never compile directly with it, but it is nice to have the autocompletion on the Unity objects and a first pass on errors.
</md-note>

If you come from XNA, you won't be lost.

You can define some methods (called "Message" as we are not using C# inheritance system) that Unity will recognize and execute when needed.

Default scripts come with the **Start** and **Update** methods. Here is a short list of the most used "Message" functions:

- ``Awake()`` is called once when the object is created. See it as replacement of a classic constructor method.
- ``Start()`` is executed after ``Awake()``. The difference is that the ``Start()`` method is not called if the script is not enabled (remember the checkbox on a component in the "Inspector").
- ``Update()`` is executed for each frame in the main game loop.
- ``FixedUpdate()`` is called at every fixed framerate frame. You should use this method over ``Update()`` when dealing with physics ("RigidBody" and forces).
- ``Destroy()`` is invoked when the object is destroyed. It's your last chance to clean or execute some code.

You also have some functions for the collisions :

- ``OnCollisionEnter2D(CollisionInfo2D info)`` is invoked when another collider is touching this object collider.
- ``OnCollisionExit2D(CollisionInfo2D info)`` is invoked when another collider is not touching this object collider anymore.
- ``OnTriggerEnter2D(Collider2D otherCollider)`` is invoked when another collider marked as a "Trigger" is touching this object collider.
- ``OnTriggerExit2D(Collider2D otherCollider)`` is invoked when another collider marked as a "Trigger" is not touching this object collider anymore.

Fiou... This explanation was a bit boring, but mandatory. Sorry for that.

<md-note>
_Note about the 2D suffix_: You should have observed now that almost anything we talked about was suffixed with "2D". A "Box Collider 2D", a "Rigidbody 2D", the "OnCollisionEnter2D" or "OnTriggerEnter2D" methods, etc. _These new components or methods have appeared with Unity 4.3._ <br />By using them, you are adopting the new physics engine integrated in Unity 4.3 for 2D games (based on Box2D) instead of the one for 3D games (PhysX). The two engines are sharing similar concepts and objects, but they don't work exactly the same. If you start to work with one (favor Box2D for 2D games), stick to it. This is why we use all the objects or methods with a "2D" suffix.
</md-note>

We will get back on some of them in details when we will be using them.

For our player script, we will add some simple controls: the arrow keys will move the ship.

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

Explanations (the number refers to the number in the code above):

0. We define a public variable that will appear in the editor. This is the speed applied to the ship. The value itself doesn't have a proper unit, but exposing it public without accessors allows you to live modify it in Unity through the inspector window. Remember it's script programming, not fully traditional C# programming. This implies to break some rules and convention.
1. We used the default axis that can be redefine in _Edit->Project Settings->Input_. This will return a value between [-1,1], 0 being the idle state.
2. Multiply the direction by the speed.
3. Make sure everything is relative to the game time (so if the game slow down, your ship will slow too).
4. Simply translate our sprit.

Now attach the script to the game object (drag'n'drop to add it as a new component).

Hit the "play" button in top of the editor. The ship is moving!

[![The player moves!][ship_moving]][ship_moving]

Try to tweak the speed: click on the player, modify the speed values in the inspector, see the consequences.

[![The inspector for a script][player_value_tweak]][player_value_tweak]

**Warning: modifications at runtime are lost when the game is stopped! It's a great tool to tweak but remember what you are doing!**

This was the first sign of life in our game! Let's add more!

# The first enemy

A _shoot them up_ is nothing without tons of enemies to kill.
Let's use an innocent Poulpi:

[![Poulpi Sprite][poulpi]][poulpi]

## The sprite

Time to create a new sprite! Again:

- Copy the image to the _Texture_ folder
- New sprite using this image
- Scale transform to 0.4x0.4x1
- Add a _Box Collider 2D_ with a size of 4x4
- Add a rigidbody 2D with 0 gravity and fixed angles.

Save the prefab... and that's it!

[![Enemy Sprite in Unity][enemy_definition]][enemy_definition]

## The script

We will script a simple behavior: it will just moves in a direction.

Create a new script "MoveScript".

We could have call it "EnemyScript", but we plan to reuse it later in another context. Also, the modularity provided by Unity component-based system offers a great way to separate scripts with different features. Of course, you can still have one giant script doing everything with a lot of parameters, it's your choice.

We will copy some pieces we have already written in the "PlayerScript" for movement, but we will add another designer variable for the direction.

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

# Next step

Now we want to kill that moving thing! And for that, we need ammo!


[player]: ./-img/player.png
[hitbox]: ./-img/hitbox.png
[empty_components]: ./-img/empty_go_components.png
[components]: ./-img/go_components.png
[adding_player]: ./-img/adding_player.png
[failing_ship]: ./-img/failing_ship.gif
[player_full_settings]: ./-img/player_full_settings.png
[ship_moving]: ./-img/moving_ship.gif
[player_value_tweak]: ./-img/player_value_tweak.png

[poulpi]: ./-img/poulpi.png
[enemy_definition]: ./-img/enemy_definition.png
[moving_enemy]: ./-img/moving_enemy.gif

[hitbox_link]: http://en.wikipedia.org/wiki/Hitbox "Hitbox definition"
