const pealkiri = document.querySelector('#pealkiri');
console.log(pealkiri);
pealkiri.textContent = "Muudetud";
pealkiri.textContent = "<b>paks tekst</b>";
pealkiri.innerHTML = "<b>paks tekst</b>";

const nupp = document.querySelector("#nupp");
nupp.addEventListener("click", () => {
    pealkiri.classList.toggle("tehtud");
});

const vorm = document.querySelector("#vorm");
const sisend = document.querySelector("#sisend");

vorm.addEventListener("submit", (sundmus) => {
    sundmus.preventDefault();
    console.log("sisestati:", sisend.value);
});

const loend = document.querySelector("#loend");
const nimed = ["Anna", "Mart", "Liis"];

function joonista(){
    loend.innerHTML = "";
    for (const nimi of nimed) {
        const li = document.createElement("li");
        li.textContent = nimi;
        loend.append(li);
    }
}

joonista();
joonista();