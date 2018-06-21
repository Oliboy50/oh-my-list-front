import module from '../list';
import axios from 'axios';

let mockAxiosGetResult;
jest.mock('axios', () => ({
  $get: jest.fn(() => Promise.resolve(mockAxiosGetResult)),
}));

describe(`list store module`, () => {
  describe(`actions`, () => {
    let state;
    const action = (name, context = {}, payload = {}) => {
      return module.actions[name].bind({$axios: axios})(
        {
          state,
          commit: jest.fn((mutation, payload) => module.mutations[mutation](state, payload)),
          ...context,
        },
        payload
      );
    };

    beforeEach(() => {
      state = module.state();
    });

    describe('getLists', () => {
      it(`returns an empty array if api returns an empty array`, async (done) => {
        mockAxiosGetResult = {'hydra:member': []};
        const expected = [];
        expect(await action('getLists')).toEqual(expected);
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
        expect(await action('getLists', {dispatch: mockDispatchAction})).toEqual(expected);
        done();
      });
    });

    describe('getList', () => {
      it(`throws if nor "IRI" nor "id" params provided`, async (done) => {
        await expect(action('getList')).rejects.toThrowError(`"IRI" or "id" are required`);
        done();
      });

      it(`stores and returns list from api if it does not already exists`, async (done) => {
        state.lists = [{id: 'foo'}];
        mockAxiosGetResult = {id: 'bar'};
        const expected = {id: 'bar'};
        expect(await action('getList', {}, {id: 'bar'})).toEqual(expected);
        expect(state.lists).toEqual([{id: 'foo'}, expected]);
        done();
      });

      it(`returns list from the store if it exists`, async (done) => {
        state.lists = [{id: 'foo'}];
        expect(await action('getList', {}, {id: 'foo'})).toEqual({id: 'foo'});
        expect(axios.$get).not.toBeCalled();
        done();
      });
    });
  });
});
