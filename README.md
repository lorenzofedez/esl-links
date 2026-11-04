# ESL Links

Piattaforma link-in-bio per i brand di Exchange Student Life: pagine pubbliche, dashboard privata, editor del design, eventi e statistiche.

## Pubblicazione

1. Crea un repository su GitHub e carica tutti i file di questa cartella.
2. Su Cloudflare apri **Workers & Pages**, poi **Create application**, scegli **GitHub** e seleziona il repository. Il nome del Worker deve restare `esl-links`.
3. Dopo il primo deploy apri il Worker, poi **Settings > Variables and Secrets**, e aggiungi il secret `ADMIN_PASSWORD` con almeno 10 caratteri.
4. Apri `https://esl-links.<tuo-account>.workers.dev/admin` e accedi.

In alternativa, con Node.js sul computer: `npm install`, `npx wrangler login`, `npx wrangler deploy`, `npx wrangler secret put ADMIN_PASSWORD`.

## Struttura

- `src/index.js`: percorsi, API, login, statistiche, database
- `src/render.js`: HTML delle pagine pubbliche
- `public/static/theme.js`: temi e design, condivisi tra server e dashboard
- `public/static/visibility.js`: regole di programmazione e visibilità
- `public/static/admin.js`, `admin.css`: dashboard
- `test/`: test automatici e simulatore locale

## Sviluppo locale

- `npm test`: esegue i test automatici
- `npm run local`: avvia il sito su `http://localhost:8787/admin` con la password `password-locale-123`
- `npm run dev`: avvia il sito con gli strumenti ufficiali Cloudflare

Il database si crea e si popola da solo al primo avvio.
