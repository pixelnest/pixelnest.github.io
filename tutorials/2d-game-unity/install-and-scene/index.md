---
layout: tutorial
title: Install Unity and create your first scene
author: Damien
date: 13/11/13

tutorial:
  name: Creating a 2D game with Unity
  link: ../

links:
  summary: ../table-of-contents
  previous: ../table-of-contents
  next: ../background-and-camera
---

In this first chapter you will find some very basic informations: first, the download and installation of Unity, then the preparation of the first scene of our game.

# Set up your environment

We start by the easy part: downloading and configuring Unity.

[ ![Unity][unity_logo_url] ][unity_logo_url]

## Install Unity

Download the latest release from the [official website][unity_download_link].

Launch the executable and everything will be properly install.

## Choose a code editor

Unity is bundled with MonoDevelop (4.0.1 as of today) to edit code.

### Windows

If you are on Windows you can (and should) use an alternative:

* [Visual Studio 2013 Desktop (C#)][vs_download_link] for Windows

Likewise: download and install, it's simple as everything is bundled, though it might take a little time. Then, in the Unity preferences, change your default editor to Visual Studio.

[ ![Change the preferences][unity_prefs_vs_url] ][unity_prefs_vs_url]

### Mac OS X

[MonoDevelop 4][md_link] is very similar to [Xamarin Studio][xs_link]. Which means that it is way better than the old MonoDevelop 2 of the previous releases of Unity. It is far from perfect, but if you are on a Mac, it's still the best option that you've got.

### Which language ?

Unity allows you to code in three languages : JavaScript (UnityScript), C# and Boo.

We highly recommend that you use C#. It's more powerful and less error-prone. Moreover, this tutorial is written in C#.

## What if I am a total Unity newbie?

If you are totally new to Unity, you may get lost as we are not going to explain every piece of the editor.

However, learning to use the main interface of Unity is relatively easy. _You might be scared the first time you open the software_, but it is just a matter of hours to be comfortable with it.

Here are some other resources that we find interesting and that should complete us on this subject:

- [Official Unity editor tutorials][unity_videos_link]: The official videos are great. You should take an afternoon to watch them all — we guarantee you that you will not loose your time.

- [Unity Patterns][unitypatterns_link]: A fresh new site with great articles and tools. The tutorials about coroutines is a must-read if you are not familiar with the concept.

# The first scene

## Create a project

Create a new project. Do not check any standard package for now, you can re-import them later if you want but at first it will just get you confuse.

[ ![Create a new Unity project][unity_create_project] ][unity_create_project]

Select the **2D** settings.

Do not worry about the name, the product name is defined in the option and changing the whole project name only consists in renaming the folder.

## Prepare the project

As Damien explain in [this other tutorial](http://dmayance.com/git-and-unity-projects/), if you plan to use Git or SVN the first thing you need to do is to enable some obscure settings for team collaboration.

## Prepare the scene

You now face a nice empty scene. Here is the layout we are using but you should take some time and organize as you are the most comfortable with. I personally like to have the console next to the game view, but if you have a small screen you may use tabs instead of panels.

[ ![An empty project][unity_empty_project] ][unity_empty_project]

Before jumping into the game creation take a few minutes to organize your project and scene.

We advise to create folders from the Unity inspector to organize your stuff. Those folders will technically be created in the _Assets_ folder of your project. Here is a simple hierarchy, you can adapt it to your needs:

[ ![Folders][unity_folders] ][unity_folders]

- Prefabs: reusable game object (ex: Bullets, enemies, bonuses)
- Scenes: levels and menus of your game
- Sounds: I guess it's pretty clear. See if you want to split musics in another folder
- Scripts: all the code goes here
- **Textures**: sprites, images of your game. Keep this name! Unity will recognize it and automate some tasks.

Now The scene. Create empty objects and use them as "folders" too.

[ ![Logicial objects][unity_logical_objects] ][unity_logical_objects]

**Make sure they all are at the (0,0,0) position so you can track them easily! They don't position as they're not using it.**

See those objects are purely logical ones.

- Scripts: we will add our global (not related to an object, such as a "Game" script) scripts here
- Render: camera (I moved the default one there), lights
- Level: instantiated game objects
	- 0 - Background
	- 1 - Middleground
	- 2 - Foreground

Save the scene in the _Scenes_ folder. Call it how you want (what about "Stage1"?).

# Ready for the next step

We are still far from a game, right?
Next step we will start fun things: adding a background and some elements!


[unity_logo_url]: ./-img/unity.png
[unity_create_project]: ./-img/create_project.png
[unity_empty_project]: ./-img/empty_project.png
[unity_folders]: ./-img/folders.png
[unity_logical_objects]: ./-img/logical_objects.png
[unity_prefs_vs_url]: ./-img/unity_vs2013.png

[unity_download_link]: http://unity3d.com/unity/download "Download Unity"
[vs_download_link]: http://www.microsoft.com/visualstudio/eng/downloads#d-2013-express "Download Visual Studio"
[md_link]: http://monodevelop.com/ "MonoDevelop"
[xs_link]: http://xamarin.com/studio "Xamarin Studio"

[unity_videos_link]: http://unity3d.com/learn/tutorials/modules/beginner/editor "Unity Editor Tutorials"
[unitypatterns_link]: http://unitypatterns.com/ "Unity Patterns"
