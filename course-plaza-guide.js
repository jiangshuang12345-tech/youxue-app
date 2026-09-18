(() => {
  const page = document.querySelector("#courseSelectPage");
  const guide = document.querySelector("#coursePlazaGuide");
  const dismiss = document.querySelector("#dismissCoursePlazaGuide");
  const skip = document.querySelector("#skipCoursePlazaGuide");
  if (!page || !guide || !dismiss || !skip) return;

  const skippedKey = "youxue-course-plaza-guide-skipped-v3";
  const hasSkipped = () => {
    try {
      return window.localStorage.getItem(skippedKey) === "1";
    } catch (_) {
      return false;
    }
  };
  const rememberSkipped = () => {
    try {
      window.localStorage.setItem(skippedKey, "1");
    } catch (_) {
      // Closing the guide should still work if storage is unavailable.
    }
  };

  let shownThisLoad = false;
  const closeGuide = () => {
    page.classList.remove("is-guide-active");
    guide.hidden = true;
  };
  const showGuide = () => {
    if (page.hidden || shownThisLoad || hasSkipped()) return;
    shownThisLoad = true;
    page.classList.add("is-guide-active");
    guide.hidden = false;
    dismiss.focus({ preventScroll: true });
  };
  const skipGuide = () => {
    rememberSkipped();
    closeGuide();
  };

  dismiss.addEventListener("click", closeGuide);
  dismiss.addEventListener("touchend", (event) => {
    event.preventDefault();
    event.stopPropagation();
    closeGuide();
  }, { passive: false });
  skip.addEventListener("click", skipGuide);
  skip.addEventListener("touchend", (event) => {
    event.preventDefault();
    event.stopPropagation();
    skipGuide();
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
