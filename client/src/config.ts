import { createPublicClient, http } from "viem";

export const client = createPublicClient({
  chain: {
    id: 10143,
    name: "Monad Testnet",
    nativeCurrency: { name: "Monad", symbol: "MON", decimals: 18 },
    rpcUrls: { default: { http: ["https://testnet-rpc.monad.xyz/"] } },
  },
  transport: http(),
});

export const pixelMapAddress = "0x3Ed4491D3808E6e8DE1b786390E39F5D0A22b07b";
export const multicall3Address = "0xcA11bde05977b3631167028862bE2a173976CA11";
