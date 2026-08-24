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
const orderData = [
  { id:"2511061000658408340", user:"Lucas - 田佳测试333", avatar:"🤖", status:"refunded", statusText:"已退款", title:"神奇高频词", product:"神奇高频词", qty:30, price:"9.90", paid:"9.90", created:"2025-11-06 19:31:24", paidAt:"2025-11-06 19:31:35" },
  { id:"260623120000001", user:"testrichrich - 测试", avatar:"👩‍🎓", status:"pending", statusText:"确认中", title:"测试拼单活动成人续费10课时", product:"English in the Family--家庭外教口语课", qty:10, price:"0.01", paid:"0.01", created:"2026-06-23 12:51:05", paidAt:"—" },
  { id:"1782190264863-46", user:"Lucas - 田佳测试333", avatar:"🤖", status:"completed", statusText:"已完成", title:"中国故事英文演绎课", product:"中国故事英文演绎课", qty:1, price:"0.00", paid:"0.00", created:"2026-06-23 12:51:05", paidAt:"2026-06-23 12:51:05" },
  { id:"2605111000668640306", user:"Alex - 智学用户", avatar:"🐥", status:"completed", statusText:"已完成", title:"兑换-240课时主修双师智学体系课", product:"Major Course Co-teaching AI Version--VIPKID主修双师智学体系", qty:240, price:"5400.00", paid:"5400.00", created:"2026-05-11 10:18:26", paidAt:"2026-05-11 10:19:02" },
  { id:"2604101000661000301", user:"test_new_G4 - 新打标用户", avatar:"🐣", status:"processing", statusText:"处理中", title:"VIPKID美国小学课程", product:"VIPKID美国小学课程", qty:1, price:"9.90", paid:"9.90", created:"2026-04-10 09:12:10", paidAt:"2026-04-10 09:12:32" }
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
const ordersPage = document.querySelector("#ordersPage");
const orderDetailPage = document.querySelector("#orderDetailPage");
const ordersList = document.querySelector("#ordersList");
const pages = [homePage, lessonsPage, validityPage, ledgerPage, ordersPage, orderDetailPage];
let ledgerTab = "all";
let incomeFilter = "all";
let orderTab = "all";
let activeOrder = null;
let cancelFromList = false;

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

function renderOrders() {
  const filtered = orderData.filter((order) => orderTab === "all" || order.status === orderTab);
  ordersList.innerHTML = filtered.map((order) => `<article class="order-card" data-order-id="${order.id}">
    <div class="order-customer"><span>${order.avatar}</span><strong>${order.user}</strong><b>${order.statusText}</b></div>
    <div class="order-product"><h3>${order.title}</h3><p>${order.product}</p><span>× ${order.qty}</span></div>
    <div class="order-total"><small>实付</small><strong>¥ ${order.paid}</strong>${order.status === "pending" ? '<button class="list-cancel-button" type="button">取消订单</button>' : ""}<i>查看详情 ›</i></div>
  </article>`).join("") || '<p class="empty-state">当前状态下暂无订单</p>';
  document.querySelector("#orderResultCount").textContent = `${filtered.length} 笔订单`;
  document.querySelectorAll("[data-order-tab]").forEach((button) => {
    const tab = button.dataset.orderTab;
    button.querySelector("b").textContent = tab === "all" ? orderData.length : orderData.filter((order) => order.status === tab).length;
  });
}

function showOrderDetail(order) {
  activeOrder = order;
  document.querySelector("#detailOrderNumber").textContent = `订单号 ${order.id}`;
  document.querySelector("#orderDetailContent").innerHTML = `<aside class="order-status-panel"><span>当前状态</span><strong>${order.statusText}</strong>${order.status === "pending" ? '<button class="cancel-order-button" type="button" id="cancelOrder">取消订单</button>' : ""}<div class="order-avatar">${order.avatar}</div><h2>${order.user}</h2></aside>
    <div class="order-detail-main"><section><span class="section-label">购买内容</span><h2>${order.title}</h2><div class="detail-product"><div><small>商品名称</small><strong>${order.product}</strong></div><b>× ${order.qty}</b></div></section>
    <section class="detail-money"><div><span>商品金额</span><strong>¥ ${order.price}</strong></div><div><span>实付金额</span><strong>¥ ${order.paid}</strong></div></section>
    <section><span class="section-label">订单信息</span><dl class="order-info"><div><dt>订单编号</dt><dd>${order.id}</dd></div><div><dt>下单时间</dt><dd>${order.created}</dd></div><div><dt>支付时间</dt><dd>${order.paidAt}</dd></div></dl></section></div>`;
  showPage(orderDetailPage, `#order-${order.id}`);
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
document.querySelector("#orderEntry").addEventListener("click", () => showPage(ordersPage, "#orders"));
document.querySelector("#backOrdersHome").addEventListener("click", () => showPage(homePage, "#home"));
document.querySelector("#backToOrders").addEventListener("click", () => showPage(ordersPage, "#orders"));
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
document.querySelectorAll("[data-order-tab]").forEach((button) => button.addEventListener("click", () => {
  orderTab = button.dataset.orderTab;
  document.querySelectorAll("[data-order-tab]").forEach((item) => item.classList.toggle("is-active", item === button));
  document.querySelector("#orderFilterTitle").textContent = button.querySelector("span").textContent;
  renderOrders();
}));
ordersList.addEventListener("click", (event) => {
  const card = event.target.closest("[data-order-id]"); if (!card) return;
  const order = orderData.find((item) => item.id === card.dataset.orderId);
  if (event.target.closest(".list-cancel-button")) { activeOrder = order; cancelFromList = true; document.querySelector("#cancelModal").hidden = false; return; }
  showOrderDetail(order);
});
document.querySelector("#orderDetailContent").addEventListener("click", (event) => { if (event.target.closest("#cancelOrder")) { cancelFromList = false; document.querySelector("#cancelModal").hidden = false; } });
document.querySelector("#keepOrder").addEventListener("click", () => { document.querySelector("#cancelModal").hidden = true; });
document.querySelector("#confirmCancel").addEventListener("click", () => {
  if (!activeOrder || activeOrder.status !== "pending") return;
  activeOrder.status = "canceled"; activeOrder.statusText = "已取消";
  document.querySelector("#cancelModal").hidden = true; renderOrders();
  if (cancelFromList) showPage(ordersPage, "#orders"); else showOrderDetail(activeOrder);
});

renderLessonCards();
renderValidity();
renderLedger();
renderOrders();

const initialRoutes = { "#lessons": lessonsPage, "#validity": validityPage, "#ledger": ledgerPage, "#orders": ordersPage };
if (initialRoutes[window.location.hash]) showPage(initialRoutes[window.location.hash], window.location.hash);
