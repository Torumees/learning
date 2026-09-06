# Setup (1. nädala ülesanne)

Olemas: git 2.51, node 22.22, npm 10.9, VS Code 1.136.

## Paigalda
1. ~~**JDK 21**~~ — installitud: `C:\Program Files\Java\jdk-21.0.12.1`.
   **AGA seadistamata, vt allpool.**
2. **IntelliJ IDEA Community** — Java/Spring jaoks. VS Code jääb frontendi jaoks.
3. **PostgreSQL 17** (17. nädalal, aga võid kohe) — installer paneb kaasa pgAdmini.
4. **GitHub konto** + SSH või HTTPS-i ligipääs.

## Valikuline hiljem
- Docker Desktop (andmebaasi käivitamiseks konteineris)
- DBeaver (mugavam SQL-klient kui pgAdmin)
- Maven tuleb Spring Boot projektiga kaasa (mvnw), eraldi installida pole vaja.

## Java 21 tööle saamine (POOLELI)

JDK 21 on kettal olemas, aga masin kasutab ikka Java 8-t. Kaks põhjust:

- `JAVA_HOME` = `C:\Program Files\Amazon Corretto\jdk1.8.0_472` (süsteemi muutuja)
- `PATH`-is on ees vanad Oracle-i otseteed
  (`...\Common Files\Oracle\Java\javapath` ja `java8path`), JDK 21 `bin`-i seal üldse pole

Miks see loeb: Maven, `mvnw` ja IntelliJ vaatavad `JAVA_HOME`-i. Kui see osutab Java 8-le,
Spring Boot 3 projekt lihtsalt ei käivitu (nõuab 17+).

### Paranda (üks dialoog, ~3 min, vajab administraatori õigusi)

1. Windowsi otsingusse: **"Muuda süsteemi keskkonnamuutujaid"** → nupp
   **Keskkonnamuutujad** (Environment Variables)
2. Alumises kastis (**Süsteemi muutujad**) leia `JAVA_HOME` → **Muuda** → väärtuseks
   `C:\Program Files\Java\jdk-21.0.12.1`
3. Sealsamas leia `Path` → **Muuda** → **Uus** → lisa `%JAVA_HOME%\bin` → siis vajuta
   **Liiguta üles**, kuni see on kõige ülemine rida
4. OK → OK → **sulge kõik terminalid ja VS Code ning ava uuesti** (vanad aknad hoiavad
   vana keskkonda)

### Kontroll
```
java -version     # peab ütlema 21.x
javac -version    # peab ütlema 21.x
node -v           # v22.x
git --version     # 2.51
```
Kui `java -version` näitab ikka 1.8, siis on mõni Oracle-i otsetee `%JAVA_HOME%\bin`-ist
eespool — vaata `where java`, esimene rida peab olema jdk-21 oma.
