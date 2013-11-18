---
layout: tutorial
title: Parallax scrolling
date: 13/11/13

tutorial:
  name: Créer un jeu 2D avec Unity
  link: ../

links:
  summary: ../sommaire
  previous: ../gestion-du-tir-2
  next: ../particules
---

Pour le moment le jeu n'est folichon : un décor statique, un joueur et quelques ennemis. Nous allons voir comment améliorer simplement notre jeu visuellement.

Un effet classique de presque tous les jeux 2D sortis depuis 15 ans est le _[parallax scrolling][parallax_link]_. Il s'agit d'un effet trompe-l'oeil pour donner un effet de profondeur. Le décor est décomposé en plusieurs plans, chaque plan défile à une vitesse différente (lent au fond, rapide devant). Cela crée une illusion de profondeur. C'est un effet très sympathique et simple à mettre en place.

De plus, la plupart des _shmup_ utilisent un scrolling (défilement) dans une ou plusieurs directions. Sauf l'originel, [Space Invaders][space_invaders_link].

Voyons comment faire dans Unity.

# Partie théorique : définition du scrolling.

Ajouter le défilement aura des conséquences sur notre jeu.

Pensons-y un peu avant de coder :).

## Qu'est-ce qui doit bouger ?

Il faut faire un choix parmi ces deux mécanismes de _shmup_ :

1. Soit le joueur et la caméra bouge, le reste est fixe
2. Soit le joueur et la caméra sont fixes, le reste bouge vers eux. Comme un tapis roulant.

Le premier choix est évident quand la caméra est en mode `Perspective`. le parallax est automatique, les objets plus loins sont affichés... plus loins, et ils donnent l'impression de se déplacer moins vite.

Mais en 2D et avec une caméra  `Orthographic` nous perdons cette information de profondeur sur le rendu, donc le premier choix ne nous donnerait pas un effet de parallax.

Pour obtenir cet effet nous pouvons mélanger un peu les deux solutions et avoir deux défilements :

- Le joueur et la caméra bouge
- Le décor avance dans la direction opposé à des vitesses différentes (en plus du mouvement intrinsèque de la caméra)

<md-note>
_Note_ : Vous vous dites peut-être "Mais pourquoi on n'attache pas simplement la caméra à l'objet joueur ?". En faisant cela avec Unity, lobjet enfant sera déplacé en même temps que son parent. Donc la caméra aura toujours la même position par rapport au joueur. Cela ne colle pas avec notre gameplay.
<br/><br/> Dans un _shmup_, la caméra restreint les mouvements du joueur dans une zone limitée. 
<br/><br/> Plus généralement, il vaut mieux séparer la gestion de la caméra de son joueur dans un jeu 2D. Même sur un platformer, la caméra n'est pas directement liée à lui. Un excellent exemple est la caméra de Super Mario World, [nous vous invitons à en voir un peu plus][smw_camera].

## Apparition des ennemis

L'ajout du défilement aura des conséquences sur le jeu, notamment sur les ennemis. Pour le moment, ils se contentent d'avancer et de tirer dès que le jeu commence. Mais nous voulons plutôt qu'ils attendent d'être visibles avant de commencer à agir. Avant cette apparition (_spawn_), il serait bon aussi qu'ils soient invincibles pour ne pas prendre une balle perdue.

Comment allons nous les faire apparaître ? Cela dépend vraiment du jeu. Nous pourrions par exemple vouloir définir des événements qui font apparaître des ennemis. Mais ici nous allons opter pour le plus simple : le placement d'un ennemi donné via l'éditeur est l'endroit où il doit apparaître.

Ils seront immobiles tant que la caméra ne les a pas atteint :

[ ![Camera usage][camera_use] ][camera_use]

L'idée ici est d'utiliser l'éditeur de Unity pour placer les ennemis. Et mine de rien, cela fait un éditeur de niveau tout prêt sans avoir rien à faire.

[Mais encore une fois c'est un choix nous vous proposons][stackgamedev_link]. ;)

<md-note>
_Note_ : nous pensons vraiment qu'utiliser l'éditeur de Unity comme éditeur de niveau est un grand plus. Après, si vous avez du temps, du budget, et des designers qui ont besoin d'outils spécifiques, c'est discutable. 
</md-note>

## Plans

Définissons les plans que nous aurons et, pour chaque, s'il se répète. Un décor qui se répète aura l'air infini pendant toute la durée du niveau. C'est très utile pour élément comme le ciel ou des étoiles.

Ajoutez un nouveau plan pour les éléments du décor. Nous aurons comme plans :

| Layer                                      |   Loop   |    Position    |
| ------------------------------------------ | -------- | -------------- |
| Background (pour le ciel)                   | Yes      | `(0, 0, 10)`   |
| Background (plateformes volantes au loin))   | No       | `(0, 0, 9)`    |
| Middleground (plateformes volantes proches) | No       | `(0, 0, 5)`    |
| Foreground (joueur et ennemis)      | No       | `(0, 0, 0)`    |

[ ![Plans][planes] ][planes]

Il pourrait aussi y avoir un plan devant le joueur et les ennemis. L'important c'est d'avoir une position ``z`` comprise entre ``0`` et ``10``, car c'est ce que permet la caméra par défaut.

<md-warning>
_Attention_ avec les éléments en premier plan, cela peut gâcher la visibilité du jeu, chose cruciale dans un _shmup_.
</md-warning>

# Partie pratique : en route pour le code

Vous l'aurez compris, un scrolling impacte notre jeu.

<md-info>
_Le saviez-vous_ "Scrolling shooters" est un nom de sous-genre du Shoot them up.
</md-info>

Assez parlé !

Unity fourni désormais des scripts tout prêt pour du parallax, notamment dans son exemple de plateformer 2D disponible sur l'Asset Store. I lest sûrement très bien, mais nous préférons vous montrer comment cela fonctionne en le faisant nous-mêmes.

<md-warning>
_Standard packages_: utiliser les paquets standards proposés par Unity n'est pas toujours une bonne idée, surtout pour les textures et modèles. Cela se verra immédiatement et donnera un côté "encore un jeu fait avec Unity" qui vous empêchera de vous faire remarquer.
<br />Ces assets sont par contre assez pratiques pour prototyper rapidement.
</md-warning>

## Scrolling simple

Commençons petit : le défilement _sans_ répétition.

Cela va ressembler beaucoup au "MoveScript" que nous avons déjà écrit : une vitesse et une direction pour calculer un mouvement à appliquer selon le temps écoulé.

Créer un nouveau script "ScrollingScript" :

```csharp
using UnityEngine;

/// <summary>
/// Parallax scrolling
/// </summary>
public class ScrollingScript : MonoBehaviour
{
  /// <summary>
  /// Vitesse du défilement
  /// </summary>
  public Vector2 speed = new Vector2(2, 2);

  /// <summary>
  /// Direction du défilement
  /// </summary>
  public Vector2 direction = new Vector2(-1, 0);

  /// <summary>
  /// Appliquer le mouvement de scrolling à la caméra ?
  /// </summary>
  public bool isLinkedToCamera = false;

  void Update()
  {
    // Mouvement
    Vector3 movement = new Vector3(
      speed.x * direction.x,
      speed.y * direction.y,
      0);

    movement *= Time.deltaTime;
    transform.Translate(movement);

    // Déplacement caméra
    if (isLinkedToCamera)
    {
      Camera.main.transform.Translate(movement);
    }
  }
}
```

Ajoutez ce script aux objets indiqués comme suit :

| Plan (objet)                   | Vitesse        | Direction    | Lié à la caméra  |
| ----------------------- | ------------ | ------------ | ----------------- |
| 0 - Background          | `(1, 1)`     | `(-1, 0, 0)` | No                |
| 1 - Background elements | `(1.5, 1.5)` | `(-1, 0, 0)` | No                |
| 2 - Middleground        | `(2.5, 2.5)` | `(-1, 0, 0)` | No                |
| 3 - Foreground          | `(1, 1)`     | `(1, 0, 0)`  | Yes               |

Pour améliorer le  résultat, ajoutez quelques éléments à la scène :
- Un troisième morceau [arrière-plan][background_url] après les deux premiers
- Des petites plateformes dans le plan `1 - Background elements`.
- Des plateformes dans le plan `2 - Middleground`.
- Des ennemis à droite du joueur dans le plan  `3 - Foreground` en dehors de la caméra

<md-note>
_Note_ : N'hésitez pas à utiliser vos propres valeurs :)
</md-note>

Vous obtiendrez :

[ ![Scrolling effect][scrolling1] ][scrolling1]

Pas mal ! Mais vous remarquerez que les ennemis attaquent en dehors de la caméra et avant d'apparaître. Et si vous les ratez, ils continueront leur chemin sans jamais être supprimés du système (dézoomez et déplacez-vous dans la vue éditeur pour les voir quand le jeu est en action). 

Nous réglerons ça plus tard, chaque chose en son temps. Maintenant attaquons-nous au décor qui se répète à l'infini.

# Scrolling infini

Pour obtenir cette répétition il nous suffit de vérifier l'objet du plan infini le plus proche de la sortie, ici la gauche.

Quand cet objet sort de la caméra entièrement, nous le faisons passer en bout de file, à droite. Et on répète cela pendant toute la durée du jeu :

[ ![Infinite scrolling][infinite_scrolling_definition] ][infinite_scrolling_definition]

Pour un effet crédible, il vous faudra de quoi couvrir la caméra entièrement à tout moment. Ici, nous mettons trois morceaux de décor mais c'est arbitraire.

Ici, nous allons appliquer cette vérification aux enfants de l'objet plan. Cette vérification se fera sur leur composant _renderer_.

<md-note>
_A propose du _renderer_ : Ce qui va suivre ne marche donc que pour des objets visibles. Cela ne pourrait pas fonctionner pour des objets "vides" comme "Scripts" portent simplement les scripts. Mais en même temps, ils n'ont logiquement pas besoin de suivre le décor pour s'exécuter correctement.
</md-note>

Nous utiliserons une méthode bien pratique pour savoir si un renderer est visible ou non par une caméra (donc s'il est affiché). Ce bout de code vient du [wiki communautaire][community_post_link]. Ce n'est ni une classe, ni un script, c'est une [extension][extension_link].

<md-tip>
_Extension_ : il est possible d'ajouter des méthodes à une classe en C# sans en modifier son code source (et surtout, sans y avoir accès !).
<br />Il faut pour cela créer une classe statique, et dans cette classe une méthode statique avec un premier paramètre comme ceci : `this Type currentInstance`. La classe `Type` aura maintenant une nouvelle méthode. <br />
</md-tip>

## L'extension "RendererExtensions" 

Créez un nouveau script, appelez-le "RendererExtensions.cs" et remplissez-le avec :

```csharp
using UnityEngine;

public static class RendererExtensions
{
  public static bool IsVisibleFrom(this Renderer renderer, Camera camera)
  {
    Plane[] planes = GeometryUtility.CalculateFrustumPlanes(camera);
    return GeometryUtility.TestPlanesAABB(planes, renderer.bounds);
  }
}
```

Facile non ?

<md-danger>
_Namespaces_ : Si vous êtes un développeur C#, vous aurez peut-être noté l’absence de namespaces avec Unity. Mais en fait, Unity supporte assez bien ces derniers, c'est juste qu'il n'en met pas par défaut. Assez bien car il y a un bug connu avec les valeurs par défauts pour des paramètres.
 <br /><br />Dans un vrai projet, nous vous recommandons d'ajouter votre namespace pour éviter les conflits avec le moteur et d'éventuelles librairies ou plugins (comme _NGUI_).
</md-danger>

Nous allons utiliser cette nouvelle méthode pour vérifier si un objet est sorti de la caméra ou non.

## "ScrollingScript" au complet

Voici le "ScrollingScript", les explications vous sont proposées ensuite :

```csharp
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

/// <summary>
/// Parallax scrolling
/// </summary>
public class ScrollingScript : MonoBehaviour
{
  /// <summary>
  /// Vitesse du défilement
  /// </summary>
  public Vector2 speed = new Vector2(2, 2);

  /// <summary>
  /// Direction du défilement
  /// </summary>
  public Vector2 direction = new Vector2(-1, 0);

  /// <summary>
  /// Appliquer le mouvement de scrolling à la caméra ?
  /// </summary>
  public bool isLinkedToCamera = false;

  /// <summary>
  /// 1 - Le plan est infini
  /// </summary>
  public bool isLooping = false;

  /// <summary>
  /// 2 - Liste des enfants avec renderer
  /// </summary>
  private List<Transform> backgroundPart;

  // 3 - Récupération des objets enfants du plan
  void Start()
  {
    // Pour la réptition
    if (isLooping)
    {
      // On récupère les objets enfants qui ont un renderer
      backgroundPart = new List<Transform>();

      for (int i = 0; i < transform.childCount; i++)
      {
        Transform child = transform.GetChild(i);

        if (child.renderer != null)
        {
          backgroundPart.Add(child);
        }
      }

      // Tri par position
	  // Note : cela n'est bon que pour un défilement de gauche à droite
	  // il faudrait modifier un peu pour gérer d'autres directions. 
      backgroundPart = backgroundPart.OrderBy(
        t => t.position.x
      ).ToList();
    }
  }

  void Update()
  {
    // Mouvement
    Vector3 movement = new Vector3(
      speed.x * direction.x,
      speed.y * direction.y,
      0);

    movement *= Time.deltaTime;
    transform.Translate(movement);

    // Défilement camera
    if (isLinkedToCamera)
    {
      Camera.main.transform.Translate(movement);
    }

    // 4 - Répétition
    if (isLooping)
    {
      // On prend le premier objet (la la liste est ordonnée)
      Transform firstChild = backgroundPart.FirstOrDefault();

      if (firstChild != null)
      {
        // Premier test sur la position de l'objet
        // Cela évite d'appeler directement IsVisibleFrom
        // qui est assez lourde à exécuter
        if (firstChild.position.x < Camera.main.transform.position.x)
        {
          // On vérifie maintenant s'il n'est plus visible de la caméra
          if (firstChild.renderer.IsVisibleFrom(Camera.main) == false)
          {
            // On récupère le dernier élément de la liste
            Transform lastChild = backgroundPart.LastOrDefault();

			// On calcule ainsi la position à laquelle nous allons replacer notre morceau 
            Vector3 lastPosition = lastChild.transform.position;
            Vector3 lastSize = (lastChild.renderer.bounds.max - lastChild.renderer.bounds.min);

            // On place le morceau tout à la fin
            // Note : ne fonctionne que pour un scorlling horizontal 
            firstChild.position = new Vector3(lastPosition.x + lastSize.x, firstChild.position.y, firstChild.position.z);

            // On met à jour la liste (le premier devient dernier)
            backgroundPart.Remove(firstChild);
            backgroundPart.Add(firstChild);
          }
        }
      }
    }
  }
}
```

_(Les chiffres correspondent aux explications ci-dessous)_


TODO TRADUCTION

### Explanations

1. We need a public variable to turn on the "looping" mode in the "Inspector" view.
2. We also have to use a private variable to store the layer children.
3. In the `Start()` method, we set the `backgroundPart` list with the children that have a renderer. Thanks to a bit of [LINQ][linq_link], we order them by their `X` position and put the leftmost at the first position of the array.
4. In the `Update()` method, if the `isLooping` flag is set to `true`, we retrieve the first child stored in the `backgroundPart` list. We test if it's completely outside the camera field. When it's the case, we change its position to be after the last (rightmost) child. Finally, we put it at the last position of `backgroundPart` list.

Indeed, the `backgroundPart` is the exact representation of what is happening in the scene.

<br />Remember to enable the "Is Looping" property of the "ScrollingScript" for the `0 - Background` in the "Inspector" pane. Otherwise, it will (predictably enough) not work.

[![Infinite scrolling][infinite_scrolling]][infinite_scrolling_gif]

_(Click on the image to see the animation)_

Yes! We finally have a functional "parallax scrolling" implementation.

# Bonus: Enhancing existing scripts

Let's update our previous scripts.

## Enemy v2 with spawn

We said earlier that enemies should be disabled until they are visible by the camera.

They should also be removed once they are completely off the screen.

We need to update "EnemyScript", so it will:

1. Disable the movement, the collider and the auto-fire (when initialized).
2. Check when the renderer is inside the camera sight.
3. Activate itself.
4. Destroy the game object when it's outside the camera.

_(The numbers refer to the comments in the code)_

```csharp
using UnityEngine;

/// <summary>
/// Enemy generic behavior
/// </summary>
public class EnemyScript : MonoBehaviour
{
  private bool hasSpawn;
  private MoveScript moveScript;
  private WeaponScript[] weapons;

  void Awake()
  {
    // Retrieve the weapon only once
    weapons = GetComponentsInChildren<WeaponScript>();

    // Retrieve scripts to disable when not spawn
    moveScript = GetComponent<MoveScript>();
  }

  // 1 - Disable everything
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
  }

  void Update()
  {
    // 2 - Check if the enemy has spawned.
    if (hasSpawn == false)
    {
      if (renderer.IsVisibleFrom(Camera.main))
      {
        Spawn();
      }
    }
    else
    {
      // Auto-fire
      foreach (WeaponScript weapon in weapons)
      {
        if (weapon != null && weapon.enabled && weapon.CanAttack)
        {
          weapon.Attack(true);
        }
      }

      // 4 - Out of the camera ? Destroy the game object.
      if (renderer.IsVisibleFrom(Camera.main) == false)
      {
        Destroy(gameObject);
      }
    }
  }

  // 3 - Activate itself.
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
  }
}
```

Start the game. Yes, there's a bug.

Disabling the "MoveScript" as a negative effect: The player never reaches the enemies as they're all moving with the `3 - Foreground` layer scrolling:

[ ![camera_moving_along_gif][camera_moving_along_gif]][camera_moving_along_gif]

_Remember: we've added a "ScrollingScript" to this layer in order to move the camera along with the player._

But there is a simple solution: move the "ScrollingScript" from the `3 - Foreground` layer to the player!

Why not after all? The only thing that is moving in this layer is him, and the script is not specific to a kind of object.

Push the "Play" button and observe: It works.

1. Enemies are disabled until they spawn (i.e., until the camera reaches their positions).
2. Then they disappear when they are outside the camera.

[ ![Enemy spawn][enemy_spawn] ][enemy_spawn_gif]

_(Click on the image to see what happens)_

## Keeping the player in the camera bounds

You might have noticed that the player is not (yet) restricted to the camera area. "Play" the game, push the "Left Arrow" and watch him leaves the camera.

We have to fix that.

Open the "PlayerScript", and add this at the end of the "Update()" method:

```csharp
  void Update()
  {
    // ...

    // 6 - Make sure we are not outside the camera bounds
    var dist = (transform.position - Camera.main.transform.position).z;

    var leftBorder = Camera.main.ViewportToWorldPoint(
      new Vector3(0, 0, dist)
    ).x;

    var rightBorder = Camera.main.ViewportToWorldPoint(
      new Vector3(1, 0, dist)
    ).x;

    var topBorder = Camera.main.ViewportToWorldPoint(
      new Vector3(0, 0, dist)
    ).y;

    var bottomBorder = Camera.main.ViewportToWorldPoint(
      new Vector3(0, 1, dist)
    ).y;

    transform.position = new Vector3(
      Mathf.Clamp(transform.position.x, leftBorder, rightBorder),
      Mathf.Clamp(transform.position.y, topBorder, bottomBorder),
      transform.position.z
    );

    // End of the update method
  }
```

Nothing complicated, just verbose.

We get the camera edges and we make sure the player position (_the center of the sprite_) is inside the area borders.

Tweak the code to better understand what is happening.

# Next step

We have a scrolling shooter!

We have just learned how to add a scrolling mechanism to our game, as well as a parallax effect for the background layers. However, the current code only works for right to left scrolling. But with your new knowledge, you should be able to enhance it and make it work for all scrolling directions.

Still, _the game really needs some tweaks to be playable_. For example:

- Reducing the sprite sizes.
- Adjusting the speeds.
- Adding more enemies.
- _Making it fun_.

We will address these points in our upcoming chapter about gameplay tweaking (not released yet, unfortunately). For the moment, you can experiment. ;)

In the next chapter, we will focus our attention on how to make the game a bit more... _flashy_. With particles!


[camera_use]: ../../2d-game-unity/parallax-scrolling/-img/camera_use.png
[planes]: ../../2d-game-unity/parallax-scrolling/-img/planes.png
[scrolling1]: ../../2d-game-unity/parallax-scrolling/-img/scrolling1.gif
[infinite_scrolling_definition]: ../../2d-game-unity/parallax-scrolling/-img/infinite_scrolling_definition.png
[infinite_scrolling]: ../../2d-game-unity/parallax-scrolling/-img/infinite_scrolling.png
[infinite_scrolling_gif]: ../../2d-game-unity/parallax-scrolling/-img/infinite_scrolling.gif
[enemy_spawn]: ../../2d-game-unity/parallax-scrolling/-img/enemy_spawn.png
[enemy_spawn_gif]: ../../2d-game-unity/parallax-scrolling/-img/enemy_spawn.gif
[background_url]: ../../2d-game-unity/background-and-camera/-img/background.png
[camera_moving_along_gif]: ./-img/camera_moving_along.gif

[parallax_link]: http://fr.wikipedia.org/wiki/D%C3%A9filement_parallaxe "Parallax Scrolling"
[space_invaders_link]: http://en.wikipedia.org/wiki/Space_Invaders "Space Invaders"
[stackgamedev_link]: http://gamedev.stackexchange.com/questions/2712/enemy-spawning-method-in-a-top-down-shooter "Spawning methods"
[community_post_link]: http://wiki.unity3d.com/index.php?title=IsVisibleFrom "Is an object visible by the camera?"
[extension_link]: http://msdn.microsoft.com/en-us/library/vstudio/bb383977.aspx "C# Extension Methods"
[linq_link]: http://msdn.microsoft.com/fr-fr/library/bb397926.aspx "LINQ"
[smw_camera]: http://www.youtube.com/watch?v=TCIMPYM0AQg "Super Mario World Camera logic review"
