window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("leaf-container");

  const leafImages = [
    "assets/leaf.gif",
    "assets/orange_leaf.gif"
  ];

  const LEAF_COUNT = 8;
  const leaves = [];

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createLeaf() {
    const el = document.createElement("img");
    el.className = "leaf";
    el.src = leafImages[Math.floor(Math.random() * leafImages.length)];

    const leaf = {
      el,
      x: random(0, window.innerWidth),
      y: random(0, window.innerHeight), // IMPORTANT: full screen spawn
      vx: random(-0.6, 0.6),
      vy: random(0.8, 2.2),
      rot: random(0, 360),
      vr: random(-1.5, 1.5)
    };

    container.appendChild(el);
    leaves.push(leaf);
  }

  for (let i = 0; i < LEAF_COUNT; i++) {
    createLeaf();
  }

  function update() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    for (const l of leaves) {
      l.x += l.vx;
      l.y += l.vy;
      l.rot += l.vr;

      // horizontal wrap
      if (l.x > w + 60) l.x = -60;
      if (l.x < -60) l.x = w + 60;

      // vertical reset (THIS fixes “only top of page” issue)
      if (l.y > h + 60) {
        l.y = -60;
        l.x = random(0, w);
      }

      l.el.style.transform =
        `translate(${l.x}px, ${l.y}px) rotate(${l.rot}deg)`;
    }

    requestAnimationFrame(update);
  }

  update();
});