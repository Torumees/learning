# Noorem AI-arendaja — iseõppekava, 26 nädalat (~12 h/nädalas)

Alus: BCS Koolituse "Noorem AI-arendaja" kontaktõppe õppekava (280 ak.h, 7 nädalat
täiskohaga, kinnitatud 25.02.2026). Sama sisu ja sama järjekord, hajutatud 26 nädalale.

**Sinu lähtekoht:** Python (funktsioonid, tsüklid OK; klassid segased; API-sid pole
teinud). HTML/CSS/JS on seni AI kirjutanud. → Loe kõigepealt [REEGLID.md](REEGLID.md).

**Keelevalik:** kava kasutab Java + Spring. Jään selle juurde, kuigi sa oskad Pythonit —
just sellepärast, et sinu nõrk koht on klassid/OOP ja Java sunnib selle selgeks tegema.
Eesti tööturul on Java/Spring ka kõige suurem nišš. (Kui tahad, saab sama kava
Python + FastAPI peal; ütle, siis kirjutan ümber.)

---

## Plokid

| Plokk | Nädalad | Sisu | Lõpuks on olemas |
|---|---|---|---|
| 0 | 1 | Töövahendid, Git, arenduse elutsükkel | GitHub repo + esimesed commitid |
| 1 | 2–5 | HTML, CSS, JavaScript, asünkroonsus | To-do + API-rakendus ilma raamistikuta |
| 2 | 6–8 | Vue.js + esimene projekt | Avalikult deployitud frontend |
| 3 | 9–12 | Java alused + OOP | Konsoolirakendus klasside ja erinditega |
| 4 | 13–16 | Spring Boot, REST, DI | Full-stack: Vue räägib sinu API-ga |
| 5 | 17–19 | PostgreSQL + Spring Data JPA | Andmebaasiga rakendus |
| 6 | 20–21 | Testimine ja silumine | JUnit + integratsioonitestid |
| 7 | 22–24 | AI arendustöös + LLM-rakendused | RAG-põhine chatbot rakenduses |
| 8 | 25–26 | Lõpuprojekt ja kaitsmine | Dokumenteeritud MVP + esitlus |

---

## Nädalate kaupa

### Plokk 0 — Töövahendid

**N1 · Setup, Git, kuidas arendus käib**
- Teemad: [SETUP.md](SETUP.md) läbi; terminal; git init/add/commit/log/branch/merge/push;
  merge-konflikti lahendamine; arenduse elutsükkel (idee → analüüs → disain → arendus →
  test → dokumentatsioon); mis on frontend / backend / andmebaas / API.
- Ehitad: GitHub repo, kuhu paned kogu selle kausta. Päevik commititakse iga päev.
- Oskan kui: seletan vahet commit / push / branch ja lahendan konflikti ilma paanikata.

### Plokk 1 — Veeb ilma raamistikuta

**N2 · HTML + CSS alused**
- Teemad: semantilised elemendid, vormid ja sisendid, ligipääsetavus (label, alt),
  CSS-selektorid, box model, flexbox.
- Ehitad: oma CV-leht. **Ilma ühegi AI-genereeritud reata.**

**N3 · CSS layout**
- Teemad: grid, media queries, mobile-first, CSS-muutujad, positsioneerimine.
- Ehitad: 3-leheline sait (avaleht / projektid / kontakt), töötab telefonis.

**N4 · JavaScript alused**
- Teemad: let/const, tüübid, funktsioonid, massiivid ja objektid, map/filter/reduce,
  DOM-i muutmine, sündmused, localStorage.
- Ehitad: to-do rakendus vanilla JS-is. Pane tähele, kus JS erineb Pythonist.

**N5 · Asünkroonne JS** *(kava: "asünkroonne programmeerimine, call-backid, sünkroniseerimine")*
- Teemad: callback → Promise → async/await, fetch, JSON, veakäsitlus,
  DevTools Network-vaade.
- Ehitad: rakendus avaliku API peal (nt ilm või Eesti avaandmed), korralike
  laadimis- ja veaolekutega.

### Plokk 2 — Vue.js

**N6 · Vue alused**
- Teemad: Vite projekt, komponent (SFC), template-süntaks, ref/reactive, props, emit,
  v-for / v-if / v-model.
- Ehitad: sama to-do uuesti Vue-s. Võrdle, mis läks lihtsamaks.

**N7 · Vue jätk**
- Teemad: komponentideks jaotamine, computed, watch, elutsükkel, vue-router,
  API-kutsed komponendist, jagatud olek.
- Ehitad: mitmelehine Vue-rakendus, mis kasutab välist API-t.

**N8 · Projekt #1 + planeerimine** *(kava: MVP ulatus, ajakava, prototüüp, ERD)*
- Teemad: MVP piiritlemine, kasutajalood, Figma-prototüüp, esimene ERD-i visand
  lõpuprojekti jaoks, deploy (Netlify / Vercel / GitHub Pages).
- Ehitad: avalik portfoolio-frontend + README.

### Plokk 3 — Java ja OOP

**N9 · Java alused I**
- Teemad: JDK 21, IntelliJ, main-meetod, kompileerimine; andmetüübid, operaatorid,
  avaldised; String ja selle meetodid; teisendused arv ↔ string; boolean-avaldised.

**N10 · Java alused II**
- Teemad: if / else / switch, tsüklid (for, while, for-each), massiivid, meetodid,
  parameetrid ja tagastusväärtus, List ja Map.
- Ehitad: 15–20 algoritmiülesannet (Exercism Java track sobib hästi).

**N11 · OOP I — sinu nõrk koht, ära kiirusta**
- Teemad: klass vs objekt, väljad ja meetodid, konstruktorid, `this`,
  public / private / final, static vs instance.
- Ehitad: raamatukogu konsoolis — `Book`, `Member`, `Library`. Iga klass eraldi failis.
- Oskan kui: seletan, miks `static` meetod ei näe objektivälju.

**N12 · OOP II**
- Teemad: pärimine, liidesed, abstraktsed klassid, polümorfism, kompositsioon,
  pakid, erindid (try/catch/throw, checked vs unchecked), Optional, equals/hashCode.
- Ehitad: eelmine laiendatud liidese ja korraliku veakäsitlusega.

### Plokk 4 — Spring Boot ja REST

**N13 · Spring Boot + REST I**
- Teemad: Maven ja pom.xml, Spring Initializr, @RestController, GET/POST/PUT/DELETE,
  @RequestBody / @PathVariable, DTO-d, HTTP staatuskoodid, testimine Postmani või curliga.
- Ehitad: REST API, mis hoiab andmeid veel mälus.

**N14 · Spring II — DI / IoC** *(kava rõhutab seda eraldi)*
- Teemad: @Component / @Service / @Repository, konstruktori-injection ja miks see parem on,
  Spring context, application.properties, profiilid, @Valid-valideerimine.

**N15 · Spring III — vead, CORS, Swagger**
- Teemad: @RestControllerAdvice ja ühtne veavastus, CORS, springdoc-openapi (Swagger UI),
  logimine (SLF4J), kihiline arhitektuur (controller → service → repository).

**N16 · Frontend + backend kokku**
- Ehitad: Vue-rakendus kasutab sinu enda API-t. Keskkonnamuutujad, API-kliendi kiht,
  CORS töökorda. **See on esimene päris full-stack rakendus — võta hetk ja märka seda.**

### Plokk 5 — Andmebaas

**N17 · SQL alused**
- Teemad: PostgreSQL install, psql ja pgAdmin, tabelid ja tüübid, PK/FK,
  INSERT / SELECT / UPDATE / DELETE, WHERE, ORDER BY, LIMIT.

**N18 · SQL jätk**
- Teemad: JOIN-id (inner/left), GROUP BY ja agregaadid, alampäringud, indeksid,
  normaliseerimine, ERD lõplik joonis.

**N19 · Spring Data JPA**
- Teemad: @Entity, JpaRepository, päringumeetodid, seosed (@OneToMany / @ManyToOne),
  laisk vs innukas laadimine, Flyway-migratsioonid.
- Ehitad: viid N16 rakenduse mälust andmebaasi peale — kava sõnastuses
  "REST teenuste üleviimine nii et nad kasutaks andmebaasi".

### Plokk 6 — Testimine

**N20 · Testimine I**
- Teemad: manuaalne testimine ja testjuhtumid, JUnit 5, assertid, AAA-muster,
  unit-testid teenuseloogikale, ääre- ja veajuhud.

**N21 · Testimine II + silumine**
- Teemad: Mockito, @SpringBootTest, MockMvc integratsioonitestid, IntelliJ debugger
  (breakpoint, step, watch), logide lugemine, testkatvus.

### Plokk 7 — AI

**N22 · AI arendustöö abivahendina**
- Teemad: AI kui õpetaja / koodi selgitaja / ülevaataja / kirjutaja; AI IDE-s ja väljaspool;
  code review AI-ga ja tulemuse kriitiline hindamine; kus AI süstemaatiliselt eksib.
- Ehitad: lased AI-l oma N19 koodi üle vaadata ja kirjutad iga soovituse kohta, kas
  nõustud ja miks. See ongi õpiväljund.

**N23 · Struktureeritud promptimine + LLM API**
- Teemad: LLM API kutsumine backendist; prompt kui roll + kontekst + ülesanne + piirangud;
  temperature / top_p / top_k; struktureeritud (JSON) väljund; A/B-testimine;
  prompti metaandmete logimine; iteratiivne töövoog (käivita → salvesta → valideeri → täienda).

**N24 · Grounding, RAG, chatbot**
- Teemad: hallutsinatsioonid ja nende vähendamine, allikate lisamine, embeddingud ja
  vektorotsing, lihtne RAG oma andmete peal, MCP mõiste, chatboti lisamine rakendusse.
- Ehitad: chatbot, mis vastab **ainult** sinu andmebaasi/dokumentide põhjal ja viitab allikale.

### Plokk 8 — Lõpuprojekt

**N25–26 · MVP algusest lõpuni**
- Vue + Spring Boot + PostgreSQL + AI-funktsioon, unit- ja integratsioonitestid,
  Swagger-dokumentatsioon, README ja tehniline kirjeldus, deploy.
- Lõpetuseks: 10-minutiline esitlus — mida ehitasid, miks nii, mis oli raske.
  Salvesta see video. Kava lõpetamise tingimus on täpselt see: projekti kaitsmine.

---

## Kuidas ma tean, et see töötab

Iga ploki lõpus vasta ausalt: kas ma suudan selle asja **tühjalt kohalt uuesti teha**,
ilma juhendi ja ilma AI-ta? Kui ei — korda ploki projekti teise teemaga, mitte ära loe
materjali uuesti.
