# Grupe Concurente

In mod implicit, toate workflow-urile functioneaza cu un anumit nivel de concurenta definit. Grupele de concurenta iti permit sa definesti si mai departe concurenta intre workflow-uri sau job-uri. Acest lucru iti va permite sa faci intregi workflow-uri sa astepte finalizarea altor workflow-uri, sau sa anuleze executiile anterioare in asteptare.

## 1. Creeaza doua workflow-uri care asculta pentru aceleasi evenimente cu concurenta definita

1. Din ramura **main** a repozitoriului tau, creeaza o noua ramura de cod numita `feature/concurrency`
2. Creeaza un nou fisier numit `.github/workflows/concurrency.yaml`
3. Copiaza continutul de mai jos in fisierul nou creat:

```yaml
name: Concurrent Workflows
on:
  push:
    branches: feature/concurrency
jobs:
  do-things:
    name: Do Things With Concurrency
    runs-on: ubuntu-latest
    concurrency: 
      group: static-group
    steps:
      - name: The Thing I've Done
        run: echo "I've done a thing!"; sleep 15;
```

4. Suplimentar, creeaza un alt fisier numit `.github/workflows/concurrency-2.yaml`
5. Copiaza continutul de mai jos in al doilea fisier nou creat:

```yaml
name: Concurrent Workflows No. 2
on:
  push:
    branches: feature/concurrency
jobs:
  do-things:
    name: Do Other Things With Concurrency
    runs-on: ubuntu-latest
    concurrency: 
      group: static-group
    steps:
      - name: The Other Thing I've Done
        run: echo "I've done another thing!"; sleep 15;
```

6. Adauga & comite schimbarile, apoi publica ramura.
7. Mergi la repozitoriul tau, si vizualizeaza tab-ul Actions pentru a vedea executia impotriva ramurii tale publicate.

Rezultatul va fi o executie a workflow-ului ori de cate ori sunt trimise modificari catre ramura `feature/concurrency`, dar al doilea workflow (oricare dintre ele este preluat al doilea) va astepta finalizarea primului inainte de a permite executia.

Aceasta nu este o situatie de utilizare din lumea reala, dar demonstreaza aplicarea concurentei intre workflow-uri. Executiile suplimentare ale unui workflow din cauza evenimentelor suplimentare care sunt trimise deja actioneaza in acest fel (citeste: mai multe commit-uri trimise), dar daca trebuie sa aplici acest lucru si intre alte workflow-uri, aceasta este modalitatea de a realiza acest lucru.

## Pasul 2: Adauga anularea la workflow-uri

1. Modifica fisierul de workflow `.github/workflows/concurrency.yaml` cu urmatorul continut:

```yaml
name: Concurrency Group
on:
  push:
    branches: feature/concurrency
jobs:
  do-things:
    name: Do Things With Concurrency
    runs-on: ubuntu-latest
    concurrency: 
      group: static-group
      cancel-in-progress: true
    steps:
      - name: The Thing I've Done
        run: echo "I've done a thing!"; sleep 15;
```

2. Modifica fisierul de workflow `.github/workflows/concurrency-2.yaml` cu urmatorul continut:

```yaml
name: Concurrency Group No. 2
on:
  push:
    branches: feature/concurrency
jobs:
  do-things:
    name: Do Other Things With Concurrency
    runs-on: ubuntu-latest
    concurrency: 
      group: static-group
      cancel-in-progress: true
    steps:
      - name: The Other Thing I've Done
        run: echo "I've done another thing!"; sleep 15;
```

3. Adauga & comite schimbarile, apoi publica ramura.

Rezultatul va fi ca o executie a workflow-ului (oricare este declansata prima) va fi anulata atunci cand a doua este in asteptare, deoarece se afla in aceeasi grupa de concurenta.

## Pasul 3: Curatare
1. Sterge ramura publicata creata in [Pasul 1](#step-1-create-two-workflows-listening-for-the-same-events-with-concurrency-defined)
2. Comuta inapoi la ramura implicita local.