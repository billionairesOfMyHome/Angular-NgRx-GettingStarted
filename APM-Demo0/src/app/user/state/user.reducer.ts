import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { User } from "../user";
import { maskUserName } from "./user.action";

// State for this feature (User)
export interface UserState {
  currentUser: User;
  maskUserName: boolean;
}

const initialState: UserState = {
  currentUser: null,
  maskUserName: false,
}

// Selector functions
const getCurrentUserState = createFeatureSelector<UserState>('user');

export const getMaskUserName = createSelector(
  getCurrentUserState,
  (state) => state.maskUserName
);

export const userReducer = createReducer<UserState>(
  initialState,
  on(maskUserName, (state): UserState => {
    return {
      ...state,
      maskUserName: !state.maskUserName,
    }
  })
)