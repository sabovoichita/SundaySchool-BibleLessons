document.querySelector("#div1").addEventListener("click", e => {
  e.target.classList.add("crossClick");
});

document.querySelector("#div2").addEventListener("click", e => {
  e.target.classList.add("crossClick");
});
document.querySelector("#div3").addEventListener("click", e => {
  e.target.classList.add("crossClick");
});
document.querySelector("#div4").addEventListener("click", e => {
  e.target.classList.add("crossClick");
});
document.querySelector("#div5").addEventListener("click", e => {
  e.target.classList.add("crossClick");
});
document.querySelector("#div6").addEventListener("click", e => {
  e.target.classList.add("crossClick");
});
document.querySelector("#div7").addEventListener("click", e => {
  e.target.classList.add("crossClick");
});

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
    divs[index].style.display = "block";
    // Or any other desired display style
  });
}

// Example usage:
// Call randomDisplayDivs() to randomize the display of divs
// randomDisplayDivs();

function randomRotateDivs(divs, angleRange) {
  divs.forEach(function (div) {
    var rotation = Math.floor(Math.random() * (angleRange[1] - angleRange[0] + 1)) + angleRange[0];
    div.style.transform = "rotate(" + rotation + "deg)";
  });
}

// Get all divs with class 'rotate-div'
var divs = document.querySelectorAll(".cross");

// Define the angle range for rotation (in degrees)
var angleRange = [-25, 65]; // Adjust as needed

// Rotate the divs randomly within the specified angle range
randomRotateDivs(divs, angleRange);
