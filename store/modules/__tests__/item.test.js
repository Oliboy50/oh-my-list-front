import module from '../item';
import axios from 'axios';

let mockAxiosGetResult;
jest.mock('axios', () => ({
  $get: jest.fn(() => Promise.resolve(mockAxiosGetResult)),
}));

describe(`item store module`, () => {
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

    describe('getItem', () => {
      it(`throws if nor "IRI" nor "id" params provided`, async (done) => {
        await expect(action('getItem')).rejects.toThrowError(`"IRI" or "id" are required`);
        done();
      });

      it(`stores and returns item from api if it does not already exists`, async (done) => {
        state.items = [{id: 'foo'}];
        mockAxiosGetResult = {id: 'bar'};
        const expected = {id: 'bar'};
        expect(await action('getItem', {}, {id: 'bar'})).toEqual(expected);
        expect(state.items).toEqual([{id: 'foo'}, expected]);
        done();
      });

      it(`returns item from the store if it exists`, async (done) => {
        state.items = [{id: 'foo'}];
        expect(await action('getItem', {}, {id: 'foo'})).toEqual({id: 'foo'});
        expect(axios.$get).not.toBeCalled();
        done();
      });
    });
  });
});
