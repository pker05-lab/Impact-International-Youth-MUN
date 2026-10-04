const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const documents = [
  {
    name: "Conference Information",
    type: "TXT",
    path: "documents/text.txt",
    description: "Season I"
  },
  {
    name: "Working Paper Template",
    type: "PDF",
    path: "documents/Templates/IIMUN S1 Working Paper Template.pdf",
    description: "Template for submitting the Working Paper"
  },
  {
    name: "Position Paper Template",
    type: "PDF",
    path: "documents/Templates/IIMUN S1 Working Paper Template.pdf",
    description: "Template for submitting the Position Paper"
  },
  {
    name: "IIMUN",
    type: "PDF",
    path: "documents/Templates/IIMUN guide.pdf",
    description: "The Official Guide to IIMUN"
  }
];

const list = document.getElementById("documents-list");
const count = document.getElementById("document-count");

if (count) {
  count.textContent = `${documents.length} document${documents.length === 1 ? "" : "s"}`;
}

if (list) {
  documents.forEach(doc => {
    const row = document.createElement("div");
    row.className = "document-row";
    row.innerHTML = `
      <div class="document-info">
        <div class="document-icon">${doc.type}</div>
        <div>
          <div class="document-name">${doc.name}</div>
          <span class="document-type">${doc.description}</span>
        </div>
      </div>
      <a class="document-open" href="${encodeURI(doc.path)}" target="_blank" rel="noopener">Open ↗</a>
    `;
    list.appendChild(row);
  });
}

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
