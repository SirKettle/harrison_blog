import React from 'react';
import { withRouter } from 'react-router-dom';

export default withRouter(({ match }) => {
  React.useEffect(() => {
    console.log('match change', match);
    window.scrollTo(0, 0);
  }, [match]);
  return null;
});
