import { useState } from "react";

function App() {
  const [matrices, setMatrices] = useState(
    Array(6)
      .fill()
      .map(() => Array(7).fill(null))
  );

  const [currentUser, setCurrentUser] = useState(true);

  function checkConsecutiveMatching(matrix) {
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    function checkConsecutive(arr) {
      for (let i = 0; i < arr.length - 3; i++) {
        if (
          arr[i] !== null &&
          arr[i] === arr[i + 1] &&
          arr[i] === arr[i + 2] &&
          arr[i] === arr[i + 3]
        ) {
          return true;
        }
      }
      return false;
    }

    function checkRows() {
      for (let i = 0; i < numRows; i++) {
        if (checkConsecutive(matrix[i])) {
          const consecutiveIndexes = [];
          for (let j = 0; j < numCols - 1; j++) {
            if (matrix[i][j] === matrix[i][j + 1] && matrix[i][j] !== null) {
              consecutiveIndexes.push([i, j], [i, j + 1]);
            }
          }
          return {
            type: "row",
            indexes: consecutiveIndexes,
          };
        }
      }
      return null;
    }

    function checkColumns() {
      for (let j = 0; j < numCols; j++) {
        const column = [];
        for (let i = 0; i < numRows; i++) {
          column.push(matrix[i][j]);
        }
        if (checkConsecutive(column)) {
          const consecutiveIndexes = [];
          for (let i = 0; i < numRows - 1; i++) {
            if (matrix[i][j] === matrix[i + 1][j] && matrix[i][j] !== null) {
              consecutiveIndexes.push([i, j], [i + 1, j]);
            }
          }
          return {
            type: "column",
            indexes: consecutiveIndexes,
          };
        }
      }
      return null;
    }

    function checkDiagonals() {
      const diagonals = [];
      // Main diagonals
      for (let i = 0; i < numRows && i < numCols; i++) {
        diagonals.push(matrix[i][i]);
      }
      // Secondary diagonals
      for (let i = 0; i < numRows && i < numCols; i++) {
        diagonals.push(matrix[i][numCols - 1 - i]);
      }
      if (checkConsecutive(diagonals)) {
        const consecutiveIndexes = [];
        for (let i = 0; i < diagonals.length - 1; i++) {
          if (diagonals[i] === diagonals[i + 1] && diagonals[i] !== null) {
            if (i < numRows) {
              consecutiveIndexes.push([i, i], [i + 1, i + 1]);
            } else {
              consecutiveIndexes.push(
                [numRows - 1 - (i - numRows), numCols - 1 - (i - numRows)],
                [numRows - (i - numRows), numCols - (i - numRows)]
              );
            }
          }
        }
        return {
          type: "diagonal",
          indexes: consecutiveIndexes,
        };
      }
      return null;
    }

    const rowResult = checkRows();
    if (rowResult !== null) {
      return rowResult;
    }
    const columnResult = checkColumns();
    if (columnResult !== null) {
      return columnResult;
    }
    const diagonalResult = checkDiagonals();
    if (diagonalResult !== null) {
      return diagonalResult;
    }
    return null;
  }

  const foundData = checkConsecutiveMatching(matrices);

  return (
    <div className="min-h-screen min-w-sm flex items-center justify-center bg-violet-700">
      <div className="bg-white p-3 pb-6 rounded-3xl border-b-8 border-black border-2">
        <div className="flex flex-col gap-3">
          {/* <Score /> */}
          {matrices.map((rows, rowIndexTop) => (
            <div key={rowIndexTop} className="bg-white flex gap-2">
              {rows.map((value, colIndexTop) => (
                <div
                  key={colIndexTop}
                  className=""
                  onClick={() => {
                    setCurrentUser(!currentUser);
                    setMatrices((prev) => {
                      return prev.map((row, rowIndex) =>
                        rowIndex === rowIndexTop
                          ? row.map((cell, colIndex) =>
                              colIndex === colIndexTop
                                ? currentUser
                                  ? 1
                                  : 0
                                : cell
                            )
                          : row
                      );
                    });
                  }}
                >
                  {foundData?.indexes?.some(
                    ([r, c]) => r === rowIndexTop && c === colIndexTop
                  ) ? (
                    <div
                      className={`${
                        value
                          ? "bg-amber-300"
                          : "bg-rose-400"
                      } rotate-45  rounded-full p-5 border-zinc-800 border-2 inside-border text-6xl w-4 h-4 items-center flex justify-center`}
                    >
                      {value === null ? "" : "+"}
                    </div>
                  ) : (
                    <div
                      className={`${
                        value === null
                          ? "text-white bg-violet-600"
                          : value
                          ? "bg-amber-300 text-slate-400"
                          : "bg-rose-400"
                      }  rounded-full p-5 border-zinc-800 border-2 inside-border`}
                    >
                      {/* {value === null ? "" : value} */}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
