# Job Implicite

Optiunile implicite exista pentru job-uri si pasi in cadrul unui workflow. In prezent, poti defini `shell` si `working-directory`.


## Compatibilitatea Curenta de Shell-uri 

|OS|Shell|Default|
|---|---|---|
|Windows, Linux|pwsh|Windows|
|Windows, Linux|python|
|Windows, Linux|bash|Linux|
|Linux, macOS|sh|macOS|
|Windows|cmd|
|Windows|PowerShell|


## 1. Manual atribuie `shell` & `working-directory` la diferiti pasi
Vom incepe prin a crea un workflow care seteaza o serie de valori `shell` si `working-directory` pentru fiecare pas, si apoi vom ajusta pentru a reduce aceste valori.

_Notă: Primul pas trebuie să creeze un director sursă astfel încât pașii ulteriori să poată să-l folosească. În mod implicit, nu clonăm repository-ul, așa că am ales manual să creez un director (folosind: `mkdir src`) pentru a demonstra._

1. Din ramura **default** a repozitoriului tau, creeaza o noua ramura de cod numita `feature/defaults`
2. Creeaza un nou fisier numit `.github/workflows/defaults.yaml`
3. Copiaza continutul de mai jos in fisierul nou creat:

```yaml
name: Using Defaults
on:
  push:
    branches: feature/defaults
jobs:
  first-job:
    name: First Job
    runs-on: ubuntu-latest
    steps:
      - name: Create Source Directory
        run: mkdir src
        shell: bash
      - name: Use Python
        run: import os; print("I'm running python! Hissssss! " + os.getcwd());
        shell: python
        working-directory: src
      - name: Use Bash
        run: echo "I'm running hum-drum bash in $(pwd). Booo."
        shell: bash
        working-directory: src
      - name: Use Bash Also
        run: echo "I'm running bash also, but elsewhere in $(pwd). Booo."
        shell: bash
  second-job:
    name: Second Job
    runs-on: ubuntu-latest
    steps:
      - name: Create Source Directory
        run: mkdir src
        shell: bash
      - name: Use Bash
        run: echo "I'm running bash in $(pwd). So sad."
        shell: bash
        working-directory: src
```

4. Adauga & comite schimbarile, apoi publica ramura.
5. Mergi la repozitoriul tau, si vizualizeaza tab-ul Actions pentru a vedea executia impotriva ramurii tale publicate.

Rezultatul va fi o executie care utilizeaza bash pentru majoritatea pasilor din cadrul job-urilor.

## 2. Utilizarea valorilor implicite la nivel de job
Acum vom vedea cum `jobs` pot avea `defaults`.

1. Inlocuieste continutul fisierului de workflow din pasul anterior:

```yaml
name: Using Defaults
on:
  push:
    branches: feature/defaults
jobs:
  first-job:
    name: First Job
    runs-on: ubuntu-latest
    defaults:
      run:
        shell: bash
        working-directory: src
    steps:
      - name: Create Source Directory
        run: mkdir src
        working-directory: .
      - name: Use Python
        run: import os; print("I'm running python! Hissssss! " + os.getcwd())
        shell: python
      - name: Use Bash
        run: echo "I'm running hum-drum bash in $(pwd). Booo."
      - name: Use Bash Also
        run: echo "I'm running bash also, but elsewhere in $(pwd). Booo."
        working-directory: ..
  second-job:
    name: Second Job
    runs-on: ubuntu-latest
    steps:
      - name: Create Source Directory
        run: mkdir src
        shell: bash
        working-directory: .
      - name: Use Bash
        run: echo "I'm running bash in $(pwd). So sad."
        shell: bash
        working-directory: src
```

4. Adauga & comite schimbarile, apoi publica ramura.
5. Mergi la repozitoriul tau, si vizualizeaza tab-ul Actions pentru a vedea executia impotriva ramurii tale publicate.

Rezultatul va fi mai putin cod in workflow-ul tau, in timp ce executia a fost inca la fel. A folosit `bash` ca `shell` implicit si a oferit un director de lucru implicit `src`

## 3. Utilizarea valorilor implicite la nivel de workflow
In cele din urma, vom vedea cum intregul workflow are `defaults`.

1. Urmeaza aceeasi procedura ca in pasul 2, dar foloseste acest continut:

```yaml
name: Job Default
on:
  push:
    branches: feature/defaults
defaults:
  run:
    shell: bash
    working-directory: src
jobs:
  first-job:
    name: First Job
    runs-on: ubuntu-latest
    steps:
      - name: Create Source Directory
        run: mkdir src
        working-directory: .
      - name: Use Python
        run: import os; print("I'm running python! Hissssss! " + os.getcwd())
        shell: python
      - name: Use Bash
        run: echo "I'm running hum-drum bash in $(pwd). Booo."
      - name: Use Bash Also
        run: echo "I'm running bash also, but elsewhere in $(pwd). Booo."
        working-directory: ..
  second-job:
    name: Second Job
    runs-on: ubuntu-latest
    steps:
      - name: Create Source Directory
        run: mkdir src
        working-directory: .
      - name: Use Bash
        run: echo "I'm running bash in $(pwd). So sad."
```

Rezultatul va fi si mai putin cod, facand `bash` shell-ul implicit si `src` directorul de lucru pentru toate pasii job-urilor.

## 4. Curatare

1. Sterge ramura publicata creata in [Pasul 1](#step-1-manually-assign-shell--working-directory-to-different-steps)
2. Comuta inapoi la ramura implicita local.
