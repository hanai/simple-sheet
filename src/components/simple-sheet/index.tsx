import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  getCellIndexByElement,
  getDefaultSelectedState,
  getDefaultSheetData,
  isCellSelected,
  parseSheetData,
} from './utils';

import Cell from './cell';

import './style.scss';
import { SheetLayout, SheetSelectedState } from './types';
import RowHeaderContainer from './row-header-container';
import ColHeaderContainer from './col-header-container';
import { ContextMenuType, show as showContextMenu } from './context-menu';
import SheetOverlay from './overlay';

const SHEET_DATA = getDefaultSheetData();

const SimpleSheet = (props) => {
  const [layout, setLayout] = useState<SheetLayout>(SHEET_DATA.layout);

  const [cells, setCells] = useState(() => parseSheetData(SHEET_DATA));

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
        if (e.button === 0 || e.button === 2) {
          // select single cell when primary/secondary button click
          setSelectedState(() => {
            return {
              rows: [],
              cols: [],
              cells: {
                start: [rowIdx, colIdx],
                end: [rowIdx, colIdx],
              },
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
    []
  );

  const setSelectedStateWhenMouseMoveOrUp = useCallback(
    (rowIdx: number, colIdx: number) => {
      setSelectedState(() => {
        const { startRow, startCol } = selectingStateRef.current;
        return {
          rows: [],
          cols: [],
          cells: {
            start: [Math.min(rowIdx, startRow), Math.min(colIdx, startCol)],
            end: [Math.max(rowIdx, startRow), Math.max(colIdx, startCol)],
          },
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

    if (selectedState.cells) {
      if (
        selectedState.cells.start.join(',') ===
        selectedState.cells.end.join(',')
      ) {
        showContextMenu({
          left: e.pageX,
          top: e.pageY,
          type: ContextMenuType.SINGLE_CELL,
        });
      } else {
        showContextMenu({
          left: e.pageX,
          top: e.pageY,
          type: ContextMenuType.MULTIPLE_CELL,
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
                      rowIdx={rowIdx}
                      colIdx={colIdx}
                      rowSpan={cellItem.rowSpan || 1}
                      colSpan={cellItem.colSpan || 1}
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
