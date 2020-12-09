import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CellData, CellSelectedState, CellType } from '../../types';

let initialState: CellData[][] = [];

const cellsSlice = createSlice({
  name: 'cells',
  initialState,
  reducers: {
    setCells(state, action: PayloadAction<CellData[][]>) {
      state.splice(0, 0, ...action.payload);
    },
    updateCell(
      state,
      action: PayloadAction<{ index: [number, number]; cell: CellData }>
    ) {
      const { index, cell } = action.payload;
      state[index[0]][index[1]] = cell;
    },
    updateCellRawValue(
      state,
      action: PayloadAction<{ index: [number, number]; raw: string }>
    ) {
      const { index, raw } = action.payload;
      state[index[0]][index[1]].raw = raw;
    },
    clearContent(state, action: PayloadAction<CellSelectedState>) {
      const selectedState = action.payload;
      state.forEach((row) => {
        row.forEach((cell) => {
          const { row, col } = cell;
          if (
            cell != null &&
            row >= selectedState[0] &&
            row <= selectedState[2] &&
            col >= selectedState[1] &&
            col <= selectedState[3]
          ) {
            cell.raw = '';
          }
          return cell;
        });
      });
    },
    mergeCells(state, action: PayloadAction<CellSelectedState>) {
      const selectedState = action.payload;
      const startCell = state[selectedState[0]][selectedState[1]];
      const endCell = state[selectedState[2]][selectedState[3]];

      const rowSpan = endCell.row + (endCell.rowSpan || 1) - startCell.row;
      const colSpan = endCell.col + (endCell.colSpan || 1) - startCell.col;

      for (let i = startCell.row; i < startCell.row + rowSpan; i++) {
        for (let j = startCell.col; j < startCell.col + colSpan; j++) {
          if (i !== startCell.row || j !== startCell.col) {
            state[i][j] = {
              ...state[i][j],
              rowSpan: 1,
              colSpan: 1,
              raw: undefined,
              type: CellType.PLACEHOLDER,
            };
          }
        }
      }
      startCell.rowSpan = rowSpan;
      startCell.colSpan = colSpan;
    },
  },
});

export default cellsSlice.reducer;

export const {
  setCells,
  updateCell,
  clearContent,
  mergeCells,
  updateCellRawValue,
} = cellsSlice.actions;
