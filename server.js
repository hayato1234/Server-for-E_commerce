const express = require("express");
const passport = require("passport");
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
const usersRouter = require("./routes/users");

const hostname = "localhost";
const port = 3000;

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use("/", indexRouter);
app.use("/users", usersRouter);

//↓making localhost:3000 equal = path.join(__dirname, "public")
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use("/items", itemRouter);

// app.use((req, res) => {
//   console.log(req.header);
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/html");
//   res.end("<html><body><h1>This is an Express Server</h1></body></html>");
// });

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;
