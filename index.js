import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";

const app = express();
const port = 3000;

env.config();

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/spots", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM spots");
    console.log(result.rows);
    res.render("spots.ejs", { spots: result.rows });
  } catch (err) {
    console.log(err);
    res.render("error.ejs", { error: err }); // Assuming you have an error.ejs for error handling
  }
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
})

app.get("/about", (req, res) => {
  res.render("about.ejs");
})

app.get("/addSpot", (req, res) => {
  res.render("addSpot.ejs");
})

app.post("/addSpot", async (req, res) => {
  const {spotName, description, generalRating, internetRating, location, start_date, end_date} = req.body;
  try {
    await db.query(
      `INSERT INTO spots (name, description, general_rating, internet_rating, location, start_date, end_date) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)`, 
      [spotName, description, generalRating, internetRating, location, start_date, end_date]);
    res.redirect("/spots");
  } catch (err) {
    console.log(err);
    res.render("error.ejs", { error: err }); // Assuming you have an error.ejs for error handling
  }
}
);


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});