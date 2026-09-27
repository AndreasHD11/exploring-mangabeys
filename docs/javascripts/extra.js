document.querySelectorAll(".carousel").forEach(el => {
  const imgs = el.querySelectorAll("img");
  let i = 0;

  const caption = document.createElement("div");
  caption.className = "carousel-caption";

  const show = n => {
    imgs[i].classList.remove("active");
    i = (n + imgs.length) % imgs.length;
    imgs[i].classList.add("active");
    caption.textContent = imgs[i].title || "";
    caption.hidden = !imgs[i].title;
  }

  imgs[0].classList.add("active");
  caption.textContent = imgs[0].title || "";
  caption.hidden = !imgs[0].title;
  
  
  const btn = (cls, txt, fn) => Object.assign(document.createElement("button"), {className: `carousel-nav ${cls}`, textContent: txt, onclick: fn});
  el.append(btn("carousel-prev", "‹", () => show(i - 1)), btn("carousel-next", "›", () => show(i + 1)));
});
