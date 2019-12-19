import React from 'react';
import { Headline } from '../typography';
import BlogLinks from '../BlogLinks';

export const Home = ({ title }) => {
  return (
    <div>
      <Headline>{title}</Headline>
      <BlogLinks />
    </div>
  );
};
