import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import DatePicker from 'react-datepicker';

import Tooltip from '../../../components/Tooltip';

import BackgroundImage from '../../../assets/background.png';

export const Container = styled.div`
  height: 100%;

  background: url(${BackgroundImage}) no-repeat center;
  background-size: cover;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  height: 70%;
  width: 50%;

  background-color: #f0f0f0;

  padding: 20px 40px;
  border-radius: 10px;

  display: flex;
  flex-direction: column;

  @media (max-width: 1240px) {
    width: 80%;
  }
`;

export const FilterContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  > div {
    display: flex;
    align-items: center;
    margin-top: 20px;

    > input {
      margin-right: 10px;
    }
  }
`;

export const Picker = styled(DatePicker)`
  border: none;
  font-size: 25px;
  color: #000;
  background-color: #f9f9f9;
  border-radius: 10px;
  text-align: center;
  padding: 5px 0;

  -webkit-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.3);

  cursor: pointer;
`;

export const Scroll = styled(PerfectScrollbar)`
  width: 100%;
  height: 100%;

  margin-top: 20px;
  padding: 0 20px 10px;
`;

export const AppointmentsList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const AppointmentData = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

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

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const DateInformation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    p {
      letter-spacing: 1px;
    }
  }

  > p:last-child {
    border-right: 1px solid #333;
    padding-right: 10px;
    font-weight: bold;

    @media (max-width: 800px) {
      border: none;
      padding: 0;
      margin: 10px 0;
    }
  }

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const AppointmentStatus = styled.div`
  display: flex;
  margin-left: 10px;

  svg {
    cursor: pointer;

    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;

  span {
    background: #c53030;
    color: #fff;
    text-align: center;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;

export const EmptyList = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    margin-top: 20px;
    text-align: center;
  }
`;
