import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const result = input.split('\n').reduce((acc, line) => {
    const matches = line.match(/mul\(\d+,\d+\)/g);
    const lineTotal = matches?.reduce((mulAcc, exp) => {
      const [a, b] = exp.match((/(\d+)/g))?.map(Number) || [0, 0];
      return mulAcc + a * b;
    }, 0) ?? 0;
    return acc + lineTotal;
  }, 0);
  return result;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let enabled = true
  const result = input.split('\n').reduce((acc, line) => {
    const matches = line.match(/(mul\(\d+,\d+\)|do\(\)|don't\(\))/g);
    const lineTotal = matches?.reduce((mulAcc, exp) => {
      if (exp === 'do()') {
        enabled = true;
      } else if (exp === 'don\'t()') {
        enabled = false;
      } else if (enabled) {
        const [a, b] = exp.match((/(\d+)/g))?.map(Number) || [0, 0];
        mulAcc += a * b;
      }
      return mulAcc;
    }, 0) || 0;
    return acc + lineTotal;
  }, 0);
  return result;
}

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
