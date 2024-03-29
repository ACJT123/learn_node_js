const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const Blog = require("./models/blog");

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
// index
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort("create_at")
    .then((result) => {
      res.render("index", { title: "All blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// create index
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "create blog" });
});

// create
app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((error) => {
      console.log(error);
    });
});

// delete
app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findOneAndDelete(id).then((result) => res.json({ redirect: "/blogs" }));
});

// get by id
app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { title: "Details", blog: result });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "about" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "page not found" });
});
