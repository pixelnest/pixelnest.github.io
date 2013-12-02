---
layout: tutorial
title: Gestion du tir (1/2)
date: 13/11/20

tutorial:
  name: Créer un jeu 2D avec Unity
  link: ../

links:
  summary: ../sommaire
  previous: ../ajout-du-joueur-et-des-ennemis
  next: ../gestion-du-tir-2
---

Notre vaisseau impuissant fait face à un terrifiant Poulpi... donnons lui les moyens de se défendre !

Cela va nécessité pas mal de code, mais le jeu en vaut la chandelle.

# Le projectile

Pour commencer, nous allons créer le projectile que le joueur va tirer.

Voici le sprite à utiliser :

[ ![Shot Sprite][shot] ][shot]

_(Clic droit pour sauver l'image sur votre disque)_

Ce projectile va être réutilisé abondamment, il y aura plusieurs instances en même temps à l'écran quand le joueur tirera. 

Donc qu'est-ce que l'on va utiliser ? Facile, un `Prefab` !

## Préparation du Prefab

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

Ici, le tir passera donc à travers les objets qu'ils touchent : il n'y a donc plus vraiment d'interaction. Mais les objets touchés auront l’événement "OnTriggerEnter2D" levé.

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

Ce qu'il nous manque, c'est un script pour gérer les points de vies et un autre pour en perdre. 

Créez un nouveau script "HealthScript" :

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
_Attention_ : Il vaut mieux travailler directement sur les `Prefab` quand ils ont été créés. <br />Ainsi, les modifications seront répercutées sur toutes les instances du `Prefab`. C'est très pratique pour modifier des dizaines d'objets directement, comme tous les ennemis d'un même type. <br />Si vous travaillez sur une instance plutôt que sur le `Prefab`, pas de panique, pensez juste à appuyer sur le bouton "Apply" en haut de l'onglet _Inspector_ pour répercuter les changements.
</md-warning>

Alignez le Poulpi et le tir pour tester la collision.

<md-note>
_Note_ : Dans un jeu 2D, faites attention à l'axe des Z : il faut que vos objets soient sur le même plan pour qu’il y ait collision. Ici, tous les objets d'un même plan doivent avoir le même z : `0`.
</md-note>

Lancez le jeu et observez le _frag_ :

[![Enemy is shot][bang]][bang]

Si l'ennemi a plus de points de vies que le tir fait de dégât, il survivra à la collision. Changez la valeur  `hp` du "HealthScript" de l'ennemi pour tester :

[![Enemy is shot but has more HP][bang2]][bang2]

## Génération de projectiles

Supprimer le projectile qui se balade tout seul dans la scène, nous avons terminé avec lui.

Il nous faut un script qui crée des projectiles sur demande. Créons en un nouveau que nous appellerons "WeaponScript".

Ce script sera réutilisable par tous (ennemis, joueur, etc). Son but est de générer un projectile en face l'objet auquel il est attaché.

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

**Ajoutez ce script au joueur.**

Revenons sur les trois parties qui le compose :

### 1. Variables visibles dans l'onglet "Inspector"

Nous avons deux membres : `shotPrefab` et `shootingRate`.

Le premier permet d'indiquer quel prefab il faut instancier.

Dans l'onglet _Hierarchy_, sélectionnez le joueur. Puis dans l'_Inspector_, localisez le champ "Shot Prefab" du composant "WeaponScript"  qui a actuellement une value "None".

Faites un drag'n'drop du prefab "PlayerShot" vers ce champ :

[![Using a prefab][dnd_prefab]][dnd_prefab]

Désormais Unity affectera automatiquement cette valeur au script. Facile non ?

La deuxième variable, `shootingRate`, définie la vitesse de tir du joueur. Elle a déjà une valeur que nous définies dans le script, qui est modifiable mais suffisante pour le moment.

<md-warning>
_Faites attention_ : Modifier une valeur dans Unity via l'_Inspector_ ne mettra pas à jour la valeur par défaut dans votre script. Donc si vous réutilisez ce script, il aura l'ancienne valeur, pas la nouvelle. <br />C'est logique mais il faut donc penser à reporter manuellement ces changements une fois que l'on a trouvé les bonnes valeurs.
</md-warning>

### 2. Vitesse de tir

La vitesse de tir de l'arme a une incidence directe sur le gameplay et sur les performances du jeu. A vous de voir si vous voulez pouvoir créer des tonnes de _boulettes_ ou non à chaque frame (ce que Unity appréciera moyennement).

Nous avons donc un mécanisme tout simple de temps de recharge entre deux tirs. Si ce temps d'attente est supérieur à `0` alors on ne peut pas tirer. Ce temps est diminué à chaque frame par le temps écoulé.

### 3. Méthode Attack(bool)

La méthode ``Attack(bool)`` est la raison d'être de ce script d'arme : créer un projectile à partir d'un  appel dans un autre script. 

Une fois le projectile instancié, nous le paramétrons  avec les bonnes valeurs.

<md-note>
_Note_ : La méthode `GetComponent<TypeOfComponent>()` permet de récupérer un composant précis sur l'objet courant, notamment un script à partir de sa classe. Cela est possible grâce à la généricité (`<TypeOfComponent>`).<br /> Il existe aussi la même méthode au pluriel, `GetComponents<TypeOfComponent>()`, pour récupérer une liste de composant du même type si vous savez que vous en avez plusieurs.
</md-note>

# Utilisez l'arme à partir du joueur

Si vous essayez de jouer à ce moment du tutoriel, rien n'aura changé. L'arme (le script) est créé mais `Attack(bool)` n'est jamais appelée.

Changeons cela en ouvrant le "PlayerScript".

Dans `Update()`, ajoutez cette cinquième étape :

```csharp
  void Update()
  {
    // ...

    // 5 - Tir
    bool shoot = Input.GetButtonDown("Fire1");
    shoot |= Input.GetButtonDown("Fire2");
    // Astuce pour ceux sous Mac car Ctrl + flèches est utilisé par le système

    if (shoot)
    {
      WeaponScript weapon = GetComponent<WeaponScript>();
      if (weapon != null)
      {
        // false : le joueur n'est pas un ennemi
        weapon.Attack(false);
      }
    }

    // ...
  }
```

Cette étape peut être avant ou après le mouvement, la seule chose qui compte est que ce soit dans l'`Update()` du joueur.

Mais qu'avons-nous fait ?

1. Nous lisons la valeur des entrée claviers / gamepad
2. S'il y a eu un appui intéressant, alors il faut récupérer le script de l'arme
3. Et on appelle `Attack(false)` 

<md-info>
_Button down_: Nous utilisons `GetButtonDown()` pour récupérer la valeur d'une entrée. Le "Down" correspond à l'état "vient juste d'être appuyé". Cet état n'est valable qu'une frame, lorsque le bouton est enfoncé et ne l'était pas l'instant d'avant.<br /> Nous pouvons aussi utiliser `GetButton()` qui indique si le bouton est enfoncé, cela permettrait de tirer en continu en restant appuyé.
</md-info>

Démarrez le jeu, vous devriez pouvoir tirer :

[![Working shooting][shooting]][shooting]

Vous trouvez les tirs trop lents ou pas assez puissants ? Changez les valeurs du prefab "Shot" jusqu'à obtenir la configuration qui vous plaît.

_Bonus_ : Si vous ajoutez une rotation sur le joueur, par exemple `(0, 0, 45)`, alors les tirs seront aussi soumis à cette trajectoire sans avoir rien à faire (même si les tirs n'auront pas la bonne orientation car nous ne la changeons pas en fonction de la trajectoire).

[![Shooting rotation][shooting_rotation]][shooting_rotation]

Ce petit détail aura son importance dans le chapitre suivant.

# Prochaine étape

Nous avons un shooter ! Très basique, pas très marrant, mais dans les faits, ça l'est. Nous avons créé une arme qui tire des projectile pour détruire d'autres éléments.

Ajoutez d'autres ennemis ;).

Dans la prochaine partie nous allons équiper les Poulpis à leur tour en réutilisant et améliorant les scripts écrits ici.

[shot]: ../../2d-game-unity/shooting-1/-img/shot.png
[shot_config1]: ../../2d-game-unity/shooting-1/-img/shot_config1.png
[bang]: ../../2d-game-unity/shooting-1/-img/bang.gif
[bang2]: ../../2d-game-unity/shooting-1/-img/bang2.gif
[dnd_prefab]: ../../2d-game-unity/shooting-1/-img/dnd_prefab.png
[shooting]: ../../2d-game-unity/shooting-1/-img/shooting.gif
[shooting_rotation]: ../../2d-game-unity/shooting-1/-img/shooting_rotation.png
