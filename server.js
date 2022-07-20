const express = require("express");
const config = require("./config");
const path = require("path");

const mongoose = require("mongoose");
const url = config.mongoUrl;
const connect = mongoose.connect(url, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
connect.then(
  () => console.log("Connected to database"),
  (err) => console.log(err)
);

const Item = require("./model/item");

const indexRouter = require("./routes/index");
const itemRouter = require("./routes/itemRouter");

const hostname = "localhost";
const port = 3000;

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use("/", indexRouter);

//↓making localhost:3000 equal = path.join(__dirname, "public")
app.use(express.static(path.join(__dirname, "public")));

app.use("/items", itemRouter);

app.use((req, res) => {
  console.log(req.header);
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<html><body><h1>This is an Express Server</h1></body></html>");
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
