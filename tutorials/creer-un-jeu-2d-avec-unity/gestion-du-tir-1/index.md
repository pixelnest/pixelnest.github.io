---
layout: tutorial
title: Gestion du tir (1/2)
author: Damien Matthieu
date: 13/11/13

tutorial:
  name: Créer un jeu 2D avec Unity
  link: ../

links:
  summary: ../sommaire
  previous: ../ajout-du-joueur-et-des-ennemis
  next: ../gestion-du-tir-2
---

Notre vaisseu fait face impuissant à un terrifiant Poulpi... il faut que nous lui ajoutions une arme !

Cela va nécessité pas mal de code, mais le jeu en vaut la chandelle.

# Le projectile

Pour commencer, nous allons créer le projectile que le joueur va tirer.

Voici le sprite à utiliser :

[ ![Shot Sprite][shot] ][shot]

_(Clic droit pour sauver l'image sur votre disque)_

Ce projectile va être réutilisé abondamment, il y aura plusieurs instances en même temps à l'écran quand le joueur tirera. 

Donc qu'est-ce que l'on va utiliser ? Facile, un `Prefab` !

## Préparation du `Prefab`

Vous connaissez la musique :

1. Importez la texture.
2. Créez un nouveau `Sprite` dans la scène.
3. Appelez-le "PlayerShot"
3. Sélectionnez l'image du projectile.
4. Ajoutez un "Rigidbody 2D" avec `0` "Gravity Scale" et décochez "Fixed Angles".
5. Ajoutez un "Box Collider 2D" avec une taille de `(1, 1)`.

Utilisez une échelle (_scale_) de  `(0.75, 0.75, 1)` pour le rendu.

Et petite nouveauté cette fois-ci :

6. Sur le "Box Collider 2D", cochez la case "IsTrigger".

Un _collider_ marqué comme "trigger" déclenchera un évènement qui pourra être récupéré dans un script mais il ne sera pas pris en compte dans le calcul de la phyique.

Ici, le tir passera donc à travers les objets qu'ils touchent - _il n'y a donc plus vraiment d'interaction_. Mais ces objets touchés auront l'évènement "OnTriggerEnter2D" levé.

Voilà, le tir est prêt ! Il ne manque que le script, qui sera commun au tir du joueur et aux futurs tirs ennemis.

Créez un nouveau script "ShotScript":

```csharp
using UnityEngine;

/// <summary>
/// Comportement des tirs
/// </summary>
public class ShotScript : MonoBehaviour
{
  // 1 - Designer variables

  /// <summary>
  /// Points de dégâts infligés
  /// </summary>
  public int damage = 1;

  /// <summary>
  /// Projectile ami ou ennemi ?
  /// </summary>
  public bool isEnemyShot = false;

  void Start()
  {
    // 2 - Destruction programmée
    Destroy(gameObject, 20); // 20sec
  }
}

```

1. Quelques variables pour changer la vitesse et la puissance d'un projectile
2. On force la destruction du projectile après quelques secondes s'il n'a pas touché d'éléments sur sa route

Attachez ce "ShotScript" au sprite du projectile. Ajoutez un "MoveScript" et le projectile devrait bouger.

Enfin, créez un `Prefab` à partir de cet objet projectile, nous allons en avoir besoin dans très peu de temps.

Au final vous devriez avoir ceci :

[![Shot configuration 1][shot_config1]][shot_config1]

Si vous lancez le jeu vous devriez voir le tir avancer.

## Collisions et dégâts

Ce tir ne détruit rien (pour le moment). Ce n'est pas étonnant, nous n'avons rien fait pour que ce soir le cas.

Ce qu'il nous manque, c'est un script pour gérer les points de vies. Créez un nouveau script "HealthScript" :

```csharp
using UnityEngine;

/// <summary>
/// Gestion des points de vie et des dégâts
/// </summary>
public class HealthScript : MonoBehaviour
{
  /// <summary>
  /// Points de vies 
  /// </summary>
  public int hp = 1;

  /// <summary>
  /// Ennemi ou joueur ?
  /// </summary>
  public bool isEnemy = true;

  void OnTriggerEnter2D(Collider2D collider)
  {
    // Est-ce un tir ?
    ShotScript shot = collider.gameObject.GetComponent<ShotScript>();
    if (shot != null)
    {
      // Tir allié
      if (shot.isEnemyShot != isEnemy)
      {
        hp -= shot.damage;

        // Destruction du projectile
        // On détruit toujours le gameObject associé
        // sinon c'est le script qui serait détruit avec ""this""
        Destroy(shot.gameObject);

        if (hp <= 0)
        {
          // Destruction !
          Destroy(gameObject);
        }
      }
    }
  }
}
```

Attachez ce "HealthScript" au `Prefab` du Poulpi.

<md-warning>
_Attention_ : Il vaut mieux travailler directement sur les `Prefab` quand ils ont été créés. <br />Ainsi, les modifications seront répercutées sur toutes les instances du `Prefab`. C'est très pratique pour modifier des dizaines d'objets directement, comme tous les ennemis d'un même type. <br />Si vous travaillez sur une instance plutôt que sur le `Prefab`, pas de panqiue, pensez juste à appuyer sur le bouton "Apply" en haut de l'onglet _Inspector_ pour répercuter les changements.
</md-warning>

Alignez le Poulpi et le tir pour tester la collision.

<md-note>
_Note_ : Dans un jeu 2D, faites attention à l'axe des Z : il faut que vos objets soient sur le même plan pourqu'il y ait collision. Ici, tous les objets d'un même plan doivent avoir le même z : `0`.
</md-note>

Lancez le jeu et observez le _frag_ :

[![Enemy is shot][bang]][bang]

Si l'ennemi a plus de points de vies que le tir fait de dégât, il survivra à la collision. Changez la valeur  `hp` du "HealthScript" de l'ennemi pour tester :

[![Enemy is shot but has more HP][bang2]][bang2]

## Génération de projectiles

Supprimer le projectile qui se balade tout seul dans la scène, nous avons terminé avec lui.

Il nous faut un script qui crée des projectiles sur demande. Créons en un nouveau que nous appelerons "WeaponScript".

Ce script sera réutilisable par tous (ennemis, joueur, etc). SOn but est de générer un projectile en face l'objet auquel il est attaché.

Voici le code source complet, les explications viennent ensuite :

```csharp
using UnityEngine;

/// <summary>
/// Crée des projectiles
/// </summary>
public class WeaponScript : MonoBehaviour
{
  //--------------------------------
  // 1 - Designer variables
  //--------------------------------

  /// <summary>
  /// Prefab du projectile
  /// </summary>
  public Transform shotPrefab;

  /// <summary>
  /// Temps de rechargement entre deux tirs
  /// </summary>
  public float shootingRate = 0.25f;

  //--------------------------------
  // 2 - Rechargement
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
  // 3 - Tirer depuis un autre script
  //--------------------------------

  /// <summary>
  /// Création d'un projectile si possible
  /// </summary>
  public void Attack(bool isEnemy)
  {
    if (CanAttack)
    {
      shootCooldown = shootingRate;

      // Création d'un objet copie du prefab
      var shotTransform = Instantiate(shotPrefab) as Transform;

      // Position
      shotTransform.position = transform.position;

      // Propriétés du script
      ShotScript shot = shotTransform.gameObject.GetComponent<ShotScript>();
      if (shot != null)
      {
        shot.isEnemyShot = isEnemy;
      }

      // On saisit la direction pour le mouvement
      MoveScript move = shotTransform.gameObject.GetComponent<MoveScript>();
      if (move != null)
      {
        move.direction = this.transform.right; // ici la droite sera le devant de notre objet
      }
    }
  }

  /// <summary>
  /// L'arme est chargée ?
  /// </summary>
  public bool CanAttack
  {
    get
    {
      return shootCooldown <= 0f;
    }
  }
}

```

Ajoutez ce script au joueur.

Revenons sur les trois parties qui le compose :

### 1. Variables visibles dans l'onglet "Inspector"

Nous avons deux membres : `shotPrefab` et `shootingRate`.

Le premier permet d'indiquer quel prefab il faut instancier.

Dans l'onglet _Hierarchy_, sélectionnez le joueur. Puis dans l'_Inspector_, localisez le champ "Shot Prefab" du composant "WeaponScript"  qui a actuellement une value "None".

Faites un drag'n'drop du prefab "PlayerShot" vers ce champ :

[![Using a prefab][dnd_prefab]][dnd_prefab]

Désormais Unity affectera automatiquement cette valeur au script. Facile non ?

La deuxième variable, `shootingRate`, a déjà une valeur que nous définies dans le script. Elle est modifiable mais elle est suffisante par défaut pour le moment.

<md-warning>
_Faites attention_ : Modifier une valeur dans Unity via l'_Inspector_ ne mettra pas à jour la valeur par défaut dans votre script. Donc si vous réutilisez ce script, il aura l'ancienne valeur, pas la nouvelle. <br />C'est logique mais il faut donc penser à reporter manuellement ces changements une fois que l'on a trouvé les bonnes valeurs.
</md-warning>

### 2. Recharge

TODO traduction

Guns have a firing rate. If not, you would be able to create tons of projectiles at each frame.

So we have a simple cooldown mechanism. If it is greater than `0` we simply cannot shoot. We substract the elapsed time at each frame.

### 3. Public attack method

This is the main purpose of this script: being called from another one. This is why we have a public method that can create the projectile.

Once the projectile is instantiated, we retrieve the scripts of the shot object and override some variables.

<md-note>
_Note_: The `GetComponent<TypeOfComponent>()` method allows you to get a precise component (and thus a script, because a script is a component after all) from an object. The generic (`<TypeOfComponent>`) is used to indicate the exact component that you want. <br />There is also a `GetComponents<TypeOfComponent>()` that get a list instead of the first one, etc.
</md-note>

# Using the weapon with the player entity

If you launch the game at this point, nothing has changed at all. We have created a weapon but it's completely useless.

Indeed, if a "WeaponScript" was attached to an entity, the `Attack(bool)` method would never be called.

Let's go back to "PlayerScript".

In the `Update()` method, put this snippet:

```csharp
  void Update()
  {
    // ...

    // 5 - Shooting
    bool shoot = Input.GetButtonDown("Fire1");
    shoot |= Input.GetButtonDown("Fire2");
    // Careful: For Mac users, ctrl + arrow is a bad idea

    if (shoot)
    {
      WeaponScript weapon = GetComponent<WeaponScript>();
      if (weapon != null)
      {
        // false because the player is not an enemy
        weapon.Attack(false);
      }
    }

    // ...
  }
```

It doesn't matter at this point if you put it after or before the movement.

What did we do ?

1. We read the input from a fire button (`click` or `ctrl` by default).
2. We retrieve the weapon's script.
3. We call `Attack(false)`.

<md-info>
_Button down_: You can notice that we use the `GetButtonDown()` method to get an input. The "Down" at the end allows us to get the input when the button has been pressed and _only_ once. `GetButton()` returns `true` at each frame until the button is released. In our case, we clearly want the behavior of the `GetButtonDown()` method. <br />Try to use `GetButton()` instead, and observe the difference.
</md-info>

Launch the game with the "Play" button. You should get this:

[![Working shooting][shooting]][shooting]

The bullets are too slow? Experiment with the "Shot" prefab to find a configuration you'd like.

_Bonus_: Just for fun, add a rotation to the player, like `(0, 0, 45)`.
The shots have a 45 degrees movement, even if the rotation of the shot sprite is not correct as we didn't change it too.

[![Shooting rotation][shooting_rotation]][shooting_rotation]

# Next step

We have a shooter! A very basic one, but a shooter despite everything. You learned how to create a weapon that can fire shots and destroy other objects.

Try to add more enemies. ;)

But this part is not over! We want enemies that can shoot too. Take a break, what comes next is mainly reusing what we did here.



[shot]: ../../2d-game-unity/shooting-1/-img/shot.png
[shot_config1]: ../../2d-game-unity/shooting-1/-img/shot_config1.png
[bang]: ../../2d-game-unity/shooting-1/-img/bang.gif
[bang2]: ../../2d-game-unity/shooting-1/-img/bang2.gif
[dnd_prefab]: ../../2d-game-unity/shooting-1/-img/dnd_prefab.png
[shooting]: ../../2d-game-unity/shooting-1/-img/shooting.gif
[shooting_rotation]: ../../2d-game-unity/shooting-1/-img/shooting_rotation.png
