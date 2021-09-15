import dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({
  path: resolve(process.cwd(), ".env"),
});

export interface IAppConfig {
  port: number;
  privateKey: string;
  gasLimit: string;
  network: string;
}

export const appConfig: IAppConfig = {
  port: +(process.env.APP_PORT || 3001),
  privateKey: process.env.APP_PAYMASTER_KEY || "",
  gasLimit: process.env.APP_GAS_LIMIT || "2500000",
  network: process.env.APP_NETWORK || "http://localhost:8545",
};
