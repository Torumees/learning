# Nädal 6 — Vue alused (~12 h)

**Materjal:** [OPPETUND.md](OPPETUND.md)
**Käsiraamat:** https://claude.ai/artifact/6ReNXRMfYGeLeqfccDwNix

Kolm osa: **A** projekt püsti ja esimene komponent (2 h), **B** reaktiivsuse katsed
(3 h), **C** to-do uuesti Vue's (7 h).

**Sel nädalal on üks eriline asi:** sa ehitad uuesti midagi, mis sul juba olemas on.
See ei ole raiskamine — see on ainus viis näha, mida raamistik sinu eest ära teeb.
Enamik inimesi õpib Vue'd ilma seda võrdlust omamata ja arvab terve aasta, et
reaktiivsus on maagia.

---

# OSA A — Projekt püsti (~2 h)

### A1. Loo projekt

Terminalis, kaustas `02-vue/nadal-06/`:

```
npm create vite@latest todo-vue
```

Kaks küsimust: **framework** → `Vue`, **variant** → `JavaScript`.

```
cd todo-vue
npm install
npm run dev
```

**Mida sa peaksid nägema:** terminal annab aadressi `http://localhost:5173`. Ava see.
Seal on Vite+Vue näidisleht loenduriga.
**Jäta terminal lahti** — server jookseb seal. Lõpetad `Ctrl+C`-ga.

### A2. Vaata, kuidas kiire uuendus töötab

Ava `src/App.vue`. Muuda mingit teksti ja **salvesta**.

**Mida sa peaksid nägema:** brauser uuenes ise, ilma F5-ta, ja isegi ilma lehe
uuesti laadimist. Seda nimetatakse hot reload'iks.
**Miks oluline:** see muudab töötempot rohkem, kui arvata oskaks. Live Server laadis
lehe uuesti; Vite vahetab ainult muutunud osa.

### A3. Vaata kausta sisse

Ava järjest ja loe läbi: `index.html`, `src/main.js`, `src/App.vue`.

**Mida sa peaksid nägema:** `index.html`-is on ainult `<div id="app">` ja üks skript.
Kogu leht ehitatakse JS-iga. `main.js` ühendab `App.vue` selle diviga.
**Miks oluline:** nüüd sa tead, kust ahel algab, kui midagi ei kuva.

Kontrolli ka, et projektis on fail `.gitignore` ja selles rida `node_modules`.
**See kaust ei lähe kunagi gitti** — ta on sadu megabaite ja taastub `npm install`-iga.

### A4. Tee puhas leht

- Kustuta `src/components/HelloWorld.vue` (või mis näidis seal on)
- Tühjenda `src/App.vue` — jäta ainult kolm tühja plokki
- Tühjenda `src/style.css`

```vue
<script setup>
</script>

<template>
  <h1>Minu to-do</h1>
</template>

<style scoped>
</style>
```

**Mida sa peaksid nägema:** valge leht, üks pealkiri, konsool puhas.
Kui on vigu, siis tõenäoliselt viitab `main.js` või `App.vue` millelegi, mis sa
kustutasid.

### A5. Esimene reaktiivne asi

Kirjuta `App.vue`-sse loendur:

```vue
<script setup>
import { ref } from 'vue'

const loendur = ref(0)

function suurenda() {
    loendur.value++
}
</script>

<template>
  <p>Klikke: {{ loendur }}</p>
  <button @click="suurenda">Kliki</button>
</template>
```

**Mida sa peaksid nägema:** number kasvab klikil. Ja pane tähele, mida sa **ei**
kirjutanud: ei `querySelector`-it, ei `addEventListener`-it, ei `textContent`-i.

### A on valmis kui
- [ ] `npm run dev` töötab, leht avaneb
- [ ] `.gitignore`-is on `node_modules`
- [ ] Loendur töötab
- [ ] Oskad öelda, mis on `index.html` → `main.js` → `App.vue` ahel

---

# OSA B — Reaktiivsuse katsed (~3 h)

Kõik `App.vue`-s. Iga katse juures hoia **konsool lahti** — Vue räägib sinuga sealt.

### B1. Tavaline muutuja ei ole reaktiivne

Muuda loendur tavaliseks muutujaks:

```js
let loendur = 0
function suurenda() {
    loendur++
    console.log(loendur)
}
```

**Mida sa peaksid nägema:** konsoolis number kasvab, **aga ekraanil ei muutu midagi.**
**Miks oluline:** see on kogu `ref()` olemasolu põhjus. Vue ei jälgi tavalisi
muutujaid — ta ei tea, et midagi juhtus. Pane `ref` tagasi.

### B2. `.value` lõks mõlemas suunas

Pane `ref` tagasi, aga kirjuta scriptis `loendur++` (ilma `.value`):

**Mida sa peaksid nägema:** ekraanil `NaN`. Sest `loendur` on objekt, mitte number, ja
objekti ei saa liita.

Nüüd pane `.value` tagasi scripti, aga kirjuta **templates** `{{ loendur.value }}`:

**Mida sa peaksid nägema:** tühi koht või `undefined`.
**Miks oluline:** need kaks on sel nädalal su kõige sagedasemad vead. Nüüd sa tunned
mõlemad sümptomid ära: `NaN` või `[object Object]` → `.value` puudub scriptis.
Tühi koht → `.value` on templates üleliigne.

### B3. v-for ja massiiv

```js
const nimed = ref(["Anna", "Mart", "Liis"])

function lisaNimi() {
    nimed.value.push("Uus " + nimed.value.length)
}
```

```html
<ul>
  <li v-for="n in nimed" :key="n">{{ n }}</li>
</ul>
<button @click="lisaNimi">Lisa nimi</button>
```

**Mida sa peaksid nägema:** klikil tekib uus `<li>` ise. Võrdle mõttes oma
`createElement`/`append` koodiga 4. nädalast — seda ei ole enam vaja.

### B4. Mis juhtub ilma `:key`-ta

**Vue ei hoiata sind selle eest.** Konsool jääb vaikseks. Seepärast tuleb viga ise
nähtavaks teha — ja see on hea näide veast, mida ükski tööriist sulle ei ütle.

Kirjuta see:

```html
<ul>
  <li v-for="n in nimed">
    <input type="checkbox"> {{ n }}
  </li>
</ul>
<button @click="eemaldaEsimene">Eemalda esimene</button>
```

```js
function eemaldaEsimene() {
    nimed.value.shift()
}
```

Pane tähele: `:key` on **tahtlikult puudu**.

Nüüd tee täpselt nii:
1. Tee linnuke **esimese** nime (Anna) märkeruutu
2. Vajuta „Eemalda esimene"

**Mida sa peaksid nägema:** Anna kadus, aga **linnuke on nüüd Mardi juures.** Sa ei
puutunud Mardi märkeruutu kordagi.

Miks: ilma võtmeta käib Vue elemente läbi **positsiooni järgi**. Ta ei kustuta Anna rida
— ta kirjutab selle rea teksti üle Mardi nimega ja taaskasutab sealset `<input>`-it
koos tema linnukesega. Rida 0 jäi alles, ainult sisu vahetus.

Nüüd lisa `:key="n"` tagasi ja korda sama katset.

**Mida sa peaksid nägema:** Anna kadus ja **ühtegi linnukest ei ole.** Vue teadis, et
see konkreetne rida kuulus Annale, ja viskas selle koos linnukesega minema.

**Miks oluline:** su to-do's on igal real märkeruut. Ilma `:key`-ta tähendab see, et
ühe ülesande kustutamine võib „tehtud" märke valele ülesandele viia — ja konsool ei
ütle sulle sõnagi. See on kontrollnimekirja punkt 6.

### B5. v-model vs käsitsi

```js
const uusTekst = ref("")
```

```html
<input v-model="uusTekst">
<p>Kirjutasid: {{ uusTekst }}</p>
```

**Mida sa peaksid nägema:** tekst lõigus muutub **iga tähe kirjutamisel**.
**Miks oluline:** 4. nädalal tegid sa sama asja `vali.value` lugemisega ja käsitsi
tühjendamisega. See on üks atribuut.

### B6. computed

```js
const ulesanded = ref([
    { id: 1, tekst: "A", tehtud: false },
    { id: 2, tekst: "B", tehtud: true }
])

const tegemata = computed(() => ulesanded.value.filter(u => !u.tehtud).length)
```

(Ära unusta `computed` importida: `import { ref, computed } from 'vue'`)

```html
<p>{{ tegemata }} tegemata</p>
<button @click="ulesanded.value[0].tehtud = true">Märgi esimene tehtuks</button>
```

Nupp ei tööta nii — templates ei ole `.value`. Kirjuta nupp õigesti ise.

**Mida sa peaksid nägema:** kui märgid ühe tehtuks, muutub loendur **ise**.
**Miks oluline:** võrdle sellega, kuidas sa 4. nädalal loenduri `joonista()` sees
käsitsi ümber arvutasid — ja kuidas see tühja massiivi puhul katki läks, sest tsükkel
ei jooksnud. `computed` ei saa sellist viga tekitada.

### B7. scoped stiil

Pane `<style scoped>` sisse `p { color: red; }`. Siis võta `scoped` ära ja vaata, kas
midagi muutub (praegu ilmselt mitte, sest sul on üks komponent).

**Miks oluline:** 5. nädalal tabas su `div { display: flex }` kõiki divisid lehel.
`scoped` tähendab, et see ei saa juhtuda — stiil kehtib ainult selles failis.

### B on valmis kui
- [ ] Seitse katset tehtud, sa **nägid** kirjeldatud käitumist
- [ ] Oskad `.value` vea kahte sümptomit ära tunda
- [ ] Päevikus kirjas, mis Vue juures kõige rohkem üllatas

---

# OSA C — To-do uuesti Vue's (~7 h)

**Mis valmis saab:** sama rakendus, mis [nadal-04/todo](../../01-veeb/nadal-04/todo/),
aga Vue's ja komponentideks jagatud.

**Hoia vanilla versioon kõrval lahti.** Võrdlemine on pool ülesande väärtusest.

### C1. Olek `App.vue`-s

```js
const ulesanded = ref([])
const uusTekst = ref("")
const tegemata = computed(() => ...)
```

Pane tähele, et `olek`-u muutujat siin vaja ei ole — `v-if` saab otse `ulesanded`-i
pealt otsustada.

### C2. Funktsioonid

Kirjuta need kolm ise. Loogika on **täpselt sama** nagu vanilla versioonis — `push`,
`filter`, `find` — ainult `.value` tuleb juurde ja `joonista()` kutsumine kaob ära.

```js
function lisa() { ... }        // trim, tühja ei lisa, push, tühjenda uusTekst
function kustuta(id) { ... }   // filter
function lulita(id) { ... }    // find + !u.tehtud
```

### C3. Template

```html
<form @submit.prevent="lisa">
  <label for="uus">Lisa ülesanne:</label>
  <input id="uus" v-model="uusTekst">
  <button type="submit">Lisa</button>
</form>

<p>{{ tegemata }} tegemata, {{ ulesanded.length }} kokku</p>

<p v-if="ulesanded.length === 0">Ülesandeid pole veel.</p>

<ul>
  <!-- siia tuleb v-for -->
</ul>
```

### C4. Komponent

Tee `src/components/UlesandeRida.vue`, mis kuvab **ühe** rea.

- Saab `props`-iga ülesande objekti
- `emit`-ib `kustuta` ja `lulita` sündmusi id-ga
- Ei muuda ise mitte midagi

`App.vue` kasutab seda `v-for`-is, annab `:ulesanne="u"` ja `:key="u.id"`, kuulab
`@kustuta` ja `@lulita`.

**See on nädala kõige olulisem osa.** Props alla, emit üles — kogu Vue (ja Reacti, ja
Angulari) arhitektuur põhineb sellel ühel reeglil.

### C5. localStorage

Laadimine `App.vue` scripti algusesse, salvestamine `watch`-iga:

```js
watch(ulesanded, () => {
    localStorage.setItem('ulesanded', JSON.stringify(ulesanded.value))
}, { deep: true })
```

`{ deep: true }` on kohustuslik — ilma selleta ei märka Vue, kui sa muudad `u.tehtud`
massiivi **sees**. Proovi ka ilma selleta ja vaata, mis juhtub: lisamine salvestub,
tehtuks märkimine mitte.

### C6. CSS

`<style scoped>` komponentide sees. Nõuded samad nagu varem: `:root` muutujad
(need käivad `src/style.css`-i, sest `:root` on globaalne), `max-width` + `margin: 0 auto`,
`.tehtud` klass läbikriipsutusega, rida flexis.

### C7. Loe read kokku

Kui valmis, võrdle:

```
# vanilla versioon
wc -l ../../01-veeb/nadal-04/todo/app.js

# Vue versioon
wc -l src/App.vue src/components/UlesandeRida.vue
```

**Kirjuta mõlemad numbrid päevikusse** koos ühe lausega selle kohta, mis kadus.
See number on su tõend selle kohta, mille jaoks raamistikud olemas on.

### C8. 30-sekundiline kontroll

Need kolm, enne kui ütled „valmis":

1. **Ava leht.** Kas rakendus töötab kohe, ilma et sa midagi kliki?
2. **Konsool.** Tühi? (Vue hoiatused on ka vead — vale props-tüüp, dubleerivad võtmed.
   Aga pea meeles: **puuduvat `:key`-d Vue ei maini**, seda kontrollid ise punktis 6)
3. **F5.** Kas ülesanded on alles, **koos tehtud märgetega**?

Ja siis pikem nimekiri:

4. Tühi sisend ei lisa rida, ainult tühikud ka ei lisa
5. Kustutamine kustutab **õige** rea (lisa kolm, kustuta keskmine)
6. Märkeruut kustutamise järel on **õigel** real (siin paljastub puuduv `:key`)
7. Loendur muutub nii lisamisel, kustutamisel kui märkimisel
8. localStorage käsitsi tühjendamine → rakendus avaneb tühjalt, ilma veateateta
9. 360px juures kasutatav
10. `node_modules` **ei ole** gitis (`git status` ei tohi seda näidata)

### C on valmis kui
- [ ] Kõik 10 punkti läbitud
- [ ] Read kokku loetud ja päevikusse kirjutatud
- [ ] Commititud ja pushitud

---

# Kui jääd kinni

Vue veateated on konkreetsed. Kolm, mida sa sel nädalal kindlasti näed:

| Mida näed | Mida see tähendab |
|---|---|
| Ekraanil `NaN` või `[object Object]` | `.value` puudub scriptis |
| Ekraanil tühi koht | `.value` on templates üleliigne |
| `Property "x" was accessed during render but is not defined` | muutuja on `<script setup>`-ist puudu või kirjaviga nimes |
| `Duplicate keys found during update` | kaks elementi said sama `:key` — võti ei ole unikaalne |
| Linnuke/sisestus hüppab kustutamisel valele reale | `:key` **puudub** — Vue selle kohta ei hoiata |
| Muudatus ei kajastu ekraanil | muutuja ei ole `ref` — see on tavaline `let` |
| `Cannot read properties of undefined` propsis | vanem ei andnud `:ulesanne="u"` edasi, või nimi on erinev |

---

# Nädala lõpp

- [ ] Õppetund läbi loetud, 10 kordamisküsimust vastatud (saada vastused mulle)
- [ ] Osa A: projekt püsti
- [ ] Osa B: seitse katset
- [ ] Osa C: to-do Vue's, komponendiga, 10 punkti
- [ ] Ridade võrdlus päevikus
- [ ] Kõik commititud ja pushitud
