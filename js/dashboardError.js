
/* ==========================================================
   ORBITLY — 404 PAGE INTERACTION
   Shared navigation and login remain in base.js.
   ========================================================== */

(() => {
  const backButton = document.getElementById("backButton");

  if (backButton) {
    backButton.addEventListener("click", () => {
      if (window.history.length > 1 && document.referrer) {
        window.history.back();
      } else {
        // window.location.href = "index.html";
         window.history.back();
      }
    });
  }
})();
