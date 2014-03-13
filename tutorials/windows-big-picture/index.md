---
layout: tutorial
title: A Big Picture machine
author: Matthieu
date: 14/03/14

tutorial:
  name: A Big Picture machine
  link: ./
---

[Steam][steam] is a widely-known product created by [Valve][valve]. It's the dominant platform to buy and download games on Windows, Mac (and Linux).

Recently, Valve has released a mode for Steam (which is an awful piece of software by the way) called "[Big Picture][bp]".

And… I must confess that it's pretty good.

Big Picture is the first brick of a new strategy developed by Valve: the goal is to create an OS dedicated to PC gaming, on a classic TV. 

In the future, you will be able to use [SteamOS][steam_os] (a linux-based container for Big Picture) running on a [Steam Machine][steam_machine] with a [Steam Controller][steam_controller]. However, those days are still far away and the first Steam Machines have just been announced.

# Big Picture

Okay, we have seen the (sorry) big picture. But what is exactly Big Picture?

[![Big Picture][img_bp]][img_bp]

At the moment, not much. 

Basically, it's a new UI on top of Steam, which allows you to launch game, access the Steam Overlay (to speak with your friends inside a game), browse the web and control everything with a gamepad.

Ironically, a lot of players dislike Big Picture. Indeed, on a standard computer, having a fullscreen media center to play games is not really useful.

# So, why would I want that?

1. Because you have just bought a barebone ([this][nuc]) or an HTPC for your TV and you want to put a Windows with Steam onto it.
2. Because you don't want to wait for an official Steam Machine.
3. Because you have a Mac.

Personally, I have an iMac sitting in my office. And although OS X is largely superior to Windows, there is still one area where the OS lags behind: gaming (the situation is not *that* bad, but still).

My solution has been to create a dual-boot with Windows. The sole purpose of Windows is to start Steam and never show up again.

_That's a perfect situation for Big Picture._

However, the experience is not perfect by default: even if I can configure Steam to start directly and launch Big Picture, the Windows desktop is still visible, and I don't have the feeling that I'm using a *Big Picture Machine*.

# Turning Windows into a Big Picture machine

The purpose of this tutorial is to transform a fresh Windows installation into a "Big Picture machine".

At the end of this quick tutorial, your computer will have no trace of Windows visible. And that's great (especially with a [SSD][ssd]).

<md-note>
Be aware that the goal of this tutorial is to hide Windows completely. If you still need to use Windows (e.g., for MS Office, programming, designing, etc.), it won't be practical to follow this tutorial.
</md-note>

# About this tutorial

I have tested this tutorial on a Windows 7 Professional. It should work correctly on any Windows 7 or Windows 8, but I don't have that number of licences to try every configuration.

If you find a typo, a mistake or a misspelling, let me know on [our twitter][pxn_twitter_link]. You can also contact me by [mail][pxn_mailto].

If you want further informations about a specific topic, or a clarification on a chapter, I would be happy to hear you.

Finally, you can follow Pixelnest on [twitter][pxn_twitter_link] if you like what we do. :)

This tutorial is redacted by [Matthieu][mog_twitter_link]. I hope you will enjoy it.

<br />

Let's proceed...

# Preamble

There are some steps in this tutorial that can damage your Windows if you don't proceed with care.

*You do it at your own risks. I (and Pixelnest) accept no responsibility.*

However, don't be afraid by what I've just said: the tutorial is really simple and I will guide you through the steps. 

# 1. Windows

This tutorial is perfectly viable with an existing Windows installation. However, if you like to keep your computer clean, start with a fresh installation. It will run faster because only Steam will be installed.

# 2. Steam

The first thing you have to do is to install Steam on your machine.

Go on the [Steam website to download the software][install_steam].


[pxn_mailto]: mailto:site@pixelnest.io "Pixelnest Mail"
[pxn_twitter_link]: http://twitter.com/pixelnest "Pixelnest Studio Twitter"
[mog_twitter_link]: http://twitter.com/solarsailer "Matthieu Oger Twitter"

[steam]: http://store.steampowered.com/
[valve]: http://www.valvesoftware.com/
[bp]: http://store.steampowered.com/bigpicture/

[steam_os]: http://store.steampowered.com/livingroom/SteamOS/
[steam_machine]: http://store.steampowered.com/livingroom/SteamMachines/
[steam_controller]: http://store.steampowered.com/livingroom/SteamController/

[nuc]: http://www.intel.com/content/www/us/en/nuc/overview.html
[ssd]: http://en.wikipedia.org/wiki/Solid-state_drive

[install_steam]: http://store.steampowered.com/about/

[img_bp]: ./-img/big_picture.png