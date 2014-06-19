---
layout: tutorial
title: Menus et chargement du jeu
date: 13/11/20

tutorial:
  name: Créer un jeu 2D avec Unity
  link: ../

links:
  summary: ../sommaire
  previous: ../sons-et-musiques
  next: ../release
---

Nous avons terminé notre premier niveau avec un gameplay de base (certe il manque une condition de victoire), plusieurs sprites, du son et des particules.

Mais quand le joueur meurt, le jeu continue d'avancer dans le vide et il n'est pas possible de recommencer. Il nous faut ajouter un moyen de relancer une partie perdue.

<md-info>
_Damien_ : Pour être honnête, je trouve que les menus et l'interface dans un jeu en général c'est une vraie plaie. Il faut souvent utiliser un framework bancal voir inexistant (coucou XNA), et en tant que joueur j'estime que les menus sont fait pour être passés rapidement.
</md-info>

<md-info>
_Matthieu_ : A l'inverse de pas mal de développeur de jeux, je ne suis pas d'accord. Créer une _bonne_ interface pour un jeu n'est pas chose facile mais c'est en revanche intéressant et gratifiant. Cependant, cela nécessite de bons outils et une certaine connaissance du design (comme pour une application).
<br /><br /> Mais c'est vrai qu'un _bon_ menu doit être invisible, pour qu'au final les joueurs le remarquent à peine.
</md-info>

Malheureusement, Unity n'offre pas vraiment de quoi faire de superbes menus facilement à moins d'y consacrer beaucoup de temps pour d'utiliser un plugin.

Il ne sera pas question ici de créer une interface complexe. Nous nous contenterons des outils de base mais vous les trouvrez vite... limités.

Commençons par le commencent.

# Assets

## Arrière-plan

[ ![background][background]][background]

_(Clic droit pour sauver l'image sur votre disque)_

## Logo

[ ![logo][logo]][logo]

_(Clic droit pour sauver l'image sur votre disque)_

Importez ces assets dans votre projet. Vous pouvez faire un sous-dossier "Menu" au dossier "Textures" pour ne pas avoir de conflits sur les noms.

Pour les boutons, nous utiliserons les horribles boutons de base.

# Title screen

Presque tous les jeux ont un écran d'accueil, qui s'affiche une fois les divers splashscreens passés.

<md-info>
_Damien_ : Certains écrans titres sont mémorables : Megaman, Metal Slug... (je suis fan des écrans titres).
</md-info>

Ce que nous allons faire sera, disons... plus sobre ! Mais libre à vous de vous amusez ;).

## Scène

Créez une nouvelle scène :

1. "File" -> "New scene".
2. Sauvez la dans le dossier "Scenes" sous le nom de "Menu".

<md-tip>
_Astuce_ : Vous pouvez aussi utilisez les raccourcis `cmd+N` (OS X) ou `ctrl+N` (Windows).
</md-tip>

Notre écran titre sera composé de :

- Un arrière-plan.
- Un logo.
- Un script pour afficher les boutons.

Pour l'arrière-plan :

1. Créez un novueau `Sprite`
2. Position `(0, 0, 1)`
3. Scale `(2, 2, 1)`

Pour le logo :

1. Créez un novueau `Sprite`
2. Position `(0, 2, 0)`
3. Scale `(0.75, 0.75, 1)`

Vous devriez obtenir :

[ ![Result][result1]][result1]

Bien sur vous pouvez ajouter votre nom, les contrôles, des animations sympas... les menus sont aussi un espace de liberté ! Rappelez-vous juste que le joueur doit pouvoir lancer rapidement une partie.

# Script du menu

Nous allons créer un nouveau script, "MenuScript". Il sera chargé d'afficher un bouton et de charger le niveau si on clique dessus.

Attachez ce nouveau script à un nouvel objet vide (que l'on appellera peut-être... "Script" ?). Son contenu :

```csharp
using UnityEngine;

/// <summary>
/// Script de l'écran titre
/// </summary>
public class MenuScript : MonoBehaviour
{
  void OnGUI()
  {
    const int buttonWidth = 84;
    const int buttonHeight = 60;

    // Affiche un bouton pour démarrer la partie
    if (
      GUI.Button(
        // Centré en x, 2/3 en y
        new Rect(
          Screen.width / 2 - (buttonWidth / 2),
          (2 * Screen.height / 3) - (buttonHeight / 2),
          buttonWidth,
          buttonHeight
        ),
        "Start!"
      )
    )
    {
      // Sur le clic, on démarre le premier niveau
      // "Stage1" est le nom de la première scène que nous avons créés.
      Application.LoadLevel("Stage1");
    }
  }
}
```

<md-info>
_A propos de la syntaxe_ : oui, elle est [vraiment étrange](http://docs.unity3d.com/Documentation/ScriptReference/GUI.Button.html).
</md-info>

Nous affichons juste un bouton qui charge la scène "Stage1" quand l'utilisateur clique dessus.

<md-note>
_Note_: La méthode `OnGUI` est appelée à chaque frame et est destinée à afficher tous les éléments d'interface : barres de vies, compteurs, menus, etc.
<br />L'objet `GUI` permet de créer rapidement dans le code des composants d'interface, comme la méthode `GUI.Button` par exemple.
</md-note>

Lancez le jeu et admirez notre menu :

[ ![Button result][result2]][result2]

Cliquez et... notre premier crash ! L'erreur est visible dans la console :

	Level 'Stage1' (-1) couldn't be loaded because it has not been added to the build settings. To add a level to the build settings use the menu File->Build Settings...

Pour une fois, le message d'erreur est très clair. Voyons cela.

# Ajoutez des scènes au package

Allez dans "File" -> "Build Settings":

[ ![Build settings][build_settings]][build_settings]

Maintenant, faites un drag'n'drop de vos deux scènes vers la fenêtre pour les ajouter.

[ ![Adding scenes][build_settings_add]][build_settings_add]

Relancez le jeu, cliquez et... c'est parti !

[ ![Start game][start]][start]

<md-tip>
_Astuce_ : La méthode `Application.LoadLevel()` est radicale : elle instancie la nouvelle scène et supprime l'ancienne. Vous aurez parfois envie qu'un objet transite d'une scène à l'autre, une musique par exemple.
<br /><br />Unity a une méthode pour cela, `DontDestroyOnLoad(aGameObject)`. Il suffit de l'appeler sur l'objet que l'on veut conserver et il ne disparaîtra pas pendant le chargement. D'ailleurs il ne disparaîtra plus jamais à moins de le supprimer manuellement.
</md-tip>

# Mort du joueur et nouvelle partie

Nous voulons aussi que notre joueur puisse redémarrer une partie quand il a perdu. Et pour le moment, cela arrive très souvent (nous y remédierons dans un chapitre à venir).

Actuellement le déroulement du partie est :

1. Le joueur entre en collision avec un projectile ennemi
2. `HealthScript.OnCollisionEnter` est levé
3. Le joueur perd 1 point de vies
4. "HealthScript" détruit le joueur car il a moins d'un point de vie

Et nous allons ajouter :

1. `PlayerScript.OnDestroy` est levé
2. Un "GameOverScript" est créé et ajouté à la scène

Mais d'abord, créons un nouveau script "GameOverScript". C'est un petit bout de code qui affichera deux boutons pour quitter ou recommencer :

```csharp
using UnityEngine;

/// <summary>
/// Relance ou quitte la partie en cours
/// </summary>
public class GameOverScript : MonoBehaviour
{
  void OnGUI()
  {
    const int buttonWidth = 120;
    const int buttonHeight = 60;

    if (
      GUI.Button(
        // Centré en x, 1/3 en y
        new Rect(
          Screen.width / 2 - (buttonWidth / 2),
          (1 * Screen.height / 3) - (buttonHeight / 2),
          buttonWidth,
          buttonHeight
        ),
        "Retry!"
      )
    )
    {
      // Recharge le niveau
      Application.LoadLevel("Stage1");
    }

    if (
      GUI.Button(
        // Centré en x, 2/3 en y
        new Rect(
          Screen.width / 2 - (buttonWidth / 2),
          (2 * Screen.height / 3) - (buttonHeight / 2),
          buttonWidth,
          buttonHeight
        ),
        "Back to menu"
      )
    )
    {
      // Retourne au menu
      Application.LoadLevel("Menu");
    }
  }
}

```

C'est exactement comme le premier script sauf que nous avons deux boutons.

Maintenant il faut modifier le "PlayerScript et ajouter ceci :

```csharp
void OnDestroy()
{
  // Game Over.
  // Ajouter un nouveau script au parent
  // Car cet objet va être détruit sous peu
  transform.parent.gameObject.AddComponent<GameOverScript>();
}
```

Lancez le jeu et perdez :

[ ![Game Over][game_over]][game_over]

Le script a été placé dans la scène, dans le parent du joueur (logiquement le plan `3 - Foreground`) :

[ ![Game Over Script][game_over_script]][game_over_script]

Bien sur il faudra afficher le score, avoir des animations... mais ça fonctionne ! :)

# "Oh secours que c'est laid"

Eh oui... pour y remédier, pas de miracle, il va falloir s'acharner. Vous pouvez essayer en créant une "GUI Skin".

* "Assets" -> "Create" -> "Gui Skin" :

[ ![GUISkin][GUISkin]][GUISkin]

Depuis l'_Inspector_, vous pourrez modifiez l'apparence de tous les contrôles de l'interface.

Assurez-vous de sauvegardez ce fichier "GUISkin" dans le dossier "Resources".

<md-note>
_Note_ : le dossier "Resources" est spécial pour Unity. Tout ce qui s'y trouve sera embarqué avec le jeu et peut être chargé depuis un script en utilisant la méthode `Resources.Load()`.
<br />Vous pouvez donc charger des objets extérieurs pendant l'exécution... cela ne vous rappelle pas le principe des _mods_ ?
</md-note>

Mais votre nouvelle skin pour interface n'est pas encore appliquée.

Il faut modifier nos deux scripts précédents et la charger manuellement avec `GUI.skin = Resources.Load("GUISkin");`... Attention à le faire _qu'une seule fois_).

Un exemple du "MenuScript" (au niveau de la méthode `Start()`) :

````csharp
using UnityEngine;

/// <summary>
/// Script de l'écran titre
/// </summary>
public class MenuScript : MonoBehaviour
{
  private GUISkin skin;

  void Start()
  {
	// Chargement de l'apparence
    skin = Resources.Load("GUISkin") as GUISkin;
  }

  void OnGUI()
  {
    const int buttonWidth = 128;
    const int buttonHeight = 60;

	// On applique l'apparence
    GUI.skin = skin;

    if (GUI.Button(
      new Rect(Screen.width / 2 - (buttonWidth / 2), (2 * Screen.height / 3) - (buttonHeight / 2), buttonWidth, buttonHeight),
      "START"
      ))
    {
      Application.LoadLevel("Stage1"); // "Stage1" is the scene name
    }
  }
}
````

Comme vous le voyez, c'est pas mal de boulot pour un simple bout de menu.

<md-note>
_Note_ : Si vousavez un peu d'argent à investir et que vous avez besoins de menus et/ou d'afficher du texte, jetez un œil au [plugin NGUI][ngui_link]. Il vaut le coup._ Vraiment_.
</md-note>

# Prochaine étape

Vous avez appris à faire un simple menu pour un jeu.
Jusqu'à présent nous avons fait :

* Un parallax scrolling sur 3 plans
* Des particules !
* Un écran titre !
* Des sprites et des sons
* Un gameplay _shmup_  avec un joueur et des ennemis.

Félicitations ! Bon par contre, c'est uniquement sur votre ordinateur... et pour vendre un jeu promis à un grand avenir, c'est mal barré, il faut un moyen de le distribuer.

C'est justement ce dont nous allons parler dans cette dernière partie : créer un exécutable et le déployer sur un terminal iOS.

[background]: ../../2d-game-unity/menus/-img/background.png
[logo]: ../../2d-game-unity/menus/-img/logo.png
[elements]: ../../2d-game-unity/menus/-img/elements.png
[result1]: ../../2d-game-unity/menus/-img/result1.png
[result2]: ../../2d-game-unity/menus/-img/result2.png
[build_settings]: ../../2d-game-unity/menus/-img/build_settings.png
[build_settings_add]: ../../2d-game-unity/menus/-img/build_settings_add.png
[start]: ../../2d-game-unity/menus/-img/start.gif
[game_over]: ../../2d-game-unity/menus/-img/game_over.png
[game_over_script]: ../../2d-game-unity/menus/-img/game_over_script.png
[GUISkin]: ../../2d-game-unity/menus/-img/GUISkin.png "Creating a GUISkin in Resources folder"

[ngui_link]: http://www.tasharen.com/?page_id=140 "NGUI Unity Plugin"
