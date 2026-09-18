(() => {
  const page = document.querySelector("#fmPage");
  const artwork = document.querySelector("#fmArtwork");
  const studyPage = document.querySelector("#studyPage");
  const openFm = document.querySelector("#openFm");
  const backFromFm = document.querySelector("#backFromFm");
  const filterPanel = document.querySelector("#fmFilterPanel");
  const categoryPanel = document.querySelector("#fmCategoryPanel");
  const progress = document.querySelector("#fmProgress");
  const liveStatus = document.querySelector("#fmLiveStatus");
  if (!page || !artwork || !filterPanel || !categoryPanel || !progress) return;

  const artworkByState = {
    home: "assets/fm-home.webp",
    subtitles: "assets/fm-subtitles.webp",
    age: "assets/fm-filter-age.webp",
    level: "assets/fm-filter-level.webp",
    categories: "assets/fm-categories.webp",
  };
  let state = "home";
  let subtitlesVisible = false;
  let playing = false;
  let loop = false;
  let activeTrack = 0;
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
    artwork.src = artworkByState[nextState];
    filterPanel.hidden = nextState !== "age" && nextState !== "level";
    categoryPanel.hidden = nextState !== "categories";
  };
  const showFilterTab = (tab) => {
    document.querySelector(".fm-filter-options--age").hidden = tab !== "age";
    document.querySelector(".fm-filter-options--level").hidden = tab !== "level";
    setArtwork(tab);
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
  document.querySelector("#fmFilterTrigger").addEventListener("click", () => showFilterTab("age"));
  document.querySelector("#fmCategoryTrigger").addEventListener("click", () => setArtwork("categories"));
  document.querySelectorAll("[data-fm-filter-tab]").forEach((button) => button.addEventListener("click", () => showFilterTab(button.dataset.fmFilterTab)));
  document.querySelectorAll("[data-fm-age],[data-fm-level]").forEach((button) => button.addEventListener("click", () => {
    const value = button.dataset.fmAge || button.dataset.fmLevel;
    announce(`已筛选：${value}`);
    setArtwork(subtitlesVisible ? "subtitles" : "home");
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
  openFm.addEventListener("click", () => showStandalonePage(page, "#fm"));
  backFromFm.addEventListener("click", () => {
    pause();
    showStandalonePage(studyPage, "#study");
  });
  if (window.location.hash === "#fm") showStandalonePage(page, "#fm");
})();
