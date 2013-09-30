run:
	@jekyll serve --future --watch &
	@scss _sources/pixelnest.scss:static/css/pixelnest.css -w
