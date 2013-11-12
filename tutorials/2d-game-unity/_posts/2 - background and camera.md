---
layout: post
title: Adding and displaying a background
subtitle: Creating a 2D game with Unity
author: Damien
---

## Chapters

<Sommaire ici>

## Summary

Using the empty project we created in the step before, we will now see how to add a background and some fancy clouds.

[Download the project from step 1]()

## Adding a background

Your first background will be static. We will use the two following images:

[  ![TGPA background][background]  ][background]

Import the image in the _Textures_ folder (simply copy the file in it). Do not worry about the import settings for now. 

In Unity, create a new game object. **A quad**.

[  ![New quad][new_quad]  ][new_quad]

What is a quad? 

It's the simplest model possible. It is just 2 triangles assembled to make a rectangle. It's only visible from the front, the object is totally invisible from behind.

This mesh type is made for 2D sprite:

- Only 2 triangles, fast and light
- The UV mapping is reversed, so an image is displayed in the right direction (otherwise it is 180° rotated).
- It has the same capabilities of any other object (= you can add any kind of component)
 
So you have a square in the middle of nowhere.

Drag and drop the image, _background_, to the quad displayed in the editor window. It will apply the picture as a texture to the quad.

[  ![Apply background texture via drag'n'drop][dnd_background]  ][dnd_background]

Check the _Materials_ folder. Unity has automatically created a basic material for us. As we have a completely filled background, a default shader is enough. Later we will need to tweak it to use transparency.

[  ![Applied background texture via drag'n'drop][dnd_background_applied]  ]

In the _Hierarchy_, select the "Quad". Rename it in "Background Part 1" or something you will easily remember.

Then move the object where it belongs: _Level->0 - Background_. You can also simplify it by removing the mesh collider, as we won't have any collision with the background.

And enlarge. A lot. Let's use a 20x20 scale and place it at (-10,0,0). You should get this:

[  ![Background in place][background_in_place]  ][background_in_place]

_Background_ is in place. The game preview is still dark, but it's ok, we will tweak the camera and the light later.

**A quick exercise**: duplicate the background and place it at (10,0,0). It should fit with the first part.

[  ![Background2 in place][background2_in_place]  ][background2_in_place]

## The camera

Time to set the camera properly.

### Lightning

First, lightning. The choice is yours: no light at all or a global light for the scene.

#### Lights off

- Set the default light to white, which is like not having lights:
	- Go to _Edit->Render Settings_
	
	[ ![Render settings][render_settings] ] [render_settings]

	- Change the _Ambient Light_ to white
	
	[ ![Ambient light settings][ambient_light] ] [ambient_light]

#### Directional light

- Set a directional light pointed toward the scene. This will allow you to use shadows.

	[ ![Directional light][directional_light] ] [directional_light]

This is like a sun, don't face it directly to your scene or it will "burn" the colors. Tweaks the light rotation to find what seems the best for you.



We will stick to the first solution but I encourage you to try both. Especially the second one, try a _Point Light_ and see the possibilities.

The game preview should now be clearer. But we can only see clouds, let's fix this.

### Camera settings

Select the camera "Main Camera". Change the projection mode to **Orthographic**. (An Orthographic camera means that very object is represented at the same distance, this completely removes the 3D effect)

Set the _Size_ to 10. **Make sure your camera is at (0, 0, -10)**. The backgrounds should fit the screen.

[ ![Camera settings][camera] ] [camera]

If you change the camera Z position between -1 and -999, nothing will happen. Do the same thing in perspective, and you will see the distance. This is the difference between the two camera: in orthographic, everything is rendered at the same depth.

Orthographic is a good choice for pure 2D games. With few tweaks you can even have an isometric view for no cost (see bonus chapter).

## Adding background elements

Aka "Props". Things that aren't used for gameplay but enhance visually the scene.

Here are some simple flying magically platform sprites:

[ ![Platform sprite 1][platform1] ] [platform1]
[ ![Platform sprite 2][platform2] ] [platform2]

- Import them in your texture folder
- Create two quads
- Remove the mesh collider
- Place them at (whatever, whatever, 0) 
- Scale them to 5x5x1
- Rename them "Platform 1" and "Platform 2"
- Drag and drop each platform image to one
- Then move them both to the _1 - Middleground_ object.

This is the same as for a background image.

And... it's not working!
Or a least not well at all. Two things:
- Transparency is not set
- Playing with the editor camera will reveal them, glitching with the background. This is called **Z fighting**, when two object are rendered at the same depth and the GPU don't know what to do.

[ ![Platforms and Z fighting][platform_fail] ] [platform_fail]

### The transparency

First thing first, we use a png file with a lot of transparency, we need to get it working in the game.

This is quite easy. The issue is that the game doesn't know yet that the transparency alpha channel should be used when displaying the sprite.

And this is a parameter of... the material, the link between the source image and the render.

Change the shader (a graphic card program) of each platform from _Diffuse_ to _Transparency -> Cutout -> Diffuse_. Should be better.

[ ![Change platform material shader][platform_shader] ] [platform_shader]

[ ![Platform with transprency][platform_shader_transparency] ] [platform_shader_transparency]
 

### Fighting the Z-fighting

As we saw before, the camera will not render the depth. So the easiest way to avoid Z glitchs is to put unrelated objects on a separate plane.

Change some Z coordinates:
- _0 - Background_ at (0,0,5)
- _2 - Foreground_ at (0,0,-5)

Numbers doesn't matter, just make sure your camera is at least a bit in front of your upfront game object otherwise it won't be visible.

Your game view hasn't changed, except there aren't glitches anymore. But in the editor view you can now clearly see the back, middle (selected here) and foreground:

[ ![Depth result][depth] ] [depth]

### The result

Now you should have proper platforms. You can scale / move them, add things on it, etc.

And that's it. You made a 2D sprite with Unity. We will use this often: **quad + texture + transparency shader**.

### Prefabs

Save those platforms as prefabs. Just drag'n'drop from the _Hierarchy_ view to the _Project_ view, in the _Prefabs_ folder.

It will be easier to reuse them later, you just have to drag'n'drop the prefab in the scene! Try to add another platform that way.

[ ![Prefabs][prefab] ] [prefab]

You can now add platforms, change their position, scale and plane (you can put some in background or foreground too, **just make sure that the platform z position is 0**.

For now it's not very fancy but in two chapters we will add a parallax scrolling and it will suddenly bring the scene to life.

## Ready for the next step

You learned how to create a simple static background and how to display it properly. Then we saw how to make simple sprites from a Cloud image.

Now we will see how to add the player and enemies.

[Take me to the next step]()


[background]: ./background.png

[new_quad]: ./new_quad.png

[dnd_background]: ./dnd_background.png

[dnd_background_applied]: ./dnd_background_applied.png

[background_in_place]: ./background_in_place.png

[background2_in_place]: ./background2_in_place.png

[render_settings]: ./render_settings.png

[ambient_light]: ./ambient_light.png

[directional_light]: ./directional_light.png

[camera]: ./camera.png

[platform1]: ./platform1.png

[platform2]: ./platform2.png

[platform_fail]: ./platform_fail.png

[platform_shader]: ./platform_shader.png

[platform_shader_transparency]: ./platform_shader_transparency.png

[depth]: ./depth.png

[prefab]: ./prefab.png