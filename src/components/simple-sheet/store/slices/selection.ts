import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CellSelectedState, SheetSelectedState } from '../../types';

let initialState: SheetSelectedState = {
  rows: [],
  cols: [],
  cells: null,
};

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    selectRows(state, action: PayloadAction<number[]>) {
      state.rows = action.payload;
      state.cols = [];
      state.cells = null;
    },
    selectCols(state, action: PayloadAction<number[]>) {
      state.rows = [];
      state.cols = action.payload;
      state.cells = null;
    },
    selectCells(state, action: PayloadAction<CellSelectedState>) {
      state.rows = [];
      state.cols = [];
      state.cells = action.payload;
    },
    emptySelection(state) {
      state.rows = [];
      state.cols = [];
      state.cells = null;
    },
  },
});

export const {
  selectRows,
  selectCols,
  selectCells,
  emptySelection,
} = selectionSlice.actions;

export default selectionSlice.reducer;
