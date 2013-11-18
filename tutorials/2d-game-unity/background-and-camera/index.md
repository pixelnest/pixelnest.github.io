---
layout: tutorial
title: Adding and displaying a background
date: 13/11/18

tutorial:
  name: Creating a 2D game with Unity
  link: ../

links:
  summary: ../table-of-contents
  previous: ../install-and-scene
  next: ../player-and-enemies
---

Using the empty project we created in the previous part, we will now learn how to add a background and some fancy clouds.

# Adding a background

Your first background will be static. We will use the following image:

[ ![TGPA background][background] ][background]

_(Right click to save the image)_

Import the image in the "Textures" folder. Simply copy the file in it, or drag and drop it from the explorer.

Do not worry about the import settings for now.

In Unity, create a new ``Sprite`` game object in the scene.

[ ![New sprite][new_sprite] ][new_sprite]

## What is a sprite?

In general, we call "sprite" a 2D image displayed in a video game. Here, it's a Unity specific object made for 2D games.

## Add the texture to the sprite

Unity may have set automatically your background as the sprite to display. If not, or if you want to change the texture, go to the inspector and select "background":

[ ![Select a sprite][sprite_select] ][sprite_select]

_(You have to click on the small round icon at the right of the input box to show the "Select Sprite" inspector)_

Well, we have set a simple sprite displaying a cloudy sky background. Let's reorganize the scene.

In the "Hierarchy" pane, select the ``New Sprite``. Rename it in ``Background1`` or something you will easily remember.

Then move the object to where it belongs: ``Level -> 0 - Background``. Change its position to ``(0, 0, 0)``.

[ ![Background is set][display_background] ][display_background]

A quick exercise: duplicate the background and place it at ``(20, 0, 0)``. It should fit perfectly with the first part.

<md-tip>
_Tip_: You can duplicate an objet with the ``cmd + D`` (OS X) or ``ctrl + D`` (Windows) shortcuts.
</md-tip>

[ ![Background2 in place][background2_in_place] ][background2_in_place]

# Adding background elements

Also known as _props_. These elements aren't used to improve the gameplay but to visually enhance the scene.

Here are some simple flying platform sprites:

[ ![Platform sprites][platforms] ] [platforms]

_(Right click to save the image)_

As you can see, we got two platforms in one file. This is a good way to learn how to crop sprites with the new Unity tools.

## Getting two sprites from one image

1. Import the image in your "Textures" folder
2. Select the "platforms" sprite and go to the inspector
3. Change "Sprite Mode" to "Multiple"
4. Click on "Sprite Editor"

[ ![Multiple sprites][sprite_multiple] ][sprite_multiple]

In the new window ("Sprite Editor"), you can draw rectangles around each platform to _slice_ the texture into smaller parts:

[ ![Sprite Editor][sprite_editor] ][sprite_editor]

The top-left button "Slice" allow you to quickly and automatically make this tedious task:

[ ![Automatic slicing][slice] ][slice]

Unity will find the objects inside the image and will slice them automatically. You can specify the default pivot point, or set a minimum size for a slice. For a simple image without artifacts, it's really efficient. However, if you use this tool, _be careful and check the result_ to be sure to get what you want.

For this tutorial, do it manually first. Call the platforms "platform1" and "platform2".

Now, under the image file, you should see the two sprites separately:

[ ![Sprite Editor result][sprite_editor_result] ][sprite_editor_result]

## Adding them to the scene

We will proceed like for the background sprite: create a new ``Sprite`` and select the "platform1" sprite. Repeat for "platform2".

Place them in the ``1 - Middleground`` object. Again make sure they have a ``0`` Z position.

[ ![Two shiny new platforms][adding_platforms] ] [adding_platforms]

And... it's working! I'm still amazed how simple it is now (to be honest, it was a bit tricky without the 2D tools, involving quad and image tiling).

## Prefabs

Save those platforms as prefabs. Just drag'n'drop them inside the "Prefabs" folder of the "Project" pane from the "Hierarchy":

[ ![Prefabs][prefabs] ] [prefabs]

By doing so, you will create a ``Prefab`` based exactly on the original game object. You can notice that the game object that you have converted to a ``Prefab`` presents a new row of buttons just under its name:

[ ![Prefab connection][prefab_link] ][prefab_link]

<md-note>
_Note on the "Prefab" buttons_: If you modify the game object later, you can "Apply" its changes to the ``Prefab`` or "Revert" it to the ``Prefab`` properties (canceling any change you've made on the game object). The "Select" button move your selection directly to the ``Prefab`` asset in the "Project" view (it will be highlighted).
</md-note>

Creating prefabs with the platform objects will make them easier to reuse later. Simply drag the ``Prefab`` into the scene to add a copy. Try to add another platform that way.

You are now able to add more platforms, change their positions, scales and planes (you can put some in background or foreground too, **just make sure that the platform Z position is ``0`**).

It's not very fancy but in two chapters we will add a parallax scrolling and it will suddenly bring the scene to life.

# Layers

Before we get any further, we will modify our homemade layers to avoid any display order issues.

Simply change the Z position of the game objects in your "Hierarchy" view as following:

| Layer            | Z Position |
| ---------------- | ---------- |
| 0 - Background   | 10         |
| 1 - Middleground | 5          |
| 2 - Foreground   | 0          |

If you switch from 2D to 3D view in the "Scene" view, you will clearly see the layers:

[ ![Layers in 3D view][layers_3d] ][layers_3d]

# Camera and lights

Well. In the previous version of this tutorial (for Unity 4.2), we had a long and detailed explanation on how to set the camera and the lights for a 2D game.

The good new is that it's completely useless now. You have nothing to do. It just works™.

<md-info>
_Aside_: If you click on the ``Main Camera`` game object, you can see that it has a "Projection" flag set to "Orthographic". This is the setting that allows the camera to render a 2D game without taking the 3D into account. Keep in mind that even if you are working with 2D objects, Unity is still using its 3D engine to render the scene. The gif above shows this well.
</md-info>

# Next step

You have just learned how to create a simple static background and how to display it properly. Then, we have taught you how to make simple sprites from a an image.

In the next chapter, we will learn how to add a player and its enemies.


[background]: ./-img/background.png
[platforms]: ./-img/platforms.png
[new_sprite]: ./-img/new_sprite.png
[sprite_select]: ./-img/sprite_select.png
[display_background]: ./-img/display_background.png
[background2_in_place]: ./-img/background2_in_place.png
[sprite_multiple]: ./-img/sprite_multiple.png
[sprite_editor]: ./-img/sprite_editor.png
[sprite_editor_result]: ./-img/sprite_editor_result.png
[adding_platforms]: ./-img/adding_platforms.png
[layers_3d]: ./-img/layers.gif
[prefabs]: ./-img/prefabs.png
[prefab_link]: ./-img/prefab_link.png
[slice]: ./-img/slice.png
