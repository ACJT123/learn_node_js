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
app.use(morgan("dev"));

// mongoose and mongo sandbox routes
app.get("/add_blog", (req, res) => {
  const blog = new Blog({
    title: "new blog",
    content: "this is my new blog",
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/all_blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/get_blog", (req, res) => {
  Blog.findById('66064204c6337849e3bb0854')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/", (req, res) => {
  res.redirect('/blogs');
});

// blog routes
app.get('/blogs', (req, res)=>{
  Blog.find().sort('create_at')
    .then((result)=>{
      res.render('index', { title: 'All blogs', blogs: result})
    })
    .catch((err) => {
      console.log(err);
    });
})

app.get("/about", (req, res) => {
  res.render("about", { title: "about" });
});

// // redirects
// app.get("/about-us", (req, res) => {
//   res.redirect("/about");
// });

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "create blog" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "page not found" });
});
