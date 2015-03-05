---
layout: tutorial
title: Making some noises on music
date: 13/11/18

show_promotion: steredenn

tutorial:
  name: Creating a 2D game with Unity
  link: ../

links:
  summary: ../table-of-contents
  previous: ../particles
  next: ../menus
---

Now that we have improved our game visually, with particles, we will add some sounds and a music in our project. It's very simple in Unity but it's still a very important part of a game.

You will learn where to find sounds and music, pick some, and play them in our game via a script.

<md-note>
_Note_: Unity 5 has been released with a lot of new Audio tools. However, we will not cover the new features in this tutorial.
</md-note>

# Finding sounds and musics

Damien (not so) recently [participated in an interesting subject on Stack Exchange](http://gamedev.stackexchange.com/questions/22525/how-does-a-one-man-developer-do-its-games-sounds) about this topic.

Based on our knowledge, a game developer can:

- Buy sounds.
- Hire/Know a musician.
- Use free sounds from sound banks (like [FindSounds](http://www.findsounds.com/) or [Freesound](http://www.freesound.org/)).
- Record his own sounds.

Or Damien's favorite:

- Create chiptune (8-bit) sounds using [BFXR](http://www.bfxr.net/) (based on [SFXR](http://drpetter.se/project_sfxr.html) but with a web version that is very useful)

<md-info>
_Matthieu_: I have created some sounds and songs for a short school project made by a friend. I was a drummer at the time, but absolutely not a composer. <br />However, with the help of [Freesound](http://www.freesound.org/), a bit of inventiveness and a dozen of hours (without knowing any tool — so I just learned how to use [Audacity](http://audacity.sourceforge.net/) the quick way), I successfully did a (cheap) soundtrack for the whole game. <br /><br />I wouldn't recommend that for a song (find a musician and make a deal, it's way better), but with enough time and a good tool, you could defintely create cool sound effects. _It's feasible: be creative_.
</md-info>

For musics, it depends of what you want:
- [Jamendo](http://www.jamendo.com/) has a ton of artists. Be careful with the licenses for commercial uses.
- [Bosca Ceoil](http://distractionware.com/blog/2013/08/bosca-ceoil/) is a simple software from Terry Cavanagh to make musics

<md-info>
_Damien_: This is how I met (your mother) the artist [Spintronic](http://spintronic.fr/ticket/listbyartist/1). I really loved his music. He kindly authorized me to use them in _The Great Paper Adventure_ game.
</md-info>

## Assets for the tutorial

Create or find an explosion and a shot sound. If you are lazy, you can use ours:

- [Download the player shot sound][sound_shot_player]
- [Download the enemy shot sound][sound_shot_enemy]
- [Download the explosion sound][sound_explosion]

We will use one of the track of _The Great Paper Adventure_ by [Spintronic](https://www.jamendo.com/fr/list/a85421/the-great-paper-adventure-bo) for this tutorial:

- Download [Spintronic - Firecrackers](https://storage-new.newjamendo.com/download/track/730917/mp32/)

# Import in Unity

Drag the 4 elements in the "Sounds" folder.

And... that's all!

# Playing music

To play a music, simply drag the song into the "Hierarchy". 

[ ![Music object][music]][music]

Observe the "Mute" checkbox. It can help when you do a lot of tests.

# Playing sounds

You could proceed like for the music. But sounds need to be triggered at the right time in the game.

For that, we propose a simple solution. Just like for the "SpecialEffectsHelper" code, we will have a helper script for sounds that you can call from everywhere.

This new script is called "SoundEffectsHelper":

```csharp
using UnityEngine;
using System.Collections;

/// <summary>
/// Creating instance of sounds from code with no effort
/// </summary>
public class SoundEffectsHelper : MonoBehaviour
{

  /// <summary>
  /// Singleton
  /// </summary>
  public static SoundEffectsHelper Instance;

  public AudioClip explosionSound;
  public AudioClip playerShotSound;
  public AudioClip enemyShotSound;

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
    MakeSound(explosionSound);
  }

  public void MakePlayerShotSound()
  {
    MakeSound(playerShotSound);
  }

  public void MakeEnemyShotSound()
  {
    MakeSound(enemyShotSound);
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
```

Add it to the "Scripts" game object, and fill its fields with the sound clips:

[ ![Script for sounds][sound_script]][sound_script]

Then, do:

1. `SoundEffectsHelper.Instance.MakeExplosionSound();` in "HealthScript", just after the particle effect.
2. `SoundEffectsHelper.Instance.MakePlayerShotSound();` in "PlayerScript", just after `weapon.Attack(false);`.
3. `SoundEffectsHelper.Instance.MakeEnemyShotSound();` in "EnemyScript", just after `weapon.Attack(true);`.

Start the game and listen. Yeah, we have a music and sounds now!

<md-note>
_Note_: This method is enough for the tutorial or for small projects. For a bigger game, it's probably too light, as you won't be able to easily manage hundreds of sounds.
</md-note>

# Next Step

We just learned how to use sounds and music in our game.

We have a pretty good basis for a _shmup_ game now. You can make a longer level and you will nearly get the demo we showed you in the introduction.

You could start making your own graphics and add enemies or background elements. You could even begin to implement a boss at the end of the level. It's a bit more complex but the challenge and the design decisions are really interesting.

We are far from a complete game, but we will stop here for the gameplay and game stage.

In the next chapter, we will add menus so we can start and restart this hardcore level.

[3dsound]: ./-img/3dsound.png
[music]: ./-img/music.png
[sound_script]: ./-img/sound_script.png

[sound_explosion]: ./-sounds/explosion.wav
[sound_shot_player]: ./-sounds/shot_player.wav
[sound_shot_enemy]: ./-sounds/shot_enemy.wav
