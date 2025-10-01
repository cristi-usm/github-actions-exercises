# Caching
Cand lucrezi cu fluxuri de lucru, s-ar putea sa te regasesti efectuand acelasi set de sarcini de mai multe ori in cadrul fluxurilor de lucru sau chiar al joburilor. Acest lucru este frecvent intalnit in scenarii de construire unde se descarca dependente. Deoarece runner-ele Actions sunt efemere, fisierele dintr-o executie anterioara sunt sterse.

Acest lucru poate cauza inevitabil ca construirile sa dureze mai mult, mai ales atunci cand numarul de dependente utilizate este numeros.

In exercitiul anterior despre `Continuous Integration`, ai construit un flux de lucru care efectueaza automatizari atunci cand cererile de extragere sunt deschise pentru a fuziona in ramura **implicită**. In acest exercitiu, vom reutiliza acel flux de lucru pentru a demonstra putin caching.

> **Notă**: Există și un exemplu Golang disponibil în directorul `golang_app` dacă preferi să lucrezi cu Go.

## 1. Adaugă acțiunea de cache
1. Din ramura **implicită** a repozitoriului tău, creează o nouă ramură de cod numită `feature/cache`
2. Deschide fișierul numit `.github/workflows/ci-cd.yaml`
3. Înlocuiește conținutul fișierului cu:

### Varianta Node.js:

```yaml
name: Continuous Integration & Delivery
on:
  pull_request:
  workflow_dispatch:
defaults:
  run:
    shell: bash
jobs:
  ci:
    name: Continuous Integration
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: nodejs_app
    steps:
      - name: Clone
        uses: actions/checkout@v3.1.0
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: nodejs_app/package-lock.json
      - name: Install Dependencies
        run: npm ci
      - name: Run Linting
        run: npx eslint . --max-warnings 0
      - name: Run Tests
        run: npm test
      - name: Store Artifact
        uses: actions/upload-artifact@v3.1.0
        with:
          name: nodejs_app
          path: nodejs_app/
```

4. Înlocuiește conținutul fișierului [nodejs_app/index.js](./nodejs_app/index.js) cu continutul din [./nodejs_replacements/15-index.js](./nodejs_replacements/15-index.js)
5. Înlocuiește conținutul fișierului [nodejs_app/package.json](./nodejs_app/package.json) cu continutul din [./nodejs_replacements/15-package.json](./nodejs_replacements/15-package.json)
6. Înlocuiește conținutul fișierului [nodejs_app/package-lock.json](./nodejs_app/package-lock.json) cu continutul din [./nodejs_replacements/15-package-lock.json](./nodejs_replacements/15-package-lock.json)
7. Adaugă și comite modificările tale, apoi împinge ramura ta.
8. Mergi la depozitul tău și vizualizează fila `Pull Requests`.
9. Deschide o cerere de extragere pentru a fuziona `feature/cache` în ramura ta **implicită**.

### Varianta Golang:

<details>
<summary>Click pentru a vedea exemplul Golang</summary>

```yaml
name: Continuous Integration & Delivery
on:
  pull_request:
  workflow_dispatch:
defaults:
  run:
    shell: bash
jobs:
  ci:
    name: Continuous Integration
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: golang_app
    steps:
      - name: Path Setup
        id: go-paths
        working-directory: ${{github.workspace}}
        run: |
          echo "gomodcache=$(go env GOMODCACHE)" >> $GITHUB_OUTPUT
          echo "gocache=$(go env GOCACHE)" >> $GITHUB_OUTPUT
      - name: Clone
        uses: actions/checkout@v3.1.0
      - name: Cache
        uses: actions/cache@v3.0.10
        with:
          path: |
            ${{ steps.go-paths.outputs.gomodcache }}
            ${{ steps.go-paths.outputs.gocache }}
          key: ${{ runner.os }}-gomodcache-${{ hashFiles('**/go.sum') }}
      - name: Get Dependencies
        run: go get app
      - name: Build
        run: go build
      - name: Run Linting
        uses: golangci/golangci-lint-action@v3
        with:
          working-directory: golang_app
      - name: Run Tests
        run: go test
      - name: Store Artifact
        uses: actions/upload-artifact@v3.1.0
        with:
          name: golang_app
          path: golang_app/app
```

4. Înlocuiește conținutul fișierului [golang_app/main.go](./golang_app/main.go) cu continutul din [./golang_replacements/15-main.go](./golang_replacements/15-main.go)
5. Înlocuiește conținutul fișierului [golang_app/go.mod](./golang_app/go.mod) cu continutul din [./golang_replacements/15-go.mod](./golang_replacements/15-go.mod)
6. Înlocuiește conținutul fișierului [golang_app/go.sum](./golang_app/go.sum) cu continutul din [./golang_replacements/15-go.sum](./golang_replacements/15-go.sum)
7. Adaugă și comite modificările tale, apoi împinge ramura ta.
8. Mergi la depozitul tău și vizualizează fila `Pull Requests`.
9. Deschide o cerere de extragere pentru a fuziona `feature/cache` în ramura ta **implicită**.

</details>

În pașii de mai sus, ai adăugat caching în fișierul de workflow. Pentru Node.js, acțiunea `actions/setup-node` include caching integrat pentru npm. Pentru Go, am adăugat pași pentru a defini căile pentru caching și apoi am transmis aceste căi către acțiunea `actions/cache` care se ocupă de descărcarea și actualizarea cache-urilor. Acum vei vedea pași suplimentari pentru cache (`Cache` și `Post Cache` pentru Go, sau caching integrat pentru Node.js)

![A picture of the button](images/15-cache-steps.png)

Nici un pas suplimentar nu este necesar pentru a-ți salva cache-ul, deoarece acțiunea are hook-uri post-execuție care se ocupă de acest lucru pentru tine.

Rezultatul nu va fi o economie mare de timp, deoarece numărul de dependențe este foarte mic, dar într-un scenariu din lumea reală, acest lucru ar putea economisi mult, reducând descărcările de dependențe de la zeci de minute la doar câteva secunde.

## 2. Vizualizează zona "Caches" pe Workflow
În cadrul vizualizării workflow-ului, cache-urile pentru orice workflow dat pot fi văzute. Va trebui să ai mai întâi o execuție de succes, dar ulterior vizualizarea va fi disponibilă.

1. Mergi la fila `Actions` din depozitul tău.
2. Fă clic pe workflow-ul `Continuous Integration & Delivery` din stânga.
3. În cele din urmă, fă clic pe linkul `Caches` din navigarea din stânga. Poți face acest lucru și din partea de sus (nu este nevoie să te duci în `Actions`) pentru a vedea toate cache-urile dintr-un depozit.

![A picture of the button](images/15-cache-view.png)


## 3. Fuzionează modificările în ramura ta **implicită** și actualizează-ți repozitoriul local

1. Fă clic pe butonul verde `Merge pull request` din cererea de extragere din pasul 1.9. Acest lucru va pune codul tău în ramura principală.
2. Șterge ramura publicată creată în [Pasul 1](#step-1-add-the-cache-action).
3. Checkout pe ramura ta implicită local și trage modificările.

---

## Documetație suplimentară
- [GitHub Actions Caching](https://github.com/actions/cache)