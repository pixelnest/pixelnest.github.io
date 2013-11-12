---
layout: tutorial
title: The shooting (1/2)
subtitle: Creating a 2D game with Unity
author: Damien
---

## Chapters

<Sommaire ici>

## Summary

Our player ship is facing an enemy but cannot do anything...
Let's grant him a weapon and some ammo! This will mainly require scripting but it worth it.

## Player projectile

To make the player shot some projectile, we need to define the related game object it will be using. The sprite:
 
[![Shot Sprite][shot]][shot]

And we will be using prefabs, so we will create multiple instances of the same object.  

### Preparing the prefab

First create a sprite in Unity for it. You should be used to it now, if necessary check how you did for the enemy:

- sprite
- _rigidbody 2D with settings_
- _box collider 2D_ with a size of 1x1

Set a scale of 0.75x0.75x1 so it will looks good.

We have a new setting:

- In the box collider, check the "IsTrigger" property. 

**Trigger colliders** means they will raise en event when colliding but they won't be used for the physic simulation.
That means that a shot will not move an object on touching, but the touched object will have it's "OnTriggerEnter" event raised.

Tada, you have a shot! Time to script the behavior

Create a new script "ShotScript": 

- 0 - designer variables for the speed, direction, damages
- 1 - destroy after 20 seconds to avoid any leaks

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
  public int Damage = 1;

  /// <summary>
  /// Projectile damage player or enemies?
  /// </summary>
  public bool IsEnemyShot = false;

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

### Collisions and damages

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
  public int HP = 1;

  /// <summary>
  /// Enemy or player?
  /// </summary>
  public bool IsEnemy = true;

  void OnTriggerEnter2D(Collider2D collider)
  {
    // Is this a shot?
    ShotScript shot = collider.gameObject.GetComponent<ShotScript>();
    if (shot != null)
    {
      // Avoid friendly fire
      if (shot.IsEnemyShot != IsEnemy)
      {
        HP -= shot.Damage;

        // Destroy the shot
        Destroy(shot.gameObject); // Remember to always target the game object, otherwise you will just remove the script

        if (HP <= 0)
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

### Firing prefab shots

Delete the shot in the scene, it has nothing to do there now that we finished its preparation. 

Once again, a new reusable script. Create a new one called "WeaponScript".

We will create a script that can be reused everywhere (players, enemies and why not something else). Its purpose is to instantiate a projectile in front of the gameobject it is attached to. 

#### The full Weapon script

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
  public Transform ShotPrefab;

  /// <summary>
  /// Cooldown in seconds between two shots
  /// </summary>
  public float ShootingRate = 0.25f;

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
      shootCooldown = ShootingRate;

      // Create a new shot 
      var shotTransform = Instantiate(ShotPrefab) as Transform;

      // Assign position
      shotTransform.position = transform.position;

      // The is enemy property
      ShotScript shot = shotTransform.gameObject.GetComponent<ShotScript>();
      if (shot != null)
      {
        shot.IsEnemyShot = isEnemy;
      }

      // Make the weapon shot always towards it
      MoveScript move = shotTransform.gameObject.GetComponent<MoveScript>();
      if (move != null)
      {
        move.Direction = this.transform.right; // towards in 2D space is the right of the sprite
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

#### 1/ Variables that will appear in the inspector

We need it to set the shot that will be used for this weapon. 

Look at your player. In the new _WeaponScript_ you can see a field "Shot Prefab : None".

Drag and drop the "Shot" prefab in this field:

[![Using a prefab][dnd_prefab]][dnd_prefab]

Now Unity will automatically fill the script with this information. Easy, right?

#### 2/ The cooldown

Guns have a firing rate, otherwise you would create tons of projectiles at each frame.

So here we have a simple cooldown, if it is greater than 0 we can't shoot and we substract the elapsed time at each frame.

#### 3/ Shooting from another script

This is the main purpose of this script: being called from another one. This is why we have a public method that can create the projectile.

Once the projectile instantiated we retrieve the script information and override some variables (direction from movement, enemy or not from shot).

### Calling from player

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

## Ready for the next step

We now have a shooter! A very basic one, but still a shooter.
You can add more enemies and shoot them.

But this part is not over! We now want enemies to shoot too. Take a break, what comes next is mainly reusing what we did here but it would have done too much in only one part.

[I'm ready, take me to the next part]()

[shot]: ./shot.png

[shot_config1]: ./shot_config1.png

[bang]: ./bang.gif

[bang2]: ./bang2.gif

[dnd_prefab]: ./dnd_prefab.png

[shooting]: ./shooting.gif

[shooting_rotation]: ./shooting_rotation.png