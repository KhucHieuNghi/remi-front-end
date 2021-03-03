// server.js
const { parse } = require('url');
const next = require('next');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./router');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();

mongoose.connect('mongodb+srv://admin:123@master.1na2r.mongodb.net/remi?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('success');
});

// const User = mongoose.model('movies', { name: String });

// server.get('/api/v1/get', async (req, res) => {
//     console.log('nghi');

//     // const filter = {};
//     // const all = await User.find(filter);
//     // console.log('🚀 ~ file: server.ts ~ line 132 ~ server.get ~ all', all);

//     // const user1 = new User({ name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user'] });

//     const kitty = new User({ name: 'modulus admin' });
//     kitty.save().then(() => console.log('meow'));
//     return res.json('nghi');
// });

routes(server);

app.prepare().then(() => {
    server.use((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname === '/a') {
      app.render(req, res, '/a', query);
    } else if (pathname === '/b') {
      app.render(req, res, '/b', query);
    } else {
      handle(req, res, parsedUrl);
    }
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
