---
layout: tutorial
title: Adding and displaying a background
author: Damien
date: 13/11/13

tutorial:
  name: Creating a 2D game with Unity
  link: ../

links:
  summary: ../table-of-contents
  previous: ../install-and-scene
  next: ../player-and-enemies
---

Using the empty project we created in the step before, we will now see how to add a background and some fancy clouds.

## Adding a background

Your first background will be static. We will use the following image:

[  ![TGPA background][background]  ][background]

Import the image in the _Textures_ folder (simply copy the file in it). Do not worry about the import settings for now.

In Unity, create a new game object. **A sprite**.

[  ![New sprite][new_sprite]  ][new_sprite]

What is a sprite?

In general, we call sprite a 2D image displayed in a video game. Here it's a Unity specific object made for 2D games.

Unity may have set automatically your background as the sprite to display. If not, or if you want to change, go to the inspector and select "background":

[  ![Select a sprite][sprite_select]  ][sprite_select]

We have set a simple cloudy background. Let's reorganize the scene.

In the _Hierarchy_, select the "New Sprite". Rename it in "Background1" or something you will easily remember.

Then move the object where it belongs: _Level->0 - Background_. Make it's position is (0, 0, 0).

[  ![Background is set][display_background]  ][display_background]

**A quick exercise**: duplicate the background and place it at (20,0,0). It should fit with the first part.

[  ![Background2 in place][background2_in_place]  ][background2_in_place]

## Adding background elements

Also known as "Props". Things that aren't used for gameplay but enhance visually the scene.

Here are some simple flying magically platform sprites:

[ ![Platform sprites][platforms] ] [platforms]

As you can see, we got two in one file. This is a good way to learn of to crop sprites with the new Unity tools.


### Getting two sprites from one image

- Import the image in your texture folder
- Select and go to the inspector
- Change _Sprite Mode_ to _Multiple_
- Click on _Sprite Editor_

[ ![Multiple sprites][sprite_multiple] ][sprite_multiple]

- In the new window, you can draw rectangles around each platform to tell Unity where the interesting content is:

[ ![Sprite Editor][sprite_editor] ][sprite_editor]

The top-left button "Slice" also allow you to quickly and automatically make this work.

Call the platforms "platform1" and "platform2". Now, under the image file, you should see the two sprites separately:

[ ![Sprite Editor result][sprite_editor_result] ][sprite_editor_result]

### Adding them to the scene

This is the same as for a background image: create a new sprite and select "platform1" sprite. Repeat for "platform2".

Place them in "1 - Middleground". Again make sure they have a 0 position for Z.

[ ![Two shiny new platforms][adding_platforms] ] [adding_platforms]

And... it's working! I'm still amazed how simple it is now (it was a bit tricky without the 2D tools).

### Prefabs

Save those platforms as prefabs. Just drag'n'drop from the _Hierarchy_ view to the _Project_ view, in the _Prefabs_ folder.

It will be easier to reuse them later, you just have to drag'n'drop the prefab in the scene! Try to add another platform that way.

[ ![Prefabs][prefabs] ] [prefabs]

You can now add more platforms, change their position, scale and plane (you can put some in background or foreground too, **just make sure that the platform z position is 0**.

For now it's not very fancy but in two chapters we will add a parallax scrolling and it will suddenly bring the scene to life.

## Layers

Before we get any further, we will modify our homemade layers to avoid any display order issue.

Simply change the Z position as following:

<table>
<tr>
<th>Layer</th>
<th>Z position</th>
</tr>
<tr>
<td>0 - Background</td>
<td>10</td>
</tr>
<tr>
<td>1 - Middleground</td>
<td>5</td>
</tr>
<tr>
<td>3 - Foreground</td>
<td>0</td>
</tr>
</table>

If you switch from 2D to 3D view in editor, you will clearly see the layers:

[ ![Layers in 3D view][layers_3d] ][layers_3d]

## Ready for the next step

You learned how to create a simple static background and how to display it properly. Then we saw how to make simple sprites from a an image.

Now we will see how to add the player and enemies.


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
