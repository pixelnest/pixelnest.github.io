---
title: "Announcing presskit.html"
subtitle: "Re-implementation of presskit() as a static site generator"
---

[presskit()][dopresskit] has successfully become a videogame industry standard for press kits[^standard]. It was created by [Rami Ismail](https://twitter.com/tha_rami) of [Vlambeer](http://www.vlambeer.com), along with [some other fine people](http://www.vlambeer.com/press/sheet.php?p=credits).

presskit() is great: the format that it provides is clear, well-known and practical. That's why [we use it at Pixelnest](/presskit/).

However, presskit() didn't match our development process and technology stack, so we had to hack our a way around its PHP-based codebase. Moreover, like many people nowadays, we grew fond of static site generator like [Jekyll](https://jekyllrb.com/), [Hugo](https://gohugo.io/) or [Gatsby](https://github.com/gatsbyjs/gatsby). Simple HTML pages are more **efficient**, **robust** and **simple** for many cases… like a press kit!

So, deep down, we knew that we had to re-implement it for people who use static site generator, like we do.

Moreover, presskit() development has staled since 2014. It's not a problem: it's an open source project and people can get and change the code as they like. But we didn't want to invest time in a PHP project that didn't fit us. So instead, we decided to re-implement presskit() the way we prefered: as a static site generator.

So please, welcome **[presskit.html][presskithtml]**, our static site generator for presskit(), with a permissive [MIT](https://choosealicense.com/licenses/mit/) license. 🤘

{::nomarkdown}
  <a href="https://github.com/pixelnest/presskit.html"
     class="intent-button intent-button--small intent-button--services intent-button--spacer">
    Go to
    <strong>presskit.html</strong>
  </a>
{:/}

And [read the quickstart][quickstart] for existing presskit() users. 😉

---

There's a complete documentation and introduction to the project on the [GitHub page][presskithtml]. It's available through [npm](https://www.npmjs.com/package/presskit).

**A fair bit of warning: it's still a beta and can/will have bugs.** However, it's completely capable of re-creating an existing presskit() ([see ours](/presskit/) or the [example](https://pixelnest.io/presskit.html/example/)). We have some small additions to make before considering it an 1.0.0 project, including a visual application for non-developers. _As it stands today, the project requires some basic command-line knowledge, which might restrict non-technical users._

**So, ready? Go check [presskit.html][presskithtml]!**


[^standard]: Well, kind of, at least. Still, if you check most of your favorite indie games, you can find a [presskit()][dopresskit] on their sites.


[presskithtml]: https://github.com/pixelnest/presskit.html
[dopresskit]: http://dopresskit.com
[quickstart]: https://github.com/pixelnest/presskit.html#user-content-quickstart-for-existing-presskit-users
