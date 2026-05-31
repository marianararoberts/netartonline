const deceptiveWords = ["tracked", "watched", "recorded", "profiled", "mined", "sold"];

const deceptiveTexts = [
  "Your data has always been ours.",
  "We know more than you think.",
  "Nothing is ever deleted.",
  "You agreed to this already.",
  "Convenience costs something.",
  "You are the product."
];

let clicked = false;
let deceptiveIndex = 0;

const container = document.getElementById("container");
const mainText = document.getElementById("main-text");
const subText = document.getElementById("sub-text");
const boxes = document.querySelectorAll(".box");
const instruction = document.getElementById("instruction");

container.addEventListener("click", function() {
  if (clicked === false) {
    clicked = true;
    instruction.style.opacity = "0";

    // switch the classes to change the look
    container.classList.remove("mode-honest");
    container.classList.add("mode-deceptive");

    // change the text content
    mainText.textContent = deceptiveTexts[0];
    subText.textContent = "This page was never what it appeared to be.";

    // loop through each box and update the text
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].textContent = deceptiveWords[i];
    }

    // cycle through the messages every 2 seconds
    setInterval(function() {
      deceptiveIndex = deceptiveIndex + 1;
      if (deceptiveIndex >= deceptiveTexts.length) {
        deceptiveIndex = 0;
        }
      mainText.textContent = deceptiveTexts[deceptiveIndex];
    }, 2000);
  }
});