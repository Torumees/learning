# Asünkroonne JavaScript ja fetch — õppetund

Siiani on kõik su andmed tulnud sinult endalt — kasutaja kirjutas need vormi või sa
panid need massiivi käsitsi. Sel nädalal tulevad andmed **kuskilt mujalt**: üle
interneti, kelleltki teiselt arvutilt.

Ja see muudab ühe asja põhimõtteliselt: **sa ei tea, kui kaua see aega võtab, ega
isegi seda, kas see õnnestub.**

---

## 1. Miks asünkroonsus üldse olemas on

JavaScript teeb korraga **ühte asja**. Üks lõim, üks järjekord. Kui mingi rida võtab
kolm sekundit, siis kolm sekundit ei juhtu lehel **mitte midagi** — nupud ei reageeri,
kerimine ei tööta, leht on surnud.

Ja võrgupäring üle interneti võtab aega. Mõnikord 50 ms, mõnikord 3 sekundit,
mõnikord ei vasta keegi kunagi.

Seega ei saa JS päringut lihtsalt „ära oodata". Selle asemel ütleb ta: *„saada päring
teele ja liigu edasi. Kui vastus tuleb, tulen selle juurde tagasi."*

Kujuta ette kohvikut. Sa tellid ja **ei jää leti ees tardunult seisma**, kuni kohv
valmis saab — sa istud maha ja teed midagi muud. Kui kohv on valmis, hüütakse sind.
See ongi asünkroonsus.

---

## 2. Vaata seda oma silmaga

Kirjuta see konsooli:

```js
console.log("1");
setTimeout(() => console.log("2"), 1000);
console.log("3");
```

Järjekord konsoolis: **1, 3, 2**.

`setTimeout` ütleb „käivita see funktsioon 1000 ms pärast". JS ei jää ootama — ta
paneb selle kõrvale ja läheb edasi. „3" jõuab kohale enne „2".

Nüüd proovi `0`-ga:

```js
console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("3");
```

**Ikka 1, 3, 2** — isegi nulliga. Sest „pane kõrvale ja tule hiljem tagasi" tähendab
alati „pärast seda, kui praegune kood on lõpuni jooksnud". Nulli korral tähendab see
„nii ruttu kui võimalik, aga mitte praegu".

See üks katse seletab enamiku algaja segadusi asünkroonsusega.

---

## 3. Promise — lubadus, mille vastus tuleb hiljem

Promise on objekt, mis tähendab „siia tuleb väärtus, aga mitte veel". Tal on kolm
olekut:

| Olek | Tähendus |
|---|---|
| `pending` | ootel, vastust pole veel |
| `fulfilled` | õnnestus, väärtus on käes |
| `rejected` | ebaõnnestus, tuli viga |

Promise'i **ei saa lugeda nii, nagu ta oleks väärtus**:

```js
const vastus = fetch("https://...");
console.log(vastus);     // Promise { <pending> }  ← mitte andmed!
```

Vanasti kasutati `.then()` ahelaid. Sa näed neid vanemas koodis ja pead ära tundma:

```js
fetch(url)
    .then(vastus => vastus.json())
    .then(andmed => console.log(andmed))
    .catch(viga => console.log(viga));
```

See töötab, aga läheb kiiresti loetamatuks. **Sina kirjutad `async/await`-i** — see on
sama asi, ainult näeb välja nagu tavaline kood.

---

## 4. async ja await — kaks sõna, mille peale kõik käib

```js
async function laeAndmed() {
    const vastus = await fetch(url);
    const andmed = await vastus.json();
    console.log(andmed);
}
```

Kaks reeglit, ja neist piisab:

1. **`await` ütleb „oota siin, kuni see valmis saab".** Järgmine rida ei jookse enne.
2. **`await` töötab ainult `async` funktsiooni sees.** Kui paned `async` ära, saad vea
   `await is only valid in async functions`.

`async` funktsioon tagastab alati Promise'i. Praegu ei pea sa sellest hoolima — oluline
on, et **`await`-iga kood loeb ülalt alla nagu tavaline kood**, kuigi ta tegelikult
peatub ja jätkab.

Nooleformaadiga sama asi:

```js
const laeAndmed = async () => {
    const vastus = await fetch(url);
};
```

Ja sündmusekuulajaga — seda sa vajad:

```js
nupp.addEventListener("click", async () => {
    const vastus = await fetch(url);
});
```

Pane tähele, kuhu `async` käib: **funktsiooni ette**, mitte `addEventListener`-i ette.

---

## 5. fetch — ja miks seal on kaks await'i

```js
const vastus = await fetch(url);     // 1. await: vastuse päis on kohal
const andmed = await vastus.json();  // 2. await: sisu on alla laetud ja objektiks tehtud
```

See ajab kõiki alguses segadusse. Põhjus:

- **Esimene `await`** ootab, kuni server vastab. Siis on sul käes `Response` objekt —
  staatuskood, päised, aga **sisu võib veel alla laadimata olla**
- **Teine `await`** ootab, kuni kogu sisu on kohal, ja teeb JSON-tekstist JS-objekti

`vastus.json()` teeb sisuliselt sama, mida `JSON.parse()` tegi su localStorage'i
koodis — tekst → objekt. Ainult et see tuleb võrgust ja võtab aega, seega on ka tema
asünkroonne.

`fetch` ilma teise argumendita teeb alati `GET` päringu — „anna mulle andmed". 13.
nädalal õpid `POST`-i, millega andmeid saadetakse.

---

## 6. SUUR LÕKS: fetch ei viska 404 peal viga

See on kõige olulisem asi selles õppetunnis. Loe kaks korda.

```js
const vastus = await fetch("https://api.example.com/olematu-aadress");
// server vastas 404 Not Found
// fetch EI VISKA VIGA. Kood jookseb rõõmsalt edasi.
```

`fetch` loeb oma töö õnnestunuks, kui **server vastas üldse**. Ükskõik mida ta vastas.
404, 500, „sul pole õigusi" — need kõik on `fetch`-i jaoks edukad vastused, sest
side töötas.

`fetch` viskab vea ainult siis, kui **ühendust ei saadudki**: internet on maas, aadressi
ei leitud, server ei vastanud üldse.

Seega pead staatust **ise kontrollima**:

```js
const vastus = await fetch(url);

if (!vastus.ok) {
    throw new Error(`Server vastas: ${vastus.status}`);
}

const andmed = await vastus.json();
```

`vastus.ok` on `true`, kui staatus on 200–299. `vastus.status` on number (404, 500).

**Ilma selle kontrollita** juhtub tüüpiliselt see: server vastab 404-ga ja HTML-i
veateatega, `vastus.json()` üritab sellest HTML-ist JSON-i teha ja viskab segase vea
`Unexpected token '<'`. Sa otsid viga oma koodist, kuigi probleem on aadressis.

### HTTP staatuskoodid, mida tasub teada

| Kood | Tähendus |
|---|---|
| **200** | OK, kõik korras |
| **201** | Loodud (pärast `POST`-i) |
| **400** | Sinu päring oli vigane |
| **401** | Pole sisse logitud |
| **403** | Sisse logitud, aga pole õigusi |
| **404** | Sellist asja ei ole |
| **500** | Serveri enda viga |

Esimene number ütleb kõik: **2xx õnnestus, 4xx sinu viga, 5xx serveri viga.**
Neid samu koode hakkad sa ise 13. nädalal Springis tagastama.

---

## 7. try/catch — vigade püüdmine

```js
try {
    const vastus = await fetch(url);
    if (!vastus.ok) throw new Error(`Server vastas: ${vastus.status}`);
    const andmed = await vastus.json();
    joonista(andmed);
} catch (viga) {
    console.error(viga);
    naitaViga("Andmete laadimine ebaõnnestus.");
}
```

`try` sees olev kood jookseb. Kui **ükskõik millisel real** tuleb viga, hüppab
juhtimine kohe `catch`-i ja ülejäänud `try` jäetakse vahele.

See on sama asi, mis Pythoni `try/except`, ainult `except` → `catch`.

Mida `catch` püüab:

- võrk on maas või aadressi ei leitud (`fetch` ise viskas)
- sinu `throw new Error(...)` halva staatuse puhul
- JSON oli vigane
- iga muu viga su enda koodis seal sees

**Veateade kasutajale ja veateade sulle on kaks eri asja.** `console.error(viga)` on
sulle — tehniline ja täpne. Kasutajale ütle inimkeeles, mis juhtus ja mida teha.
Kasutajat ei huvita `Unexpected token '<'`.

---

## 8. Kolm olekut, mis on igal andmeid laadival ekraanil

See on selle nädala mõtteline süda, ja see on su `joonista()` mustri edasiarendus.

Niipea kui andmed tulevad võrgust, **ei ole ekraanil enam kaks olekut, vaid kolm**:

```
1. LAADIB      — päring on teel, vastust pole veel
2. ÕNNESTUS    — andmed on käes, näita neid
3. VIGA        — midagi läks katki, näita teadet ja võimalust uuesti proovida
```

Algaja kirjutab ainult teise. Siis tuleb aeglane võrk ja kasutaja vaatab 3 sekundit
tühja lehte, arvab, et rakendus on katki, ja lahkub.

Muster:

```js
let olek = "laadib";    // "laadib" | "valmis" | "viga"
let andmed = null;
let veateade = "";

function joonista() {
    if (olek === "laadib") {
        ala.textContent = "Laen andmeid...";
        return;
    }
    if (olek === "viga") {
        ala.textContent = veateade;
        return;
    }
    // olek === "valmis" — joonista andmed
    ala.textContent = "";
    // ...
}

async function lae() {
    olek = "laadib";
    joonista();                  // ← näita kohe, et midagi toimub

    try {
        const vastus = await fetch(url);
        if (!vastus.ok) throw new Error(`Server vastas: ${vastus.status}`);
        andmed = await vastus.json();
        olek = "valmis";
    } catch (viga) {
        console.error(viga);
        olek = "viga";
        veateade = "Andmete laadimine ebaõnnestus. Proovi uuesti.";
    }

    joonista();                  // ← joonista lõpptulemus
}
```

Pane tähele, et see on **täpselt sama muster kui to-do rakenduses**: muuda olekut,
kutsu `joonista()`. Lisandus ainult üks muutuja, mis ütleb, millises faasis sa oled.
`joonista()` otsustab selle järgi, mida näidata.

Üks kriitiline detail: `joonista()` kutsutakse **kaks korda** — enne päringut ja pärast.
Esimene näitab „laen", teine tulemust. Kui jätad esimese ära, ei näe kasutaja midagi,
kuni vastus kohal on.

---

## 9. CORS — viga, mis ei ole sinu viga

Sa näed sel nädalal tõenäoliselt seda:

```
Access to fetch at 'https://...' from origin 'null' has been blocked
by CORS policy
```

Mis juhtus: brauser **keelab** vaikimisi JS-il andmeid lugeda teiselt
domeenilt. See on turvameede — muidu saaks suvaline leht su internetipanga lehelt
andmeid lugeda.

Server peab **ise ütlema** „minu andmeid võib lugeda ka mujalt", saates päise
`Access-Control-Allow-Origin`. Kui server seda ei saada, blokeerib brauser lugemise.

Oluline aru saada: **seda ei saa sa brauseris ära parandada.** Ei ole JS-i rida, mis
CORS-i välja lülitaks. Kaks lahendust on olemas:

1. Kasuta API-t, mis CORS-i lubab (selle nädala ülesandes kasutame sellist)
2. Lase päring läbi oma serveri — **ja seda sa teed 15. nädalal**, kui su Spring
   backend hakkab brauseriga rääkima. Siis on see päis sinu kirjutatud

Kui näed CORS-i viga, ära otsi viga oma koodist. Vaata, kas API lubab brauseripäringuid.

Teine asi: kui avad faili `file:///C:/...` kaudu, on su „origin" `null` ja mõned
API-d ei meeldi see. Lahendus on käivitada leht kohaliku serveri alt — VS Code'i
laiendus **Live Server** teeb seda ühe klikiga.

---

## 10. DevTools → Network

Siin näed, mis päriselt juhtus. See vastab 90% „miks mu fetch ei tööta" küsimustest.

Ava F12 → **Network**, siis laadi leht uuesti.

- **Name** — millist aadressi küsiti
- **Status** — 200 (roheline) või 404/500 (punane)
- **Kliki päringu peal:**
  - **Headers** — täpne URL, meetod, staatus
  - **Response** — mida server **päriselt** tagastas. Kui ootasid JSON-i ja näed
    HTML-i, on su URL vale
  - **Timing** — kui kaua võttis

Kaks nuppu, mida sel nädalal vajad:

- **Throttling** (rippmenüü, vaikimisi „No throttling") → vali **Slow 3G**. Nüüd on
  päringud aeglased ja sa **näed oma laadimisolekut.** Ilma selleta on see nii kiire,
  et sa ei tea, kas see üldse töötab
- **Offline** — simuleerib võrgu puudumist. Nii testid oma veaoleku ära

---

## 11. Mida sa EI pea teadma

- **`.then()` ahelad** — tunne ära, aga kirjuta `async/await`. Sama asi, loetavam
- **`XMLHttpRequest`** — `fetch`-i eelkäija, 15 rida seal, kus `fetch` võtab kaks
- **jQuery `$.ajax`** — sama lugu, ainult veel vanem
- **axios** — populaarne teek, aga `fetch` on brauseris sisse ehitatud ja teeb sama
  asja. Õpi kõigepealt see, mis on tasuta olemas
- **`Promise.all`, `race`, `allSettled`** — mitme päringu korraga tegemiseks. Kasulik,
  aga alles siis kui üks päring on käpas
- **Event loop, microtask queue** — asünkroonsuse sisemus. Põnev, aga sa ei vaja seda,
  et koodi kirjutada
- **Generaatorid, `async` iteraatorid** — eksootika
- **WebSocket** — pidev ühendus serveriga. Teine teema, teine aeg

---

## Kordamine — vasta endale enne ülesannete juurde minekut

1. Miks ei saa JS lihtsalt oodata, kuni võrgupäring valmis saab?
2. `console.log("1"); setTimeout(() => console.log("2"), 0); console.log("3");` —
   mis järjekorras need tulevad ja miks?
3. Mida `await` teeb? Ja kus seda kasutada tohib?
4. Miks on `fetch`-i juures **kaks** `await`-i?
5. Server vastas 404-ga. Kas `fetch` viskab vea? Mida sa pead ise tegema?
6. Mis vahe on `vastus.ok` ja `vastus.status` vahel?
7. Millal `fetch` ise vea viskab?
8. Mis on need kolm olekut, mis on igal andmeid laadival ekraanil?
9. Miks kutsutakse `joonista()` kaks korda — enne ja pärast päringut?
10. Sa saad CORS-i vea. Kas see on sinu koodi viga? Mida sa teha saad?
