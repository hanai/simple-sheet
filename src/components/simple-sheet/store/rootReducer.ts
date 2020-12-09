import { combineReducers } from '@reduxjs/toolkit';

import layoutReducer from './slices/layout';
import selectionReducer from './slices/selection';
import cellsReducer from './slices/cells';
import contextMenuReducer from './slices/contextMenu';

const rootReducer = combineReducers({
  layout: layoutReducer,
  selection: selectionReducer,
  cells: cellsReducer,
  contextMenu: contextMenuReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
