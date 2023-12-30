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
const weight = document.getElementById("weight");
const feet = document.getElementById("feet");
const inches = document.getElementById("inches");
const stone = document.getElementById("stone");
const lbs = document.getElementById("lbs");
const resultNmb = document.querySelector(".results__text--number");
const form = document.querySelector(".input-form");
const radioBtns = document.querySelectorAll("input[type=radio]");
const resultsContainer = document.querySelector(".results");
const section1 = document.querySelector(".hero");
const cookieBtn = document.querySelector(".cookie--btn");

// selecting the radio button

radioBtns.forEach((radioBtn) =>
  radioBtn.addEventListener("click", function (e) {
    if (e.target.id === "metric") {
      metricForm.classList.remove("hidden");
      imperialForm.classList.add("hidden");
      document.querySelector(".input_metric").classList.remove("hidden");
    } else if (e.target.id === "imperial") {
      imperialForm.classList.remove("hidden");
      metricForm.classList.add("hidden");
    }
  })
);
//Submitting the form
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  if (metric.checked) {
    //checking if all the fields have values
    if (data.height === "" || data.weight === "") {
      return alert("Please fill out all the input fields");
    } else {
      data.height = +data.height;
      data.weight = +data.weight;
      data.BMI = data.weight / (data.height / 100) ** 2;
    }
  } else if (imperial.checked) {
    //checking if all the fields have values
    if (
      data.feet === "" ||
      data.inches === "" ||
      data.lbs === "" ||
      data.stone === ""
    ) {
      return alert("Please fill out all the input fields");
    } else {
      data.height = +data.feet * 30.48 + +data.inches * 2.54;
      data.weight = +data.stone * 6.35 + +data.lbs * 0.45;
      data.BMI = data.weight / (data.height / 100) ** 2;
    }
  }

  data.minimumRange = 18.5 * (data.height / 100) ** 2;
  data.maximumRange = 24.9 * (data.height / 100) ** 2;

  // calling the functions immediately the submit event is triggered
  renderBMI(data);
  findRange(data);
  findNormalBMIRange(data);
  clearInputs();

  console.log(data);
});

//rendering the results of the calculation
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

// Rendering the range with color

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

//rendering/displaying the adviced health weights
function findNormalBMIRange(data) {
  minimum.innerHTML = `${Math.round(data.minimumRange)}`;
  maximum.innerHTML = `${Math.round(data.maximumRange)}`;
}

//clearing the input
function clearInputs() {
  document.getElementById("height").value = "";
  document.getElementById("weight").value = "";
  document.getElementById("inches").value = "";
  document.getElementById("feet").value = "";
  document.getElementById("lbs").value = "";
  document.getElementById("stone").value = "";
  setTimeout(() => {
    container.style.background = "#345ff6";
    //Replacing the text after the results are revealed
  }, 4000);
}
lbs.addEventListener("input", function (e) {
  document.getElementById("btn-imperial").style.background = "rgb(39, 145, 7)";
});
weight.addEventListener("input", function (e) {
  document.getElementById("btn-metric").style.background = "rgb(39, 145, 7)";
});
//adding the cookie message dynamically
const message = document.createElement("div");
message.setAttribute("class", "cookie");
message.innerHTML =
  '<h5>We collect cookies</h5><p>Cookies help us deliver the best experience on our website. By using our website, you agree to the use of cookies. <a href="https://en.wikipedia.org/wiki/HTTP_cookie" target="_blank">Find out how we use cookies.</a></p><button class="cookie--btn">ACCEPT</button>';
message.style.color = section1.append(message);

//removing the cookie message
section1.addEventListener("click", function (e) {
  const click = e.target.closest(".cookie--btn");
  if (!click) return;
  //message.setAttribute("class", "hidden");
  message.remove();
});
