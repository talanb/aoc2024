import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const lines = input.split('\n');
  const left = [];
  const right = [];
  let totalDiff = 0;
  for (let i = 0; i < lines.length; i++) {
    const [l, r] = lines[i].split(/\s+/);
    left.push(Number(l));
    right.push(Number(r));
  }
  left.sort((a, b) => a - b);
  right.sort( (a, b) => a - b);
  
  for (let i = 0; i < left.length; i++) {
    totalDiff += Math.abs(left[i] - right[i]);
  }

  return totalDiff;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split('\n');
  const left = [];
  let right: { [key: string]: number } = {};
  let score = 0;
  for (let i = 0; i < lines.length; i++) {
    const [l, r] = lines[i].split(/\s+/);
    left.push(Number(l));
    if (!(r in right)) {
      right[r] = 0;
    } 
    right[r] += 1;
  }
  for (let i = 0; i < left.length; i++) {
    const cnt = right[left[i]] || 0;
    score += left[i] * cnt;
  }
  return score;
};

run({
  part1: {
    tests: [
      {
        input: `
        3   4
        4   3
        2   5
        1   3
        3   9
        3   3
`,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        3   4
        4   3
        2   5
        1   3
        3   9
        3   3
        `,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
