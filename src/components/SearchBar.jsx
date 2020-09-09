import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';

import Icon from './Icon';

const SearchBar = ({ title, right, value, onChange }) => (
  <div className="search-bar bg-white rounded shadow p-3 mb-3">
    <Row>
      <Col lg={2} className="d-flex align-items-center">
        <h1 className="title mb-0">{title}</h1>
      </Col>
      <Col lg={7} className="my-3 my-lg-0">
        <Form>
          <InputGroup className="m-0">
            <InputGroup.Prepend>
              <InputGroup.Text>
                <Icon name={Icon.types.loupe} className="mr-2" />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="text"
              placeholder="Buscar..."
              value={value}
              onChange={onChange}
              size="lg"
              className="pl-1"
            />
          </InputGroup>
        </Form>
      </Col>
      {right && (
        <Col col={3} className="d-flex align-items-start justify-content-end">
          {right}
        </Col>
      )}
    </Row>
  </div>
);

export default SearchBar;
