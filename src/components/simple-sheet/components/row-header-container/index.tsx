import React, { memo } from 'react';

import RowHeaderItem from '../../containers/row-header-item';

import './style.scss';

export interface RowHeaderContainerProps {
  rowCount: number;
}

const RowHeaderContainer = (props: RowHeaderContainerProps) => {
  const { rowCount } = props;
  return (
    <div className="rows-header-container">
      {Array.from({ length: rowCount }, (_, idx) => (
        <RowHeaderItem key={idx} index={idx} />
      ))}
    </div>
  );
};

export default memo(RowHeaderContainer);
