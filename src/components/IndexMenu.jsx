import React from 'react';

import Icon from './Icon';

const StatusIcon = () => (
  <span
    style={{
      width: 16,
      height: 16,
      borderRadius: '50%',
      position: 'absolute',
      top: -8,
      left: 'calc(50% - 8px)',
    }}
    className="status-bullet-em-ajuste"
  />
);

const IndexMenu = ({ children, className }) => (
  <ul className={`d-flex m-0 ${className}`}>{children}</ul>
);

const Item = ({ index, active = false, onClick, isAdjustRequested }) => (
  <li className="mr-2 d-flex align-items-center">
    <button
      variant="primary"
      className={`d-flex position-relative justify-content-center align-items-center rounded index text-light border-0 ${
        active ? ' bg-primary' : ''
      }`}
      onClick={onClick}
      type="button"
    >
      {isAdjustRequested ? <StatusIcon /> : <></>}
      {index}
    </button>
  </li>
);

const AddItem = ({ onClick }) => (
  <li className="mr-2 d-flex align-items-center">
    <button
      className="d-flex justify-content-center align-items-center rounded index bg-light text-grey border border-grey"
      onClick={onClick}
      type="button"
    >
      <Icon name={Icon.types.plus} className="m-auto" />
    </button>
  </li>
);

IndexMenu.Item = Item;
IndexMenu.AddItem = AddItem;

export default IndexMenu;
