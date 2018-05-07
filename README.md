# ![Pixelnest Studio](static/images/logo/logo_github.png)

We craft games and apps.

[pixelnest.io](https://pixelnest.io)

## Publish a post

Create a new file in the `_posts` folder, and use a correct filename (`YYYY-MM-DD-name-of-slug.md`). Commit, push. That's all.

You can also use the online admin. Go to the [admin](https://pixelnest.io/admin/).

## Update or create a page

Create the page. Commit, push. That's all.

## Update JS and CSS

Add some changes. When it's done, run:

```
yarn build
```

You will likely see some diff for `bundle.css`, `bundle.css.map`, `bundle.js`, `bundle.js.map`.

Commit those and push.

NB: this is a manual process because of the current build pipeline with Webpack. When you change the styles and scripts, you **need** to publish the modifications yourself. Indeed, the assets are not handled by Jekyll, so a Github Pages rebuild will not affect them.

## Update the presskit

Run:

```
yarn run presskit
```

It will update the presskit to its latest version. Warning: this script also commits the changes automatically (but only those concerning the presskit, obviously).
