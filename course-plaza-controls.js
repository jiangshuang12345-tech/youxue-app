(() => {
  const gradeButton = document.querySelector("#courseGradeChooser");
  const gradeLabel = gradeButton?.querySelector("span");
  const gradeMenu = document.querySelector("#courseGradeMenu");
  const searchInput = document.querySelector(".course-plaza-search-field input");
  const cards = [...document.querySelectorAll("[data-course-card]")];
  if (!gradeButton || !gradeMenu || !searchInput) return;

  const closeMenu = () => { gradeMenu.hidden = true; gradeButton.setAttribute("aria-expanded", "false"); };
  gradeButton.addEventListener("click", () => {
    const open = gradeMenu.hidden;
    gradeMenu.hidden = !open;
    gradeButton.setAttribute("aria-expanded", String(open));
  });
  gradeMenu.querySelectorAll("button").forEach((item) => item.addEventListener("click", () => {
    if (gradeLabel) gradeLabel.textContent = item.textContent.trim();
    closeMenu();
  }));
  document.addEventListener("click", (event) => {
    if (!gradeMenu.hidden && !gradeMenu.contains(event.target) && !gradeButton.contains(event.target)) closeMenu();
  });

  const fuzzyMatch = (text, query) => {
    let offset = 0;
    for (const letter of query) {
      offset = text.indexOf(letter, offset);
      if (offset < 0) return false;
      offset += 1;
    }
    return true;
  };
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().replace(/\s+/g, "").toLowerCase();
    cards.forEach((card) => {
      const searchableText = (card.dataset.courseName || "").replace(/\s+/g, "").toLowerCase();
      const matched = !query || fuzzyMatch(searchableText, query);
      card.classList.toggle("is-search-match", Boolean(query) && matched);
      card.classList.toggle("is-search-muted", Boolean(query) && !matched);
      card.disabled = Boolean(query) && !matched;
    });
  });
})();
