# CSS layout — õppetund

Loe see läbi koos avatud redaktoriga ja proovi iga näide järele. Lugemine üksi ei jää
külge; kirjutamine jääb.

---

## 1. Üks mõttemudel, mis teeb CSS-i loogiliseks

CSS tundub juhuslik seni, kuni sul on peas vale pilt. Õige pilt on lihtne:

**Iga element on ristkülikukujuline kast. Kastid on vooluses (flow) — ülalt alla,
vasakult paremale. CSS-i layout tähendab ainult kolme asja: kasti suurus, kasti koht
vooluses, ja kas ta on vooluses üldse.**

Kõik ülejäänu on detail.

---

## 2. Block ja inline — miks div läheb alla ja span kõrvuti

Igal elemendil on vaikimisi kas `display: block` või `display: inline`.

**Block** (`div`, `p`, `h1`, `section`, `header`, `footer`, `ul`, `li`):
- võtab kogu saadaoleva laiuse, ükskõik kui vähe sisu on
- järgmine element läheb **alla**
- `width`, `height`, `margin`, `padding` — kõik töötavad

**Inline** (`span`, `a`, `strong`, `em`, `img`):
- võtab täpselt nii palju ruumi, kui sisu vajab
- järgmine element läheb **kõrvale**
- `width` ja `height` **ei tööta üldse**, vertikaalne `margin` ei tööta

See on vastus küsimusele „miks mu `<a>`-l ei ole kõrgust". Ta on inline.

**Lahendus on `inline-block`:** käitub väljastpoolt nagu inline (läheb kõrvuti), aga
seestpoolt nagu block (`width`/`height`/`padding` töötavad). Nupud ja nav-lingid on
tüüpiline koht.

```css
nav a {
  display: inline-block;
  padding: 10px 15px;   /* ilma inline-block-i ei annaks see vertikaalset ruumi */
}
```

**Proovi:** tee kaks `<span>`-i, anna mõlemale `background: red; height: 100px`. Kõrgust
ei juhtu. Lisa `display: inline-block` → kõrgus tuleb.

---

## 3. Kaskaad ja pärimine — sinu enda koodi näitel

Sa kirjutasid `style.css`-is värvi viis korda:

```css
h1 { color: white; }
h2 { color: white; }
h3 { color: white; }
p  { color: gray; }
li { color: white; }
```

**Pärimine:** osa CSS-i omadusi liigub vanemalt lapsele automaatselt. Värv on üks neist.
Kui sa ütled `body { color: white }`, saavad kõik `body` sees olevad elemendid selle
kaasa, sest nad ei ütle ise midagi vastupidist.

Pärandub: `color`, `font-family`, `font-size`, `line-height`, `text-align`
Ei pärandu: `background`, `padding`, `margin`, `border`, `width`

Loogika on lihtne: pärandub see, mis puudutab **teksti**. Kasti mõõdud ei pärandu — muidu
oleks iga laps vanema suurune.

Seega:

```css
body { color: white; background-color: black; }
p    { color: gray; }             /* ainult erand kirjutatakse eraldi */
```

Viis reeglit → kaks. Ja kui tahad hiljem värvi muuta, muudad ühte kohta.

**Kaskaad ja spetsiifilisus.** Kui kaks reeglit räägivad samast asjast vastu, võidab
täpsem:

```
element  (p)          → 1 punkt
klass    (.aktiivne)  → 10 punkti
id       (#peamenu)   → 100 punkti
inline   (style="")   → 1000 punkti
```

Võrdse punktisumma korral võidab **hilisem** reegel failis. Sellepärast peab CSS-i
kirjutama üldisest täpsemaks: enne `section`, siis `.section-eriline`.

Ja see on ka põhjus, miks inline `style=""` on halb: 1000 punkti tähendab, et sa ei saa
seda hiljem CSS-failist üle kirjutada. Sa lukustad enda tuleviku ära.

---

## 4. Flexbox — viis omadust, mis katavad 90%

Flexbox paneb elemendid **ühte suunda** — kas ritta või veergu.

Pane `display: flex` **vanemale**. Lapsed joonduvad ise.

```css
.konteiner {
  display: flex;
  flex-direction: row;       /* row (vaikimisi) | column */
  gap: 1rem;                 /* vahe laste vahel — ära kasuta margin'it */
  justify-content: center;   /* joondus PÕHISUUNAS */
  align-items: center;       /* joondus RISTISUUNAS */
}
```

Ainus koht, kus inimesed segadusse lähevad, on need kaks viimast. Reegel:

- `justify-content` töötab **samas suunas**, mille `flex-direction` ütleb
- `align-items` töötab **risti** sellega

```
flex-direction: row  →  justify-content liigutab VASAK-PAREMALE
                        align-items     liigutab ÜLES-ALLA

flex-direction: column → justify-content liigutab ÜLES-ALLA
                         align-items     liigutab VASAK-PAREMALE
```

Kui sa kunagi ei mäleta kumb kumb on: pane üks neist ja vaata, mis liigub. Kahe katsega
on käes. Mina ka ei mäleta seda peast, ma vaatan järele.

`justify-content` väärtused, mida päriselt kasutad:
- `flex-start` (vaikimisi), `center`, `flex-end`
- `space-between` — esimene vasakule, viimane paremale, vahe keskele.
  **See on nav-riba lahendus:** logo vasakule, menüü paremale.

Sinu vormi viga oli täpselt see: `display: flex` ilma `flex-direction`-ita → vaikimisi
`row` → kõik labelid ja väljad kõrvuti ühes reas.

```css
form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
```

**Proovi:** tee nav-riba, kus nimi on vasakul ja kolm linki paremal. `display: flex` +
`justify-content: space-between`. Kaks rida.

---

## 5. Grid — kolm asja ja üks võlurida

Flexbox = üks suund. Grid = **read ja veerud korraga**.

```css
.kaardid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;   /* kolm võrdset veergu */
  gap: 1rem;
}
```

`fr` tähendab „fraction" — jaga vaba ruum ära. `1fr 2fr` = teine veerg on kaks korda
laiem.

**Miks `fr` ja mitte `%`:** kui sa kirjutad `50% 50%` ja lisad `gap: 1rem`, siis
50+50+gap on üle 100% ja layout jookseb üle ääre. `fr` arvutab gapi maha juba enne
jagamist. Protsendid ja gap ei käi kokku.

`repeat(3, 1fr)` on lühend `1fr 1fr 1fr` jaoks.

### Võlurida

```css
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
```

Tõlge eesti keelde: *„tee nii palju veerge, kui mahub, iga veerg vähemalt 250px lai,
üleliigne ruum jaga võrdselt ära."*

Tulemus: laial ekraanil neli kaarti kõrvuti, kitsamal kaks, telefonis üks. **Ilma
ühtegi media queryt.** Grid arvutab ise.

See üks rida on kasulikum kui kogu ülejäänud grid kokku. Kui sa sel nädalal ainult selle
selgeks saad, on nädal õnnestunud.

**minmax(250px, 1fr)** = „mitte kitsam kui 250px, muidu võta mis saad".

### Kumba millal?

| Olukord | Kasuta |
|---|---|
| Nav-riba, nupurida, vorm, ikoon + tekst kõrvuti | **flex** |
| Kaardid, galerii, lehe üldine layout (külgriba + sisu) | **grid** |
| Ühe elemendi keskele saamine | kumbki, flex on lühem |

Lihtne rusikareegel: **üks rida või üks veerg → flex. Tabelilaadne võrgustik → grid.**
Ja neid võib kasutada koos — grid lehe struktuuriks, flex iga kaardi sees.

---

## 6. Keskele saamine — kolm retsepti, mida päriselt vaja on

See on CSS-i kõige tüütum küsimus, seepärast siin kõik kolm korraga.

**1. Sisu horisontaalselt keskele (kõige sagedam):**
```css
main { max-width: 65ch; margin: 0 auto; }
```
`margin: 0 auto` tähendab „ülal-all 0, vasak-parem jaga võrdselt". **Töötab ainult siis,
kui elemendil on `width` või `max-width`** — muidu ta juba täidab kogu laiuse ja jagada
pole midagi. Sinu `main`-il oli `max-width: 50%`, aga `margin: 0 auto` puudus, seega ta
istus vasakul.

`65ch` tähendab umbes 65 tähemärgi laiust. Loetava teksti rida on 50–75 tähemärki —
sellepärast on see parem kui `50%`, mis sõltub juhuslikult ekraani suurusest.

**2. Üks asi täpselt keskele, nii püsti kui rõhtu:**
```css
.konteiner { display: flex; justify-content: center; align-items: center; }
```

**3. Grid-i lühend sama asja jaoks:**
```css
.konteiner { display: grid; place-items: center; }
```

Kolm rida ühe vastu. Seepärast kasutan ma ise enamasti grid-i, kui asi on lihtsalt
„keskele".

---

## 7. position — neli väärtust, kolm kasutuskohta

```css
position: static;    /* vaikimisi. Element on vooluses. top/left ei tee midagi */
position: relative;  /* jääb vooluses OMA KOHALE, aga saab nihutada */
position: absolute;  /* VÕETAKSE VOOLUSEST VÄLJA. Teised ei tea ta olemasolust */
position: fixed;     /* kinni ekraani külge, kerimine ei liiguta */
position: sticky;    /* tavaline kuni kerid, siis kleepub */
```

**Üks asi, mida absolute juures teada:** `absolute` positsioneerib end lähima
**vanema suhtes, millel on `position` midagi muud kui `static`**. Kui sellist vanemat
pole, siis lehe suhtes.

Sellepärast on muster alati selline — vanemal `relative`, lapsel `absolute`:

```css
.kaart      { position: relative; }              /* "mõõda minu suhtes" */
.kaart .silt { position: absolute; top: 10px; right: 10px; }   /* nurka */
```

Kui sa jätad `relative` ära, lendab silt lehe nurka ja sa ei saa aru, miks.

**Sticky päis** — kolm rida, ja `top` on kohustuslik:

```css
header { position: sticky; top: 0; background-color: black; }
```

Läbipaistev taust on siin klassikaline viga: sisu keritakse päise alt läbi ja päis on
nähtamatu. Anna talle alati taustavärv.

Praktikas: `relative` + `absolute` paarina, `sticky` päise jaoks, `fixed` harva
(nt „üles" nupp). `absolute` üksi layouti tegemiseks **ei kasutata kunagi** — kui sa
püüad tervet lehte absoluutsete koordinaatidega paika panna, oled valel teel.

---

## 8. Media queryd ja mobile-first

```css
/* BAAS: kirjuta see telefonile. Ilma media queryta. */
.kaardid { display: grid; grid-template-columns: 1fr; gap: 1rem; }

/* Siis laienda suurema ekraani jaoks */
@media (min-width: 700px) {
  .kaardid { grid-template-columns: repeat(3, 1fr); }
}
```

**Miks `min-width` ja mitte `max-width`:** telefonil on nõrgem protsessor ja aeglasem
võrk. `min-width` tähendab, et telefon saab kõige lihtsama CSS-i ja ei pea kümneid
reegleid üle kirjutama. Suurem ekraan lisab peale, ei võta ära.

**Murdepunkte ei pea olema palju.** Üks, kõige rohkem kaks. Ja vali number selle järgi,
**kus sinu layout päriselt katki läheb** — mitte iPhone'i mõõtude järgi. Venita brauseri
akent kitsamaks ja vaata, kus muutub kehvaks. Seal on su murdepunkt.

**`rem` vs `px`:** `1rem` = juurelemendi fondisuurus, vaikimisi 16px. Kui kasutaja on
brauseris fondi suuremaks keeranud (vanemad inimesed teevad seda tihti), siis `rem`
kasvab kaasa ja `px` ei kasva. Kasuta `rem`-i fontide ja vahede jaoks, `px`-i ainult
seal, kus asi peab jääma täpselt sama suureks (nt `border: 1px`).

---

## 9. Mida sa EI pea teadma

Kui sa satud vanema õppematerjali peale ja näed neid, siis need on aegunud. Jäta vahele:

- **`float`** ja `clearfix` — see oli layouti tegemise viis enne 2015. Piltide
  ümber teksti mähkimiseks on ta veel kasutusel, layouti jaoks mitte kunagi
- **Bootstrapi grid-süsteem** (`col-md-6` jne) — grid teeb sama asja ilma raamistikuta
- **CSS-i preprocessorid** (Sass, Less) — CSS-i muutujad teevad täna selle töö ära
- **`!important`** — see on tunnistus, et spetsiifisus on käest läinud. Paranda selektorit
- **`table`-põhine layout** — 1998
- **`vertical-align: middle`** keskele saamiseks — ei tööta nii, nagu nimi lubab. Kasuta flexi

---

## 10. DevTools — neli asja, mida päriselt kasutad

F12 avab. Neli asja, ülejäänu tuleb hiljem:

1. **Elements** → vali element → paremal **Styles**. Näed kõiki reegleid, mis sellele
   rakenduvad. **Maha kriipsutatud reegel** = see kaotas spetsiifilisuse võitluse.
   See vastab küsimusele „miks mu CSS ei tööta" 90% juhtudest
2. **Elements** → **Computed** → all box model joonis. Näitab päris arve. Siin näed,
   mida `box-sizing` teeb
3. **Styles**-is saad väärtusi otse muuta ja kohe tulemust näha. Katseta seal, siis
   kirjuta faili — mitte vastupidi
4. **Ctrl+Shift+M** — telefonivaade. Ja **Console** peab olema tühi. Punane tekst
   seal tähendab, et midagi on katki, ka siis kui leht näib korras

Grid-i puhul: `display: grid` elemendi kõrval Elements-is on väike silt **grid**. Kliki —
brauser joonistab jooned lehele peale. Sama on flexi jaoks.

---

## Kordamine — vasta endale enne edasi minekut

1. Miks `<span>`-il `height: 100px` ei tööta?
2. Millised kolm CSS-i omadust pärandub vanemalt lapsele?
3. `flex-direction: column` puhul — kumb liigutab elemente üles-alla, `justify-content`
   või `align-items`?
4. Miks `grid-template-columns: 50% 50%` koos `gap: 1rem`-iga üle ääre jookseb?
5. Mida `repeat(auto-fit, minmax(250px, 1fr))` teeb?
6. `margin: 0 auto` ei tööta. Mis on kõige tõenäolisem põhjus?
7. Sinu `.silt` on `position: absolute` ja lendas lehe nurka. Mida vanemal puudu on?
8. Miks kirjutatakse media queryd `min-width`-iga, mitte `max-width`-iga?

Kui mõne peale vastust ei tule, otsi see siit tekstist üles ja proovi koodis järele.
Ära jäta lahtiseks — need kaheksa on täpselt see, mida sa 3. nädalal kasutama hakkad.
