# ![Pixelnest Studio](static/images/logo/logo_github.png)

Games crafter since 2014.

[pixelnest.io](https://pixelnest.io)

## Publish a post

Create a new file in the `_posts` folder, and use a correct filename (`YYYY-MM-DD-name-of-slug.md`). Commit, push. That's all.

You can also use the online admin. Go to the [admin](https://pixelnest.io/admin/).

## Update or create a page

Create the page. Commit, push. That's all.

## Local server

Requires Ruby and Bundler.

```
bundle install
npm run serve
```

The site runs on [localhost:4000](http://localhost:4000) and reloads automatically on changes.

## Update CSS

All styles live in a single plain CSS file: `static/css/main.css`. Edit it directly, there is no build step. Colors and fonts are CSS custom properties defined in `:root` at the top of the file.

## Update the presskit

Run:

```
npm run presskit
```

It will update the presskit to its latest version. Warning: this script also commits the changes automatically (but only those concerning the presskit, obviously).
