---
layout: tutorial
title: Ajout du joueur et des ennemis
date: 13/11/20

tutorial:
  name: Créer un jeu 2D avec Unity
  link: ../

links:
  summary: ../sommaire
  previous: ../arriere-plan-et-camera
  next: ../gestion-du-tir-1
---

Dans le chapitre précédent, nous avons vu comment ajouter un décor en arrière-plan. Il est d'ajouter des éléments du gameplay, comme, au sahard, le joueur 

# Création du joueur

Le joueur se compose de plusieurs éléments : un sprite, un contrôleur (manette, clavier, etc) et un script pour interagir avec le monde.

Nous allons voir ces étapes l'une après l'autre, commençons par le sprite.

## Ajout d'un sprite

Voici l'image que nous allons utiliser :

[![Player Sprite][player]][player]

_(Clic droit pour sauver l'image sur votre disque)_

1. Copier cette image du joueur dans le dossier "Textures".

2. Créer un nouveau ``Sprite``. Nommez le "Player".

3. Sélectionnez le sprite à utiliser. Comme pour l'arrière-plan, il faut saisir la valeur du champ "Sprite" dans le composant "Sprite Renderer".

  En cas de problème nous vous invitons à vous référer à l'a partie précédente où nous avons fait exactement la même chose pour le décor et les plateformes volantes.

4. Placez l'objet "Player" dans le plan "0 - Foreground".

5. Changez son échelle. ``(0.2, 0.2, 1)`` fera l'affaire.

## Un mot sur les composants

Nous venons juste d'évoquer le composant (_Component_) "Sprite Renderer". Si vous ne l'aviez pas vu, tous les objets dans Unity sont composés d'un à plusieurs composants, visible dans l'onglet _Inspector_.

Par défaut, un objet vide ressemble à cela :

[![game object sans composants][empty_components]][empty_components]

Le seul composant affiché est le "Transform". Il est **obligatoire** sur chaque objet de la scène, mais ne vous en souciez pas, il sera toujours mis d'office.

Vous pouvez ajouter autant de composants différents que vous le souhaitez. Vous ne pouvez pas toujours ajouter plusieurs fois le même composant (Unity vous préviendra). Certains composants peuvent être désactivés/activés pendant l'exécution du jeu. L'exemple ici avec un script :

[![Activer un composant][components]][components]

_(Vous pouvez cliquer sur la checkbox pour le désactiver. Un clic droit vous donnera d'autres options selon le type de composant)_

<md-note>
_Note_ : Les composants peuvent interagir entre eux. Si vous prévoyez par exemple dans un script d'utiliser le "Collider 2D" d'un objet, vous pourrez directement les lier entre eux par un simple drag'n'dorp, comme nous le ferons plus tard. Si vous passez un _game objet_ et que Unity attend un composant, il fera lui-même la recherche du composant du type souhaité dans l'objet passé en paramètre.
</md-note>

Le composant "Sprite Renderer" permet d'afficher un sprite à l'écran.

Après ces petites explications sur le concept des composants, nous allons en ajouter plusieurs à notre joueur.

## Ajouter un composant Box Collider 2D

Sélectionnez votre joueur et cliquez sur le bouton "Add Component" qui apparaît en bas de l'_Inspector_. Ajoutez un "Box Collider 2D".

Cela va représenter la [_hitbox_][hitbox_link] de notre joueur, la forme acceptant les collisions.

Vous pouvez voir le _collider_ dans l'éditeur (onglet "Scene") et vous pouvez modifier sa taille et sa forme directement depuis cet onglet, plutôt que de modifier les valeurs du champ "Size" "au pif" dans l'_Inspector_.

<md-tip>
_Astuce_ : Pour éditer un _box collider_ depuis l'éditeur, sélectionnez tout d'abord votre objet dans la scène. Maintenez le bouton ``maj``, vous devriez voir apparaître des points sur les côtés du rectangles. Tirez ces points pour modifier la taille du rectangle. Attention, votre _collider_ est la rectangle vert, le bleu représente le sprite.   
</md-tip>

La taille que nous voulons obtenir ici est de ``(10, 10)``.

C'est beaucoup trop gros pour un vrai _shmup_ mais c'est plus petit que le sprite (les ailes du vaisseau sont donc invincibles) :

[![Player hitbox][hitbox]][hitbox]

Cela nous conviendra pour le moment.

<md-tip>
_Astuce_ : Si vous souhaitez vraiment faire un _shmup_, prenez tout votre temps pour définir les hitboxes de vos sprites. En général, celle du joueur doit être petite et doit s'adapter à un élément du sprite. Ici cela pourrait être un cercle autour du hublot central, donc un _Circle Collider 2D_. L'avantage est que peu importe le type de _collider_, Unity les gère de manière uniforme.
</md-tip>

Sauvez ce nouvel objet comme un prefab. Vous avez maintenant un début de joueur ! 

[![Adding Player Sprite][adding_player]][adding_player]

### Polygon Collider 2D

Si vous voulez une hitbox ultra précise et adaptée à une forme complexe, Unity propose désormais le "Polygon Collider 2D". Il est moins performant mais est incontournable dans certaines situations (terrains en pente par exemple). 

<md-tip>
_Astuce_ : Le "Polygon Collider 2D" est comme les autres _colliders_, il peut se modifier à la souris depuis l'onglet "Scene". C'est d'ailleurs là qu'il prend tout son sens : en restant appuyé sur  ``cmd`` ou ``ctrl``, vous pouvez supprimer un point du polygone, et avec ``maj`` vous pouvez ajouter ou modifier un point.
</md-tip>

## Le rigidbody qui aurait réjoui Newton.

Il nous reste un composant à ajouter, un "Rigidbody 2D".

Cela permet de définir les propriétés physiques de notre objet pour le moteur... physique ! Et cela va permettre de récupérer les événements de collisions dans un script.

1. Sélectionnez votre objet ``Player`` dans l'onglet _Hierarchy_.
2. Ajoutez un composant "Rigidbody 2D".

Maintenant, lancez le jeu (enfin !) et observez :

[![Falling player][failing_ship]][failing_ship]

Le vaisseau coule...

Dites bonjour à notre chère gravité :).

Avec Unity, toutes les scènes sont créés avec une gravité par défaut. Les _rigidbodies_ sont créés avec une masse par défaut. Le poids attire donc notre joueur vers le sol... sauf qu'il n'y a pas de sol.

<md-info>
La gravité par défaut dans Unity est de ``y = - 9.81``, pour imiter celle de la Terre.
</md-info>

La gravité et le moteur physique peuvent être utilisés dans certains types de jeu, voir même dans un shmup pour certains éléments, mais pas pour notre joueur volant.

Nous allons la désactiver pour le joueur uniquement, en mettant le champ "Gravity Scale" à 0. Le vaisseau ne tombe plus !

Cochez aussi l'option "Fixed Angles", cela évitera au vaisseau de tourner suite à une collision 

Au final nous avons :

[![Player rigibody settings][player_full_settings]][player_full_settings]

## Déplacer le joueur

C'est l'heure de rentrer dans le code ! Pour le moment nous n'avions pas écrit une ligne, c'est toute la puissance d'Unity.

Depuis l'onglet "Proejcts", créez un nouveau script C# dans le dossier "Scripts". Appelons-le "PlayerScript".

<md-info>
_Remarque_ : vous pouvez tout à fait créer un script JavaScript à la place, nous ne vous fournissons que le code en C# mais la traduction est assez simple.
</md-info>

Ouvrez votre éditeur de code préféré en passant par le sous-menu "Sync MonoDevelop Project" du menu "Assets".

<md-note>
_"Sync MonoDevelop Project"_ : Ce sous-menu est bien mal nommé, surtout qu'il ne s'adapte pas à l'éditeur lié à Unity.<br /> Nous vous recommandons de toujours passer par ce sous-menu pour que Unity créer une solution et un projet complets, avec les bonnes librairies liées.<br /> Cela vous permettre d'avoir l'auto-complétion et la reconnaissance des erreurs. Si vous ouvrez simplement le script sans ce contexte, vous ne bénéficierez plus que de la coloration syntaxique. 
</md-note>

Si vous avez déjà utilisé XNA, vous ne serez pas perdus.

Nous allons pouvoir définir des méthodes (appelée "Message", nous ne sommes pas dans du polymorphisme typique de la programmation objet mais bien dans du **script**) que Unity va reconnaître et pouvoir exécuter.

Les scripts nouvellement créés contiennent deux de ces méthodes, **Start** et **Update**. Voici une liste des autres fonctions les plus courantes :

- ``Awake()`` est appelé dans l'objet est créé
- ``Start()`` est appelé après que tous les objets de la scène aient finis ``Awake()``. De plus, ``Start()`` n'est pas appelée tant que le script n'est pas activé.
- ``Update()`` est exécuté à chaque frame, soit 60 fois par seconde si votre jeu tourne à 60 images par secondes. Si votre jeu rame, Update() sera appelé moins souvent (ou votre jeu ramera parce que votre méthode met trop de temps à s'exécuter et retarde la frame suivante)
- ``FixedUpdate()`` est appelé régulièrement sur un taux de rafraîchissement fixe et indépendant. Préférez cette méthode à ``Update()`` quand vous devez utilisez la physique ("RigidBody" et l'application de forces).
- ``Destroy()`` est la dernière chance d'exécuter du code avant la destruction d'un objet

Puis nous avons une collection de méthodes pour les collisions :

- ``OnCollisionEnter2D(CollisionInfo2D info)`` : un collider touche le collider de notre objet
- ``OnCollisionExit2D(CollisionInfo2D info)`` : un collider ne touche plus le collider de notre objet.
- ``OnTriggerEnter2D(Collider2D otherCollider)`` : un collider marqué comme "Trigger" touche le collider de notre objet
- ``OnTriggerExit2D(Collider2D otherCollider)`` : un collider marqué comme "Trigger" ne touche plus le collider de notre objet

Pfiou... C'était un peu barbant, mais avec cela vous êtes parés pour 90% de vos scripts.

<md-note>
_Note sur le suffixe "2D"_ : Vous aurez peut-être remarqués que de nombreux éléments que nous utilisons ont un nom qui fini par "2D":  "Box Collider 2D", "Rigidbody 2D", "OnCollisionEnter2D" ou encore "OnTriggerEnter2D", etc. 
<br />
_C'est une nouveauté de Unity 4.3 !_
<br />
Ce suffixe vous indique que l'élément est destiné au moteur physique **2D** embarqué dans Unity, actuellement Box2D, et non 3D (PhysX). Même si les deux partagent la même logique dans Unity, nous vous recommandons de ne pas les mélanger pour moins d'ennuis et plus de performances. Nous n'utiliserons dans ce didacticiel que des éléments 2D.
</md-note>

Nous reviendrons en détails sur chaque méthode au moment de l'utiliser.

Notre joueur aura la capacité de se déplacer grâce aux flèches directionnelles.

```csharp
using UnityEngine;

/// <summary>
/// Contrôleur du joueur
/// </summary>
public class PlayerScript : MonoBehaviour
{
  /// <summary>
  /// 1 - La vitesse de déplacement
  /// </summary>
  public Vector2 speed = new Vector2(50, 50);

  void Update()
  {
    // 2 - Récupérer les informations du clavier/manette
    float inputX = Input.GetAxis("Horizontal");
    float inputY = Input.GetAxis("Vertical");

    // 3 - Calcul du mouvement
    Vector3 movement = new Vector3(
      speed.x * inputX,
      speed.y * inputY,
      0);

    // 4 - Le mouvement est relatif au temps écoulé
    movement *= Time.deltaTime;

    // 5 - Déplacement
    transform.Translate(movement);
  }
}
```

_(Les numéros font références aux explications ci-dessous)_

<md-note>
_Note sur les conventions_ C# : Si vous regardez la variable ``speed``, vous verrez qu'elle est publique et sans accesseur (et ne commence pas par une majuscule, puisque c'est un membre de la classe, pas une propriété). <br />Bien que cela soit contraire aux conventions habituelles, cela permet d'exposer cette variable à l'_Inspector_ de Unity et donc de pouvoir la modifier à tout moment sans toucher au code.
<br />Nous sommes bien dans du script plus que dans une application C# pure et dure, et cela se traduit par quelques différences dans l'utilisation du langage et de ses conventions.
</md-note>

### Explications du script

1. Définition des variables accessibles depuis l'éditeur, ici la vitesse de déplacement du vaisseau (dans une unité arbitraire)
2. Récupération des contrôles par défaut définis dans un nouveau projet Unity. Ils peuvent être changés via le menu  ["Edit" -> "Project Settings" -> "Input"][unity_axis_link]. La valeur récupérée est entre ``[-1, 1]``, ``0`` étant le point mort, 1 la droite, -1 la gauche.
3. On calcule le mouvement pour cette frame à partir de la direction des flèches / du joystick et de la vitesse théorique vu vaisseau.
4. Ce mouvement dépend du temps passé, ainsi si le jeu ralentit le joueur ralentira également
5. Enfin, nous appliquons ce mouvement au ``transform`` du joueur pour modifier réellement sa position dans la scène.

Ajoutez ce script à notre objet joueur.

<md-tip>
_Astuce_ : Vous pouvez ajoutez un script par un simple drag'n'drop, en sélectionnant le script depuis l'onglet "Project" et en le déposant sur votre objet. Vous pouvez aussi cliquer sur "Add Component" et le rechercher manuellement.
</md-tip>

Lancez le jeu, le vaisseau doit bouger ! Félicitations, vous venez de faire une sorte de ["Hello, World!"][helloworld_link] du jeu vidéo ;).

[![Le joueur bouge][ship_moving]][ship_moving]

Essayez de modifier la vitesse : sélectionnez le joueur et modifier la valeur "Speed" dans l'onglet _Inspector_.

[![The inspector for a script][player_value_tweak]][player_value_tweak]

<md-danger>
_Attention !_ : Les modifications faites pendant l’exécution (bouton "Play" enfoncé) sont perdus lorsque le jeu s'arrête ! C'est l'outil parfait pour essayer des valeurs mais penser à les noter sur un coin de table pour ne pas les perdre.
<br /> L'autre avantage est de pouvoir détruire entièrement le jeu pendant l’exécution et de le voir remis à neuf à chaque fois, sans conséquence sur le projet.
</md-danger>

C'est le premier signe de vie dans notre projet, nous allons en ajouter d'autres.

# Poulpi, le premier ennemi

Un _shmup_ n'est rien sans vagues d'ennemis à dézinguer.

Prenons ce poulpe innocent, Poulpi :

[![Poulpi Sprite][poulpi]][poulpi]

_(Clic droit pour sauver l'image sur votre disque)_

## Sprite

Créons encore un sprite ! Nommez le "Poulpi", puis, comme d'habitude :

1. Copiez l'image dans votre dossier "Textures"
2. Créez un nouvea ``Sprite`` utilisant cette image
3. Changez la valeur du champ "Scale" du ``Transform`` à ``(0.4, 0.4, 1)``.
4. Ajoutez un "Box Collider 2D" avec une taille de ``(4, 4)``.
5. Ajoutez un "Rigidbody 2D" avec le champ "Gravity Scale" à ``0`` et "Fixed Angles" coché.

Sauvegardez le préfab et... c'est tout !nd that's it!

[![Enemy Sprite in Unity][enemy_definition]][enemy_definition]

## Script

Rendons-le un peu moins immobile avec un script qui le fera avancer dans une direction.

Créez un nouveau script "MoveScript".

Nous aurions pu l'appeler "EnemyScript" mais un nom plus générique nous permettra de le réutiliser dans un autre contexte plus tard.

<md-note>
_Note_ : Le système de composant particulièrement modulaire de Unity permet de découper facilement les scripts par fonctionnalité. Après, rien ne vous empêche de ne faire qu'un énorme script maître du monde avec de très nombreux paramètres, c'est votre choix, mais nous vous recommandons plutôt le découpage au maximum.
</md-note>

Nous allons copier une partie du code du "PlayerScript" mais en ajoutant une nouvelle variable pour la direction :

```csharp
using UnityEngine;

/// <summary>
/// Déplace l'objet
/// </summary>
public class MoveScript : MonoBehaviour
{
  // 0 - Designer variables

  /// <summary>
  /// Vitesse de déplacement
  /// </summary>
  public Vector2 speed = new Vector2(10, 10);

  /// <summary>
  /// Direction
  /// </summary>
  public Vector2 direction = new Vector2(-1, 0);

  void Update()
  {
    // 1 - Calcul du mouvement
    Vector3 movement = new Vector3(
      speed.x * direction.x,
      speed.y * direction.y,
      0);

    movement *= Time.deltaTime;
    transform.Translate(movement);
  }
}
```

Ajoutez ce script à notre Poulpi. Lancez le jeu et il devrait bouger comme ci-dessous :

[![L'ennemi bouge !][moving_enemy]][moving_enemy]

Si vous mettez le joueur sur son chemin, les deux sprites vont bien entrer en collision et ils se bloqueront mutuellement. C'est le comportement par défaut grâce au moteur physique puisque nous ne traitons pas encore les collisions.

# Prochaine étape

Nous avons vu comment ajouter le joueur, contrôlé par le clavier ou le gamepad, puis nous avons ajouté un premier ennemi stupide mais mouvant.

Maintenant nous allons équiper le joueur pour qu'il puisse détruire cette chose !

[player]: ../../2d-game-unity/player-and-enemies/-img/player.png
[hitbox]: ../../2d-game-unity/player-and-enemies/-img/hitbox.png
[empty_components]: ../../2d-game-unity/player-and-enemies/-img/empty_go_components.png
[components]: ../../2d-game-unity/player-and-enemies/-img/go_components.png
[adding_player]: ../../2d-game-unity/player-and-enemies/-img/adding_player.png
[failing_ship]: ../../2d-game-unity/player-and-enemies/-img/failing_ship.gif
[player_full_settings]: ../../2d-game-unity/player-and-enemies/-img/player_full_settings.png
[ship_moving]: ../../2d-game-unity/player-and-enemies/-img/moving_ship.gif
[player_value_tweak]: ../../2d-game-unity/player-and-enemies/-img/player_value_tweak.png

[poulpi]: ../../2d-game-unity/player-and-enemies/-img/poulpi.png
[enemy_definition]: ../../2d-game-unity/player-and-enemies/-img/enemy_definition.png
[moving_enemy]: ../../2d-game-unity/player-and-enemies/-img/moving_enemy.gif

[hitbox_link]: http://en.wikipedia.org/wiki/Hitbox "Hitbox definition"
[unity_axis_link]: http://unity3d.com/learn/tutorials/modules/beginner/scripting/get-axis "Unity axis and inputs"
[helloworld_link]: http://en.wikipedia.org/wiki/Hello_world_program "Hello, World! definition"
