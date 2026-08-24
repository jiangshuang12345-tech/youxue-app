const lessonData = [
  {
    type: "双师智学课课时",
    expiry: "2027-07-29 23:59:59",
    count: 2344,
    icon: "📘",
    variant: "standard",
  },
  {
    type: "双师智学体验课课时",
    expiry: "2026-12-31 23:59:59",
    count: 8,
    icon: "🧭",
    variant: "trial",
  },
];

const homePage = document.querySelector("#homePage");
const lessonsPage = document.querySelector("#lessonsPage");
const lessonEntry = document.querySelector("#lessonEntry");
const backToHome = document.querySelector("#backToHome");
const lessonList = document.querySelector("#lessonList");
const totalLessons = document.querySelector("#totalLessons");

function renderLessonCards() {
  lessonList.innerHTML = lessonData
    .map(
      (lesson) => `
        <article class="lesson-card ${lesson.variant === "trial" ? "lesson-card--trial" : ""}">
          <div class="lesson-type-icon" aria-hidden="true">${lesson.icon}</div>
          <div class="lesson-info">
            <h2>${lesson.type}</h2>
            <p class="lesson-expiry">有效期至：<span>${lesson.expiry}</span></p>
          </div>
          <div class="lesson-count" aria-label="剩余 ${lesson.count} 课时">
            <strong>${lesson.count}</strong><span>课时</span>
          </div>
        </article>
      `,
    )
    .join("");

  totalLessons.textContent = lessonData.reduce((sum, lesson) => sum + lesson.count, 0);
}

function showPage(targetPage, hash) {
  const isLessons = targetPage === lessonsPage;
  homePage.hidden = isLessons;
  lessonsPage.hidden = !isLessons;
  targetPage.classList.remove("is-entering");
  void targetPage.offsetWidth;
  targetPage.classList.add("is-entering");
  window.history.replaceState(null, "", hash);
  window.scrollTo({ top: 0, behavior: "smooth" });

  window.setTimeout(() => {
    const heading = targetPage.querySelector("h1");
    heading?.focus({ preventScroll: true });
  }, 120);
}

lessonEntry.addEventListener("click", () => showPage(lessonsPage, "#lessons"));
backToHome.addEventListener("click", () => showPage(homePage, "#home"));

renderLessonCards();

if (window.location.hash === "#lessons") {
  showPage(lessonsPage, "#lessons");
}
