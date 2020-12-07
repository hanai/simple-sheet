import React, {
  useState,
  useRef,
  CSSProperties,
  KeyboardEvent,
  useCallback,
  memo,
} from 'react';
import classnames from 'classnames';

import { setCaretToEnd } from '../utils';
import { CellData } from '../types';

interface CellProps {
  raw: string;
  style?: CSSProperties;
  cell: CellData;
  selected: boolean;
  onChange: (value: string) => void;
  onSelect?: (rowIdx: number, colIdx: number) => void;
}

const Cell = (props: CellProps) => {
  const { raw, style, cell, selected, onChange, onSelect } = props;
  const contentWrapperRef = useRef<HTMLInputElement>(null);

  const [edit, setEdit] = useState(false);

  const handleDoubleClick = useCallback(() => {
    if (!edit) {
      setEdit(true);
      setTimeout(() => {
        setCaretToEnd(contentWrapperRef.current as HTMLElement);
      }, 0);
    }
  }, [edit]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        setEdit(false);
        if (contentWrapperRef.current) {
          const newValue = contentWrapperRef.current.innerText;
          if (newValue !== raw) {
            onChange(newValue);
          }
        }
      }
    },
    [onChange, raw]
  );

  const handleClickCell = useCallback(() => {
    onSelect && onSelect(cell.row, cell.col);
  }, [cell.row, cell.col, onSelect]);

  const handleBlur = useCallback(() => {
    if (edit) {
      setEdit(false);
    }
  }, [edit]);

  return (
    <td
      onDoubleClick={handleDoubleClick}
      onClick={handleClickCell}
      className="cell"
      style={style}
      rowSpan={cell.rowSpan}
      colSpan={cell.colSpan}
      data-row-idx={cell.row}
      data-col-idx={cell.col}
    >
      <div
        className={classnames({
          'cell-content-wrapper': true,
          active: edit,
        })}
        onBlur={handleBlur}
        ref={contentWrapperRef}
        contentEditable={edit}
        suppressContentEditableWarning={true}
        onKeyPress={handleKeyPress}
      >
        {cell.getValue()}
      </div>
    </td>
  );
};

export default memo(Cell);
