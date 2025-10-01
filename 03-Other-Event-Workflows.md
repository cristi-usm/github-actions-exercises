# Workflow-uri pentru alte evenimente

Pe langa evenimentele de tip push, workflow-urile pot fi declansate si de o varietate de alte evenimente. In exemplele de mai jos vom vedea cateva in actiune si vom intelege limitarile lor. O limitare principala a multor evenimente este ca trebuie sa fie in ramura implicita pentru a functiona.

Vezi [documentatia pentru declansarea evenimentelor](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows) pentru mai multe informatii.

## 1. Creeaza un workflow declansat de un issue

Vom incepe prin a crea un workflow declansat de deschiderea unui issue si vom vedea direct unul dintre cele mai importante detalii ale workflow-urilor non-push.

1. Din ramura **main** a repozitoriului tau, creeaza o noua ramura de cod numita `feature/issue-workflow`
2. Creeaza un nou fisier numit `.github/workflows/issue-workflow.yaml`
3. Copiaza continutul de mai jos in fisierul nou creat:

```yaml
name: Issue Events
on:
  issues:
    types: [opened]
jobs:
  doing-more-things:
    name: Doing Things From Issues
    runs-on: ubuntu-latest
    steps:
      - name: Output Issue Information
        env:
          EVENT_NAME: ${{ github.event_name }}
          EVENT_ACTION: ${{ github.event.action }}
        run: echo "The action '${EVENT_ACTION}' was performed against '${EVENT_NAME}'."
```

4. Adauga si comite schimbarile, apoi publica ramura.
5. Mergi la repozitoriul tau, si creeaza un issue.

Rezultatul va fi ca **nimic nu se intampla** deoarece acest eveniment necesita ca workflow-ul sa fie definit in ramura implicita. In cazul nostru, trebuie sa facem push la aceasta in ramura **main**.

## 2. Actualizeaza workflow-ul pentru a fi in ramura implicita

6. Deschide un pull request pentru a face merge la `feature/issue-workflow` in ramura ta implicita.
7. Fa merge la PR si sterge ramura
8. Mergi la repozitoriul tau, si creeaza un issue (posibil să fie nevoie să activați `Issues` din setările repozitoriului).

Rezultatul va fi o executie a workflow-ului de eveniment de issue care va afisa "Actiunea 'deschisa' a fost efectuata pentru 'issues'".

9. Treci inapoi la ramura implicita local si fa pull la schimbari.