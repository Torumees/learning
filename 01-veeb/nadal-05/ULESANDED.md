# Nädal 5 — asünkroonne JS ja fetch (~12 h)

**Materjal:** [OPPETUND.md](OPPETUND.md)
**Käsiraamat:** https://claude.ai/artifact/6ReNXRMfYGeLeqfccDwNix

Kolm osa: **A** konsoolikatsed, et näha, mis järjekorras asjad juhtuvad (2 h),
**B** fetch ja vead (3 h), **C** ilmarakendus kolme olekuga (7 h).

See nädal lõpetab ploki 1. Pärast seda tuleb Vue — ja seal läheb kõik, mida sa
viimased kaks nädalat käsitsi tegid, automaatseks.

---

## Enne alustamist: paigalda Live Server

VS Code → Extensions (Ctrl+Shift+X) → otsi **Live Server** → Install.

Kasutamine: paremklikk `index.html` peal → **Open with Live Server**.

**Miks seda vaja on:** kui avad faili topeltklikiga, on aadress `file:///C:/...` ja su
„origin" on `null`. Osa API-sid keeldub sellega rääkimast. Live Server käivitab päris
kohaliku serveri (`http://127.0.0.1:5500`) ja see probleem kadub. Lisaks laeb ta lehe
automaatselt uuesti, kui sa faili salvestad.

---

# OSA A — Järjekord (~2 h)

Konsoolis (F12 → Console). Siin ei salvesta midagi.

### A1. 1, 3, 2

```js
console.log("1");
setTimeout(() => console.log("2"), 1000);
console.log("3");
```

**Mida sa peaksid nägema:** `1`, siis `3`, siis sekundi pärast `2`.
**Miks oluline:** JS ei jää ootama. Ta paneb ülesande kõrvale ja läheb edasi.

### A2. Null ei muuda midagi

Sama asi, aga `1000` asemel `0`:

```js
console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("3");
```

**Mida sa peaksid nägema:** ikka `1, 3, 2`.
**Miks oluline:** „pane kõrvale" tähendab alati „pärast seda, kui praegune kood on
lõpetanud" — ka nulli korral. Kui see sul peas klõpsab, on asünkroonsus arusaadav.

### A3. Promise ei ole väärtus

```js
const p = fetch("https://api.open-meteo.com/v1/forecast?latitude=59.44&longitude=24.75&current=temperature_2m");
console.log(p);
```

**Mida sa peaksid nägema:** `Promise { <pending> }` — mitte andmeid.
**Miks oluline:** Promise on „siia tuleb väärtus, aga mitte veel". Seda ei saa lugeda
nagu tavalist muutujat.

### A4. Nüüd await'iga

Konsoolis töötab `await` ka ilma `async`-ita (konsool teeb erandi):

```js
const vastus = await fetch("https://api.open-meteo.com/v1/forecast?latitude=59.44&longitude=24.75&current=temperature_2m");
console.log(vastus);
console.log(vastus.ok, vastus.status);
const andmed = await vastus.json();
console.log(andmed);
console.log(andmed.current.temperature_2m);
```

**Mida sa peaksid nägema:** `vastus` on `Response` objekt, `vastus.ok` on `true`,
`status` on `200`. Ja `andmed` on päris objekt, millest viimane rida kaevab välja
Tallinna praeguse temperatuuri.
**Miks oluline:** sa näed oma silmaga, miks kaks `await`-i vaja on — esimene annab
vastuse, teine sisu.

### A5. 404 ei viska viga

```js
const vastus = await fetch("https://api.open-meteo.com/v1/olematu-aadress");
console.log("jõudsin siia!");
console.log(vastus.ok, vastus.status);
```

**Mida sa peaksid nägema:** teade `jõudsin siia!` **ilmub** ja `vastus.ok` on `false`,
`status` on `404`. Punast viga ei ole.
**Miks oluline:** see on selle nädala tähtsaim asi. `fetch` ei kurda halva staatuse
peale — sa pead `vastus.ok` ise kontrollima.

Proovi ka, mis juhtub, kui üritad sellest JSON-i teha:

```js
await vastus.json();
```

**Mida sa peaksid nägema:** nüüd tuleb segane viga. Just seda sa väldidki, kui
kontrollid `vastus.ok`-i enne.

### A on valmis kui
- [ ] Viis katset tehtud
- [ ] Oskad öelda, miks `setTimeout(..., 0)` ikka hiljem jookseb
- [ ] Oskad öelda, millal `fetch` viskab vea ja millal mitte

---

# OSA B — fetch ja vead (~3 h)

Kaust `01-veeb/nadal-05/proov/`, failid `index.html` + `app.js`. Prügikaust, kustutad
nädala lõpus. Ava **Live Serveriga**.

HTML: üks `<button id="lae">`, üks `<p id="ala">`, `<script src="app.js">` lõpus.

### B1. Esimene päring

```js
const nupp = document.querySelector("#lae");
const ala = document.querySelector("#ala");

nupp.addEventListener("click", async () => {
    const vastus = await fetch("https://api.open-meteo.com/v1/forecast?latitude=59.44&longitude=24.75&current=temperature_2m");
    const andmed = await vastus.json();
    ala.textContent = `Tallinnas on ${andmed.current.temperature_2m} °C`;
});
```

**Mida sa peaksid nägema:** klikil ilmub temperatuur.
**Miks oluline:** pane tähele, kuhu `async` käib — `() =>` funktsiooni ette, mitte
`addEventListener`-i ette.

### B2. Võta async ära

Kustuta sõna `async` ja kliki.

**Mida sa peaksid nägema:** konsoolis `SyntaxError: await is only valid in async
functions`.
**Miks oluline:** `await` ja `async` käivad alati paaris. Nüüd tunned selle vea ära.

### B3. Vaata Network'ist

Pane `async` tagasi. Ava F12 → **Network**, kliki nuppu.

Leia nimekirjast `forecast?...` rida ja kliki selle peal. Vaata:
- **Headers** — URL ja Status 200
- **Response** — mida server päriselt tagastas (terve JSON)
- **Timing** — kui kaua võttis

**Miks oluline:** siit näed alati, kas probleem on sinu koodis või päringus. Kui
Response näitab HTML-i seal, kus sa ootasid JSON-i, on URL vale.

### B4. Riku URL meelega

Muuda `forecast` → `forecastXYZ` ja kliki.

**Mida sa peaksid nägema:** Network näitab punast 404. Konsoolis tuleb segane viga
nagu `Unexpected token` või `SyntaxError`. **Veateade ei ütle sulle, et URL on vale.**
**Miks oluline:** see on see, mis juhtub ilma `vastus.ok` kontrollita. Sa otsiksid
tundideks viga oma koodist.

Nüüd lisa kontroll:

```js
if (!vastus.ok) {
    ala.textContent = `Viga: server vastas ${vastus.status}`;
    return;
}
```

**Mida sa peaksid nägema:** nüüd ütleb leht ausalt „Viga: server vastas 404".

### B5. try/catch ja võrk maas

Pane URL õigeks tagasi, mähi kood `try/catch`-i:

```js
nupp.addEventListener("click", async () => {
    try {
        const vastus = await fetch(url);
        if (!vastus.ok) throw new Error(`Server vastas: ${vastus.status}`);
        const andmed = await vastus.json();
        ala.textContent = `Tallinnas on ${andmed.current.temperature_2m} °C`;
    } catch (viga) {
        console.error(viga);
        ala.textContent = "Andmete laadimine ebaõnnestus.";
    }
});
```

Nüüd: F12 → Network → **Throttling** rippmenüü → vali **Offline**. Kliki nuppu.

**Mida sa peaksid nägema:** `catch` käivitub, lehel on sinu teade, konsoolis
`TypeError: Failed to fetch`.
**Miks oluline:** see on päris olukord — kasutaja on rongis ja tunnel tuleb vastu.
Pane Throttling tagasi „No throttling".

### B6. Näe laadimisolekut

Lisa `try` esimeseks reaks `ala.textContent = "Laen...";`

Siis: Network → Throttling → **Slow 3G**. Kliki.

**Mida sa peaksid nägema:** paar sekundit on lehel „Laen...", siis tuleb temperatuur.
**Miks oluline:** kiire internetiga sa ei näe laadimisolekut kunagi ja arvad, et seda
pole vaja. Slow 3G näitab, mida näeb su kasutaja.

### B on valmis kui
- [ ] Kuus katset tehtud, sh 404, offline ja Slow 3G
- [ ] Oskad Network-vaates leida, mida server päriselt tagastas
- [ ] Päevikus kirjas, milline veateade oli kõige segasem ja mida see tegelikult tähendas

---

# OSA C — Ilmarakendus (~7 h)

**Mis valmis saab:** rakendus, mis näitab valitud linna ilma, ja millel on kõik kolm
olekut korralikult lahendatud — laadib, õnnestus, viga.

Kaust `01-veeb/nadal-05/ilm/`: `index.html`, `app.js`, `style.css`.

API: **Open-Meteo** — tasuta, võtmeta, lubab brauseripäringuid.

```
https://api.open-meteo.com/v1/forecast?latitude=59.44&longitude=24.75&current=temperature_2m,wind_speed_10m,weather_code
```

### C1. Linnad

Pane kolm-neli Eesti linna koodi massiivi:

```js
const linnad = [
    { nimi: "Tallinn",  lat: 59.44, lon: 24.75 },
    { nimi: "Tartu",    lat: 58.38, lon: 26.72 },
    { nimi: "Pärnu",    lat: 58.39, lon: 24.50 },
    { nimi: "Narva",    lat: 59.38, lon: 28.19 }
];
```

See on jälle sama andmekuju, mis to-do rakenduses — objektide massiiv.

### C2. HTML

- `<h1>`
- `<select id="linn">` või nupud, millega linna valida
- üks `<div id="ala">`, kuhu tulemus joonistatakse
- nupp „Proovi uuesti" (võib olla peidetud ja ilmuda ainult vea korral)
- `<script src="app.js">` enne `</body>`

Kui kasutad `<select>`-i, täida selle `<option>`-id **JS-iga** `linnad` massiivist —
mitte käsitsi HTML-i. Nii on linnade nimekiri ühes kohas.

### C3. Olek

```js
let olek = "laadib";     // "laadib" | "valmis" | "viga"
let ilm = null;          // API vastus
let veateade = "";
let valitudLinn = linnad[0];
```

### C4. joonista()

Üks funktsioon, kolm haru. Ta ei tee ühtegi päringut — ta ainult joonistab seda, mis
olekus kirjas on.

```js
function joonista() {
    if (olek === "laadib") { /* näita "Laen..." */ return; }
    if (olek === "viga")   { /* näita veateadet + "Proovi uuesti" nupp */ return; }
    /* olek === "valmis" — näita linna nime, temperatuuri, tuult */
}
```

### C5. lae()

```js
async function lae() {
    olek = "laadib";
    joonista();                   // ← näita KOHE, et midagi toimub

    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${valitudLinn.lat}&longitude=${valitudLinn.lon}&current=temperature_2m,wind_speed_10m,weather_code`;
        const vastus = await fetch(url);
        if (!vastus.ok) throw new Error(`Server vastas: ${vastus.status}`);
        ilm = await vastus.json();
        olek = "valmis";
    } catch (viga) {
        console.error(viga);
        olek = "viga";
        veateade = "Ilmaandmeid ei õnnestunud laadida. Kontrolli internetiühendust.";
    }

    joonista();                   // ← joonista lõpptulemus
}
```

Linna vahetamine kutsub `lae()`. Lehe avanemisel kutsu `lae()` üks kord.

### C6. Nõuded

- [ ] Kolm olekut on **kõik** lahendatud ja nähtavad
- [ ] `vastus.ok` on kontrollitud
- [ ] `try/catch` on olemas, `console.error` arendajale ja inimkeelne teade kasutajale
- [ ] Vea korral on nupp, millega uuesti proovida
- [ ] Linna vahetamine laeb uued andmed
- [ ] `<option>`-id on JS-iga tehtud, mitte HTML-i kirjutatud
- [ ] Temperatuur on näidatud ühikuga (`°C`)
- [ ] CSS: `:root` muutujad, `box-sizing`, `max-width` + `margin: 0 auto`, flex
- [ ] Ei raamistikke, ei CDN-e

### C7. Lisaülesanne, kui jõuad

`weather_code` on number, mis tähendab ilmanähtust (0 = selge, 3 = pilves, 61 = vihm
jne — WMO kood). Tee objekt, mis tõlgib numbri eestikeelseks sõnaks:

```js
const ilmaKoodid = { 0: "Selge", 1: "Enamasti selge", 2: "Vahelduv pilvisus", 3: "Pilves" };
```

ja näita sõna, mitte numbrit. Kata vähemalt viis koodi, ülejäänutele „Teadmata".
See õpetab objekti kasutamist tõlketabelina — muster, mida näeb kõikjal.

### C8. Kontrollnimekiri

1. **Avanemine:** leht laeb Tallinna ilma automaatselt
2. **Laadimisolek:** Network → Slow 3G → laadi leht. **Sa pead nägema „Laen..."**
3. **Linna vahetus:** vali Tartu, andmed muutuvad. Vali tagasi Tallinn, muutuvad tagasi
4. **Veaolek:** Network → Offline → vajuta „Proovi uuesti". Lehel on sinu veateade,
   **mitte tühi leht ega katkine kuva**
5. **Taastumine:** pane Online tagasi, vajuta „Proovi uuesti". Andmed tulevad —
   rakendus ei pea vajama lehe uuesti laadimist
6. **Vale URL:** riku URL meelega. Lehel peab olema veateade staatusega, mitte vaikne
   krahh. Pane tagasi
7. **Konsool:** tavalise kasutuse ajal täiesti tühi
8. **Network:** iga päring on 200, ükski ei ole punane
9. **360px:** Ctrl+Shift+M, rakendus kasutatav
10. **W3C:** validator.w3.org, 0 viga
11. **Seletustest:** `app.js` ülalt alla, iga rea kohta valjusti, mis see teeb

### C on valmis kui
- [ ] Kõik 11 kontrollpunkti läbitud
- [ ] Commititud ja pushitud

---

# Kui jääd kinni

Vaata **kõigepealt Network-vaadet**, siis konsooli. 90% fetch-i probleemidest on näha
ühest neist kahest:

| Mida näed | Mida see tähendab |
|---|---|
| Network: punane 404 | URL on vale |
| Network: CORS-i viga | API ei luba brauseripäringuid, või ava Live Serveriga |
| Konsool: `Unexpected token '<'` | server saatis HTML-i, sa ootasid JSON-i → URL vale |
| Konsool: `await is only valid in async` | `async` on funktsiooni eest puudu |
| Konsool: `Cannot read properties of undefined` | JSON-i struktuur on teistsugune kui arvasid — `console.log(andmed)` ja vaata |

Viimane on sel nädalal kõige sagedasem: sa kirjutad `andmed.temperature`, aga päriselt
on see `andmed.current.temperature_2m`. **Logi alati terve vastus välja ja vaata
struktuuri, enne kui hakkad sealt välju kaevama.**

---

# Nädala lõpp

- [ ] Õppetund läbi loetud, 10 kordamisküsimust vastatud (saada vastused mulle)
- [ ] Osa A: viis konsoolikatset
- [ ] Osa B: kuus fetch-katset, `proov/` kustutatud
- [ ] Osa C: ilmarakendus, 11 kontrollpunkti
- [ ] Päevik täidetud, kõik commititud ja pushitud
