import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Cell, { CellProps } from '../components/cell';
import { updateCellRawValue } from '../store/slices/cells';

export type CellContainerProps = Omit<CellProps, 'onChange'>;

const CellContainer = (props: CellContainerProps) => {
  const { row, col } = props.cell;
  const { dispatch } = useDispatch();
  const onChangeCell = useCallback(
    (value) => {
      dispatch(
        updateCellRawValue({
          index: [row, col],
          raw: value,
        })
      );
    },
    [row, col, dispatch]
  );

  return <Cell {...props} onChange={onChangeCell} />;
};

export default memo(CellContainer);
