# Vue alused — õppetund

Viis nädalat oled sa teinud kõike käsitsi. Sel nädalal saad teada, mille jaoks
raamistikud leiutati — ja sul on erinevalt enamikust õppijatest olemas võrdlusalus.

---

## 1. Mis probleemi Vue lahendab — sinu enda koodi näitel

Nii näeb välja su to-do rakenduse süda ([nadal-04/todo/app.js](../../01-veeb/nadal-04/todo/app.js)):

```js
function joonista() {
    loend.innerHTML = "";
    for (const u of ulesanded) {
        const li = document.createElement("li");
        li.textContent = u.tekst;
        if (u.tehtud) li.classList.add("tehtud");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "x";
        deleteButton.addEventListener("click", () => kustuta(u.id));
        li.append(deleteButton);
        loend.append(li);
        const tehtudCheckbox = document.createElement("input");
        tehtudCheckbox.type = "checkbox";
        tehtudCheckbox.checked = u.tehtud;
        li.append(tehtudCheckbox);
        tehtudCheckbox.addEventListener("click", () => tehtudUlesanne(u.id));
    }
    loendur.textContent = `${tegemata} tegemata, ${ulesanded.length} kokku`;
    localStorage.setItem("ulesanded", JSON.stringify(ulesanded));
}
```

20 rida, mille ainus ülesanne on **massiivi sisu ekraanile joonistada**. Ja iga kord,
kui andmed muutuvad, pead sa seda ise meelde tuletama:

```js
ulesanded.push({...});
joonista();              // ← ära unusta
```

Sa oled selle unustamise tagajärgi juba näinud: `tehtudUlesanne`-l oli `joonista()`
puudu ja ekraanil ei juhtunud midagi, kuigi andmed olid õiged.

**Vue's on kogu see 20 rida see:**

```html
<ul>
  <li v-for="u in ulesanded" :key="u.id" :class="{ tehtud: u.tehtud }">
    <input type="checkbox" v-model="u.tehtud">
    {{ u.tekst }}
    <button @click="kustuta(u.id)">x</button>
  </li>
</ul>
<p>{{ tegemata }} tegemata, {{ ulesanded.length }} kokku</p>
```

Ja `joonista()` **ei ole olemas.** Sa muudad massiivi — Vue joonistab ise. Automaatselt,
kohe, iga kord.

See ongi kogu mõte. **Reaktiivsus** tähendab: „kui andmed muutuvad, uueneb ekraan
iseenesest." Sinu töö jääb andmete muutmine; joonistamine ei ole enam sinu mure.

---

## 2. Projekti loomine

Vue ei ole fail, mida lehele lingid. See on projekt, mille ehitab kokku tööriist nimega
**Vite**.

Terminalis, kaustas `02-vue/nadal-06/`:

```
npm create vite@latest todo-vue
```

Kaks küsimust:
- **Select a framework:** `Vue` (nooleklahvidega)
- **Select a variant:** `JavaScript` (mitte TypeScript — see tuleb hiljem, kui üldse)

Siis:

```
cd todo-vue
npm install
npm run dev
```

Viimane käivitab arendusserveri ja annab aadressi, tavaliselt
`http://localhost:5173`. **Jäta see terminal lahti** — server jookseb seal. Salvesta
fail ja brauser uueneb ise, ilma F5-ta.

Lõpetad `Ctrl+C`-ga.

### Mis kaustas on

```
todo-vue/
├── index.html          ← üks leht, üks <div id="app">. Siia sa ei puutu
├── package.json        ← projekti sõltuvused ja käsud
├── vite.config.js      ← Vite seaded. Siia ka ei puutu
├── node_modules/       ← paigaldatud teegid. MITTE KUNAGI giti!
└── src/
    ├── main.js         ← käivituspunkt: ühendab Vue lehega
    ├── App.vue         ← juurkomponent. Siit algab sinu töö
    ├── style.css       ← globaalne CSS
    └── components/     ← siia tulevad su komponendid
```

**`node_modules` ei lähe kunagi gitti.** Vite paneb `.gitignore` faili ise valmis, aga
kontrolli, et seal on rida `node_modules`. Kaust on sadu megabaite ja taastub
`npm install`-iga ühe käsuga.

Kustuta `src/components/` alt näidiskomponent ja tühjenda `App.vue` ära — alusta
puhtalt lehelt.

---

## 3. Komponent — kolm plokki ühes failis

`.vue` fail on **üks komponent**: tema HTML, tema loogika ja tema CSS koos.

```vue
<script setup>
import { ref } from 'vue'

const nimi = ref('Egert')
const loendur = ref(0)

function suurenda() {
    loendur.value++
}
</script>

<template>
  <h1>Tere, {{ nimi }}!</h1>
  <p>Klikke: {{ loendur }}</p>
  <button @click="suurenda">Kliki</button>
</template>

<style scoped>
h1 { color: steelblue; }
</style>
```

- **`<script setup>`** — JS. Kõik, mis siin defineeritud, on templates kasutatav
- **`<template>`** — HTML koos Vue lisanditega
- **`<style scoped>`** — CSS. **`scoped` tähendab, et see kehtib ainult selles
  komponendis.** Kirjutad `h1 { color: red }` ja see ei puutu teiste komponentide
  h1-sid. Mäleta, kuidas su `div { display: flex }` tabas kõiki divisid? `scoped`
  lahendab selle probleemi ära

---

## 4. ref() ja `.value` — SIIN KOMISTAVAD KÕIK

Tavaline muutuja ei ole reaktiivne. Vue ei tea, et see muutus:

```js
let loendur = 0          // ei ole reaktiivne, ekraan ei uuene
const loendur = ref(0)   // on reaktiivne
```

`ref()` mähib väärtuse ümber jälgimiskihi. Ja siin tuleb see reegel, mille peale
kõik esimesel nädalal komistavad:

| Kus | Kuidas |
|---|---|
| `<script setup>` sees | `loendur.value` — **`.value` on kohustuslik** |
| `<template>` sees | `{{ loendur }}` — **`.value` EI tohi olla** |

```js
// scriptis
loendur.value++              // ✅
loendur++                    // ❌ ei tööta, loendur on objekt
console.log(loendur.value)   // ✅
```

```html
<!-- templates -->
<p>{{ loendur }}</p>         <!-- ✅ -->
<p>{{ loendur.value }}</p>   <!-- ❌ -->
```

**Miks nii:** `ref(0)` tagastab objekti kujul `{ value: 0 }`. Scriptis töötad sa selle
objektiga, nii et pead `.value` kirjutama. Templates võtab Vue ise `.value` ära, et
sa ei peaks seda iga kord kordama.

Kui su ekraanil on kirjas `[object Object]` või muutuja ei uuene, on 90% tõenäosusega
`.value` kas puudu või üleliigne. See on **esimene asi**, mida kontrollida.

Massiiv käib täpselt samamoodi:

```js
const ulesanded = ref([])

ulesanded.value.push({ id: 1, tekst: "Osta piim", tehtud: false })   // scriptis
ulesanded.value = ulesanded.value.filter(u => u.id !== id)           // scriptis
```

```html
<li v-for="u in ulesanded">{{ u.tekst }}</li>                        <!-- templates -->
```

> On olemas ka `reactive()`, mis objektide puhul `.value`-d ei nõua. Aga ta kaotab
> reaktiivsuse, kui sa muutuja üle kirjutad (`minuObjekt = {...}`), ja see on nõme viga
> otsida. **Kasuta `ref()` kõige jaoks** — üks reegel, mis kehtib alati, on parem kui
> kaks reeglit eranditega.

---

## 5. Template-süntaks

Neli asja, ja need katavad peaaegu kõik.

### `{{ }}` — näita väärtust

```html
<p>{{ nimi }}</p>
<p>{{ ulesanded.length }} ülesannet</p>
<p>{{ nimi.toUpperCase() }}</p>
```

Sulgude sees võib olla **avaldis**, mitte lause. `{{ if (x) ... }}` ei tööta,
`{{ x ? "jah" : "ei" }}` töötab.

### `:` — pane atribuudi väärtus muutujast

`:` on lühend `v-bind:`-ist.

```html
<img :src="pildiUrl" :alt="nimi">
<input :disabled="laadib">
<li :class="{ tehtud: u.tehtud }">
```

**Vahe on oluline:**

```html
<img src="pildiUrl">     <!-- tekst "pildiUrl" -->
<img :src="pildiUrl">    <!-- muutuja pildiUrl väärtus -->
```

`:class="{ tehtud: u.tehtud }"` tähendab „lisa klass `tehtud`, **kui** `u.tehtud` on
tõene". See asendab kogu su `classList.add` loogika.

### `@` — kuula sündmust

`@` on lühend `v-on:`-ist. Sinu `addEventListener` kaob ära.

```html
<button @click="kustuta(u.id)">x</button>
<form @submit.prevent="lisa">
<input @keyup.enter="lisa">
```

**`@submit.prevent` on `preventDefault()`.** Mäleta, kuidas su to-do leht laadis
uuesti, kui see ununes? Vue's on see üks sõna templates ja sa ei saa seda ära unustada
samamoodi.

### `v-model` — kahesuunaline side

```html
<input v-model="uusTekst">
```

See üks atribuut asendab kogu selle:

```js
// vanilla JS-is pidid sa tegema nii:
const vali = document.querySelector("#sisend");
lisa(vali.value);
vali.value = "";
```

`v-model` hoiab `uusTekst` ja välja sisu **automaatselt sünkroonis**. Kasutaja
kirjutab → muutuja muutub. Sa muudad muutujat → väli muutub. Tühjendamiseks:
`uusTekst.value = ""`.

Töötab ka märkeruudul (`v-model="u.tehtud"` → `checked`) ja `<select>`-il.

---

## 6. v-for ja miks `:key` on kohustuslik

```html
<li v-for="u in ulesanded" :key="u.id">{{ u.tekst }}</li>
```

Indeksiga, kui vaja:

```html
<li v-for="(u, i) in ulesanded" :key="u.id">{{ i + 1 }}. {{ u.tekst }}</li>
```

**`:key` peab olema ja peab olema unikaalne.** Vue kasutab seda, et aru saada, milline
element on milline, kui massiiv muutub.

Ilma võtmeta käib Vue elemente läbi **positsiooni järgi**: ta ei kustuta esimest rida,
vaid kirjutab selle sisu üle järgmise elemendi omaga ja taaskasutab sealseid DOM-elemente.
Kui real on märkeruut või sisestusväli, jääb selle olek **positsiooni külge**, mitte
andmeelemendi külge — tüüpiline tagajärg on, et sa kustutad ühe rea ja linnuke hüppab
valele reale.

**Ja Vue ei hoiata sind selle eest.** Konsool jääb vaikseks. Runtime-hoiatuse annab ta
ainult **dubleerivate** võtmete kohta (`Duplicate keys found during update`). Puuduva
võtme leiab üles `eslint-plugin-vue`, mis on projektis olemas siis, kui lood selle
`npm create vue@latest`-iga ja valid ESLinti — `npm create vite@latest` seda kaasa ei
pane. Seega on see viga, mida sa pead ise teadma.

Su `id: Date.now()` on täpselt õige asi `:key`-ks. **Ära kasuta `:key="i"`** (indeksit)
— indeks muutub, kui massiivi järjekord muutub, ja siis on sul sama probleem kui ilma
võtmeta.

---

## 7. v-if ja v-else

```html
<p v-if="olek === 'laadib'">Laen...</p>
<p v-else-if="olek === 'viga'">{{ veateade }}</p>
<div v-else>
  <!-- andmed -->
</div>
```

See asendab kogu su `joonista()` kolme-haru-loogika ilmarakendusest. Ja pane tähele, et
see on **loetavam** — sa näed ühe pilguga, mis millal kuvatakse.

```html
<p v-if="ulesanded.length === 0">Ülesandeid pole veel.</p>
```

`v-show` on olemas ka — see peidab CSS-iga (`display: none`), aga element jääb DOM-i.
Kasuta `v-if`-i, kui pole konkreetset põhjust teisiti.

---

## 8. computed — tuletatud väärtus

Su loendur oli käsitsi arvutatud ja `joonista()`-s uuendatud. Vue's on see
**arvutatud väärtus**, mis uueneb ise:

```js
import { ref, computed } from 'vue'

const ulesanded = ref([])

const tegemata = computed(() => ulesanded.value.filter(u => !u.tehtud).length)
```

```html
<p>{{ tegemata }} tegemata, {{ ulesanded.length }} kokku</p>
```

Kui `ulesanded` muutub, arvutab Vue `tegemata` ise uuesti. Sa ei kutsu kunagi midagi.

**Reegel:** kui mingi väärtus on **arvutatav teistest väärtustest**, siis ta on
`computed`, mitte `ref`. Ära hoia `tegemata`-t eraldi muutujas, mida pead ise
sünkroonis hoidma — see on täpselt see viga, mida „olek → joonista" muster vältima
õpetas, ainult väiksemas mõõdus.

`computed` on ka ref, nii et scriptis on `tegemata.value`, templates `{{ tegemata }}`.

---

## 9. Komponendid: props alla, emit üles

Seni on kõik ühes `App.vue`-s. Päris rakenduses jagatakse see tükkideks.

**`components/UlesandeRida.vue`** — üks rida nimekirjas:

```vue
<script setup>
const props = defineProps({
    ulesanne: Object
})

const emit = defineEmits(['kustuta', 'lulita'])
</script>

<template>
  <li :class="{ tehtud: ulesanne.tehtud }">
    <input type="checkbox" :checked="ulesanne.tehtud" @change="emit('lulita', ulesanne.id)">
    {{ ulesanne.tekst }}
    <button @click="emit('kustuta', ulesanne.id)">x</button>
  </li>
</template>
```

**`App.vue`** kasutab seda:

```vue
<script setup>
import UlesandeRida from './components/UlesandeRida.vue'
</script>

<template>
  <ul>
    <UlesandeRida
      v-for="u in ulesanded"
      :key="u.id"
      :ulesanne="u"
      @kustuta="kustuta"
      @lulita="lulita"
    />
  </ul>
</template>
```

Kaks reeglit, mis on kogu komponendisüsteemi alus:

1. **Andmed liiguvad alla `props`-iga.** Vanem annab lapsele.
2. **Sündmused liiguvad üles `emit`-iga.** Laps ei muuda andmeid ise — ta hüüab
   „keegi vajutas kustuta nuppu" ja vanem otsustab, mida teha.

**Props on ainult lugemiseks.** Kui laps üritab `props.ulesanne = ...` teha, saab ta
hoiatuse. See tundub alguses tüütu, aga tänu sellele tead sa alati, **kus** andmeid
muudetakse: ainult seal, kus need elavad. Kümne komponendi juures on see vahe mägede
ja kuristiku vahel.

Komponendi nimi failis on `PascalCase` (`UlesandeRida.vue`) ja templates kasutad sama
nime.

---

## 10. onMounted — kus fetch käib

```js
import { ref, onMounted } from 'vue'

const ilm = ref(null)
const olek = ref('laadib')

async function lae() {
    olek.value = 'laadib'
    try {
        const vastus = await fetch(url)
        if (!vastus.ok) throw new Error(`Server vastas: ${vastus.status}`)
        ilm.value = await vastus.json()
        olek.value = 'valmis'
    } catch (viga) {
        console.error(viga)
        olek.value = 'viga'
    }
}

onMounted(() => {
    lae()
})
```

`onMounted` jookseb siis, kui komponent on lehele pandud. Siia käivad asjad, mis
peavad juhtuma „kohe alguses" — just see, mida tegi su `lae()` faili lõpus.

Pane tähele, et `joonista()` kutsumist **ei ole**. `olek.value = 'laadib'` muudab
ekraani kohe iseenesest.

---

## 11. watch — ja localStorage

Su to-do's oli localStorage'i salvestamine `joonista()` sees — nutikas nipp, aga veidi
peidetud. Vue's on selleks oma tööriist:

```js
import { ref, watch } from 'vue'

const ulesanded = ref([])

watch(ulesanded, () => {
    localStorage.setItem('ulesanded', JSON.stringify(ulesanded.value))
}, { deep: true })
```

Lugemine: „kui `ulesanded` muutub, salvesta." `{ deep: true }` on vajalik, sest sa
muudad ka objekte **massiivi sees** (`u.tehtud = true`) — ilma selleta märkab Vue ainult
seda, kui kogu massiiv asendatakse.

Laadimine käib nagu enne:

```js
const salvestatud = localStorage.getItem('ulesanded')
if (salvestatud) {
    ulesanded.value = JSON.parse(salvestatud)
}
```

---

## 12. Mida sa EI pea teadma

- **Options API** (`export default { data() { return {...} } }`) — vanem kirjapilt.
  Vanad õpetused on täis seda. Sina kirjutad `<script setup>` ehk Composition API
- **Vue 2** — aegunud, tugi lõppes 2023. Kui õpetus räägib `Vue.component()`-ist või
  `new Vue()`-st, sulge see
- **Vuex** — vana olekuhaldus. Asendus on Pinia, ja sedagi vajad alles siis, kui
  komponente on palju
- **`this`** — Options API-s oli `this.ulesanded`. `<script setup>`-is pole `this`-i
  üldse ja see on hea uudis
- **Mixins, filters** — Vue 2 asjad, kadunud
- **Nuxt** — Vue peale ehitatud raamistik. Hea asi, vale aeg
- **Slots, provide/inject, teleport** — päris funktsionaalsus, aga tuleb siis, kui
  props/emit jääb kitsaks. Praegu ei jää

---

## Kordamine — vasta endale enne ülesannete juurde minekut

1. Mis juhtub Vue's, kui sa massiivi muudad? Mida sa **ei** pea tegema?
2. Millal on `.value` kohustuslik ja millal keelatud?
3. Mis vahe on `src="pilt"` ja `:src="pilt"` vahel?
4. Mida teeb `@submit.prevent`?
5. Mida `v-model` asendab, kui võrdled vanilla JS-i koodiga?
6. Miks on `:key` kohustuslik ja miks ei tohi selleks kasutada indeksit?
7. Millal kasutad `computed`-i ja millal `ref`-i?
8. Kummas suunas liiguvad `props` ja kummas `emit`?
9. Miks on props ainult lugemiseks — mis sellest kasu on?
10. Mida teeb `scoped` `<style>` juures ja millise su varasema probleemi see lahendab?
