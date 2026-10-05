const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function animateNumber(el, target, decimals = 0, prefix = "", suffix = "") {
  if (reduceMotion) {
    el.textContent = prefix + target.toFixed(decimals) + suffix;
    return;
  }

  const duration = 1050;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    const value = target * eased;
    el.textContent = prefix + value.toFixed(decimals) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

window.addEventListener("load", () => {
  const stats = document.querySelectorAll(".hero-proof .proof-stat strong");
  setTimeout(() => animateNumber(stats[0], 127, 0, "+", "%"), 480);
  setTimeout(() => animateNumber(stats[1], 3.8, 1, "", "×"), 560);
  setTimeout(() => animateNumber(stats[2], 42, 0, "", "M"), 640);
});

const heroProof = document.querySelector(".hero-proof");
if (heroProof && !reduceMotion) {
  window.addEventListener("scroll", () => {
    const y = Math.min(window.scrollY * 0.035, 28);
    heroProof.style.transform = `translateY(${-y}px)`;
  }, { passive: true });
}
