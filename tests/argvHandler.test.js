const { argvProcess } = require('../src/argvHandler');

const validFilter = '--filter=or';
const validCount = '--count';

describe('Argv handler', () => {
  test('should not return an empty array on 0 results', () => {
    const emptyResultFilter = '--filter=yguwdeweu';
    expect(argvProcess(emptyResultFilter)).toEqual('Nothing found');
  });
  test('should throw on wrong parameter', () => {
    const failedResultFilter = '--dadasd';
    expect(() => argvProcess(failedResultFilter)).toThrow('Wrong parameter');
  });
  test('should filter on valid filter parameter', () => {
    expect(argvProcess(validFilter).length).toBeGreaterThan(0);
  });
  test('should filter on valid count parameter', () => {
    expect(argvProcess(validCount).length).toBeGreaterThan(0);
  });
  test('should return same response as the sample with the same parameter', () => {
    expect(JSON.parse(argvProcess('--filter=ry'))).toEqual([
      {
        name: 'Uzuzozne',
        people: [
          {
            name: 'Lillie Abbott',
            animals: [
              {
                name: 'John Dory'
              }
            ]
          }
        ]
      },
      {
        name: 'Satanwi',
        people: [
          {
            name: 'Anthony Bruno',
            animals: [
              {
                name: 'Oryx'
              }
            ]
          }
        ]
      }
    ]);
  });
})
