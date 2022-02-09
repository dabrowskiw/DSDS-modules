const papers = document.querySelectorAll(".papers .entry:not(.header)")
const search = document.getElementById("search");

function filter(value) {
    const lower = value.trim().toLowerCase();

    for (let paper of papers) {
        const titleEl = paper.querySelector(".papertitle");
        const title = titleEl.innerHTML.toLowerCase();
        const visible = lower.length === 0 || title.startsWith(lower);
        paper.style.display = visible ? "" : "none";
    }
}

search.addEventListener("input", (e) => filter(search.value));
