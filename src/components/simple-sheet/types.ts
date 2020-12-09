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

export enum CellType {
  NORMAL,
  PLACEHOLDER,
}
export interface CellData {
  row: number;
  col: number;
  raw?: string;
  rowSpan: number;
  colSpan: number;
  type: CellType;
}
export interface SheetData {
  cells: {
    row: number;
    col: number;
    raw: string;
    rowSpan?: number;
    colSpan?: number;
  }[];
  layout: SheetLayout;
}

export type CellIndex = [number, number];
