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

A short last part about how to do an executable that you can distribute.

## Build settings again

Everything will be in the _File->Build Settings_ window that you had to open in the previous part.

On your left, you can choose a platform. This will make its settings on the right.

[ ![platforms][platforms]][platforms]

Nothing much to say, choose the platform you want and hit "Build & Run".

Let's try with the Web Player. Select "Web Player" in platform and build & run.

This will produce an HTML page with the game embed in. This is the first and simplest way to distribute your game, you just have to host the two files on the Internet.

[ ![The web version][web_result]][web_result]

(See that the menu is not wide enough for this resolution. Easy to change, I didn't see it until I deployed)

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

## Deploying on mobile

Mobile are not as easy as PC. You need to have the SDK (the official development tools) installed. That also mean you need a Mac to release an iOS game.

I won't go too deep in details, but it is not much complicated. You'd need to know how to deploy a "normal" application on those platforms as the process will be the same (try a "Hello World" before).

## Assets qualities per platform

For some asset, you can or may need to specify lower (or higher) quality parameters.

Look at textures for example. You can lower the quality for mobile devices but keeping the best on PC.

[ ![texture_specific_quality][texture_specific_quality]][texture_specific_quality]

This is tweaking and optimization, you should do that at the end of your development process.

## Ready for the next step

That's it. You made it. This tutorial is over.
Well, there is a bonus level, we gathered some useful resources on specific topic that can interest you.

You probably don't feel ready to make a full 2D game but you probably are.

Now it's up to you to look for more resources specific to your game idea and, most of all, it's up to you to start your project.

So in Unity:
- Go to _File->New Project_

and the rest is all yours...


[platforms]: ./-img/platforms.png
[web_result]: ./-img/web_result.png
[player_settings]: ./-img/player_settings.png
[pc_target]: ./-img/pc_target.png
[texture_specific_quality]: ./-img/texture_specific_quality.png
