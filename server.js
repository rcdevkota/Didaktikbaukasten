const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Client } = require('pg');
var cors = require('cors')

var allowlist = ['http://127.0.0.1:5500']
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "postgres",
    database:"postgres"
});

client.connect();


app.post('/insert', (req, res) => {
    console.error(req.body);
    const insertQuery = 'INSERT INTO didaktikbaukasten (variation,quantity) VALUES ($1, $2)';
   // const insertValues = [55, 'req.body.variation', 55];
    let oederId = parseInt(req.body.order_id);
    let oederVariations = (req.body.variation);
    let oederQuantity = parseInt(req.body.quantity);
    const insertValues = [ oederVariations, oederQuantity];
    console.error(insertValues);
    const query = { text:insertQuery,values:insertValues}
   


    client.query(insertQuery,insertValues, (error, result) => {
      if (error) {
        res.status(500).send(error);
        return;
      }
      res.status(201).send(`${result.rowCount} row(s) inserted`);
    });
});

app.listen(3000, () => {
    console.log(`Server running at http://127.0.0.1:3000/`);
});
