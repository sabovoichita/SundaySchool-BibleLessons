var angleRange = [-45, 45]; // Adjust as needed

function $(selector) {
  return document.querySelector(selector);
}

function loadStatements() {
  fetch("Lesson0.json")
    .then(response => response.json())
    .then(statements => {
      displayStatements(statements);
      // simplePrompt();
      createScoreButton();
      createDiferentDomains();
    });
}

function displayStatements(statements) {
  statements.shuffle();
  printStatements(statements);
  var statementsContent = document.querySelectorAll(".statements");
  randomRotateDivs(statementsContent, angleRange);
  addClickListeners();
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

function createScoreButton() {
  const scoreButton = document.createElement("button");
  scoreButton.id = "scoreButton";
  scoreButton.textContent = "Score";
  scoreButton.addEventListener("click", function () {
    const correctScore = document.querySelectorAll(".crossClickFalse").length;
    // const totalScore = document.querySelectorAll(".statements").length;
    const congratMessage = randCongrats();
    const placeholder = "Enter your name";

    const overlay = document.createElement("div");
    overlay.id = "overlay";

    const content = document.createElement("div");
    content.id = "overlay-content";
    content.innerHTML = `
    <form id="custom-prompt">
      <label for="custom-prompt-input">${congratMessage}</label>
      <div class="tbar">Correct Score is: ${correctScore}
        <input type="text" id="custom-prompt-input" placeholder="${placeholder}" required>
        <button type="submit">Close</button>
      </div>
    </form>`;
    overlay.appendChild(content);
    document.body.appendChild(overlay);

    // Close overlay when close button is clicked
    document.getElementById("close-overlay").addEventListener("click", function () {
      document.body.removeChild(overlay);
    });
  });
  $("section").appendChild(scoreButton);
}

function createDiferentDomains() {
  const lessonSelect = document.createElement("select");
  lessonSelect.id = "lessonSelect";
  lessonSelect.innerHTML = `
    <option value="Lesson0">All Lessons</option>
    <optgroup label="Teens">
      <option value="Lesson1">Simeon & Anna</option>
      <option value="Lesson6">The Parable of the Persistent Widow</option>
      <option value="Lesson9">Mary and Martha</option>
    </optgroup>
    <optgroup label="Preteens">
      <option value="Lesson2">Wedding at Cana</option>
      <option value="Lesson4">Fisher of Man</option>
      <option value="Lesson7">Good Samaritan</option>
      <option value="Lesson10">Roman Centurion</option>
    </optgroup>
    <optgroup label="5+">
    <option value="Lesson3">Lost son</option>
    <option value="Lesson5">Sermon on the mount</option>
    <option value="Lesson8">The Lepers</option>
  </optgroup>
  `;
  lessonSelect.addEventListener("change", function () {
    const lesson = this.value;
    fetch(`${lesson}.json`)
      .then(response => response.json())
      .then(statements => {
        displayStatements(statements);
        clearImages();
        const lessonNumber = parseInt(lesson.replace("Lesson", ""));
        if (!isNaN(lessonNumber)) {
          addImagesForLessons(lessonNumber);
        }
        createScoreButton();
      });
  });

  document.body.insertBefore(lessonSelect, document.getElementById("display-statements"));
}
function addImagesForLessons(lessonNumber) {
  const wrapImg1 = document.getElementById("wrapImg1");
  const wrapImg2 = document.getElementById("wrapImg2");

  const img1 = document.createElement("img");
  img1.src = `images/Lesson${lessonNumber}Img1.png`;
  wrapImg1.appendChild(img1);

  const img2 = document.createElement("img");
  img2.src = `images/Lesson${lessonNumber}Img2.png`;
  wrapImg2.appendChild(img2);
}

function clearImages() {
  const wrapImg1 = document.getElementById("wrapImg1");
  const wrapImg2 = document.getElementById("wrapImg2");
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
  var statements = value.split(/\s*\n+\s*/);
  var statementsArray = statements.map(statement => {
    const state = statement.trim().startsWith("T") ? false : true;
    return { content: statement, state: state };
  });
  console.info("statement:", statements, statementsArray);
  displayStatements(statementsArray);
  createScoreButton();
}

function initEvents() {
  $("#textInputs").value = localStorage.getItem("statements");
  $("#textInputs").addEventListener("input", onStatementsUpdate);
}

const calcScrollValue = () => {
  const scrollProgress = document.querySelector(".progress__scroll");
  const pos = document.documentElement.scrollTop;
  const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

  const scrollValue = Math.round((pos * 100) / calcHeight);
  if (pos > 100) {
    scrollProgress.style.display = "flex";
  } else {
    scrollProgress.style.display = "none";
  }

  scrollProgress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });

  scrollProgress.style.background = `conic-gradient(#f0f ${scrollValue}%, #ffffff ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

loadStatements();
initEvents();
