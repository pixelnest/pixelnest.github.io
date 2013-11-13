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

## Create a new project

Go to file, then create a new project. Do not check any standard package for now. You can re-import them later if you want, but at first it will just confuse you.

[ ![Create a new Unity project][unity_create_project] ][unity_create_project]

Select the **2D** settings. Like before, you can change this flag in the project settings later.

_Do not worry about the name_. The product name is defined in the options and changing the whole project name only consists in renaming the folder.

## Prepare the project

As I explained in [another tutorial][dam_versionning_tutorial], if you plan to use Git or SVN, the first thing you need to do is to enable some obscure settings for team collaboration.

Instead of writing what I have already written before, just check the [tutorial][dam_versionning_tutorial] if you are interested. :)

## Unity layout and panels

You now face a nice empty scene. Here is the layout I am using, but you should take some times to personalize the interface to your needs. I personally like to have the console next to the game view, but if you have a small screen you may use tabs instead of panels.

[ ![An empty project][unity_empty_project] ][unity_empty_project]

Before jumping into the game creation, take a few minutes to organize your project and scenes.

We advise to create folders in the Unity "Project" pane to organize your stuffs. These folders will technically be created in the _Assets_ folder  of your project.

_Note_: The "Assets" folder is the superfolder containing everything you add in the "Project" pane. It is not visible inside Unity, but if you open your file explorer, you will be able to see it.

[ ![Folders][unity_folders] ][unity_folders]

Here is an example of a structure we use for our projects at Pixelnest. You can adapt it to fit your preferences.

## Project assets

In your "Project" pane, you can find different types of assets:

### Prefabs

Reusable game objects (ex: Bullets, enemies, bonuses).

Prefabs can be seen as a ``class`` in a programming language, which can be instantiated into game objects. It's a mold you can duplicate and change at will in the scene or during the game execution.

### Scenes

A scene is basically a level or a menu.

Contrary to the other objects you create in the "Project" pane, scenes are created with the "File" menu. Click on "New Scene", then save it to the "Scenes" folder.

### Sounds

I guess it's pretty clear. See if you want to split musics in another folder.

### Scripts

All the code goes here. We use this folder as the equivalent of a root folder in a C# project.

### Textures

Textures are sprites and images of your game. In a 2D project, you could rename this folder to "Sprites".

It doesn't really matter in a 2D project, but by keeping the name "Textures", Unity will recognize it and automate some tasks. If you want some informations about this topic, you can read [this](http://answers.unity3d.com/questions/172384/importing-models.html) or [this](http://docs.unity3d.com/Documentation/Components/class-Mesh.html).

## Filling the scene

The "Hierarchy" pane contains every object that is available in the scene. This is what you manipulate when you start the game with the "Play" button.

Each object of the scene is a "game object" for Unity. You can create an object on the root of the scene, or as a child of another game object. You can move an object at any time to change its parent.

[ ![Logicial objects][unity_logical_objects] ][unity_logical_objects]

As you can see here, we have 3 children for the "Level" object.

### Empty objects

A trick in Unity is to create an empty game object and use it as a "folder" for other game objects. It will simplify your scene hierarchy.

[ ![Empty objects][unity_create_empty] ][unity_create_empty]

**Make sure they all are at the (0, 0, 0) position so you can track them easily! The position is not important as they're not using it.**

But changing the position will affect the children relative position. We will not speak about this topic in this tutorial, so let the position of the empty objects to (0, 0, 0) for the moment.

See those empty objects as purely logical ones.

### Our first game scene

In our scene, we have :

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


[unity_logo_url]: ./-img/Unity.png
[unity_create_project]: ./-img/create_project.png
[unity_empty_project]: ./-img/empty_project.png
[unity_folders]: ./-img/folders.png
[unity_logical_objects]: ./-img/logical_objects.png
[unity_prefs_vs_url]: ./-img/unity_vs2013.png
[unity_create_empty]: ./-img/unity_create_empty.png

[unity_download_link]: http://unity3d.com/unity/download "Download Unity"
[vs_download_link]: http://www.microsoft.com/visualstudio/eng/downloads#d-2013-express "Download Visual Studio"
[md_link]: http://monodevelop.com/ "MonoDevelop"
[xs_link]: http://xamarin.com/studio "Xamarin Studio"

[unity_videos_link]: http://unity3d.com/learn/tutorials/modules/beginner/editor "Unity Editor Tutorials"
[unitypatterns_link]: http://unitypatterns.com/ "Unity Patterns"

[dam_versionning_tutorial]: http://dmayance.com/git-and-unity-projects/
