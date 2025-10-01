# Laboratorul 2 - GitHub Actions
Ai vrut vreodată să folosești GitHub Actions, dar nu ești sigur de unde să începi? Atunci acest repozitoriu este pentru tine! În [Cuprinsul](#cuprins-și-de-unde-să-începi) de mai jos, vei găsi o listă de exerciții care îți vor crește cunoștințele despre Actions cu aplicații practice și exemple din lumea reală. Majoritatea exercițiilor pot fi efectuate independent, dar câteva se bazează unul pe altul și acest lucru este menționat în prerequizitele exercițiului. Vei învăța și despre funcționalitățile GitHub care se integrează cu Actions și vei vedea cum să le folosești.

Nu găsești un exercițiu pe care speri să-l găsești? Deschide un `issue` pe acest repo pentru a-l sugera.

Această lucrare este complet open source și vine fără niciun suport sau garanție, mai ales pe măsură ce funcționalitățile GitHub se schimbă în timp.

---

## Prerequisite pentru Exerciții

### Software Instalat
- [Git](https://git-scm.com/downloads)
- Un editor de cod sursă ([VSCode](https://code.visualstudio.com/download), etc.)
- [Node.js](https://nodejs.org/) (v18 sau mai nou) - pentru exercițiile Node.js
- [Go](https://go.dev/dl/) (opțional) - dacă preferi exemplele Golang

### Mediu
1. Un repozitoriu GitHub gol (neinițializat) la care ai acces de administrator.
2. Autentificare la GitHub (credențiale OAUTH sau token PAT)
3. Setup:
   1. Acest repozitoriu clonat local
   2. Șterge fișierul `.github/workflows/ci.yaml`.
   3. Actualizează remote-ul la URL-ul repozitoriului tău din pasul 1. Vezi [instrucțiunile](https://docs.github.com/en/get-started/getting-started-with-git/managing-remote-repositories#changing-a-remote-repositorys-url) pentru adăugarea unui remote.

### Cunoștințe
- [Cum să creezi un repozitoriu pe GitHub](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository)
- [Cum să clonezi un repozitoriu GitHub](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
- [Cum să adaugi, comiți și împingi modificări într-un repozitoriu GitHub](https://github.com/git-guides/git-commit)
- [Cum să creezi și să publici o ramură](https://github.com/git-guides/git-push)

---

## Cuprins și De Unde Să Începi
Mai jos sunt exercițiile care te vor ajuta în călătoria ta cu Actions. Ele se construiesc unul pe altul, deci parcurgerea lor incremental este ideală.

1. [Crearea de workflow-uri de bază](./01-Basic-Workflows.md)
2. [Înțelegerea variabilelor de context](./02-Understanding-Context-Variables.md)
3. [Crearea de workflow-uri pentru alte evenimente](./03-Other-Event-Workflows.md)
4. [Variabile de mediu globale între joburi](./04-Global-Environment-Variables.md)
5. [Setări implicite pentru workflow-uri](./05-Workflow-Defaults.md)
6. [Crearea de joburi dependente](./06-Dependent-Jobs.md)
7. [Grupuri de concurență](./07-Concurrency-Groups.md)
8. [Crearea strategiei de matrice](08-Matrix-Strategy.md)
9. [Workflow-uri manuale](09-Manual-Workflow.md)
10. [Workflow-uri reutilizabile](./10-Reusable-Workflow.md)
11. [Utilizarea acțiunilor publice](./11-Using-Actions.md)
12. [Configurare Dependabot](./12-Dependabot-Config.md)
13. [Integrare continuă](./13-Continuous-Integration.md)
14. [Artefacte](./14-Artifacts.md)
15. [Caching](./15-Caching.md)
16. [Pachete și livrare continuă](./16-Packages-And-Continuous-Delivery.md)
17. [Medii și desfășurare continuă](./17-Environments-And-Continuous-Deployment.md)
18. Releases & Tags (în construcție)
19. Crearea propriilor acțiuni (în construcție)

---

## Fișiere în Acest Repozitoriu
- `./docker_image` conține fișiere referitoare la crearea imaginii Docker în exercițiul de Livrare Continuă.
- `./nodejs_app` conține toate fișierele referitoare la aplicația Node.js pe care o vom construi în exercițiul de Integrare Continuă (exemplu principal).
- `./nodejs_replacements` conține fișiere referitoare la modificarea aplicației Node.js în mai multe exerciții.
- `./golang_app` conține toate fișierele referitoare la aplicația Golang (exemplu alternativ opțional).
- `./golang_replacements` conține fișiere referitoare la modificarea aplicației Golang în mai multe exerciții.
- `./images` conține orice imagini plasate în fișierele Markdown de exerciții.
- `./.gitignore` pur și simplu ignoră anumite fișiere care nu ar trebui să existe în repozitoriu.
- `./<##>-<Nume-Exercițiu>.md` sunt exercițiile scrise în Markdown și pot fi vizualizate prin repozitoriul GitHub sau deschise într-un editor de cod.

---

## Referință Rapidă pentru Comenzi
- Push: `git push`
- Add & commit: `git add <cale-către-fișier>; git commit -m "<mesajul tău>"` (înlocuiește cu fișierul și mesajul)
- Publică o ramură: `git push --set-upstream origin <ramură>` (înlocuiește cu numele ramurii)
- Clonează un repozitoriu: `git clone <url-repozitoriu>` (înlocuiește cu URL-ul repozitoriului)
- Checkout către o ramură: `git checkout <nume-ramură>` (înlocuiește cu numele ramurii)