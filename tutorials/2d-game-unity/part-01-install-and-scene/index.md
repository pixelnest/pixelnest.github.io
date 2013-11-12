---
layout: tutorial
title: Installation and the first game scene
subtitle: Creating a 2D game with Unity
author: Damien
previous_link:..
next_link: ../part-02-background-and-camera
---

## Chapters

<Sommaire ici>

## Summary

In this first chapter you will find very basics information: links to download and install Unity and then we will prepare our first scene for a game.

## Install Unity

[  ![Unity][unity_logo_url]  ][unity_logo_url]

The easy part.

Download the latest release from the official website (always):
- [link to the last Unity 3D version](http://unity3d.com/unity/download)

Launch the executable and everything will be properly install.

Unity is bundled with MonoDevelop, but I find it horrible. Here are two free alternatives, depending on the system you use:

- **[Visual Studio 2013 Desktop (C#)](http://www.microsoft.com/visualstudio/fra/downloads#d-2013-express)** - Windows _(I can only find the french link via Google, sorry, but you will easily find the version in your language)_
- **[Xamarin Studio](http://xamarin.com/studio)** - OS X (based on Mono Develop but with a nicer interface)

Same goes here: download and install, it's simple as everything is bundled.

## What if I am a total Unity newbie?

If you are totally new to Unity, you may get lost as we are not going to explain every piece of the editor.

Here are some other resources that we find interesting and that should complete us on this subject:

- [Official Unity editor tutorial](http://unity3d.com/learn/tutorials/modules/beginner/editor) (Officials videos are great)

## The first scene

### Create a project

Create a new project. Do not check any standard package for now, you can re-import them later if you want but at first it will just get you confuse. 

[  ![Create a new Unity project][unity_create_project]  ][unity_create_project]

Do not worry about the name, the product name is defined in the option and changing the whole project name only consists in renaming the folder. 

### Prepare the project

As Damien explain in [this other tutorial](http://dmayance.com/git-and-unity-projects/), if you plan to use Git or SVN the first thing you need to do is to enable some obscure settings for team collaboration.

### Prepare the scene

You now face a nice empty scene. Here is the layout we are using but you should take some time and organize as you are the most comfortable with. I personally like to have the console next to the game view, but if you have a small screen you may use tabs instead of panels.

[  ![An empty project][unity_empty_project]  ][unity_empty_project]

Before jumping into the game creation take a few minutes to organize your project and scene.

We advise to create folder from the Unity inspector to organize your stuff. Those folder will technically be created in the _Assets_ folder of your project. Here is a simple hierarchy, you can adapt it to your needs:

[  ![Folders][unity_folders]  ][unity_folders]

- Prefabs: reusable game object (ex: Bullets, enemies, bonuses)
- Scenes: levels and menus of your game
- Sounds: I guess it's pretty clear. See if you want to split musics in another folder
- Scripts: all the code goes here
- **Textures**: sprites, images of your game. Keep this name! Unity will recognize it and automate some tasks.

Now The scene. Create empty objects and use them as "folder".

[  ![Logicial objects][unity_logical_objects]  ][unity_logical_objects]

**Make sure they all are at the (0,0,0) position so you can track them easily! They don't position as they're not using it.**

See those objects are purely logical ones.

- Scripts: we will add our global (not related to an object, such as a "Game" script) scripts here
- Render: camera (I moved the default one there), lights 
- Level: instantiated game objects
	- 0 - Background
	- 1 - Middleground
	- 2 - Foreground

Save the scene in the _Scenes_ folder. Call it how you want (what about "Stage1"?).


## Ready for the next step

We are still far from a game, right?
Next step we will start fun things: adding a background and a player!

[Take me to the next step]({{ page.next_link}})

[unity_logo_url]: ./Unity.png

[unity_create_project]: ./create_project.png

[unity_empty_project]: ./empty_project.png

[unity_folders]: ./folders.png

[unity_logical_objects]: ./logical_objects.png