import { createPublicClient, http } from "viem";

export const chain = {
  id: 10143,
  name: "Monad Testnet",
  nativeCurrency: { name: "Monad", symbol: "MON", decimals: 18 },
  rpcUrls: { default: { http: ["https://testnet-rpc.monad.xyz/"] } },
};

export const client = createPublicClient({
  chain,
  transport: http(),
});

export const pixelMapAddress = "0xEdAb967A67a03B2C158f5331e08f790A41640D78";
export const multicall3Address = "0xcA11bde05977b3631167028862bE2a173976CA11";
