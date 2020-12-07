import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import './style.scss';

export enum ContextMenuType {
  'SINGLE_CELL',
  'MULTIPLE_CELL',
}

export interface ContextMenuProps {
  visible?: boolean;
  onHide?: () => void;
  top: number;
  left: number;
  type: ContextMenuType;
  onClickMergeCells?: () => void;
  onClickClearContent?: () => void;
}

const ContextMenu = (props: ContextMenuProps) => {
  const {
    visible,
    type,
    top,
    left,
    onHide,
    onClickMergeCells,
    onClickClearContent,
  } = props;
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (visible) {
        if (e.target != null) {
          const node = (e.target as HTMLElement).closest('.sheet-context-menu');
          if (!node) {
            onHide && onHide();
          }
        } else {
          onHide && onHide();
        }
      }
    };

    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
    };
  }, [onHide, visible]);

  const menus = [
    {
      label: '清空内容',
      type: [ContextMenuType.SINGLE_CELL, ContextMenuType.MULTIPLE_CELL],
      onClick: () => {
        onClickClearContent && onClickClearContent();
        onHide && onHide();
      },
    },
    {
      label: '合并单元格',
      type: [ContextMenuType.MULTIPLE_CELL],
      onClick: () => {
        onClickMergeCells && onClickMergeCells();
        onHide && onHide();
      },
    },
  ];

  if (visible) {
    return (
      <div className="sheet-context-menu" style={{ top: top, left: left }}>
        {menus
          .filter((e) => e.type.includes(type))
          .map((e) => (
            <div key={e.label} onClick={e.onClick} className="menu-item">
              {e.label}
            </div>
          ))}
      </div>
    );
  } else {
    return null;
  }
};

ContextMenu.defaultProps = {
  visible: false,
  onHide() {},
};

export default ContextMenu;

let container;

export const show = (props: ContextMenuProps) => {
  if (!container) {
    container = document.createElement('div');
    document.body.appendChild(container);
  }
  ReactDOM.render(
    <ContextMenu
      {...props}
      visible={true}
      onHide={() => ReactDOM.unmountComponentAtNode(container)}
    />,
    container
  );
};
