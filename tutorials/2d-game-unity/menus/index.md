---
layout: tutorial
title: Menus - loading and restarting the game
date: 13/11/13

tutorial:
  name: Creating a 2D game with Unity
  link: ../

links:
  summary: ../table-of-contents
  previous: ../sounds
  next: ../deployment
---

We have finished our first level with a basic gameplay, some sounds, graphics and particles.

However, when the player dies, the game continues to run and it's impossible to start again. Moreover, when you launch it, you start directly. We are clearly in a situation where we need some menus to control the game.

<md-info>
_Damien_: Let's say it immediately: menus and GUI are no fun in a game. You usually have to use a very basic GUI framework (or no framework at all). <br />It takes a lot of time and the result is just... menus that players will skip as fast as possible.
</md-info>

<md-info>
_Matthieu_: Unlike many game developers, I disagree with the previous statement. Creating a _good_ game GUI is not an easy task, but it can be rewarding and interesting. However, creating menus requires good tools and some sensible design decisions (like for an app interface). <br /><br />But yeah; a _good_ menu must be invisible and the players should not even notice it exists.
</md-info>

Unfortunately, Unity is not really well-equipped to create fancy menus without investing a lot of time or using a third-party library.

We have no ambition to create a complex GUI for this tutorial. The built-in tools will be enough in our case, but you will likely find that they are too... limited.

Let's start with the basics.

# Assets

This is what we will use for the menu. Buttons will be the (ugly) Unity standard ones.

A background:

[ ![background][background]][background]

And a logo:

[ ![logo][logo]][logo]

Import those files in the project. Maybe you can put them in a "Menu" subfolder of "Textures" otherwise "background" will erase the previous game file.

# The Title screen

Nearly all games have a title screen. It's where the player lands when the game has finished to launch and before the game really.

Some are just awesome and memorable: Megaman, Metal Slug... (I'm a big fan of title screens).

What we will create will not be that awesome, it will be... simple!

## Scene creation

First, create a new scene:

_File->Create->New scene_.

Save it in the "Scenes" folder as "Menu".

## Scene settings

Our menu will be made of:

- a background
- a logo
- a script that will display buttons and stuff

I think you are now able to reproduce the scene with the following information:

Background

- New sprite
- Position at ``(0,0,1)``
- Size ``(2,2,1)``

Logo

- New sprite
- Position at ``(0,2,0)``
- Size ``(0.75,0.75,1)``

The result:

[ ![Result][result1]][result1]

Of course you can add your name, instructions, jokes, make animation... menus are also a land of freedom. Just think about the player, he wants to play quick.

# The loading script

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

We are just drawing a button, that will load a new scene when the player click on it.


<md-note>
_Note_: The ``OnGUI`` is called every frame and should embed all the code to display GUI related code: lifebar, menus, interface...
<br />The ``GUI`` object in Unity allows you to quickly create GUI component from the code, like a button with the ``GUI.Button`` method.
</md-note>

Create an empty "Scripts" object add this new script as a component.

Launch the game to see it:

[ ![Button result][result2]][result2]

Click and... crash!

	Level 'Stage1' (-1) couldn't be loaded because it has not been added to the build settings. To add a level to the build settings use the menu File->Build Settings...

What to do is clearly said in the error message.

# Adding scene to the build

Go to _File->Build Settings_:

[ ![Build settings][build_settings]][build_settings]

Now just drag'n'drop the scenes you want to package with your game. Here it's simple, it's "Menu" and "Stage1".

[ ![Adding scenes][build_settings_add]][build_settings_add]

Now back to the menu, hit play:

[ ![Start game][start]][start]

# Player death and restart

Finally, we will allow the player to restart the game once he died.

This is the actual flow:

- The player gets hit by a bullet
- _HealthScript.OnCollisionEnter_ is called
- Player lose 1 HP
- _HealthScript_ decide to destroy the player as it has less than 1 point left

We will add new steps:

- _PlayerScript.OnDestroy_ is called
- A _GameOverScript_ is created and added to the scene

The _GameOverScript_ is the new script defined below. Please create it, as you did many times before.

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

Now try to die (shoudln't be too long):

[ ![Game Over][game_over]][game_over]

The script should be somewhere in the scene:

[ ![Game Over Script][game_over_script]][game_over_script]

Of course this can be really improved, with text, animation, etc.

But it works! :)

# "It's so ugly my eyes started bleeding"

Damn!

If you want to do something about it, you can create a skin:

_Assets->Create->Gui Skin_

[ ![GUISkin][GUISkin]][GUISkin]

Here you can tweak the UI controls to get something more fancy. Make sure this skin is in the `Resources  folder.

<md-note>
_Note_: The _Resources_ folder is special to Unity. Everything that is in will be packed with the game and can be loaded using the `Resources.Load` method.
<br />This allows you to load objects at runtime, and those objects may comes from your users (mods anyone?).
</md-note>

But the skin isn't applied until you set it in your scripts. In all your GUI scripts you will have to load (**only once**, not at each frame) the skin using ``GUI.skin = Resources.Load("GUISkin");``.

Here is an example with the `MenuScript`:

````csharp
using UnityEngine;

/// <summary>
/// Title screen script
/// </summary>
public class MenuScript : MonoBehaviour
{
  private GUISkin skin;

  void Start()
  {
	// Load a skin for the buttons
    skin = Resources.Load("GUISkin") as GUISkin;
  }

  void OnGUI()
  {
    const int buttonWidth = 128;
    const int buttonHeight = 60;

	// Set the skin to use
    GUI.skin = skin;

    // Draw a button to start the game
    if (GUI.Button(
      // Center in X, 2/3 of the height in Y
      new Rect(Screen.width / 2 - (buttonWidth / 2), (2 * Screen.height / 3) - (buttonHeight / 2), buttonWidth, buttonHeight),
      "START"
      ))
    {
      // On Click, load the first level.
      Application.LoadLevel("Stage1"); // "Stage1" is the scene name
    }
  }
}
````

As you can see, this is a lot of boring work just for menus.


<md-note>
_Note_:
If you have some money and you have a lot of menus and texts in your game, think about the [NGUI plugin][ngui_link]. It worth it.
</md-note>

# Next Step

You just made the new best selling game. But it's only on your computer for now.

Last step: deploying on another machine, be it a PC, a mobile or a console...


[background]: ./-img/background.png
[logo]: ./-img/logo.png
[elements]: ./-img/elements.png
[result1]: ./-img/result1.png
[result2]: ./-img/result2.png
[build_settings]: ./-img/build_settings.png
[build_settings_add]: ./-img/build_settings_add.png
[start]: ./-img/start.gif
[game_over]: ./-img/game_over.png
[game_over_script]: ./-img/game_over_script.png
[GUISkin]: ./-img/GUISkin.png "Creating a GUISkin in Resources folder"

[ngui_link]: http://www.tasharen.com/?page_id=140 "NGUI Unity Plugin"
