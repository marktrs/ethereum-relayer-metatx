import cron from "node-cron";
import { cronConfig, ICronConfig } from "../configs/cron.config";
import { forwardTransaction } from "../eth/forwarder";

export class CronService {
  private transactions: any[] = [];
  private config: ICronConfig;

  constructor(transactions: any[]) {
    this.transactions = transactions;
    this.config = cronConfig;
  }

  async start() {
    const { jobSchedule } = this.config;
    cron.schedule(jobSchedule, async () => {
      console.log(`receive ${this.transactions.length} transactions`);

      if (this.transactions.length > 0) {
        console.log(`processing ${this.transactions.length} transactions`);

        for (let index = 0; index < this.transactions.length; index++) {
          const tx = this.transactions[index];
          try {
            const receipt = await forwardTransaction(tx.request, tx.signature);
            console.log(`executed tx hash ${receipt.hash}`);
          } catch (error: any) {
            console.log(
              `unable to execute tx from ${tx.request.from} with reason : \n${error.message}`
            );
          }

          this.transactions.pop();
        }
      }
    });
  }
}
