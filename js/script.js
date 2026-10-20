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

// Season Switcher Functionality
document.addEventListener('DOMContentLoaded', () => {
  const seasonButtons = document.querySelectorAll('.season-btn');
  const seasonContents = document.querySelectorAll('.season-content');

  seasonButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetSeason = button.getAttribute('data-season');

      // Update active button state
      seasonButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Switch displayed season content
      seasonContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === `${targetSeason}-content`) {
          content.classList.add('active');
        }
      });
    });
  });
});
// Season Arrow Carousel Navigation
document.addEventListener('DOMContentLoaded', () => {
  const contents = document.querySelectorAll('.season-content');
  const prevBtn = document.getElementById('prev-season');
  const nextBtn = document.getElementById('next-season');
  const eyebrowEl = document.getElementById('season-eyebrow');
  const titleEl = document.getElementById('season-title');

  if (!contents.length || !prevBtn || !nextBtn) return;

  let currentIndex = 0; // Starts at Season II (index 0)

  function updateSeason(index) {
    contents.forEach((content, i) => {
      content.classList.remove('active');
      if (i === index) {
        content.classList.add('active');
        // Update header texts dynamically from data attributes
        eyebrowEl.textContent = content.getAttribute('data-eyebrow');
        titleEl.textContent = content.getAttribute('data-title');
      }
    });
  }

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % contents.length;
    updateSeason(currentIndex);
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + contents.length) % contents.length;
    updateSeason(currentIndex);
  });
});
