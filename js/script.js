const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) root.setAttribute("data-theme", savedTheme);

function updateThemeIcon() {
  const dark = root.getAttribute("data-theme") === "dark";
  themeToggle.textContent = dark ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
}
updateThemeIcon();

themeToggle.addEventListener("click", () => {
  const dark = root.getAttribute("data-theme") === "dark";
  const next = dark ? "light" : "dark";
  if (next === "light") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", "dark");
  localStorage.setItem("portfolio-theme", next);
  updateThemeIcon();
});

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
