import * as React from 'react';
import { LOADING_STATUS } from 'state/loadingStatus';
import reelImage from 'assets/images/loading/reel.png';
import lightImage from 'assets/images/loading/light.png';
import cameraImage from 'assets/images/loading/camera.png';
import { Paragraph } from '../typography';
import { CameraImage, ImageContainer, LightImage, LoadingContainer, ReelImage } from './styledComponents';

export const Loading = ({
  status,
  children,
  loadingMessage = 'Loading',
  errorMessage = 'Oops - something went wrong',
  minLoadingTime = 800,
}) => {
  const [uiStatus, setStatus] = React.useState(status);
  const [loadingStarted, setLoadingStarted] = React.useState();

  React.useEffect(() => {
    if (status === LOADING_STATUS.PENDING) {
      setLoadingStarted(Date.now());
    }
  }, status);
  React.useEffect(() => {
    if (uiStatus === LOADING_STATUS.PENDING) {
      const delay = Math.max(0, minLoadingTime - (Date.now() - loadingStarted));
      const timerId = setTimeout(() => {
        setStatus(status);
      }, delay);
      return () => {
        clearTimeout(timerId);
      };
    } else {
      setStatus(status);
    }
  }, status);

  switch (uiStatus) {
    case LOADING_STATUS.SUCCESS:
      return children;
    default:
      return (
        <LoadingContainer status={uiStatus}>
          <ImageContainer>
            <ReelImage src={reelImage} alt="reel" width="70" height="70" isLeft status={uiStatus} />
            <ReelImage src={reelImage} alt="reel" width="70" height="70" status={uiStatus} />
            <LightImage src={lightImage} alt="projector light" width="479" height="563" status={uiStatus} />
            <CameraImage src={cameraImage} alt="projector camera" width="125" height="192" />
            {/*<Paragraph>{uiStatus === LOADING_STATUS.ERROR ? errorMessage : loadingMessage}</Paragraph>*/}
          </ImageContainer>
        </LoadingContainer>
      );
  }
};
