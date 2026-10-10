# Dokumenteerimine — minimaalne standard

Sa ütlesid, et ei taha sellele aega kulutada. Hea — **enamik sellest, mida inimesed
dokumentatsiooniks peavad, on ka päriselt raiskamine.** Siin on see osa, mis ei ole.

Mahuks: **üks leht README-d projekti kohta ja viis-kuus kommentaari koodis.**
15 minutit projekti lõpus.

---

## Miks

Kolm päris põhjust, mitte „nii on kombeks":

1. **Kolme kuu pärast oled sa võõras oma koodis.** See ei ole oletus — sa oled seda
   juba kogenud. Kui sa septembris kirjutasid `joonista()`, teadsid sa iga rida. Kui
   sa sama koodi jaanuaris avad, ei tea. README on kiri iseendale.

2. **Tööintervjuul loetakse esimesena README-d.** Mitte koodi. Kui GitHubis on projekt
   ilma selgituseta, vaatab inimene 10 sekundit ja läheb edasi. Sinu projektide
   tugevus ongi praegu see, et sa tead, mida tegid — aga seda peab koodist väljaspool
   ka näha olema.

3. **Õppekava nõuab seda.** Õpiväljundid: „Dokumenteerib API-teenused Swagger/OpenAPI
   standardi järgi", „Koostab projekti dokumentatsiooni ja tehnilise kirjelduse",
   „Esitleb valminud lahendust ja põhjendab selle tehnilist teostust". 15. nädalal
   tuleb Swagger, 25.–26. nädalal lõpuprojekti dokumentatsioon ja kaitsmine.

---

## Mida MITTE kirjutada

See osa säästab sul kõige rohkem aega.

**Ära kirjelda, mida kood teeb.** Kood ütleb seda ise, paremini ja täpsemalt.

```js
// ❌ MÕTTETU — kordab koodi
// Filtreerib ülesanded
ulesanded = ulesanded.filter(u => u.id !== id);

// ❌ MÕTTETU
// Loendur
const tegemata = ulesanded.filter(u => !u.tehtud).length;
```

Sellised kommentaarid on halvemad kui mitte midagi, sest nad **vananevad**. Muudad
koodi, kommentaar jääb vanaks, ja järgmine lugeja usub kommentaari.

**Ära kirjuta ka:**
- Funktsioonide nimekirja („`lisa()` lisab ülesande") — see on koodis näha
- Pikki kirjeldusi tehnoloogiatest („Vue on reaktiivne raamistik...") — keegi ei loe
- Seda, mis muutub iga nädal — see vananeb kiiremini kui jõuad uuendada

---

## Mida kirjutada: asju, mida kood EI SAA öelda

```js
// ✅ MIKS — koodist ei ole näha
// Loendur ja salvestamine peavad olema tsüklist väljas, muidu tühja massiivi
// puhul nad ei käivitu ja kustutatud ülesanded tulevad F5 järel tagasi.

// ✅ MIKS — valik, mille taga on põhjus
// deep: true on vajalik, sest muudame ka objekte massiivi sees (u.tehtud)

// ✅ HOIATUS — päästab järgmise inimese tunni
// vastus.ok kontroll on kohustuslik: fetch ei viska 404 peal viga
```

**Reegel: kommenteeri MIKS, mitte MIDA.**

Kui sa kirjutad kommentaari ja see algab sõnadega „see rida...", siis tõenäoliselt
kordad koodi. Kui see algab „sellepärast, et..." või „muidu...", siis on hästi.

Hea mõõdupuu: **kommenteeri seda kohta, kus sa ise kahtlesid.** Kui sa pidid millegi
peale 20 minutit mõtlema, on seal kommentaar väärt.

---

## README mall

Kopeeri see iga projekti juurkausta faili nimega `README.md`. Kuus osa, iga osa paar
rida.

```markdown
# Projekti nimi

Üks lause: mida see teeb ja kelle jaoks.

## Mida see oskab

- Punkt kaupa, mida kasutaja teha saab
- 3-6 punkti, mitte rohkem

## Tehnoloogiad

- Loetelu: HTML, CSS, JavaScript / Vue 3 / Spring Boot jne
- Välised teenused: nt Open-Meteo API (võtmeta)

## Käivitamine

Täpsed käsud, mida kopeerides saab töötava rakenduse:

​```
npm install
npm run dev
​```

Ava http://localhost:5173

## Otsused ja põhjendused

- **Miks X ja mitte Y** — 1-2 lauset olulisemate valikute kohta
- Nt: "Olek on ühes massiivis ja üks funktsioon joonistab kogu nimekirja uuesti,
  mitte DOM-i ükshaaval muutmine — nii ei saa ekraan ja andmed lahku minna."

## Mis on pooleli või teadaolevalt katki

- Aus nimekiri. See ei ole nõrkus, see on professionaalsus
- Nt: "Vorm ei saada kuhugi — backend tuleb hiljem."
```

**„Otsused ja põhjendused" on kõige väärtuslikum osa** ja seda jätab enamik inimesi
välja. Just see näitab, et sa mõtlesid, mitte ainult kirjutasid. Ja just seda küsitakse
tööintervjuul: „miks sa nii tegid?"

**„Mis on pooleli" on teine, mida tasub kirjutada.** Sa oled juba näidanud, et sa
oskad seda ausalt teha — su projektilehel oli kirjas, et mall-näide tehti AI-ga ja
sellest ei õpi palju. See ausus on haruldane ja see töötab sinu kasuks.

---

## Kui palju

| Mida | Kui palju |
|---|---|
| README | üks leht, kuus osa, ~15 min |
| Koodikommentaarid | 5-6 projekti kohta, ainult „miks" |
| Funktsiooni kommentaar | ainult siis, kui nimi ei ütle kõike |
| Muutuja kommentaar | peaaegu mitte kunagi — pane parem nimi |

**Kui kood vajab palju kommentaare, on kood halb.** Hea nimi asendab kommentaari:
`tegemataUlesandeid` ei vaja selgitust, `temp2` vajab.

---

## Millal kirjutada

**Mitte alguses ja mitte lõpus.** Kirjuta README **siis, kui projekt töötab ja sa
mäletad veel, mida sa otsustasid.** Alguses sa ei tea veel, lõpus oled juba unustanud.

Praktikas: kui rakendus läbib su 30-sekundilise kontrolli, kirjuta README enne
viimast commitit.

---

## Esimene ülesanne

Sul on neli valmis projekti ilma README-ta:

- `01-veeb/nadal-02/cv/`
- `01-veeb/nadal-03/sait/`
- `01-veeb/nadal-04/todo/`
- `01-veeb/nadal-05/ilm/`
- `02-vue/nadal-06/todo-vue/`

Kirjuta igaühele üks. **15 minutit tükk, mitte rohkem.**

Ja pane tähele, mis juhtub, kui kirjutad „Otsused ja põhjendused" osa to-do ja
Vue-versiooni kohta. Need on sama rakendus kahel eri viisil — ja selle vahe
sõnastamine on kõige parem viis kontrollida, kas sa päriselt aru saad, mida Vue teeb.
