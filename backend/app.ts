import cors from "cors";
import express, { Application, Request, Response } from "express";
import { appConfig } from "./configs/app.config";
import { CronService } from "./jobs/batch-forward-transaction.job";

const app: Application = express();
const { port } = appConfig;
const transactions: any = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

app.post(
  "/forward-transaction",
  async (req: Request, res: Response): Promise<Response> => {
    const { request, signature } = req.body;
    transactions.push({ request, signature });
    return res.status(200).send();
  }
);

try {
  const cronService = new CronService(transactions);
  cronService.start();
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  console.error(`Error occured: ${error}`);
}
