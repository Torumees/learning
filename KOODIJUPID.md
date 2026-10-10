# Koodijupid

Kopeerimiseks mõeldud. Minimaalselt juttu, maksimaalselt töötavat koodi.
Kõik siin on **sinu enda projektidest** võetud.

**Kasutamine:** `Ctrl+F` ja otsi, mida tahad teha. Jaotised on sõnastatud
„Tahan..." kujul, sest nii sa ka mõtled.

**See fail on sinu oma.** Kui sa vaatad midagi kolmandat korda järele ja seda siin ei
ole — lisa. Kui mõni jupp on vale või kohmakas — paranda. Kursuse lõpuks peaks siin
olema sinu isiklik tööriistakast, mitte minu oma.

---

# HTML

### Tahan uut lehte alustada

```html
<!DOCTYPE html>
<html lang="et">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pealkiri</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <script src="app.js"></script>
</body>
</html>
```

### Tahan vormi

```html
<form id="vorm">
    <label for="nimi">Nimi:</label>
    <input type="text" id="nimi" name="nimi">

    <label for="epost">E-post:</label>
    <input type="email" id="epost" name="epost">

    <label for="sonum">Sõnum:</label>
    <textarea id="sonum" name="sonum" rows="5"></textarea>

    <button type="submit">Saada</button>
</form>
```

`for` peab kattuma `id`-ga. Kliki labeli peale — kui kursor hüppab välja, on õige.
Sisenditüübid: `text`, `email`, `tel`, `number`, `date`, `password`, `checkbox`.

### Tahan rippmenüüd, mis täidetakse JS-iga

```html
<select id="linn"></select>
```

```js
for (const linn of linnad) {
    const valik = document.createElement("option");
    valik.textContent = linn.nimi;
    valik.value = linn.nimi;
    linna_valik.append(valik);
}
```

---

# CSS

### Tahan iga projekti alguses need read

```css
:root {
    --varv-tekst: rgb(2, 10, 10);
    --varv-taust: #f4f6f8;
    --varv-rohutus: #6d7884;
    --samm: 1rem;
}

* { box-sizing: border-box; }

body {
    color: var(--varv-tekst);
    background-color: var(--varv-taust);
}
```

### Tahan sisu keskele, et tekst ei veniks üle ekraani

```css
main { max-width: 65ch; margin: 0 auto; }
```

`65ch` ≈ 65 tähemärki — loetav tekstirida. `margin: 0 auto` **nõuab** `max-width`-i,
muidu pole midagi jagada.

### Tahan rida, kus tekst on vasakul ja nupp paremal

```css
li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

li button { margin-left: auto; }
```

`margin-left: auto` neelab vaba ruumi ja lükkab elemendi serva.

### Tahan nav-riba, logo vasakul, lingid paremal

```css
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```

### Tahan vormi püsti, mitte ühte ritta

```css
form {
    display: flex;
    flex-direction: column;
    gap: var(--samm);
    max-width: 400px;
}
```

Ilma `flex-direction: column` on vaikesuund `row` ja kõik läheb kõrvuti.

### Tahan kaarte, mis ise ritta mahuvad

```css
.kaardid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
}
```

Veergude arv muutub ise. Ühtegi media queryt ei ole vaja.

### Tahan, et telefonis oleks teistmoodi

```css
/* BAAS = telefon, ilma media queryta */
.kaardid { grid-template-columns: 1fr; }

/* siis laiendad */
@media (min-width: 700px) {
    .kaardid { grid-template-columns: repeat(3, 1fr); }
}
```

### Tahan päist, mis jääb kerimisel üles

```css
header {
    position: sticky;
    top: 0;
    background-color: var(--varv-taust);   /* kohustuslik, muidu keritakse läbi */
}
```

### Tahan silti kaardi nurka

```css
.kaart { position: relative; }
.kaart .silt { position: absolute; top: 10px; right: 10px; }
```

Vanemal **peab** olema `position: relative`, muidu lendab silt lehe nurka.

---

# JavaScript — DOM

### Tahan elemendi kätte saada

```js
const el = document.querySelector("#id");
const esimene = document.querySelector(".klass");
const koik = document.querySelectorAll(".klass");
```

Selektor on sama süntaks nagu CSS-is. Kui ei leia → `null` → järgmine rida annab
`Cannot read properties of null`.

### Tahan teksti muuta

```js
el.textContent = "Uus tekst";        // kasutaja tekst käib ALATI nii
el.innerHTML = "";                   // tühjenda kõik lapsed
```

`innerHTML` käivitab HTML-i. Kasutaja sisestatud tekstiga mitte kunagi.

### Tahan klassi lülitada

```js
el.classList.add("tehtud");
el.classList.remove("tehtud");
el.classList.toggle("tehtud");
```

### Tahan elemendi luua ja lehele panna

```js
const li = document.createElement("li");
li.textContent = "Rida";
li.classList.add("ulesanne");
loend.append(li);              // ilma selleta jääb element mälus hõljuma
```

### Tahan nuppu, mis teab, millise elemendi juurde ta kuulub

```js
for (const u of ulesanded) {
    const nupp = document.createElement("button");
    nupp.textContent = "×";
    nupp.addEventListener("click", () => {
        kustuta(u.id);          // see nool mäletab, milline u oli
    });
    li.append(nupp);
}
```

### Tahan vormi, mis ei laeks lehte uuesti

```js
vorm.addEventListener("submit", (sundmus) => {
    sundmus.preventDefault();          // ← ilma selleta kaob kõik
    const puhas = tekstvali.value.trim();
    if (puhas === "") return;
    lisa(puhas);
    tekstvali.value = "";
});
```

---

# JavaScript — andmed

### Tahan objektide massiivi (põhiline andmekuju)

```js
let ulesanded = [
    { id: 1738412345678, tekst: "Osta piim", tehtud: false }
];
```

`id`-ks `Date.now()`.

### Tahan ühe elemendi üles leida ja muuta

```js
const u = ulesanded.find(x => x.id === id);
u.tehtud = !u.tehtud;
```

`find` annab **objekti**, mis on juba massiivis → muudad teda kohapeal, omistamist ei ole.

### Tahan elemendi ära võtta

```js
ulesanded = ulesanded.filter(u => u.id !== id);
```

`filter` annab **uue massiivi** → pead selle tagasi omistama. Seepärast on `ulesanded`
`let`, mitte `const`.

### filter vs find — see, mida sa kõige rohkem segi ajad

| Meetod | Tagastab | Mida teed |
|---|---|---|
| `filter` | uus **massiiv** | `ulesanded = ulesanded.filter(...)` |
| `find` | üks **objekt** | `u.tehtud = !u.tehtud` |
| `map` | uus **massiiv** | `const uued = arr.map(...)` |

### Tahan loendada

```js
const tegemata = ulesanded.filter(u => !u.tehtud).length;
```

### Tahan massiivi läbi käia

```js
for (const u of ulesanded) { ... }        // of, mitte in
ulesanded.forEach(u => { ... });
for (let i = 0; i < arr.length; i++) { ... }   // kui vajad indeksit
```

### Tahan kontrollida, kas massiiv on tühi

```js
if (ulesanded.length === 0) { ... }       // ÕIGE
if (!ulesanded) { ... }                   // VALE — tühi massiiv on JS-is TÕENE
```

---

# localStorage

### Tahan andmed alles hoida

```js
// salvesta
localStorage.setItem("ulesanded", JSON.stringify(ulesanded));

// loe
const salvestatud = localStorage.getItem("ulesanded");
if (salvestatud) {
    ulesanded = JSON.parse(salvestatud);
}
```

localStorage hoiab **ainult stringe**, seepärast `JSON.stringify` / `JSON.parse`.
Vaatamiseks: DevTools → Application → Local Storage.

---

# Olek → joonista (vanilla muster)

```js
let ulesanded = [];

function joonista() {
    loend.innerHTML = "";                     // 1. tühjenda

    for (const u of ulesanded) {              // 2. ehita uuesti
        const li = document.createElement("li");
        li.textContent = u.tekst;
        if (u.tehtud) li.classList.add("tehtud");
        loend.append(li);
    }

    // 3. kõik, mis sõltub andmetest — TSÜKLIST VÄLJAS
    loendur.textContent = `${ulesanded.filter(u => !u.tehtud).length} tegemata`;
    localStorage.setItem("ulesanded", JSON.stringify(ulesanded));
}

function lisa(tekst) {
    ulesanded.push({ id: Date.now(), tekst: tekst, tehtud: false });
    joonista();                               // muuda → joonista
}
```

Loendur ja salvestamine **peavad olema tsüklist väljas** — muidu tühja massiivi puhul
ei käivitu nad kordagi ja kustutatud asjad tulevad F5 järel tagasi.

---

# fetch

### Tahan andmeid API-st, korralikult

```js
let olek = "laadib";      // "laadib" | "valmis" | "viga"
let andmed = null;
let veateade = "";

async function lae() {
    olek = "laadib";
    joonista();                                    // näita KOHE

    try {
        const vastus = await fetch(url);
        if (!vastus.ok) throw new Error(`Server vastas: ${vastus.status}`);
        andmed = await vastus.json();
        olek = "valmis";
    } catch (viga) {
        console.error(viga);                       // sulle
        olek = "viga";
        veateade = "Andmete laadimine ebaõnnestus.";   // kasutajale
    }

    joonista();                                    // joonista tulemus
}
```

**`vastus.ok` kontroll on kohustuslik** — `fetch` ei viska 404 peal viga.

### Tahan URL-i muutujatega

```js
const url = `https://api.open-meteo.com/v1/forecast?latitude=${linn.lat}&longitude=${linn.lon}&current=temperature_2m`;
```

### Tahan nuppu, mis teeb päringu

```js
nupp.addEventListener("click", async () => {       // async käib funktsiooni ETTE
    await lae();
});
```

### Testimine

DevTools → Network → **Throttling**:
- **Slow 3G** → näed laadimisolekut
- **Offline** → näed veaolekut

---

# Vue

### Tahan uut projekti

```
npm create vite@latest projekti-nimi
# framework → Vue, variant → JavaScript
cd projekti-nimi
npm install
npm run dev
```

### Tahan komponendi põhja

```vue
<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const asi = ref("")
</script>

<template>
  <p>{{ asi }}</p>
</template>

<style scoped>
</style>
```

### .value reegel

```js
// SCRIPTIS — .value on kohustuslik
const loendur = ref(0)
loendur.value++
const puhas = uusTekst.value.trim()
ulesanded.value.push({...})
ulesanded.value = ulesanded.value.filter(...)
```

```html
<!-- TEMPLATES — .value on keelatud -->
<p>{{ loendur }}</p>
```

**Kontroll silmaga:** scriptis järgneb ref-i nimele peaaegu alati `.value`. Kui näed
scriptis ref-i ilma `.value`-ta, vaata see rida üle.

Sümptomid: `NaN` või `[object Object]` → `.value` puudub scriptis. Tühi koht →
`.value` on templates üleliigne.

### Tahan nimekirja

```html
<ul>
  <li v-for="u in ulesanded" :key="u.id">{{ u.tekst }}</li>
</ul>
```

`:key` on kohustuslik ja peab olema lihtne unikaalne väärtus (`u.id`, mitte `u`, mitte
indeks). Vue **ei hoiata** puuduva võtme eest — tagajärg on, et märkeruudu olek hüppab
kustutamisel valele reale.

### Tahan sisendit, mis on muutujaga seotud

```html
<input v-model="uusTekst">
<input type="checkbox" v-model="u.tehtud">
```

### Tahan klassi tingimuslikult

```html
<li :class="{ tehtud: u.tehtud }">
```

### Tahan sündmust

```html
<button @click="kustuta(u.id)">x</button>
<form @submit.prevent="lisa">
<input @keyup.enter="lisa">
```

`.prevent` = `preventDefault()`.

### Tahan väärtust, mis arvutab end ise

```js
const tegemata = computed(() => ulesanded.value.filter(u => !u.tehtud).length)
```

Kui väärtus on **arvutatav teistest väärtustest**, siis `computed`, mitte `ref`.

### Tahan tingimuslikku kuva

```html
<p v-if="olek === 'laadib'">Laen...</p>
<p v-else-if="olek === 'viga'">{{ veateade }}</p>
<div v-else>...</div>

<p v-if="ulesanded.length === 0">Ülesandeid pole veel.</p>
```

### Tahan komponenti — laps

```vue
<script setup>
defineProps({ ulesanne: Object })
const emit = defineEmits(['kustuta', 'lulita'])
</script>

<template>
  <li :class="{ tehtud: ulesanne.tehtud }">
    <input type="checkbox" :checked="ulesanne.tehtud"
           @change="emit('lulita', ulesanne.id)">
    {{ ulesanne.tekst }}
    <button @click="emit('kustuta', ulesanne.id)">x</button>
  </li>
</template>

<style scoped>
.tehtud { text-decoration: line-through; opacity: 0.5; }
</style>
```

### Tahan komponenti — vanem

```vue
<script setup>
import UlesandeRida from './components/UlesandeRida.vue'
</script>

<template>
  <ul>
    <UlesandeRida v-for="u in ulesanded" :key="u.id"
                  :ulesanne="u" @kustuta="kustuta" @lulita="lulita" />
  </ul>
</template>
```

**Props alla, emit üles.** Laps ei muuda andmeid — ta hüüab, vanem muudab.

`:ulesanne="u"` — kaksikpunkt tähendab „muutuja väärtus". Ilma selleta saadaks sa
teksti `"u"`.

### Tahan localStorage'i Vue's

```js
watch(ulesanded, () => {
    localStorage.setItem('ulesanded', JSON.stringify(ulesanded.value))
}, { deep: true })

const salvestatud = localStorage.getItem('ulesanded')
if (salvestatud) {
    ulesanded.value = JSON.parse(salvestatud)
}
```

`{ deep: true }` on **kohustuslik** — ilma selleta ei märka Vue muudatusi objektide
sees (`u.tehtud = true`).

### Tahan midagi teha kohe lehe avanemisel

```js
onMounted(() => {
    lae()
})
```

### scoped stiil

`<style scoped>` kehtib **ainult selle komponendi** templates olevatele elementidele.
`App.vue` scoped-stiil ei ulatu lapskomponendi elementideni — pane stiil sellesse
faili, kus element asub.

`:root` muutujad käivad `src/style.css`-i, sest need peavad olema globaalsed.

---

# Git

### Igapäevane

```
git status
git add -A
git commit -m "Sõnum"
git push
```

### Haru

```
git switch -c uus-asi
git switch master
git merge uus-asi
git log --graph --oneline
```

### Konflikt

Fail sisaldab:

```
<<<<<<< HEAD
sinu praeguse haru versioon
=======
sisse tuleva haru versioon
>>>>>>> uus-asi
```

Kustuta **kõik kolm märgiserida** ja jäta alles see, mida tahad. Siis:

```
git diff --check          # leiab märgised, kui mõni jäi
git add .
git commit
```

---

# Vigade sõnastik

| Veateade | Tähendus |
|---|---|
| `Cannot read properties of null` | `querySelector` ei leidnud elementi, või `<script>` ei ole lehe lõpus |
| `Cannot read properties of undefined` | objektil pole sellist välja — `console.log` ja vaata struktuuri |
| `x is not a function` | meetodi nimi valesti, või `x` ei ole see, mida arvad |
| `x is not defined` | kirjaviga nimes, või kasutad enne loomist |
| `await is only valid in async` | `async` on funktsiooni eest puudu |
| `Unexpected token '<'` | server saatis HTML-i, sa ootasid JSON-i → URL on vale |
| `TypeError: Failed to fetch` | ühendust ei saadud — võrk maas või aadress olematu |
| CORS policy | API ei luba brauseripäringuid, või ava Live Serveriga |
| `NaN` / `[object Object]` ekraanil | Vue: `.value` puudub scriptis |
| Tühi koht ekraanil | Vue: `.value` on templates üleliigne |
| `Duplicate keys found during update` | kaks elementi said sama `:key` |
| Muudatus ei kajastu ekraanil | Vue: muutuja ei ole `ref`, vaid tavaline `let` |
| CSS-reegel ei tee midagi | selektor ei leia elementi — DevTools → Elements → Styles |
| `justify-content` ei tööta | `display: flex` on puudu |

---

# 30-sekundiline kontroll

Enne kui ütled „valmis":

1. **Ava leht.** Kas midagi juhtub ilma et sa midagi kliki?
2. **Konsool.** Tühi?
3. **Kliki läbi see, mida sa just muutsid.**
