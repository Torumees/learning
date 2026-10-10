# JavaScripti alused — õppetund

HTML ütleb, **mis** lehel on. CSS ütleb, **milline** see välja näeb. JavaScript paneb
lehe midagi **tegema**.

Siin on sul esimest korda eelis: tsüklid, tingimused ja funktsioonid oskad sa juba
Pythonist. Programmeerimise loogika ei muutu, ainult kirjapilt. Seepärast algab see
õppetund tõlketabelist — ja edasi keskendume sellele, kus JS päriselt **teistmoodi
käitub**, sest just seal lähevad Pythoni-inimesed metsa.

---

## 1. Kuhu JS läheb ja kuidas seda käivitada

Kolm võimalust, kõiki kasutad:

**1. Konsool** (F12 → Console). Kirjutad rea, vajutad Enter, näed vastust kohe. Nii
katsetad. Proovi praegu: `2 + 2`, siis `"tere".toUpperCase()`.

**2. Eraldi fail** — nii kirjutad päris koodi:

```html
<body>
    ...kogu sisu...
    <script src="app.js"></script>   <!-- KÕIGE LÕPPU, enne </body> -->
</body>
```

**Miks lõppu:** brauser loeb lehte ülalt alla. Kui `<script>` on `<head>`-is, jookseb
JS enne, kui HTML-elemendid olemas on — ja su kood ei leia neid üles. Alternatiiv on
`<script defer src="app.js"></script>` `<head>`-is, mis ütleb „oota, kuni HTML valmis".
Mõlemad on õiged; pane lõppu, see on lihtsam mäletada.

**3. `console.log()`** — sinu `print()`. Sellega vaatad, mis koodis toimub:

```js
console.log("siia jõudsin");
console.log(muutuja);
console.log("nimi:", nimi, "vanus:", vanus);   // mitu asja korraga, komadega
```

---

## 2. Python → JavaScript tõlketabel

| Python | JavaScript | Märkus |
|---|---|---|
| `x = 5` | `let x = 5;` | muutuv väärtus |
| (konstant pole) | `const x = 5;` | ei saa enam üle kirjutada |
| `print(x)` | `console.log(x);` | |
| `# kommentaar` | `// kommentaar` | mitmerealine: `/* ... */` |
| taane (indent) | `{ loogelised sulud }` | taane on JS-is ainult loetavuse jaoks |
| (semikoolonit pole) | `;` rea lõpus | |
| `True` / `False` | `true` / `false` | väike algustäht |
| `None` | `null` ja `undefined` | **kaks eri asja**, vt §4 |
| `and` / `or` / `not` | `&&` / `||` / `!` | |
| `==` | `===` | **kolm võrdusmärki**, vt §4 |
| `!=` | `!==` | |
| `elif` | `else if` | |
| `def nimi(a, b):` | `function nimi(a, b) { }` | |
| `len(x)` | `x.length` | funktsiooni asemel omadus |
| `str.upper()` | `str.toUpperCase()` | |
| `f"Tere {nimi}"` | `` `Tere ${nimi}` `` | tagurpidi ülakomad |
| `list = [1, 2]` | `const arr = [1, 2];` | |
| `list.append(x)` | `arr.push(x)` | |
| `dict = {"a": 1}` | `const obj = {a: 1};` | võtmed ilma jutumärkideta |
| `dict["a"]` | `obj.a` või `obj["a"]` | punkt on tavalisem |
| `for x in list:` | `for (const x of arr) { }` | **of**, mitte in |
| `range(5)` | `for (let i = 0; i < 5; i++)` | |
| `try/except` | `try/catch` | |

---

## 3. let ja const

```js
let loendur = 0;      // muutub hiljem
loendur = 1;          // OK

const nimi = "Egert"; // ei muutu
nimi = "Mari";        // VIGA: Assignment to constant variable
```

**Reegel praktikas: kirjuta alati `const`. Muuda `let`-iks alles siis, kui pead väärtust
üle kirjutama.** Nii näeb lugeja kohe, mis koodis liigub ja mis seisab.

**Üks lõks, mis ajab segadusse.** `const` ei tähenda, et sisu on muutumatu — see tähendab,
et **muutuja ei saa osutada millelegi muule**:

```js
const nimekiri = [1, 2];
nimekiri.push(3);      // TÖÖTAB. Massiiv ise muutub, muutuja osutab samale massiivile
console.log(nimekiri); // [1, 2, 3]

nimekiri = [9];        // VIGA. Nüüd üritad muutujat ümber suunata
```

Just sellepärast saab kogu su to-do rakenduse olek olla `const` — sa lisad ja eemaldad
elemente, aga massiiv ise jääb samaks.

`var` on vana ja katkine viis muutuja loomiseks. Kui näed seda õpetuses, on materjal
vanem kui 2015. Ära kasuta.

---

## 4. Kolm kohta, kus JS Pythonist erineb — siin lähevad kõik metsa

### 4.1 Kolm võrdusmärki

```js
5 === 5      // true
5 === "5"    // false  — number ja string on eri tüüpi
5 == "5"     // TRUE   ← ja see on probleem
```

`==` teisendab tüüpe enne võrdlemist ja annab kohati absurdseid tulemusi
(`"" == 0` on `true`). `===` võrdleb ilma teisendamist — nagu Pythoni `==`.

**Kasuta alati `===` ja `!==`.** Erandeid ei ole, kuni sa ise tead, miks erand teha.

### 4.2 null ja undefined

Pythonis on üks `None`. JS-is on kaks tühjust:

```js
let a;                      // undefined — muutuja on olemas, väärtust pole kunagi antud
let b = null;               // null — sa ütlesid teadlikult "siin pole midagi"

document.querySelector("#pole-olemas")   // null — ei leidnud
obj.olematuVali                          // undefined — sellist välja pole
```

Lihtne mõttereegel: **`undefined` juhtus iseenesest, `null` panid sina.**

Mõlema kontrollimiseks korraga:

```js
if (x == null) { }      // ainus koht, kus == on OK (katab mõlemad)
if (!x) { }             // aga ettevaatust, vt järgmine punkt
```

### 4.3 Mis on tõene ja mis väär — SIIN ON PÜTONISTI LÕKS

```js
if (midagi) { }   // "kui midagi on tõene"
```

Väärad (falsy) väärtused JS-is on **ainult need kuus**:

```
false    0    ""    null    undefined    NaN
```

Kõik ülejäänu on tõene. Ja nüüd see oluline osa:

| Väärtus | Python | JavaScript |
|---|---|---|
| `[]` tühi massiiv | **väär** | **TÕENE** |
| `{}` tühi objekt | **väär** | **TÕENE** |
| `"0"` | tõene | tõene |
| `0` | väär | väär |

```js
if ([]) {
    console.log("see käivitub!");   // JS-is jah. Pythonis ei käivituks
}
```

Nii et see ei tööta nii, nagu Pythonist harjunud oled:

```js
if (!minuMassiiv) { }              // VALE: ei kontrolli tühjust
if (minuMassiiv.length === 0) { }  // ÕIGE
```

---

## 5. Funktsioonid

Kaks kirjapilti, mõlemad igapäevased:

```js
// 1. Tavaline funktsioon
function liida(a, b) {
    return a + b;
}

// 2. Nooleformaat (arrow function) — lühem
const liida = (a, b) => {
    return a + b;
};

// Kui sisu on üks rida, saab return'i ja sulud ära jätta:
const liida = (a, b) => a + b;
const ruut = x => x * x;
```

Nooleformaati näed praktikas kõige rohkem, sest see läheb ilusti teise funktsiooni
sisse argumendiks — ja seda teeb JS pidevalt (`addEventListener`, `map`, `filter`).

Vaikeväärtused ja mitu argumenti käivad nagu Pythonis:

```js
function tervita(nimi, tervitus = "Tere") {
    return `${tervitus}, ${nimi}!`;
}
tervita("Egert");            // "Tere, Egert!"
tervita("Egert", "Hommikust"); // "Hommikust, Egert!"
```

---

## 6. Massiivid

```js
const arr = ["a", "b", "c"];

arr.length          // 3
arr[0]              // "a"
arr[arr.length - 1] // "c"  — JS-is EI OLE arr[-1]

arr.push("d");      // lisa lõppu
arr.pop();          // võta lõpust ära ja tagasta
arr.includes("a");  // true  (Pythoni "a" in arr)
arr.indexOf("b");   // 1, või -1 kui ei leia
```

Läbikäimine — kolm viisi, kõik kasulikud:

```js
// 1. for...of — kui sul on vaja lihtsalt iga element läbi käia
for (const taht of arr) {
    console.log(taht);
}

// 2. forEach — sama asi, funktsiooniga
arr.forEach(taht => console.log(taht));

// 3. klassikaline for — kui vajad indeksit
for (let i = 0; i < arr.length; i++) {
    console.log(i, arr[i]);
}
```

**Tähelepanu:** `for...in` on olemas, aga massiivi peal on see lõks — ta annab
**indeksid stringina**, mitte väärtused. Massiivi puhul kasuta alati `for...of`.

### Kolm meetodit, mida kasutad iga päev

Need asendavad Pythoni list comprehension'i:

```js
const arvud = [1, 2, 3, 4, 5];

// map — tee igast elemendist midagi muud. Tagastab UUE massiivi
arvud.map(x => x * 2);              // [2, 4, 6, 8, 10]
// Python: [x * 2 for x in arvud]

// filter — jäta alles need, mis sobivad. Tagastab UUE massiivi
arvud.filter(x => x > 2);           // [3, 4, 5]
// Python: [x for x in arvud if x > 2]

// find — leia ESIMENE sobiv element (mitte massiiv, vaid element ise)
arvud.find(x => x > 2);             // 3
```

`map` ja `filter` **ei muuda algset massiivi** — nad tagastavad uue. See on oluline:

```js
const uus = arvud.filter(x => x > 2);
console.log(arvud);  // [1, 2, 3, 4, 5] — muutumatu
console.log(uus);    // [3, 4, 5]
```

`filter` on see, millega sa to-do rakenduses elemente kustutad: ei kustuta midagi, vaid
teed uue massiivi ilma selle elemendita.

---

## 7. Objektid

Objekt on Pythoni dict. Ainult kirjapilt erineb, ja võtmeid saab punktiga lugeda:

```js
const inimene = {
    nimi: "Egert",            // võti ilma jutumärkideta
    vanus: 23,
    oskused: ["HTML", "CSS"]  // väärtus võib olla massiiv
};

inimene.nimi              // "Egert"      ← tavaline viis
inimene["nimi"]           // "Egert"      ← kui võti on muutujas
inimene.vanus = 24;       // muuda
inimene.linn = "Tallinn"; // lisa uus väli
delete inimene.linn;      // kustuta väli
```

### Objektide massiiv — see on andmekuju, mida kasutad kõikjal

```js
const ulesanded = [
    { id: 1, tekst: "Osta piim", tehtud: false },
    { id: 2, tekst: "Õpi JS",    tehtud: true  }
];

ulesanded[0].tekst               // "Osta piim"
ulesanded.filter(u => !u.tehtud) // kõik tegemata
ulesanded.find(u => u.id === 2)  // see konkreetne ülesanne
```

Sama kuju tuleb 5. nädalal API-st vastuseks, 13. nädalal saadab su Spring backend
täpselt sellise JSON-i, ja 19. nädalal on iga objekt üks rida andmebaasis. Harju selle
kujuga ära — see on kogu veebiarenduse põhiline andmekuju.

---

## 8. DOM — kuidas JS lehega räägib

DOM (Document Object Model) on brauseri sisemine puu su HTML-ist. JS loeb ja muudab seda.

### Elemendi leidmine

```js
document.querySelector("#loend")      // esimene vaste, CSS-selektoriga
document.querySelector(".kaart")      // esimene .kaart
document.querySelectorAll(".kaart")   // KÕIK .kaardid (massiivilaadne)
```

Selektor on täpselt sama süntaks nagu CSS-is — sa oskad seda juba. Kui ei leia,
tagastab `null`, ja järgmine rida annab vea „Cannot read properties of null". See on
kõige sagedasem algaja veateade ja tähendab alati üht: **selektor ei leidnud elementi.**

### Sisu muutmine

```js
const el = document.querySelector("#pealkiri");

el.textContent = "Uus tekst";        // ← KASUTA SEDA
el.innerHTML = "<b>Uus tekst</b>";   // ← ainult siis, kui tahad päriselt HTML-i
```

**Miks `textContent` vaikimisi:** `innerHTML` **käivitab** selle HTML-i. Kui paned sinna
kasutaja sisestatud teksti ja kasutaja kirjutab sinna `<script>`, siis see jookseb.
See on päris turvaauk nimega XSS. Sinu to-do rakenduses tuleb tekst otse kasutajalt —
seega `textContent`.

### Klassid ja stiil

```js
el.classList.add("tehtud");
el.classList.remove("tehtud");
el.classList.toggle("tehtud");       // lisa kui pole, võta ära kui on
el.classList.contains("tehtud");     // true/false
```

**Kasuta klasse, mitte `el.style.color = "red"`.** Välimus kuulub CSS-i; JS ainult
lülitab klassi. Nii jääb kogu kujundus ühte kohta.

### Elementide loomine ja kustutamine

```js
const li = document.createElement("li");   // tee uus element
li.textContent = "Uus rida";
li.classList.add("ulesanne");

loend.append(li);        // lisa lapseks (lõppu)
li.remove();             // kustuta element
loend.innerHTML = "";    // tühjenda kõik lapsed korraga
```

---

## 9. Sündmused

```js
const nupp = document.querySelector("#nupp");

nupp.addEventListener("click", () => {
    console.log("klikiti");
});
```

Lugemine: „kui `nupp` peal juhtub `click`, käivita see funktsioon."

Sündmused, mida sel nädalal vajad: `click`, `submit`, `input`, `change`, `keydown`.

### Vormi submit — siin on üks asi, mida pead teadma

```js
const vorm = document.querySelector("#vorm");

vorm.addEventListener("submit", (sundmus) => {
    sundmus.preventDefault();   // ← ILMA SELLETA LAEB LEHT UUESTI
    const vali = document.querySelector("#sisend");
    console.log(vali.value);
    vali.value = "";            // tühjenda väli
});
```

Vormi vaikekäitumine on andmete serverisse saatmine ja lehe uuesti laadimine. Kuna
sul veel serverit ei ole, kaoks kogu su töö ära. `preventDefault()` ütleb „ära tee
vaikeasja, ma tegelen sellega ise".

**Kui su to-do rakendus vilksatab ja tühjeneb, siis on `preventDefault()` puudu.**
See juhtub kõigiga esimesel korral.

Sündmuse objektist (`sundmus`) vajad praegu kahte asja:

```js
sundmus.preventDefault()   // tühista vaikekäitumine
sundmus.target             // element, millel sündmus juhtus
```

---

## 10. Muster, mis kordub igas rakenduses: olek → joonista

See on selle nädala kõige tähtsam osa. Ära jäta vahele.

**Halb lähenemine** (nii teeb enamik algajaid): kui kasutaja lisab ülesande, lisa DOM-i
üks `<li>`. Kui kustutab, otsi see `<li>` üles ja kustuta. Kui märgib tehtuks, leia
`<li>` ja muuda klassi.

Probleem: tõde on kahes kohas korraga — sinu andmetes ja ekraanil. Need lähevad
paratamatult lahku, ja sa hakkad kirjutama koodi, mis püüab neid sünkroonis hoida.

**Hea lähenemine:**

```js
// 1. OLEK — üks massiiv, mis on ainus tõde
let ulesanded = [];

// 2. JOONISTA — funktsioon, mis ehitab ekraani oleku järgi NULLIST
function joonista() {
    loend.innerHTML = "";                    // tühjenda
    for (const u of ulesanded) {             // ehita uuesti
        const li = document.createElement("li");
        li.textContent = u.tekst;
        if (u.tehtud) li.classList.add("tehtud");
        loend.append(li);
    }
}

// 3. MUUDA OLEKUT, siis joonista uuesti
function lisa(tekst) {
    ulesanded.push({ id: Date.now(), tekst: tekst, tehtud: false });
    joonista();
}

function kustuta(id) {
    ulesanded = ulesanded.filter(u => u.id !== id);
    joonista();
}
```

Iga tegevus teeb kaks asja: **muudab massiivi, siis kutsub `joonista()`**. Ekraan ei
ole kunagi eraldi hoitav asi — see on alati lihtsalt oleku peegeldus.

See tundub alguses raiskamisena („miks ma kõik uuesti joonistan?"). Aga see hoiab vead
ära ja kood jääb lühikeseks. **Ja 6. nädalal, kui jõuame Vue juurde, saad teada, et
Vue teeb täpselt sama asja automaatselt** — sina muudad andmeid, tema joonistab. Kui sa
selle mustri praegu käsitsi läbi teed, on Vue siis ilmselge, mitte maagia.

`Date.now()` annab praeguse aja millisekundites — kiire viis unikaalse id saamiseks.

---

## 11. localStorage — et andmed ei kaoks

Brauser oskab salvestada stringe, mis jäävad alles ka pärast lehe sulgemist.

```js
localStorage.setItem("ulesanded", "tekst");   // salvesta
localStorage.getItem("ulesanded");            // loe (null kui pole)
localStorage.removeItem("ulesanded");         // kustuta
```

**Ainult stringe.** Massiivi või objekti salvestamiseks tuleb see tekstiks teha:

```js
// Salvesta
localStorage.setItem("ulesanded", JSON.stringify(ulesanded));

// Loe
const salvestatud = localStorage.getItem("ulesanded");
if (salvestatud) {
    ulesanded = JSON.parse(salvestatud);
}
```

`JSON.stringify()` = objekt → string. `JSON.parse()` = string → objekt. Neid kahte
näed sa oma karjääri jooksul tuhandeid kordi; JSON on see keel, milles frontend ja
backend omavahel räägivad.

Nipp: pane salvestamine `joonista()` sisse. Siis salvestub olek automaatselt iga
muudatuse järel ja sa ei pea seda igal pool eraldi meeles pidama.

---

## 12. Vigade leidmine

JS-il on CSS-i ees üks suur eelis: **ta ütleb sulle, kui midagi on katki.** Konsool on
sinu parim sõber.

```js
console.log(muutuja);           // mis selles tegelikult on?
console.log(typeof muutuja);    // mis tüüp see on?
console.table(ulesanded);       // objektide massiiv ilusas tabelis
```

Kolm kõige sagedasemat veateadet ja mida need tähendavad:

| Veateade | Tähendus |
|---|---|
| `Cannot read properties of null` | `querySelector` ei leidnud elementi. Kontrolli selektorit ja seda, kas `<script>` on lehe lõpus |
| `x is not a function` | kirjutasid meetodi nime valesti, või `x` ei ole see, mida arvad |
| `x is not defined` | kirjavahe muutuja nimes, või kasutad muutujat enne selle loomist |

**Ja üks võte, mis on parem kui `console.log`:** pane konsooli `debugger;` rida sinna,
kus tahad kood seisma panna. Brauser peatub ja sa saad vaadata kõiki muutujaid sel
hetkel. Või DevTools → Sources → kliki reanumbri peale (breakpoint).

---

## 13. Mida sa EI pea praegu teadma

JS-il on 30 aastat ajalugu ja internet on täis vanu õpetusi. Need jäta vahele:

- **`var`** — vana muutuja. `let` ja `const` asendavad täielikult
- **jQuery** (`$("#id")`) — oli vajalik, kui brauserid olid erinevad. `querySelector`
  teeb sama asja. Kui õpetus algab jQuery allalaadimisega, on see vanem kui sa ise
- **`this`** sügavuti — segane teema, mida sa vajad alles klasside ja Vue juures.
  Nooleformaadi funktsioonid hoiavad su sellest praegu eemal
- **Prototüübid ja `prototype`** — klasside sisemus. Tuleb hiljem, kui üldse
- **`==` teisendusreeglid** — ära õpi neid, kasuta `===` ja probleem kadus
- **IIFE** (`(function(){ ... })()`) — mooduleid asendav vana nipp
- **`callback hell`** ja `.then()` ahelad — 5. nädalal õpid kohe `async/await`,
  mis on sama asi loetavalt
- **Semikooloni-vaidlused** — pane semikoolonid, ära mõtle sellele rohkem
- **TypeScript, React, Node** — kõik head asjad, kõik hiljem. Praegu brauseri JS

---

## Kordamine — vasta endale enne ülesannete juurde minekut

1. Mis vahe on `let` ja `const` vahel? Ja miks `const`-massiivi saab `push`-ida?
2. Miks `===` ja mitte `==`?
3. Mis vahe on `null` ja `undefined` vahel?
4. `if ([])` — kas see käivitub? Ja Pythonis?
5. Kuidas kontrollida, kas massiiv on tühi?
6. Mis vahe on `textContent` ja `innerHTML` vahel, ja kumba kasutad kasutaja teksti jaoks?
7. Mida `map` tagastab? Kas ta muudab algset massiivi?
8. Miks on vormi `submit` sündmuses vaja `preventDefault()`?
9. Mis on „olek → joonista" muster ja miks see parem on kui DOM-i ükshaaval muutmine?
10. Miks on `JSON.stringify()` localStorage-i jaoks vajalik?

Kui mõne peale vastust ei tule, otsi siit üles ja proovi konsoolis järele.
