import { createReducer, on, ActionReducerMap } from "@ngrx/store";
import * as fromRouter from "@ngrx/router-store";

const initialState = {
  current: null
};

const _reducer = createReducer(
  initialState,
  on(fromRouter.routerNavigationAction, state => {
    return state;
  })
);

export function reducer(state, action) {
  return _reducer(state, action);
}
export const reducers: ActionReducerMap<any> = {
  routerReducer: reducer
};
