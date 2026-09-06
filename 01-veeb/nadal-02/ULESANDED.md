# Nädal 2 — HTML + CSS alused (~12 h)

**Reegel selleks nädalaks: mitte ühtegi AI-genereeritud rida.** Kui jääd toppama, küsi
AI-lt "selgita, miks see nii on", mitte "kirjuta mulle see". Vt [REEGLID.md](../../REEGLID.md).

---

## 0. Järelejäänud töö 1. nädalast (~1 h)

**a) Merge-konflikt.** Sinu haru `proov` merge-iti fast-forwardina — Git lihtsalt nihutas
osuti edasi, päris merge-i ega konflikti ei tekkinud (`git log --merges` on tühi).
Konflikt on see, mida sa tööl kardad, seega tekita see meelega:

```
git switch -c konflikt-proov
# muuda paevik.md ESIMEST rida, nt kirjuta "# Minu õppepäevik"
git commit -am "haru: pealkiri muudetud"
git switch master
# muuda paevik.md SAMA rida teistmoodi, nt "# Egerti õppepäevik"
git commit -am "master: pealkiri muudetud"
git merge konflikt-proov
```

Nüüd Git ütleb CONFLICT. Ava paevik.md — näed märgiseid `<<<<<<<`, `=======`, `>>>>>>>`.
Kustuta märgised, jäta alles see tekst, mida tahad. Siis:

```
git add paevik.md
git commit
git log --graph --oneline
```

Kirjuta päevikusse, mida need kolm märgist tähendasid.

**b) Java 21.** Vaata [SETUP.md](../../SETUP.md) — JDK 21 on installitud, aga JAVA_HOME
ja PATH osutavad ikka Java 8-le. Paranda ära, kuni `java -version` ütleb 21.

---

## 1. HTML: struktuur, mitte välimus (~3 h)

Loe: MDN "HTML basics" ja "HTML forms" (developer.mozilla.org, eesti keeles pole — inglise
keel on selle ameti tööriist, harju ära).

Teemad, mis peavad selgeks saama:
- Semantilised elemendid: `header`, `nav`, `main`, `section`, `article`, `footer`, `h1`–`h6`
- Miks `<div>` kõige jaoks on halb mõte
- Lingid, pildid (`alt`!), listid, tabelid
- Vorm: `form`, `input` (eri tüübid), `label` + `for`, `textarea`, `select`, `button`

**Kontroll:** kirjuta tühjalt lehelt peast HTML-i skelett (`<!DOCTYPE html>` kuni `</html>`)
ilma kopeerimata. Tee seda nädala jooksul 3 korda.

## 2. CSS: kuidas asjad paika lähevad (~4 h)

- Selektorid: element, `.klass`, `#id`, järglane, `:hover`, `:focus`
- Kaskaad ja spetsiifilisus — miks mõni reegel "ei tööta"
- Box model: `content` → `padding` → `border` → `margin`, `box-sizing: border-box`
- Ühikud: `px`, `rem`, `%`, `vh`/`vw`
- Flexbox: `display:flex`, `flex-direction`, `justify-content`, `align-items`, `gap`

**Kontroll:** ava DevTools (F12) → Elements → paremal Computed. Vaata iga oma elemendi
box model-it. Kui midagi paigast ära, otsi vastus DevToolsist, mitte AI-lt.

## 3. Ehita: sinu CV-leht (~4 h)

Üks fail `index.html` + üks `style.css` kaustas `01-veeb/nadal-02/cv/`.

Nõuded:
- [ ] Semantiline struktuur (header / main / section-id / footer), mitte div-supp
- [ ] Päis nime ja lühitutvustusega
- [ ] Sektsioonid: kogemus, oskused, haridus, kontakt
- [ ] Vähemalt üks list ja üks pilt korraliku `alt`-iga
- [ ] Kontaktivorm (nimi, e-post, sõnum, saatmisnupp) — `label` iga välja juures
- [ ] Flexbox vähemalt ühes kohas
- [ ] Värvid ja fondid CSS-muutujatega (`:root { --varv-taust: ... }`)
- [ ] Ei ühtegi inline `style=""` atribuuti
- [ ] Valideeri: validator.w3.org — 0 viga

## 4. Päevik (~15 min/päev)
Iga päev 3 rida. Vähemalt üks kord kirjuta üles asi, millest sa aru ei saanud ja
mille sa ise välja nuputasid — need on need, mis kinnistuvad.

---

## Nädala lõpuks
- [ ] Merge-konflikt tekitatud ja lahendatud, merge-commit ajaloos olemas
- [ ] `java -version` → 21
- [ ] CV-leht valmis, W3C valideerib puhtalt
- [ ] Oskan peast HTML-i skeleti kirjutada
- [ ] Vähemalt 5 uut commiti, kõik pushitud
