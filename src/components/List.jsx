import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';

import Icon from './Icon';

const List = ({ children }) => <section>{children}</section>;

const Header = ({ title, right }) => (
  <header className="d-flex justify-content-between align-items-center pb-4 mb-5 border-bottom">
    <span className="h4 mb-0">{title}</span>
    {right}
  </header>
);

const Items = ({ items, emptyText, onEdit, onRemove }) => {
  if (!items.length) {
    return <p className="text-center">{emptyText}</p>;
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={`member_${item.id}`}>
          <Row>
            <Col xs={3}>
              <span className="d-block pt-3">{item.leftText}</span>
            </Col>
            <Col xs={9}>
              <div className="border-bottom py-3 d-flex justify-content-between align-items-center">
                <span className="text-grey">{item.greyText}</span>
                <div>
                  {onEdit && (
                    <Button variant="link" className="p-0" onClick={onEdit}>
                      <Icon name={Icon.types.pencil} />
                    </Button>
                  )}
                  {onRemove && (
                    <Button
                      variant="link"
                      className="p-0"
                      onClick={() => onRemove(item.id)}
                    >
                      <Icon name={Icon.types.delete} />
                    </Button>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </li>
      ))}
    </ul>
  );
};

List.Header = Header;
List.Items = Items;

export default List;
