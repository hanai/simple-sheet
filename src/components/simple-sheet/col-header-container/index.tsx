import React, { memo, useCallback } from 'react';

import ColHeaderItem from '../col-header-item';
import { defaultCellWidth } from '../constants';

import './style.scss';
export interface ColHeaderContainerProps {
  layout: { width: number }[];
  onResize: (idx: number, width: number) => void;
  onSelect: (rows: number[]) => void;
  selectedItems: number[];
}

const ColHeaderContainer = (props: ColHeaderContainerProps) => {
  const { layout, onSelect, onResize, selectedItems } = props;
  const handleResizeColHeaderItem = useCallback(
    (idx, width) => {
      if (width < defaultCellWidth) return;
      onResize(idx, width);
    },
    [onResize]
  );

  const handleSelectColHeader = useCallback(
    (idx) => {
      onSelect && onSelect([idx]);
    },
    [onSelect]
  );

  return (
    <div className="cols-header-container">
      {layout.map((col, idx) => (
        <ColHeaderItem
          key={idx}
          width={col.width}
          index={idx}
          onSelect={handleSelectColHeader}
          selected={selectedItems.indexOf(idx) > -1}
          onResize={handleResizeColHeaderItem}
        />
      ))}
    </div>
  );
};

export default memo(ColHeaderContainer);
