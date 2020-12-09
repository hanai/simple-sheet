import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import RowHeaderItem from '../../containers/row-header-item';

import './style.scss';
import { RootState } from '../../store';

export interface RowHeaderContainerProps {}

const RowHeaderContainer = (props: RowHeaderContainerProps) => {
  const rowsLayout = useSelector((state: RootState) => state.layout.rows);
  return (
    <div className="rows-header-container">
      {rowsLayout.map((row, idx) => (
        <RowHeaderItem key={idx} index={idx} />
      ))}
    </div>
  );
};

export default memo(RowHeaderContainer);
