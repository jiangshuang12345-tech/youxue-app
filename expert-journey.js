const expertJourneyPage = document.querySelector("#expertJourneyPage");
const expertJourneyEntry = document.querySelector("[data-open-expert-journey]");

pages.push(expertJourneyPage);

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
