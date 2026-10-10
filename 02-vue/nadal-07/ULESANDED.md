# Nädal 7 — Vue jätk: router, composable'id, dokumentatsioon (~12 h)

**Materjal:** [OPPETUND.md](OPPETUND.md)
**Koodijupid:** [../../KOODIJUPID.md](../../KOODIJUPID.md)
**Dokumenteerimine:** [../../DOKUMENTEERIMINE.md](../../DOKUMENTEERIMINE.md)

Neli osa: **A** README-d olemasolevatele projektidele (1,5 h), **B** routeri katsed
(2,5 h), **C** ilmarakendus Vue's, mitmelehelisena (7 h), **D** koodijupid (30 min).

See nädal lõpetab ploki 2. Pärast seda läheme Java ja backendi juurde.

---

# OSA A — README-d (~1,5 h)

Loe kõigepealt [DOKUMENTEERIMINE.md](../../DOKUMENTEERIMINE.md) läbi — see on lühike.

Siis kirjuta `README.md` igale viiele valminud projektile:

- [ ] `01-veeb/nadal-02/cv/`
- [ ] `01-veeb/nadal-03/sait/`
- [ ] `01-veeb/nadal-04/todo/`
- [ ] `01-veeb/nadal-05/ilm/`
- [ ] `02-vue/nadal-06/todo-vue/`

**15 minutit tükk, mitte rohkem.** Kasuta malli, kuus osa, iga osa paar rida.

Üks asi, mida tähele panna: to-do ja to-do-vue on **sama rakendus kahel eri viisil**.
Kui kirjutad mõlema „Otsused ja põhjendused" osa, sunnib see sind sõnastama, mida Vue
päriselt ära teeb. See on parem arusaamise kontroll kui ükski minu küsimus.

### A on valmis kui
- [ ] Viis README-d olemas, igaühes kuus osa
- [ ] Mitte ükski neist ei kirjelda, *mida* kood teeb — ainult *miks* ja *kuidas käivitada*

---

# OSA B — Routeri katsed (~2,5 h)

Tee **uus** projekt katsetamiseks, et päris rakendust mitte sassi ajada:

```
npm create vite@latest router-proov
cd router-proov
npm install
npm install vue-router@4
npm run dev
```

### B1. Kaks lehte tööle

Tee `src/views/Avaleht.vue` ja `src/views/Info.vue` — mõlemas üks `<h1>`.
Tee `src/router.js`, muuda `main.js`, pane `App.vue`-sse `<RouterView />` ja kaks
`<RouterLink>`-i.

**Mida sa peaksid nägema:** lingil klikkides vahetub sisu, aga **URL muutub ka**.
Ja vajuta brauseri **tagasi-nuppu** — see töötab.
**Miks oluline:** see on terve mõte. Üks HTML-fail, mitu „lehte", brauseri ajalugu
töötab.

### B2. Leht ei lae uuesti

Pane `Avaleht.vue`-sse loendur (`ref` + nupp). Kliki paar korda, siis mine Infosse ja
tagasi.

**Mida sa peaksid nägema:** loendur on **nullis tagasi** — komponent loodi uuesti.
Nüüd pane sama loendur `App.vue`-sse (`<RouterView />` kõrvale) ja korda.
**Mida sa peaksid nägema:** nüüd **jääb** väärtus alles, sest `App.vue` ei vahetu.
**Miks oluline:** nii sa näed, mis vahetub ja mis jääb. Olek, mis peab lehtede vahel
püsima, elab `App.vue`-s või composable'is.

### B3. Võrdle `<a>`-ga

Lisa navi üks tavaline link: `<a href="/info">Info (a-tag)</a>`.

**Mida sa peaksid nägema:** klikkides **vilgub kogu leht** — brauser laeb rakenduse
nullist. Vahekaardi laadimisindikaator käivitub.
**Miks oluline:** `RouterLink` vs `a` vahe on silmaga nähtav. Rakenduse sees alati
`RouterLink`.

### B4. Aktiivne link tuleb tasuta

```css
nav a.router-link-active { font-weight: 600; }
```

**Mida sa peaksid nägema:** praegune leht on paksus kirjas, ise midagi tegemata.
**Miks oluline:** 3. nädalal kirjutasid sa `class="aktiivne"` kolmes failis käsitsi.
Router teab seda ise.

### B5. Parameeter URL-ist

Lisa marsruut `/linn/:nimi` ja vaade, mis kuvab `{{ route.params.nimi }}`.
Tee avalehele kaks linki: `/linn/Tartu` ja `/linn/Narva`.

**Mida sa peaksid nägema:** mõlemal lehel on õige nimi.

### B6. See lõks, mis sind tabab

Pane `LinnaVaade.vue`-sse:

```js
onMounted(() => {
    console.log("onMounted jooksis, nimi:", route.params.nimi)
})
```

Mine `/linn/Tartu` peale, siis kliki lingile `/linn/Narva`.

**Mida sa peaksid nägema:** konsoolis on `onMounted` **ainult üks kord** — teisel
klikil ta ei jookse. Aga `{{ route.params.nimi }}` templates muutus ära.
**Miks oluline:** kui su `lae()` on `onMounted`-is, näitab URL Narvat ja ekraan Tartut.
Veateadet ei tule. Lisa nüüd:

```js
watch(() => route.params.nimi, (uus) => {
    console.log("watch nägi muutust:", uus)
})
```

**Mida sa peaksid nägema:** nüüd reageerib iga vahetus.

### B on valmis kui
- [ ] Kuus katset tehtud
- [ ] Oskad öelda, miks `onMounted` teist korda ei jookse
- [ ] Oskad öelda, miks `watch(() => route.params.nimi, ...)` juures on nool vajalik

---

# OSA C — Ilmarakendus Vue's (~7 h)

**Mis valmis saab:** [nadal-05/ilm](../../01-veeb/nadal-05/ilm/) ümber tehtud Vue's,
kolme lehena, komponentidega ja composable'iga.

Uus projekt kaustas `02-vue/nadal-07/`:

```
npm create vite@latest ilm-vue
cd ilm-vue
npm install
npm install vue-router@4
```

### C1. Struktuur

```
src/
├── main.js
├── router.js
├── App.vue                      ← nav + <RouterView />
├── style.css                    ← :root muutujad, globaalne
├── views/
│   ├── Avaleht.vue              ← linnade kaardid grid-is
│   ├── LinnaVaade.vue           ← ühe linna ilm, kolm olekut
│   └── Info.vue                 ← mida rakendus teeb, mis API
├── components/
│   ├── LinnaKaart.vue           ← üks kaart avalehel
│   └── IlmaNaidik.vue           ← temperatuur + tuul
└── composables/
    ├── useLinnad.js             ← linnade nimekiri (jagatud, moodulitasemel)
    └── useIlm.js                ← fetch + kolm olekut
```

### C2. Marsruudid

```js
{ path: '/',           component: Avaleht },
{ path: '/linn/:nimi', component: LinnaVaade },
{ path: '/info',       component: Info }
```

### C3. `useLinnad.js` — jagatud olek

`ref` **väljaspool** funktsiooni, nii et kõik lehed näevad sama nimekirja:

```js
const linnad = ref([
    { nimi: "Tallinn", lat: 59.44, lon: 24.75 },
    { nimi: "Tartu",   lat: 58.38, lon: 26.72 },
    { nimi: "Pärnu",   lat: 58.39, lon: 24.50 },
    { nimi: "Narva",   lat: 59.38, lon: 28.19 }
])

export function useLinnad() {
    function leiaLinn(nimi) {
        return linnad.value.find(l => l.nimi === nimi)
    }
    return { linnad, leiaLinn }
}
```

`leiaLinn` on see, mida `LinnaVaade` vajab: URL-ist tuleb nimi, vaja on koordinaate.

### C4. `useIlm.js` — fetch kolme olekuga

`ref`-id **funktsiooni sees** (igal lehel oma olek). Vaata mall õppetunni §6-st, aga
kirjuta ise — loogika on sinu [nadal-05 app.js](../../01-veeb/nadal-05/ilm/app.js)-st
tuttav.

### C5. `Avaleht.vue`

- `useLinnad()`-ist linnade nimekiri
- `v-for` üle linnade, iga linn on `<LinnaKaart>`
- Kaardid grid-is: `repeat(auto-fit, minmax(250px, 1fr))`
- Iga kaart on klikitav ja viib `/linn/:nimi` peale

`LinnaKaart.vue` saab `props`-iga linna objekti ja sisaldab `<RouterLink>`-i:

```html
<RouterLink :to="`/linn/${linn.nimi}`">{{ linn.nimi }}</RouterLink>
```

### C6. `LinnaVaade.vue` — siin on nädala sisu koos

1. `useRoute()`-ist võta `route.params.nimi`
2. `useLinnad()`-ist `leiaLinn(nimi)` → koordinaadid
3. `useIlm()`-ist `olek`, `ilm`, `veateade`, `lae`
4. **Lae andmed nii, et parameetri muutumine töötab:**

```js
watch(() => route.params.nimi, (uusNimi) => {
    const linn = leiaLinn(uusNimi)
    if (linn) lae(linn)
}, { immediate: true })
```

5. Kolm olekut `v-if` / `v-else-if` / `v-else`-ga
6. Vea korral nupp „Proovi uuesti"
7. Andmed kuvab `<IlmaNaidik>` komponent (saab `props`-iga ilma objekti)

**Olematu linn:** kui keegi avab `/linn/Praha`, siis `leiaLinn` tagastab `undefined`.
Näita korralikku teadet, mitte krahhi. See on sinu [nadal-05 platshoideri
viga](../../01-veeb/nadal-05/ilm/app.js) uuel kujul — seekord tea seda ette.

### C7. CSS

- `:root` muutujad → `src/style.css` (globaalne)
- Komponendi oma stiilid → `<style scoped>` selles komponendis
- `nav a.router-link-active` → `App.vue` stiili
- Kontrast: tume tekst heledal või hele tumedal, mitte kaks keskmist tooni

### C8. README

Kirjuta `ilm-vue/README.md` **enne viimast commitit**, kuue osaga. „Otsused ja
põhjendused" alla kirjuta, miks composable ja mitte sama kood kahes failis.

### C9. Kontroll

**30 sekundit kõigepealt:**

1. **Ava leht.** Kas avaleht kuvab kaardid kohe?
2. **Konsool.** Tühi?
3. **Kliki läbi see, mida sa just muutsid.**

**Siis pikem:**

4. Kaardilt klikkimine viib õigele linnale, URL muutub
5. **Linnalt linnale** liikumine (otse ühelt lehelt teisele) uuendab andmeid — see on
   B6 lõks
6. Brauseri **tagasi-nupp** töötab
7. **Lehe värskendamine** (F5) `/linn/Tartu` peal töötab — leht ei tohi anda viga
8. Network → **Slow 3G** → laadimisolek on näha
9. Network → **Offline** → veateade ja „Proovi uuesti" nupp
10. `/linn/Praha` → korralik teade, mitte krahh
11. 360px juures kasutatav
12. `node_modules` ei ole gitis

### C on valmis kui
- [ ] Kõik 12 punkti läbitud
- [ ] README olemas
- [ ] Commititud ja pushitud

---

# OSA D — Koodijupid (~30 min)

[KOODIJUPID.md](../../KOODIJUPID.md) on sulle tehtud, aga ta peab **sinu omaks** saama.

Nädala lõpus:

- [ ] Lisa sinna routeri jupid: `router.js` põhi, `RouterLink`, `useRoute`,
      parameetri `watch`
- [ ] Lisa composable'i põhi
- [ ] Lisa `router-link-active` CSS
- [ ] **Kustuta või paranda** iga jupp, mis sulle tegelikult ei sobinud
- [ ] Kui vaatasid sel nädalal midagi kolmandat korda järele ja seda seal ei ole —
      lisa, oma sõnadega

See on 30 minutit nädalas ja kuue kuu pärast on sul oma tööriistakast, mida sa
päriselt usaldad, sest sa kirjutasid selle ise.

---

# Nädala lõpp

- [ ] Õppetund läbi loetud, 10 kordamisküsimust vastatud (saada vastused mulle)
- [ ] Osa A: viis README-d
- [ ] Osa B: kuus routeri katset
- [ ] Osa C: ilm-vue, 12 punkti, README
- [ ] Osa D: koodijupid uuendatud
- [ ] Päevik täidetud, kõik commititud ja pushitud
