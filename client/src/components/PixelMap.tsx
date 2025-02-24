import { usePixelMap } from "../hook/usePixelMap";

export function PixelMap() {
  const { data } = usePixelMap();

  if (!data) {
    return <div>Loading...</div>;
  }

  const cellSize = `calc(100vh / ${data.length})`;

  return (
    <div
      className="grid w-full h-full"
      style={{
        gridTemplateColumns: `repeat(${data[0].length}, ${cellSize})`,
        gridTemplateRows: `repeat(${data.length}, ${cellSize})`,
      }}
    >
      {data.map((row, rowIndex) =>
        row.map((pixel, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="pixel-cell"
            style={{
              backgroundColor: `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`,
            }}
          />
        ))
      )}
    </div>
  );
}
