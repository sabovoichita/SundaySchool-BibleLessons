function $(selector) {
  return document.querySelector(selector);
}

function loadStatements() {
  fetch("statements.json")
    .then(response => response.json())
    .then(statements => {
      printStatements(statements);
      addClickListeners(statements);
    });
}

function printStatements(statements) {
  const statementsMapResult = statements.map(statement => {
    return `<div class="${statement.class}" data-state="${statement.state}">${statement.content}
     <span class="displaySpan">${statement.state}</span></div>`;
  });
  $("#display-statements").innerHTML = statementsMapResult.join("");
}

function addClickListeners(statements) {
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

  // Add button to memorize score for class crossClickFalse
  const scoreButton = document.createElement("button");
  scoreButton.textContent = "Score";
  scoreButton.addEventListener("click", function () {
    const correctScore = document.querySelectorAll(".crossClickFalse").length;
    // const wrongScore = document.querySelectorAll(".croosClick").length;
    const totalScore = document.querySelectorAll(".divs").length;
    alert(`Score is: correct = ${correctScore} out of  ${totalScore}. Not bad!`);
  });
  $("#display-statements").appendChild(scoreButton);
}

// Call loadStatements function to load and print statements, and add click listeners
loadStatements();
