import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/spots", (req, res) => {
  res.render("spots.ejs");
})

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
})

app.get("/about", (req, res) => {
  res.render("about.ejs");
})

app.get("/addspot", (req, res) => {
  res.render("addSpot.ejs");
})

app.post("/check", (req, res) => {
  res.render("spots.ejs", {
    spotName: req.body.spotName,
    rating: req.body.rating,
  });
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});