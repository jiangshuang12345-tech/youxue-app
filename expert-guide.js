(() => {
  const page = document.querySelector("#courseSelectPage");
  const guide = document.querySelector("#expertGuide");
  const dismiss = document.querySelector("#dismissExpertGuide");
  if (!page || !guide || !dismiss) return;

  let hasShownThisLoad = false;

  const showGuide = () => {
    if (page.hidden || hasShownThisLoad) return;
    hasShownThisLoad = true;
    page.classList.add("is-guide-active");
    guide.hidden = false;
    dismiss.focus({ preventScroll: true });
  };

  const closeGuide = () => {
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
