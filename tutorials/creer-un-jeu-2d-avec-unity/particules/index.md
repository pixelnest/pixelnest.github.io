---
layout: tutorial
title: Jouons avec les particules
date: 20/11/13

tutorial:
  name: Créer un jeu 2D avec Unity
  link: ../

links:
  summary: ../sommaire
  previous: ../parallax-scrolling
  next: ../sons-et-musiques
---

Notre jeu commence à avoir bonne mine. C'est le moment de plonger dans le merveilleux monde des particules pour l'améliorer encore plus.

Les particules sont (en gros) des sprites simples, nombreux, identiques et avec une durée de vie très réduite. 

Pensez aux explosions, aux lasers, à la fumée, etc. Ces effets sont fait avec des particules - en général, parfois il s'agit simplement d'un sprite animé.

Unity fournit un éditeur de particule très puissant baptisé le _Shuriken Engine_. Voyons ce que nous pouvons en faire.

# Prefab d'explosion

Nous allons faire un effet d'explosion qui sera utilisé sur la destruction d'un joueur ou d'un ennemi. Cela implique :

1. De créer un prefab d'explosion
2. De l'instancier et de le jouer au bon moment

Une explosion se décompose en général en deux morceaux dans un jeu : de la fumée et du feu.

## Particules de fumée

Créez un nouveau "Particle System" ("Game Object" -> "Create Other" -> "Particle System").

<md-tip>
_Astuce_ : Nous vous recommandons de travailler sur une partie vide de la scène (ou sur une scène vide) pour bien voir ce que vous faites. 
<br /><br />
Pour faire un focus sur un objet dans la scène, vous pouvez faire un `double-click` sur lui depuis l'onglet _Inspector_ ou appuyer sur `F` depuis l'onglet _Scene_.
</md-tip>

On vous approchant de votre nouveau système de particule, vous verrez jaillir un flot d'étincelles :

[![Creating a new particle system][new_particle_system]][new_particle_system]

Vous constaterez l'apparition d'une nouvelle petite fenêtre (avec les boutons "Pause" et "Stop") et surtout, dans l'_Inspector_, les douzaines de champs de paramétrages du système de particules.

_Et c'est ça que c'est bon !_

<md-note>
_Note_ : Quand votre _particle system_ est sélectionné dans l'onglet _Hierarchy_, l'animation se lance. Elle s'arrête quand l'objet n'est plus sélectionné. C'est très pratique pour régler l'animation et l'effet des particules.
</md-note>

Nous utiliserons ce sprite très cartoon pour notre effet de fumée :

[![Cloud sprite][cloud]][cloud]

_(Clic droit pour sauver l'image sur votre disque)_

<md-tip>
_Astuce_ : si vous avez un problème de transparence avec votre propre image, vérifiez vos pixels transparents : ils doivent êtres noirs purs. Même si ces pixels sont invisibles et ont une valeur alpha à `0`, ils ont quand même une couleur, qui sera ici utilisée.
</md-tip>

Qopiez l'image dans le dossier "Textures". Petite nouveauté : changez le paramètre "Texture Type" en "Texture" et activez "Alpha Is Transparent". Vous devriez avoir :

[![Cloud settings][cloud_settings]][cloud_settings]

<md-note>
_Note_ : nous utilisons ici une fonctionnalité de Unity 3D, et non une spécifique 2D. Mais cela n'a pas d'importance, les outils 2D ne sont finalement qu'un sous-ensemble des outils d'Unity et le reste ne demande qu'à être utilisé si besoin.
</md-note>

Assignez la texture aux particules :

1. Faites un drag'n'drop de l'image vers votre _particle sysem_ dans l'onglet _Inspector_ (ou directement sur l'objet dans votre _Hierarchy_, Unity comprendra).
2. Modifiez le shader utilisé par "Particles" -> "Alpha Blended" :

[![Cloud shader][cloud_shader]][cloud_shader]

Pour avoir l'effet désiré, nous allons modifier un certains nombres de paramètres dans l'onglet _Inspector_.

Dans ce didacticiel nous utiliserons : 

| Catégorie           | Nom du paramètre     | Valeur |
| ------------------- | -------------------- | ------ |
| General             | Duration             | 1      |
| General             | Max Particles        | 15     |
| General             | Start Lifetime       | 1      |
| General             | Start Color          | Gray   |
| General             | Start Speed          | 3      |
| General             | Start Size           | 2      |
| Emission            | Bursts               | 0 : 15 |
| Shape               | Shape                | Sphere |
| Color Over Lifetime | Color                | Voir ci-dessous (N°1) |
| Size Over Lifetime  | Size                 | Voir ci-dessous (N°2) |

### N°1 — Color Over lifetime

Faire un fondu de blanc à transparent en modifiant la valeur de l'alpha sur la fin :

[![Fade out particles][fade_out]][fade_out]

### N°2 — Size Over lifetime

Choisissez une courbe descendante ou faites-la vous-même.

[![Curve editor][decreasing_curve]][decreasing_curve]

<br />Vous devriez obtenir :

[![Full settings][smoke_settings]][smoke_settings]

N'hésitez pas à modifier tout, essayez d'autres paramètres pour voir leur incidence, bref, faites-vous plaisir, c'est votre jeu après tout :).

Quand vous êtes satisfait du résultat, décochez "Looping".

Ici nous obtenons :

[![Smoke effect][smoke_effect]][smoke_effect]

Ce n'est pas incroyable mais avouez que c'était simple et rapide à faire. Ajouter des particules à un jeu peut faire une grosse différence dans le ressenti et dans le fun procuré (on aime tous quand l'écran fourmille de couleur et de "trucs qui explosent de partout"). 

Sauvegardez votre objet comme un préfab "SmokeEffect". Au passage, pourquoi ne pas faire un nouveau sous-dossier "Prefabs/Particles" ?

## Le feu, ça brûle

Rebelote pour l'effet de feu.

1. Créer un nouveau _particle system_ comme précédemment
2. Ne modifiez pas le material, celui par défaut est suffisant pour nos besoins.

Côté paramètres :

| Catégorie           | Nom du paramètre     | Valeur |
| ------------------- | -------------------- | ------ |
| General             | Looping              | false  |
| General             | Duration             | 1      |
| General             | Max Particles        | 10     |
| General             | Start Lifetime       | 1      |
| General             | Start Speed          | 0.5    |
| General             | Start Size           | 2      |
| Emission            | Bursts               | 0 : 10 |
| Shape               | Shape                | Box    |
| Color Over Lifetime | Color                | See below (N°1) |

### N°1 — Color Over Lifetime

Faisons un petit dégradé du jaune au rouge transparent ne passant par l'orange :

[![Fire gradient][fire_gradient]][fire_gradient]

<br />L'effet à obtenir :

[![Fire effect][fire_effect]][fire_effect]

Sauvez votre objet dans un nouveau préfab "FireEffect".

Il ne nous reste plus qu'à instancier ces préfabs via un script.

# Le script pratique

Instancier ces particules est comme instancier un tir ou un ennemi. La seule différence c'est qu'il faut pensez à supprimer l'objet quand l'effet est terminé.

Enfin, ce script fera lui-même la création du "feu+fumée" pour faire une explosion.

Créez un script "SpecialEffectsHelper" :

```csharp
using UnityEngine;

/// <summary>
/// Effets de particules sans efforts
/// </summary>
public class SpecialEffectsHelper : MonoBehaviour
{
  /// <summary>
  /// Singleton
  /// </summary>
  public static SpecialEffectsHelper Instance;

  public ParticleSystem smokeEffect;
  public ParticleSystem fireEffect;

  void Awake()
  {
    // On garde une référence du singleton
    if (Instance != null)
    {
      Debug.LogError("Multiple instances of SpecialEffectsHelper!");
    }

    Instance = this;
  }

  /// <summary>
  /// Création d'une explosion à l'endroit indiqué
  /// </summary>
  /// <param name="position"></param>
  public void Explosion(Vector3 position)
  {
    // Smoke on the water
    Instantiate(smokeEffect, position);

    // Tu tu tu, tu tu tudu

    // Fire in the sky
    Instantiate(fireEffect, position);
  }

  /// <summary>
  /// Création d'un effet de particule depuis un prefab
  /// </summary>
  /// <param name="prefab"></param>
  /// <returns></returns>
  private ParticleSystem instantiate(ParticleSystem prefab, Vector3 position)
  {
    ParticleSystem newParticleSystem = Instantiate(
      prefab,
      position,
      Quaternion.identity
    ) as ParticleSystem;

    // Destruction programmée
    Destroy(
      newParticleSystem.gameObject,
      newParticleSystem.startLifetime
    );

    return newParticleSystem;
  }
}
```

<md-note>
_Note_ : Comme nous aurons plusieurs fois le même type de particules en même temps dans la scène, nous créons un nouvel effet à chaque fois. Dans d'autres cas, il peut être intéressant de garder la référence de l'effet pour le rejouer plutôt que de le recréer à chaque fois.
</md-note>

Nous utilisons un singleton pour pouvoir l'appeler facilement de n'importe quel autre script grâce au membre `SpecialEffectsHelper.Instance`.

<md-info>
_Singleton_ : Un singleton est un _design pattern_ qui permet de s'assurer que l'objet n'est instancié qu'une seule fois. Ici nous utilisons une propriété qui en découle en rendant accessible cette instance de n'importe où, mais le principe reste le même.
</md-info>

1. Attachez ce script à notre objet "Scripts" dans la _Hierrachy_.
2. Sélectionnez le et remplissez les champs dans l'_Inspector_ en utilisant les prefabs des effets.

[ ![Filling the script with prefab][filling_script]][filling_script]

# On fait tout péter !

On y presque. Plus qu'une étape !

Ouvrez "HealthScript". Nous allons créer une explosion quand les points de vie sont à 0 et que l'objet doit être détruit.

Il suffit d'ajouter une ligne :

````
SpecialEffectsHelper.Instance.Explosion(transform.position);
````

En détail, dans la méthode`OnTriggerEnter()` de "HealthScript":

```csharp
  void OnTriggerEnter(Collider collider)
  {
    // ...

    if (hp <= 0)
    {
      // 'Splosion!
      SpecialEffectsHelper.Instance.Explosion(transform.position);

      // Dead!
      Destroy(gameObject);
    }

    // ...
  }
```

Lancez le jeu. Détruisez quelques ennemis puis laissez-vous vous faire avoir :

[ ![Explosions in action][explosions]][explosions_gif]

_(Cliquez pour voir l'animation)_

Pas trop mal non ? Bien sûr, ce pourrait être mieux.

Mais c'est votre boulot de faire des superbes explosions en utilisant les particules, maintenant vous savez comment ça marche ;).

# Prochaine étape

Nous avons vu comment créez des particules en utilisant le moteur prévu pour dans Unity. C'est assez simple mais leurs utilisations sera un gros plus dans votre jeu. 

Attention quand même, c'est très chronophage ! Vous voudrez rapidement faire de nouveaux effets "super cools" plutôt qu'un nouveau système de high-scores peu passionnant.

Comme l'écrivait James Silva dans [Building XNA 2.0 games](http://www.amazon.com/Building-XNA-2-0-Games-Professionals/dp/1430209798), il vaut mieux travailler sur les particules à la fin du développement du jeu, voir de laisser quelqu'un d’autres sans charger.

Voyons maintenant un autre moyen de donner du _feedback_ au joueur : le son !

[cloud]: ../../2d-game-unity/particles/-img/cloud.png
[new_particle_system]: ../../2d-game-unity/particles/-img/new_particle_system.png
[cloud_settings]: ../../2d-game-unity/particles/-img/cloud_settings.png
[cloud_shader]: ../../2d-game-unity/particles/-img/cloud_shader.png
[smoke_settings]: ../../2d-game-unity/particles/-img/smoke_settings.png
[fade_out]: ../../2d-game-unity/particles/-img/fade_out.png
[decreasing_curve]: ../../2d-game-unity/particles/-img/decreasing_curve.png
[smoke_effect]: ../../2d-game-unity/particles/-img/smoke_effect.gif
[fire_gradient]: ../../2d-game-unity/particles/-img/fire_gradient.png
[fire_effect]: ../../2d-game-unity/particles/-img/fire_effect.gif
[filling_script]: ../../2d-game-unity/particles/-img/filling_script.png
[explosions]: ../../2d-game-unity/particles/-img/explosions.png
[explosions_gif]: ../../2d-game-unity/particles/-img/explosions.gif
