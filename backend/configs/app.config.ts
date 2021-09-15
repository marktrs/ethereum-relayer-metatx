import dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({
  path: resolve(process.cwd(), ".env"),
});

export interface IAppConfig {
  port: number;
}

export const appConfig: IAppConfig = {
  port: +(process.env.APP_PORT || 3001),
};
