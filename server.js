//Use this file to configure the database 
// use node server.js to run this file on nodejs server 
// after running ther servder you can use ip adress http://127.0.0.1:3000/ in frontend to communicate with database

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Client } = require('pg');
var cors = require('cors')
//for security only allowed ip address can communicate with database
// chance the ip address of the frontend server in the allowlist variable
var allowlist = ['http://127.0.0.1:5500']
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//configure the database information here
//Postgres database 
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "postgres",
    database:"postgres"
});

client.connect();

//the following post request sends and writes the database the values 
app.post('/insert', (req, res) => {
  console.error(req.body);
  //insertQuery is the postgres query where variation and quantity are the input parameters 
    const insertQuery = 'INSERT INTO didaktikbaukasten (variation,quantity) VALUES ($1, $2)';
   // inatialising the variables with values
    let oederId = parseInt(req.body.order_id);
    let oederVariations = (req.body.variation);
  let oederQuantity = parseInt(req.body.quantity);
    const insertValues = [ oederVariations, oederQuantity];
    console.error(insertValues);
    const query = { text:insertQuery,values:insertValues}
   

//the actual query is sent here to the database with insertQuery as postgres query and insertValues as values for the Query
    client.query(insertQuery,insertValues, (error, result) => {
      if (error) {
        res.status(500).send(error);
        return;
      }
      res.status(201).send(`${result.rowCount} row(s) inserted`);
    });
});
//starts the backend server
app.listen(3000, () => {
    console.log(`Server running at http://127.0.0.1:3000/`);
});
