import React, { memo, useCallback, useRef } from 'react';
import classnames from 'classnames';
import { numberToLetter } from '../../utils';

import { defaultCellWidth } from '../../constants';

import './style.scss';
export interface ColHeaderItemProps {
  index: number;
  selected: boolean;
  width: number;
  onResize: (width: number) => void;
  onSelect: () => void;
}

const ColHeaderItem = (props: ColHeaderItemProps) => {
  const { index, selected, width, onResize, onSelect } = props;

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
      if (newWidth < defaultCellWidth) return;
      onResize(newWidth);
    },
    [onResize]
  );

  const handleDragEnd = useCallback(
    (e: React.DragEvent) => {
      const newWidth = e.clientX - startXRef.current + startWidthRef.current;
      if (newWidth < defaultCellWidth) return;
      onResize(newWidth);
    },
    [onResize]
  );

  const handleClickHeader = useCallback(() => {
    onSelect();
  }, [onSelect]);

  return (
    <div
      className={classnames({
        'col-header-item': true,
        active: selected,
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
