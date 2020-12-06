import React, { memo, useCallback } from 'react';
import RowHeaderItem from '../row-header-item';
import { defaultCellHeight } from '../constants';

import './style.scss';

export interface RowHeaderContainerProps {
  layout: { height: number }[];
  onResize: (idx: number, width: number) => void;
  onSelect: (rows: number[]) => void;
  selectedItems: number[];
}

const RowHeaderContainer = (props: RowHeaderContainerProps) => {
  const { layout, onSelect, onResize, selectedItems } = props;
  const handleResizeRowHeaderItem = useCallback(
    (idx, height) => {
      if (height < defaultCellHeight) return;
      onResize(idx, height);
    },
    [onResize]
  );

  const handleSelectRowHeader = useCallback(
    (idx) => {
      onSelect && onSelect([idx]);
    },
    [onSelect]
  );

  return (
    <div className="rows-header-container">
      {layout.map((row, idx) => (
        <RowHeaderItem
          key={idx}
          height={row.height}
          index={idx}
          onSelect={handleSelectRowHeader}
          selected={selectedItems.indexOf(idx) > -1}
          onResize={handleResizeRowHeaderItem}
        />
      ))}
    </div>
  );
};

export default memo(RowHeaderContainer);
