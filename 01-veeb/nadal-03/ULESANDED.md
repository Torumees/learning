# Nädal 3 — CSS layout, grid ja responsive (~12 h)

**Materjal:** [OPPETUND.md](OPPETUND.md) — kõik teemad lahti seletatud.
**Otsitav käsiraamat:** https://claude.ai/code/artifact/2bee9315-6ff4-414c-b5d7-e4c15e807345

Nädala jagu tööd kolmes osas: **A** parandad CV ära (1 h), **B** teed seitse katset,
et näha oma silmaga, kuidas asjad käituvad (4 h), **C** ehitad kolmelehelise saidi (6 h).

Endiselt: mitte ühtegi kopeeritud rida. Kui miski tundub liiga keeruline, küsi minult
selgitust — see on kiirem kui kopeerimine ja erinevalt kopeerimisest jääb külge.

---

# OSA A — CV lihv (~1 h)

Fail: [../nadal-02/cv/style.css](../nadal-02/cv/style.css) ja `index.html` samas kaustas.

Käi need punktid läbi järjekorras. **Ava leht brauseris iga punkti järel**, mitte lõpus —
kui midagi läheb katki, tahad teada, milline muudatus selle tegi.

### A1. Viis värvireeglit üheks

Praegu on `style.css`-is `color` kirjas viis korda: `h1`, `h2`, `h3`, `p`, `li`.
Kustuta kõik viis ja kirjuta asemele:

```css
body { color: var(--varv-tekst); background-color: var(--varv-taust); }
p    { color: var(--varv-rohutus); }
```

**Mida sa peaksid nägema:** leht näeb välja täpselt sama. Pealkirjad on ikka heledad,
lõigud ikka hallid — kuigi sa ei ütle neile enam midagi.
**Miks:** värv pärandub vanemalt lapsele. Kui sa seda usaldad, on värvi muutmiseks üks
koht, mitte viis. Õppetund §3.

### A2. box-sizing kõikjale

Praegu on `box-sizing: border-box` ainult `section`-il. Tõsta see kõige ette:

```css
* { box-sizing: border-box; }
```

Ja kustuta see `section`-i reeglist ära.

**Miks:** `*` tähendab „iga element lehel". Praegu kehtib see ainult sektsioonidel, seega
iga teine element käitub teistmoodi kui sektsioonid — ja see tuleb välja kõige
ebamugavamal hetkel.

### A3. Vorm püsti

`form { display: flex }` paneb labelid ja väljad **kõrvuti ühte ritta**, sest flexi
vaikesuund on `row`. Lisa:

```css
form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 400px;
}
```

**Mida sa peaksid nägema:** enne parandust on vorm üks pikk rida ja praktiliselt
kasutamatu. Pärast on iga label oma välja kohal.
**Enne parandamist ava leht ja vaata seda ära** — sa pead nägema, mis viga see oli.

### A4. Sisu keskele

`main { max-width: 50% }` teeb kaks viga korraga: protsent sõltub vanema laiusest
(telefonis surub sisu poolde ekraani laiuseks) ja `margin` puudub, seega sisu istub
vasakul. Asenda:

```css
main { max-width: 65ch; margin: 0 auto; }
```

**Mida sa peaksid nägema:** sisu on nüüd keskel ja tekstirida on mugava pikkusega.
Venita brauseri akent laiaks — sisu ei veni enam kaasa.

### A5. Ülejäänud

- **Kustuta `button`-reegel** — sinu HTML-is ei ole ühtegi `<button>`-it. Või parem:
  muuda HTML-is `<input type="submit" value="Submit">` → `<button type="submit">Saada</button>`
  ja jäta reegel alles
- **`--var-tekst` → `--varv-tekst`** kõigis kohtades. Nimed peavad olema ühes süsteemis
- **`index.html:2`** → `lang="et"` (praegu `en`, aga sisu on eesti keeles)
- **E-posti väli** → `type="email"`. **Sõnumi väli** → `<textarea id="..." rows="5">`
- **Lisa `<h2>Kontakt</h2>`** kontaktisektsiooni algusesse — teistel sektsioonidel on
  pealkiri olemas, sellel ei ole
- **Kontrast:** `--varv-rohutus: gray` halli `rgb(102,101,101)` taustal ei ole loetav.
  Tee üks neist heledamaks või tumedamaks
- **Semikoolonid** ridade 25, 29, 38 lõppu
- **Kustuta `class="section"`** kõigilt sektsioonidelt — sa stiilid `section`-it otse,
  neid klasse ei kasuta keegi

### A on valmis kui
- [ ] Leht näeb välja sama hea või parem kui enne
- [ ] CSS on lühem kui enne
- [ ] Vorm on püsti, sisu keskel, konsool tühi
- [ ] Commititud

---

# OSA B — Seitse katset (~4 h)

**Mis need on:** seitse väikest katset ühes prügifailis. Mõte ei ole tulemus, vaid see,
et sa näed oma silmaga, mis juhtub. Iga katse juures on kirjas, mida sa **nägema**
peaksid — kui sa seda ei näe, siis midagi on valesti ja see ongi huvitav koht.

**Kuidas:** tee fail `01-veeb/nadal-03/proov.html`, pane CSS `<style>` blokki sinna
sisse (siin on see lubatud, sest fail visatakse ära). Hoia DevTools kogu aeg lahti:
Elements → Styles ja Computed. Pärast nädalat kustuta fail.

### B1. Inline ei kuula sind

Tee kaks `<span>`-i tekstiga. Anna mõlemale `background: red; height: 100px;`.

**Mida sa peaksid nägema:** punane taust tuleb, aga kõrgust **ei tule** — span jääb
teksti kõrguseks. Lisa `display: inline-block` ja kõrgus tekib.
**Mida see seletab:** miks `<a>`-le antud `padding` või `height` vahel „ei tööta".

### B2. Nav-riba kahe reaga

Tee `<nav>`, mille sees on vasakul su nimi (`<span>`) ja paremal kolm linki
(`<div>` sees). Pane navile:

```css
nav { display: flex; justify-content: space-between; align-items: center; }
```

**Mida sa peaksid nägema:** nimi liibub vasakusse serva, lingid paremasse, vaba ruum
on nende vahel. Venita akent — nad jäävad servadesse kinni.
**Miks oluline:** see on Osa C nav-riba. Tee see siin valmis, siis on seal lihtne.

### B3. Kumb suund on kumb

Tee konteiner kolme värvilise kastiga. Pane konteinerile `display: flex` ja
`flex-direction: column`. Siis muuda kordamööda `justify-content` ja `align-items`
väärtusi (`center`, `flex-end`, `space-between`) ja vaata, **mis liigub**.

**Mida sa peaksid nägema:** `column` puhul liigutab `justify-content` kaste üles-alla
ja `align-items` vasakule-paremale. `row` puhul on vastupidi.
**Ära õpi pähe.** Ma ise ka ei mäleta seda peast — ma panen ühe ja vaatan.

### B4. Grid ja veergude arv

Tee kuus kasti ühe konteineri sees. Pane konteinerile:

```css
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 1rem;
```

**Mida sa peaksid nägema:** kaks rida, kolm kasti reas. Venita akent — veergude arv
**ei muutu**, kastid lähevad ainult kitsamaks kuni loetamatuks.

Nüüd vaheta see rida:

```css
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
```

**Mida sa peaksid nägema:** nüüd muutub **veergude arv** akna venitamisel — kolm, kaks,
üks. Ja sa ei kirjutanud ühtegi media queryt.
**See on nädala kõige kasulikum rida.** Veendu, et sa näed vahet.

### B5. Miks protsent ja gap ei käi kokku

Sama grid, aga `grid-template-columns: 50% 50%` ja `gap: 1rem`.

**Mida sa peaksid nägema:** teine veerg jookseb üle ääre või tekib horisontaalne kerimine.
Sest 50% + 50% + 1rem on rohkem kui 100%.
Vaheta `1fr 1fr` vastu — probleem kaob, sest `fr` arvutab gapi maha juba enne jagamist.

### B6. Sticky päis

Pane lehele `<header>` ja selle alla piisavalt teksti, et tekiks kerimist
(nt 20 lõiku `<p>Tekst</p>`). Siis:

```css
header { position: sticky; top: 0; background-color: white; }
```

**Mida sa peaksid nägema:** päis jääb kerimisel üles.
Nüüd **võta `background-color` ära** ja keri uuesti: sisu keritakse päisest läbi ja
kõik on loetamatu segadus. Pane tagasi.
**Mida see seletab:** miks sticky päisele on taustavärv kohustuslik, mitte kaunistus.

### B7. Absolute vajab vanemat

Tee kaart (`div`, taustavärv, padding) ja selle sisse silt (`span`). Siis:

```css
.kaart { position: relative; }
.silt  { position: absolute; top: 10px; right: 10px; }
```

**Mida sa peaksid nägema:** silt istub kaardi paremas ülanurgas.
Nüüd **kustuta `.kaart { position: relative }`** ja vaata: silt lendab **lehe** paremasse
ülanurka.
**Mida see seletab:** `absolute` otsib lähimat vanemat, millel on `position`. Kui ei
leia, kasutab lehte. See on üks sagedasemaid „miks see element on vales kohas" põhjuseid.

### B on valmis kui
- [ ] Kõik seitse katset tehtud ja sa **nägid** kirjeldatud käitumist oma ekraanil
- [ ] Kirjutasid päevikusse, milline neist oli kõige ootamatum

---

# OSA C — Kolmeleheline sait (~6 h)

**Mis valmis saab:** kolm HTML-lehte, mis on ühe navigatsiooniga seotud, jagavad ühte
CSS-faili ja töötavad nii telefonis kui laual. Sisu on sinu enda oma.

Kaust: `01-veeb/nadal-03/sait/`

```
index.html       avaleht
projektid.html   projektide kaardid
kontakt.html     kontaktvorm
style.css        üks fail kõigi kolme jaoks
```

### C1. Navigatsioon (tee see kõigepealt)

Iga lehe `<body>` alguses sama `<nav>`:

```html
<nav>
  <span class="logo">Egert Tooming</span>
  <div class="lingid">
    <a href="index.html">Avaleht</a>
    <a href="projektid.html">Projektid</a>
    <a href="kontakt.html">Kontakt</a>
  </div>
</nav>
```

Praegusel lehel olevale lingile lisa `class="aktiivne"` ja stiili see eristuvaks
(nt teine värv või alljoon). Ehk `index.html`-is on esimene link aktiivne,
`projektid.html`-is teine, `kontakt.html`-is kolmas.

**Kontroll:** kliki igalt lehelt igale lehele. Üheksa klikki, kõik peavad töötama, ja
sa pead alati nägema, millisel lehel sa oled.

### C2. Avaleht — `index.html`

- `<h1>` sinu nimi
- Üks lõik selle kohta, kes sa oled ja mida praegu õpid. Päris tekst, 2–4 lauset
- Väike loend sellest, mida sa siiani teinud oled (`<ul>`)
- Link CV-lehele: `<a href="../../nadal-02/cv/index.html">Minu CV</a>`

### C3. Projektid — `projektid.html`

Siin on grid. Tee 3–4 kaarti, iga kaart on üks `<article>`:

```html
<div class="kaardid">
  <article class="kaart">
    <h2>CV-leht</h2>
    <p>Mida tegin ja mis oli raske.</p>
    <p class="tehnika">HTML, CSS</p>
  </article>
  ...
</div>
```

CSS:

```css
.kaardid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
```

**Sisu peab olema päris.** Sinu CV-leht, sinu Pythoni asjad, see sait ise. Kui projekte
on kolm, tee kolm kaarti — mitte kuus tühja. Väheseid päris asju on parem näidata kui
palju väljamõeldud asju.

### C4. Kontakt — `kontakt.html`

Sama vorm nagu CV-lehel (nimi, e-post, `<textarea>`, nupp), labelid korralikult seotud.
Lisaks kontaktandmed tekstina.

Vorm ei pea kuhugi saatma — backend tuleb 13. nädalal. Praegu on oluline, et märgistus
on õige.

### C5. Responsive

Kirjuta baasstiil **telefonile** (kitsas ekraan, üks veerg), siis laienda:

```css
@media (min-width: 700px) {
  /* mis muutub laial ekraanil */
}
```

Vali murdepunkt selle järgi, kus **sinu** layout katki läheb: venita brauseri akent
kitsamaks ja vaata, mis kohas hakkab kehv välja nägema. See number pane media query'sse.

### C6. Kontrollnimekiri enne commitimist

Käi kõik läbi, see on osa ülesandest:

1. **Nav:** üheksa klikki, kõik töötavad, aktiivne leht alati näha
2. **Console** (F12): tühi, ilma punase tekstita
3. **Network** (F12): ükski rida ei ole punane — see tähendaks, et mõnda faili ei leitud
4. **Telefonivaade** (Ctrl+Shift+M): 360px juures loetav, **horisontaalset kerimist ei ole**
5. **Lauavaade:** 1440px juures ei ole sisu üle ekraani venitatud (`max-width` + `margin: 0 auto`)
6. **Valideerimine:** validator.w3.org → kõik kolm lehte eraldi, 0 viga
7. **Üks CSS-fail:** `style.css` on üks kord olemas ja kõik kolm lehte lingivad sellele
8. **Seletustest:** mine `style.css`-ist ülalt alla ja ütle iga rea kohta valjusti, mis see
   teeb. Iga rida, mille juures sa kokutad, kustuta ja kirjuta uuesti

### C on valmis kui
- [ ] Kõik kaheksa kontrollpunkti läbitud
- [ ] Commititud ja pushitud

---

# Üks asi, mida tähele panna

Kui sa kolmandat korda sama `<nav>` blokki kopeerid, hakkab see tüütama. Ja kui sa
muudad ühte linki, pead seda tegema kolmes failis.

**Kirjuta see tunne päevikusse üles.** 6. nädalal, kui jõuame Vue komponentideni, saad
teada, mille jaoks need täpselt leiutati. Ja see on kordades arusaadavam, kui sa oled
seda valu ise tundnud — mitte lugenud, et „komponendid võimaldavad koodi taaskasutust".

---

# Nädala lõpp

- [ ] Õppetund läbi loetud, kaheksa kordamisküsimust vastatud (saada vastused mulle)
- [ ] Osa A: CV lihvitud
- [ ] Osa B: seitse katset tehtud
- [ ] Osa C: sait valmis, kaheksa kontrollpunkti läbitud
- [ ] Päevik täidetud, kõik commititud ja pushitud
