const g = function () {
  const r = document.createElement("link").relList;
  if (r && r.supports && r.supports("modulepreload")) return;
  for (const t of document.querySelectorAll('link[rel="modulepreload"]')) i(t);
  new MutationObserver((t) => {
    for (const e of t)
      if (e.type === "childList")
        for (const u of e.addedNodes)
          u.tagName === "LINK" && u.rel === "modulepreload" && i(u);
  }).observe(document, { childList: !0, subtree: !0 });
  function a(t) {
    const e = {};
    return (
      t.integrity && (e.integrity = t.integrity),
      t.referrerpolicy && (e.referrerPolicy = t.referrerpolicy),
      t.crossorigin === "use-credentials"
        ? (e.credentials = "include")
        : t.crossorigin === "anonymous"
        ? (e.credentials = "omit")
        : (e.credentials = "same-origin"),
      e
    );
  }
  function i(t) {
    if (t.ep) return;
    t.ep = !0;
    const e = a(t);
    fetch(t.href, e);
  }
};
g();
const c = [
    { name: "Desires", displayName: "Desires", artistName: "Ap Dhillon" },
    { name: "Insane", displayName: "Insane", artistName: "Ap Dhillon" },
    { name: "Libaas", displayName: "Libaas", artistName: "Kaka" },
    { name: "Parche", displayName: "Parche", artistName: "Baani Sandhu" },
    { name: "Prada", displayName: "Prada", artistName: "Jass Manak" },
  ],
  p = document.querySelector("img"),
  h = document.querySelector(".title"),
  S = document.querySelector(".artist"),
  s = document.querySelector("audio"),
  N = document.querySelector(".control-next"),
  L = document.querySelector(".control-prev"),
  l = document.querySelector(".control-play"),
  P = document.querySelector(".progress-container"),
  q = document.querySelector(".progress"),
  v = document.querySelector(".curr-duration"),
  $ = document.querySelector(".total-duration");
let d = !1;
function m() {
  (d = !0),
    l.classList.replace("fa-play", "fa-pause"),
    l.setAttribute("title", "Pause"),
    s.play();
}
function E() {
  (d = !1),
    l.setAttribute("title", "Play"),
    l.classList.replace("fa-pause", "fa-play"),
    s.pause();
}
function f(n) {
  (h.textContent = n.displayName),
    (S.textContent = n.artistName),
    (s.src = `./assets/Songs/${n.name}.mp3`),
    n.name === "Insane"
      ? (p.src = `./assets/Img/${n.name}.webp`)
      : (p.src = `./assets/Img/${n.name}.jpeg`);
}
let o = 0;
f(c[o]);
function b() {
  o--, o < 0 && (o += c.length), f(c[o]), m();
}
function y() {
  o++, (o %= c.length), f(c[o]), m();
}
l.addEventListener("click", () => (d ? E() : m()));
L.addEventListener("click", b);
N.addEventListener("click", y);
function x(n) {
  const { duration: r, currentTime: a } = n.srcElement,
    i = (a / r) * 100;
  q.style.width = `${i}%`;
  let t = Math.floor(r / 60),
    e = Math.floor(r % 60);
  e < 10 && (e = `0${e}`),
    e && ($.textContent = `${t}:${e}`),
    (t = Math.floor(a / 60)),
    (e = Math.floor(a % 60)),
    e < 10 && (e = `0${e}`),
    (v.textContent = `${t}:${e}`);
}
function k(n) {
  const r = this.clientWidth,
    a = n.offsetX,
    { duration: i } = s;
  s.currentTime = (a / r) * i;
}
s.addEventListener("timeupdate", x);
P.addEventListener("click", k);
s.addEventListener("ended", y);
