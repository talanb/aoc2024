import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const isReportSorted = (report: string[]) : boolean => {
  const ascending = report.slice(0).sort((a, b) => Number(a) - Number(b));
  const descending = report.slice(0).sort((a, b) => Number(b) - Number(a));

  return ascending.join(',') === report.join(',') || descending.join(',') === report.join(',');
}

const isGradual = (report: string[]) => {
  let gradual = false;

  for (let i = 0; i < report.length - 1; i++) {
    const diff = Math.abs(Number(report[i])  - Number(report[i + 1]));
    if (diff > 0 && diff <= 3) {
      gradual = true;
    } else {
      return false;
    }
  }
  return gradual;
}

const hasDups = (report: string[]): boolean => {
  return report.length != new Set(report).size;
}

const removeAtIndex = (arr: any[], index: number): any[] => {
  if (index < 0 || index >= arr.length) {
    throw new Error('Index out of bounds');
  }
  
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

const isSafe = (report: string[]): boolean => {
  let safe = true;
  if (hasDups(report) || !isReportSorted(report) || !isGradual(report)) {
    safe = false;
  }
  return safe;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines: string[] = input.split('\n');
  const safeCnt = lines.reduce((acc: number, line: string) => {
    const report = line.split(' ');
    if (isSafe(report)) {
      acc += 1;
    }
    return acc;
  }, 0)

  return safeCnt;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines: string[] = input.split('\n');

  const safeCnt = lines.reduce((acc: number, line: string) => {
    const report = line.split(' ');
    // Try the original input
    if (isSafe(report)) {
      acc += 1;
      return acc;
    }

    // Remove each level and try.
    for (let i = 0; i < report.length; i++) {
      const dampenedReport = removeAtIndex(report, i);
      if (isSafe(dampenedReport)) {
        acc += 1;
        return acc;
      }
    }
    return acc;
  }, 0)

  return safeCnt;

};

run({
  part1: {
    tests: [
      {
        input: `
        7 6 4 2 1
        1 2 7 8 9
        9 7 6 2 1
        1 3 2 4 5
        8 6 4 4 1
        1 3 6 7 9
`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        7 6 4 2 1
        1 2 7 8 9
        9 7 6 2 1
        1 3 2 4 5
        8 6 4 4 1
        1 3 6 7 9        
        `,

        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
