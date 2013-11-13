---
layout: tutorial
title: Adding particles
author: Damien
date: 13/11/13

tutorial:
  name: Creating a 2D game with Unity
  link: ../

links:
  summary: ../#summary
  previous: ../parallax-scrolling
  next: ../sounds
---

## Chapters

<Sommaire ici>

## Summary

Let's do more graphics and less code. Particles are usually very simple sprites that will be repeated and displayed for a very short time.

Think of explosions, lasers, smoke... Those are sometimes particles (explosion can be a simple animated sprite).

Unity provide a powerful built-in editor for particles, the **Shuriken Engine**. Let's see what we can do with it.

## Particles prefabs for an explosion

We will make an explosion that we will use when enemies or player are destroyed. This involve to:

- create a particle system of our explosion as a prefab
- instantiate and play it when we need

An explosion is usually made of two things: fire and smoke.

### The smoke particles

Create a new _Particle System_ from the editor (_Game Object -> Create Other -> Particle System_).

I recommend you to work on an empty part of the scene (or in an empty scene) so you know what is happening.

Zooming on your particles, you will see a continuous flow of sparks:

[![Creating a new particle system][new_particle_system]][new_particle_system]

Notice the new window with "Pause" and "Stop" and the inspector. Yes, your inspector is now filled with dozen of fields related to the particle. And that's all the fun!

The sprite

[![Cloud sprite][cloud]][cloud]

**Tip:** if you have transparency issue with your own image, make sure transparent pixels are black ones with 0 alpha.

Copy the image in the "Textures" folder. Change the _Texture Type_ to Texture, and set Alpha As transparency:

[![Cloud settings][cloud_settings]][cloud_settings]

We are using a Unity 3D feature, not a 2D one.

Assign the texture to the particle: drag'n'drop the texture to the _Particle System_ in the hierarchy or the editor. Finally, select the _particle System_ and change the shader to use, select _Particles -> Alpha Blended_:

[![Cloud shader][cloud_shader]][cloud_shader]

Now we will change many settings to get the right effect. Here's an array of all parameters and a picture of the global configuration. It is just few tweaks, you must play with the editor to see how it works.

The global picture:

[![Full settings][smoke_settings]][smoke_settings]

Parameters details:

<table>
<tr>
	<th>Category</th>
	<th>Parameter name</th>
	<th>Value</th>
</tr>
<tr>
	<td>General</td>
	<td>Duration</td>
	<td>1</td>
</tr>
<tr>
	<td>General</td>
	<td>Max particles</td>
	<td>15</td>
</tr>
<tr>
	<td>General</td>
	<td>Start Lifetime</td>
	<td>1</td>
</tr>
<tr>
	<td>General</td>
	<td>Start Color</td>
	<td>Gray</td>
</tr>
<tr>
	<td>General</td>
	<td>Start Speed</td>
	<td>3</td>
</tr>
<tr>
	<td>General</td>
	<td>Start Size</td>
	<td>2</td>
</tr>
<tr>
	<td>Emission</td>
	<td>Bursts</td>
	<td>0 : 15</td>
</tr>
<tr>
	<td>Shape</td>
	<td>Shape</td>
	<td>Sphere</td>
</tr>
<tr>
	<td>Color over lifetime</td>
	<td>Color</td>
	<td>
		Alpha in the end for fade out. See picture blow.
	</td>
</tr>
<tr>
	<td>Size over lifetime</td>
	<td>Size</td>
	<td>Choose a decreasing curve</td>
</tr>
</table>

Color over lifetime:

[![Fade out particles][fade_out]][fade_out]

Size over lifetime:

[![Curve editor][decreasing_curve]][decreasing_curve]

When you are satisfied, **uncheck "Looping"**.

Result:

[![Smoke effect][smoke_effect]][smoke_effect]

Save as a prefab. you can organize a bit by creating a folder "Prefabs/Particles" and saving the game object as "SmokeEffect".

## Fire

This is another particle system. Create a new one, just as you did above. We will use the default material for fire, it will be enough for our needs.

Settings:

<table>
<tr>
	<th>Category</th>
	<th>Parameter name</th>
	<th>Value</th>
</tr>
<tr>
	<td>General</td>
	<td>Looping</td>
	<td>false</td>
</tr>
<tr>
	<td>General</td>
	<td>Duration</td>
	<td>1</td>
</tr>
<tr>
	<td>General</td>
	<td>Max particles</td>
	<td>10</td>
</tr>
<tr>
	<td>General</td>
	<td>Start Lifetime</td>
	<td>1</td>
</tr>
<tr>
	<td>General</td>
	<td>Start Speed</td>
	<td>0.5</td>
</tr>
<tr>
	<td>General</td>
	<td>Start Size</td>
	<td>2</td>
</tr>
<tr>
	<td>Emission</td>
	<td>Bursts</td>
	<td>0 : 10</td>
</tr>
<tr>
	<td>Shape</td>
	<td>Shape</td>
	<td>Box</td>
</tr>
<tr>
	<td>Color over lifetime</td>
	<td>Color</td>
	<td>
		Yellow -> Orange with fade out in the end. See picture blow.
	</td>
</tr>
</table>

The gradient:

[![Fire gradient][fire_gradient]][fire_gradient]

The result:

[![Fire effect][fire_effect]][fire_effect]

Save as a "FireEffect" prefab.

Now we will use those prefabs in a helper script.

## The helper script

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

  public ParticleSystem SmokeEffect;
  public ParticleSystem FireEffect;

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
    instantiate(SmokeEffect, position);

    // Tu tu tu, tu tu tudu

    // Fire in the sky
    instantiate(FireEffect, position);
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

## Explosion on death

Time to call the script!

Open _HealthScript. We will check when the game object is destroyed and display our sweet explosion.

We will just add one line:

````
SpecialEffectsHelper.Instance.Explosion(transform.position);
````

Giving us this:

`````csharp
  void OnTriggerEnter(Collider collider)
  {
	...
        if (HP <= 0)
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

## Ready for the next step

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
