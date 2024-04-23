import React, { useEffect, useState } from "react";

const Score = () => {
  const data = [
    [null, null, null, null, 1, null, null],
    [null, null, 0, null, null, null, null],
    [0, null, null, 1, null, null, null],
    [1, null, null, null, null, 0, null],
    [null, 1, null, null, null, 0, null],
    [null, null, null, null, 1, null, null],
  ];
  const [scores, setScores] = useState({ 0: 0, 1: 0 });

//   useEffect(() => {
//     checkConsecutiveMatching(data);
//   }, [data]);

  const checkConsecutiveMatching = (matrix) => {
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    let updatedScores = { ...scores };

    const checkConsecutive = (arr) => {
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
    };

    const updateScores = (arr) => {
      if (arr[0] !== null) {
        updatedScores[arr[0]] += 10;
      }
    };

    const checkRows = () => {
      for (let i = 0; i < numRows; i++) {
        if (checkConsecutive(matrix[i])) {
          updateScores(matrix[i]);
        }
      }
    };

    const checkColumns = () => {
      for (let j = 0; j < numCols; j++) {
        const column = [];
        for (let i = 0; i < numRows; i++) {
          column.push(matrix[i][j]);
        }
        if (checkConsecutive(column)) {
          updateScores(column);
        }
      }
    };

    const checkDiagonals = () => {
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
        updateScores(diagonals);
      }
    };

    checkRows();
    checkColumns();
    checkDiagonals();

    setScores(updatedScores);
  };
  return (
    <div>
      <h2>Scores</h2>
      <p>Score for 0: {scores[0]}</p>
      <p>Score for 1: {scores[1]}</p>
    </div>
  );
};

export default Score;
