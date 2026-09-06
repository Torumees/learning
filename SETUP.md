# Setup (1. nädala ülesanne)

Olemas: git 2.51, node 22.22, npm 10.9, VS Code 1.136.

## Paigalda
1. **JDK 21** — praegu on sul Java 1.8, see on Spring Bootile liiga vana.
   Amazon Corretto 21 või Eclipse Temurin 21. Pärast: `java -version` peab näitama 21.
   Sea JAVA_HOME uue JDK peale (vana Corretto 8 võib alles jääda, aga JAVA_HOME muuda).
2. **IntelliJ IDEA Community** — Java/Spring jaoks. VS Code jääb frontendi jaoks.
3. **PostgreSQL 17** (17. nädalal, aga võid kohe) — installer paneb kaasa pgAdmini.
4. **GitHub konto** + SSH või HTTPS-i ligipääs.

## Valikuline hiljem
- Docker Desktop (andmebaasi käivitamiseks konteineris)
- DBeaver (mugavam SQL-klient kui pgAdmin)
- Maven tuleb Spring Boot projektiga kaasa (mvnw), eraldi installida pole vaja.

## Kontroll
```
java -version     # 21.x
node -v           # v22.x
git --version     # 2.51
```
