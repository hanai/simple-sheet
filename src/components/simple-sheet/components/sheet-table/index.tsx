import React, { memo, useCallback, useEffect, useRef } from 'react';
import {
  CellData,
  CellSelectedState,
  CellType,
  SheetLayout,
  SheetSelectedState,
} from '../../types';
import {
  getBoundaryCellsByCellSelectedState,
  getCellIndexByElement,
  isCellSelected,
} from '../../utils';

import Cell from '../../containers/cell';
import { ContextMenuType } from '../context-menu';

export interface SheetTableProps {
  tableWidth: number;
  layout: SheetLayout;
  cells: CellData[][];
  selection: SheetSelectedState;
  onSelectCells: (state: CellSelectedState) => void;
  onShowContextMenu: (opts: {
    type: ContextMenuType;
    top: number;
    left: number;
  }) => void;
}

const SheetTable = (props: SheetTableProps) => {
  const {
    tableWidth,
    layout,
    selection,
    cells,
    onSelectCells,
    onShowContextMenu,
  } = props;

  const selectingStateRef = useRef({
    flag: false,
    startRow: -1,
    startCol: -1,
  });

  const handleMouseDownOnTable = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!selectingStateRef.current.flag) {
        const [rowIdx, colIdx] = getCellIndexByElement(e.target as HTMLElement);
        if (rowIdx === -1 || colIdx === -1) {
          return;
        }
        if (
          e.button === 0 ||
          (e.button === 2 &&
            (selection.cells == null ||
              rowIdx < selection.cells[0] ||
              rowIdx > selection.cells[2] ||
              colIdx < selection.cells[1] ||
              colIdx > selection.cells[3]))
        ) {
          // select single cell when primary click or secondary button click out of current selection
          onSelectCells([rowIdx, colIdx, rowIdx, colIdx]);
        }

        if (e.button === 0) {
          // only start selection when primary button click
          selectingStateRef.current = {
            flag: true,
            startRow: rowIdx,
            startCol: colIdx,
          };
        }
      }
    },
    [selection.cells, onSelectCells]
  );

  const setSelectedStateWhenMouseMoveOrUp = useCallback(
    (rowIdx: number, colIdx: number) => {
      const { startRow, startCol } = selectingStateRef.current;
      const [startCell, endCell] = getBoundaryCellsByCellSelectedState(cells, [
        Math.min(rowIdx, startRow),
        Math.min(colIdx, startCol),
        Math.max(rowIdx, startRow),
        Math.max(colIdx, startCol),
      ]);

      onSelectCells([
        startCell.row,
        startCell.col,
        endCell.row + endCell.rowSpan - 1,
        endCell.col + endCell.colSpan - 1,
      ]);
    },
    [cells, onSelectCells]
  );

  const handleMouseMoveOnTable = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (selectingStateRef.current.flag) {
        const [rowIdx, colIdx] = getCellIndexByElement(e.target as HTMLElement);
        if (rowIdx === -1 || colIdx === -1) {
          return;
        }
        setSelectedStateWhenMouseMoveOrUp(rowIdx, colIdx);
      }
    },
    [setSelectedStateWhenMouseMoveOrUp]
  );

  const handleMouseUpOnTable = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (selectingStateRef.current.flag) {
        const [rowIdx, colIdx] = getCellIndexByElement(e.target as HTMLElement);
        if (rowIdx === -1 || colIdx === -1) {
          return;
        }
        setSelectedStateWhenMouseMoveOrUp(rowIdx, colIdx);
        selectingStateRef.current.flag = false;
      }
    },
    [setSelectedStateWhenMouseMoveOrUp]
  );

  const handleContextMenuOnTable = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();

      if (selection.cells != null) {
        // has selection
        if (
          selection.cells[0] === selection.cells[2] &&
          selection.cells[1] === selection.cells[3]
        ) {
          // has single cell selected
          onShowContextMenu({
            left: e.pageX,
            top: e.pageY,
            type: ContextMenuType.SINGLE_CELL,
          });
        } else {
          // has multiple cells selected
          onShowContextMenu({
            left: e.pageX,
            top: e.pageY,
            type: ContextMenuType.MULTIPLE_CELL,
          });
        }
      }
    },
    [selection.cells, onShowContextMenu]
  );

  useEffect(() => {
    // hanle mouseup event when mouse out of table area
    const handleMouseUp = () => {
      if (selectingStateRef.current.flag) {
        selectingStateRef.current.flag = false;
      }
    };
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <table
      className="sheet-table"
      style={{
        width: tableWidth,
      }}
      onMouseDown={handleMouseDownOnTable}
      onMouseUp={handleMouseUpOnTable}
      onMouseMove={handleMouseMoveOnTable}
      onContextMenu={handleContextMenuOnTable}
    >
      <colgroup>
        {layout.cols.map((col, colIdx) => (
          <col key={colIdx} style={{ width: col.width }} />
        ))}
      </colgroup>
      <tbody>
        {cells.length
          ? layout.rows.map((row, rowIdx) => (
              <tr key={rowIdx} style={{ height: row.height }}>
                {layout.cols.map((col, colIdx) => {
                  const cellItem = cells[rowIdx][colIdx];
                  if (cellItem && cellItem.type === CellType.NORMAL) {
                    return (
                      <Cell
                        key={colIdx}
                        cell={cellItem}
                        selected={
                          selection.cells != null &&
                          isCellSelected(cellItem, selection.cells)
                        }
                        raw={cellItem.raw as string}
                      />
                    );
                  } else {
                    return null;
                  }
                })}
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
};

export default memo(SheetTable);
