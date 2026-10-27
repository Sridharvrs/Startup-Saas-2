
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

// ========================================
// NAVIGATION LINK ANIMATION
// ========================================
const links = $("#links");
const blob = links ? $(".blob", links) : null;

const mv = (a) => {
  if (!blob || !a) return;

  blob.style.width = a.offsetWidth + "px";
  blob.style.transform = `translateX(${a.offsetLeft}px)`;
};

const cur = links ? $("a.on", links) : null;

if (cur) {
  setTimeout(() => mv(cur), 300);
}

if (links && blob) {
  $$("a", links).forEach((a) => {
    a.addEventListener("mouseenter", () => mv(a));
  });

  links.addEventListener("mouseleave", () => {
    if (cur) {
      mv(cur);
    } else {
      blob.style.width = "0";
    }
  });
}

addEventListener("resize", () => {
  if (cur) mv(cur);
});

// ========================================
// MOBILE NAVIGATION DRAWER
// ========================================
const dr = $("#drawer");
const veil = $("#veil");
const burger = $("#burger");
const dx = $("#dx");

if (dr) {
  $$("a", dr).forEach((a, i) => {
    a.style.setProperty("--i", i);
  });
}

const tog = (open) => {
  if (!dr || !veil) return;

  dr.classList.toggle("open", open);
  veil.classList.toggle("show", open);
  document.body.style.overflow = open ? "hidden" : "";
};

if (burger) burger.addEventListener("click", () => tog(true));
if (dx) dx.addEventListener("click", () => tog(false));
if (veil) veil.addEventListener("click", () => tog(false));

// ========================================
// LOGIN BUTTON REDIRECT
// No modal required
// ========================================
$$("[data-login]").forEach((button) => {
  button.addEventListener("click", () => {
    tog(false);
    window.location.href = "login.html";
  });
});

// Support a button with id="loginBtn", if present.
const loginBtn = $("#loginBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    window.location.href = "login.html";
  });
}

// ========================================
// CLOSE MOBILE DRAWER WITH ESCAPE
// ========================================
addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    tog(false);
  }
});

// ========================================
// SCROLL PROGRESS BAR
// ========================================
const bar = $("#bar");

const updateProgress = () => {
  if (!bar) return;

  const h = document.documentElement;
  const scrollableHeight = h.scrollHeight - h.clientHeight;

  const progress =
    scrollableHeight > 0 ? (h.scrollTop / scrollableHeight) * 100 : 0;

  bar.style.width = progress + "%";
};

addEventListener("scroll", updateProgress, { passive: true });
addEventListener("resize", updateProgress);
updateProgress();

// ========================================
// POINTER GLOW EFFECT
// ========================================
const glow = $("#glow");

if (glow) {
  addEventListener("pointermove", (event) => {
    glow.style.left = event.clientX + "px";
    glow.style.top = event.clientY + "px";
  });
}

// ========================================
// REVEAL ANIMATION DELAYS
// ========================================
$$("[data-a]").forEach((el) => {
  const siblings = [...el.parentNode.children].filter((child) =>
    child.hasAttribute("data-a")
  );

  el.style.setProperty("--d", siblings.indexOf(el) * 0.1 + "s");
});

// ========================================
// ANIMATED COUNTERS
// ========================================
const count = (el) => {
  if (el.dataset.counted === "true") return;

  el.dataset.counted = "true";

  const target = Number(el.dataset.count);
  const suffix = el.dataset.suf || "";

  if (!Number.isFinite(target)) return;

  const start = performance.now();
  const duration = 1600;

  (function animate(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    el.textContent =
      Math.round(target * eased).toLocaleString() + suffix;

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  })(start);
};

// ========================================
// SCROLL REVEAL + COUNTERS
// ========================================
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");

          $$("[data-count]", entry.target).forEach(count);

          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  $$("[data-a]").forEach((el) => io.observe(el));

  const io2 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        count(entry.target);
        io2.unobserve(entry.target);
      }
    });
  });

  $$("[data-count]").forEach((el) => io2.observe(el));
} else {
  $$("[data-a]").forEach((el) => el.classList.add("in"));
  $$("[data-count]").forEach(count);
}

// ========================================
// CARD TILT EFFECT
// ========================================
$$("[data-tilt]").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    card.style.transition = "box-shadow .3s";
    card.style.transform =
      `perspective(700px) rotateY(${x * 9}deg) ` +
      `rotateX(${-y * 9}deg) translateY(-4px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transition = "";
    card.style.transform = "";
  });
});
