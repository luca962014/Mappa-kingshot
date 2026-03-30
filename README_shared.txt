Kingshot Shared Planner - Netlify

Contenuto:
- index.html: planner condiviso
- netlify/functions/layout.js: API serverless per leggere/salvare il layout
- package.json: dipendenza @netlify/blobs
- netlify.toml: configurazione Netlify

Come pubblicare:
1. Crea un repository GitHub con questi file.
2. Su Netlify scegli "Add new site" > "Import an existing project".
3. Collega il repository e fai deploy.
4. Facoltativo ma consigliato: in Site configuration > Environment variables crea EDITOR_KEY con una password.
5. Apri il sito pubblicato, inserisci la Editor key e premi "Salva online" dopo le modifiche.
6. Gli altri utenti vedranno la mappa aggiornata con refresh automatico oppure con il pulsante "Ricarica dal server".

Nota:
- Senza EDITOR_KEY chiunque potrà modificare la mappa.
- Con EDITOR_KEY chi conosce la chiave potrà modificare, gli altri potranno solo leggere.
