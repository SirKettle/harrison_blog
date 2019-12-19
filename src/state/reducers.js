import { combineReducers } from 'redux';
import config from './domain/config/reducer';
import blog from './domain/blog/reducer';

export const reducers = combineReducers({ config, blog });
