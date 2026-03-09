// Formats Date: "DD/MM/YYYY" (Dynamic)
function getFormattedDate(dateStr) {
  const date = dateStr ? new Date(dateStr) : new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function handleLogin() {
  if (
    document.getElementById("username").value === "admin" &&
    document.getElementById("password").value === "admin123"
  ) {
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("dashboard-section").classList.remove("hidden");
    fetchIssues("all");
  } else alert("Error!");
}

async function fetchIssues(type) {
  updateTabUI(type);
  const grid = document.getElementById("grid-container");
  const loader = document.getElementById("loader");
  grid.innerHTML = "";
  loader.classList.remove("hidden");

  try {
    const res = await fetch(
      "https://phi-lab-server.vercel.app/api/v1/lab/issues",
    );
    const data = await res.json();
    const issues = Array.isArray(data) ? data : data.data || [];

    let filtered = issues;
    if (type !== "all")
      filtered = issues.filter((i) => i.status.toLowerCase() === type);

    renderGrid(filtered);
  } catch (err) {
    grid.innerHTML = `<p class="col-span-full text-center py-20 text-red-500">Fetch Failed</p>`;
  } finally {
    loader.classList.add("hidden");
  }
}

function renderGrid(data) {
  const container = document.getElementById("grid-container");
  document.getElementById("count-display").innerText = data.length;

  container.innerHTML = data
    .map(
      (i) => `
                <div onclick="openIssueDetails('${i.id}')" class="issue-card p-8 rounded-[8px] ${i.status === "open" ? "border-open" : "border-closed"}">
                    <div class="flex justify-between items-start mb-6">
                        <div class="w-8 h-8 rounded-full flex items-center justify-center ${i.status === "open" ? "bg-emerald-50 text-emerald-500" : "bg-indigo-50 text-indigo-500"}">
                            <i class="fa-solid fa-circle-dot text-xs"></i>
                        </div>
                        <span class="px-3 py-1 rounded-lg text-[10px] font-black bg-rose-50 text-rose-500 border border-rose-100 uppercase">${i.priority}</span>
                    </div>
                    
                    <h3 class="font-bold text-slate-800 text-lg mb-3 line-clamp-2 h-14 leading-tight">${i.title}</h3>
                    <p class="text-slate-600 text-xs line-clamp-2 mb-8 h-10 leading-relaxed">${i.description}</p>
                    
                    <div class="flex gap-2 mb-8">
                        <span class="tag-badge bg-rose-50 text-rose-400 border-rose-100"><i class="fa-solid fa-bug text-xs"></i> BUG</span>
                        <span class="tag-badge bg-orange-50 text-orange-400 border-orange-100"><i class="fa-solid fa-handshake-angle text-xs"></i> HELP WANTED</span>
                    </div>

                    <div class="flex items-center justify-between pt-6 border-t border-slate-50">
                        <span class="text-[10px] text-slate-600 font-bold uppercase tracking-tight"># by ${i.author}</span>
                        <span class="text-[10px] text-slate-600 font-medium">${getFormattedDate(i.updatedAt)}</span>
                    </div>
                </div>
            `,
    )
    .join("");
}

async function openIssueDetails(id) {
  const modal = document.getElementById("issue_modal");
  modal.showModal();
  document.getElementById("modal-title").innerText = "Loading...";

  try {
    const res = await fetch(
      `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
    );
    const data = await res.json();
    const d = data.data ? data.data : data;

    document.getElementById("modal-title").innerText = d.title;
    document.getElementById("modal-desc").innerText = d.description;
    document.getElementById("modal-author-name").innerText = d.author;
    document.getElementById("modal-assignee").innerText = d.author;
    document.getElementById("modal-date").innerText = getFormattedDate(
      d.updatedAt,
    );

    const prio = document.getElementById("modal-priority");
    prio.innerText = d.priority.toUpperCase();
    prio.className = `px-4 py-1 rounded-full text-[10px] font-black text-white uppercase shadow-sm ${d.priority.toLowerCase() === "high" ? "bg-rose-500" : "bg-orange-400"}`;

    const stat = document.getElementById("modal-status");
    stat.innerText = d.status;
    stat.className = `px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-sm ${d.status.toLowerCase() === "open" ? "bg-emerald-500" : "bg-indigo-600"}`;
  } catch (err) {
    document.getElementById("modal-title").innerText = "Error";
  }
}

async function handleSearch() {
  const query = document.getElementById("search-box").value;
  if (!query) return fetchIssues("all");
  document.getElementById("loader").classList.remove("hidden");
  try {
    const res = await fetch(
      `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${query}`,
    );
    const data = await res.json();
    renderGrid(Array.isArray(data) ? data : data.data || []);
  } catch (e) {
  } finally {
    document.getElementById("loader").classList.add("hidden");
  }
}

function updateTabUI(active) {
  ["all", "open", "closed"].forEach((t) => {
    const btn = document.getElementById("tab-" + t);
    btn.className =
      t === active
        ? "btn btn-sm rounded-xl px-10 h-10 bg-indigo-600 text-white border-none shadow-lg shadow-indigo-100"
        : "btn btn-sm rounded-xl px-10 h-10 bg-slate-100 border-none text-slate-500";
  });
}
