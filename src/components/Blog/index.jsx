import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import styled, { createGlobalStyle, css } from 'styled-components';
import { actions as blogActions } from 'state/domain/blog/action';
import * as blogSelectors from 'state/domain/blog/selector';
import { Heading, SubHeading, Paragraph, SmallPrint } from '../typography';
import { Loading } from '../Loading';
import blogConfig from 'state/domain/blog/config';
import BlogLinks from '../BlogLinks';

const trimQuotes = str => str.replace(/"/g, '');

const getVideo = ({ body }) => {
  if (/<video /.test(body)) {
    try {
      const video = JSON.parse(body.split("data-npf='")[1].split("'>")[0]);
      return {
        ...video,
        posterUrl: (video.poster && video.poster[0] && video.poster[0].url) || null,
        mediaUrl: (video.media && video.media.url) || null,
      };
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
          [key]: isNaN(val) ? val : Number(val),
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
  flex-direction: column-reverse;
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
  margin: 20px -10px;
  @media (min-width: 768px) {
    flex: 1 1 40%;
    margin: 0 0 0 20px;
  }
`;

const renderPostContent = post => {
  const video = getVideo(post);

  if (video && video.mediaUrl) {
    return <Video controls="controls" poster={video.posterUrl} src={video.mediaUrl} />;
  }

  const image = getImage(post);
  if (image) {
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

export const _Blog = ({ getPosts, blogLoadingStatus, blog, match, posts }) => {
  const {
    params: { tag },
  } = match;

  React.useEffect(() => {
    getPosts({ tag });
  }, [tag]);

  const currentBlog = blogConfig.find(c => c.tag === tag);

  if (!currentBlog) {
    return null;
  }

  return (
    <Fragment>
      <GlobalStyle background={currentBlog.background || 'green'} />
      <Loading status={blogLoadingStatus}>
        <Heading>{currentBlog.title}</Heading>
        <SubHeading>{currentBlog.summary}</SubHeading>
        <Columns>
          <Blogs>{posts.map(renderPost)}</Blogs>
          <Side>
            <BlogLinks inSidePanel />
          </Side>
        </Columns>
      </Loading>
    </Fragment>
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
