(() => {
  const page = document.querySelector("#courseSelectPage");
  const guide = document.querySelector("#coursePlazaGuide");
  const dismiss = document.querySelector("#dismissCoursePlazaGuide");
  if (!page || !guide || !dismiss) return;

  const copyLayer = document.createElement("div");
  copyLayer.className = "course-plaza-copy";
  copyLayer.setAttribute("aria-label", "课程描述与标签");
  copyLayer.innerHTML = `
    <section class="course-copy course-copy--real"><p><strong>龚亚夫教授</strong>与VIPKID联合研发·在真实场景中用英语做事，语言、思维与品格同步长大</p><div><span>真实情境任务</span><span>多元目标</span><span>1-6年级进阶</span></div></section>
    <section class="course-copy course-copy--sync"><p>跟着教材单元走，攻克校内核心词&amp;核心句</p></section>
    <div class="course-title-tags course-title-tags--sync"><span>学龄前-9年级</span></div>
    <section class="course-copy course-copy--exam"><p>剑桥少儿英语&amp;剑桥通用五级KET/PET/FCE专项训练</p><div><span>Starters</span><span>Movers</span><span>KET</span><span>PET</span><span>FCE</span></div></section>
    <div class="course-title-tags course-title-tags--exam" aria-hidden="true"></div>
    <section class="course-copy course-copy--quality"><p>多种主题驱动，锻炼英文能力</p><div><span>主题学习</span></div></section>
    <div class="course-title-tags course-title-tags--quality" aria-hidden="true"></div>
    <section class="course-copy course-copy--dino"><p>Dino AI自研主题绘本，阅读中提升能力</p></section>
    <div class="course-title-tags course-title-tags--dino"><span>L0-L4 · 360本</span></div>`;
  page.insertBefore(copyLayer, page.querySelector(".course-plaza-entry-header"));

  const style = document.createElement("style");
  style.textContent = `
    .course-plaza-copy{position:absolute;inset:0;z-index:2;color:#767b82;pointer-events:none}.course-copy{position:absolute;display:flex;flex-direction:column;justify-content:flex-start;overflow:hidden;background:#fff}.course-copy p{margin:0;font-size:clamp(11px,1.22vw,18px);line-height:1.65}.course-copy strong{color:#d89a18;font-weight:900}.course-copy div,.course-title-tags{display:flex;flex-wrap:wrap;align-items:center;gap:clamp(5px,.65vw,10px)}.course-copy span,.course-title-tags span{display:inline-flex;align-items:center;justify-content:center;min-height:clamp(20px,2.7vh,28px);padding:2px clamp(7px,.9vw,13px);border-radius:6px;color:#5997c8;background:#e8f2ff;font-size:clamp(10px,1vw,15px);font-weight:700;white-space:nowrap}.course-copy--real{left:4.7%;top:74.2%;width:35.7%;height:20.4%;padding:.3% .1% 0}.course-copy--real p{color:#262d35;font-size:clamp(12px,1.34vw,20px);line-height:1.75}.course-copy--real div{margin-top:auto;padding-bottom:.8%}.course-copy--sync{left:45.8%;top:47.4%;width:22.1%;height:7.5%;padding:.2% 0 0}.course-copy--exam{left:73.2%;top:46.8%;width:22.9%;height:9.1%;padding:.2% 0 0}.course-copy--exam p{font-size:clamp(10px,1.04vw,16px);line-height:1.4}.course-copy--exam div{margin-top:4px;gap:4px}.course-copy--exam span{min-height:18px;padding:1px 6px;font-size:clamp(9px,.78vw,12px)}.course-copy--quality{left:45.8%;top:85.6%;width:22.2%;height:8.7%;padding:.2% 0 0}.course-copy--dino{left:73.3%;top:85.6%;width:22.5%;height:8.7%;padding:.2% 0 0}.course-title-tags{position:absolute;z-index:1;padding:2px 5px;background:#fff}.course-title-tags--sync{left:57%;top:40.4%}.course-title-tags--exam{left:85.5%;top:40.2%;width:8%;height:4.8%}.course-title-tags--quality{left:57%;top:79.2%;width:7.5%;height:4.8%}.course-title-tags--dino{left:84.2%;top:79.2%}.course-copy--quality div{margin-top:4px}`;
  document.head.appendChild(style);

  let shownThisLoad = false;
  const closeGuide = () => {
    page.classList.remove("is-guide-active");
    guide.hidden = true;
  };
  const showGuide = () => {
    if (page.hidden || shownThisLoad) return;
    shownThisLoad = true;
    page.classList.add("is-guide-active");
    guide.hidden = false;
    dismiss.focus({ preventScroll: true });
  };

  dismiss.addEventListener("click", closeGuide);
  dismiss.addEventListener("touchend", (event) => {
    event.preventDefault();
    event.stopPropagation();
    closeGuide();
  }, { passive: false });
  guide.addEventListener("click", (event) => {
    if (event.target === guide) closeGuide();
  });
  new MutationObserver(() => {
    if (!page.hidden) window.setTimeout(showGuide, 260);
  }).observe(page, { attributes: true, attributeFilter: ["hidden"] });

  window.closeCoursePlazaGuide = closeGuide;
  if (!page.hidden) window.setTimeout(showGuide, 260);
})();
