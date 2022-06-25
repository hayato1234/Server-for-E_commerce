import express from "express";
const itemRouter = express.Router();

itemRouter
  .route("/")
  .all(
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      //
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      next(); // will go next (GET, POST etc)
    }
  )
  .get((req: express.Request, res: express.Response) => {
    //
    res.end("Will send all the items to you");
  })
  .post((req: express.Request, res: express.Response) => {
    res.end(
      "Will add the item: " +
        req.body.name +
        " with description " +
        req.body.description
    );
  })
  .put((req: express.Request, res: express.Response) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /items");
  })
  .delete((req: express.Request, res: express.Response, s) => {
    res.end("Deleting all items");
  });

module.exports = itemRouter;
export {};
