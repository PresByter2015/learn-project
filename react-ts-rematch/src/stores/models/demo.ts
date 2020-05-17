import { createModel } from '@rematch/core';

export interface IState {
    count: number,
}

export const state: IState = {
    count: 0,
};

export default createModel({
    state,
    reducers: {
        add: (state: IState, payload): IState => {
           return state.count = state.count + payload;
        }
    },
    effects: {
        asyncAdd: async (n) => {
            await new Promise(rs => setTimeout(rs, 1000));
            // this.add(n);
        }
    },
});