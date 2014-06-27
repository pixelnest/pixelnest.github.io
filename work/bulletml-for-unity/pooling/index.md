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

<script src="https://gist.github.com/Valryon/34bb71f59e694bc4e936.js"></script>

To make sure no bullets are instantiated without pooling, make sure to change the *Script Execution Order* to:

1. BulletManagerScript
2. Your bulletML + pooling script
3. BulletSourceScript

