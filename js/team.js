
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


// checklist progress
const upd = () => {
  const c = $$("#chk input"),
    n = c.filter((x) => x.checked).length,
    p = Math.round((n / c.length) * 100);
  c.forEach((x) => x.closest("li").classList.toggle("done", x.checked));
  $("#cp").textContent = p + "%";
  $("#cb").style.setProperty("--w", p + "%");
  $("#cb").style.width = p + "%";
};
$$("#chk input").forEach(
  (x) =>
    (x.onchange = () => {
      upd();
      if (x.checked) toast("Nice work! Task completed");
    }),
);
upd();
// kanban
let drag = null;
const cnt = () =>
  $$("#kb .kc").forEach(
    (c) => (c.querySelector("em").textContent = $$(".kcard", c).length),
  );
const bind = (k) => {
  k.ondragstart = () => {
    drag = k;
    k.classList.add("drag");
  };
  k.ondragend = () => {
    k.classList.remove("drag");
    $$(".kc").forEach((c) => c.classList.remove("over"));
  };
};
$$("#kb .kcard").forEach(bind);
$$("#kb .kc").forEach((c) => {
  c.ondragover = (e) => {
    e.preventDefault();
    c.classList.add("over");
  };
  c.ondragleave = () => c.classList.remove("over");
  c.ondrop = (e) => {
    e.preventDefault();
    if (drag) {
      c.append(drag);
      cnt();
      toast("Moved to " + c.querySelector("h4").childNodes[0].textContent);
    }
  };
});
cnt();
$("#nt").onkeydown = (e) => {
  if (e.key === "Enter" && e.target.value.trim()) {
    const k = document.createElement("div");
    k.className = "kcard";
    k.draggable = true;
    k.dataset.p = "med";
    k.innerHTML = `<b></b><small><span class="bdg o">Med</span> New</small>`;
    k.querySelector("b").textContent = e.target.value;
    bind(k);
    $("[data-col=todo]").append(k);
    e.target.value = "";
    cnt();
    toast("Task added");
  }
};
$$("#flt button").forEach(
  (b) =>
    (b.onclick = () => {
      $$("#flt button").forEach((x) => x.classList.remove("on"));
      b.classList.add("on");
      $$("#kb .kcard").forEach(
        (k) =>
          (k.style.display =
            b.dataset.f === "high" && k.dataset.p !== "high" ? "none" : ""),
      );
    }),
);
// timer
let secs = 1500,
  total = 1500,
  iv = null;
const tt = $("#tt"),
  rp = $("#rp"),
  C = 326.7;
const draw = () => {
  tt.textContent =
    String(Math.floor(secs / 60)).padStart(2, "0") +
    ":" +
    String(secs % 60).padStart(2, "0");
  rp.style.strokeDashoffset = C * (1 - secs / total);
};
$("#ts").onclick = () => {
  if (iv) {
    clearInterval(iv);
    iv = null;
    $("#ts").textContent = "Resume";
    $("#ring").classList.remove("run");
  } else {
    $("#ts").textContent = "Pause";
    $("#ring").classList.add("run");
    iv = setInterval(() => {
      secs--;
      draw();
      if (secs <= 0) {
        clearInterval(iv);
        iv = null;
        $("#ts").textContent = "Start";
        $("#ring").classList.remove("run");
        toast("Session complete. Take a break!");
        secs = total;
        draw();
      }
    }, 1000);
  }
};
$("#tr").onclick = () => {
  clearInterval(iv);
  iv = null;
  secs = total;
  draw();
  $("#ts").textContent = "Start";
  $("#ring").classList.remove("run");
};
$$("#pm button").forEach(
  (b) =>
    (b.onclick = () => {
      $$("#pm button").forEach((x) => x.classList.remove("on"));
      b.classList.add("on");
      total = secs = +b.dataset.min * 60;
      clearInterval(iv);
      iv = null;
      $("#ts").textContent = "Start";
      $("#ring").classList.remove("run");
      draw();
    }),
);
draw();
// chat
$("#cform").onsubmit = (e) => {
  e.preventDefault();
  const i = $("#cin"),
    t = i.value.trim();
  if (!t) return;
  const c = $("#chat"),
    m = document.createElement("div");
  m.className = "m out";
  m.textContent = t;
  c.append(m);
  i.value = "";
  c.scrollTop = c.scrollHeight;
  setTimeout(() => {
    const r = document.createElement("div");
    r.className = "m in";
    r.innerHTML = "<small>Priya</small>Got it, thanks Sam!";
    c.append(r);
    c.scrollTop = c.scrollHeight;
  }, 1100);
};
