import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

const LoadingSpinnerButton = ({
  loading,
  variant = 'primary',
  type = 'submit',
  children,
  ...rest
}) => (
  <Button variant={variant} size="lg" type={type} disabled={loading} {...rest}>
    {loading ? (
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
    ) : (
      children
    )}
  </Button>
);

export default LoadingSpinnerButton;
