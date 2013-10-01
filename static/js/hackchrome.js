// -----------------------
// Hack for Chrome Windows
// -----------------------

/*
 * Chrome on Windows is doing shit with some Google Webfonts.
 * We tried to add a SVG variant of the custom font for Chrome, which worked.
 * However, it adds a nasty bug that breaks the layout, making the text unreadable.
 * We'd rather have a basic and without flavour font that an unreadable one.
 */

// It is ugly, it is bad. But Chrome on Windows forces us to do that...
// Remove the custom font and use serif instead. To remove when Chrome will be fixed.
if (navigator.platform === 'Win32' && navigator.userAgent.indexOf('Chrome/') !== -1) {
  document.body.style.fontFamily = 'Georgia, serif';
}
