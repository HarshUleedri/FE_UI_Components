import { useTicTacToe } from "../hooks/useTicTacToe";

const TicTacToe = () => {
  const { board, handleClick, resetBoard, updateStatus } = useTicTacToe();
  return (
    <div className="w-full max-w-7xl flex flex-col mt-20 gap-4 items-center justify-center mx-auto">
      <div className="flex justify-between gap-12 items-center">
        <p className="font-medium text-lg">{updateStatus()}</p>
        <button
          onClick={resetBoard}
          className="px-4 py-1 bg-gray-300 rounded-md font-medium"
        >
          Reset
        </button>
      </div>
      <div className="grid grid-cols-3 gap-1   ">
        {board.map((item, idx) => (
          <button
            disabled={board[idx] !== null}
            onClick={() => handleClick(idx)}
            className=" text-4xl size-24 cursor-pointer disabled:bg-white disabled:cursor-not-allowed hover:bg-gray-200 border rounded-md flex items-center justify-center "
            key={idx}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TicTacToe;
