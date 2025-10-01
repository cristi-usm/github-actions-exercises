#  Workflow-uri Reutilizabile

În exercițiul anterior [09-Manual-Workflow.md](./09-Manual-Workflow.md), ai creat un workflow care putea fi declanșat manual.

În acest exercițiu, vom modifica același workflow pentru a fi apelat de alte workflow-uri. Acest model poate fi utilizat cu workflow-uri din repozitorii publice sau interne pentru a crea un set centralizat de workflow-uri. Acest lucru poate reduce configurația workflow-ului în întreaga organizație, economisind timp și efort.

## 1. Modifică workflow-ul manual și adaugă modificările

1. Treci la ramura **main** a repozitoriului tău 
2. Deschide fișierul numit `.github/workflows/manual.yaml` (dacă nu ai acest fișier, urmează instrucțiunile din [09-Manual-Workflow.md](./09-Manual-Workflow.md))
3. Înlocuiește conținutul fișierului cu:

```yaml
name: Manual & Shared Workflow
on:
  workflow_dispatch:
    inputs:
      choice-example:
        description: Choice Example
        required: true
        default: warning
        type: choice
        options:
        - info
        - warning
        - debug
      string-example:
        description: String Example
        required: true
        default: input
        type: string
  workflow_call:
    inputs:
      choice-example:
        description: Choice Example
        required: true
        default: warning
        type: string
      string-example:
        description: String Example
        required: true
        default: input
        type: string
jobs:
  do-things:
    name: Do Things Manually
    runs-on: ubuntu-latest
    steps:
      - name: Do A Thing
        run: echo "I've done a thing manually with '${{ inputs.choice-example }}' and '${{ inputs.string-example }}'!"
```

*Observați că inputul `choice-example` nu poate fi de tip `choice` pentru `workflow_call`.*

4. Adaugă, commit și împinge modificările tale către ramura implicită.
5. Mergi la depozitul tău și vizualizează fila Acțiuni pentru a vedea workflow-ul pe care l-ai creat (`Manual & Shared Workflow`)

Rezultatul va fi un workflow care poate fi declanșat manual sau apelat de alte workflow-uri.

## 2. Adaugă un nou workflow care folosește workflow-ul `Manual & Shared`

1. Treci la ramura **main** a repozitoriului depozitului tău
2. Creează un nou fișier numit `.github/workflows/shared.yaml`
3. Înlocuiește conținutul fișierului cu:

```yaml
name: Using Shared Workflow
on:
  push:
    branches: main
jobs:
  centralized-job:
    uses: ./.github/workflows/manual.yaml
    with:
      choice-example: debug
      string-example: a thing
```
4. Adaugă, commit-e și împinge modificările tale către ramura implicită. 
5. Mergi la depozitul tău și vizualizează fila Acțiuni pentru a vedea workflow-ul pe care l-ai creat (`Manual & Shared Workflow`)

Rezultatul va fi o execuție a workflow-ului `Manual & Shared Workflow`, care va afișa valorile transmise din opțiunea `with`.

## 3. Curățare
Nu sunt necesari pași suplimentari, deoarece ai făcut commit direct pe ramura implicită.

## Notițe
- Atunci când folosești un workflow partajat dintr-un depozit **public** sau **intern**, sintaxa va fi ușor diferită:
  - Pentru un depozit public: `uses: <owner>/<repo>/<path-to-workflow>@<release-tag>`
  - Pentru un depozit privat: `uses: <owner>/<repo>/<path-to-workflow>@<release-tag>`
- Workflow-ul partajat dintr-un depozit **privat** trebuie să fie aiba setările corespunzătoare ale depozitului (vezi [instrucțiunile aici](https://docs.github.com/en/enterprise-cloud@latest/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository#allowing-access-to-components-in-an-internal-repository))