import React from 'react';
import { path } from 'ramda';
import { connect } from 'react-redux';
import { Link, useParams, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import styled, { createGlobalStyle, css } from 'styled-components';
import { actions as blogActions } from 'state/domain/blog/action';
import * as blogSelectors from 'state/domain/blog/selector';
import { Copy, Heading, SubHeading, Paragraph, Quote, SmallPrint } from '../typography';
import { Loading } from '../Loading';
import blogConfig from 'state/domain/blog/config';

const trimQuotes = str => str.replace(/"/g, '');

const getVideo = ({ body }) => {
  if (/<video /.test(body)) {
    try {
      const parts = JSON.parse(body.split("data-npf='")[1].split("'>")[0]);
      return parts;
    } catch (e) {
      return null;
    }
  }
  return false;
};

const getImage = ({ body }) => {
  if (/<img /.test(body)) {
    try {
      const imgAttrStr = body.split('<img ')[1].split('/>')[0];
      return imgAttrStr.split(' ').reduce((acc, str) => {
        const keyValue = str.split('=');
        const key = keyValue[0];
        const val = trimQuotes(keyValue[1]);
        return {
          ...acc,
          [keyValue[0]]: isNaN(val) ? val : Number(val),
        };
      }, {});
    } catch (e) {
      return null;
    }
  }
  return false;
};

const GlobalStyle = createGlobalStyle`
  html body {
    background: ${({ background }) => background};
  }
`;

const Columns = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const Blogs = styled.div`
  @media (min-width: 768px) {
    flex: 0 0 60%;
  }
`;

const BlogPost = styled.div`
  flex: 0 0 100%;
  margin-bottom: 20px;
  border-radius: 4px;
  background: #fdfdfd;
  padding: 20px 20px 10px;
  color: #555;
`;

const Video = styled.video`
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.2);
  width: 100%;
`;

const Image = styled.img`
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.2);
  width: 100%;
`;

const Side = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 20px;
  border-radius: 4px;
  background: #fdfdfd;
  padding: 20px;
  color: #555;

  @media (min-width: 768px) {
    flex: 1 1 40%;
    margin-left: 20px;
  }
`;

const navItemCss = css`
  cursor: pointer;
  display: inline;
  color: #0abdf5;
  margin-right: 10px;
`;

const ExternalNavItem = styled.a`
  ${navItemCss}
`;

const NavItem = styled(Link)`
  ${navItemCss}
`;

const renderPostContent = post => {
  const video = getVideo(post);

  if (video) {
    // console.log(video);
    return (
      <Video controls="controls" poster={video.poster.url}>
        <source src={video.media.url} type={video.media.type}></source>
      </Video>
    );
  }

  const image = getImage(post);
  if (image) {
    // console.log(image);
    return <Image src={image.src}></Image>;
  }

  return null;
};

const renderPost = post => (
  <BlogPost key={post.id}>
    {renderPostContent(post)}
    <SmallPrint color="rgba(0,0,0,0.3)">{new Date(post.timestamp * 1000).toUTCString()}</SmallPrint>
    <Paragraph>{post.summary}</Paragraph>
  </BlogPost>
);

const renderNavItem = currentBlog => blog => {
  if (blog.href) {
    return (
      <ExternalNavItem key={blog.tag} href={blog.href}>
        {blog.title}
      </ExternalNavItem>
    );
  }

  return (
    <NavItem key={blog.tag} to={blog.path}>
      {blog.title}
    </NavItem>
  );
};

export const _Blog = ({ getPosts, blogLoadingStatus, blog, match, posts }) => {
  const {
    params: { tag },
  } = match;

  React.useEffect(() => {
    console.log('tag change', tag);
    getPosts({ tag });
  }, [tag]);

  const currentBlog = blogConfig.find(c => c.tag === tag);

  if (!currentBlog) {
    return null;
  }

  return (
    <Loading status={blogLoadingStatus}>
      <GlobalStyle background={currentBlog.background || 'green'} />
      <Heading>{currentBlog.title}</Heading>
      <SubHeading>{currentBlog.summary}</SubHeading>
      <Columns>
        <Blogs>{posts.map(renderPost)}</Blogs>
        <Side>
          <NavItem to="/">Home</NavItem>
          {blogConfig.map(renderNavItem(currentBlog))}
        </Side>
      </Columns>
    </Loading>
  );
};

const mapStateToProps = createStructuredSelector({
  blogLoadingStatus: blogSelectors.loadingSelector,
  blog: blogSelectors.blogSelector,
  posts: blogSelectors.postsSelector,
});

const mapDispatchToProps = {
  getPosts: blogActions.getPosts,
};

export const Blog = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(_Blog),
);
