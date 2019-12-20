import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
import blogConfig from 'state/domain/blog/config';
import { Paragraph, SubHeading } from '../typography';
import { pick } from 'ramda';

const navItemCss = css`
  cursor: pointer;
  display: block;
  border-radius: 4px;
  background: ${({ background }) => background || '#fdfdfd'};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center 0;
  color: #fff;
  padding: ${props => (props['data-side-panel'] ? '20px' : '100px')} 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  @media (min-width: 768px) {
    padding: ${props => (props['data-side-panel'] ? '100px' : '100px')} 3px;
  }
`;

const BlogLink = styled.div`
  flex: 0 0 ${({ inSidePanel }) => (inSidePanel ? '25%' : '100%')};
  padding: ${({ inSidePanel }) => (inSidePanel ? '10px' : '20px')};

  @media (min-width: 768px) {
    flex: 0 0 ${({ inSidePanel }) => (inSidePanel ? '100%' : '50%')};
    padding: ${({ inSidePanel }) => (inSidePanel ? '0' : '20px')};
    margin-bottom: ${({ inSidePanel }) => (inSidePanel ? '20px' : '0')};
  }
`;

const ExternalNavItem = styled.a`
  ${navItemCss}
`;

const NavItem = styled(Link)`
  ${navItemCss}
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FlexiLink = ({ href, path, children, inSidePanel, ...other }) => {
  if (href) {
    return (
      <ExternalNavItem href={href} data-side-panel={inSidePanel} {...other}>
        {children}
      </ExternalNavItem>
    );
  }

  return (
    <NavItem to={path} data-side-panel={inSidePanel} {...other}>
      {children}
    </NavItem>
  );
};

const renderNavItem = ({ inSidePanel }) => blog => (
  <BlogLink key={blog.tag} inSidePanel={inSidePanel}>
    <FlexiLink {...pick(['href', 'path'])(blog)} background={blog.posterBackground} inSidePanel={inSidePanel}>
      {inSidePanel ? <Paragraph as="h3">{blog.title}</Paragraph> : <SubHeading>{blog.title}</SubHeading>}
    </FlexiLink>
  </BlogLink>
);

export const BlogLinks = ({ inSidePanel = false, match }) => {
  const {
    params: { tag },
  } = match;

  const links = blogConfig.filter(c => {
    if (!tag && c.tag === 'home') {
      return false;
    }
    return c.tag !== tag;
  });

  return <Wrapper>{links.map(renderNavItem({ inSidePanel }))}</Wrapper>;
};

export default withRouter(BlogLinks);
