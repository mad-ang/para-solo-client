import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Colors from 'src/utils/Colors';

const boxFade = keyframes`
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
    `;

const Wrapper = styled.div`
  position: fixed;
  top: 85%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ToastBox = styled.div`
  gap: 10px;
  bottom: 60px;
  height: 200px;
  width: 500px;
  animation: ${boxFade} 2s 1s;
`;

const Msg = styled.div`
  background: ${Colors.skyblue[1]};
  border-radius: 16px;
  padding: 15px 35px 15px 15px;
  font-size: 28px;
  display: flex;
  align-items: center;
  text-align: center;
  font-weight: bold;
  justify-content: center;
  text-align: center;
`;

type ToastProps = {
  toastAnimation: string;
  text: string;
};

export const Toast: React.FC<ToastProps> = (props: ToastProps) => {
  const { toastAnimation, text } = props;

  return (
    <div className={toastAnimation}>
      <Wrapper>
        <ToastBox>
          <Msg>
            <p>{text}</p>
          </Msg>
        </ToastBox>
      </Wrapper>
    </div>
  );
};

export const WelcomeToast: React.FC = () => {
  let [toastState, setToastState] = useState(true);
  let [toastAnimation, setToastAnimation] = useState('toast-alert');

  useEffect(() => {
    let timer = setTimeout(() => {
      setToastAnimation('toast-alert');
      setToastState(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  if (toastState) {
    const text = 'Welcome to 🏖ParaSolo🏖';
    return <Toast toastAnimation={toastAnimation} text={text} />;
  }
  return null;
};
