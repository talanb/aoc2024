import run from "aocrunner";
import { getEnvironmentData } from "worker_threads";

const parseInput = (rawInput: string) => rawInput;

const buildTable = (input: string): string[][]=> {
  const table = input.split("\n").map((row) => row.split(""));
  return table;
};

const directions = [
  [0, 1],
  [1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
  [0, -1],
  [-1, 0],
];

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const searchWord = "XMAS"
  const ws = buildTable(input)
  const width = ws[0].length
  const height = ws.length
  let cnt = 0
  
  for (let r = 0; r < ws.length; r++) {
    for (let c = 0; c < ws[r].length; c++) {
      for (let d = 0; d < directions.length; d++) {
        let matches = true
        for (let idx = 0; idx < searchWord.length && matches; idx++) {
          const newR = r + directions[d][0] * idx
          const newC = c + directions[d][1] * idx
          
          if (newR < 0 || newR >= height || newC < 0 || newC >= width) {
            matches = false
            continue
          }
          
          if (ws[newR][newC] !== searchWord[idx]) {
            matches = false
          }
        }
        if (matches) cnt++
      }
    }
  }
  return cnt
}

const pattern = [
  [-1, -1],[1,1],
]

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const ws = buildTable(input)
  const width = ws[0].length
  const height = ws.length
  let cnt = 0
  
  for (let r = 0; r < ws.length - 2; r++) {
    for (let c = 0; c < ws[r].length - 2; c++) {
      // check for MAS
      if (ws[r][c] === "M" && ws[r+1][c+1] === "A" && ws[r+2][c+2] === "S" &&
          ws[r][c+2] === "M" && ws[r+2][c] === "S") {
            cnt++;  
      }
      if (ws[r][c] === "S" && ws[r+1][c+1] === "A" && ws[r+2][c+2] === "M" &&
        ws[r][c+2] === "S" && ws[r+2][c] === "M") {
          cnt++;  
      }
      if (ws[r][c] === "M" && ws[r+1][c+1] === "A" && ws[r+2][c+2] === "S" &&
        ws[r][c+2] === "S" && ws[r+2][c] === "M") {
          cnt++;  
      }
      if (ws[r][c] === "S" && ws[r+1][c+1] === "A" && ws[r+2][c+2] === "M" &&
        ws[r][c+2] === "M" && ws[r+2][c] === "S") {
          cnt++;  
      }




      // if (r + 2 < height && c -2 >= 0) {
      //   if (ws[r][c] === "M" && ws[r+1][c-1] === "A" && ws[r+2][c-2] === "S" &&
      //     ws[r][c-2] === "S" && ws[r+2][c] === "M") {
      //     if (downDiags > 0) {
      //       cnt++;
      //       console.log(r,c, " MAS 1");
      //     }
      //   }
      // }

      // // check for SAM
      // downDiags = 0;
      // if (c + 2 < width && r + 2 < height) {
      //   if (ws[r][c] === "S" && ws[r+1][c+1] === "A" && ws[r+2][c+2] === "M" &&
      //       ws[r][c+2] === "S" && ws[r+2][c] === "M") {
      //         cnt++;  
      //         console.log(r,c, " SAM 1");
      //       }
      // }
      // if (r + 2 < height && c -2 >= 0) {
      //   if (ws[r][c] === "S" && ws[r+1][c-1] === "A" && ws[r+2][c-2] === "M" &&
      //     ws[r][c-2] === "S" && ws[r+2][c] === "M") {
      //     if (downDiags > 0) {
      //       console.log(r,c, " SAM 2");
      //       cnt++;
      //     }
      //   }
      // }
    }
  }
  return cnt
}
run({
  part1: {
    tests: [
      {
        input: `
        MMMSXXMASM
        MSAMXMSMSA
        AMXSXMAAMM
        MSAMASMSMX
        XMASAMXAMM
        XXAMMXXAMA
        SMSMSASXSS
        SAXAMASAAA
        MAMMMXMMMM
        MXMXAXMASX
        `,
        expected: 18,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........        
        `,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
