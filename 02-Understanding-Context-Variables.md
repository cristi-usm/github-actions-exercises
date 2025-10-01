# 2 - Variabile de Context
Toate workflow-urile au acces la informatii de context in timpul rularii.

## 1. Creaza un nou workflow pentru a vedea diferite contexte

Mai intai, sa aruncam o privire asupra tuturor obiectelor de context disponibile in runner. Vom face acest lucru prin conversia obiectelor in JSON si stocarea acestora intr-o variabila de mediu in fiecare pas. In cele din urma, vom iesi afisa acea variabila de mediu cu o simpla instructiune `echo`.

1. Din ramura **main** a repozitoriului tau, creeaza o noua ramura de cod numita `feature/context`
2. Creeaza un nou fisier numit `.github/workflows/context.yaml`
3. Copiaza continutul de mai jos in fisierul nou creat:

```yaml
name: Context Information
on:
  push:
    branches-ignore: main
jobs:
  show-context:
    name: Show Context
    runs-on: ubuntu-latest
    steps:
      - name: Dump Event Information
        env:
          CONTEXT_ITEM: ${{ toJson(github) }}
        run: echo "${CONTEXT_ITEM}"
      - name: Dump Job Information
        env:
          CONTEXT_ITEM: ${{ toJson(job) }}
        run: echo "${CONTEXT_ITEM}"
      - name: Dump Runner Information
        env:
          CONTEXT_ITEM: ${{ toJson(runner) }}
        run: echo "${CONTEXT_ITEM}"
      - name: Dump Step Information
        env:
          CONTEXT_ITEM: ${{ toJson(steps) }}
        run: echo "${CONTEXT_ITEM}"
```
4. Adauga si comite schimbarile, apoi publica ramura.
5. Mergi la repozitoriul tau, si acceseaza tab-ul Actions pentru a vedea executia impotriva ramurii tale publicate.

Rezultatul va fi o executie a workflow-ului ori de cate ori se fac push-uri cu exceptia (EXCEPT) cand au loc pe ramura `main`. Informatiile de context sunt vizibile in output astfel incat sa poti intelege cum sa utilizezi acele valori in workflow-urile tale.

## 2. Actualizeaza workflow-ul cu output-ul din `steps`

Anterior, am vazut toate datele disponibile in diferitele obiecte de context, dar variabila de context `steps` era goala. Aici, vom invata cum sa populam variabila de context `steps`, astfel incat sa putem transmite date catre pasii urmatori. De asemenea, vom omite intentionat o setare necesara pentru a finaliza acest pas, deoarece poate fi o greseala comuna.

1. Inlocuieste continutul fisierului workflow din pasul anterior:

```yaml
name: Context Information
on:
  push:
    branches-ignore: main
jobs:
  show-context:
    name: Show Context
    runs-on: ubuntu-latest
    steps:
      - name: Provide Some Step Outputs
        run: echo "TRUE_STATEMENT=Possums are terrible." >> $GITHUB_OUTPUT
      - name: Dump Step Information
        env:
          CONTEXT_ITEM: ${{ toJson(steps) }}
        run: echo "${CONTEXT_ITEM}"
```
4. Adauga si comite schimbarile, apoi publica ramura.
5. Mergi la repozitoriul tau, si acceseaza tab-ul Actions pentru a vedea executia.

Rezultatul va fi ca `steps` este inca gol.

## 3. Actualizeaza workflow-ul cu un `id` pentru `steps`
In cele din urma, pentru a finaliza ceea ce am invatat in Pasul 2, vom aplica proprietatea necesara `id` astfel incat sa putem transmite date intre pasi.

1. Urmeaza acelasi proces ca in etapa anterioara, dar foloseste acest continut:

```yaml
name: Context Information
on:
  push:
    branches-ignore: main
jobs:
  show-context:
    name: Show Context
    runs-on: ubuntu-latest
    steps:
      - name: Provide Some Step Outputs
        id: step-outputs
        run: echo "TRUE_STATEMENT=Possums are terrible." >> $GITHUB_OUTPUT
      - name: Dump Step Information
        env:
          CONTEXT_ITEM: ${{ toJson(steps) }}
        run: echo "${CONTEXT_ITEM}"
```

Rezultatul va fi ca `steps` acum are datele de la pasul anterior.

## 4. Adauga o a doua variabila de output
Este posibil sa transmiti mai multe valori intr-un singur pas.

1. Urmeaza acelasi proces ca in Pasul 3, dar foloseste acest continut:

```yaml
name: Context Information
on:
  push:
    branches-ignore: main
jobs:
  show-context:
    name: Show Context
    runs-on: ubuntu-latest
    steps:
      - name: Provide Some Step Outputs
        id: step-outputs
        run: |
          echo "TRUE_STATEMENT=Possums are terrible." >> $GITHUB_OUTPUT
          echo "FALSE_STATEMENT=Possums are great." >> $GITHUB_OUTPUT
      - name: Dump Step Information
        env:
          CONTEXT_ITEM: ${{ toJson(steps) }}
        run: echo "${CONTEXT_ITEM}"
```

Rezultatul va fi ca `steps` context are acum si mai multe date decat pasul anterior.

## 5. Curatare

1. Sterge ramura publicata creata in [Pasul 1](#pasul-1-create-a-new-workflow-to-see-different-contexts)
2. Comuta inapoi la ramura implicita local.
