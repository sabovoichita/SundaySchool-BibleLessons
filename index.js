function $(selector) {
  return document.querySelector(selector);
}

function loadStatements() {
  fetch("statements.json")
    .then(response => response.json())
    .then(statements => {
      printStatements(statements);
    });
}

function printStatements(statements) {
  const statementsMapResult = statements.map(statement => {
    // console.info("inside map %o", statement);
    const cls = statement.class ? (statement.class = "divs") : "";
    return `<div class = "${cls}"> ${statement.statement}</div>`;
  });
  $("#display-statements").innerHTML = statementsMapResult.join("");
}

loadStatements();
