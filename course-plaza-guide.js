(() => {
  const page = document.querySelector("#courseSelectPage");
  const guide = document.querySelector("#coursePlazaGuide");
  const dismiss = document.querySelector("#dismissCoursePlazaGuide");
  if (!page || !guide || !dismiss) return;

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
