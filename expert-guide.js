(() => {
  const page = document.querySelector("#courseSelectPage");
  const guide = document.querySelector("#expertGuide");
  const dismiss = document.querySelector("#dismissExpertGuide");
  if (!page || !guide || !dismiss) return;

  const hasSeenGuide = () => {
    try { return window.localStorage.getItem("yx_expert_course_guide_v1") === "true"; }
    catch { return false; }
  };

  const showGuide = () => {
    if (page.hidden || hasSeenGuide()) return;
    page.classList.add("is-guide-active");
    guide.hidden = false;
    dismiss.focus({ preventScroll: true });
  };

  const closeGuide = () => {
    try { window.localStorage.setItem("yx_expert_course_guide_v1", "true"); } catch {}
    page.classList.remove("is-guide-active");
    guide.hidden = true;
  };

  dismiss.addEventListener("click", closeGuide);
  dismiss.addEventListener("touchend", (event) => {
    event.preventDefault();
    event.stopPropagation();
    closeGuide();
  }, { passive: false });

  new MutationObserver(() => {
    if (!page.hidden) window.setTimeout(showGuide, 260);
  }).observe(page, { attributes: true, attributeFilter: ["hidden"] });

  if (!page.hidden) window.setTimeout(showGuide, 260);
})();
