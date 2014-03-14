---
layout: tutorial
title: Unity and touch controls
author: Damien
date: 15/03/14

tutorial:
  name: Unity and touch controls
  link: ./
---

Welcome to a short Pixelnest's tutorial. We will make a simple "game" where touching the screen trigger particles effects.

[ ![The result][result]][result_gif]

_(Click to see the animation)_

This is an advanced chapter. If you are new to Unity, we recommend you to follow our [beginner's tutorial first][tutorial].

# Disclaimer

We will cover the basics of touch controls on mobile devices.

Developing for a mobile platform require you to have an appropriate device and the full SDK installed on your computer.

No wonder: deploying on iOS require you to have a Mac with Xcode.

Same for Android and Windows Phone: you need to have a working copy of the SDK.

If you are really new to mobile development, follow the official developer documentation and make a "Hello World" app to ensure the SDK is properly working.

Here are the official places to find those resources:

- [iOS (iPads, iPhones, iPods)](https://developer.apple.com/devcenter/ios/index.action)
- [Android](http://developer.android.com/index.html)
- [Windows Phone](http://dev.windowsphone.com/)

# Testing environments

Mobile deployment with Unity is fastidious. It takes several minutes to fully deploy a project on a device.

This is because you cannot **test directly** on the device, you have to build, open the Xcode project, compile then deploy.

Fortunately, Unity comes with a small iOS/Adnroid app: [Unity Remote](http://docs.unity3d.com/Documentation/Manual/unity-remote.html). It allows the device to connect to your Unity via the local network.

Using the app, the touch screen become a usable interface with a degraded live preview from your computer. 

This is the only way to debug touch controls, but you still need to fully deploy to test the app on the device. 

<md-note>
_Note_: the iOS app only works with a Mac.
</md-note>

# Setup project

Let's start! We will first define some prefabs and setup our project and then focus on the touch gestures. 

Create a new 2D project. Now follow the following steps.

## Explosion prefab

Import the following star texture. (It's white on blank, but it's a star)

[ ![Star][particles_stars]][particles_stars]

Set it as "Texture".

[ ![Star import settings][stars_import]][stars_import]

Make an explosion prefab. Here is an idea.

[ ![Explosion settings][explosion]][explosion]

| Parameter | Value   | 
|-----------|---------|
| Duration | 3.00 |
| Start Lifetime | 3.00 |
| Start speed | 10 |
| Start size | 0.5 |
| Simulation space | World |
| Gravity multiplier | 1 |
| Max particles | 30 |
| Bursts | 0:00 -> 30 |
| Shape | Sphere |
| Radius | 0.5 |
| Random direction | true |
| Color over lifetime | rainbow gradient (see below) |

The rainbow gradient:

[ ![Rainbow gradient][rainbow]][rainbow]

The result:

[ ![Explosion preview][explosion_gif]][explosion_gif]

You can tweak it as you like, it's just a possibility.

Make sure to save it as a prefab.

## The trail prefab

Create a new empty game object.
Add a ``Trail Renderer`` component.

We will "rainbow" it too.

Create a new material with the shader "Sprite/Default".
Affect the material to the ``Trail Renderer``.

Set some colors, tweaks the size, like below:

[![Trail][trail]][trail]

(Move it in the scene to preview the trail). 

Make sure to save it as a prefab.

## A "vortex" prefab

If you like particles, try to reproduce this one. It's just very slow looping, particles, nearly not moving with a high spawn rate.

[ ![Vortex preview][vortex_gif]][vortex_gif]

## The camera

Change the camera background to black. Set the ``Size`` to ``10``. 

## Special effects helper script

This is a simple script that will handle everything related to the explosions and other effects creation.

Create a new ``SpecialEffectsScript``, copy the code below.

````csharp
using UnityEngine;

/// <summary>
/// Helper class to handle particles effects
/// </summary>
public class SpecialEffectsScript : MonoBehaviour
{
  private static SpecialEffectsScript instance;

  // Prefabs
  public ParticleSystem explosionEffect, vortexEffect;
  public GameObject trailPrefab;

  void Awake()
  {
    instance = this;
  }

  void Start()
  {
    // Check prefabs
    if (explosionEffect == null)
      Debug.LogError("Missing Explosion Effect!");
    if (vortexEffect == null)
      Debug.LogError("Missing Vortex Effect!");
    if (trailPrefab == null)
      Debug.LogError("Missing Trail Prefab!");
  }

  /// <summary>
  /// Create an explosion at the given position
  /// </summary>
  /// <param name="position"></param>
  public static ParticleSystem MakeExplosion(Vector3 position)
  {
    if (instance == null)
    {
      Debug.LogError("There is no SpecialEffectsScript in the scene!");
      return null;
    }

    ParticleSystem effect = Instantiate(instance.explosionEffect) as ParticleSystem;
    effect.transform.position = position;

    // Program destruction at the end of the effect
    Destroy(effect.gameObject, effect.duration);

    return effect;
  }

  /// <summary>
  /// Create a particle vortex at the given position
  /// </summary>
  /// <param name="position"></param>
  public static ParticleSystem MakeVortex(Vector3 position)
  {
    if (instance == null)
    {
      Debug.LogError("There is no SpecialEffectsScript in the scene!");
      return null;
    }

    ParticleSystem effect = Instantiate(instance.vortexEffect) as ParticleSystem;
    effect.transform.position = position;

    return effect;
  }

  /// <summary>
  /// Create a new trail at the given position
  /// </summary>
  /// <param name="position"></param>
  /// <returns></returns>
  public static GameObject MakeTrail(Vector3 position)
  {
    if (instance == null)
    {
      Debug.LogError("There is no SpecialEffectsScript in the scene!");
      return null;
    }

    GameObject trail = Instantiate(instance.trailPrefab) as GameObject;
    trail.transform.position = position;

    return trail;
  }
}

````

**Add the script to the scene**. Fill it with prefabs.

[![The SFX script object][fill_prefabs]][fill_prefabs]

Enough prepration, it's time to dig deeper in the subject: touch controls!

# Touching stars

The main purpose of our little game/app/demo will be to **trigger effects** (explosion, vortex, as made in the first part) when the player is **touching the screen**.

Depending on the touch gesture (tap, swipe, pinch to zoom, etc), we will trigger an effect or another. This way, we will be able to see if the right gesture is recognized as it should be.

## Create the script

Create a new empty script ``GameScript``. 

````csharp
using UnityEngine;

public class GameScript : MonoBehaviour
{
  void Update()
  {
	// Here we will insert gesture recognition
  }
}

````

**Add the script to the scene**.

## Touch inputs

Let's handle some common touch gestures.

### A bit of documentation

The generic ``Input`` class centralize all type of inputs information in once place, be it the keyboard, a joystick or touches.

The ``Input.touches`` is a collection of ``Touch``and contains the available touches event and their state at a given frame.

A ``Touch`` is a finger information container that we will inspect any time we need to handle touch controls. 

### Tap

The tap is a brief pressure from a finger. Like a click.

In the GameScript's ``Update()`` method, add:

````csharp
void Update()
{
  // Look for all fingers
  for (int i = 0; i < Input.touchCount; i++)
  {
    Touch touch = Input.GetTouch(i);

    // -- Tap: quick touch & release
  	// ------------------------------------------------
    if (touch.phase == TouchPhase.Ended && touch.tapCount == 1)
    {
      // Touch are screens location. Convert to world
      Vector3 position = Camera.main.ScreenToWorldPoint(touch.position);

      // Effect for feedback
      SpecialEffectsScript.MakeExplosion((position));
    }
  }
}
````
We look at every finger registered in the ``Input`` classes and, if the finger has just been moved off the screen, we make an explosion where it has been.

This would work with less detection, but this way we make sure it's not another sort of gesture for what comes next.

<md-note>
_Note_: ``touch.position`` is a screen location, not a world one. That's why we must first use ``Camera.main.ScreenToWorldPoint`` to get the world position.
</md-note>

The result:

[![Tap explosions][tap_gif]][tap_gif]

### Drag

Let's make a trail when the user touch the screen and drag its finger across the screen.

First, add a new member that will contain the association between a finger and a trail:

```csharp
private Dictionary<int, GameObject> trails = new Dictionary<int, GameObject>();
```

Then, in ``Update()``, in the ``for`` loop:

```csharp

// -- Drag
// ------------------------------------------------
if (touch.phase == TouchPhase.Began)
{
  // Store this new value
  if (trails.ContainsKey(i) == false)
  {
    Vector3 position = Camera.main.ScreenToWorldPoint(touch.position);
    position.z = 0; // Make sure the trail is visible

    GameObject trail = SpecialEffectsScript.MakeTrail(position);

    if (trail != null)
    {
      Debug.Log(trail);
      trails.Add(i, trail);
    }
  }
}
else if (touch.phase == TouchPhase.Moved)
{
  // Move the trail
  if (trails.ContainsKey(i))
  {
    GameObject trail = trails[i];

    Camera.main.ScreenToWorldPoint(touch.position);
    Vector3 position = Camera.main.ScreenToWorldPoint(touch.position);
    position.z = 0; // Make sure the trail is visible

    trail.transform.position = position;
  }
}
else if (touch.phase == TouchPhase.Ended)
{
  // Clear known trails
  if (trails.ContainsKey(i))
  {
    GameObject trail = trails[i];

    // Let the trail fade out
    Destroy(trail, trail.GetComponent<TrailRenderer>().time);
    trails.Remove(i);
  }
}
```

A bit verbose but quite simple:

1. If the touch is a new one, we create a new trail and associate it to the finger via the dictionary
2. When the finger move, if we have a trail associated to it, we move the trail's game object
3. When the finger is released, we destroy the trail. 

The result:

[![Trails from fingers][trail_gif]][trail_gif]

## Pinch

The pinch is the typical zoom/unzoom gesture. Two fingers getting closer or further.

We need some new variables to store the first position of the fingers. This way, we can compute the actual distance difference. We also store the vortex effect played for the gesture to be able to update and delete it.

````csharp
private Touch pinchFinger1, pinchFinger2;
private ParticleSystem vortex;
````

Add this to the ``Update`` method, **outside** the for loop!

````csharp
// -- Pinch
// ------------------------------------------------
// Works only with two fingers
if (Input.touchCount == 2)
{
  var finger1 = Input.GetTouch(0);
  var finger2 = Input.GetTouch(1);

  if (finger1.phase == TouchPhase.Began && finger2.phase == TouchPhase.Began)
  {
    this.pinchFinger1 = finger1;
    this.pinchFinger2 = finger2;
  }

  // On move, update
  if (finger1.phase == TouchPhase.Moved || finger2.phase == TouchPhase.Moved)
  {
    float baseDistance = Vector2.Distance(this.pinchFinger1.position, this.pinchFinger2.position);
    float currentDistance = Vector2.Distance(finger1.position, finger2.position);

    // Purcent
    float currentDistancePurcent = currentDistance / baseDistance;

    // Create an effect between the fingers if it doesn't exists
    if (vortex == null)
    {
      Vector3 finger1position = Camera.main.ScreenToWorldPoint(this.pinchFinger1.position);
      Vector3 finger2position = Camera.main.ScreenToWorldPoint(this.pinchFinger2.position);

      // Find the center between the two fingers
      Vector3 vortexPosition = Vector3.Lerp(finger1position, finger2position, 0.5f);
      vortex = SpecialEffectsScript.MakeVortex(vortexPosition);
    }

    // Take the base scale and make it smaller/bigger 
    vortex.transform.localScale = Vector3.one * (currentDistancePurcent * 1.5f);
  }
}
else
{
  // Pinch release ?
  if (vortex != null)
  {
    // Create explosions!!!!!!!!!!!
    for (int i = 0; i < 10; i++)
    {
      var explosion = SpecialEffectsScript.MakeExplosion(vortex.transform.position);
      explosion.transform.localScale = vortex.transform.localScale;
    }

    // Destroy vortex
    Destroy(vortex.gameObject);
  }

  // ...
  // previous for loop HERE
  // ...
}
````

Yes, the pinch is slightly more complicated, mainly because we don't want it do be taken for anything else.

If two fingers are on the screen, we create a new vortex in the middle. and declare it's a pinch-to-zoom gesture.

Then, if the fingers move, we move and scale the vortex.

Finally, as soon as one finger is missing, the vortex becomes some explosions and the gesture is over.

# The full script

````csharp
using System.Collections.Generic;
using UnityEngine;

public class GameScript : MonoBehaviour
{
  private Dictionary<int, GameObject> trails = new Dictionary<int, GameObject>();
  private Touch pinchFinger1, pinchFinger2;
  private ParticleSystem vortex;

  void Update()
  {
    // -- Pinch
    // ------------------------------------------------
    // Works only with two fingers
    if (Input.touchCount == 2)
    {
      var finger1 = Input.GetTouch(0);
      var finger2 = Input.GetTouch(1);

      if (finger1.phase == TouchPhase.Began && finger2.phase == TouchPhase.Began)
      {
        this.pinchFinger1 = finger1;
        this.pinchFinger2 = finger2;
      }

      // On move, update
      if (finger1.phase == TouchPhase.Moved || finger2.phase == TouchPhase.Moved)
      {
        float baseDistance = Vector2.Distance(this.pinchFinger1.position, this.pinchFinger2.position);
        float currentDistance = Vector2.Distance(finger1.position, finger2.position);

        // Purcent
        float currentDistancePurcent = currentDistance / baseDistance;

        // Create an effect between the fingers if it doesn't exists
        if (vortex == null)
        {
          Vector3 finger1position = Camera.main.ScreenToWorldPoint(this.pinchFinger1.position);
          Vector3 finger2position = Camera.main.ScreenToWorldPoint(this.pinchFinger2.position);

          // Find the center between the two fingers
          Vector3 vortexPosition = Vector3.Lerp(finger1position, finger2position, 0.5f);
          vortex = SpecialEffectsScript.MakeVortex(vortexPosition);
        }

        // Take the base scale and make it smaller/bigger 
        vortex.transform.localScale = Vector3.one * (currentDistancePurcent * 1.5f);
      }
    }
    else
    {
      // Pinch release ?
      if (vortex != null)
      {
        // Create explosions!!!!!!!!!!!
        for (int i = 0; i < 10; i++)
        {
          var explosion = SpecialEffectsScript.MakeExplosion(vortex.transform.position);
          explosion.transform.localScale = vortex.transform.localScale;
        }

        // Destroy vortex
        Destroy(vortex.gameObject);
      }

      // Look for all fingers
      for (int i = 0; i < Input.touchCount; i++)
      {
        Touch touch = Input.GetTouch(i);

        // -- Tap: quick touch & release
        // ------------------------------------------------
        if (touch.phase == TouchPhase.Ended && touch.tapCount == 1)
        {
          // Touch are screens location. Convert to world
          Vector3 position = Camera.main.ScreenToWorldPoint(touch.position);

          // Effect for feedback
          SpecialEffectsScript.MakeExplosion((position));
        }
        else
        {
          // -- Drag
          // ------------------------------------------------
          if (touch.phase == TouchPhase.Began)
          {
            // Store this new value
            if (trails.ContainsKey(i) == false)
            {
              Vector3 position = Camera.main.ScreenToWorldPoint(touch.position);
              position.z = 0; // Make sure the trail is visible

              GameObject trail = SpecialEffectsScript.MakeTrail(position);

              if (trail != null)
              {
                Debug.Log(trail);
                trails.Add(i, trail);
              }
            }
          }
          else if (touch.phase == TouchPhase.Moved)
          {
            // Move the trail
            if (trails.ContainsKey(i))
            {
              GameObject trail = trails[i];

              Camera.main.ScreenToWorldPoint(touch.position);
              Vector3 position = Camera.main.ScreenToWorldPoint(touch.position);
              position.z = 0; // Make sure the trail is visible

              trail.transform.position = position;
            }
          }
          else if (touch.phase == TouchPhase.Ended)
          {
            // Clear known trails
            if (trails.ContainsKey(i))
            {
              GameObject trail = trails[i];

              // Let the trail fade out
              Destroy(trail, trail.GetComponent<TrailRenderer>().time);
              trails.Remove(i);
            }
          }
        }
      }
    }
  }
}
````

# Testing & deployment

To fully test on the device, see our [deployment chapter][deployment] in our previous tutorial.

# Contact and feedback

If you find a typo, a mistake or a misspelling, let us know on our [twitter](https://www.twitter.com/pixelnest). You can also contact us by [mail](mailto:site@pixelnest.io).

If you want further informations about a specific topic, or a clarification on a chapter, we would be happy to hear you too.

This tutorial was mainly redacted by Damien, and edited by Matthieu. We hope you will enjoy it.


[result]: ./-img/result.png
[result_gif]: ./-img/result.gif

[tutorial]: http://pixelnest.io/tutorials/2d-game-unity/

[particles_stars]: ./-img/particles_stars.png
[stars_import]: ./-img/stars_import.png

[explosion]: ./-img/explosion.png
[explosion_gif]: ./-img/explosion.gif
[rainbow]: ./-img/rainbow.png

[trail]: ./-img/trail.png

[vortex_gif]: ./-img/vortex.gif

[fill_prefabs]: ./-img/fill_prefabs.png

[background]: ./-img/background.png

[trail_gif]: ./-img/trails.gif
[tap_gif]: ./-img/taps.gif

[deployment]: http://pixelnest.io/tutorials/2d-game-unity/deployment/
