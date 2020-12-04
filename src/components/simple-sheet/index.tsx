import React, { useCallback, useEffect, useState } from 'react';

import { getDefaultLayout, numberToLetter } from './utils';

import Cell from './cell';

import './style.scss';
import { SheetLayout } from './types';
import RowHeaderItem from './row-header-item';
import { defaultCellHeight } from './constants';

const SimpleSheet = (props) => {
  const [layout, setLayout] = useState<SheetLayout>(() => {
    return getDefaultLayout(5, 5);
  });

  const [tableWidth, setTableWidth] = useState<number>();

  useEffect(() => {
    setTableWidth(layout.cols.map((e) => e.width).reduce((sum, v) => sum + v));
  }, [layout]);

  const handleCellChange = (rowIdx, colIdx, value) => {
    console.log(rowIdx, colIdx, value);
  };

  const handleResizeRowHeaderItem = useCallback((idx, height) => {
    if (height < defaultCellHeight) return;
    setLayout((layout) => {
      const rows = layout.rows;
      const newRow = { ...layout[idx], height };
      return {
        cols: layout.cols,
        rows: [...rows.slice(0, idx), newRow, ...rows.slice(idx + 1)],
      };
    });
  }, []);

  return (
    <div className="sheet-container">
      <div className="sheet-header"></div>
      <div className="rows-header-container">
        {layout.rows.map((row, idx) => (
          <RowHeaderItem
            height={row.height}
            index={idx}
            onResize={handleResizeRowHeaderItem}
          />
        ))}
      </div>
      <div className="cols-header-container">
        {layout.cols.map((col, idx) => (
          <div
            key={idx}
            className="col-header-item"
            style={{ width: col.width }}
          >
            {numberToLetter(idx + 1)}
            <div className="col-header-trigger"></div>
          </div>
        ))}
      </div>
      <table
        className="sheet-table"
        style={{
          width: tableWidth,
        }}
      >
        <colgroup>
          {layout.cols.map((col, colIdx) => (
            <col key={colIdx} style={{ width: col.width }} />
          ))}
        </colgroup>
        <tbody>
          {layout.rows.map((row, rowIdx) => (
            <tr key={rowIdx} style={{ height: row.height }}>
              {layout.cols.map((col, colIdx) => (
                <Cell
                  onChange={handleCellChange.bind(null, rowIdx, colIdx)}
                  key={colIdx}
                  raw={colIdx.toString() + 'asfdasfdadsf'}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SimpleSheet;
