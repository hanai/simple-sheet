import React, { memo, useCallback, useRef } from 'react';
import classnames from 'classnames';
import { numberToLetter } from '../utils';

import './style.scss';

export interface ColHeaderItemProps {
  index: number;
  width: number;
  selected: boolean;
  onResize: (index: number, height: number) => void;
  onSelect: (index: number) => void;
}

const ColHeaderItem = (props: ColHeaderItemProps) => {
  const { index, width, onResize, selected, onSelect } = props;
  const startXRef = useRef<number>(0);
  const startWidthRef = useRef<number>(width);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleDragStart = useCallback(
    (e: React.DragEvent) => {
      startXRef.current = e.clientX;
      startWidthRef.current = width;
      triggerRef.current?.setPointerCapture(1);
    },
    [width]
  );

  const handleDrag = useCallback(
    (e: React.DragEvent) => {
      const newWidth = e.clientX - startXRef.current + startWidthRef.current;
      onResize(index, newWidth);
    },
    [index, onResize]
  );

  const handleDragEnd = useCallback(
    (e: React.DragEvent) => {
      const newWidth = e.clientX - startXRef.current + startWidthRef.current;
      onResize(index, newWidth);
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
        'col-header-item': true,
        selected: selected,
      })}
      onClick={handleClickHeader}
      style={{ width: width }}
    >
      {numberToLetter(index + 1)}
      <div
        ref={triggerRef}
        draggable="true"
        className="col-header-trigger"
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
      ></div>
    </div>
  );
};

export default memo(ColHeaderItem);
