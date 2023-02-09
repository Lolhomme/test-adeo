const { argvHandler } = require('../src/argvHandler');
let data = require('../data').data;

describe('argvProcess method', () => {
  it('should not return an empty array on 0 results', () => {
    expect(argvHandler.argvProcess('--filter=wdnwldn')).toEqual('Nothing found');
  });

  it('should throw on wrong parameter', () => {
    const failedResultFilter = '--dadasd';
    expect(() => argvHandler.argvProcess(failedResultFilter)).toThrow('Wrong parameter');
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

describe('filterAnimals method', () => {
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
    copyData = [
      {
        name: 'Dillauti',
        people:
          [{
            name: 'Winifred Graham',
            animals:
              [{ name: 'Anoa' },
              { name: 'Duck' },
              { name: 'Narwhal' },
              { name: 'Badger' },
              { name: 'Cobra' },
              { name: 'Crow' }]
          },
          {
            name: 'Blanche Viciani',
            animals:
              [{ name: 'Barbet' },
              { name: 'Rhea' },
              { name: 'Snakes' },
              { name: 'Antelope' },
              { name: 'Echidna' },
              { name: 'Crow' },
              { name: 'Guinea Fowl' },
              { name: 'Deer Mouse' }]
          },
          {
            name: 'Philip Murray',
            animals:
              [{ name: 'Sand Dollar' },
              { name: 'Buzzard' },
              { name: 'Elephant' },
              { name: 'Xenops' },
              { name: 'Dormouse' },
              { name: 'Anchovy' },
              { name: 'Dinosaur' }]
          },
          {
            name: 'Bobby Ristori',
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
          {
            name: 'Louise Pinzauti',
            animals:
              [{ name: 'Manta Ray' },
              { name: 'Nubian Ibex' },
              { name: 'Warbler' },
              { name: 'Duck' },
              { name: 'Mice' }]
          }]
      },
    ];
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

describe('countAnimals method', () => {
  it('should return a valid count', () => {
    const copyData = [
      {
        name: 'Dillauti',
        people:
          [
            {
              name: 'Winifred Graham',
              animals:
                [{ name: 'Anoa' },
                { name: 'Duck' },
                { name: 'Narwhal' },
                { name: 'Badger' },
                { name: 'Cobra' },
                { name: 'Crow' }]
            },

            {
              name: 'Bobby Ristori',
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