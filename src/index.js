const express = require('express');
const hdb = require('express-handlebars');
const port = process.env.port || 3000;
const app = express();
const methodOverride = require('method-override');
const path = require('path');

//const db = require('./config/db');
const router = require('./routes');



app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.engine(
    'hdb',
    hdb.engine({
        helpers: {
            sum: (a, b) => a + b,
        },
        extname: 'hdb',
    }),
);
app.set('views', path.join(__dirname, 'sources', 'views'));
app.set('view engine', 'hdb');

//db.connect();
router(app);

app.listen(
    { port: port, host: "0.0.0.0" },
    function (err, address) {
        if (err) {
            console.log('error with hosting');
        }
        console.log(`Your app is listening on ${address}`);
    }
);
