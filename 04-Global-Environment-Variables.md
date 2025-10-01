# Variabile de Mediu Globale

In exercitiul 2, am vazut cum sa folosim variabilele de mediu la nivel de pas, dar workflow-urile ne permit de asemenea sa definim variabile de mediu la nivel global. Aceste variabile sunt apoi accesibile tuturor job-urilor.

## 1. Vezi variabilele de mediu globale in actiune

1. Din ramura **default** a repozitoriului tau, creeaza o noua ramura de cod numita `feature/global-env`
2. Creeaza un nou fisier numit `.github/workflows/global-env.yaml`
3. Copiaza continutul de mai jos in fisierul nou creat:

```yaml
name: Environment Variables
on:
  push:
    branches: feature/global-env
env:
  GLOBAL_VAR: test
jobs:
  first-job:
    name: A Job
    runs-on: ubuntu-latest
    steps:
      - name: Output Global Variable
        run: echo "${GLOBAL_VAR}"
  second-job:
    name: Another Job
    runs-on: ubuntu-latest
    steps:
      - name: Output Global Variable
        run: echo "${GLOBAL_VAR}"
```

4. Adauga si comite schimbarile, apoi publica ramura.
5. Mergi la repozitoriul tau, si vizualizeaza tab-ul Actions pentru a vedea executia impotriva ramurii tale publicate.

Rezultatul va fi o variabila disponibila in toate job-urile.