---
layout: tutorial
title: Shooting (1/2)
author: Damien
date: 13/11/13

tutorial:
  name: Creating a 2D game with Unity
  link: ../

links:
  summary: ../table-of-contents
  previous: ../player-and-enemies
  next: ../shooting-2
---

Our player ship is facing a terrifying Poulpi, but cannot do anything...

Let's grant him a weapon and some ammo! This will involve a bit more of scripting, but be confident. It worths it.

# Projectile

First, before allowing the player to shoot, we need to define a game object that represents the projectiles he will use.

Here is the sprite:

[ ![Shot Sprite][shot] ][shot]

_(Right click to save the image)_

The projectile is an object that we will use a lot: There is going to be a few instances on the screen when the player will be shooting.

What should we use in this case ? A `Prefab` of course!

## Preparing the `Prefab`

You should be used to the procedure of creating a `Prefab` from a `Sprite` now:

1. Import the texture.
2. Create a new `Sprite` in the scene.
3. Set the image on the sprite.
4. Add a "Rigidbody 2D" with `0` "Gravity Scale" and "Fixed Angles".
5. Add a "Box Collider 2D" with a size of `(1, 1)`.

Set the scale to `(0.75, 0.75, 1)` so it will looks good.

However, this time, we need to set a new parameter in the "Inspector":

6. In the "Box Collider 2D", check the "IsTrigger" property.

A _trigger_ collider raise en event when colliding but is not used by the physic simulation.

It means that a shot will pass through an object on touching — _there won't be any "real" interaction at all_. Yet, the other collider is going to have its "OnTriggerEnter2D" event raised.

Tada, you have a shot! Time to script the behavior.

Create a new script "ShotScript":

0. - designer variables for the speed, direction, damages
2. - destroy after 20 seconds to avoid any leaks

`````csharp
using UnityEngine;

/// <summary>
/// Projectile behavior
/// </summary>
public class ShotScript : MonoBehaviour
{
  // 0 - Designer variables

  /// <summary>
  /// Damage inflicted
  /// </summary>
  public int damage = 1;

  /// <summary>
  /// Projectile damage player or enemies?
  /// </summary>
  public bool isEnemyShot = false;

  void Start()
  {
    // 1 - Limited time to live to avoid any leak
    Destroy(gameObject, 20); // 20sec
  }
}

`````

Attach this "ShotScript"to your shot.
Finally, attach a "MoveScript" too so your shot will move.

Then drag'n'drop the shot game object to **create a prefab from it**, we will need it in few steps.

You should have this configuration:

[![Shot configuration 1][shot_config1]][shot_config1]

If you play, you will see the shot moving.

## Collisions and damages

But it is not destroying anything.

Don't be surprised, we didn't script the damage behavior. We only need one new script, "HealthScript":

`````csharp
using UnityEngine;

/// <summary>
/// Handle hitpoints and damages
/// </summary>
public class HealthScript : MonoBehaviour
{
  /// <summary>
  /// Total hitpoints
  /// </summary>
  public int hp = 2;

  /// <summary>
  /// Enemy or player?
  /// </summary>
  public bool isEnemy = true;

  void OnTriggerEnter2D(Collider2D collider)
  {
    // Is this a shot?
    ShotScript shot = collider.gameObject.GetComponent<ShotScript>();
    if (shot != null)
    {
      // Avoid friendly fire
      if (shot.isEnemyShot != isEnemy)
      {
        hp -= shot.damage;

        // Destroy the shot
        Destroy(shot.gameObject); // Remember to always target the game object, otherwise you will just remove the script

        if (hp <= 0)
        {
          // Dead!
          Destroy(gameObject);
        }
      }
    }
  }
}
`````

Attach this "HealthScript" **to the enemy**. Now play the scene and make sure the two collides.

**Remark:** Make sure the shot and the enemy are on the same plane (Z position)!

[![Enemy is shot][bang]][bang]

If the enemy has more health than the shot damages, he will survive. Try to change the _HP_ value in the Enemy's _HealScript_:

[![Enemy is shot but has more HP][bang2]][bang2]

## Firing prefab shots

Delete the shot in the scene, it has nothing to do there now that we finished its preparation.

Once again, a new reusable script. Create a new one called "WeaponScript".

We will create a script that can be reused everywhere (players, enemies and why not something else). Its purpose is to instantiate a projectile in front of the gameobject it is attached to.

### The full Weapon script

Here's the full code, bigger than usual. The explanations are below.

`````csharp
using UnityEngine;

/// <summary>
/// Launch projectile
/// </summary>
public class WeaponScript : MonoBehaviour
{
  //--------------------------------
  // 1 - Designer variables
  //--------------------------------

  /// <summary>
  /// Projectile prefab for shooting
  /// </summary>
  public Transform shotPrefab;

  /// <summary>
  /// Cooldown in seconds between two shots
  /// </summary>
  public float shootingRate = 0.25f;

  //--------------------------------
  // 2 - Cooldown
  //--------------------------------

  private float shootCooldown;

  void Start()
  {
    shootCooldown = 0f;
  }

  void Update()
  {
    if (shootCooldown > 0)
    {
      shootCooldown -= Time.deltaTime;
    }
  }

  //--------------------------------
  // 3 - Shooting from another script
  //--------------------------------

  /// <summary>
  /// Create a new projectile if possible
  /// </summary>
  public void Attack(bool isEnemy)
  {
    if (CanAttack)
    {
      shootCooldown = shootingRate;

      // Create a new shot
      var shotTransform = Instantiate(shotPrefab) as Transform;

      // Assign position
      shotTransform.position = transform.position;

      // The is enemy property
      ShotScript shot = shotTransform.gameObject.GetComponent<ShotScript>();
      if (shot != null)
      {
        shot.isEnemyShot = isEnemy;
      }

      // Make the weapon shot always towards it
      MoveScript move = shotTransform.gameObject.GetComponent<MoveScript>();
      if (move != null)
      {
        move.direction = this.transform.right; // towards in 2D space is the right of the sprite
      }
    }
  }

  /// <summary>
  /// Is the wepaon ready to create a new projectile?
  /// </summary>
  public bool CanAttack
  {
    get
    {
      return shootCooldown <= 0f;
    }
  }
}

`````

**Before getting the explanation, attach it to the player.**

The script is divided in three part.

### 1/ Variables that will appear in the inspector

We need it to set the shot that will be used for this weapon.

Look at your player. In the new _WeaponScript_ you can see a field "Shot Prefab : None".

Drag and drop the "Shot" prefab in this field:

[![Using a prefab][dnd_prefab]][dnd_prefab]

Now Unity will automatically fill the script with this information. Easy, right?

### 2/ The cooldown

Guns have a firing rate, otherwise you would create tons of projectiles at each frame.

So here we have a simple cooldown, if it is greater than 0 we can't shoot and we substract the elapsed time at each frame.

### 3/ Shooting from another script

This is the main purpose of this script: being called from another one. This is why we have a public method that can create the projectile.

Once the projectile instantiated we retrieve the script information and override some variables (direction from movement, enemy or not from shot).

# Calling from player

If you launch the game at this point, nothing changed.
Even if a _WeaponScript_ is attached to the player, the _Attack_ method is never called.

Let's go back to _PlayerScript_.

In the update method, after or before movement (doesn't matter at this point) add this snippet:

`````csharp
  void Update()
  {
    ...

    // 5 - Shooting
    bool shoot = Input.GetButtonDown("Fire1");
	shoot |= Input.GetButtonDown("Fire2"); // For Mac users, ctrl + arrow is a bad idea

    if (shoot)
    {
      WeaponScript weapon = GetComponent<WeaponScript>();
      if (weapon != null)
      {
        weapon.Attack(false);
      }
    }

  }
`````

- We read the input from a fire button (click or ctrl by default).
- We retrieve the weapon's script
- We call _Attack_

Try and see the result. You should get this:

[![Working shooting][shooting]][shooting]

**Remark:** Bullets are slow? Just tweak the _Shot_ prefab.

**Bonus:** Just for fun, add a rotation to the player, like (0,0,45).
The shots will have a 45 degrees movement, even if the rotation will not be correct as we didn't set it properly.

[![Shooting rotation][shooting_rotation]][shooting_rotation]

# Next step

We now have a shooter! A very basic one, but still a shooter.
You can add more enemies and shoot them.

But this part is not over! We now want enemies to shoot too. Take a break, what comes next is mainly reusing what we did here but it would have done too much in only one part.


[shot]: ./-img/shot.png
[shot_config1]: ./-img/shot_config1.png
[bang]: ./-img/bang.gif
[bang2]: ./-img/bang2.gif
[dnd_prefab]: ./-img/dnd_prefab.png
[shooting]: ./-img/shooting.gif
[shooting_rotation]: ./-img/shooting_rotation.png
