---
layout: tutorial
title: Menu - loading and restarting the game
subtitle: Creating a 2D game with Unity
author: Damien
---

## Chapters

- [Installation and the first game scene](../part1-install-and-scene)
- [Adding and displaying a background](../part2-background-and-camera)
- [The player sprite and an enemy](../part3-player-and-enemies)
- [The shooting - part 1](../part4-shooting-101)
- [The shooting - part 2](../part5-shooting-102)
- [Parallax scrolling](../part6-parallax-scrolling)
- [Adding particles](../part7-particles)
- [Making some noise and adding music](../part8-sounds)
- **[Menu - loading and restarting the game](../part9-menus)**
- [Build, release and deployment](../part10-deployment)
- [Bonus - advanced resources and tips](../part11-bonus)

## Summary

I must say it immediately: Menus and GUI are no fun in a game. You usually have to use a too basic GUI framework (or no framework at all), it takes a lot of time and the result is just... menus that players will skip as fast as possible.

Fortunately, Unity is quite cool for game GUIs and menus, you will see why.

[Download the project from part 8](https://github.com/pixelnest/2d-game-unity-tutorial/releases/tag/part8)

## The assets

This is what we will use for the menu. Buttons will be Unity standard.

A background:

[ ![background][background]][background]

And a logo:

[ ![logo][logo]][logo]

Import those files in the project. Maybe you can put them in a "Menu" subfolder of "Textures" otherwise "background" will erase the previous game file.

## The Title screen

Nearly all games have a title screen. It's where the player lands when the game has finished to launch and before the game really.

Some are just awesome and memorable: Megaman, Metal Slug... (I'm a big fan of title screens).

What we will create will not be that awesome, it will be... simple!

### Scene creation

First, create a new scene:

_File->Create->New scene_

Save it in the "Scenes" folder as "Menu".

### Scene settings

Like for "Stage1", change the light settings. Either set an ambient light to white or add a directional light like we did in part 2.

Our menu will be made of:
- a background quad
- a logo quad
- a script that will display buttons and stuff

I think you are now able to reproduce the scene with the following information:

Main Camera

- Position at (0,0,-10)
- Orthographic
- Size 10

Background

- Like any other sprite we did before (quad, texture, etc)
- Position at (0,0,0)
- Size 20x20x1

Logo

- Like any other sprite we did before (quad, texture, etc)
- Position at (0,4,-1)
- Size 15x15x1

The result:

[ ![Result][result1]][result1]

Of course you can add your name, instructions, jokes, make animation... menus are also a land of freedom. Just think about the player, he wants to play quick.

## The loading script

Now we will add a button to click to play the game. We will do that in a script.

Create "MenuScript" and attach it to a new empty game object (called... "Scripts"? Just saying).

Fill it with:

````csharp
using UnityEngine;

/// <summary>
/// Title screen script
/// </summary>
public class MenuScript : MonoBehaviour
{
  void OnGUI()
  {
    const int buttonWidth = 84;
    const int buttonHeight = 60;

    // Draw a button to start the game
    if (GUI.Button(
      // Center in X, 2/3 of the height in Y
      new Rect(Screen.width / 2 - (buttonWidth / 2), (2 * Screen.height / 3) - (buttonHeight / 2), buttonWidth, buttonHeight),
      "Start!"
      ))
    {
      // On Click, load the first level.
      Application.LoadLevel("Stage1"); // "Stage1" is the scene name
    }
  }
}
````

We are just drawing a button, that will load a new scene when the player click on it. Launch the game to see it:

[ ![Button result][result2]][result2]

Click and... crash!

	Level 'Stage1' (-1) couldn't be loaded because it has not been added to the build settings. To add a level to the build settings use the menu File->Build Settings...

What to do is right here in the error message.

## Adding scene to the build

Make sure you have the "Menu" scene opened.
Go to _File->Build Settings_:

[ ![Build settings][build_settings]][build_settings]

Now just drag'n'drop the scenes you want to package with your game. Here it's simple, it's "Menu" and "Stage1".

[ ![Adding scenes][build_settings_add]][build_settings_add]

Now back to the menu, hit play:

[ ![Start game][start]][start]

## Player death and restart

Finally, we will allow the player to restart the game once he died.

This is the actual flow:

- The player gets hit by a bullet
- _HealthScript.OnCollisionEnter_ is called
- Player lose 1 HP
- _HealthScript_ decide to destroy the player as it has less than 1 point left

We would modify but we can also let it like that, and add new steps:

- _PlayerScript.OnDestroy_ is called
- A _GameOverScript_ is created and added to the scene

The _GameOverScript_ is the new script you have to create right now.

It is a little piece of code that will display a "Restart" and a "Back to menu" button:

````csharp
using UnityEngine;

/// <summary>
/// Start or quit the game
/// </summary>
public class GameOverScript : MonoBehaviour
{
  void OnGUI()
  {
    const int buttonWidth = 120;
    const int buttonHeight = 60;

    if (GUI.Button(
      // Center in X, 1/3 of the height in Y
      new Rect(Screen.width / 2 - (buttonWidth / 2), (1 * Screen.height / 3) - (buttonHeight / 2), buttonWidth, buttonHeight),
      "Retry!"
      ))
    {
      // Reload the level
      Application.LoadLevel("Stage1");
    }

    if (GUI.Button(
      // Center in X, 2/3 of the height in Y
      new Rect(Screen.width / 2 - (buttonWidth / 2), (2 * Screen.height / 3) - (buttonHeight / 2), buttonWidth, buttonHeight),
      "Back to menu"
      ))
    {
      // Reload the level
      Application.LoadLevel("Menu");
    }
  }
}

````

Nothing new, we load the menu or reload the scene to restart.

Now, in the _PlayerScript_, we must instantiate this new script on death:

````csharp
  void OnDestroy()
  {
    // Game Over
    // Add it to the parent, as this game object is likely to be destroyed immediately
    transform.parent.gameObject.AddComponent<GameOverScript>();
  }
````

Now try to die:

[ ![Game Over][game_over]][game_over]

The script should be somewhere in the scene:

[ ![Game Over Script][game_over_script]][game_over_script]

Of course this can be really improved, with text, animation, etc.

But it works! :)

## Ready for the next step

You just made the new best selling game. But it's only on your computer for now.

Last step: deploying on another machine, but it a PC, a mobile or a console...

[Take me to this last part](../part10-deployment)

[background]: ./img/background.png

[logo]: ./img/logo.png

[elements]: ./img/elements.png

[result1]: ./img/result1.png

[build_settings]: ./img/build_settings.png

[build_settings_add]: ./img/build_settings_add.png

[start]: ./img/start.gif

[game_over]: ./img/game_over.png

[game_over_script]: ./img/game_over_script.png