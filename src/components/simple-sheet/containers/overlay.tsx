import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../store';

import Overlay from '../components/overlay';

const OverlayContainer = () => {
  const cells = useSelector((state: RootState) => state.cells);

  const selection = useSelector((state: RootState) => state.selection);
  const layout = useSelector((state: RootState) => state.layout);

  return <Overlay cells={cells} selection={selection} layout={layout} />;
};

export default memo(OverlayContainer);
