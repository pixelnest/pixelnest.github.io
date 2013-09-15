run:
	@jekyll serve --watch &
	@scss _sources/:static/css/ -w
