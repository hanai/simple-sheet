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

interface CellProps {
  raw: string;
  style?: CSSProperties;
  rowIdx: number;
  colIdx: number;
  rowSpan?: number;
  colSpan?: number;
  selected: boolean;
  onChange: (value: string) => void;
  onSelect?: (rowIdx: number, colIdx: number) => void;
}

const Cell = (props: CellProps) => {
  const {
    raw,
    style,
    rowIdx,
    colIdx,
    rowSpan,
    colSpan,
    selected,
    onChange,
    onSelect,
  } = props;
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
      console.log(e);
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
    onSelect && onSelect(rowIdx, colIdx);
  }, [rowIdx, colIdx, onSelect]);

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
      rowSpan={rowSpan}
      colSpan={colSpan}
      onKeyDown={() => console.log('y')}
      data-row-idx={rowIdx}
      data-col-idx={colIdx}
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
        onKeyDown={() => console.log('x')}
      >
        {raw}
      </div>
    </td>
  );
};

export default memo(Cell);
