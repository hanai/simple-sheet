import React, { memo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../store';

import RowHeaderItem from '../components/row-header-item';
import { setRowLayout } from '../store/slices/layout';
import { selectRows } from '../store/slices/selection';

const RowHeaderItemContainer = (props: { index: number }) => {
  const { index } = props;
  const dispatch = useDispatch();
  const selection = useSelector((state: RootState) => state.selection.rows);
  const rowLayout = useSelector((state: RootState) => state.layout.rows[index]);

  const selected = selection.indexOf(index) > -1;

  const onResize = useCallback(
    (height) => {
      dispatch(
        setRowLayout({
          index,
          height: height,
        })
      );
    },
    [dispatch, index]
  );

  const onSelect = useCallback(() => {
    dispatch(selectRows([index]));
  }, [dispatch, index]);

  return (
    <RowHeaderItem
      index={index}
      height={rowLayout.height}
      selected={selected}
      onResize={onResize}
      onSelect={onSelect}
    />
  );
};

export default memo(RowHeaderItemContainer);
