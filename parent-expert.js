const parentExpertPage = document.querySelector("#parentExpertPage");

pages.push(parentExpertPage);

document.querySelector("#openParentExpert").addEventListener("click", () => {
  showPage(parentExpertPage, "#parent-expert");
});

document.querySelector("#backFromParentExpert").addEventListener("click", () => {
  showPage(studyPage, "#study");
});

document.querySelector("#openExpertCoursesFromParent").addEventListener("click", () => {
  showPage(expertCoursesPage, "#expert-courses");
});

if (window.location.hash === "#parent-expert") showPage(parentExpertPage, "#parent-expert");
