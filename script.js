
window.addEventListener("load", () => {
  document.getElementById("imageWrapper").classList.add("final");
  document.getElementById("introText").classList.add("show");
});


const profileImages = document.querySelectorAll(".profile-img");
let profileIndex = 0;

setInterval(() => {
  profileImages[profileIndex].classList.remove("active");
  profileIndex = (profileIndex + 1) % profileImages.length;
  profileImages[profileIndex].classList.add("active");
}, 1800);


const skillCards = document.querySelectorAll(".skill-card");
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => e.isIntersecting && e.target.classList.add("show"));
}, { threshold: 0.3 });
skillCards.forEach(card => observer.observe(card));


const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let bubbles = Array.from({ length: 90 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 6 + 3,
  s: Math.random() * 0.6 + 0.3,
  o: Math.random() * 0.4 + 0.2
}));

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bubbles.forEach(b => {
    b.y -= b.s;
    if (b.y < 0) b.y = canvas.height;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,190,150,${b.o})`;
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();
