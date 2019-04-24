function changeForm(btn) {
  var panel = document.getElementById("rightPanel");
  var mode = btn.classList.contains('signin')

  var elems = document.querySelectorAll(".btn-connect-navigate");

  [].forEach.call(elems, function (el) {
    el.classList.remove("active");
  });
  if (mode) {
    panel.classList.remove("hover");
    btn.classList.add("active");
  } else {
    panel.classList.add("hover");
    btn.classList.add("active");
  }
}