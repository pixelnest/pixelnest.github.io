---
title: Cloudy Build 1.0.0 &amp; presskit.html 0.12.1
subtitle: New tool and new release
author: Matthieu
---
## Cloudy Build 1.0.0

Last week, we released a small tool called Cloudy Build.

[Try Cloudy Build.](https://cloudy-build.pxn.io/)

We use Unity Cloud Build as our continuous integration pipeline for our Unity projects. This is pretty cool, but the process to install a new build is a bit cumbersome.

Enter **Cloudy Build**: get your API key, save your org name, press the button, and boom, you have your latest builds. Generate the link and download right away.

It doesn't look like much, but this can be super useful on mobile phones to get your latest build and try it ASAP, in a few seconds.

Cloudy Build does not store anything and the code is [open-source](https://github.com/solarsailer/cloudy-build).

## presskit.html 0.12.1

_(From `0.7.0` to `0.12.1`)_

We did a bit of work on [`presskit.html`](https://github.com/pixelnest/presskit.html) recently.

We released `presskit.html` `0.7.0` a month ago, and since then, we added many new features, culminating in `presskit.html` `0.12.1`.

So, what's new?

- Generate thumbnails automagically. This is huge, and can save tons of megabytes.
- Handle image categories. If you wrap some images in a subfolder inside an `images/` folder, a category will be infered from this.
- Show your `<partners>` in the factsheet, or add more information about them with a new `<abouts>` tag.
- You can add a `<download>` link for your video.
- New widget: Game Jolt (PR by [@ruscoe](https://github.com/ruscoe)).
- Finish the documentation of the [product page](http://pixelnest.io/presskit.html/product/).
- Improve the documentation (layout, style, data, examples).
- Refactoring and tweaks to the code.

If you use `presskit.html`, I dearly recommend to update your local installation to take advantage of the new thumbnail generation. A quick `presskit build` and you should be done. 🙏
