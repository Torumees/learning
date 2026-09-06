# Nädal 1 — ülesanded (~12 h)

## 1. Setup (~2 h)
Käi [SETUP.md](../../SETUP.md) läbi. Kontrolli lõpuks, et `java -version` näitab 21.x.

## 2. Git päriselt selgeks (~4 h)
Tee kõik käsitsi terminalis, mitte VS Code-i nuppudega — nupud tulevad hiljem.

1. `git status`, `git add`, `git commit -m "..."`, `git log --oneline`
2. Tee GitHubis repo `learning`, seo: `git remote add origin ...`, siis `git push -u origin master`
3. Tee haru: `git switch -c proov`, muuda paevik.md, commiti, `git switch master`, `git merge proov`
4. **Tekita meelega konflikt** ja lahenda: muuda mõlemas harus sama rida ja merge-i.
5. Kirjuta paevik.md-sse oma sõnadega, mis vahe on `add`, `commit` ja `push` vahel.

## 3. Mõistekaart (~2 h)
Joonista (paberil või Excalidraw-s) skeem: brauser → frontend → HTTP-päring → backend →
andmebaas → vastus tagasi. Märgi peale, kus asuvad HTML/CSS/JS, kus Java/Spring, kus SQL.
Pildista ja pane siia kausta. Selle juurde tuled 16. nädalal tagasi.

## 4. Arenduse elutsükkel (~2 h)
Kirjuta 1 lk: mis toimub etappides idee → analüüs → disain → arendus → testimine →
dokumenteerimine → juurutamine. Mida sina oma senistes Pythoni projektides vahele jätsid?

## 5. Reeglid (~30 min)
Loe [REEGLID.md](../../REEGLID.md). Kui sa reeglit 1 ei järgi, ei muutu 26 nädala pärast
midagi.

## Nädala lõpuks
- [ ] JDK 21 töötab
- [ ] Repo GitHubis, vähemalt 5 commiti
- [ ] Merge-konflikt lahendatud
- [ ] Skeem ja elutsükli tekst olemas
