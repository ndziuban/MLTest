$(document).ready(function() {
  var kvp = document.location.search.substr(1).split('&');

  kvp.forEach(function (value, key) {
    if (value.split('=')[0] == "search") {
      val = value.split('=')[1].split("+").join(" ");
      $('#search-input').val(val);
    }
  });
})
