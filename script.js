const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// === Césped en forma de "X" ===
function drawGrass() {
  ctx.strokeStyle = "rgba(255,60,120,0.6)";
  ctx.lineWidth = 2;
  for (let i = 0; i < canvas.width; i += 80) {
    ctx.beginPath();
    ctx.moveTo(i, canvas.height);
    ctx.lineTo(i + 20, canvas.height - 40);
    ctx.lineTo(i + 40, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(i + 40, canvas.height);
    ctx.lineTo(i + 60, canvas.height - 40);
    ctx.lineTo(i + 80, canvas.height);
    ctx.stroke();
  }
}

class Flower {
  constructor(x, y, scale) {
    this.x = x;
    this.y = y;
    this.scale = scale;
    this.particles = [];
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);

    // === Tallo recto ===
    ctx.strokeStyle = "rgba(255,80,140,0.9)";
    ctx.lineWidth = 2 * this.scale;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -100 * this.scale);
    ctx.stroke();

    // === Hojas ===
    ctx.fillStyle = "rgba(255,60,120,0.9)";
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.ellipse(-10 * this.scale, -20 * i * this.scale, 10 * this.scale, 6 * this.scale, Math.PI / 4, 0, 2 * Math.PI);
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(10 * this.scale, -20 * i * this.scale, 10 * this.scale, 6 * this.scale, -Math.PI / 4, 0, 2 * Math.PI);
      ctx.fill();
    }

    // === Flor con 3 pétalos ===
    ctx.translate(0, -100 * this.scale);
    ctx.fillStyle = "rgba(255,160,200,0.9)";
    for (let i = 0; i < 3; i++) {
      ctx.rotate((Math.PI * 2) / 3);
      ctx.beginPath();
      ctx.ellipse(0, -15 * this.scale, 20 * this.scale, 10 * this.scale, 0, 0, 2 * Math.PI);
      ctx.fill();
    }

    // === Centro de la flor ===
    ctx.beginPath();
    ctx.fillStyle = "rgba(255,220,240,1)";
    ctx.arc(0, 0, 6 * this.scale, 0, 2 * Math.PI);
    ctx.fill();

    ctx.restore();

    // === Chispitas ===
    this.particles.push({
      x: this.x + (Math.random() - 0.5) * 80,
      y: this.y - 100 * this.scale + (Math.random() - 0.5) * 80,
      size: Math.random() * 2,
      alpha: 1
    });

    this.particles.forEach((p, i) => {
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,200,255,${p.alpha})`;
      ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
      ctx.fill();
      p.alpha -= 0.01;
      if (p.alpha <= 0) this.particles.splice(i, 1);
    });
  }
}

// === Grupo de flores ===
const flowers = [
  new Flower(canvas.width / 2 - 50, canvas.height - 80, 1),
  new Flower(canvas.width / 2, canvas.height - 80, 1),
  new Flower(canvas.width / 2 + 50, canvas.height - 80, 1)
];

function animate() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawGrass();
  flowers.forEach(flower => flower.draw());

  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
