import React, { memo, useCallback, useRef } from 'react';
import classnames from 'classnames';
import { defaultCellHeight } from '../../constants';

export interface RowHeaderItemProps {
  index: number;
  selected: boolean;
  height: number;
  onResize: (height: number) => void;
  onSelect: () => void;
}

const RowHeaderItem = (props: RowHeaderItemProps) => {
  const { index, selected, height, onResize, onSelect } = props;

  const startYRef = useRef<number>(0);
  const startHeightRef = useRef<number>(height);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleDragStart = useCallback(
    (e: React.DragEvent) => {
      startYRef.current = e.clientY;
      startHeightRef.current = height;
      triggerRef.current?.setPointerCapture(1);
    },
    [height]
  );

  const handleDrag = useCallback(
    (e: React.DragEvent) => {
      const newHeight = e.clientY - startYRef.current + startHeightRef.current;
      if (newHeight < defaultCellHeight) return;
      onResize(newHeight);
    },
    [onResize]
  );

  const handleDragEnd = useCallback(
    (e: React.DragEvent) => {
      const newHeight = e.clientY - startYRef.current + startHeightRef.current;
      if (newHeight < defaultCellHeight) return;
      onResize(newHeight);
    },
    [onResize]
  );

  const handleClickHeader = useCallback(() => {
    onSelect();
  }, [onSelect]);

  return (
    <div
      className={classnames({
        'row-header-item': true,
        active: selected,
      })}
      style={{ height: height }}
      onClick={handleClickHeader}
    >
      {index + 1}
      <div
        ref={triggerRef}
        draggable="true"
        className="row-header-trigger"
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
      ></div>
    </div>
  );
};

export default memo(RowHeaderItem);
