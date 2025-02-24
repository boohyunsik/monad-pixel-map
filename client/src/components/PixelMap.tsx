import { usePixelMap } from "../hook";

export function PixelMap() {
  const { data } = usePixelMap();

  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }

  const gridSize = 400;
  const cellWidth = `calc(${gridSize}px / ${data[0].length})`;
  const cellHeight = `calc(${gridSize}px / ${data.length})`;

  return (
    <div
      className="grid w-fit h-fit m-10 border-2 border-black "
      style={{
        gridTemplateColumns: `repeat(${data[0].length}, ${cellWidth})`,
        gridTemplateRows: `repeat(${data.length}, ${cellHeight})`,
      }}
    >
      {data.map((row, rowIndex) =>
        row.map(([r, g, b], colIndex) => {
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="pixel-cell"
              style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
            />
          );
        })
      )}
    </div>
  );
}
