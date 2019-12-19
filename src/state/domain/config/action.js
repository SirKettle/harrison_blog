export const actionTypes = {
  getConfig: 'get/config/request',
  getConfigSuccess: 'get/config/success',
  getConfigError: 'get/config/error',
};

export const actions = {
  getConfig: () => ({
    type: actionTypes.getConfig,
  }),
  getConfigSuccess: data => ({
    type: actionTypes.getConfigSuccess,
    payload: data,
  }),
  getConfigError: err => ({
    type: actionTypes.getConfigError,
    payload: err,
  }),
};
