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

  var divs = document.querySelectorAll(".divs");

  randomRotateDivs(divs, angleRange);
  addClickListeners();
  createScoreButton();
  createDiferentDomains1();
}
function printStatements(statements) {
  const statementsMapResult = statements.map(statement => {
    return `<div class="divs" data-state="${statement.state}">${statement.content}
     <span class="displaySpan">${statement.state}</span></div>`;
  });
  $("#display-statements").innerHTML = statementsMapResult.join("");
}

function addClickListeners() {
  const divs = document.querySelectorAll(".divs");
  divs.forEach(div => {
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

function createScoreButton() {
  // Add button to memorize score for class crossClickFalse
  const scoreButton = document.createElement("button");
  scoreButton.textContent = "Score";
  scoreButton.addEventListener("click", function () {
    const correctScore = document.querySelectorAll(".crossClickFalse").length;
    // const wrongScore = document.querySelectorAll(".croosClick").length;
    // const totalScore = document.querySelectorAll(".divs").length;
    alert(`Score is: correct = ${correctScore} out of  ${correctScore}. Not bad!`);
  });
  $("#display-statements").appendChild(scoreButton);
}

function createDiferentDomains1() {
  const lessonSelect = document.createElement("select");
  lessonSelect.id = "lessonSelect";
  lessonSelect.innerHTML = `
    <option value="all">All Lessons</option>
    <option value="Lesson1">Lesson 1</option>
    <option value="Lesson2">Lesson 2</option>
    <option value="Lesson3">Lesson 3</option>
  `;
  lessonSelect.addEventListener("change", function () {
    const lesson = this.value;
    fetch(`${lesson}.json`)
      .then(response => response.json())
      .then(statements => {
        // console.log(statements);
        displayStatements(statements);
      });
  });
  console.log("here", lessonSelect);

  document.body.insertBefore(lessonSelect, document.getElementById("#lessonSelect"));
}

function randomRotateDivs(divs, angleRange) {
  // console.warn("divs", divs);
  divs.forEach(function (div) {
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

var array = document.querySelectorAll(".cross"); // Select divs by class

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
