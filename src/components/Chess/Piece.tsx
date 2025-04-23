import { pieces } from './data/pieces';
import { PieceProps } from './types/ChessTypes';

function Piece({ color, piece, column, row, ...delegated }: PieceProps) {
  const Component = pieces[color][piece];

  function handleDragStart(e: React.DragEvent<HTMLDivElement>) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData(
      'text/plain',
      `color: ${color}, piece: ${piece}, column: ${column}, row: ${row}`
    );

    const target = e.target as HTMLDivElement;
    setTimeout(() => {
      target.style.display = 'none';
    }, 0);
  }

  // function handleDragEnd(e: DragEvent) {
  //   const target = e.target as HTMLDivElement;
  //   setTimeout(() => {
  //     target.style.display = 'revert';
  //   }, 0);
  // }

  return (
    <div
      {...delegated} // onDragEnd={handleDragEnd}
      draggable={true}
      onDragStart={handleDragStart}
    >
      <Component />
    </div>
  );
}

export default Piece;
