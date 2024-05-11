import { expect, test, describe } from 'vitest'
import { getPrereqs } from '../app/jobs'

describe('Jobs', () => {

  test('get nested prereqs from all trees', () => {
    const skillId = '23';
    const treeOne = {
      '3': {
        id: 3,
        treeIndex: 0
      }
    };
    const treeTwo = {
      '5': {
        id: 5,
        treeIndex: 0
      }
    };
    const treeThree = {
      '23': {
        id: 23,
        treeIndex: 0,
        prereqs: [
          [5, 3],
          [3, 1]
        ]
      }
    };
    const desiredResult = {
      '3': 1,
      '5': 3
    };
    const result = getPrereqs(skillId, treeOne, treeTwo, treeThree);
    expect(result).toStrictEqual(desiredResult);
  });

  test('get nested prereqs from some trees', () => {
    const skillId = '23';
    const treeOne = {
      '3': {
        id: 3,
        treeIndex: 0
      }
    };
    const treeTwo = {
      '5': {
        id: 5,
        treeIndex: 0
      }
    };
    const treeThree = {
      '23': {
        id: 23,
        treeIndex: 0,
        prereqs: [
          [5, 3]
        ]
      }
    };
    const desiredResult = {
      '5': 3
    };
    const result = getPrereqs(skillId, treeOne, treeTwo, treeThree);
    expect(result).toStrictEqual(desiredResult);
  });

  test('get nested prereqs from the same tree + some trees', () => {
    const skillId = '23';
    const treeOne = {
      '3': {
        id: 3,
        treeIndex: 0
      },
      '2': {
        id: 2,
        treeIndex: 2
      }
    };
    const treeTwo = {
      '5': {
        id: 5,
        treeIndex: 0,
        prereqs: [
          [3, 1]
        ]
      }
    };
    const treeThree = {
      '23': {
        id: 23,
        treeIndex: 0,
        prereqs: [
          [5, 3],
          [12, 5]
        ]
      },
      '12': {
        id: 12,
        treeIndex: 1,
        prereqs: [
          [2, 1]
        ]
      }
    };
    const desiredResult = {
      '5': 3,
      '12': 5,
      '3': 1,
      '2': 1
    };
    const result = getPrereqs(skillId, treeOne, treeTwo, treeThree);
    expect(result).toStrictEqual(desiredResult);
  });

  test('get no prereqs', () => {
    const skillId = '23';
    const treeOne = {
      '3': {
        id: 3,
        treeIndex: 0
      }
    };
    const treeTwo = {
      '5': {
        id: 5,
        treeIndex: 0
      }
    };
    const treeThree = {
      '23': {
        id: 23,
        treeIndex: 0
      }
    };
    const result = getPrereqs(skillId, treeOne, treeTwo, treeThree);
    expect(result).toBeUndefined();
  });

});
