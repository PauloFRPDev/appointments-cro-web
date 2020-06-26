import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const LogoContent = styled.div`
  display: flex;
  width: 100%;
  background: #990000;
  box-shadow: 0 0 50px #990000;
  padding: 30px;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    margin-bottom: 50px;
  }

  h1 {
    color: #fff;
    text-align: center;
  }

  @media (max-width: 820px) {
    display: none;
  }
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  max-width: 900px;
  padding: 30px;

  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromLeft} 1s;

  img {
    opacity: 0;

    @media (max-width: 820px) {
      opacity: 1;
      transition: opacity 1s;

      margin-bottom: 50px;
    }
  }

  form {
    display: flex;
    margin: 80px 0;
    width: 340px;
    text-align: center;

    flex-direction: column;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #990000;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.4, '#990000')};
      }
    }
  }

  > a {
    color: #990000;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;
    font-size: 18px;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.4, '#990000')};
    }
  }
`;
