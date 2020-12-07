export interface SheetLayout {
  cols: { width: number }[];
  rows: { height: number }[];
}

export type CellSelectedState = [
  number,
  number,
  number,
  number
]; /* row1, col1, row2, col2 */

export interface SheetSelectedState {
  cols: number[];
  rows: number[];
  cells: CellSelectedState | null;
}

export type SparseCellDatas = (CellData | undefined)[][];

export interface PlainCellData {
  row: number;
  col: number;
  raw: string;
  rowSpan?: number;
  colSpan?: number;
}

export interface CellData {
  row: number;
  col: number;
  raw: string;
  rowSpan: number;
  colSpan: number;
}
export class CellData {
  constructor(data: {
    row: number;
    col: number;
    raw: string;
    rowSpan?: number;
    colSpan?: number;
  }) {
    this.row = data.row;
    this.col = data.col;
    this.raw = data.raw;
    this.rowSpan = data.rowSpan || 1;
    this.colSpan = data.colSpan || 1;
  }

  setValue(value: string) {
    this.raw = value;
  }

  getValue() {
    return this.raw;
  }
}
export interface SheetData {
  cells: PlainCellData[];
  layout: SheetLayout;
}
