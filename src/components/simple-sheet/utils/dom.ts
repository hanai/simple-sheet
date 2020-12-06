export const getCellIndexByElement = (el: HTMLElement): [number, number] => {
  if (el == null) {
    return [-1, -1];
  }

  const td = el.closest('td');

  const rowIdx = parseInt(td?.getAttribute('data-row-idx') || '-1', 10);
  const colIdx = parseInt(td?.getAttribute('data-col-idx') || '-1', 10);

  return [rowIdx, colIdx];
};
