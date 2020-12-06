import { defaultCellHeight, defaultCellWidth } from '../constants';
import {
  CellData,
  CellSelectedState,
  SheetData,
  SheetLayout,
  SheetSelectedState,
} from '../types';

export * from './dom';

export const range = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

const chr = (codePt: number): string => {
  if (codePt > 0xffff) {
    codePt -= 0x10000;
    return String.fromCharCode(
      0xd800 + (codePt >> 10),
      0xdc00 + (codePt & 0x3ff)
    );
  }
  return String.fromCharCode(codePt);
};

export const numberToLetter = (n: number): string => {
  let str = '';
  while (n > 0) {
    const x = Math.floor((n - 1) / 26);
    const r = (n - 1) % 26;
    str = chr(65 + r) + str;
    n = x;
  }
  return str;
};

export const clearSelection = () => {
  const selection = window.getSelection();
  if (selection != null) {
    selection.removeAllRanges();
  }
};

export const setCaretPosition = (ele: HTMLElement, pos: number) => {
  const range = document.createRange();
  range.setStart(ele.childNodes[0], pos);
  range.collapse(true);

  const selection = window.getSelection();
  if (selection != null) {
    selection.removeAllRanges();
    selection.addRange(range);
  }

  ele.focus();
};

export const setCaretToEnd = (ele: HTMLElement) => {
  const pos = ele.innerText.length;
  setCaretPosition(ele, pos);
};

export const getDefaultLayout = (
  rowCount: number,
  colCount: number
): SheetLayout => {
  return {
    cols: range(1, colCount).map((e) => ({
      width: defaultCellWidth,
    })),
    rows: range(1, rowCount).map((e) => ({
      height: defaultCellHeight,
    })),
  };
};

export const getDefaultSelectedState = (): SheetSelectedState => {
  return {
    cols: [],
    rows: [],
    cells: null,
  };
};

/**
 * detect if cell is selected
 */
export const isCellSelected = (
  cell: { col: number; row: number },
  cellSelectedState: CellSelectedState
) => {
  const [minR, minC] = cellSelectedState.start;
  const [maxR, maxC] = cellSelectedState.end;
  const { row, col } = cell;
  return row >= minR && row <= maxR && col >= minC && col <= maxC;
};

/**
 * converge to find really cell item
 */
export const getCellByIdx = (
  rowIdx: number,
  colIdx: number,
  cells: CellData[][]
) => {
  if (cells[rowIdx][colIdx] != null) {
    return cells[rowIdx][colIdx];
  }

  for (let i = colIdx; i >= 0; i--) {
    const cell = cells[rowIdx][i];
    if (cell) {
      if ((cell.colSpan || 1) + cell.col - 1 === colIdx) {
        colIdx = cell.col;
      }
      break;
    }
  }

  for (let i = rowIdx; i >= 0; i--) {
    const cell = cells[i][colIdx];
    if (cell) {
      if ((cell.rowSpan || 1) + cell.row - 1 === rowIdx) {
        rowIdx = cell.row;
      }
      break;
    }
  }

  return cells[rowIdx][colIdx];
};

export const getBoundaryCellsByCellSelectedState = (
  cells: CellData[][],
  state: CellSelectedState
) => {
  const [startRow, startCol] = state.start;
  const startCell = getCellByIdx(startRow, startCol, cells);
  const [endRow, endCol] = state.end;
  const endCell = getCellByIdx(endRow, endCol, cells);

  return [startCell, endCell];
};

export const getDefaultSheetData = (): SheetData => {
  return {
    layout: getDefaultLayout(5, 4),
    cells: [
      {
        row: 0,
        col: 0,
        raw: '日期',
      },
      {
        row: 0,
        col: 1,
        raw: '收支类型',
      },
      {
        row: 0,
        col: 2,
        raw: '说明',
      },
      {
        row: 0,
        col: 3,
        raw: '金额',
      },
      {
        row: 1,
        col: 0,
        raw: '2020-05-06',
      },
      {
        row: 1,
        col: 1,
        raw: '团队聚餐',
      },
      {
        row: 1,
        col: 2,
        raw: '说明文案A',
      },
      {
        row: 1,
        col: 3,
        raw: '1025',
      },
      {
        row: 2,
        col: 0,
        raw: '2020-05-07',
        rowSpan: 2,
      },
      {
        row: 2,
        col: 1,
        raw: '办公用品',
      },
      {
        row: 2,
        col: 2,
        raw: '说明文案B',
      },
      {
        row: 2,
        col: 3,
        raw: '860',
      },
      {
        row: 3,
        col: 1,
        raw: '团队建设',
      },
      {
        row: 3,
        col: 2,
        raw: '说明文案C',
      },
      {
        row: 3,
        col: 3,
        raw: '1160',
      },

      {
        row: 4,
        col: 0,
        raw: '记录人：王小明',
        colSpan: 2,
      },
      {
        row: 4,
        col: 2,
        raw: '总计：',
      },
      {
        row: 4,
        col: 3,
        raw: '',
      },
    ],
  };
};

export const parseSheetData = (sheetData: SheetData) => {
  const { layout, cells } = sheetData;
  let parsed = Array.from(
    { length: layout.rows.length },
    () => new Array(layout.cols.length)
  );

  cells.forEach((cell) => {
    const { row, col } = cell;
    parsed[row][col] = cell;
  });

  return parsed;
};
