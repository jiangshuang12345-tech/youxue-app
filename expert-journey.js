const expertJourneyPage = document.querySelector("#expertJourneyPage");
const expertJourneyEntry = document.querySelector("[data-open-expert-journey]");
const expertPreclassPage = document.querySelector("#expertPreclassPage");
const mallLearningPage = document.querySelector("#mallLearningPage");

pages.push(expertJourneyPage, expertPreclassPage, mallLearningPage);

function openExpertJourney() {
  showPage(expertJourneyPage, "#expert-journey");
}

document.querySelector("#backToExpertCourses").addEventListener("click", () => {
  showPage(expertCoursesPage, "#expert-courses");
});

expertJourneyEntry.addEventListener("click", openExpertJourney);
expertJourneyEntry.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openExpertJourney();
  }
});

if (window.location.hash === "#expert-journey") openExpertJourney();

function openPreclass() {
  showPage(expertPreclassPage, "#expert-preclass");
}

const firstJourneyCard = document.querySelector("[data-open-preclass]");
firstJourneyCard.addEventListener("click", openPreclass);
firstJourneyCard.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openPreclass();
  }
});

document.querySelector("#backToJourney").addEventListener("click", openExpertJourney);
document.querySelector("#startMallLesson").addEventListener("click", () => showPage(mallLearningPage, "#mall-learning"));
document.querySelector("#backToPreclass").addEventListener("click", openPreclass);

if (window.location.hash === "#expert-preclass") openPreclass();
if (window.location.hash === "#mall-learning") showPage(mallLearningPage, "#mall-learning");
