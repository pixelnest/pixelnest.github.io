---
layout: tutorial
title: "Documentation: How to use"
subtitle: BulletML for Unity
show_ads: false
show_metadata: false

tutorial:
  show_label: false
  name: BulletML for Unity
  link: ../

links:
  summary: ../table-of-contents
  previous: ../dependencies
  next: ../customization
---

### 1. Import the Unity package

Import the whole package in your Unity project.

The **Example** folder contains a demo scene with some patterns. You can delete the whole folder from your project when you don't need the example anymore.

The other folders are mandatory.

### 2. The main script

The heart of the plugin is contained in ``BulletManagerScript``.

You should add **one**, and only one, to every scene that requires BulletML. The name and location doesn't matter.

[ ![BulletML main script][demo_scene_script]][demo_scene_script]

The script comes with some parameters:

* **Player**: this is a **direct reference** to the **"player"'s GameObject**. Some patterns require the current location of the player to aim it.
Simply drag'n'drop the GameObject containing your player's location. You can always update it at runtime.

*  **Bullet Bank**: this is the definition of how we will instantiate bullets from a pattern. It create a link between a bullet name, a prefab and a sprite. Please see the chapters "Bullets" below for a full explanation.

* **Use Default Bullet If Missing**: if you don't want to define each  kind of bullet you use in your patterns, as we do in the demo (that would make dozens of identical bullets to define), simply check this. The **first** bullet in the bank will be used as the default one.

* **Scale**: Between ``0f`` and ``1f``. BulletML use its own metric system. To make sure a pattern fit to your game, you may need to tweak this Scale value, especially if you imported an existing pattern file.

* **TimeSpeed**: Between ``0f`` and ``1f``. This way you can speed or slow the whole engine.

### 3. The bullet bank

The plugin comes with a built-in mecanism to create the bullets with the right sprite.

A bank is a file containing the association between a bullet name, a GmaeObject prefab and a sprite.

#### Create a new bank

In your ``Assets`` folder, right click -> "Create -> "BulletML" -> "Bullet Bank".

 [ ![Bullet bank menu][bulletml_menu]][bulletml_menu]

#### Create a bullet container prefab

You need to tell the plugin how you define your bullets. You can have a prefab for every bullet, or one prefab for each bullet, you have the choice.

* The prefab **must** have a ``SpriteRenderer``.
* The prefab **can** have a ``BulletScript``

Here's a simple prefab with a collider, as an example:

 [ ![Bullet container][bullet_prefab]][bullet_prefab]

### Fill the bank

Define the bullets you will use in your game and your BulletML files.

 [ ![Bullet bank][bulletbank]][bulletbank]

You have as many definitions as you want. For each one:

* **Name**: this should be the same string here and in your ``.xml`` pattern file.

* **Prefab**: drag'n'drop the bullet container as we created above. It will be instantiated when requested

* **Sprite**: _optional_ the sprite image that will be set in the ``SpriteRenderer`` of the container.

* **Time To Live In Seconds**: bullets auto are destroyed after some time, defined here. If your bullets are very fast, you should have a low time to live.
If you want to handle the destruction by your self, simply set 0 and the bullet will never be destroyed.

* **Destroy When Out Of Screen**: bullets are automatically removed when they are not visible anymore. It is a simple way to avoid a too large numbers of bullets in the scene. However, it may not suits your patterns so you may tweak the behavior manually by using the ``vanish`` command in your pattern and the time to live property in the bank to clear your bullets.

### 4. The emitter

We're nearly done! Now we want to shoot some bullets.

An emitter is a projectile source. It will execute a pattern as define in a BulletML file.

Add an ``EmitterScript`` to a new object or to a sprite in your scene.

 [ ![The EmitterScript][emitter]][emitter]

* **Xml File**: is the BulletML file you want to use.

Make sure your file in your ``Assets`` folder, and simply drag'n'drop to assign it.

The XML file will be parsed on the script start, any error will be reported in the console.

Here's a nice BulletML example:

````xml

<?xml version="1.0" ?>
<!DOCTYPE bulletml SYSTEM "bulletml.dtd">

<bulletml type="horizontal" xmlns="http://www.asahi-net.or.jp/~cs8k-cyu/bulletml">

  <action label="top">
    <repeat>
      <!-- The main loop, until the boss is destroyed -->
      <times>99999</times>
      <action>
        <fire>
          <direction type="absolute">360 * $rand</direction>
          <bulletRef label="boss3_shot"/>
        </fire>
        <wait>30 - (15 * $rank)</wait>
      </action>
    </repeat>
  </action>

  <bullet label="boss3_shot">
    <speed>0.25 + 0.25 * $rank</speed>
    <action>
      <wait>30 * (2.0 - 1.0 * $rank)</wait>
      <actionRef label="frag_shot">
        <param>0</param>
      </actionRef>
      <actionRef label="frag_shot">
        <param>90</param>
      </actionRef>
      <actionRef label="frag_shot">
        <param>180</param>
      </actionRef>
      <actionRef label="frag_shot">
        <param>270</param>
      </actionRef>

      <vanish />
    </action>
  </bullet>

  <action label="frag_shot">
    <fire>
      <direction type="relative">$1</direction>
      <speed>0.2 + $rank * 0.2</speed>
      <bulletRef label="boss3_shot_2"/>
    </fire>
  </action>

  <bullet label="boss3_shot_2">
    <action>
      <wait>20 * (2.0 - 1.0 * $rank)</wait>
      <fire>
        <direction type="relative">30</direction>
        <speed>0.4 + $rank * 0.3</speed>
        <bullet label="boss3_shot_3"/>
      </fire>
      <fire>
        <direction type="relative">-30</direction>
        <speed>0.4 + $rank * 0.3</speed>
        <bullet label="boss3_shot_3"/>
      </fire>
      <vanish />
    </action>
  </bullet>

</bulletml>

````

_(Save it in your Assets folder)_

If you enter play mode, you see the pattern being played:

[ ![Pattern in motion][gif_circle]][gif_circle]


[demo_scene_script]: ../-img/demo_scene_script.png
[bulletml_menu]:     ../-img/bulletml_menu.png
[bullet_prefab]:     ../-img/bullet_prefab.png
[bulletbank]:        ../-img/bulletbank.png
[emitter]:           ../-img/emitter.png
[gif_circle]:        ../-img/gif_circle.gif
