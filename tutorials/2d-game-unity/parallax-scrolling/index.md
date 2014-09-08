---
layout: tutorial
title: Parallax scrolling
date: 13/11/18

show_promotion: steredenn

tutorial:
  name: Creating a 2D game with Unity
  link: ../

links:
  summary: ../table-of-contents
  previous: ../shooting-2
  next: ../particles
---

For the moment, we have created a static scene with a player and some enemies. It's a bit boring. Time to enhance our background and scene.

An effect that you find in every single 2D game for 15 years is "[parallax scrolling][parallax_link]".

To make it short, the idea is to move the background layers at different speeds (i.e., the farther the layer is, the slower it moves). If done correctly, this gives an illusion of depth. _It's a cool, nice and easy-to-do effect_.

Moreover, many _shmups_ use a scrolling in one — or more — axis (except the original one, [Space Invaders][space_invaders_link]).

Let's implement that in Unity.

# _Theory_: defining the scrolling in our game

Adding a scrolling axis need a bit of thinking on how we will make the game with this new aspect.

_It's good to think before coding._ :)

## What do we want to move?

We have a decision to take here :

1. _First choice_: The player and the camera move. The rest is fixed.
2. _Second choice_:  The player and the camera are static. The level is a treadmill.

The first choice is a no-brainer if you have a `Perspective` camera. The parallax is obvious: background elements have a higher depth. Thus, they are behind and seems to move slower.

But in a standard 2D game in Unity, we use an `Orthographic` camera. We don't have depth at render.

<md-note>
_About the camera_: Remember the "Projection" property of your camera game object. It's set to `Orthographic` in our game. <br />`Perspective` means that the camera is a classic 3D camera, with depth management. `Orthographic` is a camera that renders everything at the same depth. It's particularly useful for a GUI or a 2D game.
</md-note>

In order to add the parallax scrolling effect to our game, the solution is to mix both choices. We will have two scrollings:

- The player is moving forward along with the camera.
- Background elements are moving at different speeds (in addition to the camera movement).

<md-note>
_Note_: You may ask: "Why don't we just set the camera as a child of the player object?". Indeed, in Unity, if you _set an object (camera or not) as a sub-child of a game object, this object will maintain its relative position_ to its parent. So if the camera is a child of the player and is centered on him, it will stay that way and will follow him exactly. It could be a solution, but this would not fit with our gameplay.
<br/><br/>In a _shmup_, the camera _restricts_ the player movement. If the camera moves along with the player for both horizontal and vertical axis, then the player is free to go where he wants. We _DO_ want to keep the player inside a restricted area.
<br/><br/>We would also recommend to always keep the camera independent in a 2D game. Even in a platformer, the camera isn't strictly linked to the player: it follows him under some restrictions. Super Mario World has probably one the best camera possible for a platformer. [You may have a look at how it is done][smw_camera].
</md-note>

## Spawning enemies

Adding a scrolling to our game has consequences, especially concerning enemies. Currently, they are just moving and shooting as soon as the game starts. However, we want them to wait and be invincible until they _spawn_.

How do we spawn enemies? It depends on the game, definitely. You could define events that spawn enemies when they are triggered, spawn points, pre-determined positions, etc.

_Here is what we will do_: We position the Poulpies on the scene directly (by dragging the `Prefab` onto the scene). By default, they are static and invincibles until the camera reaches and activates them.

[ ![Camera usage][camera_use] ][camera_use]

The nice idea here is that you can use the Unity editor to set the enemies. You read right: without doing anything, _you already have a level editor_.

[Once again, it's a choice, not science][stackgamedev_link]. ;)

<md-note>
_Note_: We truly think that using the Unity editor as a level editor is valuable, unless you have time, money and dedicated level designers that need special tools.
</md-note>

## Planes

First, we must define what our planes are and for each, if it's a loop or not. A looping background will repeat over and over again during the level execution. E.g., it's particularly useful for things like the sky.

Add a new layer to the scene for the background elements.

We are going to have:

| Layer                                      |   Loop   |    Position    |
| ------------------------------------------ | -------- | -------------- |
| Background with the sky                    | Yes      | `(0, 0, 10)`   |
| Background (1st row of flying platforms)   | No       | `(0, 0, 9)`    |
| Middleground (2nd row of flying platforms) | No       | `(0, 0, 5)`    |
| Foreground with players and enemies        | No       | `(0, 0, 0)`    |

[ ![Planes][planes] ][planes]

We could imagine to have some layers before the player too. Just keep the `Z` positions between `[0, 10]`, otherwise you will need to tweak the camera.

<md-warning>
_Careful with that axe, Eugene_: If you add layers ahead of the foreground layer, be careful with the visibility. Many games do not use this technique because it reduces the clearness of the game.
</md-warning>

# _Practice_: Diving into the code

Okay, we saw how implementing a parallax scrolling affects our game.

<md-info>
_Did you know?_ "Scrolling shooters" is another name used for the _shmups_.
</md-info>

But enough thoughts, time to practice!

Unity has some parallax scrolling scripts in its standard packages (take a look at the 2D platformer demo on the Asset Store). You can of course use them, but we found it would be interesting to build one from scratch the first time.

<md-warning>
_Standard packages_: These are practicals, but be careful to not abuse of them. Using standard packages can block your thoughts and will not make your game stand out of the crowd. They give a _Unity_ feel to your gameplay. <br />Remember all the flash game clones?
</md-warning>

## Simple scrolling

We will start with the easy part: scrolling backgrounds _without_ looping.

Remember the "MoveScript" we used before? The basis is the same: a speed and a direction applied over time.

Create a new "ScrollingScript" script:

```csharp
using UnityEngine;

/// <summary>
/// Parallax scrolling script that should be assigned to a layer
/// </summary>
public class ScrollingScript : MonoBehaviour
{
  /// <summary>
  /// Scrolling speed
  /// </summary>
  public Vector2 speed = new Vector2(2, 2);

  /// <summary>
  /// Moving direction
  /// </summary>
  public Vector2 direction = new Vector2(-1, 0);

  /// <summary>
  /// Movement should be applied to camera
  /// </summary>
  public bool isLinkedToCamera = false;

  void Update()
  {
    // Movement
    Vector3 movement = new Vector3(
      speed.x * direction.x,
      speed.y * direction.y,
      0);

    movement *= Time.deltaTime;
    transform.Translate(movement);

    // Move the camera
    if (isLinkedToCamera)
    {
      Camera.main.transform.Translate(movement);
    }
  }
}
```

Attach the script to these game objects with these values:

| Layer                   | Speed        | Direction    | Linked to Camera  |
| ----------------------- | ------------ | ------------ | ----------------- |
| 0 - Background          | `(1, 1)`     | `(-1, 0, 0)` | No                |
| 1 - Background elements | `(1.5, 1.5)` | `(-1, 0, 0)` | No                |
| 2 - Middleground        | `(2.5, 2.5)` | `(-1, 0, 0)` | No                |
| 3 - Foreground          | `(1, 1)`     | `(1, 0, 0)`  | Yes               |

For a convincing result, add elements to the scene:

- Add a third [background][background_url] part after the two previous ones.
- Add some small platforms in the layer `1 - Background elements`.
- Add platforms in the layer `2 - Middleground`.
- Add enemies on the right of the layer `3 - Foreground`, far from the camera.

The result:

[ ![Scrolling effect][scrolling1] ][scrolling1]

Not bad! But we can see that enemies move and shoot when they are out of the camera, even before they spawn!

Moreover, they are never recycled when they pass the player (zoom out in the "Scene" view, and look at the left of the scene: the Poulpies are still moving).

<md-note>
_Note_: Experiment with the values. :)
</md-note>

We'll fix these problems later. First, we need to manage the infinite background (the sky).

# Infinite background scrolling

In order to get an infinite background, we only need to watch the child which is at the left of the infinite layer.

When this object goes beyond the camera left edge, we move it to the right of the layer. _Indefinitely_.

[ ![Infinite scrolling theory][infinite_scrolling_definition] ][infinite_scrolling_definition]

For a layer filled with images, notice that you need a minimum size to cover the camera field, so we never see what's behind. Here it's 3 parts for the sky, but it's completely arbitrary.

_Find the correct balance between resource consumption and flexibility for your game._

In our case, the idea is that we will get all the children on the layer and check their renderer.

<md-note>
_A note about using the renderer component_: This method won't work with invisible objects (e.g., the ones handling scripts). However, a use case when you need to do this on invisible objects is unlikely.
</md-note>

We will use an handy method to check whether an object's renderer is visible by the camera. We've found it on [the community wiki][community_post_link]. It's neither a class nor a script, but a C# class [extension][extension_link].

<md-tip>
_Extension_: The C# language allows you to extend a class with extensions, without needing the base source code of the class. <br />Create a static method starting with a first parameter which looks like this: `this Type currentInstance`. The `Type` class will now have a new method available everywhere your own class is available. <br />Inside the extension method, you can refer to the current instance calling the method by using the `currentInstance` parameter instead of `this`.
</md-tip>

## The "RendererExtensions" script

Create a new C# file named "RendererExtensions.cs" and fill it with:

```csharp
using UnityEngine;

public static class RendererExtensions
{
  public static bool IsVisibleFrom(this Renderer renderer, Camera camera)
  {
    Plane[] planes = GeometryUtility.CalculateFrustumPlanes(camera);
    return GeometryUtility.TestPlanesAABB(planes, renderer.bounds);
  }
}
```

Simple, isn't it?

<md-danger>
_Namespaces_: You might have already noted that Unity doesn't add a namespace around a `MonoBehaviour` script when you create it from the "Project" view. And yet Unity _does_ handle namespaces... Except when you use a default value on a method parameter. And it sucks. <br /><br />In this tutorial, we are not using namespaces at all. However, in your real project, you might consider to use them. If not, prefix your classes and behaviours to avoid a collision with a third-party library (like _NGUI_).
</md-danger>

We will call this method on the leftmost object of the infinite layer.

## Full "ScrollingScript"

Observe the full "ScrollingScript" (explanations below):

```csharp
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

/// <summary>
/// Parallax scrolling script that should be assigned to a layer
/// </summary>
public class ScrollingScript : MonoBehaviour
{
  /// <summary>
  /// Scrolling speed
  /// </summary>
  public Vector2 speed = new Vector2(10, 10);

  /// <summary>
  /// Moving direction
  /// </summary>
  public Vector2 direction = new Vector2(-1, 0);

  /// <summary>
  /// Movement should be applied to camera
  /// </summary>
  public bool isLinkedToCamera = false;

  /// <summary>
  /// 1 - Background is infinite
  /// </summary>
  public bool isLooping = false;

  /// <summary>
  /// 2 - List of children with a renderer.
  /// </summary>
  private List<Transform> backgroundPart;

  // 3 - Get all the children
  void Start()
  {
    // For infinite background only
    if (isLooping)
    {
      // Get all the children of the layer with a renderer
      backgroundPart = new List<Transform>();

      for (int i = 0; i < transform.childCount; i++)
      {
        Transform child = transform.GetChild(i);

        // Add only the visible children
        if (child.renderer != null)
        {
          backgroundPart.Add(child);
        }
      }

      // Sort by position.
      // Note: Get the children from left to right.
      // We would need to add a few conditions to handle
      // all the possible scrolling directions.
      backgroundPart = backgroundPart.OrderBy(
        t => t.position.x
      ).ToList();
    }
  }

  void Update()
  {
    // Movement
    Vector3 movement = new Vector3(
      speed.x * direction.x,
      speed.y * direction.y,
      0);

    movement *= Time.deltaTime;
    transform.Translate(movement);

    // Move the camera
    if (isLinkedToCamera)
    {
      Camera.main.transform.Translate(movement);
    }

    // 4 - Loop
    if (isLooping)
    {
      // Get the first object.
      // The list is ordered from left (x position) to right.
      Transform firstChild = backgroundPart.FirstOrDefault();

      if (firstChild != null)
      {
        // Check if the child is already (partly) before the camera.
        // We test the position first because the IsVisibleFrom
        // method is a bit heavier to execute.
        if (firstChild.position.x < Camera.main.transform.position.x)
        {
          // If the child is already on the left of the camera,
          // we test if it's completely outside and needs to be
          // recycled.
          if (firstChild.renderer.IsVisibleFrom(Camera.main) == false)
          {
            // Get the last child position.
            Transform lastChild = backgroundPart.LastOrDefault();
            Vector3 lastPosition = lastChild.transform.position;
            Vector3 lastSize = (lastChild.renderer.bounds.max - lastChild.renderer.bounds.min);

            // Set the position of the recyled one to be AFTER
            // the last child.
            // Note: Only work for horizontal scrolling currently.
            firstChild.position = new Vector3(lastPosition.x + lastSize.x, firstChild.position.y, firstChild.position.z);

            // Set the recycled child to the last position
            // of the backgroundPart list.
            backgroundPart.Remove(firstChild);
            backgroundPart.Add(firstChild);
          }
        }
      }
    }
  }
}
```

_(The numbers in the comments refer to the explanations below)_

### Explanations

1. We need a public variable to turn on the "looping" mode in the "Inspector" view.
2. We also have to use a private variable to store the layer children.
3. In the `Start()` method, we set the `backgroundPart` list with the children that have a renderer. Thanks to a bit of [LINQ][linq_link], we order them by their `X` position and put the leftmost at the first position of the array.
4. In the `Update()` method, if the `isLooping` flag is set to `true`, we retrieve the first child stored in the `backgroundPart` list. We test if it's completely outside the camera field. When it's the case, we change its position to be after the last (rightmost) child. Finally, we put it at the last position of `backgroundPart` list.

Indeed, the `backgroundPart` is the exact representation of what is happening in the scene.

<br />Remember to enable the "Is Looping" property of the "ScrollingScript" for the `0 - Background` in the "Inspector" pane. Otherwise, it will (predictably enough) not work.

[![Infinite scrolling][infinite_scrolling]][infinite_scrolling_gif]

_(Click on the image to see the animation)_

Yes! We finally have a functional "parallax scrolling" implementation.

<md-note>
_Note:_ Why don't we use the `OnBecameVisible()` and `OnBecameInvisible()` methods? _Because they are broken._ <br /><br />The basic idea of these methods is to execute a fragment of code when the object is rendered (or vice-versa). They work like the `Start()` or `Stop()` methods (if you need one, simply add the method in the `MonoBehaviour` and Unity will use it).
<br /><br />The problem is that these methods are also called when rendered by the "Scene" view of the Unity editor. This means that we will not get the same behavior in the Unity editor and in a build (whatever the platform is). This is dangerous and absurd. _We highly recommend to avoid these methods._
</md-note>

# Bonus: Enhancing existing scripts

Let's update our previous scripts.

## Enemy v2 with spawn

We said earlier that enemies should be disabled until they are visible by the camera.

They should also be removed once they are completely off the screen.

We need to update "EnemyScript", so it will:

1. Disable the movement, the collider and the auto-fire (when initialized).
2. Check when the renderer is inside the camera sight.
3. Activate itself.
4. Destroy the game object when it's outside the camera.

_(The numbers refer to the comments in the code)_

```csharp
using UnityEngine;

/// <summary>
/// Enemy generic behavior
/// </summary>
public class EnemyScript : MonoBehaviour
{
  private bool hasSpawn;
  private MoveScript moveScript;
  private WeaponScript[] weapons;

  void Awake()
  {
    // Retrieve the weapon only once
    weapons = GetComponentsInChildren<WeaponScript>();

    // Retrieve scripts to disable when not spawn
    moveScript = GetComponent<MoveScript>();
  }

  // 1 - Disable everything
  void Start()
  {
    hasSpawn = false;

    // Disable everything
    // -- collider
    collider2D.enabled = false;
    // -- Moving
    moveScript.enabled = false;
    // -- Shooting
    foreach (WeaponScript weapon in weapons)
    {
      weapon.enabled = false;
    }
  }

  void Update()
  {
    // 2 - Check if the enemy has spawned.
    if (hasSpawn == false)
    {
      if (renderer.IsVisibleFrom(Camera.main))
      {
        Spawn();
      }
    }
    else
    {
      // Auto-fire
      foreach (WeaponScript weapon in weapons)
      {
        if (weapon != null && weapon.enabled && weapon.CanAttack)
        {
          weapon.Attack(true);
        }
      }

      // 4 - Out of the camera ? Destroy the game object.
      if (renderer.IsVisibleFrom(Camera.main) == false)
      {
        Destroy(gameObject);
      }
    }
  }

  // 3 - Activate itself.
  private void Spawn()
  {
    hasSpawn = true;

    // Enable everything
    // -- Collider
    collider2D.enabled = true;
    // -- Moving
    moveScript.enabled = true;
    // -- Shooting
    foreach (WeaponScript weapon in weapons)
    {
      weapon.enabled = true;
    }
  }
}
```

Start the game. Yes, there's a bug.

Disabling the "MoveScript" as a negative effect: The player never reaches the enemies as they're all moving with the `3 - Foreground` layer scrolling:

[ ![camera_moving_along_gif][camera_moving_along_gif]][camera_moving_along_gif]

_Remember: we've added a "ScrollingScript" to this layer in order to move the camera along with the player._

But there is a simple solution: move the "ScrollingScript" from the `3 - Foreground` layer to the player!

Why not after all? The only thing that is moving in this layer is him, and the script is not specific to a kind of object.

Push the "Play" button and observe: It works.

1. Enemies are disabled until they spawn (i.e., until the camera reaches their positions).
2. Then they disappear when they are outside the camera.

[ ![Enemy spawn][enemy_spawn] ][enemy_spawn_gif]

_(Click on the image to see what happens)_

## Keeping the player in the camera bounds

You might have noticed that the player is not (yet) restricted to the camera area. "Play" the game, push the "Left Arrow" and watch him leaves the camera.

We have to fix that.

Open the "PlayerScript", and add this at the end of the "Update()" method:

```csharp
  void Update()
  {
    // ...

    // 6 - Make sure we are not outside the camera bounds
    var dist = (transform.position - Camera.main.transform.position).z;

    var leftBorder = Camera.main.ViewportToWorldPoint(
      new Vector3(0, 0, dist)
    ).x;

    var rightBorder = Camera.main.ViewportToWorldPoint(
      new Vector3(1, 0, dist)
    ).x;

    var topBorder = Camera.main.ViewportToWorldPoint(
      new Vector3(0, 0, dist)
    ).y;

    var bottomBorder = Camera.main.ViewportToWorldPoint(
      new Vector3(0, 1, dist)
    ).y;

    transform.position = new Vector3(
      Mathf.Clamp(transform.position.x, leftBorder, rightBorder),
      Mathf.Clamp(transform.position.y, topBorder, bottomBorder),
      transform.position.z
    );

    // End of the update method
  }
```

Nothing complicated, just verbose.

We get the camera edges and we make sure the player position (_the center of the sprite_) is inside the area borders.

Tweak the code to better understand what is happening.

# Next step

We have a scrolling shooter!

We have just learned how to add a scrolling mechanism to our game, as well as a parallax effect for the background layers. However, the current code only works for right to left scrolling. But with your new knowledge, you should be able to enhance it and make it work for all scrolling directions (bonus: [We did it as someone was stuck on the subject, click to see the code and an animation](https://gist.github.com/Valryon/7547513)).


Still, _the game really needs some tweaks to be playable_. For example:

- Reducing the sprite sizes.
- Adjusting the speeds.
- Adding more enemies.
- _Making it fun_.

We will address these points in our upcoming chapter about gameplay tweaking (not released yet, unfortunately). For the moment, you can experiment. ;)

In the next chapter, we will focus our attention on how to make the game a bit more... _flashy_. With particles!


[camera_use]: ./-img/camera_use.png
[planes]: ./-img/planes.png
[scrolling1]: ./-img/scrolling1.gif
[infinite_scrolling_definition]: ./-img/infinite_scrolling_definition.png
[infinite_scrolling]: ./-img/infinite_scrolling.png
[infinite_scrolling_gif]: ./-img/infinite_scrolling.gif
[enemy_spawn]: ./-img/enemy_spawn.png
[enemy_spawn_gif]: ./-img/enemy_spawn.gif
[background_url]: ../background-and-camera/-img/background.png
[camera_moving_along_gif]: ./-img/camera_moving_along.gif

[parallax_link]: http://en.wikipedia.org/wiki/Parallax_scrolling "Parallax Scrolling"
[space_invaders_link]: http://en.wikipedia.org/wiki/Space_Invaders "Space Invaders"
[stackgamedev_link]: http://gamedev.stackexchange.com/questions/2712/enemy-spawning-method-in-a-top-down-shooter "Spawning methods"
[community_post_link]: http://wiki.unity3d.com/index.php?title=IsVisibleFrom "Is an object visible by the camera?"
[extension_link]: http://msdn.microsoft.com/en-us/library/vstudio/bb383977.aspx "C# Extension Methods"
[linq_link]: http://msdn.microsoft.com/fr-fr/library/bb397926.aspx "LINQ"
[smw_camera]: http://www.youtube.com/watch?v=TCIMPYM0AQg "Super Mario World Camera logic review"
