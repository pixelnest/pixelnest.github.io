---
layout: tutorial
title: "Documentation: Integration with a pooling system"
subtitle: BulletML for Unity
show_ads: false
show_metadata: false

tutorial:
  show_label: false
  name: BulletML for Unity
  link: ../

links:
  summary: ../table-of-contents
  previous: ../pattern-file
  next: ../support
---

BulletML for Unity does not provide a pooling system as we think there is already enough great pooling plugins on the Asset Store.

However, you can easily hook our plugin with any other.

Here's a simple script skeleton to give you an idea of how you can hook to another pooling plugin, like *Core GameKit*.

````csharp
public class BulletPoolScript : MonoBehaviour
{
	void Start()
	{
		var bulletManager = FindObjectOfType<BulletManagerScript>();
		if (bulletManager != null)
		{
			bulletManager.OnBulletSpawned += OnBulletSpawned;
			bulletManager.OnBulletDestroyed += OnBulletDestroyed;
		}
	}
	
	BulletScript OnBulletSpawned(BulletObject bullet, string bulletName)
	{
		// Get a GameObject from the pool
		// bulletName and bullet can help you identify the bullet you want
		// TODO: Your pool here
		GameObject go = MyPool.Get();

		// Make sure this GameObject has a BulletScript and return it
		// BulletScript can be added on the fly, there is no special parameter to pass

		BulletScript bulletScript = go.GetComponent<BulletScript>();
		if(bulletScript == null) 
		{
			bulletScript = go.AddComponent<BulletScript>();
		}

		return bulletScript;
	}

	void OnBulletDestroyed(GameObject bullet)
	{
		// Recycle your GameObject
		// 1/ If you need the label, you can retrieve it this way
		BulletScript bulletScript = bullet.GetComponent<BulletScript>();
		if (bulletScript != null)
		{
			BulletPool pool = null;
			string bulletName = bulletScript.Bullet.Label.ToLower();

      // TODO: Your pool here
			MyPool.Recycle(bulletScript);
		}
		
		// 2/ Otherwise you have a direct reference to the bullet's GameObject
		// TODO: Your pool here
		MyPool.Recycle(bullet);
	}
}
	
````

To make sure no bullets are instantiated without pooling, make sure to change the *Script Execution Order* to:

1. BulletManagerScript
2. Your bulletML + pooling script
3. BulletSourceScript

