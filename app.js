const express = require("express");
const morgan = require('morgan');

// express app
const app = express();

// register view engine
app.set("view engine", "ejs");

// listen for requests
app.listen(5000);

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Yoshi finds eggs",
      content: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      content: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      content: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Yoshi finds eggs",
      content: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      content: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      content: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      content: "Lorem ipsum dolor sit amet consectetur",
    },
    
  ];
  res.render("index", { title: "home", blogs });
});
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
