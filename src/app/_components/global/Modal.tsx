
import styled, { keyframes } from 'styled-components';
import React, { createContext, JSX, useState } from 'react';
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






    &::before{


      @media (min-width: 1024px) {
        position: sticky;
        top: -0.1rem;
        box-shadow: 0px 5px 25px 18px #fff;
        display: block;
        content: "";
        width: 100%;
         height: 0.1rem;
        // background:  linear-gradient(180deg, #fff 0%, rgba(255, 255, 255, 0.00) 100%);
        z-index: 100;
      }
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
    border-radius: 24px;
    overflow: auto;
    color: #000000;
    background: #ffffff;

    transform: translateY(40px);

    animation: ${keyframes`
    from {transform: translateY(24px);}
    to {transform: translateY(0);}
  `} 0.2s ease-in-out forwards;




    @media (min-width: 1024px) {
      min-width: 100px;
      min-height: 100px;
      width: fit-content;
      height: fit-content;
    }

    .closeBtn {
      position: absolute;
      right 24px;
      top: 24px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: none;

      background: rgba(0,0,0,0.08);
      display: grid;
      place-items: center;

      &.light {
        background: #fff;
      }

      svg {
        width: 16px;
      }
    }
  }

  .dark-bg{
    background-color : black;
  }


  .closeNBtn {
    position: fixed;
    right 24px;
    top: 24px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: none;
    background: rgba(0,0,0,0.08);
    display: grid;
    place-items: center;
    z-index: 100;

    @media (min-width: 1024px) {
    right: calc((100vw / 2) - (58rem / 2) + 2.4rem);
    top: calc((100vh / 2) - (58rem / 2) + 1.6rem);
    }

    &.light {
      background: #fff;
    }

    svg {
      width: 16px;
    }
  }
`;
