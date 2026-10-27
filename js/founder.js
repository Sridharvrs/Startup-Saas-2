
// Get the logged-in user
const currentUser = JSON.parse(
  localStorage.getItem("stacklyCurrentUser") ||
  sessionStorage.getItem("stacklyCurrentUser") ||
  "null"
);

if (currentUser?.name) {
  // Display dynamic name
  document.querySelectorAll(".profileName").forEach((element) => {
    element.textContent = currentUser.name;
  });

  // Display first letter in avatar
  const firstLetter = currentUser.name.trim().charAt(0).toUpperCase();

  document.querySelectorAll(".avatar").forEach((element) => {
    element.textContent = firstLetter;
  });
}

// =========================================

const sets = {
  "6M": { v: "40,44,52,58,66,84", l: "Jun,Jul,Aug,Sep,Oct,Nov" },
  "12M": {
    v: "18,22,26,30,34,38,40,44,52,58,66,84",
    l: "Dec,Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov",
  },
};
document.querySelectorAll("[data-rng] button").forEach(
  (b) =>
    (b.onclick = () => {
      b.parentNode
        .querySelectorAll("button")
        .forEach((x) => x.classList.remove("on"));
      b.classList.add("on");
      const c = b.closest(".panel").querySelector(".ch"),
        s = sets[b.textContent];
      c.dataset.line = s.v;
      c.dataset.labels = s.l;
      D.line(c);
      toast("Showing last " + b.textContent);
    }),
);
document.querySelectorAll(".ap li").forEach((li) => {
  li.querySelector(".ok").onclick = () => done(li, "Approved");
  li.querySelector(".no").onclick = () => done(li, "Declined");
});
function done(li, m) {
  li.style.transition = ".4s";
  li.style.opacity = 0;
  li.style.transform = "translateX(40px)";
  setTimeout(() => li.remove(), 400);
  toast(m + ": " + li.querySelector("b").textContent);
}
document.getElementById("wf").onsubmit = (e) => {
  e.preventDefault();
  toast("Workspace saved");
};
