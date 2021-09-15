import { ethers } from "ethers";
import { appConfig } from "../configs/app.config";
import * as contractAddress from "../contracts/contract-address.json";
import ForwarderArtifact from "../contracts/MinimalForwarder.json";

const { gasLimit, privateKey, network } = appConfig;

const forwardTransaction = async (
  request: any,
  signature: string
): Promise<any> => {
  const provider = ethers.getDefaultProvider(network);
  const wallet = new ethers.Wallet(privateKey, provider);
  const forwarder = new ethers.Contract(
    contractAddress.Forwarder,
    ForwarderArtifact.abi,
    wallet
  );

  return await forwarder.execute(request, signature, {
    gasLimit,
  });
};

export { forwardTransaction };
