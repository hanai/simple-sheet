import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SheetLayout } from '../../types';

let initialState: SheetLayout = {
  rows: [],
  cols: [],
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setLayout(state, action: PayloadAction<SheetLayout>) {
      state.rows = action.payload.rows;
      state.cols = action.payload.cols;
    },
    setRowLayout(
      state,
      action: PayloadAction<{ index: number; height: number }>
    ) {
      const { index, height } = action.payload;
      state.rows[index] = { height };
    },
    setColLayout(
      state,
      action: PayloadAction<{ index: number; width: number }>
    ) {
      const { index, width } = action.payload;
      state.cols[index] = { width };
    },
  },
});

export const { setLayout, setRowLayout, setColLayout } = layoutSlice.actions;

export default layoutSlice.reducer;
