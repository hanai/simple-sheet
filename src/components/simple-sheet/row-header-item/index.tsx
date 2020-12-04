import React, { useCallback, useRef } from 'react';

export interface RowHeaderItemProps {
  index: number;
  height: number;
  onResize: (index: number, height: number) => void;
}

const RowHeaderItem = (props: RowHeaderItemProps) => {
  const { index, height, onResize } = props;

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

  return (
    <div className="row-header-item" style={{ height: height }}>
      {index}
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

export default RowHeaderItem;
