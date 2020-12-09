import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

import Container from '../components/col-header-container';

const ColHeaderContainer = () => {
  const colCount = useSelector((state: RootState) => state.layout.cols.length);

  return <Container colCount={colCount} />;
};

export default memo(ColHeaderContainer);
