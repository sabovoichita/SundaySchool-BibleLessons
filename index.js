var angleRange = [-15, 15];

function $(selector) {
  return document.querySelector(selector);
}

function loadStatements() {
  fetch("lessons/0.json")
    .then(response => response.json())
    .then(statements => {
      displayStatements(statements);
      createScoreButton();
      createDifferentDomains();
      createShuffleButton();
    });
}

function displayStatements(statements) {
  statements.shuffle();
  const statementsContainer = $("#display-statements");
  const fragment = document.createDocumentFragment();
  statements.forEach(statement => {
    const div = createStatementDiv(statement.content, statement.state);
    fragment.appendChild(div);
  });
  statementsContainer.innerHTML = ""; // Clear existing content
  statementsContainer.appendChild(fragment);
  const statementsContent = document.querySelectorAll(".statements");
  randomRotateDivs(statementsContent, angleRange);
  addClickListeners();
}

function createStatementDiv(content, state) {
  const div = document.createElement("div");
  div.className = "statements";
  div.setAttribute("data-state", state);
  div.innerHTML = `${content}<span class="displaySpan">${state}</span>`;
  return div;
}

function addClickListeners() {
  const statementsContent = document.querySelectorAll(".statements");
  statementsContent.forEach(div => {
    div.addEventListener("click", function () {
      const state = div.getAttribute("data-state");
      div.classList.toggle(state === "true" ? "crossClick" : "crossClickFalse");
    });
  });
}

function randCongrats() {
  const congrat = [
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
  return congrat[Math.floor(Math.random() * congrat.length)];
}

function createScoreButton() {
  const scoreButton = document.createElement("button");
  scoreButton.id = "scoreButton";
  scoreButton.textContent = "Score";
  scoreButton.addEventListener("click", function () {
    const correctScore = document.querySelectorAll(".crossClickFalse").length;
    const congratMessage = randCongrats();
    const placeholder = "Enter your name";
    const overlay = createOverlay(congratMessage, correctScore, placeholder);
    document.body.appendChild(overlay);
  });
  $("footer").appendChild(scoreButton);
}

function createOverlay(congratMessage, correctScore, placeholder) {
  const overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.innerHTML = `
    <div id="overlay-content">
      <form id="custom-prompt">
        <label>${congratMessage}</label>
        <div class="tbar">Correct Score is: ${correctScore}
          <input type="text" id="custom-prompt-input" placeholder="${placeholder}" required>
          <button type="button" id="close-overlay">Close</button>
        </div>
      </form>
    </div>`;
  overlay.querySelector("#close-overlay").addEventListener("click", function () {
    document.body.removeChild(overlay);
  });
  return overlay;
}

function createDifferentDomains() {
  const lessonSelect = document.createElement("select");
  lessonSelect.id = "lessonSelect";
  lessonSelect.innerHTML = `
    <option value="0">All lessons</option>
    <optgroup label="Teens">
      <option value="1">Simeon & Anna</option>
      <option value="6">The Parable of the Persistent Widow</option>
      <option value="9">Mary and Martha</option>
    </optgroup>
    <optgroup label="Preteens">
      <option value="2">Wedding at Cana</option>
      <option value="4">Fisher of Man</option>
      <option value="7">Good Samaritan</option>
      <option value="10">Roman Centurion</option>
    </optgroup>
    <optgroup label="5+">
      <option value="3">Lost son</option>
      <option value="5">Sermon on the mount</option>
      <option value="8">The Lepers</option>
    </optgroup>`;
  lessonSelect.addEventListener("change", function () {
    const lesson = this.value;
    fetch(`lessons/${lesson}.json`)
      .then(response => response.json())
      .then(statements => {
        displayStatements(statements);
        clearImages();
        const lessonNumber = parseInt(lesson.replace("lesson", ""));
        if (!isNaN(lessonNumber)) {
          addImagesForLessons(lessonNumber);
        }
      });
  });
  document.body.insertBefore(lessonSelect, $("#display-statements"));
}

function addImagesForLessons(lessonNumber) {
  const wrapImg1 = $("#wrapImg1");
  const wrapImg2 = $("#wrapImg2");

  const img1 = document.createElement("img");
  img1.src = `images/${lessonNumber}-1.png`;
  wrapImg1.appendChild(img1);

  const img2 = document.createElement("img");
  img2.src = `images/${lessonNumber}-2.png`;
  wrapImg2.appendChild(img2);
}

function clearImages() {
  $("#wrapImg1").innerHTML = "";
  $("#wrapImg2").innerHTML = "";
}

function randomRotateDivs(statementsContent, angleRange) {
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

function onStatementsUpdate(e) {
  var value = e.target.value.trim();
  localStorage.setItem("statements", value);
  var statements = value.split(/\s*\n+\s*/);
  var statementsArray = statements.map(statement => {
    const state = statement.trim().startsWith("T") ? false : true;
    return { content: statement, state: state };
  });
  displayStatements(statementsArray);
}

function initEvents() {
  $("#textInputs").value = localStorage.getItem("statements");
  $("#textInputs").addEventListener("input", onStatementsUpdate);
}

// Step 1: Create the shuffle button element
function createShuffleButton() {
  const shuffleButton = document.createElement("button");
  shuffleButton.id = "shuffleButton";
  shuffleButton.textContent = "Shuffle";
  shuffleButton.addEventListener("click", shuffleStatements);
  document.querySelector("footer").appendChild(shuffleButton);
}

function shuffleStatements() {
  const statements = document.querySelectorAll(".statements");
  const statementsArray = Array.from(statements);
  statementsArray.shuffle();
  const displayStatementsContainer = document.getElementById("display-statements");
  displayStatementsContainer.innerHTML = "";
  statementsArray.forEach(statement => {
    displayStatementsContainer.appendChild(statement);
  });
}

const calcScrollValue = () => {
  const scrollProgress = $(".progress__scroll");
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
window.onload = function () {
  calcScrollValue();
  initEvents();
  loadStatements();
};
