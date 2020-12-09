import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import Container from '../components/row-header-container';
import { RootState } from '../store';

const RowHeaderContainer = () => {
  const rowCount = useSelector((state: RootState) => state.layout.rows.length);
  return <Container rowCount={rowCount} />;
};

export default memo(RowHeaderContainer);
