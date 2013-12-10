---
layout: tutorial
title: Bonus — 2D Animations (2/2)
date: 13/11/18

tutorial:
  name: Creating a 2D game with Unity
  link: ../

links:
  summary: ../table-of-contents
  previous: ../animations-1
  next: ../tweaking-the-gameplay
---

We made some animation clips for a new super enemy. But for now they are never used.

Using the **Animator**, we will bring the boss in the scene and animate it. We will do that in two parts: first, understand and set the animation controller, then make a boss that sops the scene, have a pattern,  multiple HP and that uses the animations.

# The animation Controller

## The new things

You may have seen that your "Boss" object you were working on has automatically received a new component: an "Animator". You also automatically have a new file in the "Animations" folder, named just like your object.

[ ![Component Animator][animator_component]][animator_component]

The file "Boss" is the **controller**. It's where we will define how and when Unity should play the animation clips.

The **Animator component** is simply a link between an object and a controller. This component can be manipulated through the code.

## Opening the Animator pane

As it was not confusing enough, we need to open the pane called "Animator".

You can double click on the controller file (here Animations/Boss) to directly open the Animator. Or you can find it in the Window menu:

[ ![Menu Animator][menu_animator]][menu_animator]

The new pane should open and looks like this:

[ ![Animator][animator_first_contact]][animator_first_contact]

You can see that we have **states** created automatically with our clips (renamed here to remove the "Boss_" prefix).

- This is a **state machine**. Each state **can** be an animation, and you can define transitions between them.

- The orange state is the default one, the first that will be entered when the game launched. Here the "Idle" state is the default one (if it's not, right click and "Set As Default").

- The green, "Any State", is a good way to simplify transitions. Instead of making many links to one state, you can have one single link between "Any Sate" and the destination state. Any transitions defined from "Any State" can be triggered from anywhere in the state machine.

- Grey states are normal, handling zero to one animation.

On bottom left you have the parameters list. We will need it for our game.

On top left you can see the layers order. This is a way to have multiple state machine for one object: same animation used differently depending on the context.

And finally, the button "Auto live Link" on top right is a cool Unity feature allowing you to see in real-time which animation is played. Leave it enabled.


<md-note>
_Tip_: substates
TODO Moger à toi l'honneur
</md-note>


## Adding parameters

A parameter is a value or a trigger for our state machine. Later we will use their values in the conditions of the transitions.

Parameters have multiple types:

[ ![Parameters types][parameters_types]][parameters_types]

- Int: simple integer number
- Float: simple float number
- Bool: true/false value
- Trigger: true for a frame then false (raised only once per call in the code)

Numbers are interesting for special use case like speed. You may want a different animation for walk or run, but they both rely on the movement speed of the player, which could be a parameter.

For our game, let's add two new parameters:

1. Hit, a **trigger**
2. Attack, a **boolean**

(The editor sadly doesn't visually differentiate triggers from boolean).

[ ![Two triggers][two_triggers]][two_triggers]

Now we will directly see why we need them.

## Transitions

A transition is a link between two states, telling the state machine how we go from one to another.

### Idle to Attack

To create a transition, make a right click on the source state.

Let's do it for the "Idle to Attack" first. Right click on "Idle" state. Select "Make transition":

[ ![Transition menu][transition_1]][transition_1]

Now click on the destination state:

[ ![Transition creation][transition_2]][transition_2]

And that's it!

You can select the transition by clicking on the link. The Inspector will reveal a lot of interesting parameters, especially the entry conditions:

[ ![Transition parameters][transition_3]][transition_3]

This is what we will edit. Change "Exit Time" (the default one, it means that the transition is true when the source animation is over) to "Attack".

[ ![Transition attack][transition_attack_1]][transition_attack_1]

It means "If Attack is true then play Attack animation".

The same way, add a transition between "Attack" and "Idle" with the condition "Attack" is false.

[ ![Transition attack end][transition_attack_2]][transition_attack_2]

It means "If Attack is false then stop Attack animation and go back to Idle".

We will do nearly the same for the Idle animation.

### Idle to Hit

Make two new transitions:

- Idle to Hit, condition "Hit"
- Hit to Idle, condition "Exit Time"

If the trigger "Hit" is set, we play the animation "Hit" once and go back to "Idle".

#### Attack to Hit

The player can damage the boss when he's attacking. So we add a transition:

- Attack to Hit, condition "Hit"

### The final graph

Our animator graph now looks like this:

[ ![Animator][transitions]][transitions]

Now we need to add some code in order to get it work ingame.

<md-note>
_Animator graph_: Creating a graph in the animator is not an exact science. Depending on your code implementation, what you want to achieve or a precise sequence of actions, you may want to proceed differently. For example, in our case, we could also transition the Attack from the Any State state. With only three animations, it don't make a difference, to be fair.
<br />
But when you graph will grow, you will have to make some choice that will impact your game.
</md-note>

# Who's the Boss?

Before we jump into the interesting stuff, we should have the boss ready to be inserted in the game.

This will be quick as the chapter is more about animation than anything else.

## Preparing the prefab

### Settings and known scripts

1. Add a HealthScript to the big bad guy, grant him a lot of points (like 50).
2. Add a MoveScript. For a good behavior try a speed of ``(5,5)``.

[ ![Boss settings][boss_settings]][boss_settings]

### The projectile

We need a new projectile when the boss shoot.

Duplicate the "EnemyShot1" and change the image by this new one.

[ ![Boss attack projectile][shot_boss]][shot_boss]

_(Right click to save the image)_

Set the scale to ``(0.3,0.3,1)``. Save it as a new prefab. You should get something like this:

[ ![Boss projectile][boss_shot_2]][boss_shot_2]

[ ![Boss projectile parameters][boss_shot_1]][boss_shot_1]

### The weapon

Like we did for the enemy Poulpi, add a weapon made of an empty game object and a WeaponScript.

[ ![Boss weapon][boss_weapon]][boss_weapon]

Okay ready for the script and for the animations!

## The new  script

Here is the full big script of the boss. I'll divide the explanations in two parts: those related to the animation, and those related to the boss. You maybe not be interested in both.

````csharp
using UnityEngine;

/// <summary>
/// Enemy generic behavior
/// </summary>
public class BossScript : MonoBehaviour
{
  private bool hasSpawn;

  //  Component references
  private MoveScript moveScript;
  private WeaponScript[] weapons;
  private Animator animator;
  private SpriteRenderer[] renderers;

  // Boss pattern (bot really an AI)
  public float minAttackCooldown = 0.5f;
  public float maxAttackCooldown = 2f;

  private float aiCooldown;
  private bool isAttacking;
  private Vector2 positionTarget;

  void Awake()
  {
    // Retrieve the weapon only once
    weapons = GetComponentsInChildren<WeaponScript>();

    // Retrieve scripts to disable when not spawn
    moveScript = GetComponent<MoveScript>();

    // Get the animator
    animator = GetComponent<Animator>();

    // Get the renderers in children
    renderers = GetComponentsInChildren<SpriteRenderer>();
  }

  void Start()
  {
    hasSpawn = false;

    // Disable everything
    // -- collider
    collider2D.enabled = false;
    // -- Moving
    moveScript.enabled = false;
    // -- Shooting
    foreach (WeaponScript weapon in weapons)
    {
      weapon.enabled = false;
    }

    // Default behavior
    isAttacking = false;
    aiCooldown = maxAttackCooldown;
  }

  void Update()
  {
    // Check if the enemy has spawned
    if (hasSpawn == false)
    {
      // We check only the first renderer for simplicity.
      // But we don't know if it's the body, and eye or the mouth...
      if (renderers[0].IsVisibleFrom(Camera.main))
      {
        Spawn();
      }
    }
    else
    {
      // AI
      //------------------------------------
      // Move or attack. permute. Repeat.
      aiCooldown -= Time.deltaTime;

      if (aiCooldown <= 0f)
      {
        isAttacking = !isAttacking;
        aiCooldown = Random.Range(minAttackCooldown, maxAttackCooldown);
        positionTarget = Vector2.zero;

        // Set or unset the attack animation
        animator.SetBool("Attack", isAttacking);
      }

      // Attack
      //----------
      if (isAttacking)
      {
        // Stop any movement
        moveScript.direction = Vector2.zero;

        foreach (WeaponScript weapon in weapons)
        {
          if (weapon != null && weapon.enabled && weapon.CanAttack)
          {
            weapon.Attack(true);
            SoundEffectsHelper.Instance.MakeEnemyShotSound();
          }
        }
      }
      // Move
      //----------
      else
      {
        // Define a target?
        if (positionTarget == Vector2.zero)
        {
          // Get a point on the screen, convert to world
          Vector2 randomPoint = new Vector2(Random.Range(0f, 1f), Random.Range(0f, 1f));

          positionTarget = Camera.main.ViewportToWorldPoint(randomPoint);
        }

        // Are we at the target? If so, find a new one
        if (collider2D.OverlapPoint(positionTarget))
        {
          // Reset, will be set at the next frame
          positionTarget = Vector2.zero;
        }

        // Go to the point
        Vector3 direction = ((Vector3)positionTarget - this.transform.position);

        // Remember to use the move script
        moveScript.direction = Vector3.Normalize(direction);
      }
    }
  }

  private void Spawn()
  {
    hasSpawn = true;

    // Enable everything
    // -- Collider
    collider2D.enabled = true;
    // -- Moving
    moveScript.enabled = true;
    // -- Shooting
    foreach (WeaponScript weapon in weapons)
    {
      weapon.enabled = true;
    }

    // Stop the main scrolling
    foreach (ScrollingScript scrolling in FindObjectsOfType<ScrollingScript>())
    {
      if (scrolling.isLinkedToCamera)
      {
        scrolling.speed = Vector2.zero;
      }
    }
  }

  void OnTriggerEnter2D(Collider2D otherCollider2D)
  {
    // Taking damage? Change animation
    ShotScript shot = otherCollider2D.gameObject.GetComponent<ShotScript>();
    if (shot != null)
    {
      if (shot.isEnemyShot == false)
      {
        // Stop attacks and start moving awya
        aiCooldown = Random.Range(minAttackCooldown, maxAttackCooldown);
        isAttacking = false;

        // Change animation
        animator.SetTrigger("Hit");
      }
    }
  }

  void OnDrawGizmos()
  {
    // A little tip: you can display debug information in your scene with Gizmos
    if (hasSpawn && isAttacking == false)
    {
      Gizmos.DrawSphere(positionTarget, 0.25f);
    }
  }
}
````

** Don't forget to assign the script to the "Boss" object! **

<md-note>
_Note_: This script shares a lot of code with EnemyScript. Well, it's because it's a copy. We could have refactor EnemyScript and make BossScript inherits from it but we wanted to stay simple and avoid to come back on a previous script.
<br />And remember, we're here for the animations ;).
</md-note>

### Explanations: Animation

Let's focus on few points:

1. We store a reference to the animator so we can use it later

````csharp
private Animator animator;

...

void Awake()
{
	...
	animator = GetComponent<Animator>();
	...
}
````

2. We set the value of the boolean parameter "Attack" on the animator the first frame when we know that we are in an attack phase. Remember the controller and the transitions? Well, this will simply set a parameter value.

````
// Set or unset the attack animation
animator.SetBool("Attack", isAttacking);
````

3. We trigger the parameter "Hit" when a player shot hits the boss:

````csharp
animator.SetTrigger("Hit");
````

### Explanations: Boss AI

Well, AI is a big word. Our boss is stupid here, it just moves then shoot then move then shoot... until it dies.

So we have a boolean value to tell if it moves or shoot (``isAttacking``). Shooting is just making all weapons fire.

For the moving part, the boss randomly takes a point visible in the camera and go to it. When it reaches the point (= when the point is in the collider bounds), it goes somewhere else. We made the point visible in debug modes.

<md-note>
_Tip_: ``OnDrawGizmos`` is a very useful method to display debug information in the scene from a script, using the ``Gizmos`` class.
<br />
Here we display the position where the boss is going as a sphere. You can see this sphere in the editor pane or in the game view (if you enable "Gizmos").
<br />
 [ ![Boss target position][draw_gizmos]][draw_gizmos]
</md-note>

We alternate between those two phases with a simple timer (``aiCooldown``). When it reaches 0 we permute and set a new random cooldown.

However, when the boss take a shot, we force him to move (stop any attacks and find a new position).

Finally, when the boss spawn, it sets the camera and player scrolling to 0. That way, the game stop and tells you that you must defeat the enemy in order to continue (event if nothing comes after in the demo, you get the idea).

# The result

Include this in your level. Put the boss after all your enemies.

 [ ![Boss in the scene][level]][level]

If you want to test it, maybe add some health points to our player, otherwise it's a bit... hardcore :).

Now you have a nice boss (with animations!) to defeat!

 [ ![Boss in action][boss_final]][boss_final_gif]

_(Click to see the animation)_

And if you select the game object in the Hierarchy and open the "Animator" pane, you can see the animation controller in action.

 [ ![Boss controller in action][boss_final_animator]][boss_final_animator]

# Bonus

## Substates machines

## Blendtrees

## UI

Solo/Mute/Atomic.

# Next Step

TODO recopier la fin de deployment et link vers conclusion.


[animator_component]: ./-img/animator_component.png
[menu_animator]: ./-img/menu_animator.png

[animator_first_contact]: ./-img/animator_first_contact.png

[parameters_types]: ./-img/parameters_types.png

[two_triggers]: ./-img/two_triggers.png
[transition_1]: ./-img/transition_1.png
[transition_2]: ./-img/transition_2.png
[transition_3]: ./-img/transition_3.png

[transition_attack_1]: ./-img/transition_attack_1.png
[transition_attack_2]: ./-img/transition_attack_2.png

[transitions]: ./-img/transitions.png

[boss_settings]: ./-img/boss_settings.png
[shot_boss]: ./-img/shot_boss.png

[boss_shot_1]: ./-img/boss_shot_1.png
[boss_shot_2]: ./-img/boss_shot_2.png

[boss_weapon]: ./-img/boss_weapon.png

[draw_gizmos]: ./-img/draw_gizmos.png

[level]: ./-img/level.png

[boss_final]: ./-img/boss_final.png
[boss_final_gif]: ./-img/boss_final.gif
[boss_final_animator]: ./-img/boss_final_animator.gif
