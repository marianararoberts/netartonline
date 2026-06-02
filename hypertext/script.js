const intro = document.getElementById("intro");
const topSection = document.getElementById("top-section");
const story = document.getElementById("story");
const progressBar = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const resourceText = document.getElementById("resources");
const startButton = document.getElementById("start-button");

const scenes = {
  origin: {
    progress: 0,
    resources: "Undetermined",
    title: "",
    choices: [
      { label: "Born into Wealth", next: "wealthyChildhood" },
      { label: "Born into Poverty", next: "poorChildhood" },
    ],
  },
  wealthyChildhood: {
    path: "wealthy",
    progress: 15,
    resources: "Abundant",
    title: "Childhood",
    text:
      "Your room has books, games, and a laptop that belongs to you. When homework gets confusing, someone can hire a tutor. When you get curious about a new hobby, lessons are possible.",
    choices: [
      { label: "Focus on school", next: "wealthyMiddleSchool" },
      { label: "Try a new activity", next: "wealthyMiddleSchool" },
    ],
  },
  wealthyMiddleSchool: {
    progress: 30,
    title: "Middle School",
    text:
      "Your calendar fills before you notice. Camps, clubs, teams, and weekend classes are all within reach. You still have to choose, practice, and show up, but the door is already open.",
    choices: [
      { label: "Join the travel team", next: "wealthyHighSchool" },
      { label: "Take music seriously", next: "wealthyHighSchool" },
    ],
  },
  wealthyHighSchool: {
    progress: 50,
    title: "High School",
    text:
      "A counselor knows your name and helps you plan. Test prep raises your score. A family friend hears you need an internship and forwards your name before applications even close.",
    choices: [
      { label: "Build the resume", next: "wealthySetback" },
      { label: "Slow down for a while", next: "wealthySetback" },
    ],
  },
  wealthySetback: {
    progress: 70,
    title: "Setback",
    text:
      "You freeze during an interview and leave knowing it went badly. It stings. Then your parents make a few calls, and another chance appears before the first rejection has time to settle.",
    choices: [{ label: "Take the next interview", next: "wealthyCollege" }],
  },
  wealthyCollege: {
    progress: 85,
    title: "College",
    text:
      "You get into a selective school. The price is enormous, but your family can help carry it. By senior year, your internships are quietly turning into job offers.",
    choices: [
      { label: "Accept the offer", next: "wealthyEndingOne" },
      { label: "Try starting something", next: "wealthyEndingTwo" },
    ],
  },
  wealthyEndingOne: {
    progress: 100,
    title: "Ending: Fast Track",
    text:
      "You graduate with almost no debt and start a job that pays well. You worked hard. You also had room to make mistakes without each mistake becoming a disaster.",
    choices: [{ label: "Start over", next: "intro" }],
  },
  wealthyEndingTwo: {
    progress: 100,
    title: "Ending: Room To Risk",
    text:
      "Your first idea fails. The next one does too. It hurts, but it does not wipe you out. Eventually, one works, helped by the fact that failure was expensive but survivable.",
    choices: [{ label: "Start over", next: "intro" }],
  },
  poorChildhood: {
    path: "poor",
    progress: 15,
    resources: "Limited",
    title: "Childhood",
    text:
      "Money is already tight. You share supplies, stretch old things, and learn which requests are too expensive to say out loud. Plenty of activities exist, but most of them come with a fee.",
    choices: [
      { label: "Keep up in class", next: "poorMiddleSchool" },
      { label: "Help out at home", next: "poorMiddleSchool" },
    ],
  },
  poorMiddleSchool: {
    progress: 30,
    title: "Middle School",
    text:
      "Math starts moving faster than you can follow. Your teacher wants to help, but the room is packed. Tutoring exists somewhere nearby, just not in a way your family can easily reach.",
    choices: [
      { label: "Study after school", next: "poorHighSchool" },
      { label: "Look for small jobs", next: "poorHighSchool" },
    ],
  },
  poorHighSchool: {
    progress: 50,
    title: "High School",
    text:
      "Your grades matter, and so do the bills. Some classmates have quiet rooms, private tutors, and adults who can edit every essay. You do homework wherever there is space.",
    choices: [
      { label: "Guard your study time", next: "poorFriends" },
      { label: "Work extra hours", next: "poorFriends" },
    ],
  },
  poorFriends: {
    progress: 70,
    title: "Pressure",
    text:
      "Older kids in the neighborhood ask you to come around more. A few have already stopped going to school. With grades, money, and home all pressing in, doing anything else starts to feel like relief.",
    choices: [
      { label: "Keep school first", next: "poorSetback" },
      { label: "Spend more time out", next: "poorSetback" },
    ],
  },
  poorSetback: {
    progress: 85,
    title: "Setback",
    text:
      "Rent goes up. Your family starts cutting things that already felt bare. School still matters, but survival takes over the room.",
    choices: [
      { label: "Push toward college", next: "poorEndingOne" },
      { label: "Work full time", next: "poorEndingTwo" },
    ],
  },
  poorEndingOne: {
    progress: 100,
    title: "Ending: Hard Win",
    text:
      "You make it through college with loans, shifts, and missed sleep. You earned the win. It also cost more than it should have.",
    choices: [{ label: "Start over", next: "intro" }],
  },
  poorEndingTwo: {
    progress: 100,
    title: "Ending: Bills Paid",
    text:
      "You start working full time. The bills get paid, and life keeps moving. Sometimes you think about the routes that closed before you were old enough to choose them.",
    choices: [{ label: "Start over", next: "intro" }],
  },
};

function setPath(path) {
  document.body.classList.toggle("wealthy", path === "wealthy");
  document.body.classList.toggle("poor", path === "poor");
}

function showIntro() {
  setPath();
  intro.hidden = false;
  topSection.hidden = true;
  story.hidden = true;
  progressBar.style.width = "0%";
  progressContainer.setAttribute("aria-valuenow", "0");
  resourceText.textContent = "Unknown";
}

function renderScene(sceneId) {
  const scene = scenes[sceneId];

  if (!scene) {
    showIntro();
    return;
  }

  if (scene.path) {
    setPath(scene.path);
  } else if (sceneId === "origin") {
    setPath();
  }

  intro.hidden = true;
  topSection.hidden = false;
  story.hidden = false;

  progressBar.style.width = `${scene.progress}%`;
  progressContainer.setAttribute("aria-valuenow", scene.progress);

  if (scene.resources) {
    resourceText.textContent = scene.resources;
  }

  story.innerHTML = `
    ${scene.title ? `<h2>${scene.title}</h2>` : ""}
    ${scene.text ? `<p class="story-text">${scene.text}</p>` : ""}
    <div class="choice-container">
      ${scene.choices
        .map(
          (choice) =>
            `<button type="button" data-next="${choice.next}">${choice.label}</button>`
        )
        .join("")}
    </div>
  `;
}

startButton.addEventListener("click", () => renderScene("origin"));

story.addEventListener("click", (event) => {
  const choice = event.target.closest("[data-next]");

  if (choice) {
    if (choice.dataset.next === "intro") {
      showIntro();
    } else {
      renderScene(choice.dataset.next);
    }
  }
});

showIntro();
