---
layout: tutorial
title: Faisons du bruit dans Unity
date: 13/11/13

tutorial:
  name: Créer un jeu 2D avec Unity
  link: ../

links:
  summary: ../sommaire
  previous: ../particules
  next: ../menus
---

Après avoir travaillé sur le visuel du jeu, attaquons-nous aux sons et à la musique dans notre projet. C'est très simple avec Unity mais ça n'en reste pas moins une part essentielle d'un jeu vidéo.

Vous apprendrez où vous procurez des bons petits sons et chouettes musiques pour du jeu vidéo et quoi en faire pour les retrouver dans le jeu.

# La recherche de sons et de musiques

Damien a participé il y a quelques temps [à une discussion sur le sujet sur Stack Exchange](http://gamedev.stackexchange.com/questions/22525/how-does-a-one-man-developer-do-its-games-sounds).

D'après nos connaissances, les options pour un développeur de jeux sons :

- Acheter des sons
- Collaborer avec un musicien/un sound designer
- Utiliser des sons gratuits provenant de banque de sons (comme [FindSounds](http://www.findsounds.com/) ou [Freesound](http://www.freesound.org/))
- Enregistrer ses propres sons

Ou le plaisir coupable de Damien :

- Créer des sons chiptunes (8-bit) en utilisant [BFXR](http://www.bfxr.net/) (basé sur [SFXR](http://drpetter.se/project_sfxr.html) mais en version web bien plus pratique)

<md-info>
_Matthieu_ : J'ai eu l'occasion de créer des sons et des musiques pour le projet d'un ami. A lépoque, j'étais batteur mais pas du tout compositeur.
<br />Avec l'aide de [Freesound](http://www.freesound.org/), un peu d'inventivité  et plusieurs douzaines d'heures (sans connaître aucun outil, mais cela m'a permis d'apprendre à utiliser [Audacity](http://audacity.sourceforge.net/) sur le tas), j'ai réussi à faire une bande son complète pour le jeu.
<br /><br />
Je ne vous conseillerai de le faire pour la musique (trouvez plutôt un musicien qui accepte de le faire), mais avec un peu de temps et les bons outils, vous pouvez vraiment créer de chouettes effets sonores. C'est à votre portée, soyez créatifs. 
</md-info>

Pour la musique, tout dépend de ce que vous recherchez :
- [Jamendo](http://www.jamendo.com/) recense un paquet d'artistes, mais faites attention aux licences souvent payants pour un usage commercial.
- - [Bosca Ceoil](http://distractionware.com/blog/2013/08/bosca-ceoil/) de Terry Cavanagh est un logiciel simple et efficace pour faire de la musique.

<md-info>
_Damien_ : C'est par Jamendo que j'ai vu rencontré [Spintronic](http://spintronic.fr/ticket/listbyartist/1). Comme j'adorais sa musique (et j'adore toujours), je l'ai contacté directement pour savoir si je pouvais utiliser sa musique dans le jeu _The Great Paper Adventure_. Il a adoré  l'idée et a même nommé une chanson au nom du jeu ! Donc n'hésitez pas à contacter les artistes qui vous plaisent : les licences CC-BY-NC ne prévalent plus si l'artiste vous donne l'accord d'utiliser ses œuvres.
</md-info>

## Ressources sonores pour le tutoriel

Créez ou trouver un son d'explosion et un son de tir pour le joueur et le poulpi. Si vous êtes fainéants, en voici des tout prêts fait pour le didacticiel :

- [Télécharger le son du tir du joueur][sound_shot_player]
- [Télécharger le son du tir ennemi][sound_shot_enemy]
- [Télécharger le son de l'explosion][sound_explosion]

Nous utiliserons une musique de [Spintronic](http://spintronic.fr/ticket/listbyartist/1) également présente dans _The Great Paper Adventure_ dans notre projet.

- Télécharger [Spintronic - Firecrackers](http://spintronic.fr/song/download/45?format=mp3)

# Importer dans Unity

Copiez les 4 éléments dans le dossier "Sounds".

_Pour chaque fichier_, veillez à désactiver la propriété "3D sound" dans l'_Inspector_. Après tout nous sommes dans un jeu 2D !

[ ![Disabling 3D sound][3dsound]][3dsound]

Et... c'est tout !

# Lecture de la musique

Pour ajouter de la musique au niveau, faites un simple drag'n'drop de la musique dans votre onglet _Hierarchy_. Nous vous recommandons de :

1. Renommer le nouvel objet en "Music".
2. Bien le placer en `(0, 0, 0)`.

[ ![Music object][music]][music]

Localiser la case à cocher "Mute". Vous serez contents de la cocher si vous êtes des tests toute la journée ;).

# Lecture d'effets sonores

Nous pourrions faire la même chose que la musique. Sauf que l'intérêt des effets sonores, c'est d'être déclenchés au bon moment.

Pour cela nous allons utiliser une solution très simple. Comme pour le script pratique "SpecialEffectsHelper", nous allons faire un autre script bien pratique pour créer du son de n'importe où.

Ce nouveau script s'appelle "SoundEffectsHelper":

```csharp
using UnityEngine;
using System.Collections;

/// <summary>
/// Création d'effets sonores en toute simplicité
/// </summary>
public class SoundEffectsHelper : MonoBehaviour
{

  /// <summary>
  /// Singleton
  /// </summary>
  public static SoundEffectsHelper Instance;

  public AudioClip explosionSound;
  public AudioClip playerShotSound;
  public AudioClip enemyShotSound;

  void Awake()
  {
    if (Instance != null)
    {
      Debug.LogError("Multiple instances of SoundEffectsHelper!");
    }
    Instance = this;
  }

  public void MakeExplosionSound()
  {
    MakeSound(explosionSound);
  }

  public void MakePlayerShotSound()
  {
    MakeSound(playerShotSound);
  }

  public void MakeEnemyShotSound()
  {
    MakeSound(enemyShotSound);
  }

  /// <summary>
  /// Lance la lecture d'un son
  /// </summary>
  /// <param name="originalClip"></param>
  private void MakeSound(AudioClip originalClip)
  {
    AudioSource.PlayClipAtPoint(originalClip, transform.position);
  }
}
```

Ajouter ce script à l'objet "Scripts" et remplissez les champs par les bons fichiers sonores :

[ ![Script for sounds][sound_script]][sound_script]

Puis, ajoutez :

1. `SoundEffectsHelper.Instance.MakeExplosionSound();` dans "HealthScript", après l'effet de particule
2. `SoundEffectsHelper.Instance.MakePlayerShotSound();` dans "PlayerScript", juste après `weapon.Attack(false);`.
3. `SoundEffectsHelper.Instance.MakeEnemyShotSound();` dans "EnemyScript", juste après `weapon.Attack(true);`.

Démarrez le jeu et écoutez. On a du son et de la musique !

<md-note>
_Note_ : Cette technique est acceptable pour un petit projet mais si vous avez plusieurs centaines de sons, il vous faudra probablement réfléchir à un autre système.
</md-note>

# Prochaine étape

Nous avons ajouté toute la partie sonore de notre jeu. Question feeling, cela une énorme différence.

Le jeu est une bonne base de _shmup_ . En ajoutant de nouveaux ennemis et peut-être vos propres images, sons, idées... vous dépasserez la petite démo que l'on vous propose.

Nous sommes quand même loin d'un jeu complet, mais nous nous arrêterons là pour l'aspect gameplay.

Nous allons maintenant voir comment faire un petit menu pour charger et recharger le niveau.

[3dsound]: ../../2d-game-unity/sounds/-img/3dsound.png
[music]: ../../2d-game-unity/sounds/-img/music.png
[sound_script]: ../../2d-game-unity/sounds/-img/sound_script.png

[sound_explosion]: ../../2d-game-unity/sounds/-sounds/sound_explosion.wav
[sound_shot_player]: ../../2d-game-unity/sounds/-sounds/sound_shot_player.wav
[sound_shot_enemy]: ../../2d-game-unity/sounds/-sounds/sound_shot_enemy.wav
