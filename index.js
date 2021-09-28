const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.set('Surrogate-Control', 'content="ESI/1.0"');
    res.set('Content-Type', 'application/json');
    res.set('Cache-Control', 'no-cache');
    const response = JSON.stringify({
        title: 'un titre sans cache',
        content: '##ESI',
    })
    res.send(response.replace('"##ESI"', '<esi:include src="http://node:3000/fragment" />'));
})

app.get('/fragment', (req, res) => {
    const now = new Date();
    res.set('Cache-Control', 's-maxage=10, max-age=10');
    res.json({
        description: 'une description en cache',
        horaire: `${now.toLocaleDateString('fr-FR')} ${now.toLocaleTimeString('fr-FR')}`,
    });
})

app.get('/html', (req, res) => {
    res.set('Surrogate-Control', 'content="ESI/1.0"');
    res.set('Content-Type', 'text/html');
    res.send(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>title</title>
        <link rel="stylesheet" href="style.css">
        <script src="script.js"></script>
      </head>
      <body>
        <h1>Hello html</h1>
        <esi:include src="http://node:3000/content-html" />
      </body>
    </html>`);
})

app.get('/content-html', (req, res) => {
    res.set('Cache-Control', 's-maxage=60, max-age=30');
    res.send(`<h3>Salut Varnish à ${now.toLocaleDateString('fr-FR')} ${now.toLocaleTimeString('fr-FR')}</h3>`);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
