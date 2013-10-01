// -----------------------
// Hack for Chrome Windows
// -----------------------

/*
 * Chrome on Windows is doing shit with some Google Webfonts.
 * In order to render the font properly, we use a local one in SVG.
 * Then, in JavaScript, we change the family to use this one in Chrome Windows.
 */

// It is ugly, it is bad. But Chrome on Windows forces me to do that...
// And I don't want to make the other browsers use the (automatically) converted font.
if (navigator.platform === 'Win32' && navigator.userAgent.indexOf('Chrome/') !== -1) {
  // Change font
  document.body.style.fontFamily = 'Chropoly, serif';

  // Remove the bug in the quicknavbar
  document.getElementById('quicknavbar').style.fontFamily = 'serif';
}
