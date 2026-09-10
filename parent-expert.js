const parentExpertPage = document.querySelector("#parentExpertPage");

pages.push(parentExpertPage);

document.querySelector("#openParentExpert").addEventListener("click", () => {
  showPage(parentExpertPage, "#parent-expert");
});

document.querySelector("#backFromParentExpert").addEventListener("click", () => {
  showPage(studyPage, "#study");
});

function openCoursePlaza() {
  showPage(courseSelectPage, "#courses");
}
window.openCoursePlaza = openCoursePlaza;

document.querySelector("#openExpertCoursesFromParent").addEventListener("click", openCoursePlaza);

if (window.location.hash === "#parent-expert") showPage(parentExpertPage, "#parent-expert");
