import React, { memo } from 'react';

import { SparseCellDatas, SheetLayout, SheetSelectedState } from '../types';
import { getBoundaryCellsByCellSelectedState } from '../utils';

import './style.scss';

export interface OverlayProps {
  selectedState: SheetSelectedState;
  layout: SheetLayout;
  cells: SparseCellDatas;
}

const Overlay = (props: OverlayProps) => {
  const { selectedState, layout, cells } = props;
  const { cells: cellSeletedState } = selectedState;

  if (cellSeletedState != null) {
    const [startCell, endCell] = getBoundaryCellsByCellSelectedState(
      cells,
      cellSeletedState
    );

    if (startCell == null || endCell == null) return null;

    const { row: minR, col: minC } = startCell;
    let { row: maxR, col: maxC } = endCell;

    maxR = maxR + (endCell.rowSpan || 1) - 1;
    maxC = maxC + (endCell.colSpan || 1) - 1;

    let selectionL = 0;
    let selectionR = 0;
    let selectionT = 0;
    let selectionB = 0;
    for (let i = 0; i < layout.cols.length; i++) {
      const col = layout.cols[i];
      if (i < minC) {
        selectionL += col.width;
      }
      if (i <= maxC) {
        selectionR += col.width;
      } else {
        break;
      }
    }

    for (let i = 0; i < layout.rows.length; i++) {
      const row = layout.rows[i];
      if (i < minR) {
        selectionT += row.height;
      }
      if (i <= maxR) {
        selectionB += row.height;
      } else {
        break;
      }
    }

    return (
      <div className="sheet-overlay">
        <div
          className="selection-l"
          style={{
            left: selectionL,
            top: selectionT,
            height: selectionB - selectionT,
          }}
        ></div>
        <div
          className="selection-r"
          style={{
            left: selectionR,
            top: selectionT,
            height: selectionB - selectionT,
          }}
        ></div>
        <div
          className="selection-t"
          style={{
            left: selectionL,
            top: selectionT,
            width: selectionR - selectionL,
          }}
        ></div>
        <div
          className="selection-b"
          style={{
            left: selectionL,
            top: selectionB,
            width: selectionR - selectionL,
          }}
        ></div>
      </div>
    );
  } else {
    return null;
  }
};

export default memo(Overlay);
