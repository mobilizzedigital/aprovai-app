import React from 'react';

import Icon from './Icon';

const IndexMenu = ({ children, className }) => (
  <ul className={`d-flex m-0 ${className}`}>{children}</ul>
);

const Item = ({ index, active = false, onClick }) => (
  <li className="mr-2 d-flex align-items-center">
    <button
      variant="primary"
      className={`d-flex justify-content-center align-items-center rounded index text-light border-0 ${
        active ? 'bg-primary' : ''
      }`}
      onClick={onClick}
      type="button"
    >
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
