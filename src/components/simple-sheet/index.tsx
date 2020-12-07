import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  getCellIndexByElement,
  getDefaultSelectedState,
  getDefaultSheetData,
  isCellSelected,
  parseSheetData,
} from './utils';

import {
  CellSelectedState,
  SheetLayout,
  SheetSelectedState,
  SparseCellDatas,
} from './types';
import RowHeaderContainer from './row-header-container';
import ColHeaderContainer from './col-header-container';
import { ContextMenuType, show as showContextMenu } from './context-menu';
import SheetOverlay from './overlay';
import Cell from './cell';

import * as ContextMenuMethods from './utils/context-menu-methods';

import './style.scss';

const SHEET_DATA = getDefaultSheetData();

const SimpleSheet = (props) => {
  const [layout, setLayout] = useState<SheetLayout>(SHEET_DATA.layout);

  const [cells, setCells] = useState<SparseCellDatas>(() =>
    parseSheetData(SHEET_DATA)
  );

  const [tableWidth, setTableWidth] = useState<number>();

  const selectingStateRef = useRef({
    flag: false,
    startRow: -1,
    startCol: -1,
  });

  const [selectedState, setSelectedState] = useState<SheetSelectedState>(
    getDefaultSelectedState
  );

  useEffect(() => {
    // calculate table width when layout change
    setTableWidth(layout.cols.map((e) => e.width).reduce((sum, v) => sum + v));
  }, [layout]);

  const handleCellChange = (rowIdx, colIdx, value) => {
    console.log(rowIdx, colIdx, value);
  };

  const handleResizeCols = useCallback((idx, width) => {
    setLayout((layout) => ({
      ...layout,
      cols: [
        ...layout.cols.slice(0, idx),
        {
          width: width,
        },
        ...layout.cols.slice(idx + 1),
      ],
    }));
  }, []);

  const handleResizeRows = useCallback((idx, height) => {
    setLayout((layout) => ({
      ...layout,
      rows: [
        ...layout.rows.slice(0, idx),
        {
          height: height,
        },
        ...layout.rows.slice(idx + 1),
      ],
    }));
  }, []);

  const handleSelectRows = useCallback((rows) => {
    setSelectedState(() => {
      return {
        cols: [],
        rows: rows,
        cells: null,
      };
    });
  }, []);

  const handleSelectCols = useCallback((cols) => {
    setSelectedState(() => {
      return {
        rows: [],
        cols: cols,
        cells: null,
      };
    });
  }, []);

  const handleMouseDownOnTable = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!selectingStateRef.current.flag) {
        const [rowIdx, colIdx] = getCellIndexByElement(e.target as HTMLElement);
        if (
          e.button === 0 ||
          (e.button === 2 &&
            (selectedState.cells == null ||
              rowIdx < selectedState.cells[0] ||
              rowIdx > selectedState.cells[2] ||
              colIdx < selectedState.cells[1] ||
              colIdx > selectedState.cells[3]))
        ) {
          // select single cell when primary click or secondary button click out of current selection
          setSelectedState(() => {
            return {
              rows: [],
              cols: [],
              cells: [rowIdx, colIdx, rowIdx, colIdx],
            };
          });
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
    [selectedState.cells]
  );

  const setSelectedStateWhenMouseMoveOrUp = useCallback(
    (rowIdx: number, colIdx: number) => {
      setSelectedState(() => {
        const { startRow, startCol } = selectingStateRef.current;
        return {
          rows: [],
          cols: [],
          cells: [
            Math.min(rowIdx, startRow),
            Math.min(colIdx, startCol),
            Math.max(rowIdx, startRow),
            Math.max(colIdx, startCol),
          ],
        };
      });
    },
    []
  );

  const handleMouseMoveOnTable = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (selectingStateRef.current.flag) {
        const [rowIdx, colIdx] = getCellIndexByElement(e.target as HTMLElement);
        setSelectedStateWhenMouseMoveOrUp(rowIdx, colIdx);
      }
    },
    [setSelectedStateWhenMouseMoveOrUp]
  );

  const handleMouseUpOnTable = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (selectingStateRef.current.flag) {
        const [rowIdx, colIdx] = getCellIndexByElement(e.target as HTMLElement);
        setSelectedStateWhenMouseMoveOrUp(rowIdx, colIdx);
        selectingStateRef.current.flag = false;
      }
    },
    [setSelectedStateWhenMouseMoveOrUp]
  );

  const handleContextMenuOnTable = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (selectedState.cells != null) {
      if (
        selectedState.cells[0] === selectedState.cells[2] &&
        selectedState.cells[1] === selectedState.cells[3]
      ) {
        showContextMenu({
          left: e.pageX,
          top: e.pageY,
          type: ContextMenuType.SINGLE_CELL,
          onClickClearContent() {
            ContextMenuMethods.clearContext(
              selectedState.cells as CellSelectedState,
              setCells
            );
          },
        });
      } else {
        showContextMenu({
          left: e.pageX,
          top: e.pageY,
          type: ContextMenuType.MULTIPLE_CELL,
          onClickClearContent() {
            ContextMenuMethods.clearContext(
              selectedState.cells as CellSelectedState,
              setCells
            );
          },
          onClickMergeCells() {
            ContextMenuMethods.mergeCells(
              selectedState.cells as CellSelectedState,
              setCells
            );
          },
        });
      }
    }
  };

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
    <div className="sheet-container">
      <div className="sheet-header"></div>
      <RowHeaderContainer
        selectedItems={selectedState.rows}
        onSelect={handleSelectRows}
        layout={layout.rows}
        onResize={handleResizeRows}
      />
      <ColHeaderContainer
        selectedItems={selectedState.cols}
        onSelect={handleSelectCols}
        layout={layout.cols}
        onResize={handleResizeCols}
      />
      <SheetOverlay
        cells={cells}
        selectedState={selectedState}
        layout={layout}
      />
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
          {layout.rows.map((row, rowIdx) => (
            <tr key={rowIdx} style={{ height: row.height }}>
              {layout.cols.map((col, colIdx) => {
                const cellItem = cells[rowIdx][colIdx];
                if (cellItem) {
                  return (
                    <Cell
                      onChange={handleCellChange.bind(null, rowIdx, colIdx)}
                      key={colIdx}
                      cell={cellItem}
                      selected={
                        selectedState.cells != null &&
                        isCellSelected(cellItem, selectedState.cells)
                      }
                      raw={cellItem.raw}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default SimpleSheet;
