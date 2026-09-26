# Nädal 3 — CSS layout, grid ja responsive (~12 h)

Endiselt: mitte ühtegi kopeeritud rida. Sel nädalal tuleb tahtmine grid-i näidis
kuskilt kopeerida — just siis, kui see tundub liiga keeruline. Ära tee.

---

## 0. CV lihv (~1 h)

Paranda [cv/](../nadal-02/cv/) ära, eelmise tagasiside põhjal:

- [ ] Viis `color`-reeglit → üks `body { color: ...; background-color: ...; }`
- [ ] `* { box-sizing: border-box; }`
- [ ] `form` → `flex-direction: column` + `gap`
- [ ] `main` → `max-width: 65ch; margin: 0 auto;`
- [ ] Kustuta `button`-reegel (või muuda HTML `<button type="submit">Saada</button>`-iks)
- [ ] `--var-tekst` → `--varv-tekst`
- [ ] `lang="et"`, e-post `type="email"`, sõnum `<textarea>`, `<h2>Kontakt</h2>`
- [ ] Halli-halli kontrast korda
- [ ] Puuduvad semikoolonid
- [ ] Kustuta `class="section"` — sa ei kasuta neid CSS-is

Ava iga muudatuse järel leht brauseris. Mitte lõpus. **Iga muudatuse järel.**

---

## 1. Kuidas asjad päriselt paika lähevad (~2 h)

Loe MDN-ist ja katseta DevToolsis:

- **Normal flow** — miks `div` läheb üksteise alla ja `span` kõrvuti
- `display: block` vs `inline` vs `inline-block`
- `position`: `static` → `relative` → `absolute` → `fixed` → `sticky`.
  Iga üks proovi järele, ära loe ainult
- Margin collapse — kaks kõrvutist `margin: 20px` ei anna 40px

**Kontroll:** tee sticky päis, mis jääb kerimisel üles. Kolm rida CSS-i. Kui see
töötab, siis sa saad `position`-ist aru.

## 2. Grid (~3 h)

Flexbox = üks suund (rida VÕI veerg). Grid = kaks suunda korraga (read JA veerud).

- `display: grid`, `grid-template-columns`, `gap`
- `fr` ühik — mis vahe on `1fr 1fr` ja `50% 50%` vahel (vihje: `gap`)
- `repeat(3, 1fr)`
- `repeat(auto-fit, minmax(250px, 1fr))` — see üks rida teeb kaardid responsive-iks
  **ilma ühtegi media queryt**. Aja see rida endale selgeks, see on sel nädalal
  kõige kasulikum asi
- `grid-column: span 2`

**Kontroll:** DevTools → Elements → grid-konteineri kõrval on väike `grid` silt.
Kliki sellele, brauser joonistab jooned peale. Kasuta seda kogu nädal.

## 3. Mobile-first ja media queryd (~2 h)

- Kirjuta **kõigepealt kitsa ekraani stiilid** (ilma media queryta), siis laienda:
  `@media (min-width: 700px) { ... }`. Mitte vastupidi
- Miks nii: telefon saab lihtsaima CSS-i, mitte hunniku ülekirjutusi
- `rem` vs `px` — miks `rem` austab kasutaja fondiseadeid
- DevTools → Ctrl+Shift+M (device toolbar). Testi 360px ja 1440px juures

---

## 4. Ehita: kolmeleheline sait (~4 h)

Kaust `01-veeb/nadal-03/sait/`:

```
index.html       — avaleht: kes sa oled, mida õpid
projektid.html   — projektide kaardid grid-is
kontakt.html     — vorm + kontaktandmed
style.css        — ÜKS fail kõigi kolme jaoks
```

Nõuded:
- [ ] Navigatsioon (`<nav>`) kõigil kolmel lehel, lingid töötavad mõlemas suunas
- [ ] Praegune leht on navis visuaalselt eristatud (nt `class="aktiivne"`)
- [ ] `projektid.html` kaardid on **grid**-is, `auto-fit` + `minmax`
- [ ] Vähemalt üks `@media (min-width: ...)` — ja baasstiil on mobiilile
- [ ] Sama `style.css` kõigil kolmel, mitte kolm koopiat
- [ ] Ei raamistikke, ei CDN-e, ei kopeeritud plokke
- [ ] Projektide sisu on päris: sinu CV-leht, sinu Pythoni asjad. Vähe on okei

**Kontroll enne commitimist:**
1. Kõik kolm lehte avanevad, nav töötab igalt lehelt igale lehele
2. F12 → Console puhas, Network ilma 404-ta
3. 360px ja 1440px — mõlemas loetav, horisontaalset kerimist ei ole
4. validator.w3.org — kõik kolm lehte, 0 viga
5. Suudan iga rea seletada

---

## 5. Pane tähele üht asja

Kui sa kolmandat korda sama `<nav>` blokki kopeerid, hakkab see tüütama. Ja kui sa
muudad ühte linki, pead seda tegema kolmes failis.

Kirjuta see tunne päevikusse üles. 6. nädalal, kui jõuame Vue komponentideni, saad
teada, mille jaoks need täpselt leiutati — ja see on palju arusaadavam, kui sa oled
seda valu ise tundnud.

## Nädala lõpuks
- [ ] CV lihvitud ja commititud
- [ ] Sticky päis proovitud
- [ ] Kolmeleheline sait valmis, responsive, valideeritud
- [ ] Päevikus kirjas, mis grid-i juures kõige kauem segane oli
