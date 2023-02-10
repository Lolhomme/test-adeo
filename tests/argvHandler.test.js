const { argvHandler } = require('../src/argvHandler');
const { filterAnimalsMock, countAnimalsMock } = require('../tests/mock');

let data = require('../data').data;

describe('filterAnimals', () => {
  let copyData;
  beforeEach(() => {
    copyData = structuredClone(data);
  });

  it('should return an empty array on 0 results', () => {
    expect(argvHandler.filterAnimals(copyData, 'yguwdeweu')).toEqual([]);
  });

  it('should filter on valid filter parameter', () => {
    expect(argvHandler.filterAnimals(copyData, 'or').length).toBeGreaterThan(0);
  });

  it('should return a valid response', () => {
    copyData = filterAnimalsMock;
    const expectedResponse = [{
      name: 'Dillauti',
      people:
        [
          {
            name: 'Bobby Ristori',
            animals:
              [
                { name: 'Chipmunk' },
              ]
          },
        ]
    }];
    expect(argvHandler.filterAnimals(copyData, 'un')).toEqual(expectedResponse);
  });
});

describe('countAnimals', () => {
  it('should return a valid count', () => {
    const copyData = countAnimalsMock;
    const exepectedResponse = [
      {
        name: 'Dillauti [2]',
        people:
          [
            {
              name: 'Winifred Graham [6]',
              animals:
                [{ name: 'Anoa' },
                { name: 'Duck' },
                { name: 'Narwhal' },
                { name: 'Badger' },
                { name: 'Cobra' },
                { name: 'Crow' }]
            },
            {
              name: 'Bobby Ristori [9]',
              animals:
                [{ name: 'Kowari' },
                { name: 'Caecilian' },
                { name: 'Common Genet' },
                { name: 'Chipmunk' },
                { name: 'Aardwolf' },
                { name: 'Przewalski\'s Horse' },
                { name: 'Badger' },
                { name: 'Sand Cat' },
                { name: 'Linne\'s Two-toed Sloth' }]
            },
          ]
      },
    ];
    expect(argvHandler.countAnimals(copyData)).toEqual(exepectedResponse);
  });
});

describe('argvProcess', () => {
  it('should not return an empty array on 0 results', () => {
    expect(argvHandler.argvProcess('--filter=wdnwldn')).toEqual('Nothing found');
  });

  it('should throw on wrong parameter', () => {
    expect(() => argvHandler.argvProcess('--dadasd')).toThrow('Wrong parameter');
  });

  it('should filter on valid filter parameter', () => {
    expect(argvHandler.argvProcess('--filter=or').length).toBeGreaterThan(0);
  });

  it('should filter on valid count parameter', () => {
    expect(argvHandler.argvProcess('--count').length).toBeGreaterThan(0);
  });

  it('should return same response as the sample with the same parameter', () => {
    expect(JSON.parse(argvHandler.argvProcess('--filter=ry'))).toEqual([
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



