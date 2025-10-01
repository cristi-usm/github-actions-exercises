# Strategia de Matrice pentru Workflow-uri

Definirea unei strategii de matrice intr-un workflow permite scalarea executiei job-urilor pe baza variabilelor definite de tine. Acest lucru este extrem de util pentru repetarea aceluiasi job, dar cu valori usor diferite, cum ar fi atunci cand trebuie sa testezi software-ul impotriva diferitelor versiuni ale unui limbaj sau sa construiesti software-ul impotriva mai multor sisteme de operare.

## 1. Creeaza un workflow de matrice pentru a scala pe diferite runnere

In primul rand, vom vedea un workflow de matrice care se scaleaza unidimensional prin crearea unei variabile `matrix` numita `os`.

1. Din ramura **main** a repozitoriului tau, creeaza o noua ramura de cod numita `feature/matrix`
2. Creeaza un nou fisier numit `.github/workflows/matrix.yaml`
3. Copiaza continutul de mai jos in fisierul nou creat:

```yaml
name: Matrix Strategy
on:
  push:
    branches: feature/matrix
jobs:
  do-things:
    name: Do Things In A Matrix - ${{ matrix.os }}
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [macos-latest, ubuntu-latest, windows-latest]
    steps:
      - name: The Thing I've Done - ${{ matrix.os }}
        run: echo "I've done a thing on ${{ matrix.os }}!"
```

4. Adauga & comite schimbarile, apoi publica ramura.
5. Mergi la repozitoriul tau, si vizualizeaza tab-ul Actions pentru a vedea executia impotriva ramurii tale publicate.

Rezultatul va fi o executie a nu doar unui job, ci trei. Strategia a definit o variabila cu trei valori (matrix.os) care au fost apoi folosite pentru a scala. Pentru fiecare valoare de variabila pe care o adaugi, numarul de job-uri creste.

## 2. Scaleaza si mai mult strategia de matrice

Acum vom adauga o alta variabila `matrix` numita `node-version` si o vom folosi pentru a scala si mai mult.

1. Inlocuieste continutul fisierului de workflow din pasul anterior:

```yaml
name: Matrix Strategy
on:
  push:
    branches: feature/matrix
jobs:
  do-things:
    name: Do Things In A Matrix - ${{ matrix.os }}, ${{ matrix.node-version }}
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [macos-13, ubuntu-latest, windows-latest]
        node-version: [10.x, 12.x, 14.x, 15.x]
    steps:
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
```

4. Adauga & comite schimbarile, apoi publica ramura.
5. Mergi la repozitoriul tau, si vizualizeaza tab-ul Actions pentru a vedea executia.

Rezultatul va fi doisprezece job-uri concurente care ruleaza pe diferitele runner-e si seteaza versiunile corespunzatoare de node.

## Pasul 3: Curatare
1. Sterge ramura publicata creata in [Pasul 1](#step-1-create-a-matrix-workflow-to-scale-across-runners)
2. Switch back to the default branch locally.