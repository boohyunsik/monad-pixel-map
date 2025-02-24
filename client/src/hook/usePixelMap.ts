import { useState, useEffect } from "react";
import { multicallPixelMap } from "../util";

export function usePixelMap() {
  const [data, setData] = useState<[number, number, number][][] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [width, height] = (
        await multicallPixelMap([
          { functionName: "width", args: [] },
          { functionName: "height", args: [] },
        ])
      ).map((result: unknown) => Number(result));

      try {
        const calls = [];
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            calls.push({ functionName: "readPixel", args: [x, y] });
          }
        }
        const results = await multicallPixelMap(calls);
        const pixelMap = [];
        for (let y = 0; y < height; y++) {
          const row = [];
          for (let x = 0; x < width; x++) {
            row.push(results[y * width + x]);
          }
          pixelMap.push(row);
        }
        setData(pixelMap as [number, number, number][][]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    console.log({ data });
  }, [data]);

  return { data, loading };
}
