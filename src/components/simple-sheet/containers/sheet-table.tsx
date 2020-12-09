import React, { memo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../store';

import SheetTable from '../components/sheet-table';
import { CellSelectedState } from '../types';
import { selectCells } from '../store/slices/selection';
import { show as showContextMenu } from '../store/slices/contextMenu';
import { ContextMenuType } from '../components/context-menu';

const SheetTableContainer = () => {
  const dispatch = useDispatch();
  const tableWidth = useSelector((state: RootState) =>
    state.layout.cols.map((e) => e.width).reduce((sum, v) => sum + v, 0)
  );
  const layout = useSelector((state: RootState) => state.layout);
  const cells = useSelector((state: RootState) => state.cells);

  const selection = useSelector((state: RootState) => state.selection);

  const onSelectCells = useCallback(
    (state: CellSelectedState) => {
      dispatch(selectCells(state));
    },
    [dispatch]
  );

  const onShowContextMenu = useCallback(
    (opts: { type: ContextMenuType; top: number; left: number }) => {
      dispatch(showContextMenu(opts));
    },
    [dispatch]
  );

  return (
    <SheetTable
      selection={selection}
      cells={cells}
      tableWidth={tableWidth}
      layout={layout}
      onSelectCells={onSelectCells}
      onShowContextMenu={onShowContextMenu}
    />
  );
};

export default memo(SheetTableContainer);
