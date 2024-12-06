import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const loadBeforeRules = (input: string): Map<string, string[]> => {
  let processingRules = true
  const beforeRulesMap: Map<string, string[]> = new Map();
  return input.split('\n').reduce((acc: Map<string, string[]>, line: string) => {
    if (processingRules && line.trim() !== '') {
      const [k,v] = line.split('|').map((s) => s.trim());
      let rulesForKey: string[] = acc.get(k) || [];
      acc.set(k, [...rulesForKey, v].flat());
    } else {
      processingRules = false
    }
    return acc;
    
  }, beforeRulesMap);
}

const loadAfterRules = (input: string): Map<string, string[]> => {
  let processingRules = true
  const afterRulesMap: Map<string, string[]> = new Map();
  return input.split('\n').reduce((acc: Map<string, string[]>, line: string) => {
    if (processingRules && line.trim() !== '') {
      const [v,k] = line.split('|').map((s) => s.trim());
      let rulesForKey: string[] = acc.get(k) || [];
      acc.set(k, [...rulesForKey, v].flat());
    } else {
      processingRules = false
    }
    return acc;
    
  }, afterRulesMap);
}

const loadUpdates = (input: string): string[][] => {
  const updates: string[][] = [];
  let skipping = true;
  input.split('\n').map((line: string) => {
    if (skipping  &&  line.trim() === '') {
      skipping =!skipping;
    } else if (!skipping) {
      updates.push(line.split(',').map((s)=> s.trim()));
    }
  });
  return updates;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const rules = loadRules(input);
  const updates = loadUpdates(input);
  // console.log(JSON.stringify(rules, null, 2));
  const failures:Set<number> = new Set();
  for (let i = 0;i < updates.length; i++) {
    console.log(`${updates[i]}`)
    for (let j = 0; j < updates[i].length; j++) {
      const ruleForNum = rules.get(updates[i][j]);
      for (let k = 0; k < j; k++) {
        console.log(`i: ${i}  j: ${j}  k:${k}  num: ${updates[i][j]}  checking: ${updates[i][k]}  ruleForNum: ${JSON.stringify(ruleForNum)}`)
        if (ruleForNum  &&  ruleForNum.includes(updates[i][k])) {
          failures.add(i);
        }
      }
    }
  }
  // console.log(failures);
  const success: number[] = [];
  for (let i = 0; i < failures.size; i++) {
    if (!failures.has(i)) {
      success.push(i);
    }
  }
  console.log(success);
  // Sum middle elements
  const total = success.reduce((acc: number, idx: number) => {
    const seq = updates[idx];
    const middleNumberIdx = (seq.length + 1) / 2 - 1;
    return acc + Number(updates[idx][middleNumberIdx]);
  }, 0);
  return total;
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
// 47|53
// 97|13
// 97|61
// 97|47
// 75|29
// 61|13
// 75|53
// 29|13
// 97|29
// 53|29
// 61|53
// 97|53
// 61|29
// 47|13
// 75|47
// 97|75
// 47|61
// 75|61
// 47|29
// 75|13
// 53|13

// 75,47,61,53,29
// 97,61,53,29,13
// 75,29,13
// 75,97,47,61,53
// 61,13,29
// 97,13,75,29,47        
//         `,
//         expected: 143,
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
