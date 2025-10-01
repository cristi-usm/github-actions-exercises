# Utilizarea Acțiunilor
Până în acest moment, toate exercițiile anterioare s-au concentrat pe utilizarea proprietății `run` pentru un pas. Acest lucru ne-a permis să executăm comenzi CLI în mediul pe care îl foloseam (Ubuntu Linux). Ca rezultat, am fost martorii unor comenzi bash simple (`echo`, etc.).

Următorul exercițiu te va ghida prin utilizarea acțiunilor (acestea pot proveni dintr-un repozitoriu public sau intern), care diferă de comenzile simple `run`, deoarece utilizează sintaxa și regulile de creare a acțiunilor, pe care le vom acoperi în pasul următor.

## 1. Creează un nou fișier de workflow

1. Din ramura **main** a repozitoriului tău, creează o nouă ramură de cod numită `feature/using-actions`
2. Creează un nou fișier numit `.github/workflows/using-actions.yaml`
3. Copiază conținutul de mai jos în fișierul nou creat:

```yaml
name: Using Actions
on:
  push:
    branches: feature/using-actions
jobs:
  do-things:
    name: Doing Things With Actions
    runs-on: ubuntu-latest
    steps:
      - name: List Directory Contents
        run: ls -latr
      - name: Checkout The Code
        uses: actions/checkout@v3
      - name: List Directory Contents Again
        run: ls -latr
```

In exemplu anterior, rulam comenzi în runner, dar runner-ul (implicit) nu are conținutul repozitoriului clonat. În configurația de mai sus, folosim acțiunea `actions/checkout` (deținută de GitHub în organizația `actions`) pentru a clona codul în runner.

4. Adaugă, commit și fa push modificărilor tale către ramura main.
5. Mergi la repozitoriul tău și vizualizează pagina Actions pentru a vedea execuția împotriva ramurii tale publicate.

Rezultatul va fi o execuție care afiseaza conținutul unui director gol, clonează repozitoriul și apoi afiseaza din nou conținutul (de data aceasta, cu fișiere).

Similar cu workflow-urile reutilizabile, sintaxa pentru o acțiune este `<owner>/<repo>@<release-tag>`

## 2. Adăugarea input-urilor pentru o acțiune

Atunci când folosești o acțiune, este posibil să fie necesar să oferi diferite input-uri. Acest lucru este unic pentru fiecare acțiune. Pentru a vedea o listă de input-uri, vizitează pur și simplu `https://github.com/<owner>/<repo>`, și uită-te la sursa fișierului `action.yml`.

Pentru exemplu: `https://github.com/actions/checkout/blob/main/action.yml`

Proprietatea `inputs` definește toate input-urile posibile și dacă sunt necesare sau nu.

1. Modifică fișierul de workflow pe care tocmai l-ai creat: `.github/workflows/using-actions.yaml`
2. Înlocuiește conținutul cu:

```yaml
name: Using Actions
on:
  push:
    branches: feature/using-actions
jobs:
  do-things:
    name: Doing Things With Actions
    runs-on: ubuntu-latest
    steps:
      - name: List Directory Contents
        run: ls -latr
      - name: Checkout The Code
        uses: actions/checkout@v3
        with:
          clean: true
      - name: List Directory Contents Again
        run: ls -latr
```

4. Adaugă, commit și fa push modificărilor tale către ramura implicită.
5. Mergi la repozitoriul tău și vizualizează pagina Actions pentru a vedea execuția.

Rezultatul va fi același ca înainte, dar de data aceasta am adăugat input-ul `clean` pentru a efectua câteva sarcini suplimentare de curățare atunci când clonăm repozitoriul (definit în documentație)

## 3. Folosirea `script-actions` pentru a scrie acțiuni rapide pentru interacțiunea cu API-ul GitHub

Aceste exerciții nu acoperă crearea propriilor acțiuni, dar pentru a înțelege unele dintre procesele de bază și a deveni puțin mai familiarizați cu input-urile, vom încerca să folosim acțiunea populară `actions/github-script`.

Aceasta utilizează Node.js și [OctoKit](https://github.com/octokit) pentru a executa scriptul pe care îl transmiți, la fel cum ai face atunci când creezi propria acțiune cu Node.js. Acest lucru simplifică procesul prin gestionarea instanțierii OctoKit și a oricărei lucrări suplimentare de configurare implicate.

1. Modifică fișierul de workflow pe care tocmai l-ai creat: `.github/workflows/using-actions.yaml`
2. Înlocuiește conținutul cu:

```yaml
name: Using Actions
on:
  push:
    branches: feature/using-actions
jobs:
  do-things:
    name: Doing Things With Actions
    runs-on: ubuntu-latest
    steps:
      - name: List Directory Contents
        run: ls -latr
      - name: Checkout The Code
        uses: actions/checkout@v2
        with:
          clean: true
      - name: List Directory Contents Again
        run: ls -latr
      - name: Use GitHub Script Action
        uses: actions/github-script@v6
        with:
          script: |
            const create = await github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: "Learning To Use Script-Actions!",
              body: "Hey, we used script actions! Here's the commit SHA that triggered this: ${{github.sha}}"
            })
            return create.data.number
```

4. Adaugă, commit și împinge modificările tale către ramura implicită.
5. Mergi la depozitul tău și vizualizează fila Acțiuni pentru a vedea execuția, apoi vizitează fila Probleme.

Rezultatul va fi o problemă creată în depozitul tău.

## 4. Fuzionarea cererii de extragere în ramura **implicită** pentru utilizare ulterioară

În pașii anteriori, am implementat acțiuni publice, dar am folosit în mod special o versiune învechită. Vrem ca aceasta să fie pusă în ramura **implicită** pentru a o putea vedea într-un pas ulterior.

1. Dute la depozitul tău și navighează la fila "Pull Requests"
2. Creează o nouă cerere de extragere pentru a fuziona `feature/using-actions` în ramura ta **implicită**
3. Fuzionează cererea de extragere creată.
4. Șterge ramura publicată creată în [Pasul 1](#step-1-create-a-new-workflow-file)