import styled, { css, keyframes } from 'styled-components';
import { LOADING_STATUS } from 'state/loadingStatus';

const mustardYellow = '#deb853';
const errorRed = '#deb853';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  } to {
    transform: rotate(360deg);
  }
`;

const projector = keyframes`
  0% { opacity: 0.5; }
  10% { opacity: 1; }
  20% { opacity: 0.8; }
  30% { opacity: 1; }
  40% { opacity: 0.95; }
  50% { opacity: 0.75; }
  60% { opacity: 1; }
  70% { opacity: 0.8; }
  80% { opacity: 0.9; }
  90% { opacity: 1; }
  100% { opacity: 0.6; }
`;

const projectorError = keyframes`
  0% { opacity: 0; }
  10% { opacity: 1; }
  40% { opacity: 0.95; }
  50% { opacity: 0.75; }
  80% { opacity: 0.9; }
  100% { opacity: 0; }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  position: relative;
  // overflow: hidden;
  align-items: center;
`;
  // align-items: flex-end;
  // background: ${({ status }) => {
  //   switch (status) {
  //     case LOADING_STATUS.ERROR:
  //       return errorRed;
  //     default:
  //       return mustardYellow;
  //   }
  // }};

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 563px;
  height: 563px;
  width: 596px;
  position: absolute;
  left: 50px;
  // top: 50%;
  // margin-top: -300px;

  @media (min-width: 596px) {
    position: relative;
    margin-top: 20px;
  }
`;

export const ReelImage = styled.img`
  position: absolute;
  top: 182px;
  ${({ isLeft }) => (isLeft ? 'left: -1px;' : 'left: 73px;')}
  ${({ status }) => {
    switch (status) {
      case LOADING_STATUS.SUCCESS:
        return '';
      case LOADING_STATUS.ERROR:
        return css`
          animation-name: ${spin};
          animation-duration: 1500ms;
          animation-iteration-count: infinite;
          animation-timing-function: ease-out-bounce;
        `;
      default:
        return css`
          animation-name: ${spin};
          animation-duration: 3000ms;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        `;
    }
  }}
`;

export const CameraImage = styled.img`
  position: absolute;
  top: 255px;
  left: 14px;
`;

export const LightImage = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  ${({ status }) => {
    switch (status) {
      case LOADING_STATUS.SUCCESS:
        return '';
      case LOADING_STATUS.ERROR:
        return css`
          opacity: 0.3;
          animation-name: ${projectorError};
          animation-duration: 1000ms;
          animation-iteration-count: infinite;
          animation-timing-function: ease-out-bounce;
        `;
      default:
        return css`
          animation-name: ${projector};
          animation-duration: 2000ms;
          animation-iteration-count: infinite;
          animation-timing-function: ease-out-bounce;
        `;
    }
  }}
`;
