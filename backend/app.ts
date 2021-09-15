import cors from "cors";
import { ethers } from "ethers";
import express, { Application, Request, Response } from "express";
import { appConfig } from "./configs/app.config";
import * as contractAddress from "./contracts/contract-address.json";
import ForwarderArtifact from "./contracts/MinimalForwarder.json";
// import "./jobs/batch-forward-transaction.job";

const app: Application = express();
const { port, gasLimit, privateKey, network } = appConfig;

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
    const provider = ethers.getDefaultProvider(network);
    const wallet = new ethers.Wallet(privateKey, provider);
    const forwarder = new ethers.Contract(
      contractAddress.Forwarder,
      ForwarderArtifact.abi,
      wallet
    );

    const tx = await forwarder.execute(request, signature, {
      gasLimit,
    });

    await tx.wait();

    return res.status(200).send({
      txHash: tx.hash,
    });
  }
);

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  console.error(`Error occured: ${error}`);
}
