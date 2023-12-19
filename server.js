const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
connection.connect();

const multer = require('multer');
const upload = multer({dest: './upload'})

app.get('/api/customers', (req,res)=>{
    connection.query(
      "SELECT * FROM products order by createdDate",
      (err, rows, fields)=>{
        res.send(rows);
      }
    );
});

app.use('/image',express.static('./upload'));

app.post('/api/customers', upload.single('image'),(req,res)=>{
  let sql = 'INSERT INTO products VALUES(null,?,?,?,?,now())';
  let image = '/image/'+req.file.filename;
  let name = req.body.name;
  let provider = req.body.provider;
  let price = req.body.price;
  console.log(name);
  console.log(image);
  console.log(birthday);
  console.log(gender);
  let params = [image, name, provider, price];
  connection.query(sql, params,(err, rows, fields)=>{
    res.send(rows);
    console.log(err);
    console.log(rows);
  })
})

/* app.delete('/api/customers/:id',(req,res)=>{
  let sql = 'UPDATE products SET isDeleted = 1 WHERE id = ?';
  let params = [req.params.id];
  connection.query(sql, params,(err, rows, fields) => {
    res.send(rows);
  })
}) */

app.listen(port, ()=> console.log(`Listening on port ${port}`));