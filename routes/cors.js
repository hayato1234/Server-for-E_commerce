const cors = require("cors");

const whitelist = ["http://localhost:3000", "https://localhost:3443"];

const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  console.log("cors header", req.header("Origin"));
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
