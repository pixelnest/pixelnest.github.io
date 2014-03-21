---
layout: tutorial
title: "Documentation: Pattern file"
subtitle: BulletML for Unity
show_ads: false
show_metadata: false

tutorial:
  show_label: false
  name: BulletML for Unity
  link: ../

links:
  summary: ../table-of-contents
  previous: ../customization
  next: ../support
---

For the moment, you have tried some examples (maybe some new ones you've find on the web), but you still don't know how to write your own BulletML file.

Fortunately, that's what we will cover in this section. We will suppose you know the basics of [XML](http://stackoverflow.com/tags/xml/info).

For a complete reference about the language, have a look at:

- [BulletML reference documentation](http://www.asahi-net.or.jp/~cs8k-cyu/bulletml/bulletml_ref_e.html)
- [dmanning23's BUlletMLLib wiki](https://github.com/dmanning23/BulletMLLib/wiki)

# Preparing your project

You need to have followed the steps before (the plugin initialization with the `BulletManagerScript`) in order to be able to test your pattern.

The simplest way to write without worrying about the integration is to use the demo (`Demo_Showcase`) and save your XML files with the others, in `Resources/patterns`.

# Minimum BulletML file

The smallest valid BulletML file looks like this:

```xml
<?xml version="1.0" ?>
<bulletml type="vertical" xmlns="http://www.asahi-net.or.jp/~cs8k-cyu/bulletml">
  <action label="top">
  </action>
</bulletml>
```

The language is well documented and even has a [DTD (Document Type Definition)](http://en.wikipedia.org/wiki/Document_type_definition). We bundle it with the package (the `bulletml.dtd` file).

```xml
<?xml version="1.0" ?>
<!DOCTYPE bulletml SYSTEM "bulletml.dtd">
<bulletml type="vertical" xmlns="http://www.asahi-net.or.jp/~cs8k-cyu/bulletml">
  <action label="top">
  </action>
</bulletml>
```

We can take advantage of this file to make sure we are writing a valid pattern.

All you need to do is to add the `DOCTYPE` tag with a path to the DTD (here, `./bulletml.dtd`) at the top your document.

<md-note>
_Note_: Some developer tools, like Visual Studio, will take profit of the DTD file to update their auto-completion list.
<br /><br />
This way, the editor will always suggest you a valid tag, attribute or value at a given location.
This is a great help and you should see if you can enable that feature in your favorite XML editor.
</md-note>

The pattern above does... nothing but is valid nonetheless.

## Explanation

Let's deconstruct the previous pattern:

### Doctype definition

```xml
<!DOCTYPE bulletml SYSTEM "bulletml.dtd">
```

Basically, the `<!DOCTYPE>` tag is a meta for your XML editor and parser to enable validation with a DTD.

### Root element

```xml
<bulletml type="vertical" xmlns="http://www.asahi-net.or.jp/~cs8k-cyu/bulletml">
</bulletml>
```

`<bulletml />` is the _root_ tag.

Like `<html />` in a webpage, you should have *one* and *only one* `<bulletml />` tag in your file.

e.g., this is invalid:

```xml
<bulletml type="vertical" xmlns="http://www.asahi-net.or.jp/~cs8k-cyu/bulletml">
</bulletml>
<bulletml type="vertical" xmlns="http://www.asahi-net.or.jp/~cs8k-cyu/bulletml">
</bulletml>
```

The `type` attribute defines your shooter orientation:

  * `horizontal` like *[R-Type](http://en.wikipedia.org/wiki/R-Type)*
  * `vertical` like *[Ikaruga](http://en.wikipedia.org/wiki/Ikaruga)*.

The BulletML engine _does not_ use this information but it may still be useful for your game and level designers.

### Action tag

```xml
<action label="top">
</action>
```

The `<action label="top">` tag is the entry point of your pattern. We will look at the `action` tag soon.

# Datatypes

## Units

You will find three types of units in BulletML:

1. `time` — expressed in frames by second. The BulletML engine is aimed to run at 60 frames per second, so 60 FPS is one second.

  The time depends on the Game Speed (which can accelerate or slow down the pattern).

2. `speed` — expressed in Unity's meters per frame. It will be multiplied by the game scale.
3. `angle` — expressed in degrees and always oriented clockwise.

## Number

Sometimes, we will use the `NUMBER` value.

`NUMBER` is not just an `integer`. It can also be a `float` or a mathematical expression like `(1 + 2 * (4 / 5))`.

Later, we will also introduce two new variables, `$rank` and `$rand`, that can be used dynamically in those operations.

<md-info>
_Note_: `NUMBER` is computed by [Equationator](https://github.com/dmanning23/Equationator), an open-source C# lib.
</md-info>

# Bullet tag

BulletML is about... bullets. The projectiles shot by something usually evil that the player must destroy.

## Content

### Attributes

* `label` — name of the bullet.

### Children

* `direction` — _initial_ direction.
* `speed` — _initial_ speed.
* `action` — dynamic behavior.

## Example

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

Notice that `<bullet />` is valid. Everything else is optional.

<md-note>
_Empty bullet_: Using an empty `<bullet />` will create a simple no-name bullet with a constant behavior defined by its parent.
</md-note>

# Action tag

In BulletML, an action (`<action />`) is a container of instructions.

## Instruction: fire

`<fire />` creates a new bullet.

```xml
<fire>
  <bullet />
</fire>
```

Firing an anonymous bullet with no initial properties will only make a static projectile.

You can give it an initial `<speed />` and `<direction />`:

```xml
<fire>
  <direction>0</direction>
  <speed>1</speed>

  <bullet />
</fire>
```

This should shoot a new projectile at a reasonable speed.

The `<direction />` and `<speed />` tags have some interesting attributes.

### direction

```xml
<direction type="(aim | absolute | relative | sequence)">NUMBER</direction>
```

The `<direction />` tag has a `type` attribute with 4 possible values:

1. `aim` (default) — Target the player ship.
2. `absolute` — `NUMBER` is the `angle` (clockwise) of the shot.
3. `relative` — `NUMBER` is an `angle` (clockwise) added to all other directions (`fire`, `bullet`, `changeDirection`).
4. `sequence` — Each frame, `NUMBER` is added to the previous direction result.

### speed

```xml
<speed type="(absolute | relative | sequence)">NUMBER</speed>
```

Like for `<direction />`, `<speed />` comes with a `type` attribute which has nearly the same values:

1. `absolute` (default) — `NUMBER` is the `speed` of the shot.
2. `relative` — `NUMBER` is a `speed` which depends on all other speeds.
3. `sequence` — Each frame, `NUMBER` is added to the previous direction result.

<br />Here's a simple example of a bullet shot that moves toward the player at a low speed:

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

The result:

[![fire example][fire]][fire]

## Instruction: fireRef

The `<fireRef />` tag allows you to call a `<fire />` tag defined in another context (but in the same file), using its label.

## Instruction: repeat

The `<repeat />` tag is basically a *for* loop. It executes the nested action a given number of *times*.

```xml
<repeat>
  <times>NUMBER</times>
  <action>
  </action>
</repeat>
```

It is as simple as it seems. You can only define _one action_ in the repeat node (but an action can be made of multiple actions).

The pattern below repeats the example we saw previously:

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

The result:

[![repeat example][repeat]][repeat]

And the hierarchy:

[![repeat example hierarchy][repeat_hierarchy]][repeat_hierarchy]

Now, we shoot 42 bullets toward the player. The problem is... they are all shot **simultaneously**!

It would be much better if they were shot one after the other, _waiting_ for their turn.

## Instruction: wait

And here comes the `wait` instruction.

The `<wait />` tag will prevent the termination of an action until a specified number of frames has passed.

```xml
<wait>NUMBER</wait>
```

This is exactly what we needed before!

With a small wait time between each projectile, we will shoot 42 **distinct** bullets.

The pattern:

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

And the result with the `wait` instruction:

[![wait example][wait]][wait]

## Instruction: action and actionRef

Simply: you can nest an `<action />` **inside** another action.

Using `<actionRef>`, you can also reuse an action defined in another context (but in the same file) by specifying its label.

You can even pass some parameters. This is very interesting to reuse a fire action and giving, for example, a different direction:

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

<md-note>
_$1_: Name of the first parameter.
</md-note>

The result:

[![actionRef example][actionRef]][actionRef]

# Bullet instructions

Some instructions will not do anything outside of a `<bullet />`.

```xml
<bullet>
  <action>
    <!-- Here or nothing will happen. -->
  </action>
</bullet>
```

## Instruction: vanish

Destroy immediately the current parent `<bullet />`.

```xml
<vanish />
```

## Instruction: change

Update the properties of the parent `<bullet>` tag.

### changeSpeed

The `<changeSpeed />` tag:

```xml
<changeSpeed>
  <speed>NUMBER</speed>
  <term>NUMBER</term>
</changeSpeed>
```

### changeDirection

The `<changeDirection />` tag:

```xml
<changeDirection>
  <direction>NUMBER</direction>
  <term>NUMBER</term>
</changeDirection>
```

### Content

They both have a value tag, respectively `<speed />` or `<direction />`, and a `<term>` tag.

The `term` is the time (in frames, remember) that will take the change. BulletML will do a linear interpolation for the intermediary values.

Example of a pattern which uses `<changeSpeed />`:

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

The result:

[![changeSpeed example][changeSpeed]][changeSpeed]

## Instruction: accel

Speed the bullet.

```xml
<accel>
  <horizontal>10</horizontal>
  <vertical>15</vertical>
  <term>60</term>
</accel>
```

You can specify the amount with the `<horizontal />` and `<vertical />` tags.

<md-note>
_Accel_: Similar to `<changeSpeed />`, but it is a more precise way to tweak the movement.
</md-note>

# Global variables

There are two variables that can be used inside a `NUMBER` value.

## $rank

`$rank` represents the **game difficulty**. Its value is between 0 and 1 and is defined in the `BulletManagerScript`.

Use this variable to create a pattern which gets harder while the difficulty increases (e.g., higher speeds or lower wait times).

Example:

```
(1 + 1 * $rank)
```

Here, you will have `1` at `rank 0` (min, easy) but `2` at `rank 1` (max, hard). It's a simple way to double the speed, for example.

## $rand

`$rand` is a **random** number between 0 and 1. Use it to add a bit of chance to your pattern.

This equation will give a random value between 0° and 360° degrees (direction):

```
(360 * $rand)
```

You can use these variables in place of `NUMBER`.

<br />Here's a complete example:

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

The image below shows the random effect:

[![rand example][rand]][rand]

We invite you to try the pattern after changing the game difficulty to also understand the effect of the `$rank` variable on it.

<br />And that's it. We have almost covered all the aspects of BulletML. You are ready to create some wonderful patterns for your _shmup_ with Unity and BulletML!

Need support or information? Read the following section.

[fire]: ./-img/fire.gif
[repeat]: ./-img/repeat.gif
[repeat_hierarchy]: ./-img/repeat_hierarchy.png
[wait]: ./-img/wait.gif
[actionRef]: ./-img/actionRef.gif
[changeSpeed]: ./-img/changeSpeed.gif
[rand]: ./-img/rand.gif
