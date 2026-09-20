(() => {
  const page = document.querySelector("#fmPage");
  const artwork = document.querySelector("#fmArtwork");
  const studyPage = document.querySelector("#studyPage");
  const openFm = document.querySelector("#openFm");
  const backFromFm = document.querySelector("#backFromFm");
  const filterPanel = document.querySelector("#fmFilterPanel");
  const categoryPanel = document.querySelector("#fmCategoryPanel");
  const filterSummary = document.querySelector("#fmFilterSummary");
  const progress = document.querySelector("#fmProgress");
  const liveStatus = document.querySelector("#fmLiveStatus");
  if (!page || !artwork || !filterPanel || !categoryPanel || !progress) return;

  const artworkByState = {
    home: "assets/fm-home.webp",
    subtitles: "assets/fm-subtitles.webp?v=3",
    categories: "assets/fm-categories.webp?v=3",
  };
  let state = "home";
  let subtitlesVisible = false;
  let playing = false;
  let loop = false;
  let activeTrack = 0;
  let selectedAge = "全部";
  let selectedLevel = "全部";
  let activeFilterTab = "age";
  let elapsed = 0;
  let timer = null;
  let audioContext = null;
  let oscillator = null;
  let gain = null;

  const showStandalonePage = (target, hash) => {
    document.querySelectorAll(".page").forEach((item) => { item.hidden = item !== target; });
    target.classList.remove("is-entering");
    void target.offsetWidth;
    target.classList.add("is-entering");
    window.history.replaceState(null, "", hash);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const announce = (message) => {
    liveStatus.textContent = message;
    window.setTimeout(() => { liveStatus.textContent = ""; }, 1600);
  };
  const setArtwork = (nextState) => {
    state = nextState;
    page.classList.toggle("is-fm-category-open", nextState === "categories");
    artwork.src = nextState === "age" || nextState === "level"
      ? (subtitlesVisible ? artworkByState.subtitles : artworkByState.home)
      : artworkByState[nextState];
    filterPanel.hidden = nextState !== "age" && nextState !== "level";
    categoryPanel.hidden = nextState !== "categories";
  };
  const showFilterTab = (tab) => {
    activeFilterTab = tab;
    document.querySelector(".fm-filter-options--age").hidden = tab !== "age";
    document.querySelector(".fm-filter-options--level").hidden = tab !== "level";
    document.querySelectorAll("[data-fm-filter-tab]").forEach((button) => {
      const selected = button.dataset.fmFilterTab === tab;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-selected", String(selected));
    });
    setArtwork(tab);
  };
  const updateFilterSelection = () => {
    const values = [selectedAge, selectedLevel].filter((value) => value !== "全部");
    filterSummary.textContent = values.length ? values.join(" · ") : "全部";
    document.querySelector("#fmFilterTrigger").setAttribute("aria-label", `筛选：${filterSummary.textContent}`);
    document.querySelectorAll("[data-fm-age]").forEach((button) => {
      const selected = button.dataset.fmAge === selectedAge;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-checked", String(selected));
    });
    document.querySelectorAll("[data-fm-level]").forEach((button) => {
      const selected = button.dataset.fmLevel === selectedLevel;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-checked", String(selected));
    });
  };
  const stopTone = () => {
    if (oscillator) {
      try { oscillator.stop(); } catch (_) {}
      oscillator.disconnect();
      oscillator = null;
    }
  };
  const startTone = () => {
    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) return;
    audioContext ||= new Context();
    audioContext.resume();
    stopTone();
    oscillator = audioContext.createOscillator();
    gain ||= audioContext.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = [261.63, 293.66, 329.63, 392][activeTrack] || 261.63;
    gain.gain.value = 0.055;
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start();
  };
  const updatePlayback = () => {
    page.classList.toggle("is-fm-playing", playing);
    document.querySelectorAll("[data-fm-track]").forEach((button, index) => button.classList.toggle("is-active", index === activeTrack && playing));
    document.querySelector("#fmPlayerToggle").setAttribute("aria-label", playing ? "暂停当前音频" : "播放当前音频");
  };
  const pause = () => {
    playing = false;
    window.clearInterval(timer);
    timer = null;
    stopTone();
    updatePlayback();
  };
  const play = () => {
    playing = true;
    startTone();
    window.clearInterval(timer);
    timer = window.setInterval(() => {
      elapsed += 1;
      if (elapsed >= 36) {
        if (loop) elapsed = 0;
        else { elapsed = 36; pause(); }
      }
      progress.value = String(elapsed);
    }, 1000);
    updatePlayback();
    announce("音频开始播放");
  };
  const togglePlayback = () => playing ? pause() : play();

  document.querySelector("#fmDinoTrigger").addEventListener("click", () => {
    subtitlesVisible = !subtitlesVisible;
    setArtwork(subtitlesVisible ? "subtitles" : "home");
    announce(subtitlesVisible ? "字幕已显示" : "字幕已隐藏");
  });
  document.querySelector("#fmFilterTrigger").addEventListener("click", () => {
    if (!filterPanel.hidden) {
      setArtwork(subtitlesVisible ? "subtitles" : "home");
      return;
    }
    updateFilterSelection();
    showFilterTab(activeFilterTab);
  });
  document.querySelector("#fmCategoryTrigger").addEventListener("click", () => setArtwork("categories"));
  document.querySelectorAll("[data-fm-filter-tab]").forEach((button) => button.addEventListener("click", () => showFilterTab(button.dataset.fmFilterTab)));
  document.querySelectorAll("[data-fm-age]").forEach((button) => button.addEventListener("click", () => {
    selectedAge = button.dataset.fmAge;
    selectedLevel = "全部";
    updateFilterSelection();
    announce(`已选择年龄：${selectedAge}`);
  }));
  document.querySelectorAll("[data-fm-level]").forEach((button) => button.addEventListener("click", () => {
    selectedLevel = button.dataset.fmLevel;
    selectedAge = "全部";
    updateFilterSelection();
    announce(`筛选已更新：${filterSummary.textContent}`);
  }));
  document.querySelectorAll("[data-fm-category]").forEach((button) => button.addEventListener("click", () => {
    announce(`已切换至${button.dataset.fmCategory}`);
    setArtwork(subtitlesVisible ? "subtitles" : "home");
  }));
  document.querySelectorAll("[data-fm-track]").forEach((button) => button.addEventListener("click", () => {
    activeTrack = Number(button.dataset.fmTrack);
    elapsed = 0;
    progress.value = "0";
    play();
  }));
  document.querySelector("#fmPlayerToggle").addEventListener("click", togglePlayback);
  document.querySelector("#fmLoopToggle").addEventListener("click", () => {
    loop = !loop;
    page.classList.toggle("is-fm-looping", loop);
    announce(loop ? "已开启单曲循环" : "已关闭单曲循环");
  });
  progress.addEventListener("input", () => { elapsed = Number(progress.value); });
  page.addEventListener("click", (event) => {
    const filterTrigger = document.querySelector("#fmFilterTrigger");
    const categoryTrigger = document.querySelector("#fmCategoryTrigger");
    if (!filterPanel.hidden) {
      if (!filterPanel.contains(event.target) && !filterTrigger.contains(event.target)) setArtwork(subtitlesVisible ? "subtitles" : "home");
      return;
    }
    if (state === "categories" && !event.target.closest("[data-fm-category]") && !categoryTrigger.contains(event.target)) {
      const pageBounds = page.getBoundingClientRect();
      const clickY = (event.clientY - pageBounds.top) / pageBounds.height;
      if (clickY < 0.3) setArtwork(subtitlesVisible ? "subtitles" : "home");
    }
  });
  updateFilterSelection();
  openFm.addEventListener("click", () => showStandalonePage(page, "#fm"));
  backFromFm.addEventListener("click", () => {
    pause();
    showStandalonePage(studyPage, "#study");
  });
  if (window.location.hash === "#fm") showStandalonePage(page, "#fm");
})();
