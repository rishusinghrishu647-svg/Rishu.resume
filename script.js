/*
  PERSONALIZE THIS FILE before publishing:
  1) Replace YOUR_EMAIL@example.com with the email address you want to show.
  2) Add a phone number or LinkedIn link in the contact section if you want.
  This is a static site. The login control is only a demo, not real authentication.
*/
const CONTACT_EMAIL = "YOUR_EMAIL@example.com";

const emailLink = document.getElementById("emailLink");
const copyEmail = document.getElementById("copyEmail");
const contactHint = document.getElementById("contactHint");

if (emailLink) {
  emailLink.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Internship Opportunity")}`;
}
if (CONTACT_EMAIL !== "YOUR_EMAIL@example.com" && contactHint) {
  contactHint.textContent = "You can also add a phone number or LinkedIn profile to this section in index.html.";
}

copyEmail?.addEventListener("click", async () => {
  if (CONTACT_EMAIL === "YOUR_EMAIL@example.com") {
    if (contactHint) contactHint.textContent = "First add your real email address in script.js, then this button can copy it.";
    return;
  }
  try {
    await navigator.clipboard.writeText(CONTACT_EMAIL);
    copyEmail.textContent = "Email copied ✓";
    setTimeout(() => { copyEmail.textContent = "Copy email"; }, 1800);
  } catch {
    window.location.href = `mailto:${CONTACT_EMAIL}`;
  }
});

// Download a clean, printable resume as a PDF using the browser's print dialog.
// Choose "Save as PDF" in the destination menu. No third-party PDF library is needed.
document.getElementById("downloadResume")?.addEventListener("click", () => {
  document.body.classList.add("print-resume");
  window.print();
  setTimeout(() => document.body.classList.remove("print-resume"), 700);
});

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
}));

// Scroll reveal animations (respect reduced-motion preference in CSS)
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach(el => observer.observe(el));
} else {
  revealElements.forEach(el => el.classList.add("visible"));
}

// Reading progress bar
const progress = document.getElementById("scrollProgress");
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const percent = max > 0 ? (window.scrollY / max) * 100 : 0;
  if (progress) progress.style.width = `${percent}%`;
}, { passive: true });

// Demo login dialog: intentionally does not send or store credentials.
const loginDialog = document.getElementById("loginDialog");
document.getElementById("loginOpen")?.addEventListener("click", () => loginDialog?.showModal());
document.getElementById("demoLogin")?.addEventListener("click", () => {
  const message = document.getElementById("demoMessage");
  if (message) message.textContent = "Demo only — no account was created and no password was checked.";
});
