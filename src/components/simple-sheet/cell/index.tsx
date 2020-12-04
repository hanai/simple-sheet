import React, {
  useState,
  useRef,
  CSSProperties,
  KeyboardEvent,
  useCallback,
} from 'react';
import classnames from 'classnames';

import { setCaretToEnd } from '../utils';

interface CellProps {
  raw: string;
  style?: CSSProperties;
  onChange: (value: string) => void;
}

const Cell = (props: CellProps) => {
  const { raw, style, onChange } = props;
  const contentWrapperRef = useRef<HTMLInputElement>(null);

  const [edit, setEdit] = useState(false);

  const handleDoubleClick = useCallback(() => {
    setEdit(true);
    setTimeout(() => {
      setCaretToEnd(contentWrapperRef.current as HTMLElement);
    }, 0);
  }, []);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        console.log(e);
        e.preventDefault();
        setEdit(false);
        if (contentWrapperRef.current) {
          const newValue = contentWrapperRef.current.innerText;
          if (newValue !== raw) {
            console.log('changed');
            onChange(newValue);
          } else {
            console.log('unchanged');
          }
        }
      }
    },
    [onChange, raw]
  );

  return (
    <td onDoubleClick={handleDoubleClick} className="cell" style={style}>
      <div
        className={classnames('cell-content-wrapper', edit ? 'active' : null)}
        ref={contentWrapperRef}
        contentEditable={edit}
        suppressContentEditableWarning={true}
        onKeyPress={handleKeyPress}
      >
        {raw}
      </div>
    </td>
  );
};

export default Cell;
