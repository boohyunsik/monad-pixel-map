import { client, pixelMapAddress } from "./config";
import { PixelMap, multicall3 } from "./abi";
import { encodeFunctionData, decodeFunctionResult } from "viem";
import { multicall3Address } from "./config";

export async function multicallPixelMap(
  calls: { functionName: string; args: unknown[] }[]
) {
  const rawResult = await client.call({
    to: multicall3Address,
    data: encodeFunctionData({
      abi: multicall3,
      functionName: "tryAggregate",
      args: [
        false,
        calls.map(({ functionName, args }) => ({
          target: pixelMapAddress,
          callData: encodeFunctionData({
            abi: PixelMap.abi,
            functionName,
            args,
          }),
        })),
      ],
    }),
  });

  const decodedArray = decodeFunctionResult({
    abi: multicall3,
    functionName: "tryAggregate",
    data: rawResult.data as `0x${string}`,
  }) as { success: boolean; returnData: `0x${string}` }[];

  const decodedResults = decodedArray.map(({ success, returnData }, i) => {
    const { functionName } = calls[i];
    if (!success) {
      return { success, functionName, returnValue: null };
    }

    const returnValue = decodeFunctionResult({
      abi: PixelMap.abi,
      functionName,
      data: returnData,
    });

    return {
      success,
      functionName,
      returnValue,
    };
  });

  if (decodedResults.some((result) => !result.success)) {
    throw new Error("At least one call failed");
  }

  return decodedResults.map((result) => result.returnValue);
}
