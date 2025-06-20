import styled, { keyframes } from 'styled-components';
import React, { createContext, JSX, useState, useEffect } from 'react';
import { CrossDark } from '@/app/_assets/icons';


const initialModalContext = {
  set: () => {},
  clear: () => {},
  show: () => {},
  hide: () => {},
  setCloseButtonTheme: () => {},
  setCloseBtnHidden: () => {},
  setTop: () => {},
};

export const ModalContext =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createContext<Record<string, (...args: any) => void>>(initialModalContext);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<JSX.Element | string | null>(
    null,
  );
  const [background, setBackground] = useState<string>('');
  const [lightCloseButton, setLightCloseButton] = useState(false);

  const [topMost, setTopMost] = useState(false);

  const [fullViewOnMbl, setFullViewOnMbl] = useState(false);

  const [closeBtnHidden, setCloseBtnHidden] = useState<boolean>(false);

  useEffect(() => {
    if (isModalVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalVisible]);

  const set = (content: string | JSX.Element) => {
    setModalContent(content);
  };
  const clear = () => {
    setModalContent(null);
    hide();
  };

  const setBg = (col: string) => {
    setBackground(col);
  };
  const show = () => {
    setModalVisible(true);
  };
  const hide = () => {
    setModalVisible(false);
    setLightCloseButton(false);
    setFullViewOnMbl(false);
    setCloseBtnHidden(false);
  };
  const setCloseButtonTheme = (theme: 'light' | 'dark') => {
    if (theme == 'dark') return;
    setLightCloseButton(true);
  };

  const setTop = () => setTopMost(true);

  const setFullView = () => setFullViewOnMbl(true);

  return (
    <ModalContext.Provider
      value={{
        set,
        clear,
        show,
        hide,
        setCloseButtonTheme,
        setCloseBtnHidden,
        setTop,
        setFullView,
        setBg,
      }}
    >
      {children}
      {isModalVisible && (
        <ModalWhite
          top={topMost}
          lightCloseButton={lightCloseButton}
          hideModal={hide}
          fullViewMbl={fullViewOnMbl}
          bg={background}
          closeBtnHidden={closeBtnHidden}
        >
          {modalContent}
        </ModalWhite>
      )}
    </ModalContext.Provider>
  );
};

export const ModalWhite = styled(
  ({
    className,
    children,
    hideModal,
    lightCloseButton,
    top,
    fullViewMbl,
    bg,
    closeBtnHidden = false,
  }: {
    className?: string;
    children?: JSX.Element | string | null;
    hideModal?: () => void;
    lightCloseButton?: boolean;
    top: boolean;
    fullViewMbl?: boolean;
    bg?: string;
    closeBtnHidden?: boolean;
  }) => {
    return (
      <div
        className={`${className} ${top ? 'top' : ''}`}
        aria-hidden="true"
        onClick={hideModal}
        style={{
          padding: `${fullViewMbl ? '0' : '24px'}`,
        }}
      >
        <div
          className={`modalContent ${bg === 'dark' ? 'dark-bg' : ''} ${
            fullViewMbl ? 'full-view-mobile' : ''
          }`}
          onClick={(e) => e.stopPropagation()}
          aria-hidden="true"
        >
          {children}
          {fullViewMbl || closeBtnHidden ? null : (
            <button
              className={`closeBtn ${lightCloseButton ? 'light' : ''}`}
              onClick={hideModal}
            >
              <CrossDark />
            </button>
          )}
          {/* <div className="gradient-container" /> */}
        </div>
        {fullViewMbl && !closeBtnHidden ? (
          <button
            className={`closeNBtn ${lightCloseButton ? 'light' : ''}`}
            onClick={hideModal}
          >
            <CrossDark />
          </button>
        ) : null}
      </div>
    );
  },
)`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 150;


  & * {
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }
  }

 

  &.top {
    z-index: 3000;
  }




  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: rgba(0, 0, 0, 0.7);
  // padding: 24px;

  opacity: 0;

  animation: ${keyframes`
    from {opacity: 0;}
    to {opacity: 1;}
  `} 0.2s ease-in-out forwards;




  .full-view-mobile{
    position: relative;
    width: 100%;
    height : 100%;
    padding : 0 !important;
    border-radius: 0 !important;

    @media (min-width: 1024px) {
      border-radius: 24px !important;
    }

    &::after{
      @media (min-width: 1024px) {
        position: sticky;
        top: 100%;
        display: block;
        content: "";
        width: 100%;
        height: 0.1rem;
        box-shadow: 0px -5px 25px 28px #fff;
        z-index: 100;
      }
    }
  }



  .modalContent {
    position: relative;
    width: 100%;
    height: 70%;
    border-radius: 24px;
    overflow: hidden;
    color: #000000;
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    box-shadow: none;

    transform: translateY(40px);

    animation: ${keyframes`
    from {transform: translateY(24px);}
    to {transform: translateY(0);}
  `} 0.2s ease-in-out forwards;

    @media (min-width: 1024px) {
      min-width: 100px;
      min-height: 100px;
      width: 75vw;
      height: 75vh;
      max-width: 1200px;
      max-height: 900px;
    }

    .typeform-container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #ffffff;
      overflow: hidden;
      border: none;
      box-shadow: none;
    }

    .typeformSnippet {
      width: 100% !important;
      height: 100% !important;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      border: none;
      box-shadow: none;
    }

    iframe {
      width: 100% !important;
      height: 100% !important;
      border: none;
      box-shadow: none;
    }

    .closeBtn {
      position: absolute;
      right: 24px;
      top: 24px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: none;
      background: rgba(255, 255, 255, 0.9);
      display: grid;
      place-items: center;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      z-index: 10;

      &:hover {
        background: rgba(255, 255, 255, 1);
        transform: scale(1.05);
      }

      &.light {
        background: rgba(255, 255, 255, 0.9);
        &:hover {
          background: rgba(255, 255, 255, 1);
        }
      }

      svg {
        width: 16px;
        height: 16px;
      }
    }
  }

  .dark-bg{
    background-color : black;
  }


  .closeNBtn {
    position: fixed;
    right: 24px;
    top: 24px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.9);
    display: grid;
    place-items: center;
    z-index: 100;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    &:hover {
      background: rgba(255, 255, 255, 1);
      transform: scale(1.05);
    }

    @media (min-width: 1024px) {
      right: calc((100vw / 2) - (58rem / 2) + 2.4rem);
      top: calc((100vh / 2) - (58rem / 2) + 1.6rem);
    }

    &.light {
      background: rgba(255, 255, 255, 0.9);
      &:hover {
        background: rgba(255, 255, 255, 1);
      }
    }

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

export const ModalContent = styled.div`
  position: relative;
  background: #fff;
  border-radius: 8px;
  padding: 0;
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transform: translateY(0);
  transition: transform 0.3s ease-out;

  @media (min-width: 992px) {
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    border-radius: 0;
  }
`;

export const TypeformContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  overflow: hidden;
`;

export const TypeformSnippet = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  overflow: hidden;

  iframe {
    width: 100% !important;
    height: 100% !important;
    border: none;
  }
`;
