---
layout: tutorial
title: Build, release and deploy
author: Damien
date: 13/11/13

tutorial:
  name: Creating a 2D game with Unity
  link: ../

links:
  summary: ../table-of-contents
  previous: ../menus
  next: ../animations
---

A short last part about how to do an executable that you can distribute. Short, because deploying with Unity is easy.

## Build settings again

Everything will be in the _File->Build Settings_ window that you had to open in the previous part.

On your left, you can choose a platform. This will make its settings appears on the right.

[ ![platforms][platforms]][platforms]

Nothing much to say, choose the platform you want and hit "Build & Run".

Let's try with the Web Player. Select "Web Player" in platform and build & run.

This will produce an HTML page with the game embed in. This is the first and simplest way to distribute your game, you just have to host the two files on the Internet.

[ ![The web version][web_result]][web_result]

## Player Settings

However, you may need to change settings like resolution, game name... You do that by going to

- _File->Build Settings->Player Settings..._
- -Edit->Project Settings->Player_

Check all properties to have the settings you want. Here I set the web player resolution to 1280 * 768.

[ ![Player settings][player_settings]][player_settings]

## Deploying on Windows, Mac, Linux

There is not much to say for the PC build. Choosing the PC platform, you will be able to choose the operating system to target.

[ ![pc_target][pc_target]][pc_target]

And that's all! Unity is really for deployment.

## Deploying on mobile (iOS)

Mobile deployement is not as easy as PC. You need to have the SDK (the official development tools) installed. That also mean you need a Mac to release an iOS game.

This is the procedure for iOS games. My guess is that it is very similar for Android games.

First, select "iOS" in the build window.

[ ![ios_build][ios_build]][ios_build]

Go to the "Player settings" to change few parameters (orientation, minimum SDK, icon...).

<md-note>
_Tip_: If you want to test on the simulator first, there is a trick. In the iOS player settings, find the parameter "SDK version". Then select "Simulator SDK":
<br/>
[ ![ios_simulator][ios_simulator]][ios_simulator]
</md-note>

Build the project. Unity will prompt you to choose a location:

[ ![ios_build2][ios_build2]][ios_build2]

In fact, Unity will generate an Xcode project:

[ ![ios_project_xcode][ios_project_xcode]][ios_project_xcode]

So you really must have all the development tools installed otherwise you just can't deploy on iOS.

Open the ``.xcodeproject`` file in order to open Xcode. Fortunately, we won't have to do anything except launching:

[ ![ios_xcode][ios_xcode]][ios_xcode]

Try to launch the game. It should be deployed on simulator. For example, on an iPad:

[ ![ios_result][ios_result]][ios_result]

It's working! Sprites are correctly displayed, game is loading... but it is also unplayable, because touch controls are not implemented (except the "tap" to fire that comes with the default input settings). 

Also, resolution and orientation are tricky to handle.
And finally, if you have a real device, you may discover that performances are quite low.

That's why mobile is not that easy: you need to optimize and tweak your game to get the best from it on smartphones and tablets.

## Assets qualities per platform

For some asset, you can or may need to specify lower (or higher) quality parameters.

Look at textures for example. You can lower the quality for mobile devices but keeping the best on PC.

[ ![texture_specific_quality][texture_specific_quality]][texture_specific_quality]

This is tweaking and optimization, you should do that at the end of your development process.

## Ready for the next step

That's it. You made it. The development is over.
You probably don't feel ready to make a full 2D game but you probably are.

You will find next some bonus levels to extend this tutorial on some parts that can interest you (gameplay tweaking, animations tools).

But now it's up to you to look for more resources specific to your game idea and, most of all, it's up to you to start your project.

So in Unity:
- Go to _File->New Project_

and the rest is all yours...


[platforms]: ./-img/platforms.png
[web_result]: ./-img/web_result.png
[player_settings]: ./-img/player_settings.png
[pc_target]: ./-img/pc_target.png
[texture_specific_quality]: ./-img/texture_specific_quality.png

[ios_build]: ./-img/ios_build.png
[ios_build2]: ./-img/ios_build.png
[ios_project_xcode]: ./-img/ios_project_xcode.png
[ios_simulator]: ./-img/ios_simulator.png
[ios_xcode]: ./-img/ios_build.png
[ios_result]: ./-img/ios_result.png