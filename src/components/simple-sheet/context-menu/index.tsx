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
}

const ContextMenu = (props: ContextMenuProps) => {
  const { visible, onHide, top, left } = props;
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

  if (visible) {
    return (
      <div className="sheet-context-menu" style={{ top: top, left: left }}>
        <div className="menu-item">合并单元格</div>
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
