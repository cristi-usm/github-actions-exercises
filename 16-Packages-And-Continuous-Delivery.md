# Packages
GitHub are o caracteristică încorporată pentru registrele de pachete numită "Packages". Suportă diverse registre precum `npm`, `mvn`, `Docker` și altele (vezi [documentația](https://docs.github.com/en/packages/learn-github-packages/introduction-to-github-packages) pentru lista completă).

> **Notă**: Există și un exemplu Golang disponibil în directorul `golang_app` dacă preferi să lucrezi cu Go.

## 1. Adaugă jobul de livrare continuă care creează pachetul
1. Din ramura **implicită** a repozitoriului tău, creează o nouă ramură de cod numită `feature/packages`
2. Deschide fișierul numit `.github/workflows/ci-cd.yaml`
3. Înlocuiește conținutul fișierului cu:

### Varianta Node.js:

```yaml
name: Continuous Integration & Delivery
on:
  pull_request:
  workflow_dispatch:
  push:
    branches: main
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
  cd:
    name: Continuous Delivery
    needs: ci
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: docker_image
    steps:
      - name: Clone
        uses: actions/checkout@v3.1.0
      - name: Get Artifact
        uses: actions/download-artifact@v3.0.0
        with:
          name: nodejs_app
          path: docker_image/app
      - name: Log In To Package Registry
        run: echo "${{secrets.GITHUB_TOKEN}}" | docker login ghcr.io -u $ --password-stdin
      - name: Build & Push
        run: |
          IMAGE_ID=ghcr.io/${{ github.repository_owner }}/${{ github.event.repository.name }}
          IMAGE_ID=$(echo $IMAGE_ID | tr '[A-Z]' '[a-z]')
          VERSION=$(echo "${{github.ref}}" | sed -e 's,.*/\(.*\),\1,')
          [ "$VERSION" == "main" ] && VERSION=latest
          docker build . --tag $IMAGE_ID:$VERSION --label "runnumber=${{github.run_id}}" --file Dockerfile
          docker push $IMAGE_ID:$VERSION
```

### Varianta Golang:

<details>
<summary>Click pentru a vedea exemplul Golang</summary>

```yaml
name: Continuous Integration & Delivery
on:
  pull_request:
  workflow_dispatch:
  push:
    branches: main
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
  cd:
    name: Continuous Delivery
    needs: ci
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: docker_image
    steps:
      - name: Clone
        uses: actions/checkout@v3.1.0
      - name: Get Artifact
        uses: actions/download-artifact@v3.0.0
        with:
          name: golang_app
          path: docker_image
      - name: Log In To Package Registry
        run: echo "${{secrets.GITHUB_TOKEN}}" | docker login ghcr.io -u $ --password-stdin
      - name: Build & Push
        run: |
          IMAGE_ID=ghcr.io/${{ github.repository_owner }}/${{ github.event.repository.name }}
          IMAGE_ID=$(echo $IMAGE_ID | tr '[A-Z]' '[a-z]')
          VERSION=$(echo "${{github.ref}}" | sed -e 's,.*/\(.*\),\1,')
          [ "$VERSION" == "main" ] && VERSION=latest
          docker build . --tag $IMAGE_ID:$VERSION --label "runnumber=${{github.run_id}}" --file Dockerfile
          docker push $IMAGE_ID:$VERSION
```

</details>

4. Adaugă și comite modificările tale, apoi împinge ramura ta.
5. Mergi la depozitul tău și vizualizează fila `Pull Requests`.
6. Deschide o cerere de extragere pentru a fuziona `feature/packages` în ramura ta **implicită**.

Rezultatul va fi un artefact creat (aplicația Node.js/Golang) așa cum am experimentat anterior, iar o imagine Docker suplimentară va fi încărcată în registrul de pachete.

7. Mergi la fila `Code` din depozitul tău și fă clic pe linkul `Packages` din navigarea din dreapta.

Acum ai o imagine Docker complet implementabilă, gata să fie rulată ca un container pe orice platformă de orchestrare sau să fie utilizată ca referință `FROM` într-un alt Dockerfile.


## 2. Fuzionează modificările în ramura ta **implicită** și actualizează-ți repozitoriul local

1. Fă clic pe butonul verde `Merge pull request` din cererea de extragere din pasul 1.5. Acest lucru va pune codul tău în ramura principală.
2. Șterge ramura publicată creată în [Pasul 1](#step-1).
3. Checkout pe ramura ta implicită local și trage modificările.