import express from "express";

const itemRouter = require("./routes/itemRouter");
const hostname = "localhost";
const port = 3000;

const app: express.Express = express();
app.use("/items", itemRouter);

app.use((req: express.Request, res: express.Response) => {
  console.log(req.header);
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<html><body><h1>This is an Express Server</h1></body></html>");
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

export {};
