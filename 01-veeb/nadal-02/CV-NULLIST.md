# CV nullist — 2. nädala kordus

See on väiksem kui algne ülesanne. Tahtlikult. Eesmärk ei ole ilus CV, vaid **üks
leht, kus sa tead iga rea kohta, miks see seal on.**

## Reeglid selle ülesande ajaks

- Uus kaust: `01-veeb/nadal-02/cv/` → `index.html` + `style.css`
- Tühjast failist. Mitte ühtegi kopeeritud rida, ei AI-st, ei mallist, ei
  eelmisest index.html-ist
- **Kole on lubatud.** Must tekst valgel taustal on täiesti okei tulemus
- Ei Font Awesome, ei väliseid pilte, ei CDN-linke. Ainult su enda kaks faili
- Sisu on **päris**: sinu päris töökohad, sinu päris oskused. Lorem ipsumit ei ole.
  Kui oskusi on vähe, kirjuta vähe — see ongi aus lähtepunkt

## Mida leht peab sisaldama

```
<!DOCTYPE html>
<html lang="et">
  <head>   charset, viewport, title, link style.css
  <body>
    <header>   sinu nimi (h1) + üks lause enda kohta
    <main>
      <section>  Töökogemus   — h2 + iga koht: h3 + kuupäevad + paar rida
      <section>  Oskused      — h2 + <ul> päris oskustega
      <section>  Haridus      — h2 + kool + aastad
      <section>  Kontakt      — h2 + <form>
    <footer>   aastaarv + nimi
```

Vormis: `nimi`, `e-post`, `sõnum`, saatmisnupp. Iga välja juures `<label for="...">`,
mis on seotud välja `id`-ga. Kliki lehel labeli peale — kui kursor hüppab õigesse
välja, on seos õige. Kui ei hüppa, on `for` ja `id` paigast ära.

## CSS — maksimaalselt ~60 rida

```css
:root {
  --varv-tekst: ...;
  --varv-taust: ...;
  --varv-rohutus: ...;
  --samm: 1rem;
}
```

Kasuta neid muutujaid `var(--varv-tekst)` kaudu. Lisaks:
- `box-sizing: border-box`
- üks `display: flex` koht (nt footer või kontaktirida)
- `max-width` sisule, et tekst ei veniks ekraani laiuseks
- **mitte ühtegi** `style=""` atribuuti HTML-is

## Kontroll enne commitimist

1. Ava leht brauseris. Kas **kõik** on näha? Ükski pilt ega ikoon ei tohi olla katki
2. F12 → Console. Punaseid vigu ei tohi olla
3. F12 → Network. Ükski rida ei tohi olla punane (404)
4. validator.w3.org → 0 viga
5. Telefonivaade: F12 → Ctrl+Shift+M
6. **Kõige tähtsam:** mine failis ülalt alla ja ütle iga rea kohta valjusti, mis see
   teeb. Iga rida, mille juures sa kokutad, kustuta ja kirjuta uuesti

## Valmis kui
- [ ] Leht avaneb, midagi pole katki, konsool puhas
- [ ] Vorm on olemas, labelid seotud (kliki-test läbitud)
- [ ] `:root` muutujad kasutusel
- [ ] Ei ühtegi inline `style`
- [ ] Kogu sisu on päris
- [ ] Suudan iga rida seletada
- [ ] Commititud ja pushitud
