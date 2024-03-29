const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");


// connect to mongodb
const dbURI =
  "mongodb+srv://acjt:4g0do5HbfanQxnlN@cluster0.be0fbze.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("connected to db");
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });

// express app
const app = express();

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

// blog routes
app.use('/blogs', blogRoutes);


app.get("/about", (req, res) => {
  res.render("about", { title: "about" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "page not found" });
});
