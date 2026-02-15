import { useState } from "react";

export const useTicTacToe = () => {
  const initialBoard = Array(9).fill(null);

  const [board, setBoard] = useState<(null | string)[]>(initialBoard);

  const [isXNext, setisXNext] = useState<boolean>(true);

  const resetBoard = () => {
    setBoard(initialBoard);
    setisXNext(true);
  };

  const winningPatterns = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];

  const isWinning = (currentBoard: (string | null)[]) => {
    for (let i = 0; i < winningPatterns.length; i++) {
      const [a, b, c] = winningPatterns[i];
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }
    return null;
  };

  const updateStatus = () => {
    const winner = isWinning(board);
    if (winner) {
      return `Player ${winner} Wins!`;
    }
    if (!board.includes(null)) {
      return `The Match is Draw`;
    }
    return isXNext ? "Player X Turn" : "Player O Turn";
  };

  const handleClick = (index: number) => {
    const doesAPlayerWin = isWinning(board);
    if (board[index] || doesAPlayerWin) return;
    const newBoard = [...board];
    isXNext ? (newBoard[index] = "X") : (newBoard[index] = "O");
    setBoard(newBoard);
    setisXNext(!isXNext);
  };

  return { board, handleClick, resetBoard, updateStatus };
};
