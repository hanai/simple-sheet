import React, { memo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../store';
import { hide as hideContextMenu } from '../store/slices/contextMenu';
import { clearContent, mergeCells } from '../store/slices/cells';
import ContextMenu from '../components/context-menu';

const ContextMenuContainer = () => {
  const { left, top, visible, type } = useSelector(
    (state: RootState) => state.contextMenu
  );
  const selection = useSelector((state: RootState) => state.selection);
  const dispatch = useDispatch();

  const onHide = useCallback(() => {
    dispatch(hideContextMenu());
  }, [dispatch]);

  const onClearContent = useCallback(() => {
    const cells = selection.cells;
    dispatch(clearContent(cells));
  }, [selection.cells, dispatch]);

  const onMergeCells = useCallback(() => {
    const cells = selection.cells;
    dispatch(mergeCells(cells));
  }, [selection.cells, dispatch]);

  return (
    <ContextMenu
      onHide={onHide}
      type={type}
      left={left}
      top={top}
      visible={visible}
      onClickClearContent={onClearContent}
      onClickMergeCells={onMergeCells}
    />
  );
};

export default memo(ContextMenuContainer);
