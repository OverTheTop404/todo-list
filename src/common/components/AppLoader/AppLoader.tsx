import styled from 'styled-components'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { selectLoaderStatus } from '@/app/app-slice'

export const AppLoader = () => {
  const loaderStatus = useAppSelector(selectLoaderStatus)

  return (
    <>
      {loaderStatus === 'loading' && (
        <StyledAppLoader id="ct-loadding">
          <div className="loading-infinity">
            <div>
              <span></span>
            </div>
            <div>
              <span></span>
            </div>
            <div>
              <span></span>
            </div>
          </div>
        </StyledAppLoader>
      )}
    </>
  )
}

const StyledAppLoader = styled.div`
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 999999;
  top: 0;
  left: 0;
  -webkit-transition: all 300ms linear 0ms;
  -khtml-transition: all 300ms linear 0ms;
  -moz-transition: all 300ms linear 0ms;
  -ms-transition: all 300ms linear 0ms;
  -o-transition: all 300ms linear 0ms;
  transition: all 300ms linear 0ms;
  background-color: rgba(0, 0, 0, 0.85);
  -webkit-transform: scale(1);
  -khtml-transform: scale(1);
  -moz-transform: scale(1);
  -ms-transform: scale(1);
  -o-transform: scale(1);
  transform: scale(1);

  .loading-infinity {
    width: 120px;
    height: 60px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -khtml-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .loading-infinity div,
  .loading-infinity span {
    position: absolute;
  }

  .loading-infinity div {
    top: 0;
    left: 50%;
    width: 70px;
    height: 70px;
    animation: ctLoadingrotate 6.9s linear infinite;
  }

  .loading-infinity div span {
    left: -10px;
    top: 50%;
    margin: -10px 0 0;
    width: 20px;
    height: 20px;
    display: block;
    background: #007cfb;
    box-shadow: 2px 2px 8px rgba(0, 124, 251, 9%);
    border-radius: 50%;
    transform: rotate(90deg);
    animation: ctLoadingmove 6.9s linear infinite;
  }

  .loading-infinity div span:before,
  .loading-infinity div span:after {
    content: '';
    position: absolute;
    display: block;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    background: inherit;
    top: 50%;
    left: 50%;
    margin: -10px 0 0 -10px;
    box-shadow: inherit;
  }

  .loading-infinity div span:before {
    animation: ctLoadingdrop1 0.8s linear infinite;
  }

  .loading-infinity div span:after {
    animation: ctLoadingdrop2 0.8s linear infinite 0.4s;
  }

  .loading-infinity div:nth-child(2) {
    animation-delay: -2.3s;
  }

  .loading-infinity div:nth-child(2) span {
    animation-delay: -2.3s;
  }

  .loading-infinity div:nth-child(3) {
    animation-delay: -4.6s;
  }

  .loading-infinity div:nth-child(3) span {
    animation-delay: -4.6s;
  }

  @keyframes ctLoadingrotate {
    50% {
      transform: rotate(360deg);
      margin-left: 0;
    }

    50.0001%,
    100% {
      margin-left: -70px;
    }
  }

  @keyframes ctLoadingmove {
    0%,
    50% {
      left: -10px;
    }

    25% {
      background: #0431b8;
    }

    75% {
      background: #85cc02;
    }

    50.0001%,
    100% {
      left: auto;
      right: -10px;
    }
  }

  @keyframes ctLoadingdrop1 {
    100% {
      transform: translate(32px, 10px) scale(0);
    }
  }

  @keyframes ctLoadingdrop2 {
    0% {
      transform: translate(0, 0) scale(0.9);
    }

    100% {
      transform: translate(32px, -10px) scale(0);
    }
  }
`
