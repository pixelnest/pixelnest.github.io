---
layout: tutorial
title: Adding and displaying a background
date: 13/11/18

show_promotion: steredenn

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

Import the image in the "sprites" folder. Simply copy the file in it, or drag and drop it from the explorer.

Do not worry about the import settings for now.

In Unity, create a new `Sprite` game object in the scene.

[ ![New sprite][new_sprite] ][new_sprite]

## What is a sprite?

In general, we call "sprite" a 2D image displayed in a video game. Here, it's a Unity specific object made for 2D games.

## Add the texture to the sprite

We will now select the actual sprite to display. Make sure that "New Sprite" is selected and look at the inspector. Set the `Sprite` property to the "background" image:

[ ![Select a sprite][sprite_select] ][sprite_select]

_(You have to click on the small round icon at the right of the input box to show the "Select Sprite" inspector)_

You can see that some other sprites are there. Those are the default images used by uGUI (the Unity UI system).

<div data-block="note">
  **"My sprite doesn't show up in the dialog?"**: first, make sure you are in the "Assets" tab of the "Select Sprite" dialog.

  Some readers have reported that, in their project, this dialog was empty. The reason is that for some Unity installations, even with a fresh new 2D project, images are imported as "Texture" and not "Sprite".

  To fix this, you need to select the image in the "Project" pane, and in the "Inspector", change the "Texture Type" property to "Sprite":

  [ ![Sprite mode][sprite] ][sprite]

  We don't know why everybody doesn't seem to have the same behavior.
</div>

Well, we have set a simple sprite displaying a cloudy sky background. You can think it was a bit complicated just for that. In fact, we could have dragged the sprite from the "Project" tab directly right into the "Scene".

Let's reorganize the scene.

In the "Hierarchy" pane, select the `New Sprite`. Rename it in `Background1` or something you will easily remember.

Then move the object to where it belongs: `Level -> Background`. Change its position to `(0, 0, 0)`.

[ ![Background is set][display_background] ][display_background]

A quick exercise: duplicate the background and place it at `(20, 0, 0)`. It should fit perfectly with the first part.

<div data-block="tip">
  **Tip**: you can duplicate an objet with the `cmd + D` (OS X) or `ctrl + D` (Windows) shortcuts.
</div>

[ ![Background2 in place][background2_in_place] ][background2_in_place]

# Sprite layers

The next statement will seem pretty obvious, but it has some consequences: we are displaying a 2D world.

This means that all images are at the same depth, ie. `0`. And you (as well as the graphics engine) don't really know who's going to be displayed first.

Sprite layers allow us to tell Unity what is in the front and what is in the back.

In Unity, we can change the "Z" of our elements, and this will allow us to have layers. This is actually what we were doing in this tutorial before the Unity 5 update.

But we thought that it was a good idea to use Sprite Layers.

On your "Sprite Renderer" component, you have a field named… "Sprite Layer", currently set to `Default`.

If you click on it, a short list will show:

[ ![Sorting layer list][sorting_layers_list] ] [sorting_layers_list]

Let's add some layers to fit our needs (use the "+" button):

[ ![Sorting layer add][sorting_layers_add] ] [sorting_layers_add]

Apply the `Background` layer to our background sprite:

[ ![Set sorting layer][sorting_layers_set] ] [sorting_layers_set]

<div data-block="tip">
  **Tip**: the settings "Order in Layer" is a way to limit sub-layers. Sprites with lower numbers are rendered **before** sprites with greater numbers.
</div>

<div data-block="note">
  **Note**: the "Default" layer cannot be removed, because this is the layer used by 3D elements. You can have 3D objects in your 2D game. Particles are considered as 3D objects by Unity, so they will be rendered on this layer.
</div>

# Adding background elements

Also known as _props_. These elements aren't used to improve the gameplay but to visually enhance the scene.

Here are some simple flying platform sprites:

[ ![Platform sprites][platforms] ] [platforms]

_(Right click to save the image)_

As you can see, we got two platforms in one file. This is a good way to learn how to crop sprites with the Unity tools.

## Getting two sprites from one image

1. Import the image in your "sprites" folder
2. Select the "platforms" sprite and go to the inspector
3. Change "Sprite Mode" to "Multiple"
4. Click on "Sprite Editor"

[ ![Multiple sprites][sprite_multiple] ][sprite_multiple]

In the new window ("Sprite Editor"), you can draw rectangles around each platform to _slice_ the texture into smaller parts:

[ ![Sprite Editor][sprite_editor] ][sprite_editor]

Call the platforms "platform1" and "platform2".

<div data-block="tip">
  **Tip**: the top-left button "Slice" allows you to quickly and automatically make this tedious task.

  Unity will find the objects inside the image and will slice them automatically. You can specify the default pivot point, or set a minimum size for a slice. For a simple image without artifacts, it's really efficient. However, if you use this tool, _be careful and check the result_ to be sure to get what you want.
</div>

Now, under the image file, you should see the two sprites separately:

[ ![Sprite Editor result][sprite_editor_result] ][sprite_editor_result]

## Adding them to the scene

We will proceed like for the background sprite: create a new `Sprite` and select the "platform1" sprite (or drag them **one by one** from the "Project" to the "Scene" tab). Repeat for "platform2".

Set their "Sprite Layer" to "Platforms".

Place them in the `Middleground` object.

[ ![Two shiny new platforms][adding_platforms] ] [adding_platforms]

And... it's working! I'm still amazed how simple it is now (to be honest, it was a bit tricky without the 2D tools, involving quad and image tiling).

## Prefabs

Save those platforms as prefabs. Just drag'n'drop them inside the "Prefabs" folder of the "Project" pane from the "Hierarchy":

[ ![Prefabs][prefabs] ] [prefabs]

By doing so, you will create a `Prefab` based exactly on the original game object. You can notice that the game object that you have converted to a `Prefab` presents a new row of buttons just under its name:

[ ![Prefab connection][prefab_link] ][prefab_link]

<div data-block="note">
  **Note on the "Prefab" buttons**: if you modify the game object later, you can "Apply" its changes to the `Prefab` or "Revert" it to the `Prefab` properties (canceling any change you've made on the game object). The "Select" button move your selection directly to the `Prefab` asset in the "Project" view (it will be highlighted).
</div>

Creating prefabs with the platform objects will make them easier to reuse later. Simply drag the `Prefab` into the scene to add a copy. Try to add another platform that way.

You are now able to add more platforms, change their positions, scales and planes.

You can put some in background or foreground too. Remember that the "Background", "Middleground" and "Foreground" objects are just folders. So you need to set the right "Sprite Layer" (Platforms) and change the "Order in Layer".

Use `-10` for far platforms, and increase this number as you reach the foreground. An example:

[ ![Add a platform in background][platform_background] ][platform_background]

It's not very fancy but in two chapters we will add a parallax scrolling and it will suddenly bring the scene to life.

# Camera and lights

Well. In the previous version of this tutorial (for Unity 4.2), we had a long and detailed explanation on how to set the camera and the lights for a 2D game.

The good news is that it's completely useless now. You have nothing to do. It just works™.

<div data-block="info">
  **Aside**: if you click on the `Main Camera` game object, you can see that it has a "Projection" flag set to "Orthographic". This is the setting that allows the camera to render a 2D game without taking the 3D into account. Keep in mind that even if you are working with 2D objects, Unity is still using its 3D engine to render the scene. The gif above shows this well.
</div>

# Next step

You have just learned how to create a simple static background and how to display it properly. Then, we have taught you how to make simple sprites from an image.

In the next chapter, we will learn how to add a player and its enemies.


[background]: ./-img/background.png
[platforms]: ./-img/platforms.png
[sprite]: ./-img/sprite.png
[new_sprite]: ./-img/new_sprite.png
[sprite_select]: ./-img/sprite_select.png
[display_background]: ./-img/display_background.png
[background2_in_place]: ./-img/background2_in_place.png

[sorting_layers_list]: ./-img/sorting_layers.png
[sorting_layers_add]: ./-img/sorting_layers_add.png
[sorting_layers_set]: ./-img/sorting_layers_set.png

[sprite_multiple]: ./-img/sprite_multiple.png
[sprite_editor]: ./-img/sprite_editor.png
[sprite_editor_result]: ./-img/sprite_editor_result.png
[adding_platforms]: ./-img/adding_platforms.png
[layers_3d]: ./-img/layers.gif
[prefabs]: ./-img/prefabs.png
[prefab_link]: ./-img/prefab_link.png

[platform_background]: ./-img/platform_background.png
