Per avviare il progetto è sufficiente avere installato docker engine e docker compose, e successivamente
lanciare il comando "docker-compose up". Docker lancerà i container contenenti il database,
il backend ed il frontend, sincronizzando tutti i dati necessari.

In alternativa, se si desidera avviare a mano i vari applicativi, è necessario:

1. lanciare "docker-compose up mysql-db", per lanciare il database come container singolo.
2. dirigersi nella cartella del backend e modificare il file .env, assicurandosi che "DB_HOST" punti a "localhost"
3. lanciare il comando "npm run start" all'interno della cartella del backend
4. successivamente dirigersi nella cartella del frontend e lanciare il comando "ng serve --port 4201"
