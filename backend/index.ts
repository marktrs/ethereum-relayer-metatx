import express, { Application, Request, Response } from "express";
import { appConfig } from "./configs/app.config";
import "./jobs/batch-forward-transaction.job";

const app: Application = express();
const { port } = appConfig;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: "Hello World!",
  });
});

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  console.error(`Error occured: ${error}`);
}
