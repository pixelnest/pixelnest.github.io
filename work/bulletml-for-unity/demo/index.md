---
layout: tutorial
title: Demo
subtitle: BulletML for Unity
show_ads: false
show_metadata: false

tutorial:
  show_label: false
  name: BulletML for Unity
  link: ../
---

<script type='text/javascript' src='https://ssl-webplayer.unity3d.com/download_webplayer-3.x/3.0/uo/jquery.min.js'></script>
<script type="text/javascript">
<!--
var unityObjectUrl = "http://webplayer.unity3d.com/download_webplayer-3.x/3.0/uo/UnityObject2.js";
if (document.location.protocol == 'https:')
	unityObjectUrl = unityObjectUrl.replace("http://", "https://ssl-");
document.write('<script type="text\/javascript" src="' + unityObjectUrl + '"><\/script>');
-->
</script>
<script type="text/javascript">
<!--
	var config = {
		width: 640,
		height: 480,
		params: { enableDebugging:"0" }

	};
	var u = new UnityObject2(config);

	jQuery(function() {

		var $missingScreen = jQuery("#unityPlayer").find(".missing");
		var $brokenScreen = jQuery("#unityPlayer").find(".broken");
		$missingScreen.hide();
		$brokenScreen.hide();

		u.observeProgress(function (progress) {
			switch(progress.pluginStatus) {
				case "broken":
					$brokenScreen.find("a").click(function (e) {
						e.stopPropagation();
						e.preventDefault();
						u.installPlugin();
						return false;
					});
					$brokenScreen.show();
				break;
				case "missing":
					$missingScreen.find("a").click(function (e) {
						e.stopPropagation();
						e.preventDefault();
						u.installPlugin();
						return false;
					});
					$missingScreen.show();
				break;
				case "installed":
					$missingScreen.remove();
				break;
				case "first":
				break;
			}
		});
		u.initPlugin(jQuery("#unityPlayer")[0], "demo.unity3d");
	});
-->
</script>

This is a complete preview of what you can achieve with *Bullet for Unity*.

* Use the top buttons to change the current pattern.
* Use the bottom-left button to switch to a concrete boss fight example.

<div class="content">
	<div id="unityPlayer">
		<div class="missing">
			<a href="http://unity3d.com/webplayer/" title="Unity Web Player. Install now!">
				<img alt="Unity Web Player. Install now!" src="http://webplayer.unity3d.com/installation/getunity.png" width="193" height="63" />
			</a>
		</div>
	</div>
</div>
