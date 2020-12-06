import React, { memo, useCallback, useRef } from 'react';
import classnames from 'classnames';

export interface RowHeaderItemProps {
  index: number;
  height: number;
  selected: boolean;
  onResize: (index: number, height: number) => void;
  onSelect: (index: number) => void;
}

const RowHeaderItem = (props: RowHeaderItemProps) => {
  const { index, height, selected, onResize, onSelect } = props;

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
      onResize(index, newHeight);
    },
    [index, onResize]
  );

  const handleDragEnd = useCallback(
    (e: React.DragEvent) => {
      const newHeight = e.clientY - startYRef.current + startHeightRef.current;
      onResize(index, newHeight);
    },
    [index, onResize]
  );

  const handleClickHeader = useCallback(() => {
    if (!selected) {
      onSelect(index);
    }
  }, [index, onSelect, selected]);

  return (
    <div
      className={classnames({
        'row-header-item': true,
        selected: selected,
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
