# Artefacte

GitHub oferă funcționalitatea de artefacte încorporată pentru salvarea și reutilizarea artefactelor între joburi. Aceste artefacte pot fi descrise pur și simplu ca un fel de output dintr-un proces de build. Acesta ar putea fi un binar, fișiere de suport sau practic orice vrei să transmiți de la un job la altul.

Exercițiul de mai jos te va ghida prin actualizarea workflow-ului `Continuous Integration` creat anterior (vezi [13-Continuous-Integration](./13-Continuous-Integration.md)) cu acțiunea de artefacte care va gestiona salvarea artefactului creat din procesul nostru de build. Ulterior, vom folosi acest lucru pentru a livra continuu o imagine Docker cu artefactul nostru (vezi [16-Packages](./16-Packages.md)).

## 1. Adaugă acțiunea de salvare a artefactului
Prin adăugarea acțiunii publice `actions/upload-artifact` la workflow-ul nostru `Continuous Integration`, avem o modalitate ușor de utilizat pentru a lucra cu API-ul Artefactelor.

1. Din ramura **main** a repozitoriului tău, creează o nouă ramură de cod numită `feature/artifacts`
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

1. Adaugă și comite modificările tale, apoi fa push ramurii tale.
2. Mergi la repozitorul tău și vizualizează pagina `Pull Requests`.
3. Deschide un PR pentru a merge-ui `feature/artifacts` în ramura ta **main**.
4. Fă click pe linkul `Show All Checks` de pe verificările de stare din PR-uri, apoi fă click pe linkul `Details` de lângă `Continuous Integration`.

![status checks successful](./images/14-status-checks.png)

8. Fă clic pe linkul `Summary` din navigarea din stânga.

![link to summary](./images/14-summary-link.png)

Rezultatul va fi un artefact pe care utilizatorii autentificați îl pot descărca. În plus, acest artefact poate fi utilizat în desfășurare sau în alte automatizări folosind acțiunea `actions/artifact-download`.

Este important de menționat că retenția artefactelor este valabilă doar atât timp cât este [configurată](https://docs.github.com/en/organizations/managing-organization-settings/configuring-the-retention-period-for-github-actions-artifacts-and-logs-in-your-organization) pentru organizația sau întreprinderea ta.

![artifacts on build dashboard](./images/14-artifacts.png)

## 2. Merge la modificări în ramura ta **main** și actualizează-ți repozitoriul local

1. Fă clic pe butonul verde `Merge pull request` din cererea de extragere de la pasul 1.6. Acest lucru va pune codul tău în ramura principală.
2. Șterge ramura publicată creată în [Pasul 1](#step-1-add-the-artifact-save-action)
3. Treci la ramura **implicită** a repozitoriului tău local și execută `git pull` pentru a-ți actualiza depozitul local.