
/* INTRO ANIMATION */

window.addEventListener("load", () => {
  const imageWrapper = document.getElementById("imageWrapper");
  const introText = document.getElementById("introText");

  if (imageWrapper) {
    imageWrapper.classList.add("final");
  }

  if (introText) {
    introText.classList.add("show");
  }
});


/* INTRO SLIDESHOW: PROFILE AND PHOTO 10 ONLY */

const profileImages = document.querySelectorAll(".profile-img");
let profileIndex = 0;

if (profileImages.length > 1) {
  setInterval(() => {
    profileImages[profileIndex].classList.remove("active");

    profileIndex = (profileIndex + 1) % profileImages.length;

    profileImages[profileIndex].classList.add("active");
  }, 3000);
}


/* SKILLS ANIMATION */

const skillCards = document.querySelectorAll(".skill-card");

if ("IntersectionObserver" in window) {
  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          skillsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  skillCards.forEach((card) => skillsObserver.observe(card));
} else {
  skillCards.forEach((card) => card.classList.add("show"));
}


/* FLOATING BACKGROUND BUBBLES */

const canvas = document.getElementById("bgCanvas");

if (canvas) {
  const ctx = canvas.getContext("2d");

  if (ctx) {
    function resizeCanvas() {
      const ratio = window.devicePixelRatio || 1;

      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const bubbles = Array.from({ length: 65 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 5 + 2,
      speed: Math.random() * 0.4 + 0.2,
      opacity: Math.random() * 0.25 + 0.1
    }));

    function animateBubbles() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      bubbles.forEach((bubble) => {
        bubble.y -= bubble.speed;

        if (bubble.y < -bubble.r) {
          bubble.y = window.innerHeight + bubble.r;
          bubble.x = Math.random() * window.innerWidth;
        }

        ctx.beginPath();
        ctx.arc(
          bubble.x,
          bubble.y,
          bubble.r,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = `rgba(255, 190, 150, ${bubble.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animateBubbles);
    }

    animateBubbles();
  }
}


/* TARGET EXPERIENCE SLIDESHOW */

const experiencePhotos = document.querySelectorAll(".experience-photo");
const experienceDots = document.querySelectorAll(".experience-dot");

let experiencePhotoIndex = 0;

if (experiencePhotos.length > 1) {
  experiencePhotos.forEach((photo, index) => {
    photo.classList.toggle("active", index === 0);
  });

  experienceDots.forEach((dot, index) => {
    dot.classList.toggle("active", index === 0);
  });

  setInterval(() => {
    experiencePhotos[experiencePhotoIndex].classList.remove("active");

    if (experienceDots[experiencePhotoIndex]) {
      experienceDots[experiencePhotoIndex].classList.remove("active");
    }

    experiencePhotoIndex =
      (experiencePhotoIndex + 1) % experiencePhotos.length;

    experiencePhotos[experiencePhotoIndex].classList.add("active");

    if (experienceDots[experiencePhotoIndex]) {
      experienceDots[experiencePhotoIndex].classList.add("active");
    }
  }, 3000);
}


/* CONTACT FORM: OPEN VISITOR'S EMAIL APP */

/* CONTACT FORM: OPEN GMAIL IN A NEW TAB */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    if (!name || !email || !message) {
      contactForm.reportValidity();
      return;
    }

    const recipient = "vishwakarmadivyanshijan10@gmail.com";

    const subject = `Portfolio message from ${name}`;

    const body =
      `Name: ${name}\n` +
      `Email: ${email}\n\n` +
      `Message:\n${message}`;

    const gmailUrl =
      "https://mail.google.com/mail/?view=cm&fs=1" +
      "&to=" + encodeURIComponent(recipient) +
      "&su=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    window.open(gmailUrl, "_blank", "noopener,noreferrer");
  });
}
