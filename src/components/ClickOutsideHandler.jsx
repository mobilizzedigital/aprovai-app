import React, { useCallback, useEffect, useRef } from 'react';

/**
 * @link https://dev.to/vibhanshu909/click-outside-listener-for-react-components-in-10-lines-of-code-4gjo
 */
const ClickOutsideHandler = ({ onClose, children }) => {
  const ref = useRef(null);
  const escapeListener = useCallback(
    e => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  const clickListener = useCallback(
    e => {
      if (!ref.current.contains(e.target)) {
        onClose && onClose();
      }
    },
    [ref, onClose]
  );

  useEffect(() => {
    // Attach the listeners on component mount.
    document.addEventListener('click', clickListener);
    document.addEventListener('keyup', escapeListener);
    // Detach the listeners on component unmount.
    return () => {
      document.removeEventListener('click', clickListener);
      document.removeEventListener('keyup', escapeListener);
    };
  }, [clickListener, escapeListener]);

  return <div ref={ref}>{children}</div>;
};

export default ClickOutsideHandler;
