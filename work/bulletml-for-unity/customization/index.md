---
layout: tutorial
title: "Documentation: Customization"
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
  next: ../pattern-file
---

All we did before didn't require any scripting from your side.

However, we let you the possibility to change any behavior explained before.

<div data-block="note">
_Pool_: A concrete example would be to handle properly the instantiation and destruction of the bullets with a pool of pre-instantiated objects.
</div>

# Bullet states

Each bullet has three states:

- **Created**: the container is created but not filled.

- **Spawned**: the bullet has been created and its type is known. You can select the right sprite and properties.

- **Destroyed**: the bullet should be removed from the game.

The plugin handles each step and let you redefine them **separately**.

This is important to understand: if you only redefine the _Create_ behavior, then the plugin will use the default _Spawn_ and _Delete_ behaviors.

Let's see how to implement a custom behavior for each of them.

## Created

Add a delegate to the event `BulletObject OnBulletCreated()`.

It will be called when the engine has request a new `Bullet` object without knowing its type.

```csharp
void Awake()
{
  var bulletManager = FindObjectOfType<BulletManagerScript>();
  bulletManager.OnBulletCreated += HandleBulletCreation;
}

private BulletObject HandleBulletCreation() {
  Debug.Log("Create an empty and unknow bullet or allocate some space.");

  return new MyBulletObject();
}
```

Using your own delegate you can instantiate your own class (here `MyBulletObject`), that should be a subclass of `BulletObject`.


## Spawned

Add a delegate to the event `BulletScript OnBulletSpawned(BulletObject, string)`.

It will called by the engine when the bullet is ready to be displayed on the screen.

```csharp
void Awake()
{
  var bulletManager = FindObjectOfType<BulletManagerScript>();
  bulletManager.OnBulletSpawned += HandleBulletSpawn;
}

private BulletScript HandleBulletSpawn(BulletObjectbullet, string bulletName)
{
  Debug.Log("Create Bullet's game object, sprite, etc.");
  GameObject gameObject = new GameObject("Test");
  
  // Return the BulletScript that should be attached to the game object
  return gameObject.AddComponent<BulletScript>();
}
```

This is the most interesting event. This is where you should instantiate a Game Object (visible in Unity) and fill it with the appropriate sprite.

- `bullet` is the engine object containing all the bullet properties (xml, tasks, name, etc)
- `bulletName` is a quick access to the bullet's label as defined in your pattern file

<div data-block="note">
_Spawn_: If you redefine `OnBulletSpawned`, you can safely leave the `Bullet Bank` field (of `BulletManagerScript`) empty.
</div>

## Destroyed

Similar to the other events, add a delegate to `void OnBulletDestroyed(Bullet)`.

It will be called when the engine is destroying the given bullet.

```csharp
void Awake()
{
  var bulletManager = FindObjectOfType<BulletManagerScript>();
  bulletManager.OnBulletDestroyed += HandleBulletDestroyed;
}

private void HandleBulletDestroyed(BulletMLLib.Bullet bullet)
{
  Debug.Log("Delete the Bullet's game object, free some space.");
}
```

- `bullet` is the engine bullet that will be destroyed. You have to link it to your own game object.

The plugin offers a link between `BulletObject` and `BulletScript`, so you can link one to the other.

# Player position

Finally, you can redefine the way BulletML gets the player position.

Add a delegate to the event `Vector2 GetPlayerPosition(GameObject)`.

It is called for each aimed bullet (`direction type='aim'`).

When shot, the bullet look for the player position and aim it. This position can be tricked or redefined, depending on your needs.

```csharp
void Awake()
{
  var bulletManager = FindObjectOfType<BulletManagerScript>();

  // Another delegate syntax
  bulletManager.GetPlayerPosition += (source) =>
  {
    // The player is the mouse
    return Camera.main.ScreenToWorldPoint(Input.mousePosition);
  };
}
```

- `GameObject source` is a link to the game object requesting the aim. This way you can link the aim request to a game object and get a transform position.

Another use case is when you have two players and want the enemies to target one or the other but not always the same.

<div data-block="warning">
**Breaking change:** the `source` parameter was introduced in the version **1.2** of the plugin.
</div>

# Trigger

<div data-block="warning">
**Note:** the `<trigger>` tag was introduced in the version **1.3** of the plugin.
</div>

A trigger is a simple way to tell Unity to execute some code from a BulletML file.

In your XML pattern, add the new instruction:

```xml
<action>
	<trigger>beforefire</trigger>
</action>
```

`beforefire` is a simple string, you can replace it by any string you want.

<div data-block="warning">
**Note:** You can't use a NUMBER expression here.
</div>

You can know that a Bullet source has raised the evend ``beforefire`` by adding a delegate to ``OnTrigger``

```csharp
var bulletManager = FindObjectOfType<BulletManagerScript>();

bulletManager.OnTrigger += (source, name) =>
      {
        Debug.Log("Trigger " + name + " received from " + source);
      };
```

- ``source`` is the GameObject sending the trigger (usually a GameObject with a BulletScript or BulletSourceScript)
- ``name`` is the string written in the XML file. In our example, it would be ``beforefire``.


<br />And that's it. All you need to know to use _BulletML for Unity_ at its full potential have been learned. Happy hacking.
 :)

Convinced? Then, get the plugin here:

<a href="http://bulletml-for-unity.pixelnest.io/">
  <img
    src="../-img/buy.png"
    class="intent-button intent-button--bulletml"
    alt="Buy BulletML for Unity"
    title="Buy BulletML for Unity"
  />
</a>

<br />In the next section, you will learn how to create your patterns.
