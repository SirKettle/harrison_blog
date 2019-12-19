export const actionTypes = {
  getPosts: 'get/posts/request',
  getPostsSuccess: 'get/posts/success',
  getPostsError: 'get/posts/error',
};

export const actions = {
  getPosts: (params) => ({
    type: actionTypes.getPosts,
    payload: params
  }),
  getPostsSuccess: data => ({
    type: actionTypes.getPostsSuccess,
    payload: data,
  }),
  getPostsError: err => ({
    type: actionTypes.getPostsError,
    payload: err,
  }),
};
