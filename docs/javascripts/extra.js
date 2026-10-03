function initCarousels() {
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
}

document$.subscribe(initCarousels);

const blogCountries = {
  NO: "norway/",
  TZ: "tanzania/"
};

document$.subscribe(function () {
  const el = document.getElementById("blog-map");
  if (!el) return;

  const map = new jsVectorMap({
    selector: "#blog-map",
    map: "world",
    zoomButtons: false,
    backgroundColor: "transparent",
    regionStyle: {
      initial: { fill: "#747171" },
      hover: { fill: "#d3d3d3", cursor: "default" }
    },
    series: {
      regions: [{
        values: Object.fromEntries(Object.keys(blogCountries).map(c => [c, 1])),
        attribute: "fill",
        scale: ["#179d13", "#179d13"]
      }]
    },
    onRegionTooltipShow(event, tooltip, code) {
      if (!blogCountries[code]) tooltip.el.style.display = "none";
    },
    onRegionClick(event, code) {
      if (blogCountries[code]) window.location.href = blogCountries[code];
    }
  });

  window.addEventListener("resize", () => map.updateSize());
});

