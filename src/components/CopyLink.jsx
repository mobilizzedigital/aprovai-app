import React, { useRef } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import Icon from './Icon';

const CopyLink = () => {
  const inputRef = useRef(null);
  const tooltip = <Tooltip>Click aqui para copiar o link do job!</Tooltip>;

  const handleClick = () => {
    inputRef.current.select();
    inputRef.current.setSelectionRange(0, 99999);
    document.execCommand('copy');
  };

  return (
    <>
      <input
        type="text"
        className="sr-only"
        defaultValue={window.location.href}
        ref={inputRef}
      />

      <OverlayTrigger placement="top" overlay={tooltip}>
        <button className="border-0 p-3 rounded link" onClick={handleClick}>
          <Icon name={Icon.types.link} />
        </button>
      </OverlayTrigger>
    </>
  );
};

export default CopyLink;
