export type Player = 1 | 2;
export type Cell = Player | null;
export type Row = Cell[];
export type Board = Row[];

export const initialState: Board = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

export function getWinner(board: Board): Player | null {
  const rows = board;
  const columns = [
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]]
  ];
  const diagonals = [
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]]
  ];

  const getOwner = (cells: Cell[]): Player | null =>
    cells.every((cell) => cell === cells[0] && cell !== null) ? cells[0] : null;

  const owners = [...rows, ...columns, ...diagonals]
    .map(getOwner)
    .filter((owner) => owner !== null);

  return owners.length === 0 ? null : owners[0];
}

function isValidMove(board: Board, x: number, y: number): boolean {
  return board[y][x] === null;
}

function isEven(number: number): boolean {
  return number % 2 === 0;
}

export function getNextPlayer(board: Board): Player {
  const emptyCellCount = board
    .map((row) => row.filter((cell) => cell === null).length)
    .reduce((sum, count) => sum + count);

  return isEven(emptyCellCount) ? 2 : 1;
}

function playMove(board: Board, x: number, y: number): Board {
  const nextPlayer = getNextPlayer(board);

  return board.map((row, rowY) =>
    rowY === y
      ? row.map((cell, cellX) => (cellX === x ? nextPlayer : cell))
      : row
  );
}

export function play(board: Board, x: number, y: number): Board {
  const winner = getWinner(board);
  const isValid = isValidMove(board, x, y);

  return !winner && isValid ? playMove(board, x, y) : board;
}
