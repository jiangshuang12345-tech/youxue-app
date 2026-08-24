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

const validityData = [
  { status: "未激活", count: 100, order: "251111000658460507", date: "2025-11-11", expiry: "激活后计算有效期" },
  { status: "未激活", count: 100, order: "251111000658460504", date: "2025-11-11", expiry: "激活后计算有效期" },
  { status: "未激活", count: 100, order: "251111000658460501", date: "2025-11-11", expiry: "激活后计算有效期" },
  { status: "未激活", count: 100, order: "251111000658460498", date: "2025-11-11", expiry: "激活后计算有效期" },
  { status: "未激活", count: 100, order: "251111000658460495", date: "2025-11-11", expiry: "激活后计算有效期" },
  { status: "未激活", count: 100, order: "251111000658460492", date: "2025-11-11", expiry: "激活后计算有效期" },
  { status: "有效期至：2027-07-29 23:59:59", count: 71, order: "251111000658460489", date: "2025-11-11", expiry: "2027-07-29 23:59:59", active: true },
];

const ledgerData = [
  { month: "2026年08月", title: "正常结束 - VIPKID主修智学双师体系", date: "2026-08-21", amount: -1, kind: "expense" },
  { month: "2026年08月", title: "正常结束 - VIPKID主修智学双师体系", date: "2026-08-21", amount: -1, kind: "expense" },
  { month: "2026年08月", title: "正常结束 - VIPKID主修智学双师体系", date: "2026-08-20", amount: -1, kind: "expense" },
  { month: "2026年07月", title: "转换活动返还", date: "2026-07-16", amount: 1, kind: "income", source: "gift" },
  { month: "2026年07月", title: "转换活动返还", date: "2026-07-16", amount: 1, kind: "income", source: "gift" },
  { month: "2026年07月", title: "转换活动返还", date: "2026-07-16", amount: 1, kind: "income", source: "gift" },
  { month: "2026年05月", title: "购买课程包", date: "2026-05-11", amount: 432, kind: "income", source: "purchase", order: "2605111000668640306" },
  { month: "2026年01月", title: "购买课程包获赠课时", date: "2026-01-23", amount: 144, kind: "income", source: "gift", order: "2601231000663216832" },
  { month: "2026年01月", title: "购买课程包", date: "2026-01-23", amount: 648, kind: "income", source: "purchase", order: "2601231000663178652" },
  { month: "2026年01月", title: "新用户赠送 - VIPKID主修双师智学体系", date: "2026-01-15", amount: 5, kind: "income", source: "gift", order: "2601151000662475899" },
];

const homePage = document.querySelector("#homePage");
const lessonsPage = document.querySelector("#lessonsPage");
const lessonEntry = document.querySelector("#lessonEntry");
const backToHome = document.querySelector("#backToHome");
const lessonList = document.querySelector("#lessonList");
const totalLessons = document.querySelector("#totalLessons");
const validityPage = document.querySelector("#validityPage");
const ledgerPage = document.querySelector("#ledgerPage");
const validityList = document.querySelector("#validityList");
const ledgerList = document.querySelector("#ledgerList");
const incomeFilters = document.querySelector("#incomeFilters");
const pages = [homePage, lessonsPage, validityPage, ledgerPage];
let ledgerTab = "all";
let incomeFilter = "all";

function renderLessonCards() {
  lessonList.innerHTML = lessonData
    .map(
      (lesson) => `
        <article class="lesson-card ${lesson.variant === "trial" ? "lesson-card--trial" : ""}" data-lesson-index="${lessonData.indexOf(lesson)}">
          <div class="lesson-type-icon" aria-hidden="true">${lesson.icon}</div>
          <div class="lesson-info">
            <h2>${lesson.type}</h2>
            <p class="lesson-expiry">有效期至：<span>${lesson.expiry}</span>${lesson.variant === "standard" ? '<button class="expiry-link" type="button">去查看</button>' : ""}</p>
          </div>
          <button class="lesson-count" type="button" aria-label="查看剩余 ${lesson.count} 课时明细">
            <strong>${lesson.count}</strong><span>剩余课时</span><i aria-hidden="true">›</i>
          </button>
        </article>
      `,
    )
    .join("");

  totalLessons.textContent = lessonData.reduce((sum, lesson) => sum + lesson.count, 0);
}

function renderValidity() {
  document.querySelector("#validityBatchCount").textContent = `${validityData.length} 个课时包`;
  validityList.innerHTML = validityData.map((item) => `
    <article class="validity-item ${item.active ? "is-active" : ""}">
      <div class="validity-status"><span>${item.status}</span><strong>${item.count}<small>节</small></strong></div>
      <dl>
        <div><dt>购课日期</dt><dd>${item.date}</dd></div>
        <div><dt>有效期</dt><dd>${item.expiry}</dd></div>
        <div><dt>订单编号</dt><dd>${item.order}</dd></div>
      </dl>
      <span class="package-tag">购买课程包</span>
    </article>
  `).join("");
}

function renderLedger() {
  const filtered = ledgerData.filter((item) => {
    if (ledgerTab !== "all" && item.kind !== ledgerTab) return false;
    if (ledgerTab === "income" && incomeFilter !== "all" && item.source !== incomeFilter) return false;
    return true;
  });
  let currentMonth = "";
  ledgerList.innerHTML = filtered.map((item) => {
    const month = item.month !== currentMonth ? `<h3>${item.month}</h3>` : "";
    currentMonth = item.month;
    return `${month}<article class="ledger-row">
      <div><strong>${item.title}</strong><span>${item.date}</span>${item.order ? `<small>订单编号：${item.order}</small>` : ""}</div>
      <b class="${item.amount > 0 ? "positive" : ""}">${item.amount > 0 ? "+" : "−"}${Math.abs(item.amount)}</b>
    </article>`;
  }).join("") || '<p class="empty-state">当前筛选下暂无课时记录</p>';
}

function showPage(targetPage, hash) {
  pages.forEach((page) => { page.hidden = page !== targetPage; });
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
document.querySelectorAll("[data-back='lessons']").forEach((button) => button.addEventListener("click", () => showPage(lessonsPage, "#lessons")));
lessonList.addEventListener("click", (event) => {
  if (event.target.closest(".expiry-link")) showPage(validityPage, "#validity");
  if (event.target.closest(".lesson-count")) showPage(ledgerPage, "#ledger");
});
document.querySelectorAll("[data-ledger-tab]").forEach((button) => button.addEventListener("click", () => {
  ledgerTab = button.dataset.ledgerTab;
  document.querySelectorAll("[data-ledger-tab]").forEach((item) => item.classList.toggle("is-active", item === button));
  incomeFilters.hidden = ledgerTab !== "income";
  renderLedger();
}));
document.querySelectorAll("[data-income-filter]").forEach((button) => button.addEventListener("click", () => {
  incomeFilter = button.dataset.incomeFilter;
  document.querySelectorAll("[data-income-filter]").forEach((item) => item.classList.toggle("is-active", item === button));
  renderLedger();
}));

renderLessonCards();
renderValidity();
renderLedger();

const initialRoutes = { "#lessons": lessonsPage, "#validity": validityPage, "#ledger": ledgerPage };
if (initialRoutes[window.location.hash]) showPage(initialRoutes[window.location.hash], window.location.hash);
