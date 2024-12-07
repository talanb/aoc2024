import run from "aocrunner";
import { WritableStreamDefaultWriter } from "node:stream/web";

const parseInput = (rawInput: string) => rawInput;
type Position = {
  x: number;
  y: number;
};

type SetupResult = {
  map: string[][];
  currPos: Position;
};

enum Direction {
  UP,
  RIGHT,
  DOWN,
  LEFT,
}
const setup = (input: string): SetupResult => {
  return input.split('\n').reduce((acc: SetupResult, line: string, rowIdx: number ) => {
    const chars = line.split('');
    const currCol = chars.findIndex((c) => c === '^');
    if (currCol>=0) {
      acc.currPos.x = rowIdx;
      acc.currPos.y = currCol;
    }
    acc.map.push(chars);
    return acc;
  }, {map: [], currPos: { x: 0, y: 0}})
}

const getNextTilePosition = (map: string[][], currPos: Position, dir: Direction): Position => {
  let nextPos: Position;
  switch (dir) {
    case Direction.UP:
      nextPos = {...currPos, x: currPos.x-1};
      break;
    case Direction.RIGHT:
      nextPos = {...currPos, y: currPos.y+1};
      break;
    case Direction.DOWN:
      nextPos = {...currPos, x: currPos.x+1};
      break;
    case Direction.LEFT:
      nextPos = {...currPos, y: currPos.y-1};
  }
  return nextPos;
};
const isOnBoard = (pos: Position, height: number, width: number): boolean  => {
  if (pos.x < 0 || pos.x >= height || pos.y < 0 || pos.y >= width) {
    return false;
  } else {
    return true;
  }
};

const turn = (dir: Direction): Direction => {
  let newDir: Direction
  switch (dir) {
    case Direction.UP:
      newDir = Direction.RIGHT;
      break;
    case Direction.RIGHT:
      newDir = Direction.DOWN;
      break;
    case Direction.DOWN:
      newDir  = Direction.LEFT;
      break;
    case Direction.LEFT:
      newDir  = Direction.UP;
  }
  return newDir;
};

const addPosition = (list: Position[], pos: Position): void => {
  if (!list.find((p) => p.x === pos.x && p.y === pos.y)) {
    list.push(pos);
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let currDir = Direction.UP;
  let positionList: Position[] = []
  let { map, currPos } = setup(input);
  positionList.push(currPos);
  const width = map[0].length;
  const height = map.length;
  let onBoard = true;
  while (onBoard) {
    let nextTilePos = getNextTilePosition(map, currPos, currDir);
    if (isOnBoard(nextTilePos, height, width)) {
      let nextTile = map[nextTilePos.x][nextTilePos.y];
      if (nextTile === '#') {
        currDir = turn(currDir);
      } else {
        currPos = nextTilePos;
        addPosition(positionList, currPos);
      }
    } else {
      onBoard = false;
    }
  } 
  return positionList.length;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
//       {
//         input: `
// ....#.....
// .........#
// ..........
// ..#.......
// .......#..
// ..........
// .#..^.....
// ........#.
// #.........
// ......#...        
//         `,
//         expected: 41,
//       },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
