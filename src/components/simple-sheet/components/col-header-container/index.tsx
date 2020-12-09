import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import ColHeaderItem from '../../containers/col-header-item';
import { RootState } from '../../store';

import './style.scss';
export interface ColHeaderContainerProps {}

const ColHeaderContainer = (props: ColHeaderContainerProps) => {
  const colsLayout = useSelector((state: RootState) => state.layout.cols);
  return (
    <div className="cols-header-container">
      {colsLayout.map((col, idx) => (
        <ColHeaderItem key={idx} index={idx} />
      ))}
    </div>
  );
};

export default memo(ColHeaderContainer);
