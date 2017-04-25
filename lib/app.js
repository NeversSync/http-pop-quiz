const fs = require('fs');
const path = require('path');

const superCat = JSON.stringify({ name: 'super cat', type: 'top secret' });

const catHtml = path.join(__dirname, 'cat.html');

function app(req, res) {
  if(req.method !== 'GET') {
    res.statusCode = 404;
    res.statusMessage = 'not a cat';
    res.end('<h1>please cat</h1>');
  }

  if (req.url === '/cat') {
    res.setHeader('Content-Type', 'application/json');
    res.end(superCat);
  }
  else {
    fs.readFile(catHtml, (err, page) => {
      if (err) res.end(err);
      res.end(page);
    });
    // or:
    // fs.createReadStream(catHtml).pipe(res);
  }
}

module.exports = app;