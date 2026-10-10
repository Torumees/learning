# Vue jätk — komponendid, router ja jagatud loogika

6. nädal andis sulle reaktiivsuse. See nädal annab **struktuuri**: kuidas rakendus
mitmest lehest ja mitmest komponendist kokku panna nii, et see ei lähe sassi.

Palju on kordus. Uut on kolm asja: **router**, **composable'id** ja üks konkreetne
lõks, mis sind kindlasti tabab (§5).

---

## 1. Millal teha komponent

6. nädalal tegid sa `UlesandeRida.vue`, sest ma ütlesin, et tee. Aga kuidas päriselt
otsustada?

**Kolm märki, et miski peaks olema eraldi komponent:**

1. **See kordub.** Nimekirja rida, kaart, nupp — kõik, mis esineb `v-for`-is
2. **See on iseseisev tükk, millel on oma olek.** Modaalaken, vorm, rippmenüü
3. **Fail on liiga pikk, et seda ühe pilguga haarata.** Praktiline piir on umbes
   150 rida. Kui sa pead kerima, et templatet näha, on aeg jagada

**Ja kolm märki, et sa jagad liiga vara:**

1. Komponent saab viis `props`-i ja emitib neli sündmust — side on nii tihe, et ta ei
   olegi iseseisev
2. Sa pead vanemas ja lapses sama asja kahes kohas muutma
3. Komponendis on kolm rida HTML-i ja mitte mingit loogikat

**Rusikareegel: jaga siis, kui tunned valu, mitte enne.** Ennatlik jagamine teeb
rohkem kahju kui liiga pikk fail.

---

## 2. computed, meetod või watch

Kolm sarnast asja, mida aetakse pidevalt segi. Vahe on lihtne.

### computed — tuletatud väärtus

```js
const tegemata = computed(() => ulesanded.value.filter(u => !u.tehtud).length)
```

Kasuta, kui **väärtus arvutatakse teistest väärtustest**. Vue arvutab selle ise uuesti,
kui sisend muutub, ja **mäletab tulemust** (cache) — kui sa seda templates kümme korda
kasutad, arvutatakse üks kord.

### Meetod — kui vajad argumente

```js
function kuvaKraadid(linn) {
    return `${linn.temp} °C`
}
```

Kasuta, kui vajad **argumenti**. `computed` ei võta argumente. Meetod arvutatakse iga
kord uuesti, cache'i ei ole.

### watch — kui pead midagi TEGEMA

```js
watch(ulesanded, () => {
    localStorage.setItem('ulesanded', JSON.stringify(ulesanded.value))
}, { deep: true })
```

Kasuta, kui muutuse peale on vaja **kõrvaltoimingut**: salvestamine, päring, logimine.

**Otsustusreegel:**

| Mida tahad | Kasuta |
|---|---|
| uut **väärtust** andmetest | `computed` |
| väärtust, mis sõltub **argumendist** | tavaline funktsioon |
| **tegevust** muutuse peale (salvesta, lae, logi) | `watch` |

Kõige sagedasem viga on `watch`-i kasutamine seal, kus peaks olema `computed`:

```js
// ❌ HALB — käsitsi sünkroonis hoidmine, täpselt see viga, mida vältima õppisid
const tegemata = ref(0)
watch(ulesanded, () => { tegemata.value = ulesanded.value.filter(...).length })

// ✅ HEA
const tegemata = computed(() => ulesanded.value.filter(...).length)
```

---

## 3. Elutsükkel

```js
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
    // komponent on lehel, DOM on olemas
    lae()
})

onUnmounted(() => {
    // komponent eemaldatakse — koristus
    clearInterval(taimer)
})
```

`onMounted` on see, mida sa vajad 95% ajast: algandmete laadimine.

`onUnmounted` on koristuseks. Kui sa käivitad `setInterval`-i ja ei peata seda, jookseb
see edasi ka pärast seda, kui komponent on lehelt kadunud — ja sa saad vigu objektide
kohta, mida enam ei ole.

---

## 4. vue-router — mitu lehte ühes rakenduses

Paigaldus:

```
npm install vue-router@4
```

**`src/router.js`:**

```js
import { createRouter, createWebHistory } from 'vue-router'
import Avaleht from './views/Avaleht.vue'
import LinnaVaade from './views/LinnaVaade.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/',             component: Avaleht },
        { path: '/linn/:nimi',   component: LinnaVaade },
        { path: '/info',         component: Info }
    ]
})

export default router
```

**`src/main.js`** — lisa kaks rida:

```js
import router from './router'

createApp(App).use(router).mount('#app')
```

**`App.vue`** muutub raamiks, mille sisse lehed joonistatakse:

```vue
<template>
  <nav>
    <RouterLink to="/">Avaleht</RouterLink>
    <RouterLink to="/info">Info</RouterLink>
  </nav>

  <main>
    <RouterView />
  </main>
</template>
```

- **`<RouterLink to="...">`** asendab `<a href="...">`. Vahe: leht **ei laeta uuesti**,
  vahetatakse ainult komponent. Seepärast ei kao olek ära
- **`<RouterView />`** on koht, kuhu praegune leht joonistatakse

`RouterLink` saab automaatselt klassi `router-link-active`, kui see on praegune leht —
see asendab su käsitsi tehtud `class="aktiivne"` loogika 3. nädalast:

```css
nav a.router-link-active { font-weight: 600; color: var(--varv-rohutus); }
```

### Parameetrid URL-ist

Marsruut `/linn/:nimi` tähendab, et `:nimi` on muutuv osa. `/linn/Tartu` →
`nimi` on `"Tartu"`.

```vue
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route.params.nimi)     // "Tartu"
</script>
```

Lingi tegemine:

```html
<RouterLink :to="`/linn/${linn.nimi}`">{{ linn.nimi }}</RouterLink>
```

Pane tähele `:to` kaksikpunktiga ja tagurpidi ülakomad — see on muutuja, mitte tekst.

---

## 5. LÕKS: parameetri muutumine ei käivita onMounted'i

See tabab sind kindlasti, nii et loe see läbi enne, kui tund aega otsid.

Oletame, et oled lehel `/linn/Tartu` ja klikid lingile `/linn/Narva`.

**Vue ei loo komponenti uuesti.** Marsruut on sama (`/linn/:nimi`), komponent on sama —
Vue lihtsalt **taaskasutab** olemasolevat ja muudab ainult parameetrit.

Tagajärg: **`onMounted` ei käivitu teist korda.** Su `lae()` ei jookse. URL näitab
Narvat, ekraan näitab Tartut, ja veateadet ei tule.

Lahendus — jälgi parameetrit:

```js
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

onMounted(() => {
    lae(route.params.nimi)
})

watch(() => route.params.nimi, (uusNimi) => {
    lae(uusNimi)
})
```

Pane tähele `watch` esimest argumenti: **`() => route.params.nimi`**, mitte
`route.params.nimi`. Nool on vajalik, sest `watch` tahab teada, **kuidas** väärtuseni
jõuda — mitte väärtust ennast sel hetkel. Ilma noolega annaksid sa talle stringi
`"Tartu"`, mis ei muutu kunagi.

Lühem variant, mis katab mõlemad korraga:

```js
watch(() => route.params.nimi, (uusNimi) => {
    lae(uusNimi)
}, { immediate: true })      // immediate: jookse ka kohe, mitte ainult muutusel
```

`{ immediate: true }` asendab `onMounted`-i ära.

---

## 6. Composable — korduv loogika ühte kohta

Sinu ilmarakenduses on muster, mida sa vajad igal lehel: kolm olekut, `fetch`,
`vastus.ok` kontroll, `try/catch`. Kui sul on kaks lehte, mis mõlemad andmeid laevad,
peaksid sa selle kaks korda kirjutama.

**Composable on tavaline funktsioon, mis tagastab reaktiivseid asju.** Nimi algab
kokkuleppeliselt `use`-ga.

**`src/composables/useIlm.js`:**

```js
import { ref } from 'vue'

export function useIlm() {
    const olek = ref('laadib')
    const ilm = ref(null)
    const veateade = ref('')

    async function lae(linn) {
        olek.value = 'laadib'
        try {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${linn.lat}&longitude=${linn.lon}&current=temperature_2m,wind_speed_10m`
            const vastus = await fetch(url)
            if (!vastus.ok) throw new Error(`Server vastas: ${vastus.status}`)
            ilm.value = await vastus.json()
            olek.value = 'valmis'
        } catch (viga) {
            console.error(viga)
            olek.value = 'viga'
            veateade.value = 'Ilmaandmeid ei õnnestunud laadida.'
        }
    }

    return { olek, ilm, veateade, lae }
}
```

Kasutamine ükskõik millises komponendis:

```vue
<script setup>
import { useIlm } from '../composables/useIlm'

const { olek, ilm, veateade, lae } = useIlm()
</script>
```

See on **täpselt see**, mida sa ise tahtsid: koodijupp, mis on ühes kohas ja mida sa
igal pool uuesti kasutad. Vue's on sellel lihtsalt nimi.

### Oluline vahe: iga kutse annab oma koopia

```js
const { olek } = useIlm()   // komponent A saab oma olek'u
const { olek } = useIlm()   // komponent B saab OMA, eraldi olek'u
```

See on tavaliselt see, mida sa tahad.

### Jagatud olek — kui tahad ühist

Kui mitu komponenti peavad **sama** olekut nägema, pane `ref` funktsioonist **välja**:

```js
// src/composables/useLinnad.js
import { ref } from 'vue'

const linnad = ref([                        // ← VÄLJASPOOL funktsiooni
    { nimi: "Tallinn", lat: 59.44, lon: 24.75 },
    { nimi: "Tartu",   lat: 58.38, lon: 26.72 }
])

export function useLinnad() {
    function lisaLinn(linn) {
        linnad.value.push(linn)
    }
    return { linnad, lisaLinn }
}
```

Nüüd on `linnad` **moodulitasemel** — see luuakse üks kord ja kõik komponendid näevad
sama massiivi. See on lihtsaim olekuhaldus, mis olemas on, ja 90% rakendustest ei vaja
rohkem. (Pinia on sama asi, ainult tööriistadega.)

**Reegel: `ref` funktsiooni sees = igaühele oma. `ref` funktsioonist väljas = ühine.**

---

## 7. Mida sa EI pea teadma

- **Pinia / Vuex** — olekuhaldus. Moodulitasemel `ref` katab su vajadused praegu ära
- **Navigation guards** (`beforeEach`) — vaja siis, kui on sisselogimine. 15.+ nädal
- **Lazy loading / `defineAsyncComponent`** — optimeerimine. Hiljem
- **`createWebHashHistory`** — vana `#/leht` stiil. Kasuta `createWebHistory`
- **Nested routes, named views** — päris funktsionaalsus, aga sul pole veel vajadust
- **`provide` / `inject`** — props'i alternatiiv sügavate puude jaoks. Composable on
  enamasti parem
- **`<Suspense>`, `<Teleport>`, `<KeepAlive>`** — eksootika, tulevad siis, kui vaja
- **Server-side rendering, Nuxt** — teine maailm

---

## Kordamine

1. Millal teha eraldi komponent ja millal mitte?
2. Mis vahe on `computed`-il, tavalisel funktsioonil ja `watch`-il?
3. Miks ei tohi `watch`-iga käsitsi `ref`-i sünkroonis hoida?
4. Mis vahe on `<RouterLink to="/x">` ja `<a href="/x">` vahel?
5. Kuidas loed URL-ist parameetrit?
6. Oled lehel `/linn/Tartu` ja klikid `/linn/Narva`. Mis **ei** juhtu ja miks?
7. Miks on `watch(() => route.params.nimi, ...)` juures nool kohustuslik?
8. Mida teeb `{ immediate: true }`?
9. Mis on composable ja mille poolest ta tavalisest funktsioonist erineb?
10. Kuidas teha nii, et kaks komponenti näeksid **sama** olekut?
