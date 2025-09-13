// --- Simple persistent state using localStorage ---
const STORAGE_KEY = "skillswap.profile.v1";

const state = {
  teach: [],
  learn: [],
};

// Utilities
const normalize = s => s.trim().replace(/\s+/g, " ");
const isEmpty = s => !s || !s.trim();
const uniqMerge = (arr, items) => {
  const set = new Set(arr.map(v => v.toLowerCase()));
  items.forEach(it => {
    const n = it.toLowerCase();
    if (!set.has(n)) { set.add(n); arr.push(it); }
  });
  return arr;
};
const splitTokens = (val) =>
  val.split(",").map(normalize).filter(Boolean);

// DOM
const els = {
  teachInput: document.getElementById("teachInput"),
  learnInput: document.getElementById("learnInput"),
  teachAddBtn: document.getElementById("teachAddBtn"),
  learnAddBtn: document.getElementById("learnAddBtn"),
  teachChips: document.getElementById("teachChips"),
  learnChips: document.getElementById("learnChips"),
  saveBtn: document.getElementById("saveBtn"),
  clearBtn: document.getElementById("clearBtn"),
  toast: document.getElementById("toast"),
};

// Load persisted data
function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state.teach = Array.isArray(parsed.teach) ? parsed.teach : [];
      state.learn = Array.isArray(parsed.learn) ? parsed.learn : [];
    }
  } catch {}
}

// Save to localStorage
function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    teach: state.teach,
    learn: state.learn
  }));
  showToast();
}

// Render chips
function render() {
  renderChips("teach");
  renderChips("learn");
}

function renderChips(type) {
  const wrap = type === "teach" ? els.teachChips : els.learnChips;
  const list = state[type];
  wrap.innerHTML = "";
  list.forEach((skill, idx) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.innerHTML = `
      <span>${skill}</span>
      <button type="button" aria-label="Remove ${skill}" data-type="${type}" data-idx="${idx}">×</button>
    `;
    wrap.appendChild(chip);
  });
}

// Add skill(s)
function addSkills(type, rawValue) {
  if (isEmpty(rawValue)) return;
  const tokens = splitTokens(rawValue);
  const cleaned = tokens
    .map(t => t.replace(/[^\w\s+#.-]/g, "")) // keep common symbols
    .filter(Boolean);
  uniqMerge(state[type], cleaned);
  render();
}

// Events
els.teachAddBtn.addEventListener("click", () => {
  addSkills("teach", els.teachInput.value);
  els.teachInput.value = "";
  els.teachInput.focus();
});

els.learnAddBtn.addEventListener("click", () => {
  addSkills("learn", els.learnInput.value);
  els.learnInput.value = "";
  els.learnInput.focus();
});

["teachInput","learnInput"].forEach(id => {
  const input = document.getElementById(id);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const type = id.startsWith("teach") ? "teach" : "learn";
      addSkills(type, input.value);
      input.value = "";
    }
  });
  // Convert trailing comma to add immediately
  input.addEventListener("input", (e) => {
    const v = e.target.value;
    if (/, $|,$/.test(v)) {
      const type = id.startsWith("teach") ? "teach" : "learn";
      addSkills(type, v.replace(/,$/, ""));
      e.target.value = "";
    }
  });
});

// Remove chip (event delegation)
[els.teachChips, els.learnChips].forEach(container => {
  container.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-type]");
    if (!btn) return;
    const type = btn.getAttribute("data-type");
    const idx = Number(btn.getAttribute("data-idx"));
    state[type].splice(idx, 1);
    renderChips(type);
  });
});

// Save & Clear
els.saveBtn.addEventListener("click", () => {
  save();
});

els.clearBtn.addEventListener("click", () => {
  if (confirm("Clear all skills from your wall?")) {
    state.teach = [];
    state.learn = [];
    render();
    save();
  }
});

// Toast feedback
let toastTimer = null;
function showToast() {
  els.toast.style.display = "block";
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    els.toast.style.display = "none";
  }, 1600);
}

// Initialize
load();
render();
