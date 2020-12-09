import React, { memo } from 'react';
import ColHeaderItem from '../../containers/col-header-item';

import './style.scss';
export interface ColHeaderContainerProps {
  colCount: number;
}

const ColHeaderContainer = (props: ColHeaderContainerProps) => {
  const { colCount } = props;
  return (
    <div className="cols-header-container">
      {Array.from({ length: colCount }, (_, idx) => (
        <ColHeaderItem key={idx} index={idx} />
      ))}
    </div>
  );
};

export default memo(ColHeaderContainer);
