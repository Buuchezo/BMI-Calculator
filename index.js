"use strict";
const metric = document.getElementById("metric");
const imperial = document.getElementById("imperial");
const metricForm = document.querySelector(".metric");
const imperialForm = document.querySelector(".imperial");
const resultContainer = document.querySelector(".results__items1");
const replaceText = document.querySelector(".range");
const minimum = document.querySelector(".minimum--range");
const maximum = document.querySelector(".maximum--range");
const container = document.querySelector(".results");
const height = document.getElementById("height");
const resultNmb = document.querySelector(".results__text--number");

metric.checked = true;

metric.addEventListener("click", function (e) {
  metricForm.classList.remove("hidden");
  imperialForm.classList.add("hidden");
});
imperial.addEventListener("click", function (e) {
  imperialForm.classList.remove("hidden");
  metricForm.classList.add("hidden");
});

const form = document.querySelector(".input-form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  if (metric.checked) {
    data.height = +data.height;
    data.weight = +data.weight;
    data.BMI = data.weight / (data.height / 100) ** 2;
  }
  if (imperial.checked) {
    data.height = +data.feet * 12 + +data.inches;
    data.weight = +data.stone * 14 + +data.lbs;
    data.BMI = data.weight / (data.height / 100) ** 2;
  }
  data.minimumRange = 18.5 * (data.height / 100) ** 2;
  data.maximumRange = 24.9 * (data.height / 100) ** 2;
  renderBMI(data);
  findRange(data);
  findNormalBMIRange(data);
  clearInputs();
  console.log(data);
});

function renderBMI(data) {
  resultContainer.innerHTML = "";
  const html = `
                     <span class="result__items1">
                     <p class="results__heading">Your BMI is..</p>
                     <p class="results__text results__text--number"><strong>${Math.round(
                       data.BMI
                     )}</strong></p>  `;
  resultContainer.insertAdjacentHTML("afterbegin", html);
}

function findRange(data) {
  replaceText.innerHTML = "";
  if (data.BMI <= 18.5) {
    replaceText.innerHTML = "you are <strong>underweight</strong>";
    container.style.background =
      "linear-gradient(to right, hsl(217, 91%, 57%),hsl(186, 85%, 63%) )";
  } else if (data.BMI > 18.5 && data.BMI <= 24.9) {
    replaceText.innerHTML =
      "You fall within the <strong>average</strong> range";
    container.style.background =
      "linear-gradient(to right, hsl(131, 91%, 57%),hsl(95, 85%, 63%) )";
  } else if (data.BMI > 24.9 && data.BMI <= 30) {
    replaceText.innerHTML = "You are <strong>overweight</strong>";
    container.style.background =
      "linear-gradient(to right, hsl(43, 91%, 57%),hsl(52, 85%, 63%) )";
  } else if (data.BMI > 30) {
    replaceText.innerHTML = "You are <strong>obese</strong>";
    container.style.background =
      "linear-gradient(to right, hsl(6, 91%, 57%),hsl(11, 94%, 66%) )";
  } else return "";
}

function findNormalBMIRange(data) {
  minimum.innerHTML = `${Math.round(data.minimumRange)}`;
  maximum.innerHTML = `${Math.round(data.maximumRange)}`;
}

function clearInputs() {
  document.getElementById("height").value = "";
  document.getElementById("weight").value = "";
  document.getElementById("inches").value = "";
  document.getElementById("feet").value = "";
  document.getElementById("lbs").value = "";
  document.getElementById("stone").value = "";
  setTimeout(() => {
    container.style.background = "#345ff6";
  }, 4000);
}

height.addEventListener("change", (e) => {
  e.preventDefault();
  resultNmb.innerHTML = "";
});
