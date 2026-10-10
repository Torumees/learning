# Nädal 4 — JavaScripti alused (~12 h)

**Materjal:** [OPPETUND.md](OPPETUND.md)
**Käsiraamat:** https://claude.ai/artifact/6ReNXRMfYGeLeqfccDwNix

Kolm osa: **A** konsoolis katsetamine, et tunnetada vahet Pythoniga (2 h),
**B** DOM-i katsed (3 h), **C** to-do rakendus (7 h).

Endiselt: mitte ühtegi kopeeritud rida. Küsi selgitust, ära kopeeri.

**Ja üks asi eelmisest nädalast kaasa:** iga osa lõpus on kontrollnimekiri. Käi see
päriselt läbi. JS-i puhul on see lihtsam kui CSS-is — konsool ütleb sulle otse, kui
midagi katki, aga ainult siis, kui sa sinna vaatad.

---

# OSA A — Konsool (~2 h)

**Kuidas:** ava ükskõik milline leht, F12 → Console. Kirjuta rida, Enter, vaata vastust.
Siin ei pea midagi salvestama — see on tunnetuse saamiseks.

### A1. Kolm võrdusmärki

Kirjuta need ükshaaval ja vaata vastust:

```js
5 === 5
5 === "5"
5 == "5"
"" == 0
null == undefined
null === undefined
```

**Mida sa peaksid nägema:** `==` ütleb mitmel juhul `true`, kus `===` ütleb `false`.
**Miks oluline:** sa näed oma silmaga, miks `==` on ohtlik. Pythoni `==` käitub nagu
JS-i `===`, nii et `===` on see, millega sa harjunud oled.

### A2. Tõene ja väär — Pythoni lõks

```js
if ([]) { console.log("tühi massiiv on tõene"); }
if ({}) { console.log("tühi objekt on tõene"); }
if ("") { console.log("seda ei näe"); }
if (0) { console.log("seda ka ei näe"); }

Boolean([])
Boolean("")
```

**Mida sa peaksid nägema:** kaks esimest teadet tulevad, kaks viimast ei tule.
**Miks oluline:** Pythonis oleks `if []` väär. JS-is on tõene. See on üks sagedasemaid
vigu Pythonist tulijatel. Pärast seda katset sa tead, et tühjust kontrollitakse
`arr.length === 0`-ga.

### A3. Massiivimeetodid

```js
const arvud = [1, 2, 3, 4, 5];

arvud.map(x => x * 2)
arvud.filter(x => x > 2)
arvud.find(x => x > 2)
arvud
```

**Mida sa peaksid nägema:** `map` annab `[2,4,6,8,10]`, `filter` annab `[3,4,5]`,
`find` annab `3` (üks arv, mitte massiiv). Ja viimane rida näitab, et `arvud` on
**ikka `[1,2,3,4,5]`** — kumbki meetod ei muutnud seda.
**Miks oluline:** `filter` on see, millega sa osas C ülesandeid kustutad.

### A4. Objektide massiiv

```js
const ulesanded = [
    { id: 1, tekst: "Osta piim", tehtud: false },
    { id: 2, tekst: "Õpi JS", tehtud: true }
];

ulesanded[0].tekst
ulesanded.filter(u => !u.tehtud)
ulesanded.find(u => u.id === 2)
console.table(ulesanded)
```

**Mida sa peaksid nägema:** `console.table` joonistab konsooli päris tabeli.
**Miks oluline:** see on andmekuju, mis tuleb sul 5. nädalal API-st, 13. nädalal su
enda backendist ja 19. nädalal andmebaasist. Harju ära.

### A5. Tee Pythoni asi JS-is

Kirjuta need kolm asja JS-is, ilma õppetunni tabelisse vaatamata. Kui jääd kinni,
vaata — aga proovi enne peast.

1. Funktsioon, mis võtab nime ja tagastab `"Tere, Egert!"`
2. Tsükkel, mis prindib arvud 1 kuni 5
3. Funktsioon, mis võtab massiivi arve ja tagastab ainult paarisarvud

**Miks oluline:** need kolm asja oskad sa Pythonis magades. Siin on näha, et sa ei
õpi programmeerimist uuesti — ainult kirjapilti.

### A on valmis kui
- [ ] Kõik viis punkti läbi tehtud konsoolis
- [ ] Oskad öelda, miks `if (minuMassiiv)` ei kontrolli tühjust
- [ ] Päevikus kirjas, mis JS-i juures kõige ootamatum oli

---

# OSA B — DOM-i katsed (~3 h)

**Kuidas:** tee kaust `01-veeb/nadal-04/proov/` ja sinna `index.html` + `app.js`.
See on prügikaust, mille sa nädala lõpus kustutad. HTML võib olla minimaalne:

```html
<!DOCTYPE html>
<html lang="et">
<head>
    <meta charset="UTF-8">
    <title>Proov</title>
</head>
<body>
    <h1 id="pealkiri">Tere</h1>
    <button id="nupp">Vajuta</button>
    <ul id="loend"></ul>

    <form id="vorm">
        <input type="text" id="sisend">
        <button type="submit">Lisa</button>
    </form>

    <script src="app.js"></script>
</body>
</html>
```

### B1. Script valesse kohta

Pane `<script src="app.js"></script>` ajutiselt `<head>`-i. `app.js`-i kirjuta:

```js
const pealkiri = document.querySelector("#pealkiri");
console.log(pealkiri);
pealkiri.textContent = "Muudetud";
```

**Mida sa peaksid nägema:** konsoolis `null` ja punane viga
`Cannot read properties of null`. Tõsta `<script>` tagasi `</body>` ette — nüüd töötab.
**Miks oluline:** see on kõige sagedasem algaja veateade. Nüüd sa tead, mida see
tähendab, enne kui ta sind päriselt segadusse ajab.

### B2. textContent vs innerHTML

```js
pealkiri.textContent = "<b>paks tekst</b>";
// vaata lehte, siis muuda:
pealkiri.innerHTML = "<b>paks tekst</b>";
```

**Mida sa peaksid nägema:** esimesel juhul kuvatakse lehel täht-tähelt
`<b>paks tekst</b>`. Teisel juhul on tekst päriselt paks.
**Miks oluline:** `innerHTML` **käivitab** HTML-i. Kui sinna läheb kasutaja tekst,
võib kasutaja sinna koodi panna. Osas C tuleb tekst kasutajalt — kasuta `textContent`.

### B3. Klasside lülitamine

Lisa HTML-i `<style>` sisse `.tehtud { text-decoration: line-through; opacity: 0.5; }`
ja siis:

```js
const nupp = document.querySelector("#nupp");
nupp.addEventListener("click", () => {
    pealkiri.classList.toggle("tehtud");
});
```

**Mida sa peaksid nägema:** iga klikk lülitab läbikriipsutuse sisse ja välja.
**Miks oluline:** nii märgid osas C ülesandeid tehtuks. Pane tähele, et JS ei puutu
välimust — ta ainult lülitab klassi, kujundus on CSS-is.

### B4. Vormi submit ja preventDefault

```js
const vorm = document.querySelector("#vorm");
const sisend = document.querySelector("#sisend");

vorm.addEventListener("submit", (sundmus) => {
    console.log("sisestati:", sisend.value);
});
```

Kirjuta väljale midagi ja vajuta Lisa.

**Mida sa peaksid nägema:** konsoolis vilksatab teade ja **kaob kohe ära**, leht laeb
uuesti, väli tühjeneb. Konsooli ülaosas võib olla kiri „Navigated to...".
Nüüd lisa esimese reana `sundmus.preventDefault();` ja proovi uuesti — teade jääb püsima.
**Miks oluline:** ilma selleta laeb vorm lehe uuesti ja kogu su rakenduse olek kaob.
See juhtub kõigiga üks kord; nüüd oskad sa selle ära tunda.

### B5. Elementide loomine tsüklis

```js
const loend = document.querySelector("#loend");
const nimed = ["Anna", "Mart", "Liis"];

for (const nimi of nimed) {
    const li = document.createElement("li");
    li.textContent = nimi;
    loend.append(li);
}
```

**Mida sa peaksid nägema:** kolm `<li>`-d lehel. Ava DevTools → Elements ja vaata, et
nad on päriselt `<ul>` sees.
**Miks oluline:** see on `joonista()` funktsiooni süda.

### B6. Kaks korda joonistamine

Pane eelmine tsükkel funktsiooni sisse ja kutsu seda **kaks korda**:

```js
function joonista() {
    for (const nimi of nimed) { /* ... sama kood ... */ }
}
joonista();
joonista();
```

**Mida sa peaksid nägema:** kuus nime, iga nimi kaks korda.
Nüüd lisa funktsiooni **esimeseks reaks** `loend.innerHTML = "";` ja proovi uuesti —
kolm nime, ükskõik mitu korda sa `joonista()` kutsud.
**Miks oluline:** see üks rida on see, mis teeb „olek → joonista" mustri võimalikuks.
Ilma selleta kuhjub kõik.

### B on valmis kui
- [ ] Kuus katset tehtud ja sa **nägid** kirjeldatud käitumist
- [ ] Sinu konsool oli iga katse ajal lahti
- [ ] Oskad öelda, mis juhtub ilma `loend.innerHTML = ""` reata

---

# OSA C — To-do rakendus (~7 h)

**Mis valmis saab:** rakendus, kus saad lisada ülesandeid, märkida neid tehtuks,
kustutada, ja mis **mäletab kõike pärast lehe uuesti laadimist.**

Kaust `01-veeb/nadal-04/todo/`:

```
index.html
app.js
style.css
```

Ei raamistikke, ei CDN-e. Ainult need kolm faili.

### C1. Andmekuju — otsusta see enne koodi kirjutamist

Üks ülesanne on objekt, kõik ülesanded on massiiv:

```js
let ulesanded = [
    { id: 1738412345678, tekst: "Osta piim", tehtud: false }
];
```

Kolm välja, igaühel oma roll:
- `id` — unikaalne number, et teaksid, millist ülesannet kustutada. Kasuta `Date.now()`
- `tekst` — mida kasutaja kirjutas
- `tehtud` — `true` või `false`

`let`, mitte `const` — sest `filter` kustutamisel **asendab** massiivi uuega.

### C2. HTML

Kirjuta ise, aga need elemendid peavad olema:
- `<h1>` pealkiri
- `<form>` ühe tekstiväljaga ja nupuga („Lisa")
- tühi `<ul>`, kuhu JS ülesanded joonistab
- koht loenduri jaoks (nt `<p id="loendur">`)
- `<script src="app.js"></script>` **enne `</body>`**

Vormi väljal peab olema `<label>` (võib olla visuaalselt peidetud, aga olemas).

### C3. Olek → joonista

See on töö süda. Üks funktsioon, mis ehitab kogu nimekirja oleku järgi nullist:

```js
function joonista() {
    loend.innerHTML = "";

    for (const u of ulesanded) {
        const li = document.createElement("li");
        li.textContent = u.tekst;
        if (u.tehtud) li.classList.add("tehtud");

        // siia tulevad nupud, vt C4

        loend.append(li);
    }

    // siia tuleb loendur ja salvestamine
}
```

**Reegel, mida järgi kogu aeg:** iga tegevus **muudab massiivi ja kutsub siis
`joonista()`**. Mitte kunagi ära muuda DOM-i otse mujal kui `joonista()` sees.

### C4. Kolm tegevust

**Lisamine** — `submit` sündmuses:
1. `preventDefault()`
2. loe välja väärtus, `trim()`-i see
3. kui tühi, ära lisa midagi (`if (tekst === "") return;`)
4. `push` uus objekt
5. tühjenda väli
6. `joonista()`

**Tehtuks märkimine** — iga `<li>` sees olgu märkeruut (`<input type="checkbox">`) või
nupp. Kliki peale:
1. leia see ülesanne massiivist (`find`)
2. `u.tehtud = !u.tehtud`
3. `joonista()`

**Kustutamine** — iga `<li>` sees nupp („Kustuta" või „×"). Kliki peale:
1. `ulesanded = ulesanded.filter(u => u.id !== id)`
2. `joonista()`

Nupud tuleb luua `joonista()` sees `createElement`-iga ja neile kohe
`addEventListener` külge panna. Kuna oled tsüklis, on `u` iga kord õige ülesanne —
seda saab sulgemises (closure) kasutada:

```js
const kustutaNupp = document.createElement("button");
kustutaNupp.textContent = "×";
kustutaNupp.addEventListener("click", () => {
    ulesanded = ulesanded.filter(x => x.id !== u.id);
    joonista();
});
li.append(kustutaNupp);
```

### C5. Loendur

Näita, mitu ülesannet on tegemata. Üks rida `joonista()` lõpus:

```js
const tegemata = ulesanded.filter(u => !u.tehtud).length;
loendur.textContent = `${tegemata} tegemata, ${ulesanded.length} kokku`;
```

### C6. localStorage

**Salvestamine** — `joonista()` lõppu:

```js
localStorage.setItem("ulesanded", JSON.stringify(ulesanded));
```

**Laadimine** — faili algusesse, enne esimest `joonista()` kutset:

```js
const salvestatud = localStorage.getItem("ulesanded");
if (salvestatud) {
    ulesanded = JSON.parse(salvestatud);
}
joonista();
```

**Mida sa peaksid nägema:** lisa paar ülesannet, vajuta F5. Kõik on alles.
Ava DevTools → Application → Local Storage → vaata, mis seal tegelikult kirjas on.

### C7. CSS

Ei pea ilus olema, aga peab olema **sinu kirjutatud** ja kasutama seda, mida 2.–3.
nädalal õppisid:
- [ ] `:root` muutujad värvidele
- [ ] `* { box-sizing: border-box; }`
- [ ] `main` või konteiner: `max-width` + `margin: 0 auto`
- [ ] `.tehtud` klass: läbikriipsutus ja hääbunud värv
- [ ] Iga `<li>` on flexis: tekst vasakul, nupud paremal (`justify-content: space-between`)

### C8. Kontrollnimekiri

Käi päriselt läbi, see on osa ülesandest:

1. **Lisamine:** kirjuta ülesanne, vajuta Lisa. Ilmub nimekirja, väli tühjeneb
2. **Tühi sisend:** vajuta Lisa tühja väljaga. **Ei tohi** tekkida tühja rida
3. **Ainult tühikud:** sisesta mõni tühik ja vajuta Lisa. Ei tohi tekkida (`trim()`)
4. **Tehtuks:** märgi tehtuks. Tekst kriipsutatakse läbi, loendur muutub
5. **Tagasi:** märgi uuesti lahti. Kriips kaob, loendur muutub tagasi
6. **Kustutamine:** kustuta keskmine ülesanne. **Ainult see** kaob, teised jäävad
7. **F5:** kõik on alles, ka tehtud märked
8. **Tühjendus:** DevTools → Application → Local Storage → kustuta kirje → F5.
   Rakendus avaneb tühjalt, **ilma veateateta**
9. **Konsool:** täiesti tühi, ükski punane rida
10. **360px:** Ctrl+Shift+M, rakendus on kasutatav telefoni laiuses
11. **W3C:** validator.w3.org, 0 viga
12. **Seletustest:** mine `app.js` ülalt alla ja ütle iga rea kohta valjusti, mis see
    teeb. Iga rida, mille juures kokutad, kustuta ja kirjuta uuesti

### C on valmis kui
- [ ] Kõik 12 kontrollpunkti läbitud
- [ ] Commititud ja pushitud

---

# Kui jääd kinni

Küsi minult. Aga küsi nii:

- ✅ „Miks mu kustutamine kustutab vale ülesande?"
- ✅ „Ma ei saa aru, mis `filter` siin teeb"
- ✅ „Siin on mu kood ja see veateade, kus ma mõtlen valesti?"
- ❌ „Kirjuta mulle kustutamise funktsioon"

Ja enne küsimist vaata konsooli. JS ütleb sulle enamasti otse, mis katki on — see on
tema suur eelis CSS-i ees.

---

# Nädala lõpp

- [ ] Õppetund läbi loetud, 10 kordamisküsimust vastatud (saada vastused mulle)
- [ ] Osa A: viis konsoolikatset
- [ ] Osa B: kuus DOM-i katset, `proov/` kaust kustutatud
- [ ] Osa C: to-do rakendus, 12 kontrollpunkti
- [ ] Päevik täidetud, kõik commititud ja pushitud
