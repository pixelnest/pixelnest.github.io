---
layout: tutorial
title: Gestion du tir (2/2)
date: 13/11/20

show_promotion: steredenn

tutorial:
  name: Créer un jeu 2D avec Unity
  link: ../

links:
  summary: ../sommaire
  previous: ../gestion-du-tir-1
  next: ../parallax-scrolling
---

Notre superbe vaisseau dégomme des pauvres poulpes innocents. Ce n'est pas juste, il faut équilibrer cela !

Réutilisons ce que nous avons fait dans la première partie pour que ces braves bêtes puissent tirer.

# Le projectile ennemi

Nous utiliserons cette image pour faire un sprite :

[ ![Poulpi shot Sprite][shot_poulpi] ][shot_poulpi]

_(Clic droit pour sauver l'image sur votre disque)_

Vous pouvez créer un nouveau sprite, avec un _rigidbody_, un _collider_,  bref tout l'équipement habituel.

Ou si vous aussi aussi fainéant que moi, dupliquez le prefab "PlayerShot" en "EnemyShot1".

	"La paresse est moteur de progrès." X. Le Guillou.

<div data-block="tip">
_Astuce_ : Deux techniques pour la duplication.
<br />
1. Instancier le prefab, renommer l'objet créé, sauver cet objet comme un nouveau préfab (drag'n'drop dans l'onglet _Projects_).
<br />
2. Utilisez les raccourcis claviers dans  l'onglet _Projects_ sur le prefab : `cmd+D` (OS X) ou `ctrl+D` (Windows)
</div>

Pensez à utiliser notre nouvelle image. La bonne échelle est `(0.35, 0.35, 1)`.

Ce qui vous donne au final :

[ ![Poulpi shot configuration][shot_config2] ][shot_config2]

En démarrant le jeu, vous verrez le tir se déplacer et potentiellement détruire un ennemi. C'est grâce (ou à cause) des valeurs paramétrées dans le "ShotScript" que nous avons copiés, prévu pour détruire les Poulpis.

Ne changez pas ces valeurs, car on s'en fiche. Rappelez-vous du "WeaponScript" de la partie précédente : il écrase ces valeurs par les bonnes quand il crée un projectile.

Nous avons notre prefab "EnemyShot1". Supprimez toute instance éventuelle de la scène.

# Tir ennemi

Exactement comme pour le joueur, nous allons ajouter à nos ennemis une arme et appeler  `Attack()`dans un script.

## Modifications des ennemis

Souvenez-vous, nous modifions soit le prefab des ennemis, soit une instance en pensant à sauver les modifications en cliquant sur le bouton "Apply".

1. Ajoutez un "WeaponScript" aux ennemis
2. Drag & drop du prefab "EnemyShot1" dans le champ "Shot Prefab" du script.
3. Créez un nouveau script "EnemyScript" :

```csharp
using UnityEngine;

/// <summary>
/// Comportement générique pour les méchants
/// </summary>
public class EnemyScript : MonoBehaviour
{
  private WeaponScript weapon;

  void Awake()
  {
    // Récupération de l'arme au démarrage
    weapon = GetComponent<WeaponScript>();
  }

  void Update()
  {
    // Tir auto
    if (weapon != null && weapon.CanAttack)
    {
      weapon.Attack(true);
    }
  }
}

```

Ajoutez ce script à notre ennemi. Vous devriez obtenir ceci :

[ ![Poulpi configuration with weapon][enemy_config] ][enemy_config]

Lancez le jeu pour voir !

[ ![Poulpi is shooting][shoot_right] ][shoot_right]

Bon, ça marche, mais ce n'est pas vraiment ce que l'on attendait. L'arme tire vers la droite... parce que c'est ce qu'on lui dit de faire.

Si vous tournez l'ennemi, vous pourrez alors le faire tirer sur la gauche mais... ça ne donne pas ce que l'on veut :

[ ![Upside down Poulpi][gizmo2] ][gizmo2]

Mais alors que faire ?

## Tirer dans toute les directions

Le script "WeaponScript" a été fait dans un but : tirer dans la direction de l'objet auquel il est attaché. Cela pourrait par la suite servir à faire des bras de robots géants qui crachent des missiles sans rien toucher au code.

Ce n'est donc pas lui que l'on va modifier mais l'a manière dont on s'en sert. Ici l'astuce va être de l'ajouter à un objet vide enfant de l'objet ennemi.

Il nous faut :

1. Créer un objet vide. Appelons le "WeaponObject".
2. Supprimer le composant "WeaponScript" attaché à l'objet / au prefab de l'ennemi.
3. Ajouter un "WeaponScript" à notre "WeaponObject" et remettre le prefab du projectile en paramètre.
4. Appliquer une rotation de `(0, 0, 180)` au "WeaponObject".

Au final ce n'est pas très compliqué, il vous faut juste obtenir ceci :

[ ![Enemy with a new object][enemy_full_config] ][enemy_full_config]

Il nous faut aussi modifier légèrement notre "EnemyScript".

En l'état actuel des choses, ce script utilise `GetComponent<WeaponScript>()` qui nous retournera ``null`` car il n'y a plus de ``WeaponScript`` directement lié à l'objet.

Mais heureusement, il suffit de remplacer par `GetComponentInChildren<WeaponScript>()` pour rechercher cette fois dans toute la hiérarchie de l'objet.

<div data-block="note">
_Note_ : Comme pour `GetComponent<>()`, `GetComponentInChildren<>()` se décline au pluriel (remarquez le `s` après "Component").
</div>

Et juste pour le plaisir, nous avons ajouté la gestion de plusieurs armes pour chaque ennemi (il nous suffit de garder une liste d'arme plutôt qu'une seule).

Voici "EnemyScript" au complet :

```csharp
using System.Collections.Generic;
using UnityEngine;

/// <summary>
/// Comportement générique pour les méchants
/// </summary>
public class EnemyScript : MonoBehaviour
{
  private WeaponScript[] weapons;

  void Awake()
  {
    // Récupération de toutes les armes de l'ennemi
    weapons = GetComponentsInChildren<WeaponScript>();
  }

  void Update()
  {
    foreach (WeaponScript weapon in weapons)
    {
      // On fait tirer toutes les armes automatiquement
      if (weapon != null && weapon.CanAttack)
      {
        weapon.Attack(true);
      }
    }
  }
}
```

Enfin, changez si besoin les valeurs des paramètres du "MoveScript" du prefab du projectile "EnemyShot1" : il faut quand même qu'il soit plus rapide que l'ennemi en lui-même :

[![Super dangerous Poulpi][shoot_ok]][shoot_ok]

Maintenant ça ne rigole plus, les Poulpis sont méchants !

### Bonus : tir multiple

Ajouter une deuxième arme pour tirer deux projectiles à la fois à notre ennemi n'est qu'une question de quelques clics, il n'y a aucune ligne de script à modifier :

1. Ajoutez un nouveau "WeaponObject" (en dupliquant l'existant).
2. Modifiez la rotation de chaque arme.

Et c'est tout, votre ennemi tire dans deux directions. Un exemple :

[ ![A "super super" dangerous Poulpi with two guns][shoot_two_dir] ][shoot_two_dir]

C'est un bon exemple de la logique Unity : nous réutilisons des scripts simples et indépendants. Le code est réduit, et _moins de code = moins d'erreurs_.

## Dégâts du joueur

Nos poulpis ont beau être armés jusqu'au dents (les poulpes ont-ils des dents ?), ils ne peuvent en fait toujours rien faire au joueur.

Pour y remédier, ajoutez un "HealthScript" à l'objet du joueur. _Pensez à décochez le champ "IsEnemy"_.

[![Script configuration for player health][player_no_enemy]][player_no_enemy]

Lancez le jeu et observez la différence :

[![Player hit by an enemy projectile][player_die]][player_die]

# Bonus

Ce qui suit n'est qu'une piste d'améliorations et de réflexions autour du développement d'un _shmup_. Si le genre ne vous intéresse pas, vous pouvez passez à l'étape suivante ;).

## _Pool_ de projectiles

En jouant un peu avec votre projet actuel vous verrez que l'onglet _Hierarchy_ se remplit rapidement de projectiles qui mettent du temps à être détruits : 20 secondes d'après le script s'ils ne touchent pas leur cible.

Si vous voulez faire un [danmaku][danmaku_link] avec BEAUCOUP de "boulettes", il va falloir mieux gérer le nombre d'objets à l'écran et en mémoire.

Une solution pour gérer beaucoup de projectiles et de limiter leur nombre (c'est le système de _pool_).

Concrètement, cela peut être un tableau à taille limité référençant les objets créés. Une fois plein, on supprime les plus anciens pour en recréer des nouveaux.

Nous n'allons pas le faire ici mais nous eu l'occasion de l'utiliser pour un [script de peinture](http://dmayance.com/unity-paint-part-2/).

Vous pouvez aussi juste réduire la durée de vie d'un projectile pour qu'il disparaisse rapidement, le risque étant qu'il n'ait pas le temps de toucher sa cible.

<div data-block="warning">
_Attention_ : Dans tous les cas, rappelez-vous que la méthode `Instantiate` est très coûteuse en performance. Le _pool_ peut aussi permettre de créer des objets prêts à être utilisés.
</div>

## Tirs différés

Si vous ajoutez plusieurs ennemis dans la scène, vous verrez qu'ils tirent de manière synchronisée.

Une solution simple serait d'ajouter un délai de tir à notre arme (initialiser le _cooldown_ à autre chose que 0). Si les armes ne sont pas initialisées avec la même valeur (aléatoire ou paramètre précis) alors elles ne tireront pas en même temps.

Mais ici aussi c'est un choix à faire qui dépend entièrement du gameplay que vous visez.

# Prochaine étape

Nous avons vu comment ajouter des armes à nos ennemis, en réutilisant en  partie ce que l'on avait fait précédemment.

Le jeu que nous avons maintenant commence à prendre forme :

[![Result][result]][result]

Essayez d'ajouter des ennemis, avec différentes propriétés. Bien sûr pour le moment le décor est statique et rappel "Space Invaders".

Justement le prochain chapitre est consacré au défilement du décor et de l'arrière-plan !

[shot_poulpi]: ../../2d-game-unity/shooting-2/-img/shot_poulpi.png
[shot_config2]: ../../2d-game-unity/shooting-2/-img/shot_config2.png
[enemy_config]: ../../2d-game-unity/shooting-2/-img/enemy_config.png
[shoot_right]: ../../2d-game-unity/shooting-2/-img/shoot_right.gif
[gizmo]: ../../2d-game-unity/shooting-2/-img/gizmo.png
[gizmo2]: ../../2d-game-unity/shooting-2/-img/gizmo2.png
[reverse]: ../../2d-game-unity/shooting-2/-img/reverse.png
[enemy_full_config]: ../../2d-game-unity/shooting-2/-img/enemy_full_config.png
[shoot_ok]: ../../2d-game-unity/shooting-2/-img/shoot_ok.gif
[shoot_two_dir]: ../../2d-game-unity/shooting-2/-img/shoot_two_dir.gif
[player_no_enemy]: ../../2d-game-unity/shooting-2/-img/player_no_enemy.png
[player_die]: ../../2d-game-unity/shooting-2/-img/player_die.gif
[result]: ../../2d-game-unity/shooting-2/-img/result.png

[danmaku_link]: http://en.wikipedia.org/wiki/Shoot_%27em_up#Bullet_hell "Danmaku shmup"
