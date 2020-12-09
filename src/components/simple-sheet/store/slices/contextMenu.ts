import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ContextMenuType } from '../../components/context-menu';

let initialState: {
  visible: boolean;
  type: ContextMenuType;
  top: number;
  left: number;
} = {
  visible: false,
  type: ContextMenuType.SINGLE_CELL,
  top: 0,
  left: 0,
};

const contextMenuSlice = createSlice({
  name: 'contextMenu',
  initialState,
  reducers: {
    show(
      state,
      action: PayloadAction<{
        type: ContextMenuType;
        top: number;
        left: number;
      }>
    ) {
      const { type, top, left } = action.payload;
      state.visible = true;
      state.type = type;
      state.top = top;
      state.left = left;
    },
    hide(state) {
      state.visible = false;
    },
  },
});

export const { show, hide } = contextMenuSlice.actions;

export default contextMenuSlice.reducer;
