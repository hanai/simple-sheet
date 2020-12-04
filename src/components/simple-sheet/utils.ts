import { defaultCellHeight, defaultCellWidth } from './constants';
import { SheetLayout } from './types';

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
