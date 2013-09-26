var menu = document.getElementById('quicknavbar');

// On change, get the current item and if the value
// contains a path, use it to set a new location.
menu.onchange = function () {
  var value = this.item(this.selectedIndex).value;
  if (value && -1 !== value.indexOf('/')) {
    window.location = value;
  }
};
