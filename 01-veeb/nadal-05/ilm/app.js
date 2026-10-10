const linnad = [
    { nimi: "Tallinn", lat: 59.44, lon: 24.75 },
    { nimi: "Tartu",   lat: 58.38, lon: 26.72 },
    { nimi: "Pärnu",   lat: 58.39, lon: 24.50 },
    { nimi: "Narva",   lat: 59.38, lon: 28.19 }
];
const linna_valik = document.querySelector("#linn");
const oleku_tekst = document.querySelector("#olek");

let olek = "";
let ilm = null;
let veateade = "";
let valitudLinn = linnad[0];


// Kuva valikuna linnad ning võta need massiivist
for (const linn of linnad) {
    const valik = document.createElement("option")
    valik.textContent = linn.nimi
    valik.value = linn.nimi
    linna_valik.append(valik)
}

linna_valik.addEventListener('change', () => {
    valitudLinn = linnad.find(l => l.nimi === linna_valik.value);
    lae();
})

document.querySelector("#uuesti").addEventListener("click", lae)

function joonista() {
    if (olek === "laadib") {
        oleku_tekst.textContent = "Laen..."
    }

    if (olek === "viga") {
        oleku_tekst.textContent = veateade
    }

    if (olek === "valmis") {
        oleku_tekst.textContent = `${valitudLinn.nimi} on ${ilm.current.temperature_2m} °C, tuul ${ilm.current.wind_speed_10m} m/s`;
    }
}


async function lae() {
    olek = "laadib";
    joonista();

    try {
        const url =`https://api.open-meteo.com/v1/forecast?latitude=${valitudLinn.lat}&longitude=${valitudLinn.lon}&current=temperature_2m,wind_speed_10m,weather_code`;
        const vastus = await fetch(url);
        if(!vastus.ok) throw new Error(`Server vastas: ${vastus.status}`);
        ilm = await vastus.json();
        olek = "valmis";
    } catch (viga) {
        console.error(viga);
        olek = "viga";
        veateade = "Ilmaandmeid ei õnnestunud laadida. Kontrolli internetiühendust.";
    }

    joonista();
}

lae();