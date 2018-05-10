import list from '../list';
import axios from 'axios';

let mockAxiosGetResult;
jest.mock('axios', () => ({
  $get: jest.fn(() => Promise.resolve(mockAxiosGetResult)),
}));

describe(`list store module`, () => {
  describe(`actions`, () => {
    let state;
    let action;
    const testedAction = (context = {}, payload = {}) => {
      return list.actions[action].bind({$axios: axios})(
        {
          state,
          commit: jest.fn((mutation, payload) => list.mutations[mutation](state, payload)),
          ...context,
        },
        payload
      );
    };
    beforeEach(() => {
      state = list.state();
    });

    describe(action = 'getLists', () => {
      it(`returns an empty array if api returns an empty array`, async (done) => {
        mockAxiosGetResult = {'hydra:member': []};
        const expected = [];
        expect(await testedAction()).toEqual(expected);
        expect(state.lists).toEqual(expected);
        done();
      });

      it(`stores and returns lists with their first position item`, async (done) => {
        const mockDispatchAction = jest.fn((action, {IRI}) => Promise.resolve({'@id': IRI}));
        mockAxiosGetResult = {'hydra:member': [
          {
            positions: [
              'foo',
              'bar',
            ],
          },
          {
            positions: [
              'baz',
            ],
          },
          {
            positions: [],
          },
        ]};
        const expected = [
          {
            positions: [
              {
                '@id': 'foo',
              },
              'bar',
            ],
          },
          {
            positions: [
              {
                '@id': 'baz',
              },
            ],
          },
          {
            positions: [],
          },
        ];
        expect(await testedAction({dispatch: mockDispatchAction})).toEqual(expected);
        expect(state.lists).toEqual(expected);
        done();
      });
    });
  });
});
