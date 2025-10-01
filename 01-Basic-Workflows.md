# 1 - Workflow de Baza

Aceasta sarcina te va ghida prin configurarea unui workflow in repozitoriul curent care asculta pentru evenimente de tip push in repozitoriu. Workflow-ul consuma actiuni si sunt inima utilizarii Actions in repozitoriul tau.

**GitHub Actions** ruleaza pe baza fisierelor de workflow care sunt gestionate si intretinute in repozitoriul tau. Poti vedea executiile workflow-urilor si istoricul job-urilor din tab-ul Actions a repozitoriului tau. In plus, poti vedea starea acelor executii (reusite, esuate, in curs de desfasurare).

Stergerea unui workflow din repozitoriul tau nu ii sterge istoricul. Log-urile sunt pastrate in functie de setarile din cadrul intreprinderii si organizatiei tale.

## 1. Crearea unui workflow de baza

1. Din ramura **main** a repozitoriului tau, creeaza o noua ramura de cod numita `feature/basic-workflow`
2. Creeaza un nou fisier numit `.github/workflows/basic-workflow.yaml`
3. Copiaza continutul de mai jos in fisierul nou creat:

```yaml
name: Basic Workflow
on:
  push:
    branches: feature/basic-workflow
jobs:
  say-hello:
    name: Say Hello
    runs-on: ubuntu-latest
    steps:
      - name: Greet the World
        run: echo "Hello, World!"
```

4. Salveaza fisierul.
5. In terminalul tau, asigura-te ca esti in ramura `feature/basic-workflow`.
6. Adauga si comite schimbarile, apoi publica ramura.
7. Mergi la repozitoriul tau si acceseaza tab-ul Actions pentru a vedea workflow-ul in curs de desfasurare.

Rezultatul va fi o executie a workflow-ului ori de cate ori se fac push-uri in ramura `feature/basic-workflow`. Rezultatele vor fi o executie reusita a job-ului `say-hello` cu un singur pas executat.

In acest exemplu, proprietatea `run` este folosita pentru a executa o comanda CLI simpla. In cazul nostru, folosim Linux (ubuntu) si, prin urmare, scriem comenzi bash.

## 2. Simulam un esec al workflow-ului
In continuare, vom actualiza in mod intentionat un workflow pentru a-l face sa esueze, astfel incat sa putem simula ceea ce te-ai astepta sa vezi daca ceva ar merge prost.

1. Actualizeaza fisierul workflow creat cu continutul de mai jos:

```yaml
name: Basic Workflow
on:
  push:
    branches: feature/basic-workflow
jobs:
  say-hello:
    name: Say Hello
    runs-on: ubuntu-latest
    steps:
      - name: Greet the World
        run: echo "Hello, World!"
      - name: An Error I made
      run: |
        echo "I've made an error!"
        exit 1
```

2. Salveaza fisierul.
3. Add si comite schimbarile, apoi publica actualizarile.
4. Mergi la tab-ul Actions si vezi executia esuata.
5. Treci pe ramura main/master (default). 

Rezultatul va fi ca workflow-ul a esuat executia.

## 3. Creaza un PR pentru a face merge la codul tau
In continuare vom vedea ca rezultatul de esec este atribuit PR-ului. 

1. Mergi la tab-ul pull requests din repozitoriul tau GitHub.
2. Deschide un pull request pentru a face merge la `feature/basic-workflow` in ramura ta **main**.
3. Revizueste zona de status checks de deasupra optiunii de merge.

Rezultatul va fi ca pull request-ul va arata detaliile status checks deasupra optiunii de merge.

In plus, ai vazut cum sa rulezi mai multe comenzi intr-o singura valoare `run` folosind caracterul `|` (pipe).

## 4: Curatare
1. Sterge PR-ul creat in *Pasul 3*
2. Sterge ramura publicata creata in *Pasul 1*
3. Treci inapoi pe ramura main local.