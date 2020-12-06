export interface SheetLayout {
  cols: { width: number }[];
  rows: { height: number }[];
}

export interface CellSelectedState {
  start: [number, number];
  end: [number, number];
}

export interface SheetSelectedState {
  cols: number[];
  rows: number[];
  cells: CellSelectedState | null;
}

export interface CellData {
  row: number;
  col: number;
  raw: string;
  rowSpan?: number;
  colSpan?: number;
}
export interface SheetData {
  cells: CellData[];
  layout: SheetLayout;
}
