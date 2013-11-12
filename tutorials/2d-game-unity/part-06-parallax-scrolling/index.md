---
layout: tutorial
title: Parallax scrolling
subtitle: Creating a 2D game with Unity
author: Damien
previous_link:../part-05-shooting-2
next_link: ../part-07-particles
---

## Chapters

<Sommaire ici>

## Summary

It is time to enhance our background and scene. One effect you find in every single 2D game since 15 years is [the parallax scrolling](http://en.wikipedia.org/wiki/Parallax_scrolling).

It's a cool and easy to achieve effect that makes a nice scrolling effect. Shoot them up are usually using the scrolling (except the original one, Space Invaders) so I find it interesting to implement it in Unity.

## Theorical part: defining the parallax in our game

How are we gonna use the parallax? 

### Moving the camera or level on a treadmill 

Is it the player and the camera that moves or is the player and the camera static and the level is on a sort of treadmill?

The first choice is interesting if you have a **perspective** camera, because the parallax is obvious: elements in background are behind us and seems to move slower.

But in 2D we have the orthographic camera, and we don't have depth at render.

We can also choose to mix both. We will have two scrolling:

- the player moving forward along with the camera
- backgrounds moving at different speeds, opposed to the first the scrolling

As the camera is moving, background will have their own speed + the main scrolling speed applied.

### Enemy spawn decisions

This has consequences, especially for the enemy spawn. For now they are just moving and shooting as soon as the game starts. But we probably want them to wait and be invincible until they "spawn".

What is spawning an enemy? It depends on the game, definitely. Here this is what we will define: enemies are static and invincible until the camera reach and activate them.

 [![Camera usage][camera_use]][camera_use]

The idea here is that you can use the camera to place the waves of enemies. This gives you a **ready to use level editor**.

Once again, it's a choice, not science ;).But I truly think that using Unity editor as a level editor is valuable, unless you have time, money and dedicated level designers that need special tools.

### Planes

We need to define what our planes are, and for each, if it is a loop or not. A looping background will repeat over and over. It is useful for things like the sky or space for example.

We will add a new layer for background elements, to accentuate the parallax effect.
So we are going to have:

- A background with the sky, looping.
  Position : (0,0,10)
- A background for flying platforms.
  Position : (0,0,9)
- A middleground for flying platforms.
  Position : (0,0,5)
- A foreground for players and enemies.
  Position : (0,0, 0)

 [![Planes][planes]][planes]

We could imagine to have layers in front of the player too, easily. Just keep the z positions between [0, 10] otherwise you need to tweak the camera.

## Diving into the code

You saw that when the scrolling is at the core of your gameplay ("scrolling shooters" are another name for shoot them up), you must takes decisions.

But enough thoughts, time to practice!

Unity has some parallax scrolling scripts in its package. You can of course use them, but I found it interesting to build one from scratch the first time.

## The simple scrolling

We will start with the easy thing: scrolling backgrounds **without** looping.

Remember the _MoveScript_ we used before? The basis is the same: speed + direction applied over the time. We will add the camera support.

Create a new "ScrollingScript" script:

`````csharp
using UnityEngine;

/// <summary>
/// Parallax scrolling script that should be assigned to a layer
/// </summary>
public class ScrollingScript : MonoBehaviour
{
  /// <summary>
  /// Scrolling speed
  /// </summary>
  public Vector2 Speed = new Vector2(2, 2);

  /// <summary>
  /// Moving direction
  /// </summary>
  public Vector2 Direction = new Vector2(-1, 0);

  /// <summary>
  /// Movement should be applied to camera
  /// </summary>
  public bool IsLinkedToCamera = false;

  void Update()
  {
    // Movement
    Vector3 movement = new Vector3(
      Speed.x * Direction.x,
      Speed.y * Direction.y,
      0);

    movement *= Time.deltaTime;
    transform.Translate(movement);

    // Move the camera
    if (IsLinkedToCamera)
    {
      Camera.main.transform.Translate(movement);
    }
  }
}
`````

Add it to every layer ("0 - Background", "1 - Background elements", etc).

Values I propose are:

<table>
<tr>
	<th>Layer</th>
	<th>Speed</th>
	<th>Direction</th>
	<th>Linked to Camera</th>
</tr>
<tr>
	<td>0 - Background</td>
	<td>(1,1)</td>
	<td>(-1,0,0)</td>
	<td>No</td>
</tr>
<tr>
	<td>1 - Background elements</td>
	<td>(1.5,1.5)</td>
	<td>(-1,0,0)</td>
	<td>No</td>
</tr>
<tr>
	<td>2 - Middleground</td>
	<td>(2.5,2.5)</td>
	<td>(-1,0,0)</td>
	<td>No</td>
</tr>
<tr>
	<td>3 - Foreground</td>
	<td>(1,1)</td>
	<td>(1,0,0)</td>
	<td>**Yes**</td>
</tr>
</table>

For a convincing result, add elements to the scene:
- Duplicate the backgrounds part and make them follow the two previous ones.
- Add small platforms in the background elements layer
- Add platforms in the middleground layer
- Add enemies far from the camera on the right 

The result, with the editor view that I find interesting to see:

[![Scrolling effect][scrolling1]][scrolling1]

For now we also see that enemies moves and shot out of the camera. They also never get recycled after their role is done.

But first thing first, infinite backgrounds.

## Infinite background scrolling

We need to mainly add code to get an infinite scrolling. We need to watch the child of the infinite layer that is to the left.

When this object goes beyond the camera, it is moved to the current end. And so on.

[![Infinite scrolling theory][infinite_scrolling_definition]][infinite_scrolling_definition]

For a filled background, notice that you need a minimum size to cover all the camera so we never the what is behind. Here it's 3 parts for the sky.

So the idea is we will get every children on the layer and check its renderer. So it won't work for invisible objects (as the one handling scripts) but I am not sure there is a use case where you need them to repeat too.

We will a nice method to check whether an object's renderer is visible or not. I found it on [the community wiki](http://wiki.unity3d.com/index.php?title=IsVisibleFrom). It is not a class or a script, it's a C# extension. 

Create a new C# file named "RendererExtensions.cs" and fill it with:
`````csharp
using UnityEngine;

public static class RendererExtensions
{
  public static bool IsVisibleFrom(this Renderer renderer, Camera camera)
  {
    Plane[] planes = GeometryUtility.CalculateFrustumPlanes(camera);
    return GeometryUtility.TestPlanesAABB(planes, renderer.bounds);
  }
}
`````

We will call this method on the last object of the looping layer.

Now the full "ScrollingScript", using few LINQ features:

`````csharp
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
  public Vector2 Speed = new Vector2(10, 10);

  /// <summary>
  /// Moving direction
  /// </summary>
  public Vector2 Direction = new Vector2(-1, 0);

  /// <summary>
  /// Movement should be applied to camera
  /// </summary>
  public bool IsLinkedToCamera = false;

  /// <summary>
  /// Background is inifnite
  /// </summary>
  public bool IsLooping = false;

  private List<Transform> backgroundPart;

  void Start()
  {
    // For infinite background only
    if (IsLooping)
    {
      // Get all part of the layer
      backgroundPart = new List<Transform>();

      for (int i = 0; i < transform.childCount; i++)
      {
        Transform child = transform.GetChild(i);

        // Only visible children
        if (child.renderer != null)
        {
          backgroundPart.Add(child);
        }
      }

      // Sort by position 
      // REM: left from right here, we would need to add few conditions to handle all scrolling directions
      backgroundPart = backgroundPart.OrderBy(t => t.position.x).ToList();
    }
  }

  void Update()
  {
    // Movement
    Vector3 movement = new Vector3(
      Speed.x * Direction.x,
      Speed.y * Direction.y,
      0);

    movement *= Time.deltaTime;
    transform.Translate(movement);

    // Move the camera
    if (IsLinkedToCamera)
    {
      Camera.main.transform.Translate(movement);
    }

    // Loop
    if (IsLooping)
    {
      // Get the first object
      Transform firstChild = backgroundPart.FirstOrDefault();

      if (firstChild != null)
      {
        // Check if we are after the camera
        // Position first as IsVisibleFrom is a heavy method
        if (firstChild.position.x < Camera.main.transform.position.x)
        {
          if (firstChild.renderer.IsVisibleFrom(Camera.main) == false)
          {
            // Get the last positions
            Transform lastChild = backgroundPart.LastOrDefault();
            Vector3 lastPosition = lastChild.transform.position;
            Vector3 lastSize = (lastChild.renderer.bounds.max - lastChild.renderer.bounds.min);

            // Set position after
            // REM: here too it works for horizontal scrolling only
            firstChild.position = new Vector3(lastPosition.x + lastSize.x, firstChild.position.y, firstChild.position.z);

            // Set as last
            backgroundPart.Remove(firstChild);
            backgroundPart.Add(firstChild);
          }
        }
      }
    }
  }
}
`````

Remember to enable "IsLooping" in the first (0) background otherwise it won't work.

[![Infinite scrolling][infinite_scrolling]][infinite_scrolling_gif]

## Bonus: enhancing existing scripts

Let's update our previous scripts.

### Enemy v2 with spawn

I said earlier that enemies should be disabled until they are visible. They should also be removed once completely off screen on the left.

Let's update _EnemyScript_ so it will:

- disable moving and shooting at start
- check when the enemy's renderer is in camera sight
- destroy when the enemy fully leave the camera 

`````csharp
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
    // Check if the enemy has spawned
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

      // Out of camera?
      if (renderer.IsVisibleFrom(Camera.main) == false)
      {
        Destroy(gameObject);
      }
    }
  }

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
`````

But you won't be able to test it yet. Disabling the _MoveScript_ as a negative effect: the player never reaches the enemies as they're all moving along.

I see a simple solution: move the _ScrollingScript_ from the layer to the player!
(A more complicated one could be to set up an exclusion list in the scrolling list for objects that shouldn't be affected.. or a tag, or a Unity layer)

Why not after all? The only thing that is moving in the layer is him, and the script is not specific to a kind of object.

It works, enemies are static and invincible until they spawn. Then they disappear when they reach the end of the camera. Click to see a gif:

[![Enemy spawn][enemy_spawn]][enemy_spawn_gif]

I don't like the fact that waves of enemies are broken if they are in line (the first one starts without the others), it's a side effect that is not simple to correct.

### Keeping the player in the camera bounds

Open _PlayerScript_, and add this at the end of the "Update()" method.

`````csharp
  void Update()
  {
	...

    // 6 - Make sure we are not outside the camera bounds
    var dist = (transform.position - Camera.main.transform.position).z;
    var leftBorder = Camera.main.ViewportToWorldPoint(new Vector3(0, 0, dist)).x;
    var rightBorder = Camera.main.ViewportToWorldPoint(new Vector3(1, 0, dist)).x;
    var topBorder = Camera.main.ViewportToWorldPoint(new Vector3(0, 0, dist)).y;
    var bottomBorder = Camera.main.ViewportToWorldPoint(new Vector3(0, 1, dist)).y;

    transform.position = new Vector3(
              Mathf.Clamp(transform.position.x, leftBorder, rightBorder),
              Mathf.Clamp(transform.position.y, topBorder, bottomBorder),
              transform.position.z
              ); 
  }
`````

It is not complicated, just verbose: we get the camera edges and we make sure the player position (**the center of the sprite**) is in the borders.

## Ready for the next step

We now have a scrolling shooter! The code is for right to left scrolling only as I didn't want to have too big scripts but you should be able to enhance that in few more lines.

The game really need some tweaks to be playable: 

- Reducing sprite sizes
- Adjusting speeds
- More enemies

You can have fun doing that, or wait to read what Matthieu has written about it for you in few steps.

So we have a level, enemies that can move (try to change their direction in y to get new patterns). 

We will some fun stuff now, first particles then sounds!

[Take me to the next step]()

[camera_use]: ./camera_use.png
[planes]: ./planes.png

[scrolling1]: ./scrolling1.gif
[infinite_scrolling_definition]: ./infinite_scrolling_definition.png

[infinite_scrolling]: ./infinite_scrolling.png
[infinite_scrolling_gif]: ./infinite_scrolling.gif
[enemy_spawn]: ./enemy_spawn.png
[enemy_spawn_gif]: ./enemy_spawn.gif
