# Job-uri Dependente

Job-urile, in mod implicit, ruleaza in paralel. Acest lucru permite executarea mai multor sarcini in acelasi timp. In plus, job-urile pot fi legate in serie folosind proprietatea `needs`.

## 1. Creeaza job-uri paralele separate

In primul rand, vom crea doua job-uri independente unul de celalalt (care ruleaza in paralel).

1. Din ramura **main** a repozitoriului tau, creeaza o noua ramura de cod numita `feature/dependent`
2. Creeaza un nou fisier numit `.github/workflows/dependent.yaml`
3. Copiaza continutul de mai jos in fisierul nou creat:

```yaml
name: Dependent Jobs
on:
  push:
    branches: feature/dependent
jobs:
  first-job:
    name: First Job
    runs-on: ubuntu-latest
    steps:
      - name: Dump Job Information
        env:
          CONTEXT_ITEM: ${{ toJson(job) }}
        run: echo "${CONTEXT_ITEM}"
  second-job:
    name: Second Job
    runs-on: ubuntu-latest
    steps:
      - name: Dump Job Information
        env:
          CONTEXT_ITEM: ${{ toJson(job) }}
        run: echo "${CONTEXT_ITEM}"
```

4. Adauga & comite schimbarile, apoi publica ramura.
5. Mergi la repozitoriul tau, si vizualizeaza tab-ul Actions pentru a vedea executia impotriva ramurii tale publicate.

Rezultatul va fi o executie care are doua job-uri care s-au executat in acelasi timp. Graficul de executie arata ca job-urile sunt separate.

## 2. Modifica workflow-ul pentru a face job-uri specifice folosind "needs"

In al doilea rand, vom ajusta workflow-ul nostru pentru a avea doua job-uri in serie, si un al treilea in paralel.

1. Inlocuieste continutul fisierului de workflow din pasul anterior:

```yaml
name: Dependent Jobs
on:
  push:
    branches: feature/dependent
jobs:
  first-job:
    name: First Job (parallel)
    runs-on: ubuntu-latest
    steps:
      - name: Dump Job Information
        env:
          CONTEXT_ITEM: ${{ toJson(job) }}
        run: echo "${CONTEXT_ITEM}"
  second-job:
    name: Second Job (series)
    runs-on: ubuntu-latest
    needs: first-job
    steps:
      - name: Dump Job Information
        env:
          CONTEXT_ITEM: ${{ toJson(job) }}
        run: echo "${CONTEXT_ITEM}"
  third-job:
    name: Third Job (parallel)
    runs-on: ubuntu-latest
    steps:
      - name: Dump Job Information
        env:
          CONTEXT_ITEM: ${{ toJson(job) }}
        run: echo "${CONTEXT_ITEM}"

```

4. Adauga & comite schimbarile, apoi publica ramura.
5. Mergi la repozitoriul tau, si vizualizeaza tab-ul Actions pentru a vedea executia impotriva ramurii tale publicate.

Rezultatul va fi `second-job` asteptand finalizarea `first-job`, in timp ce `third-job` ruleaza in paralel.

## 3. Curatare
1. Sterge ramura publicata creata in Pasul 1.
2. Comuta inapoi la ramura implicita local.