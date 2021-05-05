import React from 'react';
import { Button } from 'react-bootstrap';

import Icon from './Icon';

const Pagination = ({
  perPage,
  page,
  total,
  min = 1,
  onChangePerPage,
  onNextPage,
  onPrevPage,
}) => {
  const handleChange = (e) => onChangePerPage(e.currentTarget.value || min);
  const totalPages = Math.ceil(total / perPage);
  const hasPrevPage = page > 1;
  const hasNextPage = page + 1 !== totalPages;

  return (
    <div className="d-flex justify-content-end my-4">
      <div className="d-flex align-items-center text-default">
        <span className="mr-2">Itens por pagina</span>
        <input
          className="field-number mr-4 bg-transparent border-bottom"
          type="number"
          value={perPage}
          min={1}
          onChange={handleChange}
        />
        <span className="mr-4">
          {page + 1} - {totalPages} de {total}
        </span>
        {hasPrevPage && (
          <Button variant="link" onClick={onPrevPage}>
            <Icon
              name={Icon.types.arrowDown}
              className="rotate-right-90 m-0 d-flex"
            />
          </Button>
        )}
        {hasNextPage && (
          <Button variant="link" onClick={onNextPage}>
            <Icon
              name={Icon.types.arrowDown}
              className="rotate-left-90 m-0 d-flex"
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
