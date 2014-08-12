---
layout: tutorial
title: Menus - loading and restarting the game
date: 13/11/18

show_promotion: supermassive

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

## Background

[ ![background][background]][background]

_(Right click to save the image)_

## Logo

[ ![logo][logo]][logo]

_(Right click to save the image)_

<br />Import those assets in the project. You can put them in a "Menu" subfolder of "Textures". Otherwise "background" will erase the previous game file.

For the buttons, we will use the (ugly) Unity standard ones.

# Title screen

Nearly all games have a title screen. It's where the player lands when starting the game.

<md-info>
_Damien_: Some are just awesomes and memorables: Megaman, Metal Slug... (I'm a big fan of title screens).
</md-info>

What we are going to create will not be that awesome, but... simple!

## Scene

First, create a new scene:

1. "File" -> "New scene".
2. Save it in the "Scenes" folder as "Menu".

<md-tip>
_Tip_: You could also press the `cmd+N` (OS X) or `ctrl+N` (Windows) shortcuts.
</md-tip>

Our title screen will be made of:

- A background.
- A logo.
- A script that will display the buttons.

For the background:

1. Create a new `Sprite`
2. Position it at `(0, 0, 1)`
3. Size `(2, 2, 1)`

For the logo:

1. Create a new `Sprite`
2. Position it at `(0, 2, 0)`
3. Size `(0.75, 0.75, 1)`

You should have:

[ ![Result][result1]][result1]

Of course, you can add your name, instructions, jokes and animations. Menus are a land of freedom. Just keep in mind that a gamer wants to play as quickly as possible.

# Loading script

Now we will add a button to start the game, via a script.

Create a new "MenuScript" in the "Scripts" folder, and attach it to a new empty game object (called... "Scripts"? Just saying.):

```csharp
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

    // Determine the button's place on screen
    // Center in X, 2/3 of the height in Y
    Rect buttonRect = new Rect(
          Screen.width / 2 - (buttonWidth / 2),
          (2 * Screen.height / 3) - (buttonHeight / 2),
          buttonWidth,
          buttonHeight
        );

    // Draw a button to start the game
    if(GUI.Button(buttonRect,"Start!"))
    {
      // On Click, load the first level.
      // "Stage1" is the name of the first scene we created.
      Application.LoadLevel("Stage1");
    }
  }
}
```

<md-info>
_About the syntax_: Yes, the syntax is [a bit weird](http://docs.unity3d.com/Documentation/ScriptReference/GUI.Button.html).
</md-info>

We are just drawing a button which will load the scene "Stage1" when the player clicks on it.

<md-note>
_Note_: The `OnGUI` method is called every frame and should embed all the code that display a GUI element: lifebar, menus, interface, etc.
<br />The `GUI` object allows you to quickly create GUI components from the code, like a button with the `GUI.Button` method.
</md-note>

Then, launch the game and watch our wonderful menu:

[ ![Button result][result2]][result2]

Click and... Crash!

	Level 'Stage1' (-1) couldn't be loaded because it has not been added to the build settings. To add a level to the build settings use the menu File->Build Settings...

What we need to do is clearly written in the error message.

# Adding scenes to the build

Go to "File" -> "Build Settings":

[ ![Build settings][build_settings]][build_settings]

Now, drag all the scenes you want to package within your game. Here it's simple: it's "Menu" and "Stage1".

[ ![Adding scenes][build_settings_add]][build_settings_add]

Back to the menu. Click and... Play!

[ ![Start game][start]][start]

<md-tip>
_Tip_: The `Application.LoadLevel()` method job is to clear the current scene and to instantiate all the game objects of the new one. Sometimes, you want to keep a game object of a first scene into a second (e.g., to have a continuous music between two menus). <br /><br />Unity provides a `DontDestroyOnLoad(aGameObject)` method for these cases. Just call it on a game object and it won't be cleared when a new scene is loaded. In fact, it won't be cleared at all. So if you want to remove it in a further scene, you have to manually destroy it.
</md-tip>

# Deaths and restarts

Finally, we will allow the player to restart the game once he died. And as you may have seen, it happens a lot (we will "simplify" the game in an upcoming next chapter).

Our actual game flow is:

1. The player gets hit by a bullet.
2. `HealthScript.OnCollisionEnter` is called.
3. The player looses 1 health point.
4. "HealthScript" destroys the player since he has less than 1 health point.

We will add two new steps:

1. `PlayerScript.OnDestroy` is called.
2. A "GameOverScript" is created and added to the scene.

Create a new "GameOverScript" in the "Scripts" folder.

It's a little piece of code that will display a "Restart" and a "Back to Menu" buttons:

```csharp
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

    if (
      GUI.Button(
        // Center in X, 1/3 of the height in Y
        new Rect(
          Screen.width / 2 - (buttonWidth / 2),
          (1 * Screen.height / 3) - (buttonHeight / 2),
          buttonWidth,
          buttonHeight
        ),
        "Retry!"
      )
    )
    {
      // Reload the level
      Application.LoadLevel("Stage1");
    }

    if (
      GUI.Button(
        // Center in X, 2/3 of the height in Y
        new Rect(
          Screen.width / 2 - (buttonWidth / 2),
          (2 * Screen.height / 3) - (buttonHeight / 2),
          buttonWidth,
          buttonHeight
        ),
        "Back to menu"
      )
    )
    {
      // Reload the level
      Application.LoadLevel("Menu");
    }
  }
}

```

It's exactly identical to the first script we wrote, with two buttons.

Now, in the "PlayerScript", we must instantiate this new script on death:

```csharp
void OnDestroy()
{
  // Game Over.
  // Add the script to the parent because the current game
  // object is likely going to be destroyed immediately.
  transform.parent.gameObject.AddComponent<GameOverScript>();
}
```

Launch the game and try to die (it shouldn't take long):

[ ![Game Over][game_over]][game_over]

You can find the script somewhere in the scene:

[ ![Game Over Script][game_over_script]][game_over_script]

Of course, this can be improved with scores and animations, for example.

But it works! :)

# "It's so ugly my eyes bleed"

Damn!

If you want to do something about it, you can create a "GUI Skin".

* "Assets" -> "Create" -> "Gui Skin":

[ ![GUISkin][GUISkin]][GUISkin]

Inside the "Inspector", you can tweak the UI controls to get something more fancy. Make sure to put this skin inside the "Resources" folder.

<md-note>
_Note_: The "Resources" folder is a special one in Unity. Everything inside this folder will be packed with the game and can be loaded using the `Resources.Load()` method.
<br />This permits you to load objects at runtime, and those objects may come from your users (mods anyone?).
</md-note>

However, the skin is not applied until you set it in your scripts.

In all our previous GUI scripts, we have to load (_only once_, not for each frame) the skin using `GUI.skin = Resources.Load("GUISkin");`.

Here is an example inside the "MenuScript" (Observe the `Start()` method):

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

As you can see, this is a lot of boring work just for a dead-simple menu.

<md-note>
_Note_: If you have some money and you need a lot of menus and texts in your game, consider buying the [NGUI plugin][ngui_link]. It worths it. _Really_.
</md-note>

# Next Step

We just learned how to make the inevitable menus for our game.

Look at what you have done until now :

* A parallax scrolling with 3 background layers.
* Lot of particles!
* A title screen.
* Graphics and sounds.
* A _shmup_ gameplay with one player and multiples enemies.

Congratulations! But, unfortunately, it's only on your computer. To sell this new award-gaining game, we need to distribute it.

That's what we will talk about in the last chapter: deployment.


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
[GUISkin]: ./-img/gui_skin.png

[ngui_link]: http://www.tasharen.com/?page_id=140 "NGUI Unity Plugin"
