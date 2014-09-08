---
layout: tutorial
title: Build, release and deploy
date: 13/11/18

show_promotion: steredenn

tutorial:
  name: Creating a 2D game with Unity
  link: ../

links:
  summary: ../table-of-contents
  previous: ../menus
  next: ../conclusion
---

The game is ready. The last thing we have to do is to create an executable that you can distribute. It's going to be short, because deploying with Unity is (fairly) easy.

# Build Settings, Pt. 2

Building is in one window that we have already used.

Re-open the "File" -> "Build Settings" window.

On the left, you can select a platform. This will make the platform settings appears on the right.

[ ![platforms][platforms] ][platforms]

Choose the one you want and hit "Build & Run".

Let's try with the Web Player:

1. Select "Web Player" in "Platform"
2. Build the game.
3. Observe: it produces an HTML page with the game embedded in.
4. Try it.

This is the first and simplest way to distribute your game. You just have to host the two files on a server.

[ ![The web version][web_result] ][web_result]

# Player Settings

You may need to adjust some settings (like the resolution, the game name or some resources) for a specific platform.

You do that by going to the "Player Settings" panel:

* "File" -> "Build Settings" -> "Player Settings"

Or:

* "Edit" -> "Project Settings" -> "Player"

Here, we set the web player resolution to 1280 * 780:

[ ![Player settings][player_settings] ][player_settings]

# Deploying on Windows, Mac and Linux

There isn't much to say about these platforms. By choosing "PC, Mac & Linux Standalone", you will be able to select a specific operating system to target.

[ ![pc_target][pc_target] ][pc_target]

And that's (almost) all! Unity is really awesome to build and deploy.

# Bonus for Mac users: Deploying on iOS

Mobile deployment is a bit more complicated. You need to have the latest SDK (the official development tools) installed for the platform you target.

This also means that you need Mac OS X to release an iOS game.

We are going to look at the procedure for an iOS games. Our guess is that it is very similar for an Android game.

First, select "iOS" in the build window:

[ ![ios_build][ios_build] ][ios_build]

Open the "Player settings" view to change a few parameters (minimum SDK, icon, etc.).

<md-note>
_Tip_: If you want to test on a simulator, there's a trick. In the iOS "Player Settings", find the "SDK version" field. Then choose "Simulator SDK":
<br/><br />
[ ![ios_simulator][ios_simulator_mini] ][ios_simulator]
<br />
</md-note>

Build the project. Unity will prompt you to choose a location:

[ ![ios_build2][ios_build2] ][ios_build2]

In fact, Unity has generated an Xcode project:

[ ![ios_project_xcode][ios_project_xcode] ][ios_project_xcode]

That's why you really need to have all the development tools installed, otherwise you won't be able to even launch the project on an iOS device or simulator.

Open the `.xcodeproj` file with Xcode. Fortunately, we don't have much to do now, except launching the project:

[ ![ios_xcode][ios_xcode] ][ios_xcode]

Try to start the game. It should be deployed on the simulator. For example, on an iPad:

[ ![ios_result][ios_result] ][ios_result]

It's working!

Sprites are correctly displayed, the game is loading... But it is also unplayable, because touch controls are not implemented (except for the "tap" to fire that comes with the default input settings).

The resolution and the orientation are also not handled.

And finally, if you have a real device, you may discover that performances suck.

That's why mobile is not easy: you need to optimize and tweak your game to get the best from it on smartphones and tablets.

# Asset quality per platform

For some assets, you may need to specify a lower (or higher) quality for a given platform.

Look at the images, for example. You can lower the quality for mobile devices but keep it higher for desktop computers.

[ ![texture_specific_quality][texture_specific_quality] ][texture_specific_quality]

You need to keep in mind that there is going to be a tweaking and optimization phase at the end of your development.

# Next Step... Oh wait.

That's it. You've made it. The development is over.
You probably don't feel ready to make a full 2D game but _you are_. You need time and dedication now.

Go next to read the final last steps. :)


[platforms]: ./-img/platforms.png
[web_result]: ./-img/web_result.png
[player_settings]: ./-img/player_settings.png
[pc_target]: ./-img/pc_target.png
[texture_specific_quality]: ./-img/texture_specific_quality.png

[ios_build]: ./-img/ios_build.png
[ios_build2]: ./-img/ios_build_2.png
[ios_project_xcode]: ./-img/ios_project_xcode.png
[ios_simulator]: ./-img/ios_simulator.png
[ios_simulator_mini]: ./-img/ios_simulator_mini.png
[ios_xcode]: ./-img/ios_xcode.png
[ios_result]: ./-img/ios_result.png
