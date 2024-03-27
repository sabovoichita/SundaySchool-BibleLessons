function randomRotateDivs(divs, angleRange) {
  divs.forEach(function (div) {
    var rotation = Math.floor(Math.random() * (angleRange[1] - angleRange[0] + 1)) + angleRange[0];
    div.style.transform = "rotate(" + rotation + "deg)";
  });
}

// Get all divs with class 'display'
var divs = document.querySelectorAll(".cross");

// Define the angle range for rotation (in degrees)
var angleRange = [-90, 90]; // Adjust as needed

// Rotate the divs randomly within the specified angle range
randomRotateDivs(divs, angleRange);

function addClickEventListenerToDivs(divs, callback) {
  divs.forEach(function (div) {
    div.addEventListener("click", function (event) {
      // Prevent default behavior
      event.preventDefault();
      checkAndAddClassToDivs(event);

      // Execute the callback function with the clicked div as an argument
      callback(div);
    });
  });
}

// Example usage:
var divs = document.querySelectorAll(".cross"); // Select divs by class
addClickEventListenerToDivs(divs, function (div) {
  console.log("Div with class list: " + div.classList + " was clicked!");
});

function checkAndAddClassToDivs(event) {
  console.log("event has class true?", event.target.classList.value.includes("false"));

  if (event.target.classList.value.includes("false")) {
    console.log("true or false?");
    event.target.classList.add("crossClickFalse");
  } else {
    event.target.classList.add("crossClick");
  }
}

function randomDisplayDivs() {
  // Get all div elements
  const divs = document.querySelectorAll(".cross");

  // Create an array to store the indexes of divs
  const indexes = Array.from(Array(divs.length).keys());

  // Shuffle the indexes array
  for (let i = indexes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
  }

  // Set the display style for each div
  indexes.forEach(index => {
    // console.log(divs);
    divs[(1, 3)].style.display = "block";
    // Or any other desired display style
  });
}

// Example usage:
// Call randomDisplayDivs() to randomize the display of divs
// randomDisplayDivs();
