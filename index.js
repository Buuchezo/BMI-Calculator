const metric = document.getElementById("metric");
const imperial = document.getElementById("imperial");
const input = document.querySelector(".input");

metric.checked = true;
input.addEventListener("click", function (e) {
  console.log(e);
});
