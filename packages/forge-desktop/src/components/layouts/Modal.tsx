import React, {
  ReactNode,
  FunctionComponent,
  useState,
  useEffect,
} from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import styled from 'styled-components';
import layouts from '../../styles/layouts';
import shapes from '../../styles/shapes';
import Toggle, { IToggle } from '../statefuls/Toggle';
import animate from '../../styles/animate';
import words from '../../styles/words';

const Wrap = styled('div')`
  ${layouts.center}
  ${shapes.padded}
  ${layouts.spider}
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.25);
  animation: ${animate.fadeIn} 0.2s linear;
`;

const Close = styled('div')`
  ${words.small}
  ${layouts.rowsCenter}
  ${shapes.padded}
  padding-bottom: 0;
  margin-bottom: -5px;
  justify-content: flex-end;
  cursor: pointer;
`;

interface IModalProps {
  component: ReactNode;
  children: (bag: IToggle) => ReactNode;
}

const Modal: FunctionComponent<IModalProps> = ({ component, children }) => {
  let previousActiveItem: Element | null;
  useEffect(() => {
    const execute = () => {
      previousActiveItem = document.activeElement;
    };
    window.addEventListener('click', execute);
    return () => window.removeEventListener('click', execute);
  }, []);
  const toggleable = ({ toggle, active, close, ...others }: IToggle) => {
    const closeNoFocus = () => {
      if (
        !previousActiveItem ||
        previousActiveItem === document.body ||
        previousActiveItem.tagName === 'BUTTON'
      ) {
        close();
      }
    };
    const popup = (
      <Wrap>
        <div>
          <Close onClick={close}>x close.</Close>
          <OutsideClickHandler onOutsideClick={closeNoFocus}>
            {component}
          </OutsideClickHandler>
        </div>
      </Wrap>
    );
    return (
      <>
        {children({ toggle, active, close, ...others })}
        {active && popup}
      </>
    );
  };
  return <Toggle>{toggleable}</Toggle>;
};

export default Modal;
