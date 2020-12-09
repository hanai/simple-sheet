import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';

import { setLayout } from './store/slices/layout';

import store from './store';

import { getDefaultSheetData, parseSheetData } from './utils';

import RowHeaderContainer from './components/row-header-container';
import ColHeaderContainer from './components/col-header-container';

import { setCells } from './store/slices/cells';

import ContextMenu from './containers/context-menu';
import SheetOverlay from './containers/overlay';
import SheetTable from './containers/sheet-table';

import './style.scss';

const SHEET_DATA = getDefaultSheetData();

const SimpleSheet = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCells(parseSheetData(SHEET_DATA)));
    dispatch(setLayout(SHEET_DATA.layout));
  }, [dispatch]);

  return (
    <div className="sheet-container">
      <div className="sheet-header"></div>
      <RowHeaderContainer />
      <ColHeaderContainer />
      <ContextMenu />
      <SheetOverlay />
      <SheetTable />
    </div>
  );
};
const SimpleSheetWithStore = () => {
  return (
    <Provider store={store}>
      <SimpleSheet />
    </Provider>
  );
};

export default SimpleSheetWithStore;
