import styled, { css } from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { lighten } from 'polished';

import BackgroundImage from '../../../assets/background.png';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div`
  height: 100%;

  overflow: hidden;
`;

export const Content = styled.div`
  height: 100%;
  background: url(${BackgroundImage}) no-repeat center;
  background-size: cover;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MobileNavigation = styled.div`
  @media (max-width: 650px) {
    margin-bottom: 40px;

    p {
      color: #fff;
      font-size: 16px;
      font-weight: bold;

      a {
        text-decoration: none;
        color: #990000;
        transition: color 0.2s;

        &:hover {
          color: ${lighten(0.1, '#990000')};
        }
      }
    }
  }

  @media (min-width: 651px) {
    display: none;
  }
`;

export const AppointmentsContainer = styled.div`
  background-color: #f0f0f0;
  width: 50%;
  height: 80%;
  border-radius: 10px;
  padding: 20px 40px;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1020px) {
    width: 90%;
    margin: 0 auto;

    padding: 10px 20px;
  }

  div {
    display: flex;
    align-items: center;

    p {
      color: #333;
      font-size: 18px;
      margin-right: 10px;
    }

    select {
      border: 0;
      background: none;
      font-size: 16px;
      color: #990000;
    }
  }
`;

export const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-content: center;

  @media (max-width: 1020px) {
    flex-direction: column;
    justify-content: center;
  }
`;

export const DateInput = styled.div<ContainerProps>`
  background: #ffffff;
  border-radius: 10px;
  padding: 5px 10px;

  border: 2px solid #ffffff;
  color: #333;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isFocused &&
    css`
      color: #990000;
      border-color: #990000;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #990000;
    `}

  input {
    flex: 1;
    border: 0;
    background: transparent;
    color: #333333;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 10px;
  }

  @media (max-width: 1020px) {
    margin-top: 20px;
  }

  @media (max-width: 650px) {
    width: 100%;
  }
`;

export const AppointmentsList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Scroll = styled(PerfectScrollbar)`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  margin-top: 20px;
  padding: 0 20px 10px;

  @media (max-width: 650px) {
    padding: 0 20px 10px 0;
  }
`;

export const AppointmentData = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  -webkit-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.3);

  background-color: #fff;
  padding: 16px 24px;
  border-radius: 10px;

  margin-top: 16px;

  &:first-child {
    margin-top: 0;
  }

  @media (max-width: 650px) {
    flex-direction: column;

    padding: 10px 0;
  }
`;

export const DateInformation = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  > p {
    border-right: 1px solid #333;
    padding-right: 10px;
  }

  @media (max-width: 650px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;

    div {
      align-items: center;
    }

    > p {
      border: 0;
      padding: 0;
    }
  }
`;

export const AppointmentStatus = styled.div`
  svg {
    cursor: pointer;
  }

  @media (max-width: 650px) {
    margin-top: 10px;
  }
`;
