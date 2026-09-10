const parentExpertPage = document.querySelector("#parentExpertPage");

pages.push(parentExpertPage);

document.querySelector("#openParentExpert").addEventListener("click", () => {
  showPage(parentExpertPage, "#parent-expert");
});

document.querySelector("#backFromParentExpert").addEventListener("click", () => {
  showPage(studyPage, "#study");
});

document.querySelector("#openExpertCoursesFromParent").addEventListener("click", () => {
  // 专家课程入口进入课程广场；具体课程卡片再进入专家课程页。
  showPage(courseSelectPage, "#courses");
});

if (window.location.hash === "#parent-expert") showPage(parentExpertPage, "#parent-expert");
