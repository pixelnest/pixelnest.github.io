---
layout: tutorial
title: Writing BulletML
subtitle: BulletML for Unity
show_ads: false
show_metadata: false

tutorial:
  show_label: false
  name: BulletML for Unity
  link: ../

links:
  summary: ../table-of-contents
  previous: ../how-to-use
  next: ../customization
---

So you tried our examples, maybe picked some new ones, but you don't know how to write your own BulletML file.

Fortunately, that's what we will cover in this section.
We suppose you know the basics of [XML](http://stackoverflow.com/tags/xml/info).

For a complete reference about the language, have a look at:

- [the BulletML reference](http://www.asahi-net.or.jp/~cs8k-cyu/bulletml/bulletml_ref_e.html)
- [the dmanning23's BUlletMLLib wiki](https://github.com/dmanning23/BulletMLLib/wiki)

# Preparing your project

You need to have the steps define before (plugin initialization) done in order to be able to test your pattern.

The simplest way to write without worrying of the integration is to use the demo (Demo_Showcase) and save your XML files with the others, in Resources/patterns.

# Minimum BulletML file

The smallest valid BulletML file looks like the following one:

```xml
<?xml version="1.0" ?>
<bulletml type="vertical" xmlns="http://www.asahi-net.or.jp/~cs8k-cyu/bulletml">
  <action label="top">
  </action>
</bulletml>
```

The language is well documented and even has a [DTD (Document Type Definition)](http://www.w3schools.com/dtd/) file, ``bulletml.dtd``, which as bundled in our package.

```xml
<?xml version="1.0" ?>
<!DOCTYPE bulletml SYSTEM "bulletml.dtd">
<bulletml type="vertical" xmlns="http://www.asahi-net.or.jp/~cs8k-cyu/bulletml">
  <action label="top">
  </action>
</bulletml>
```

We can take advantage of this file to make sure we are writing a valid definition.
All you need to do is to add ``DOCTYPE`` tag with a path the file (here, ./bulletml.dtd).

<md-note>
_Note_: Some developer tools, like Visual Studio, will take profit of the DTD file to update their auto-completion list.
<br />
This way, the editor will always suggests you a valid tag, attribute or value at a given location.
This is a great help and you should see if you can enable that feature in your favorite XML editor.
</md-note>

This pattern does... nothing, but it is valid.

```xml
<bulletml type="vertical" xmlns="http://www.asahi-net.or.jp/~cs8k-cyu/bulletml">
</bulletml>
```

* ``<bulletml>`` is the **root** tag.
Like <html> for a webpage, you should have *one and only one* as the top tag of your file.

The ``type`` attribute define your shooter orientation:

  * ``horizontal`` like *R-Type*
  * ``vertical``like *Ikaruga*.

The BulletML engine **does not** use this information, you may set it only for you game and level designers.

```xml
<!DOCTYPE bulletml SYSTEM "bulletml.dtd">
```

* ``<!DOCTYPE>`` is a meta for your XML editor and parser to enable validation with a DTD

```xml
<action label="top">
</action>
```

* ``<action label="top">`` The entry point of your pattern. We will see the ``action`` tag soon.

Before jumping in a concrete pattern construction, this is an explanation of the available tags and their parameters.

# Units

You will find three types of units in BulletML:

1. time = frames. Multiplied by the game speed. The BulletML engine is aimed to run at 60 frames per second.
2. speed = Unity's meters per frame. It will be multiplied by the game scale.
3. angle = 360 degrees clockwise

# Number

We will sometimes use ``NUMBER`` in our documentation.

``NUMBER`` is not just an integer. It can be also a float, or a mathematical expression like (1 + 2 * (4 / 5)).

Later we will introduce two variables, $rank and $rand, that can be used dynamically in those operation.

<md-note>
_Note_: NUMBER is computed by [Equationator](https://github.com/dmanning23/Equationator), an open-source C# lib.
</md-note>

# The bullet tag

BulletML is about... bullets. Projectiles shot by something usually evil that the player must destroy.

The ``<bullet>`` tag define:

* ``label``: the name of the bullet as an attribute.
* ``direction``, ``speed``: the **initial** properties of the bullet
* ``<action>``: the dynamic behavior

```xml
<bullet label="bullet1">
  <speed>1</speed>
  <direction>-45</direction>
  <action>
    <wait>120</wait>
    <vanish />
  </action>
</fire>
```

Notice that ``<bullet />``is valid, everyting is optional. It will create a simple no-name bullet with a constant behavior defined by its parent.

# The action tag

In BulletML, an action (tag ``<action>``) is a container of instructions.

## Available instructions

### fire and fireRef

```xml
<fire>
  <bullet />
</fire>
```

``<fire>`` creates a new bullet.

Firing an anonymous bullet with no initial properties will only make a static projectile.

You can give it an initial speed and direction:

```xml
<fire>
  <direction>0</direction>
  <speed>1</speed>
  <bullet />
</fire>
```

This should shoot a new projectile at a reasonable speed.

Notice that ``<fireRef>`` allows you to call a fire tag define in another context (but in the same file), using its label.

``<direction>`` and ``<speed>`` have some interesting attributes.

#### direction

```xml
<direction type="(aim | absolute | relative | sequence)">NUMBER</direction>
```

Direction has a ``type`` attributes with 4 possible values

1. aim: (default) Target the player ship
2. absolute: NUMBER is the angle (clockwise) of the shot
3. relative: NUMBER is an angle (clockwise) added to all other direction (fire, bullet, changeDirection)
4. sequence: Each frame, NUMBER is added to the previous direction result

#### speed

```xml
<speed type="(absolute | relative | sequence)">NUMBER</speed>
```

As for direction, speed comes with a ``type`` attribute with nearly the same possibility.
Refer to the previous enumeration, simply replace angle by speed.

The default value is ``absolute``.

Here's a simple example of bullet shot towards the player at low speed.

```xml
<?xml version="1.0" ?>
<!DOCTYPE bulletml SYSTEM "bulletml.dtd">
<bulletml>
	<action label="top">
		<fire>
		  <direction type="aim">0</direction>
		  <speed>1</speed>
		  <bullet />
		</fire>
	</action>
</bulletml>

```

[![fire example][fire]][fire]

### repeat

```xml
<repeat>
  <times>NUMBER</times>
  <action>
  </action>
</repeat>
```
A *for* loop: do the nested action a given number of *times*.

It is as simple as it seems. You can only define one action in the repeat node (but an action can be made of multiple actions).

Try to repeat the example we saw previously

```xml
<?xml version="1.0" ?>
<!DOCTYPE bulletml SYSTEM "bulletml.dtd">
<bulletml>
  <action label="top">
    <repeat>
      <times>42</times>
      <action>
        <fire>
          <direction type="aim">0</direction>
          <speed>1</speed>
          <bullet />
        </fire>
      </action>
    </repeat>
  </action>
</bulletml>
```

[![repeat example][repeat]][repeat]

[![repeat example hierarchy][repeat_hierarchy]][repeat_hierarchy]

Now we shoot at the player 42 aimed bullets. Problem, they are shot **simultaneously** !.
It would be much better is they were shot one after the other, **waiting** their turn.

### wait

And here comes the ``<wait>`` tag.

```xml
<wait>NUMBER</wait>
```

``<wait>`` will prevent an action from terminate until a number of frames has passed.

This is exactly what we need before!
With a small wait time between each shot, we will 42 **distinct** projectiles.

```xml
<?xml version="1.0" ?>
<!DOCTYPE bulletml SYSTEM "bulletml.dtd">
<bulletml>
  <action label="top">
    <repeat>
      <times>42</times>
      <action>
        <fire>
          <direction type="aim">0</direction>
          <speed>1</speed>
          <bullet />
        </fire>
        <wait>10</wait>
      </action>
    </repeat>
  </action>
</bulletml>
```

[![wait example][wait]][wait]

### action and actionRef

Quickly and simply: you can define an action **inside** another action.

Using ``<actionRef>`` you can also reuse an action define in another context (but in the same file), using its label.
You can even pass some parameters. This is very interesting to reuse a fire action and giving, for example, a different direction.

```xml
<?xml version="1.0" ?>
<!DOCTYPE bulletml SYSTEM "bulletml.dtd">
<bulletml>
  <action label="top">
    <actionRef label="shoot">
			<param>90</param>
		</actionRef>
		<wait>60</wait>
		<actionRef label="shoot">
			<param>-90</param>
		</actionRef>
  </action>

	<action label="shoot">
		<fire>
			<direction>$1</direction>
			<speed>1</speed>
			<bullet />
		</fire>
	</action>
</bulletml>
```

[![actionRef example][actionRef]][actionRef]

## Bullet specific instructions

Some instructions will not do anything outside of bullets.

```xml
<bullet>
  <action>
    <!-- Here or nothing happend -->
  </action>
</bullet>
```

### vanish

```xml
<vanish />
```

Destroy immediately the current bullet.

### changeSpeed and changeDirection

Update the properties of the parent ``<bullet>`` tag.

```xml
<changeSpeed>
  <speed>NUMBER</speed>
  <term>NUMBER</term>
</changeSpeed>
```

They both have a value tag, respectively ``<speed>`` or ``<direction>`` and a ``<term>``tag.

The term is the time (in frames, remember) that will take the change. A linear interpolation will be made to have intermediary values.

We define a reusable bullet outside the action, and fire it.

```xml
<?xml version="1.0" ?>
<!DOCTYPE bulletml SYSTEM "bulletml.dtd">
<bulletml>
  <action label="top">
    <fire>
      <bulletRef label="bullet1" />
    </fire>
  </action>
  <bullet label="bullet1">
    <speed>0.01</speed>
    <action>
      <changeSpeed>
        <speed>2</speed>
        <term>60</term>
      </changeSpeed>
    </action>
  </bullet>
</bulletml>
```

[![changeSpeed example][changeSpeed]][changeSpeed]

### accel

```xml
<accel>
  <horizontal>10</horizontal>
  <vertical>15</vertical>
  <term>60</term>
</accel>
```

Speed the bullet in a horizontal line and in a vertical line in frames.
Similar to changeSpeed but a more precise way to tweak the movement.

# $rank and $rank

Those are two variables that can be used for a NUMBER.

* $rank is the **game difficulty**. Its value is between 0 and 1 and is defined in the BulletManagerScript.

Use it to have a pattern getting harder while the difficulty increase (higher speeds, lower waits).

```
(1 + 1 * $rank)
```

Here, you have 1 at rank 0 (min) but 2 at rank 1 (max): . A simple way to double the speed for example.

* $rand is a **random** number between 0 and 1.

Use it to add a random behavior.

```
(360 * $rand)
```

This is an example of a random 0-360° direction.

You use those expression in place of ``NUMBER``. Here's a complete example: 

```xml
<?xml version="1.0" ?>
<!DOCTYPE bulletml SYSTEM "bulletml.dtd">
<bulletml>
  <action label="top">
    <repeat>
      <times>42</times>
      <action>
        <fire>
          <direction type="absolute">360 * $rand</direction>
          <speed>1 + 1 * $rank</speed>
          <bullet />
        </fire>
        <wait>10</wait>
      </action>
    </repeat>
  </action>
</bulletml>
```

The image below shows the random effect, but we invite you to change the game difficulty to also see the rank effect.

[![rand example][rand]][rand]

[fire]: ./-img/fire.gif
[repeat]: ./-img/repeat.gif
[repeat_hierarchy]: ./repeat_hierarchy.png
[wait]: ./-img/wait.gif
[actionRef]: ./-img/actionRef.gif
[changeSpeed]: ./-img/changeSpeed.gif
[rand]: ./-img/rand.gif
