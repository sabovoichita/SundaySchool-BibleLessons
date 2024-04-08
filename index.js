var angleRange = [-25, 25]; // Adjust as needed

function $(selector) {
  return document.querySelector(selector);
}

function loadStatements() {
  fetch("statements.json")
    .then(response => response.json())
    .then(statements => {
      displayStatements(statements);
    });
}

function displayStatements(statements) {
  statements.shuffle();
  printStatements(statements);

  var statementsContent = document.querySelectorAll(".statements");

  randomRotateDivs(statementsContent, angleRange);
  addClickListeners();
  createScoreButton();
  createDiferentDomains1();
}
function printStatements(statements) {
  const statementsMapResult = statements.map(statement => {
    return `<div class="statements" data-state="${statement.state}">${statement.content}
     <span class="displaySpan">${statement.state}</span></div>`;
  });
  $("#display-statements").innerHTML = statementsMapResult.join("");
}

function addClickListeners() {
  const statementsContent = document.querySelectorAll(".statements");
  statementsContent.forEach(div => {
    div.addEventListener("click", function () {
      const state = div.getAttribute("data-state");
      if (state === "true") {
        div.classList.add("crossClick");
        div.classList.remove("crossClickFalse"); // Remove false class if exists
      } else {
        div.classList.add("crossClickFalse");
        div.classList.remove("crossClick"); // Remove true class if exists
      }
    });
  });
}

function randCongrats() {
  var congrat = [
    "Awesome!",
    "Good job!",
    "Knew you could do it!",
    "Sweet!",
    "You got this!",
    "Again! Again!",
    "Keep it up!",
    "Keep going!",
    "Easy, right?"
  ];
  var congrats = Math.floor(Math.random() * congrat.length);
  return congrat[congrats];
}
//modify function as it doesnt appear when I change to lesson nb2
function createScoreButton() {
  // Add button to memorize score for class crossClickFalse
  const scoreButton = document.createElement("button");
  scoreButton.textContent = "Score";
  scoreButton.addEventListener("click", function () {
    const correctScore = document.querySelectorAll(".crossClickFalse").length;
    // const wrongScore = document.querySelectorAll(".croosClick").length;
    const totalScore = document.querySelectorAll(".statements").length;
    const congratMessage = randCongrats();

    alert(`Score is: correct = ${correctScore} out of  ${totalScore} . ${congratMessage} `);
  });
  $("header").appendChild(scoreButton);
}

function createDiferentDomains1() {
  const lessonSelect = document.createElement("select");
  lessonSelect.id = "lessonSelect";
  lessonSelect.innerHTML = `
    <option value="all">All Lessons</option>
    <option value="Lesson1">Lesson 1</option>
    <option value="The Wedding at Cana">The Wedding at Cana</option>
    <option value="Lesson3">Lesson 3</option>
  `;
  lessonSelect.addEventListener("change", function () {
    const lesson = this.value;
    fetch(`${lesson}.json`)
      .then(response => response.json())
      .then(statements => {
        printStatements(statements);
        if (lesson === "The Wedding at Cana") {
          addImagesForCana();
        } else {
          clearImagesForCana();
        }
      });
  });
  console.log("here", lessonSelect);

  document.body.insertBefore(lessonSelect, document.getElementById("#lessonSelect"));
}

function addImagesForCana() {
  const wrapImg1 = document.getElementById("wrapImg1");
  const wrapImg2 = document.getElementById("wrapImg2");

  // Create img elements for Cana1.png and Cana2.png
  const img1 = document.createElement("img");
  img1.src = "images/Cana1.png";
  wrapImg1.appendChild(img1);

  const img2 = document.createElement("img");
  img2.src = "images/Cana2.png";
  wrapImg2.appendChild(img2);
}

function clearImagesForCana() {
  const wrapImg1 = document.getElementById("wrapImg1");
  const wrapImg2 = document.getElementById("wrapImg2");

  // Remove all child elements from wrapSimon and wrapAna
  wrapImg1.innerHTML = "";
  wrapImg2.innerHTML = "";
}

function randomRotateDivs(statementsContent, angleRange) {
  // console.warn("divs", divs);
  statementsContent.forEach(function (div) {
    var rotation = Math.floor(Math.random() * (angleRange[1] - angleRange[0] + 1)) + angleRange[0];
    div.style.transform = "rotate(" + rotation + "deg)";
  });
}

Array.prototype.shuffle = function () {
  var i = this.length,
    j,
    temp;
  if (i == 0) return this;
  while (--i) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }
  return this;
};

var array = document.querySelectorAll(".statements"); // Select statementsContent by class statements

function onStatementsUpdate(e) {
  var value = e.target.value.trim();
  localStorage.setItem("statements", value);
  var statements = value.split("\n");
  var statementsArray = statements.map(statement => {
    return { content: statement, state: true };
  });
  console.info("statement:", statements, statementsArray);
  displayStatements(statementsArray);
}

function initEvents() {
  $("#textInputs").value = localStorage.getItem("statements");
  $("#textInputs").addEventListener("input", onStatementsUpdate);
}

loadStatements();
initEvents();
