# Configurarea la Dependabot 
In interiorul fiecărui repozitoriu GitHub există posibilitatea de a configura `Dependabot`. Este o caracteristică pe care GitHub o oferă și care poate remedia dependențele învechite prin notificarea și/sau deschiderea automată de PR-uri.

Pentru a vedea acest lucru în acțiune, am folosit anterior o acțiune publică (actions/checkout@v2) care este o versiune mai veche (vezi exercițiul [11-Using-Actions.md](./11-Using-Actions.md) dacă nu l-ai finalizat) și va activa dependabot pentru GitHub Actions.

O listă extinsă a ecosistemelor de dependență acceptate poate fi găsită în secțiunea de documentație.

## 1. Adăugarea configurației dependabot

1. Treci la ramura **main** a repozitoriului tău 
2. Creează un nou fișier numit `.github/dependabot.yaml`
3. Copiază conținutul de mai jos în fișierul nou creat:

```yaml
version: 2
updates:
  - package-ecosystem: github-actions
    directory: "/"
    schedule:
      interval: daily
    open-pull-requests-limit: 10
```

4. Adaugă, commit și fa push modificărilor tale către ramura implicită.
5. Mergi la repozitoriul tău și vizualizează pagina Actions pentru a vedea execuția.

Rezultatul va fi un PR cu documentația completă despre ce se schimbă. Orice workflow-uri care se declanșează la PR-uri vor fi, de asemenea, executate, validând modificările.

## Documentation
- [Dependabot Config Options](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file)