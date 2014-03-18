---
layout: tutorial
title: Writing BulletML
subtitle: BulletML for Unity
show_ads: false
show_metadata: false

tutorial:
  show_label: false
  name: BulletML for Unity
  link: ../

links:
  summary: ../table-of-contents
  previous: ../how-to-use
  next: ../customization
---

So you tried our examples, maybe picked some new ones, but you don't know how to write your own BulletML file.

Fortunately, that's what we will cover in this section.
We suppose you know the basics of [XML](http://stackoverflow.com/tags/xml/info).

For a complete reference about the language, have a look at:

- [the BulletML reference](http://www.asahi-net.or.jp/~cs8k-cyu/bulletml/bulletml_ref_e.html)
- [the dmanning23's BUlletMLLib wiki](https://github.com/dmanning23/BulletMLLib/wiki)

# Minimum BulletML file

The smallest valid BulletML file looks like the following one:

```xml
<?xml version="1.0" ?>
<bulletml type="vertical" xmlns="http://www.asahi-net.or.jp/~cs8k-cyu/bulletml">
  <action label="top">
  </action>
</bulletml>
```

The language is well documented and even has a [DTD (Document Type Definition)](http://www.w3schools.com/dtd/) file, ``bulletml.dtd``, which as bundled in our package.

```xml
<?xml version="1.0" ?>
<!DOCTYPE bulletml SYSTEM "bulletml.dtd">
<bulletml type="vertical" xmlns="http://www.asahi-net.or.jp/~cs8k-cyu/bulletml">
  <action label="top">
  </action>
</bulletml>
```

We can take advantage of this file to make sure we are writing a valid definition.
All you need to do is to add ``DOCTYPE`` tag with a path the file (here, ./bulletml.dtd).

<md-note>
_Note_: Some developer tools, like Visual Studio, will take profit of the DTD file to update their auto-completion list.
This way, the editor will always suggests you a valid tag, attribute or value at a given location.
This is a great help and you should see if you can enable that feature in your favorite XML editor.
</md-note>

This pattern does... nothing, but it is valid.

1. ``<bulletml>`` is the **root** tag.
Like <html> for a webpage, you should have *one and only one* as the top tag of your file.

The ``type`` attribute define your shooter orientation:
  * ``horizontal`` like R-Type
  * ``vertical``like Ikaruga.

The BulletML engine **does not** use this information, you may set it only for you game and level designers.

2. ``<!DOCTYPE>`` is a meta for your XML editor and parser to enable validation with a DTD

3. ``<action label="top">`` The entry point of your pattern. We will see the ``action`` tag in the next paragraph.
