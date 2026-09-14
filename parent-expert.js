const parentExpertPage = document.querySelector("#parentExpertPage");

pages.push(parentExpertPage);

document.querySelector("#openParentExpert").addEventListener("click", () => {
  showPage(parentExpertPage, "#parent-expert");
});

document.querySelector("#backFromParentExpert").addEventListener("click", () => {
  showPage(studyPage, "#study");
});

document.querySelector("#openExpertCoursesFromParent").addEventListener("click", () => {
  // 家长侧的专家课程入口直接进入真实世界英语课课程列表。
  showPage(realWorldCoursesPage, "#real-world-courses");
});

if (window.location.hash === "#parent-expert") showPage(parentExpertPage, "#parent-expert");
