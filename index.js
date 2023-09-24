import express from "express";
import mysql from "mysql";
import cors from "cors";
import morgan from "morgan";
const app = express();

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "test_db",
  port: "3306",
});
app.use(morgan("default"));

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("hello this is the backend");
});
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`,`desc1`,`cover`) VALUES (?)";
  const values = [req.body.title, req.body.desc1, req.body.cover];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json({ created: "true" });
  });
});

app.listen(8080, () => {
  console.log("server successfully started");
});
