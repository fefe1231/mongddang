/** @jsxImportSource @emotion/react */
import React from 'react';
import { containerCss, descriptionCss } from './styles';
import { FallbackProps } from 'react-error-boundary';
import { useQueryClient } from '@tanstack/react-query';


interface ErrorProps extends FallbackProps {
  height?: string;
}

const Error = ({ height = '100%', error, resetErrorBoundary }: ErrorProps) => {
  const queryClient = useQueryClient();

  const handleRetryClick = () => {
    queryClient.clear();
    resetErrorBoundary();
  };

  return (
    <div css={containerCss} style={{ height }}>
      <Icon size={3.5} color="danger">
        <ExclamationTriangleIcon />
      </Icon>
      <Typography color="danger" css={descriptionCss}>
        {error.message}
      </Typography>
      <Button color="danger" rounded={0.5} handler={handleRetryClick}>
        재시도
      </Button>
    </div>
  );
};

export default Error;
