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

We made some animation clips for our new enemy. But, for now, they are never used.

Indeed, a clip is just a sheet containing informations on how to animate an object. It's never called or triggered.

Enter the _"Animator"_.

An "Animator" is a component that you put on an object, which itself references an "Animator Controller". The "Animator Controller" is a state machine that manages all the animations of an object and the relations between them.

In this chapter, we are going to add the "Boss" object into the scene and animate it. By doing so, we will learn how to use the "Animator". Plus, we will have some scripts to add in order to have a proper behavior for this special character: stop the level, create a pattern for the shots and trigger the animations.

# Animator

You may have seen that your "Boss" object you were working on had automatically received a new component: an "Animator".

At the same time, you may also have seen that a new file was added to your "Animations" folder, named just like your object. It's an "Animator Controller".

Now, observe the "Controller" property of your "Animator" component:

[ ![Component Animator][animator_component]][animator_component]

The file "Boss" is the _controller_. You can check that by clicking onto the controller field — it will highlight the linked file:

[ ![Animator Controller and the Animator component][link] ][link]

This controller is where we will define how and when Unity should play the animation clips.

Basically, the "Animator" component is simply a link between an object and an "Animator Controller". This component can be retrieved and manipulated through the code.

If your "Boss" prefab has no "Animator" component, add it manually and drag the "Boss" controller inside the property.

<md-note>
_Options_: The "Animator" component has some other options. The "Apply Root Motion" should probably be disabled when using the animations the way we do in this tutorial. Yet, it doesn't matter here because we have a very simple object with no gravity.
</md-note>

## Inside an animator

As it was not confusing enough, we need to open the window called "Animator" (and not "Animation" this time).

You can double click on the controller file ("Animations/Boss") to open the controller, or you can find it in the "Window" menu:

[ ![Menu Animator][menu_animator] ][menu_animator]

You should get something like this:

[ ![Animator][animator_first_contact] ][animator_first_contact]

You can see that we have some _states_ (the rectangles) created automatically with our clips, plus a special one called "Any State".

Remember when you used the "Create New Clip" button of the "Animation" view ? Unity was in fact adding a state in the controller of the object, linked to the animation file you had created.

Click on each state of the animator and rename them to remove the "Boss_" prefix:

[ ![Rename the states][rename] ][rename]

<br />An "Animator Controller" is a _state machine_. Each state **can** be an animation, and you can define transitions between them.

A transition tells to Unity when and why it should move from a state to another.

[ ![Transitions][state_transitions] ][state_transitions]

In this image, we have created a link between two states. In order to animate the object with the "Hit" animation, we have to be in the "Idle" state first.

We will focus a bit more on transitions in a moment. For now, let's look at the three different types of states.

### 1. Default state

The _orange state_ is the default one: the initial state when the game is launched.

[ ![Default state][state_default] ][state_default]

In this case, the "Idle" state is the default one (if it's not, right click and "Set As Default").

That means that when the game is started, the "Boss" object will automatically play the "Idle" animation (indefinitely if "Loop Time" is enabled in the animation "Inspector" — as it should be for this tutorial).

### 2. "Any State"

The _green state_, called "Any State", is a special case.

[ ![Any State][state_any] ][state_any]

It's a good way to simplify a state machine. It represents (as its name says so well) any state at a given time. In our "Boss" state machine, this state is, at the same time, the "Idle", the "Hit" and the "Attack" states.

Let's explain this with a few examples.

Imagine we have this state machine:

[ ![Example 1 - Run -> Walk -> Jump][any_state_1] ][any_state_1]

In order to "Jump", you have to "Walk" first, then "Run" and FINALLY "Jump". It means that the "Jump" animation won't be played unless your object is in the "Run" state before. If you never "Run", you will never "Jump".

It's not ideal, is it? We should be able to "Jump" when we "Walk" too!

Okay, let's try this:

[ ![Example 2 - (Run -> Walk) -> Jump][any_state_2] ][any_state_2]

Great, we are now able to "Jump" from the "Walk" and "Run" states. However, if you add a few more states, you will need to create a lot of transitions to "Jump" from every state.

The solution is to use "Any State":

[ ![Example 3 - Any State -> Jump][any_state_3] ][any_state_3]

With this state machine, any state can transition to a "Jump" state. Perfect, no?

### 3. Normal state

The _gray states_ are the normal ones, holding zero or one animation.

[ ![State][state_normal] ][state_normal]

<br /><br />On the bottom left corner of the "Animator" view, you can find a parameters list. These parameters are used for the conditions of the transitions. More on that below.

[ ![Parameters][parameters] ][parameters]

_(Contrary to the image above, it should be empty currently)_

<br />On the top left, you can see the layers. This is a way to have multiple state machines for one object. We will not use this feature in this tutorial.

[ ![Layers][layers] ][layers]

<br />And finally, the button "Auto live Link" on the top right is a cool Unity feature which allows you to see in real-time which state is currently played. Leave it enabled.

[ ![Auto Live Link][auto_live] ][auto_live]

## Adding parameters

A parameter is a value or a trigger for our state machine. Later, we will use these in the conditions of our transitions.

A parameter has 4 types available:

[ ![Parameters types][parameters_types]][parameters_types]

- `Int` — simple integer number.
- `Float` — simple float number.
- `Bool` — `true` or `false` value.
- `Trigger` — a flag which stays enabled until it is used. Then, it becomes unchecked.

Numbers are interesting for special use cases like an horizontal or vertical speed. You may want a different animation for walk or run, but they both rely on the movement speed of the player, which could be a parameter.

For our game, let's add two new parameters:

1. "Hit", a **trigger**
2. "Attack", a **boolean**

[ ![Two triggers][two_triggers]][two_triggers]

_(Sadly, the editor doesn't differentiate triggers from booleans visually)_

Now, let's see why we need them.

## Transitions

A transition is a link between two states, telling to the state machine how we go from one to another.

### 1. "Idle to Attack"

To create a transition, make a right click on the source state.

Let's do it for "Idle to Attack" first:

1. Right click on "Idle" state.
2. Select "Make transition":

  [ ![Transition menu][transition_1]][transition_1]

3. Now click on the destination state:

  [ ![Transition creation][transition_2]][transition_2]

And that's it!

You can select the transition by clicking on the link. The "Inspector" will reveal a lot of interesting parameters, especially the entry conditions:

[ ![Transition parameters][transition_3]][transition_3]

<md-note>
_Exit Time_: The "Exit Time" condition is the default condition for a transition. It means that the transition is valid (and can be executed) when the source animation is over.
</md-note>

This is what we will edit. Change "Exit Time" for the "Attack" parameter that we have defined earlier.

[ ![Transition attack][transition_attack_1]][transition_attack_1]

This condition means "If `Attack` is `true` then play "Attack" animation".

The same way, add a transition between "Attack" and "Idle" with the condition "`Attack` is `false`".

[ ![Transition attack end][transition_attack_2]][transition_attack_2]

It means "If `Attack` is `false` then stop "Attack" animation and go back to Idle".

You can observe that we had to define both transitions. Otherwise, the state machine would not have come back to the "Idle" state after an attack.

We will do nearly the same for the Idle animation.

### 2. "Idle to Hit"

Remember the "Any State" special state? We are going to use it now.

Make two new connections:

1. "Any State" to "Hit", condition `Hit`.
2. "Hit" to "Idle", condition `Exit Time`.

If the trigger "Hit" is set, we play the animation "Hit" once and go back to "Idle".

"Any State" is useful here because `Hit` can be triggered when the "Boss" is "Idle" or in an "Attack". Instead of defining two relations, we just use "Any State".

<md-info>
_Trigger_: As you can see, when you use a trigger, you don't have to specify a value. Indeed, a trigger is just a way to tell to the state machine "If `valid` Then transition".
</md-info>

### Final graph

Our animator graph should now look like that:

[ ![Animator][transitions]][transitions]

The last thing we need is some code to make it react in-game (the parameters are never triggered currently, so the animator will stay on "Idle").

<md-note>
_Animator graph_: Creating a graph in the animator is not an exact science. Depending on your code implementation, what you want to achieve or a precise sequence of actions, you may want to proceed differently. For example, in our case, we could also transition the "Attack" from the "Any State" state. But with only three short animations, it don't make a difference to be honest.
<br /><br />
When your graph will grow, you will have to make some choices that will impact your game.
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

Image subsate

## Blendtrees

Image blendtree

## UI

Solo/Mute/Atomic.

# Next Step

TODO recopier la fin de deployment et link vers conclusion.


[animator_component]: ./-img/animator_component.png
[menu_animator]: ./-img/menu_animator.png

[animator_first_contact]: ./-img/animator_first_contact.png
[link]: ./-img/link.png
[rename]: ./-img/rename.png

[parameters]: ./-img/parameters.png
[parameters_types]: ./-img/parameters_types.png

[layers]: ./-img/layers.png
[auto_live]: ./-img/auto_live.png

[state_transitions]: ./-img/state_transitions.png

[state_default]: ./-img/state_default.png
[state_any]: ./-img/state_any.png
[state_normal]: ./-img/state_normal.png

[any_state_1]: ./-img/any_state_1.png
[any_state_2]: ./-img/any_state_2.png
[any_state_3]: ./-img/any_state_3.png

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
