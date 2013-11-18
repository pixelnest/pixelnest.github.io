---
layout: tutorial
title: Playing with particles
date: 13/11/13

tutorial:
  name: Creating a 2D game with Unity
  link: ../

links:
  summary: ../table-of-contents
  previous: ../parallax-scrolling
  next: ../sounds
---

Our shooter is starting to have a good shape. It's time to enhance it a bit visually with _particles_.

Particles are (basically) simple sprites that will be repeated and displayed for a very short timespan.

Think about explosions, lasers, smokes, etc. Those are done with particles — most of the time (an explosion can be a simple animated sprite).

Unity provides a powerful built-in editor for particles with the _Shuriken Engine_. Let's see what we can do with it.

# Explosion prefab

We will make an explosion that is going to be used when an enemy or a player is destroyed. This involves to:

1. Create a particle system of our explosion (as a prefab).
2. Instantiate and play it when needed.

An explosion is usually made of two things: fire and smoke.

## Smoke particles

Create a new "Particle System" ("Game Object" -> "Create Other" -> "Particle System").

<md-tip>
_Tip_: We recommend that you work on an empty part of the scene (or in an empty scene) so you can clearly see what is happening. <br /><br />If you want to focus on an object in the "Scene" view, you can `double-click` on it in the "Hierarchy", or press `F` inside the "Scene" view.
</md-tip>

By zooming on your particle system, you will see a continuous flow of sparks emitted by the particles game object:

[![Creating a new particle system][new_particle_system]][new_particle_system]

Observe the new window (with "Pause" and "Stop") in the "Scene" view, or the "Inspector" pane. Yes, the latter is now filled with dozen of fields related to the particle system.

_And that's where all the fun lie!_

<md-note>
_Note_: When you select a particle system in the "Hierarchy", it starts simulating the system. If you unselect it, it stops. It's really practical to see what the system does in real (and instantly) when you conceive it.
</md-note>

We will use this sprite for the smoke particles:

[![Cloud sprite][cloud]][cloud]

_(Right click to save the image)_

<md-tip>
_Tip_: If you have an issue with the transparency when using your own asset, be sure that transparent pixels are black ones with `0` alpha. Indeed, even if a pixel is not visible, it still has a value. Which is used by the computer.
</md-tip>

Copy the image in the "Textures" folder. Change the "Texture Type" to "Texture", and set "Alpha Is Transparent". You should have:

[![Cloud settings][cloud_settings]][cloud_settings]

<md-note>
_Note_: We are using a Unity 3D feature, not a "2D one". In fact, it doesn't matter. When you use the "2D" tools, you are only using a subset of Unity. But the full power of Unity is still there, ready to be used.
</md-note>

Assign the texture to the particle:

1. Drag the texture to the your particle system in the "Inspector" (or onto the particles object in the "Hierarchy", which will assign the texture to the right property inside the "Inspector").
2. Change the shader to "Particles" -> "Alpha Blended":

[![Cloud shader][cloud_shader]][cloud_shader]

To create a perfect smoke particles, we have to change many settings in the particle system "Inspector".

For the tutorial, we recommend to use:

| Category            | Parameter name       | Value  |
| ------------------- | -------------------- | ------ |
| General             | Duration             | 1      |
| General             | Max Particles        | 15     |
| General             | Start Lifetime       | 1      |
| General             | Start Color          | Gray   |
| General             | Start Speed          | 3      |
| General             | Start Size           | 2      |
| Emission            | Bursts               | 0 : 15 |
| Shape               | Shape                | Sphere |
| Color Over Lifetime | Color                | See below (N°1) |
| Size Over Lifetime  | Size                 | See below (N°2) |

### N°1 — Color Over lifetime

Set an alpha in the end to create a fade out:

[![Fade out particles][fade_out]][fade_out]

### N°2 — Size Over lifetime

Choose a decreasing curve:

[![Curve editor][decreasing_curve]][decreasing_curve]

<br />You should have:

[![Full settings][smoke_settings]][smoke_settings]

Feel free to tweak the system. _Play with the editor to see how it works._ It's your game after all. :)

When you are satisfied, _uncheck "Looping"_.

Observe the result:

[![Smoke effect][smoke_effect]][smoke_effect]

It's clearly not perfect, but notice how simple it was to create. Adding particles can make the difference between a dull game and one that is fun to watch.

Save as a prefab. You can organize a bit by creating a folder "Prefabs/Particles" and calling the prefab "SmokeEffect".

## Fire particles

This one is no different.

1. Create a new particle system, just as you did above.
2. Use the default material for fire ("Renderer/Material" to "Default-Particle"). It's enough for our needs.

We recommend to use:

| Category            | Parameter name       | Value  |
| ------------------- | -------------------- | ------ |
| General             | Looping              | false  |
| General             | Duration             | 1      |
| General             | Max Particles        | 10     |
| General             | Start Lifetime       | 1      |
| General             | Start Speed          | 0.5    |
| General             | Start Size           | 2      |
| Emission            | Bursts               | 0 : 10 |
| Shape               | Shape                | Box    |
| Color Over Lifetime | Color                | See below (N°1) |

### N°1 — Color Over Lifetime

Create a nice gradient from yellow to orange, with a fade out in the end:

[![Fire gradient][fire_gradient]][fire_gradient]

<br />And you should get:

[![Fire effect][fire_effect]][fire_effect]

Save as a "FireEffect" prefab.

Now, we are going to use these prefabs in a script.

# Helper script

Instantiating those particles prefabs are no different from instantiate a player or a shot.

However, you must remember that they should get deleted when they are over.

Also, we will do the combination of fire + smoke in the script for our explosion.

Let's create a "SpecialEffectsHelper" script:

```csharp
using UnityEngine;

/// <summary>
/// Creating instance of particles from code with no effort
/// </summary>
public class SpecialEffectsHelper : MonoBehaviour
{
  /// <summary>
  /// Singleton
  /// </summary>
  public static SpecialEffectsHelper Instance;

  public ParticleSystem smokeEffect;
  public ParticleSystem fireEffect;

  void Awake()
  {
    // Register the singleton
    if (Instance != null)
    {
      Debug.LogError("Multiple instances of SpecialEffectsHelper!");
    }
    Instance = this;
  }

  /// <summary>
  /// Create an explosion at the given location
  /// </summary>
  /// <param name="position"></param>
  public void Explosion(Vector3 position)
  {
    // Smoke on the water
    instantiate(smokeEffect, position);

    // Tu tu tu, tu tu tudu

    // Fire in the sky
    instantiate(fireEffect, position);
  }

  /// <summary>
  /// Instantiate a Particle system from prefab
  /// </summary>
  /// <param name="prefab"></param>
  /// <returns></returns>
  private ParticleSystem instantiate(ParticleSystem prefab, Vector3 position)
  {
    ParticleSystem newParticleSystem = Instantiate(prefab, position, Quaternion.identity) as ParticleSystem;

    // Make sure it will be destroyed
    Destroy(newParticleSystem.gameObject, newParticleSystem.startLifetime);

    return newParticleSystem;
  }
}
```

It's a singleton (it means that their should be this script only once per scene) and you can access it from everywhere using ``` SpecialEffectsHelper.Instance```.

Assign it to the "Scripts" game object. Inspect it, and fill the fields with the prefab.

[ ![Filling the script with prefab][filling_script]][filling_script]

# Explosion on death

Time to call the script!

Open _HealthScript_. We will check when the game object is destroyed and display our sweet explosion.

We will just add one line:

````
SpecialEffectsHelper.Instance.Explosion(transform.position);
````

Giving us this:

`````csharp
  void OnTriggerEnter(Collider collider)
  {
	...
        if (hp <= 0)
        {
          // Explosion!
          SpecialEffectsHelper.Instance.Explosion(transform.position);

          // Dead!
          Destroy(gameObject);
        }
	...
  }
`````

Now shoot enemies and let the player get killed!

Click to see the animation:

[ ![Explosions in action][explosions]][explosions_gif]

Not bad, right? The fire is not very nice but it could be replaced by a sprite.

But it's up to you to make beautiful explosions using particles, now you have an idea how it works ;).

# Next Step

Particles are always a fun part of the game.

It can also be a time eating feature as you will probably want to tweak effects rather that code boring features like high-scores. As James Silva  wrote in [Building XNA 2.0 games](http://www.amazon.com/Building-XNA-2-0-Games-Professionals/dp/1430209798), work on particles at the end of the development or the other tasks will quickly lose interest. Or ask someone to make them for you.

Particles are a very useful way to enhance graphics and to make feedbacks to the player.

The other usual feedbacks are sounds. And that's just what we are going to see right now!


[cloud]: ./-img/cloud.png
[new_particle_system]: ./-img/new_particle_system.png
[cloud_settings]: ./-img/cloud_settings.png
[cloud_shader]: ./-img/cloud_shader.png
[smoke_settings]: ./-img/smoke_settings.png
[fade_out]: ./-img/fade_out.png
[decreasing_curve]: ./-img/decreasing_curve.png
[smoke_effect]: ./-img/smoke_effect.gif
[fire_gradient]: ./-img/fire_gradient.png
[fire_effect]: ./-img/fire_effect.gif
[filling_script]: ./-img/filling_script.png
[explosions]: ./-img/explosions.png
[explosions_gif]: ./-img/explosions.gif
