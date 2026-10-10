let ulesanded = [];
const loend = document.querySelector("#ulesanded");
const loendur = document.querySelector("#loendur")
const tekstvali = document.querySelector("#tekst");
const vorm = document.querySelector("#vorm");

vorm.addEventListener("submit", (sundmus) => {
    sundmus.preventDefault();
    lisa(tekstvali.value)
    tekstvali.value = "";
})

const salvestatud = localStorage.getItem("ulesanded");
if(salvestatud){
    ulesanded = JSON.parse(salvestatud);
}
joonista();

function joonista() {
    loend.innerHTML = ""
    for (const u of ulesanded) {
        const li = document.createElement("li");
        li.textContent = u.tekst;
        if (u.tehtud) li.classList.add("tehtud");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "x";
        deleteButton.addEventListener("click", () => {
            kustuta(u.id);
        });
        li.append(deleteButton)
        loend.append(li);
        const tehtudCheckbox = document.createElement("input")
        tehtudCheckbox.type = 'checkbox'
        li.append(tehtudCheckbox)
        tehtudCheckbox.checked = u.tehtud
        tehtudCheckbox.addEventListener("click", () => {
            tehtudUlesanne(u.id);
        });
    }
    const tegemata = ulesanded.filter(u => !u.tehtud).length;
    loendur.textContent = `${tegemata} tegemata, ${ulesanded.length} kokku`;
    localStorage.setItem("ulesanded", JSON.stringify(ulesanded))
}

function lisa(uusTekst) {
    const puhas = uusTekst.trim()
    if (puhas === "") return;
    ulesanded.push({id: Date.now(), tekst: puhas, tehtud: false});
    joonista();
}

function kustuta(id){
    ulesanded = ulesanded.filter(u => u.id !== id);
    joonista();
}

function tehtudUlesanne(id){
    const u = ulesanded.find(x => x.id === id);
    u.tehtud = !u.tehtud;
    joonista();
}