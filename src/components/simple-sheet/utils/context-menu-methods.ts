import { CellSelectedState, SparseCellDatas } from '../types';

export const clearContext = (
  selectedState: CellSelectedState,
  setState: (func: (state: SparseCellDatas) => SparseCellDatas) => void
) => {
  setState((cells) => {
    return cells.map((row, rowIdx) => {
      return row.map((cell, colIdx) => {
        if (
          cell != null &&
          rowIdx >= selectedState[0] &&
          rowIdx <= selectedState[2] &&
          colIdx >= selectedState[1] &&
          colIdx <= selectedState[3]
        ) {
          cell.setValue('');
        }
        return cell;
      });
    });
  });
};

export const mergeCells = (
  selectedState: CellSelectedState,
  setState: (func: (state: SparseCellDatas) => SparseCellDatas) => void
) => {
  
};
