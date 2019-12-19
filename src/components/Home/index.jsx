import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import blogConfig from 'state/domain/blog/config';
import { Headline, SubHeading } from '../typography';
import { Padding } from '../styledComponents';

const navItemCss = css`
  cursor: pointer;
  display: block;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 4px;
  background: ${({ background }) => background || '#fdfdfd'};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center 0;
  color: #fff;
  padding: 100px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`;

const BlogLink = styled(Padding)`
  flex: 0 0 100%;

  @media (min-width: 768px) {
    flex: 0 0 50%;
  }
`;

const ExternalNavItem = styled.a`
  ${navItemCss}
`;

const NavItem = styled(Link)`
  ${navItemCss}
`;

const BlogLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const renderNavItem = blog => {
  if (blog.href) {
    return (
      <BlogLink key={blog.tag}>
        <ExternalNavItem href={blog.href} background={blog.posterBackground}>
          <SubHeading>{blog.title}</SubHeading>
        </ExternalNavItem>
      </BlogLink>
    );
  }

  return (
    <BlogLink key={blog.tag}>
      <NavItem to={blog.path} background={blog.posterBackground}>
        <SubHeading>{blog.title}</SubHeading>
      </NavItem>
    </BlogLink>
  );
};

export const Home = ({ title }) => {
  return (
    <div>
      <Headline>{title}</Headline>
      <BlogLinks>{blogConfig.map(renderNavItem)}</BlogLinks>
    </div>
  );
};
