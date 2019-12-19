import React, { Fragment } from 'react';
import { Copy, Heading, Headline, Paragraph, Quote, SmallPrint } from '../typography';

export const Error = ({ title = 'Error', error }) => (
  <div>
    <Heading>{title}</Heading>
    <Paragraph>{error.message}</Paragraph>
  </div>
);

export default ({ error, errors = [] }) => <Fragment>{[error, ...errors].map(Error)}</Fragment>;
