import React, { memo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../store';

import ColHeaderItem from '../components/col-header-item';
import { setColLayout } from '../store/slices/layout';
import { selectCols } from '../store/slices/selection';

const ColHeaderItemContainer = (props: { index: number }) => {
  const { index } = props;
  const dispatch = useDispatch();
  const selection = useSelector((state: RootState) => state.selection.cols);
  const colLayout = useSelector((state: RootState) => state.layout.cols[index]);

  const selected = selection.indexOf(index) > -1;

  const onResize = useCallback(
    (width) => {
      dispatch(
        setColLayout({
          index,
          width: width,
        })
      );
    },
    [dispatch, index]
  );

  const onSelect = useCallback(() => {
    dispatch(selectCols([index]));
  }, [dispatch, index]);

  return (
    <ColHeaderItem
      index={index}
      width={colLayout.width}
      selected={selected}
      onResize={onResize}
      onSelect={onSelect}
    />
  );
};

export default memo(ColHeaderItemContainer);
