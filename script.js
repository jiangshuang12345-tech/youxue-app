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
const paymentModal = document.querySelector("#paymentModal");
const photoPermissionModal = document.querySelector("#photoPermissionModal");
const permissionGuideModal = document.querySelector("#permissionGuideModal");
const prototypeSettings = document.querySelector("#prototypeSettings");
let prototypePhotoPermission = "not_determined";

function createPrototypeQr(seed) {
  const size = 25;
  let value = [...seed].reduce((total, char) => total + char.charCodeAt(0), 17);
  const cells = Array.from({ length: size * size }, (_, index) => {
    value = (value * 9301 + 49297 + index) % 233280;
    return value / 233280 > 0.49;
  });
  const finder = (startX, startY) => {
    for (let y = 0; y < 7; y += 1) for (let x = 0; x < 7; x += 1) {
      const edge = x === 0 || x === 6 || y === 0 || y === 6;
      const center = x >= 2 && x <= 4 && y >= 2 && y <= 4;
      cells[(startY + y) * size + startX + x] = edge || center;
    }
  };
  finder(1, 1); finder(size - 8, 1); finder(1, size - 8);
  return cells.map((filled) => `<i${filled ? ' class="is-filled"' : ""}></i>`).join("");
}

function openPayment(order, method) {
  activeOrder = order;
  const isWechat = method === "wechat";
  paymentModal.dataset.method = method;
  document.querySelector("#paymentBrand").textContent = isWechat ? "微信" : "支";
  document.querySelector("#paymentTitle").textContent = isWechat ? "微信支付" : "支付宝支付";
  document.querySelector("#paymentAmount").textContent = `¥ ${order.paid}`;
  renderPaymentQr(`${method}-${order.id}`);
  document.querySelector("#saveQrGuide").textContent = `保存后打开${isWechat ? "微信" : "支付宝"}，使用“扫一扫—从相册选择”完成支付`;
  document.querySelector("#saveQrFeedback").textContent = "";
  paymentModal.hidden = false;
  document.querySelector("#closePayment").focus();
}

function renderPaymentQr(seed) {
  document.querySelector("#paymentQr").innerHTML = createPrototypeQr(seed);
}

function closePayment() {
  paymentModal.hidden = true;
  photoPermissionModal.hidden = true;
  permissionGuideModal.hidden = true;
  prototypeSettings.hidden = true;
}

function requestSavePaymentQr() {
  if (window.webkit?.messageHandlers?.savePaymentQr) {
    performQrSave();
    return;
  }
  if (prototypePhotoPermission === "not_determined") {
    document.querySelector("#saveQrFeedback").textContent = "正在申请相册权限…";
    photoPermissionModal.hidden = false;
    document.querySelector("#denyPhotoPermission").focus();
    return;
  }
  if (prototypePhotoPermission === "denied") {
    permissionGuideModal.hidden = false;
    document.querySelector("#skipPhotoSettings").focus();
    return;
  }
  performQrSave();
}

function performQrSave() {
  const qrCells = [...document.querySelectorAll("#paymentQr i")];
  const feedback = document.querySelector("#saveQrFeedback");
  const saveButton = document.querySelector("#savePaymentQr");
  if (!activeOrder || qrCells.length === 0) {
    feedback.textContent = "二维码生成失败，请重新打开支付弹窗";
    return;
  }
  feedback.textContent = "正在生成二维码图片…";
  saveButton.disabled = true;
  const size = 25;
  const cellSize = 24;
  const quietZone = 48;
  const canvas = document.createElement("canvas");
  canvas.width = size * cellSize + quietZone * 2;
  canvas.height = canvas.width;
  const context = canvas.getContext("2d");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#111111";
  qrCells.forEach((cell, index) => {
    if (!cell.classList.contains("is-filled")) return;
    context.fillRect(quietZone + (index % size) * cellSize, quietZone + Math.floor(index / size) * cellSize, cellSize, cellSize);
  });
  const methodName = paymentModal.dataset.method === "wechat" ? "wechat" : "alipay";
  const filename = `${methodName}-payment-${activeOrder.id}.png`;
  const imageData = canvas.toDataURL("image/png");

  if (window.webkit?.messageHandlers?.savePaymentQr) {
    window.webkit.messageHandlers.savePaymentQr.postMessage({
      imageBase64: imageData.split(",")[1],
      filename,
      orderId: activeOrder.id,
      paymentChannel: methodName,
    });
    feedback.textContent = "正在保存到相册…";
    return;
  }

  try {
    const link = document.createElement("a");
    link.href = imageData;
    link.download = filename;
    link.hidden = true;
    document.body.appendChild(link);
    link.click();
    link.remove();
    feedback.textContent = "二维码图片已生成，请查看系统下载内容";
  } catch (error) {
    feedback.textContent = "保存失败，请重试";
  } finally {
    saveButton.disabled = false;
  }
}

window.onPaymentQrSaveResult = (success, errorCode = "") => {
  const feedback = document.querySelector("#saveQrFeedback");
  document.querySelector("#savePaymentQr").disabled = false;
  feedback.textContent = success ? "二维码已保存到相册，请前往对应App扫码支付" : `保存失败${errorCode ? `（${errorCode}）` : ""}，请重试`;
};

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
    <div class="order-total"><small>实付</small><strong>¥ ${order.paid}</strong><i>查看详情 ›</i></div>
    ${order.status === "pending" ? '<div class="order-actions"><button class="payment-button payment-button--wechat" data-pay-method="wechat" type="button"><span>微信</span>微信支付</button><button class="payment-button payment-button--alipay" data-pay-method="alipay" type="button"><span>支</span>支付宝支付</button><button class="list-cancel-button" type="button">取消订单</button></div>' : ""}
  </article>`).join("") || '<p class="empty-state">当前状态下暂无订单</p>';
  document.querySelector("#orderResultCount").textContent = `${filtered.length} 笔订单`;
  document.querySelectorAll("[data-order-tab]").forEach((button) => {
    const tab = button.dataset.orderTab;
    button.querySelector("b").textContent = tab === "all" ? orderData.length : orderData.filter((order) => order.status === tab).length;
  });
}

function showOrderDetail(order) {
  activeOrder = order;
  document.querySelector("#orderDetailContent").innerHTML = `<div class="order-detail-main">
    <section class="detail-status-inline"><div><span>当前状态</span><strong>${order.statusText}</strong></div><div class="inline-customer"><span class="order-avatar">${order.avatar}</span><h2>${order.user}</h2></div>${order.status === "pending" ? '<div class="detail-status-actions"><button class="detail-pay-button detail-pay-button--wechat" data-detail-pay-method="wechat" type="button"><span>微信</span>微信支付</button><button class="detail-pay-button detail-pay-button--alipay" data-detail-pay-method="alipay" type="button"><span>支</span>支付宝支付</button><button class="cancel-order-button" type="button" id="cancelOrder">取消订单</button></div>' : ""}</section>
    <section class="detail-product-section"><span class="section-label">购买内容</span><h2>${order.title}</h2><div class="detail-product"><div><small>商品名称</small><strong>${order.product}</strong></div><b>× ${order.qty}</b></div></section>
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
  const paymentButton = event.target.closest("[data-pay-method]");
  if (paymentButton) { openPayment(order, paymentButton.dataset.payMethod); return; }
  if (event.target.closest(".list-cancel-button")) { activeOrder = order; cancelFromList = true; document.querySelector("#cancelModal").hidden = false; return; }
  showOrderDetail(order);
});
document.querySelector("#orderDetailContent").addEventListener("click", (event) => {
  const detailPaymentButton = event.target.closest("[data-detail-pay-method]");
  if (detailPaymentButton && activeOrder?.status === "pending") {
    openPayment(activeOrder, detailPaymentButton.dataset.detailPayMethod);
    return;
  }
  if (event.target.closest("#cancelOrder")) { cancelFromList = false; document.querySelector("#cancelModal").hidden = false; }
});
document.querySelector("#keepOrder").addEventListener("click", () => { document.querySelector("#cancelModal").hidden = true; });
document.querySelector("#closePayment").addEventListener("click", closePayment);
document.querySelector("#savePaymentQr").addEventListener("click", requestSavePaymentQr);
document.querySelector("#allowPhotoPermission").addEventListener("click", () => {
  prototypePhotoPermission = "authorized";
  photoPermissionModal.hidden = true;
  requestSavePaymentQr();
});
document.querySelector("#denyPhotoPermission").addEventListener("click", () => {
  prototypePhotoPermission = "denied";
  photoPermissionModal.hidden = true;
  document.querySelector("#saveQrFeedback").textContent = "未获得相册权限，暂时无法保存";
  permissionGuideModal.hidden = false;
  document.querySelector("#skipPhotoSettings").focus();
});
document.querySelector("#skipPhotoSettings").addEventListener("click", () => { permissionGuideModal.hidden = true; });
document.querySelector("#openPhotoSettings").addEventListener("click", () => {
  permissionGuideModal.hidden = true;
  prototypeSettings.hidden = false;
  updatePrototypeSettings();
});
document.querySelectorAll("[data-photo-setting]").forEach((button) => button.addEventListener("click", () => {
  prototypePhotoPermission = button.dataset.photoSetting;
  updatePrototypeSettings();
}));
document.querySelector("#backFromSettings").addEventListener("click", () => {
  prototypeSettings.hidden = true;
  document.querySelector("#saveQrFeedback").textContent = ["authorized", "limited"].includes(prototypePhotoPermission) ? "权限已开启，请点击保存二维码" : "相册权限仍未开启";
});
function updatePrototypeSettings() {
  document.querySelectorAll("[data-photo-setting]").forEach((button) => button.classList.toggle("is-selected", button.dataset.photoSetting === prototypePhotoPermission));
}
paymentModal.addEventListener("click", (event) => { if (event.target === paymentModal) closePayment(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !paymentModal.hidden) closePayment(); });
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
