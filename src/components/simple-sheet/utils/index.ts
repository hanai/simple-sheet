import { defaultCellHeight, defaultCellWidth } from '../constants';
import {
  CellData,
  CellSelectedState,
  CellType,
  SheetData,
  SheetLayout,
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
  range.setStart(ele.childNodes[0] || ele, pos);
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

/**
 * detect if cell is selected
 */
export const isCellSelected = (
  cell: { col: number; row: number },
  cellSelectedState: CellSelectedState
) => {
  const [minR, minC, maxR, maxC] = cellSelectedState;
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
  if (cells[rowIdx][colIdx].type !== CellType.PLACEHOLDER) {
    return cells[rowIdx][colIdx];
  }

  for (let i = colIdx; i >= 0; i--) {
    const cell = cells[rowIdx][i];
    if (cell.type !== CellType.PLACEHOLDER) {
      if (cell.colSpan + cell.col - 1 >= colIdx) {
        colIdx = cell.col;
      }
      break;
    }
  }

  for (let i = rowIdx; i >= 0; i--) {
    const cell = cells[i][colIdx];
    if (cell.type !== CellType.PLACEHOLDER) {
      if (cell.rowSpan + cell.row - 1 >= rowIdx) {
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
  const [startRow, startCol, endRow, endCol] = state;
  let ltCell = getCellByIdx(startRow, startCol, cells);
  let rbCell = getCellByIdx(endRow, endCol, cells);

  let lbCell = getCellByIdx(rbCell.row, ltCell.col, cells);
  let rtCell = getCellByIdx(ltCell.row, rbCell.col, cells);
  while (
    (lbCell.rowSpan !== 1 &&
      lbCell.row + lbCell.rowSpan - rbCell.row - rbCell.rowSpan !== 0) ||
    lbCell.col < ltCell.col ||
    rtCell.row < ltCell.row ||
    (rtCell.colSpan !== 1 &&
      rtCell.col + rtCell.colSpan - rbCell.col - rbCell.colSpan !== 0)
  ) {
    ltCell = getCellByIdx(
      Math.min(ltCell.row, rtCell.row),
      Math.min(ltCell.col, lbCell.col),
      cells
    );
    rbCell = getCellByIdx(
      Math.max(
        lbCell.row + lbCell.rowSpan - 1,
        rbCell.row + rbCell.rowSpan - 1
      ),
      Math.max(
        rtCell.col + rtCell.colSpan - 1,
        rbCell.col + rbCell.colSpan - 1
      ),
      cells
    );

    lbCell = getCellByIdx(
      Math.max(
        lbCell.row + lbCell.rowSpan - 1,
        rbCell.row + rbCell.rowSpan - 1
      ),
      Math.min(ltCell.row, rtCell.row),
      cells
    );
    rtCell = getCellByIdx(
      Math.min(ltCell.row, rtCell.row),
      Math.max(
        rtCell.col + rtCell.colSpan - 1,
        rbCell.col + rbCell.colSpan - 1
      ),
      cells
    );
  }

  return [ltCell, rbCell];
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

export const parseSheetData = (sheetData: SheetData): CellData[][] => {
  const { layout, cells } = sheetData;
  let parsed = Array.from({ length: layout.rows.length }, (_, row) =>
    Array.from({ length: layout.cols.length }, (_, col) => ({
      row: row,
      col: col,
      rowSpan: 1,
      colSpan: 1,
    }))
  ) as CellData[][];

  cells.forEach((cell) => {
    const { row, col, rowSpan = 1, colSpan = 1 } = cell;
    parsed[row][col] = {
      ...cell,
      row,
      col,
      rowSpan,
      colSpan,
      type: CellType.NORMAL,
    };

    if (rowSpan > 1 || colSpan > 1) {
      for (let i = row; i <= row + rowSpan - 1; i++) {
        for (let j = col; j <= col + colSpan - 1; j++) {
          if (i !== row || j !== col) {
            parsed[i][j].type = CellType.PLACEHOLDER;
          }
        }
      }
    }
  });

  return parsed;
};
