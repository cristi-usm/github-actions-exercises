# Medii (Environments) & Deployment Continu
Medii (environments) merg mana in mana cu livrarea continua si iti permit sa adaugi gate-uri si suprascrieri de secrete pentru a controla cum si cand are loc livrarea.

In acest exercitiu, vei adauga un pipeline de `Continuous Deployment` care se va desfasura odata ce `Continuous Integration & Delivery` se finalizeaza pentru ramura **implicită** (in exemple, `main`). In plus, vei configura un mediu pentru a vedea functionalitatea de gating.

## 1. Creeaza pipeline-ul de livrare continua
1. Din ramura **implicită** a repozitoriului tău, creează o nouă ramură de cod numită `feature/deployment`
2. Creează un nou fișier numit `.github/workflows/cd.yaml`
3. Copiază conținutul de mai jos în fișierul nou creat:

```yaml
name: Continuous Deployment
on:
  workflow_dispatch:
  workflow_run:
    workflows: [Continuous Integration & Delivery]
    branches: [main]
    types:
      - completed
defaults:
  run:
    shell: bash
env:
  IMAGE_ID: ghcr.io/${{ github.repository_owner }}/${{ github.event.repository. name }}
jobs:
  deploy:
    name: Deploy Docker Image
    runs-on: ubuntu-latest
    steps:
      # A real example would have deployment steps for a container, like kubectl commands (for Kubernetes)
      - name: Log In To Package Registry
        run: echo "${{secrets.GITHUB_TOKEN}}" | docker login ghcr.io -u $ --password-stdin
      - name: Pull Down The Image
        run: docker pull $(echo $IMAGE_ID | tr '[A-Z]' '[a-z]'):latest
      - name: Run The Container
        run: docker run $(echo $IMAGE_ID | tr '[A-Z]' '[a-z]'):latest
```

4. Adaugă și comite modificările tale, apoi publică ramura ta.
5. Mergi la depozitul tău și deschide o cerere de extragere pentru a fuziona `feature/deployment` în ramura ta **implicită**.
6. Fă clic pe butonul verde `Merge pull request` din cererea de extragere din pasul 1.5. Acest lucru va pune codul tău în ramura principală.
7. Mergi la fila `Actions` pentru a vedea execuțiile fluxului de lucru.

Rezultatul va fi execuția fluxului de lucru `Continuous Integration & Delivery`. Odată ce acesta se finalizează, fluxul de lucru `Continuous Deployment` se va executa automat. Fluxul de lucru nu face o implementare reală și pur și simplu rulează containerul în sine, dar ai înlocui acești pași cu comenzi reale de orchestrare a containerelor.

## 2. Adaugă un mediu și configurează
1. Folosind [documentația oficială](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment#creating-an-environment):
   1. configurează un mediu numit `production` (sensibil la majuscule)
   2. Adaugă-te ca revizor obligatoriu (asigură-te că salvezi regulile).
   3. Limitează ramurile de livrare la `ramuri selectate` și adaugă ramura ta **implicită** (în exemplele de mai sus, `main`) ca singura ramură permisă.
2. Din ramura **implicită** a repozitoriului tău, creează o nouă ramură de cod numită `feature/environment`
3. Înlocuiește conținutul fișierului `.github/workflows/cd.yaml` cu:

```yaml
name: Continuous Deployment
on:
  workflow_dispatch:
  workflow_run:
    workflows: [Continuous Integration & Delivery]
    branches: [main]
    types:
      - completed
defaults:
  run:
    shell: bash
env:
  IMAGE_ID: ghcr.io/${{ github.repository_owner }}/${{ github.event.repository. name }}
jobs:
  deploy:
    name: Deploy Docker Image
    environment: production
    runs-on: ubuntu-latest
    steps:
      # A real example would have deployment steps for a container, like kubectl commands (for Kubernetes)
      - name: Log In To Package Registry
        run: echo "${{secrets.GITHUB_TOKEN}}" | docker login ghcr.io -u $ --password-stdin
      - name: Pull Down The Image
        run: docker pull $(echo $IMAGE_ID | tr '[A-Z]' '[a-z]'):latest
      - name: Run The Container
        run: docker run $(echo $IMAGE_ID | tr '[A-Z]' '[a-z]'):latest
```

Singura diferență reală aici este adăugarea liniei `environment: production` la job-ul din workflow.

4. Adaugă și comite modificările tale, apoi publică ramura ta.
5. Mergi la depozitul tău și deschide o cerere de extragere pentru a fuziona `feature/environment` în ramura ta **implicită**.
6. Fă clic pe butonul verde `Merge pull request` din cererea de extragere din pasul 1.5. Acest lucru va pune codul tău în ramura principală.
7. Mergi la fila `Actions` pentru a vedea execuțiile fluxului de lucru.

Rezultatul va fi același ca înainte (fluxul de lucru `Continuous Integration & Delivery` se execută), cu excepția faptului că de data aceasta `Continuous Delivery` va avea un status `waiting` care va necesita o aprobată înainte de a rula.

## 3. Aprobați livrarea
1. Din fila `Actions` din repo-ul tău, vizualizează execuția fluxului de lucru `Continuous Delivery` care așteaptă.
2. Vei vedea un banner galben cu un buton `Review deployments`. Fă clic pe acesta, bifează caseta pentru mediu (`production`) și apoi fă clic pe `Approve and deploy`.

Rezultatul va fi execuția completă a fluxului de lucru `Continuous Delivery`, la fel ca înainte.

## 4. Vizualizați GUI-ul mediilor
1. Navigați la fila `Code` din depozitul dumneavoastră
2. În partea dreaptă, secțiunea `Environments` va avea acum `production` listat, cu statusul său curent.
3. Faceți clic pe mediu `production` pentru a vedea istoricul.

## Pasul 5: Curățați
2. Ștergeți ramura publicată creată în [Pasul 1](#step-1-create-the-continuous-deployment-pipeline)
2. Comutați înapoi la ramura implicită local.