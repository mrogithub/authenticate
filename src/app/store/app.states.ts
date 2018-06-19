import { createFeatureSelector} from "@ngrx/store";
import * as auth from './reducers/auth.reducers';

//This is a map of keys to the inner state types.
export interface AppState {
    authState: auth.State;
}

export const reducers = {
    auth: auth.reducer
};

export const selectAuthState = createFeatureSelector<AppState>('auth')