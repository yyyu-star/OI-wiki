sessionStorage.setItem("commitHash", "e53c6486552083d097ff38a4e61d1a7b07b21d39"); // commit hash injected here, see: scripts/pre-build/install-feedback-sys-frontend

function matchColor() {
  const palettle = localStorage.getItem("/.__palette");
  if (
    (palettle !== null && JSON.parse(palettle)?.color?.scheme !== "default") ||
    (palettle === null && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("review_dark_mode");
  } else {
    document.documentElement.classList.remove("review_dark_mode");
  }
}

function hookMkdocsMaterial() {
  document.querySelector(".md-header__option").addEventListener("click", e => {
    if (!(e.target instanceof HTMLInputElement)) return;
    setTimeout(matchColor, 0); // wait for the theme to be applied
  });
}

// has ?enable_feedback_sys=true parameter
if (location.search.includes("enable_feedback_sys=true")) {
  localStorage.setItem("enable_feedback_sys", "true");
}

if (localStorage.getItem("giscus-session")) {
  localStorage.setItem("enable_feedback_sys", "true");
}

if (localStorage.getItem("enable_feedback_sys") === "true") {
  hookMkdocsMaterial();

  document$.subscribe(function () {
    matchColor();

    globalThis["OIWikiFeedbackSysFrontend"] instanceof Object &&
      OIWikiFeedbackSysFrontend.setupReview instanceof Function &&
      OIWikiFeedbackSysFrontend.setupReview(document.body, {
        apiEndpoint: "https://feedback-sys-backend.hikarilan.workers.dev/" // api endpoint injected here, see: scripts/pre-build/install-feedback-sys-frontend
      });
  });
}
