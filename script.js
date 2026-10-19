// --- Befintliga funktioner (om element finns) ---
const knapp = document.querySelector("#visa-mer");
const mer = document.querySelector("#mer");

if (knapp && mer) {
    mer.classList.add("gomd");
    function visaMer() {
        mer.classList.toggle("gomd");
        if (mer.classList.contains("gomd")) {
            knapp.textContent = "Visa mer";
            knapp.setAttribute("aria-expanded", "false");
        } else {
            knapp.textContent = "Visa mindre";
            knapp.setAttribute("aria-expanded", "true");
        }
    }
    knapp.addEventListener("click", visaMer);
}

const kopiera = document.querySelector("#kopiera");
if (kopiera) {
    function kopieraMail() {
        navigator.clipboard.writeText("alice_hedlund@msn.com");
        kopiera.textContent = "Kopierat!";
    }
    kopiera.addEventListener("click", kopieraMail);
}

// --- Förstora bilder vid klick (Lightbox modal) ---
const modal = document.querySelector("#bild-modal");
const modalBild = document.querySelector("#modal-bild");
const modalBildtext = document.querySelector("#modal-bildtext");
const modalStang = document.querySelector("#modal-stang");
const fritidsBilder = document.querySelectorAll(".foto-rad img");

function oppnaModal(bild) {
    modalBild.src = bild.src;
    modalBild.alt = bild.alt;
    modalBildtext.textContent = bild.alt;
    modal.classList.add("aktiv");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function stangModal() {
    modal.classList.remove("aktiv");
    modal.setAttribute("aria-hidden", "true");
    modalBild.src = "";
    document.body.style.overflow = "";
}

fritidsBilder.forEach((bild) => {
    bild.addEventListener("click", () => oppnaModal(bild));
    bild.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            oppnaModal(bild);
        }
    });
});

if (modalStang) {
    modalStang.addEventListener("click", (e) => {
        e.stopPropagation();
        stangModal();
    });
}

if (modal) {
    // Klicka på bakgrunden för att stänga
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            stangModal();
        }
    });

    // Stäng med Escape-tangenten
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("aktiv")) {
            stangModal();
        }
    });
}

// --- Mörkläge (Dark mode) knapp uppe i vänstra hörnet ---
const temaKnapp = document.createElement("button");
temaKnapp.id = "morklage-knapp";
temaKnapp.className = "morklage-knapp";
temaKnapp.setAttribute("type", "button");

// Kontrollera om användaren har sparat val eller föredrar mörkt tema i systemet
const sparatTema = localStorage.getItem("tema");
const foredrarMorkt = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

if (sparatTema === "morkt" || (!sparatTema && foredrarMorkt)) {
    document.body.classList.add("morkt-lage");
}

function uppdateraTemaKnapp() {
    const arMorkt = document.body.classList.contains("morkt-lage");
    temaKnapp.innerHTML = `<span class="knapp-ikon" aria-hidden="true">${arMorkt ? "☀️" : "🌙"}</span><span class="knapp-text">${arMorkt ? "Ljust läge" : "Mörkt läge"}</span>`;
    const etikett = arMorkt ? "Växla till ljust läge" : "Växla till mörkt läge";
    temaKnapp.setAttribute("aria-label", etikett);
    temaKnapp.setAttribute("title", etikett);
}

uppdateraTemaKnapp();

temaKnapp.addEventListener("click", () => {
    document.body.classList.toggle("morkt-lage");
    const arMorkt = document.body.classList.contains("morkt-lage");
    localStorage.setItem("tema", arMorkt ? "morkt" : "ljust");
    uppdateraTemaKnapp();
});

// Lägg till knappen längst upp i bodyn så den hamnar först i tab-ordningen
document.body.prepend(temaKnapp);