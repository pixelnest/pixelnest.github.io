---
layout: tutorial
title: Making some noise and adding music
subtitle: Creating a 2D game with Unity
author: Damien
previous: ../part-07-particles
next: ../part-09-menus
---

## Chapters

<Sommaire ici>

## Summary

We will add sounds and a music to our game. It very simple in Unity, but it is a very important part.

You will learn where to find sounds and music, pick some, and play them in our game via a script.

## Getting sounds for audio

I not so recently [participated on the subject on stack exchange](http://gamedev.stackexchange.com/questions/22525/how-does-a-one-man-developer-do-its-games-sounds).

For a game developer, you can:

- Buy sounds
- Use free sounds from sound banks (like [FindSounds](http://www.findsounds.com/))
- Record your own sounds

Then you can modify and mix sounds with Audacity.

Or my favorite:

- Create chiptune (8-bit) sounds using [BFXR](http://www.bfxr.net/) (based on [SFXR](http://drpetter.se/project_sfxr.html) but with a web version that is very useful)

Let's create an explosion and a shot sound. If you are lazy, you can use mine:

- [Download the player shot sound][sound_shot_player]
- [Download the enemy shot sound][sound_shot_enemy]
- [Download the explosion sound][sound_explosion]

For musics, it depends of what you want, but [Jamendo](http://www.jamendo.com/) has a ton of artists. Be careful with the licenses for commercial uses.
This is how I met (your mother) the artist [Spintronic](http://spintronic.fr/ticket/listbyartist/1), and as I really loved his music he authorized me to use them in The Great Paper Adventure.

We will use one of my favourite track for this tutorial:

- Download [Spintronic - Firecrackers](http://spintronic.fr/song/download/45?format=mp3)

## Import in Unity

Drag'n'drop all that stuff in the "Sounds" folder.

**For each**, make sure to disable "3D sound" as we are in a 2D game. Make sure to **apply**.

[ ![Disabling 3D sound][3dsound]][3dsound]

And... that's all!

## Playing music

To play the music, simply drag'n'drop the music in the hierarchy. I invite you to:

- Rename the new game object in "Music"
- Place it at (0,0,0)

Locate the "Mute" checkbox, it can help when you do a lot of tests.

[ ![Music object][music]][music]

## Playing sounds

it could be quite the same as for music. But sound needs to be triggered at the right time.

For that, I propose a simple solution. Just like the _SpecialEffectsHelper_, we will have a helper script for sounds that you can call from everywhere.

This new script is "SoundEffectsHelper" and is made of:

````csharp
using UnityEngine;
using System.Collections;

/// <summary>
/// Creating instance of sounds from code with no effort
/// </summary>
public class SoundEffectsHelper : MonoBehaviour {

  /// <summary>
  /// Singleton
  /// </summary>
  public static SoundEffectsHelper Instance;

  public AudioClip ExplosionSound;
  public AudioClip PlayerShotSound;
  public AudioClip EnemyShotSound;

  void Awake()
  {
    // Register the singleton
    if (Instance != null)
    {
      Debug.LogError("Multiple instances of SoundEffectsHelper!");
    }
    Instance = this;
  }

  public void MakeExplosionSound()
  {
    MakeSound(ExplosionSound);
  }

  public void MakePlayerShotSound()
  {
    MakeSound(PlayerShotSound);
  }

  public void MakeEnemyShotSound()
  {
    MakeSound(EnemyShotSound);
  }

  /// <summary>
  /// Play a given sound
  /// </summary>
  /// <param name="originalClip"></param>
  private void MakeSound(AudioClip originalClip)
  {
    // As it is not 3D audio clip, position doesn't matter.
    AudioSource.PlayClipAtPoint(originalClip, transform.position);
  }
}

````

Add it to the "Scripts" game object, and fill it:

[ ![Script for sounds][sound_script]][sound_script]

Now simply call

- `SoundEffectsHelper.Instance.MakeExplosionSound();` in _HealthScript_, just after the particle effect
- `SoundEffectsHelper.Instance.MakePlayerShotSound();` in _PlayerScript_, just after `weapon.Attack(false);`
- `SoundEffectsHelper.Instance.MakeEnemyShotSound();` in _EnemyScript_, just after `weapon.Attack(true);`

No Gifs this time, but you will see the result quickly ;).


## Ready for the next step

I think we have a pretty good basis for a shoot them up game. You can make a longer level, and you will get nearly the demo I showed you in the first place.

We are far from a full game, but I'll stop here for the gameplay part.

Now we will see build and deployment features provided by Unity to complete this development cycle.

[Take me to the next step]()

[3dsound]: ./img/3dsound.png
[music]: ./img/music.png
[sound_script]: ./img/sound_script.png

[sound_explosion]: ./sounds/sound_explosion.wav
[sound_shot_player]: ./sounds/sound_shot_player.wav
[sound_shot_enemy]: ./sounds/sound_shot_enemy.wav
